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
.apartment-table {
  width: 100%;

  @media (max-width: 960px) {}
}

.portable-filter {
  display: none;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    max-width: initial;
    margin-bottom: 24px;
  }
}
.apartment-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header-item {
  display: flex;
  gap: 8px;
  font-weight: 600;
  align-items: center;

  &:hover {
    color: var(--accent-color);
  }
  &.sort-active {
    color: var(--accent-color) !important;
  }
}
.sort-actions {
  display: flex;
  gap: 16px;
  padding-left: 4px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

th {
  background-color: transparent;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  height: 120px;
}

.apartment-row {

  &:hover {
    background-color: #f8f9fa;
  }
}

.layout-placeholder {
  width: 60px;
  height: 40px;
  background-color: #e9ecef;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 0.8rem;
}

.price {
  font-weight: 600;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .table-responsive {
    overflow-x: auto;
  }

  th, td {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }

  .layout-placeholder {
    width: 40px;
    height: 30px;
  }
}

@media (max-width: 480px) {
  th, td {
    padding: 0.5rem 0.25rem;
    font-size: 0.8rem;
  }
}
</style>
