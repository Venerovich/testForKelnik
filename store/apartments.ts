import apartmentList from "@/store/moc/apartments"

export interface Apartment {
  id: number
  title: string
  address: string
  price: number
  area: number
  rooms: number
  floor: number
  maxFloor: number
  images: string[],
  currentFloor: number,
  totalFloor: number,
}

export interface FilterState {
  priceRange: [number, number]
  rooms: number[]
  areaRange: [number, number]
}

export const useApartmentStore = defineStore('apartments', () => {

  // <====================states====================>
  const apartments = ref([]) as Apartment[]
  const filteredApartments = ref([]) as Apartment[]

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
  const itemsPerPage = 10
  const hasMore = ref(true)
  const sort = ref('desc')

  // <====================computed====================>

  const paginatedApartments = computed(() => {
    const end = page.value * itemsPerPage
    return filteredApartments.value.slice(0, end)
  })

  // <====================handlers====================>
  async function fetchApartments() {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      apartments.value = apartmentList
      initFilterParams()
      applyFilters(null)
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  function initFilterParams () {
    const sortedByPrice = apartmentList
      .map(el => el.price)
      .sort((a, b) => a - b)

    const sortedByArea = apartmentList
      .map(el => Math.round(el.area))
      .sort((a, b) => a - b)

    filter.value.priceRange = [sortedByPrice[0], sortedByPrice.at(-1)]
    filter.value.areaRange = [sortedByArea[0], sortedByArea.at(-1)]
    baseFilter.value = {...filter.value}
  }

  function sortBy(type: string) {
    if (sort.value === 'desc') {
      sort.value = 'asc'
      apartments.value = apartmentList.sort((a, b) => a[type] - b[type])
    }
    else {
      sort.value = 'desc'
      apartments.value = apartmentList.sort((a, b) => b[type] - a[type])
    }
    applyFilters(null)
  }
  function resetFilters () {
    filter.value = {...baseFilter.value}
    applyFilters(null)
  }
  function applyFilters(changedFilters: null) {
    let innerFilter = filter.value
    if (changedFilters) innerFilter = changedFilters

    filteredApartments.value = apartments.value.filter(apartment => {

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
      await new Promise(resolve => setTimeout(resolve, 1000))
      page.value += 1
      hasMore.value = page.value * itemsPerPage < filteredApartments.value.length
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  function updateFilter(newFilter: Partial<FilterState>) {
    filter.value = {...filter.value, ...newFilter}
    applyFilters(null)
  }

  return {
    fetchApartments,
    sortBy,
    loadMore,
    resetFilters,
    applyFilters,
    updateFilter,
    paginatedApartments,
    loading,
    hasMore,
    filter
  }
})
