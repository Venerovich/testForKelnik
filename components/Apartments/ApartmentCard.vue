<script setup lang="ts">

interface Apartment {
  id: number,
  type: string,
  rooms: number,
  number: string,
  area: number,
  price: number,
  priceFormatted: string,
  currentFloor: number,
  totalFloor: number
}
interface Props {
  apartment: Apartment
}

defineProps<Props>()

</script>
<template>
  <article class="apartment-card">

    <div class="apartment-card__content">

      <h3 class="apartment-card__title">{{ apartment.type }} {{ apartment.number }}</h3>

      <div class="apartment-card__details">
        <span class="apartment-card__area">{{ apartment.area }} м²</span>
        <span class="apartment-card__floor">
          {{ apartment.currentFloor }}
          <span style="opacity: 0.5">{{ `из ${apartment.totalFloor}` }}</span>
        </span>
        <span class="apartment-card__price">{{ apartment.priceFormatted }} ₽</span>
      </div>
    </div>
    <img
      src="~/assets/images/apartment-img.png"
      :alt="apartment.type"
      class="apartment-card__image"
    >
  </article>
</template>

<style lang="sass" scoped>
.apartment-card
  display: flex
  align-items: center
  justify-content: space-between
  border: 1px solid var(--border-color)
  border-radius: 8px
  padding: 16px 24px
  //min-width: 400px
  min-width: 290px
  width: 100%

  &__content
    display: flex
    flex-direction: column
    gap: 16px

  &__details
    display: flex
    gap: 20px
    flex-wrap: wrap
</style>
