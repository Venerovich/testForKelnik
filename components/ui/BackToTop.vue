<template>
  <button
    class="back-to-top"
    :class="{'active': isVisible}"
    @click="scrollToTop"
    aria-label="Вернуться наверх"
  >
    <ArrowIcon/>
  </button>
</template>

<script setup lang="ts">
import ArrowIcon from "@/components/icons/arrow-icon.vue";

const isVisible = ref(false)

const checkScroll = () => {
  isVisible.value = window.scrollY > 200
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

</script>

<style lang="sass" scoped>
.back-to-top
  position: fixed
  bottom: -100px
  right: 20px
  width: 50px
  height: 50px
  border-radius: 50%
  background: var(--main-bg-color)
  color: white
  border: none
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  transition: all 0.3s ease-in-out

  &.active
    bottom: 20px

  &:hover
    background-color: var(--accent-color)

</style>
