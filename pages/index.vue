<script setup lang="ts">
import ApartmentFilters from "@/components/Apartments/ApartmentFilters.vue";
import ApartmentTable from "@/components/Apartments/ApartmentTable.vue";
import {useApartmentStore} from "@/store/apartments";
import BackToTop from "@/components/ui/BackToTop.vue";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";

interface RouteQueryResult {
  [key: string]: number[];
}
interface FilterState {
  priceRange: [number, number]
  rooms: number[]
  areaRange: [number, number]
}

const router = useRouter()
const route = useRoute()
const store = useApartmentStore()
const {
  paginatedApartments,
  hasMore,
  loading,
  filter,
  sort,
} = storeToRefs(store)

const baseFilter = ref({
  priceRange: [0, 100000000] as [number, number],
  rooms: [] as number[],
  areaRange: [0, 500] as [number, number],
} as FilterState,)

const checkRouteQuery = (): RouteQueryResult => {
  const routeQuery = route.query;
  const result: RouteQueryResult = {};

  if (routeQuery && Object.keys(routeQuery).length > 0) {
    const queryKeys = Object.keys(routeQuery);
    const queryValues = Object.values(routeQuery);

    queryValues.forEach((el, i) => {
      if (Array.isArray(el)) {
        result[queryKeys[i]] = el.map(item => Number(item)).filter(num => !isNaN(num));
      } else if (typeof el === 'string') {
        const num = Number(el);
        if (!isNaN(num)) {
          result[queryKeys[i]] = [num];
        }
      }
    });
  }
  return result;
};

const queryParams = checkRouteQuery()
await store.fetchApartments(queryParams)

const loadMore = () => {
  store.loadMore()
}

const sortBy = (type: string) => {
  store.sortBy(type)
}

const resetFilters = () => {
  router.replace({})
  store.updateFilter(baseFilter.value)
}

const handleFiltersUpdate = () => {
  store.updateFilter(filter.value)
  router.replace({
    query: {...filter.value}
  })
}

</script>
<template>
  <div class="container">

    <loading-spinner :loading="loading"/>

    <ApartmentTable
      v-model:filter="filter"
      :apartments="paginatedApartments"
      :hasMore="hasMore"
      :sort="sort"
      :loading="loading"
      @sortBy="sortBy"
      @update-filters="handleFiltersUpdate"
      @reset-filters="resetFilters"
      @loadMore="loadMore"/>

    <ApartmentFilters
      v-model:filter="filter"
      @update-filters="handleFiltersUpdate"
      @reset-filters="resetFilters"
    />
  </div>
  <BackToTop/>
</template>

<style scoped></style>
