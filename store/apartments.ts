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

  const loading = ref(true)
  const page = ref(1)
  const itemsPerPage = 10
  const hasMore = ref(true)

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
      applyFilters()
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
      .map(el => el.area)
      .sort((a, b) => a - b)

    filter.value.priceRange = [sortedByPrice[0], sortedByPrice.at(-1)]
    filter.value.areaRange = [sortedByArea[0], sortedByArea.at(-1)]
  }

  function applyFilters() {
    filteredApartments.value = apartments.value.filter(apartment => {

      const inPriceRange = apartment.price >= filter.value.priceRange[0] &&
        apartment.price <= filter.value.priceRange[1]

      const inRoomFilter = filter.value.rooms.length === 0 ||
        filter.value.rooms.includes(apartment.rooms)

      const inAreaRange = apartment.area >= filter.value.areaRange[0] &&
        apartment.area <= filter.value.areaRange[1]

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
    applyFilters()
  }

  return {
    fetchApartments,
    applyFilters,
    loadMore,
    updateFilter,
    paginatedApartments
  }
})
