import apartmentList from "@/store/moc/apartments"

interface Apartment {
  id: number,
  type: string,
  rooms: number,
  number: string,
  area: number,
  price: number,
  priceFormatted: string,
  currentFloor: number,
  totalFloor: number
}

interface FilterState {
  priceRange: [number, number]
  rooms: number[]
  areaRange: [number, number]
}

type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export const useApartmentStore = defineStore('apartments', () => {

  // <====================states====================>
  const apartments = ref<Apartment[]>([]);
  const filteredApartments = ref<Apartment[]>([]);

  const filter = ref({
    priceRange: [0, 100000000] as [number, number],
    rooms: [] as number[],
    areaRange: [0, 500] as [number, number],
  } as FilterState,)

  const baseFilter = ref({
    priceRange: [0, 100000000] as [number, number],
    rooms: [] as number[],
    areaRange: [0, 500] as [number, number],
  } as FilterState,)

  const loading = ref(true)
  const page = ref(1)
  const itemsPerPage = 20
  const hasMore = ref(true)
  const sort = ref({
    name: '',
    type: 'des'
  })

  // <====================computed====================>

  const paginatedApartments = computed(() => {
    const end = page.value * itemsPerPage
    return filteredApartments.value.slice(0, end)
  })

  // <====================handlers====================>
  async function fetchApartments(queryParams: FilterState) {
    try {
      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 300))
      apartments.value = apartmentList

      if (queryParams && Object.keys(queryParams).length) {
        await updateFilter(queryParams)
      }
      else {
        applyFilters(null)
      }
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  async function sortBy<K extends NumericKeys<Apartment>>(name: K) {
    try {
      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 300))
      sort.value.name = name
      if (sort.value.type === 'desc') {
        sort.value.type = 'asc'
        apartments.value = apartmentList.sort((a, b) => a[name] - b[name])
      } else {
        sort.value.type = 'desc'
        apartments.value = apartmentList.sort((a, b) => b[name] - a[name])
      }
      applyFilters(null)
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  function applyFilters(changedFilters: null) {
    let innerFilter = filter.value
    if (changedFilters) innerFilter = changedFilters

    filteredApartments.value = apartments.value.filter((apartment: Apartment) => {

      const inPriceRange = apartment.price >= innerFilter.priceRange[0] &&
        apartment.price <= innerFilter.priceRange[1]

      const inRoomFilter = innerFilter.rooms.length === 0 ||
        innerFilter.rooms.includes(apartment.rooms)

      const inAreaRange = apartment.area >= innerFilter.areaRange[0] &&
        apartment.area <= innerFilter.areaRange[1]

      return inPriceRange && inRoomFilter && inAreaRange
    })

    page.value = 1
    hasMore.value = filteredApartments.value.length > itemsPerPage
  }

  async function loadMore() {
    try {
      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 300))
      page.value += 1
      hasMore.value = page.value * itemsPerPage < filteredApartments.value.length
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateFilter(newFilter: Partial<FilterState>) {
    try {
      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 300))
      filter.value = {...filter.value, ...newFilter}
      applyFilters(null)
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    fetchApartments,
    sortBy,
    loadMore,
    updateFilter,
    paginatedApartments,
    loading,
    hasMore,
    filter,
    baseFilter,
    sort
  }
})
