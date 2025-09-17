<template>
  <div class="apartments-skeleton">

    <div class="skeleton-title"></div>

    <div class="skeleton-table">

      <div class="skeleton-table-header">
        <div class="skeleton-table-cell" style="width: 15%">
          <div class="skeleton-text" style="width: 80%"></div>
        </div>
        <div class="skeleton-table-cell" style="width: 25%">
          <div class="skeleton-text" style="width: 70%"></div>
        </div>
        <div class="skeleton-table-cell" style="width: 10%">
          <div class="skeleton-text" style="width: 60%"></div>
        </div>
        <div class="skeleton-table-cell" style="width: 10%">
          <div class="skeleton-text" style="width: 50%"></div>
        </div>
        <div class="skeleton-table-cell" style="width: 20%">
          <div class="skeleton-text" style="width: 60%"></div>
        </div>
      </div>

      <div class="skeleton-table-row" v-for="i in 6" :key="i">

        <div class="skeleton-table-cell" style="width: 15%">
          <div class="skeleton-image"></div>
        </div>

        <div class="skeleton-table-cell" style="width: 25%">
          <div class="skeleton-text" style="width: 80%"></div>
        </div>

        <div class="skeleton-table-cell" style="width: 10%">
          <div class="skeleton-text" style="width: 60%"></div>
        </div>

        <div class="skeleton-table-cell" style="width: 10%">
          <div class="skeleton-text" style="width: 70%"></div>
        </div>

        <div class="skeleton-table-cell" style="width: 20%">
          <div class="skeleton-text" style="width: 90%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="sass">
@use "assets/css/includes/apartment-skeleton"
</style>
