<script setup lang="ts">
import SortIcon from "@/components/icons/SortIcon.vue";
import ApartmentCard from "@/components/Apartments/ApartmentCard.vue";
import ApartmentFilters from "@/components/Apartments/ApartmentFilters.vue";
import ApartmentTableSkeleton from "@/components/Apartments/ApartmentTableSkeleton.vue";

interface Apartment {
  id: number
  type: string
  number: string
  area: number
  floor: string
  price: number
  priceFormatted: string
}

interface Props {
  apartments: Apartment[],
  loading: boolean,
  hasMore: boolean,
  sort: {
    name: string,
    type: string
  },
}

defineProps<Props>()

const filters = defineModel('filter')
const emit = defineEmits(['loadMore', 'sortBy', 'update-filters', 'reset-filters'])

const isMounted = ref(false)
const sortActions = [
  {name: 'S, м²', sortName: 'area'},
  {name: 'Этаж', sortName: 'currentFloor'},
  {name: 'Цена, ₽', sortName: 'price'},
]

setTimeout(() => {
  isMounted.value = true
})
</script>
<template>
  <ApartmentTableSkeleton v-if="!isMounted"/>
  <div v-else class="apartment-table">
    <h1 class="page-title">Квартиры</h1>
    <div class="table-responsive pc">

      <table class="table">
        <thead>
        <tr>
          <th> Планировка</th>
          <th>Квартира</th>
          <th v-for="(el, i) in sortActions" :key="i">
            <button
              class="btn header-item"
              :class="{'sort-active': sort.name && el.sortName.includes(sort.name)}"
              @click="emit('sortBy', el.sortName)">
                {{ el.name }}
              <SortIcon :sort="sort" :itemName="el.sortName"/>
            </button>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="apartment in apartments" :key="apartment.id" class="apartment-row">
          <td>
            <div class="layout-placeholder">
              <img src="~/assets/images/apartment-img.png" alt="apartment">
            </div>
          </td>
          <td>
            <strong>{{ apartment.type }} {{ apartment.number }}</strong>
          </td>
          <td>{{ apartment.area }}</td>
          <td>
            {{ apartment.currentFloor }}
            <span style="opacity: 0.5">{{ `из ${apartment.totalFloor}` }}</span>
          </td>
          <td>
            <span class="price">{{ apartment.priceFormatted }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <ApartmentFilters
      class="portable-filter"
      v-model:filter="filters"
      @update-filters="emit('update-filters')"
      @reset-filters="emit('reset-filters')"
    />

    <div class="apartment-cards mobile">
      <div class="sort-actions">
        <button
          v-for="(el, i) in sortActions" :key="i"
          class="btn header-item"
          :class="{'active': el.sortName.includes(sort.name)}"
          @click="emit('sortBy', el.sortName)">
          {{ el.name }}
          <SortIcon/>
        </button>
      </div>

      <ApartmentCard
        v-for="apartment in apartments"
        :key="apartment.id"
        :apartment="apartment">
      </ApartmentCard>
    </div>

    <div v-if="!apartments.length && !loading" class="no-results">
      <p>Квартиры по выбранным параметрам не найдены</p>
    </div>

    <button v-if="hasMore" class="btn btn--secondary" @click="emit('loadMore')">
      Загрузить еще
    </button>
  </div>
</template>

<style scoped lang="scss">
@use "assets/css/includes/apartment-table";
</style>
