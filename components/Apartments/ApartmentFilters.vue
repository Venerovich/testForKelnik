<script setup lang="ts">
import UiInput from "~/components/ui/ui-input.vue";
import CloseIcon from "~/components/icons/close-icon.vue";
import ApartmentFilterSkeleton from "@/components/Apartments/ApartmentFilterSkeleton.vue";
// @ts-ignore
import {ElSlider} from "element-plus"
import 'element-plus/dist/index.css'

const isMounted = ref(false)
const debounceTimer = ref(null)

const filters = defineModel('filter')
defineProps({
  rooms: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update-filters', 'reset-filters'])

const roomList = [
  {label: '1к', value: 1},
  {label: '2к', value: 2},
  {label: '3к', value: 3},
  {label: '4к', value: 4},
]

const filterBy = (value: number) => {
  if (value) {
    if (filters.value.rooms.includes(value)) {
      filters.value.rooms = filters.value.rooms.filter((el: number) => el !== value)
    }
    else filters.value.rooms.push(value)
  }
  emit('update-filters')
}

function debounce(fn: () => void, delay: number) {
  return (...args) => {
    clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const debouncedFilter = debounce(filterBy, 300)

setTimeout(() => {
  isMounted.value = true
})

</script>
<template>
  <ApartmentFilterSkeleton v-if="!isMounted"/>
  <div v-else class="apartment-filter">
    <div class="filter-params">
      <div class="btn--group">
        <button class="btn btn--round"
                v-for="room in roomList"
                :key="room.value"
                :class="{'active': filters.rooms.includes(room.value)}"
                @click="filterBy(room.value)"
                >{{ room.label }}</button>
      </div>

      <div class="filter-group">
        <label class="filter-label">Стоимость квартиры, ₽</label>

        <div class="range-inputs">
          <ui-input
            v-model="filters.priceRange[0]"
            type="number"
            class="input-group"
            @input="debouncedFilter(null)"
          />
          <ui-input
            v-model="filters.priceRange[1]"
            type="number"
            class="input-group"
            prefix="до"
            @input="debouncedFilter(null)"
          />
        </div>
          <client-only>
            <el-slider
              v-model="filters.priceRange"
              range
              :max="99999999"
              @change="debouncedFilter(null)"
            />
          </client-only>

      </div>

      <div class="filter-group">
        <label class="filter-label">Площадь, м²</label>
        <div class="range-inputs">

          <ui-input
            v-model="filters.areaRange[0]"
            type="number"
            class="input-group"
            @input="debouncedFilter(null)"
          />

          <ui-input
            v-model="filters.areaRange[1]"
            type="number"
            class="input-group"
            prefix="до"
            @input="debouncedFilter(null)"
          />
        </div>
        <client-only>
          <el-slider
            v-model="filters.areaRange"
            range
            :max="400"
            @change="debouncedFilter(null)"
          />
        </client-only>

      </div>

      <button type="button" class="btn btn--reset" @click="emit('reset-filters')">
        Сбросить параметры
        <close-icon/>
      </button>

    </div>

  </div>
</template>

<style lang="scss">
.el-slider__bar {
  background-color: var(--accent-color) !important;
  height: 3px;
}
.el-slider__button {
  background-color: var(--accent-color) !important;
  border: none;
  width: 14px !important;
  height: 14px !important;
}
.el-slider__button-wrapper {
  top: -16px !important;
}

.el-slider__runway {
  height: 3px;
}
.apartment-filter {
  min-width: 318px;
  max-width: 400px;
  height: fit-content;

  padding: 40px;
  background: var(--main-bg-color);
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  position: -webkit-sticky;
  position: sticky;
  right: 0;
  top: 24px;
  z-index: 100;
  transition: all .3s ease-in-out;

  @media (max-width: 960px) {}
  @media (max-width: 768px) {
    display: none;
    position: initial;
  }
  @media (max-width: 680px) {

  }
}

.filter-header {
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
  }
}

.filter-params {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;

  @media (max-width: 680px) {
    gap: 8px;
  }
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: #424242;
}

.input-group {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.prefix {
  position: absolute;
  z-index: 1;
  opacity: 0.5;
  font-size: 16px;
  font-family: 'PTRootUIWebMedium', sans-serif;
}
.range-inputs {
  display: flex;
  gap: 12px;
}
.filter-input {
  width: 100%;
  padding: 10px 10px 10px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  background-color: transparent;
  font-family: 'PTRootUIWebMedium', sans-serif;

  &:focus {
    outline: none;
    border-color: #2196f3;
  }

  &::placeholder {
    color: #9e9e9e;
  }
}

.reset-btn {
  width: 100%;
  padding: 12px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #424242;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #bdbdbd;
  }

  &:active {
    background-color: #eeeeee;
  }
}

// Адаптивность для мобильных устройств
@media (max-width: 480px) {
  .apartment-filter {
    padding: 16px;
  }

  .range-inputs {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
