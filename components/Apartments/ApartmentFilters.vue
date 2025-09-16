<template>
  <div class="apartment-filter">

    <div class="filter-params">
      <div class="btn--group">
        <button class="btn btn--round"
                v-for="room in rooms"
                :class="{'active': activeRoom === room.value}"
                @click="activeRoom = room.value"
                :key="room.value">{{ room.label }}</button>
      </div>

      <div class="filter-group">
        <label class="filter-label">Стоимость квартиры, ₽</label>

        <div class="range-inputs">
          <ui-input class="input-group"
                    v-model="priceMin"
          />
          <ui-input class="input-group"
                    prefix="до"
                    v-model="priceMax"
          />
        </div>

        <ui-range v-model:max="priceMax"
                  v-model:min="priceMin"
        />
      </div>

      <div class="filter-group">
        <label class="filter-label">Площадь, м²</label>
        <div class="range-inputs">
          <ui-input class="input-group" v-model="areaMin"/>
          <ui-input class="input-group" prefix="до" v-model="areaMax"/>
        </div>
        <ui-range v-model:max="areaMax"
                  v-model:min="areaMin"/>
      </div>

      <button class="btn btn--reset" @click="resetFilters">
        Сбросить параметры
        <close-icon/>
      </button>

    </div>

  </div>
</template>

<script setup>
import UiRange from "@/components/ui/ui-range.vue";
import CloseIcon from "@/components/icons/close-icon.vue";
import UiInput from "@/components/ui/ui-input.vue";

const priceMin = ref(5500000)
const priceMax = ref(18900000)
const activeRoom = ref(null)
const areaMin = ref('')
const areaMax = ref('')

const rooms = [
  {label: '1к', value: 1},
  {label: '2к', value: 2},
  {label: '3к', value: 3},
  {label: '4к', value: 4},
]

const resetFilters = () => {
  priceMin.value = 5500000
  priceMax.value = 18900000
  areaMin.value = ''
  areaMax.value = ''
  activeRoom.value = null
}
</script>

<style lang="scss" scoped>
.apartment-filter {
  max-width: 400px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(174, 228, 178, 0.3) 0%, rgba(149, 208, 161, 0.3) 100%);
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  max-height: 370px;
  position: -webkit-sticky;
  position: sticky;
  right: 0;
  top: 24px;
  z-index: 100;
  transition: all .3s ease-in-out;
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
