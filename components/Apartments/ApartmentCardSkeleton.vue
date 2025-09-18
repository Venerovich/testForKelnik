<template>
  <div class="mobile-apartments-skeleton">

    <div class="skeleton-sort-header">
      <div class="skeleton-sort-item" v-for="i in 3" :key="i"></div>
    </div>

    <div class="skeleton-cards">
      <div class="skeleton-card" v-for="i in 5" :key="i">

        <div class="skeleton-card-title"></div>

        <div class="skeleton-card-details">
          <div class="skeleton-detail" style="width: 60px"></div>
          <div class="skeleton-detail" style="width: 80px"></div>
          <div class="skeleton-detail" style="width: 100px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.mobile-apartments-skeleton
  padding: 16px
  background: #fff
  border-radius: 12px
  width: 100%
  display: flex
  flex-direction: column

.skeleton-sort-header
  display: flex
  gap: 16px
  margin-bottom: 20px
  padding-bottom: 12px
  border-bottom: 1px solid #f0f0f0

.skeleton-sort-item
  width: 60px
  height: 20px
  background: linear-gradient(90deg, #f5f5f5 25%, #e8e8e8 50%, #f5f5f5 75%)
  background-size: 200% 100%
  border-radius: 10px
  animation: skeleton-loading 1.8s ease-in-out infinite

.skeleton-cards
  display: flex
  flex-direction: column
  gap: 16px

.skeleton-card
  padding: 16px
  border: 1px solid #f0f0f0
  border-radius: 8px
  background: #fafafa

.skeleton-card-title
  height: 18px
  width: 70%
  background: linear-gradient(90deg, #f5f5f5 25%, #e8e8e8 50%, #f5f5f5 75%)
  background-size: 200% 100%
  border-radius: 6px
  margin-bottom: 12px
  animation: skeleton-loading 1.8s ease-in-out infinite

.skeleton-card-details
  display: flex
  gap: 12px
  flex-wrap: wrap
  align-items: center

.skeleton-detail
  height: 16px
  background: linear-gradient(90deg, #f5f5f5 25%, #e8e8e8 50%, #f5f5f5 75%)
  background-size: 200% 100%
  border-radius: 4px
  animation: skeleton-loading 1.8s ease-in-out infinite

@keyframes skeleton-loading
  0%
    background-position: 200% 0
  100%
    background-position: -200% 0

@media (max-width: 480px)
  .skeleton-sort-header
    gap: 12px

  .skeleton-sort-item
    width: 50px
    height: 18px

  .skeleton-card-details
    gap: 8px
    flex-direction: column
    align-items: flex-start

  .skeleton-detail
    width: 100% !important
</style>
