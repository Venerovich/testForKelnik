<template>
  <div class="container">
    <loading-spinner :loading="loading"/>

    <ApartmentTable :apartments="paginatedApartments"
                    :hasMore="hasMore"
                    :loading="loading"
                    @loadMore="loadMore"/>
    <ApartmentFilters
      :filters="filters"
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

const resetFilters = () => {}
const handleFiltersUpdate = () => {}
const filters = ref({})
const store = useApartmentStore()

const paginatedApartments = computed(() => store.paginatedApartments)
const loading = computed(() => store.loading)
const hasMore = computed(() => store.hasMore)

onMounted(() => {
  store.fetchApartments()
})
const loadMore = () => {store.loadMore()}
</script>

<style scoped lang="scss">

</style>
