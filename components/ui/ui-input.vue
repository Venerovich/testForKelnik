<script setup lang="ts">

const modelValue = defineModel({default: '0'})
defineProps({
  prefix: {
    type: String,
    default: 'от'
  }
})
const emit = defineEmits(['input'])

const handleInput = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  let value = target.value.replace(/[^\d]/g, '');

  value = value.replace(/^0+/, '');

  modelValue.value = value;
  emit('input');
};
</script>
<template>
  <div>
    <span class="prefix">{{ prefix }}</span>
    <input
      v-model="modelValue"
      type="text"
      class="filter-input"
      v-bind="$attrs"
      @input="handleInput"
    >
  </div>
</template>

<style scoped lang="sass">
.prefix
  position: absolute
  z-index: 1
  opacity: 0.5
  font-size: 16px
  font-family: 'PTRootUIWebMedium', sans-serif

.filter-input
  width: 100%
  padding: 10px 10px 10px 30px
  border: none
  border-radius: 8px
  font-size: 16px
  transition: border-color 0.2s ease
  background-color: transparent
  font-family: 'PTRootUIWebMedium', sans-serif

  &:focus
    outline: none
    border-color: #2196f3

  &::placeholder
    color: #9e9e9e
</style>
