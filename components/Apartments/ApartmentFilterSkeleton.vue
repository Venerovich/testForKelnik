<template>
  <div class="filters-skeleton">
    <div class="skeleton-heading" style="width: 120px"></div>
    <div class="skeleton-options">
      <div class="skeleton-option" v-for="i in 4" :key="i"></div>
    </div>

    <div class="skeleton-heading" style="width: 150px"></div>
    <div class="skeleton-range">
      <div class="skeleton-range-inputs">
        <div class="skeleton-input"></div>
        <div class="skeleton-input"></div>
      </div>
      <div class="skeleton-range-slider"></div>
    </div>

    <div class="skeleton-heading" style="width: 100px"></div>
    <div class="skeleton-range">
      <div class="skeleton-range-inputs">
        <div class="skeleton-input"></div>
        <div class="skeleton-input"></div>
      </div>
      <div class="skeleton-range-slider"></div>
    </div>

    <div class="skeleton-button"></div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="sass">
@use "assets/css/includes/apartment-filter-skeleton"
</style>
