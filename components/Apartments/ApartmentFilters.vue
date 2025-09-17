<script setup lang="ts">
import UiInput from "~/components/ui/ui-input.vue";
import CloseIcon from "~/components/icons/close-icon.vue";
import ApartmentFilterSkeleton from "@/components/Apartments/ApartmentFilterSkeleton.vue";
// @ts-ignore
import {ElSlider} from "element-plus"
import 'element-plus/dist/index.css'

const isMounted = ref(false)
const debounceTimer: Ref<ReturnType<typeof setTimeout> | null> = ref(null);

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
    } else filters.value.rooms.push(value)
  }
  emit('update-filters')
}

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  return (...args: Parameters<T>) => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value);
    }

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
        >{{ room.label }}
        </button>
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

<style lang="sass">
@use "assets/css/includes/apartment-filter"
</style>
