<script setup>

const min = defineModel('min', {default: 1})
const max = defineModel('max', {default: 10})

const props = defineProps({
  rangeMin: {
    type: String,
    default: '1',
  },
  rangeMax: {
    type: String,
    default: '1',
  },
})

const updateSlider = (value, type) => {
  if (Number(min.value) > Number(max.value)) {
    min.value = value - 1
    max.value = value
  }
  else type === 'min' ? min.value = value : max.value = value
}

const styles = computed(() => {
  return {
    left: `${(min.value - Number(props.rangeMin)) / (Number(props.rangeMax) - Number(props.rangeMin)) * 100}%`,
    right: `${(100 - (max.value - Number(props.rangeMin)) / (Number(props.rangeMax) - Number(props.rangeMin)) * 100)}%`
  }
})

</script>
<template>
  <div class="slider-container">
    <div class="slider-track" :style="styles"/>
    <input
      v-model="min"
      type="range"
      :min="rangeMin"
      :max="rangeMax"
      step="1"
      v-bind="$attrs"
      class="slider slider-min"
      @input="updateSlider($event.target.value, 'min')"
    >
    <input
      v-model="max"
      type="range"
      :min="rangeMin"
      :max="rangeMax"
      step="1"
      v-bind="$attrs"
      class="slider slider-max"
      @input="updateSlider($event.target.value, 'max')"
    >
  </div>
</template>

<style scoped lang="scss">

.slider-container {
  position: relative;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
}

.slider-track {
  position: absolute;
  height: 100%;
  background-color: #3EB57C;
  border-radius: 2px;
}

.slider {
  position: absolute;
  width: 100%;
  height: 4px;
  top: 0;
  left: 0;
  margin: 0;
  pointer-events: none;
  appearance: none;
  background: none;
  z-index: 2;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: #3EB57C;
    cursor: pointer;
    pointer-events: auto;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2196f3;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 2px 6px rgba(33, 150, 243, 0.4);
    border: 2px solid #fff;
  }
}

@media (max-width: 480px) {

  .range-inputs {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
