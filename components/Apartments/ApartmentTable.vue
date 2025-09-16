<template>
  <div class="apartment-table">
    <h1 class="page-title">Квартиры</h1>
    <div class="table-responsive">
      <table class="table">
        <thead>
        <tr>
          <th> Планировка </th>
          <th>Квартира</th>
          <th>
            <div class="header-item">S, м² <SortIcon/></div>
          </th>
          <th>
            <div class="header-item">Этаж <SortIcon/> </div>
          </th>
          <th>
            <div class="header-item">Цена, ₽ <SortIcon/> </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="apartment in apartments" :key="apartment.id" class="apartment-row">
          <td>
            <div class="layout-placeholder"></div>
          </td>
          <td>
            <strong>{{ apartment.type }} {{ apartment.number }}</strong>
          </td>
          <td>{{ apartment.area }}</td>
          <td>
            {{ apartment.currentFloor }}
            <span style="opacity: 0.5">{{`из ${apartment.totalFloor}`}}</span>
          </td>
          <td>
            <span class="price">{{ apartment.priceFormatted }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!apartments.length && !loading" class="no-results">
      <p>Квартиры по выбранным параметрам не найдены</p>
    </div>

    <button v-if="hasMore" class="load-more-btn" @click="$emit('loadMore')">
      Загрузить еще
    </button>
  </div>
</template>

<script setup lang="ts">
import SortIcon from "@/components/icons/SortIcon.vue";

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
  loading: Boolean,
  hasMore: Boolean
}

defineProps<Props>()

</script>

<style scoped lang="scss">
.apartment-table {
  width: calc(100% - 500px);
}

.header-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.load-more-btn {
  display: block;
  margin-top: 2rem;
  padding: 12px 24px;
  background-color: transparent;
  border: 1px solid #0B173933;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  width: auto;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--accent-color);
    color: white;
  }
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
