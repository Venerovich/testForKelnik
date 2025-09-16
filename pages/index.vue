<template>
  <div class="container">
    <loading-spinner :loading="loading"/>

    <ApartmentTable :apartments="paginatedApartments"
                    :hasMore="hasMore"
                    :loading="loading"
                    @sortBy="sortBy"
                    @loadMore="loadMore"/>
    <ApartmentFilters
      v-model:filter="filters"
      @update-filters="handleFiltersUpdate"
      @reset-filters="resetFilters"
    />
  </div>
  <BackToTop/>
</template>

<script setup lang="ts">
import ApartmentFilters from "@/components/Apartments/ApartmentFilters.vue";
import ApartmentTable from "@/components/Apartments/ApartmentTable.vue";
import {useApartmentStore} from "@/store/apartments";
import BackToTop from "@/components/ui/BackToTop.vue";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";

const filters = ref({
  priceRange: [0, 100000000] as [number, number],
  rooms: [] as number[],
  areaRange: [0, 500] as [number, number],
})

const store = useApartmentStore()
const {paginatedApartments, hasMore, loading, filter} = storeToRefs(store)

onMounted(async () => {
  await store.fetchApartments()
  Object.assign(filters.value, filter.value)
})

const loadMore = () => {store.loadMore()}
const sortBy = (type: string) => {store.sortBy(type)}
const resetFilters = () => {store.resetFilters()}
const handleFiltersUpdate = () => {store.updateFilter(filters.value)}

</script>

<style scoped lang="scss">

</style>
