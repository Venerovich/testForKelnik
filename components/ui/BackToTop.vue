<template>
  <button
    class="back-to-top"
    :class="{'active': isVisible}"
    @click="scrollToTop"
    aria-label="Вернуться наверх"
  >
    <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.99998 14.0032L4.99998 2.00319M4.99998 2.00319L9.00061 6.00319M4.99998 2.00319L0.99935 6.00319" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>

  </button>
</template>

<script setup lang="ts">
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

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  bottom: -100px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--main-bg-color);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &.active {
    bottom: 20px;
  }

  &:hover {
    background-color: var(--accent-color);
  }
}
</style>
