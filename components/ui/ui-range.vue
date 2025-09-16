<script setup>
const minValue = defineModel('min')
const maxValue = defineModel('max')

const updateSlider = (value, type) => {
  if (Number(minValue.value) > Number(maxValue.value)) {
    minValue.value = value - 10000
    maxValue.value = value
  } else type === 'min' ? minValue.value = value : maxValue.value = value
}

</script>
<template>
  <div class="slider-container">
    <div class="slider-track"/>
    <input
      type="range"
      min="5500000"
      max="18900000"
      step="100000"
      :value="minValue"
      v-bind="$attrs"
      class="slider slider-min"
      @input="updateSlider($event.target.value, 'min')"
    >
    <input
      type="range"
      min="5500000"
      max="18900000"
      step="100000"
      :value="maxValue"
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
  left: calc((v-bind(min) - 5500000) / (18900000 - 5500000) * 100%);
  right: calc(100% - (v-bind(max) - 5500000) / (18900000 - 5500000) * 100%);
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
