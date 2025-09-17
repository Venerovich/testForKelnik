<template>
  <div class="apartments-skeleton">
    <!-- Заголовок -->
    <div class="skeleton-title"></div>

    <!-- Таблица -->
    <div class="skeleton-table">
      <!-- Заголовки таблицы -->
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

      <!-- Строки с данными -->
      <div class="skeleton-table-row" v-for="i in 6" :key="i">
        <!-- Планировка (изображение) -->
        <div class="skeleton-table-cell" style="width: 15%">
          <div class="skeleton-image"></div>
        </div>

        <!-- Квартира -->
        <div class="skeleton-table-cell" style="width: 25%">
          <div class="skeleton-text" style="width: 80%"></div>
        </div>

        <!-- Площадь -->
        <div class="skeleton-table-cell" style="width: 10%">
          <div class="skeleton-text" style="width: 60%"></div>
        </div>

        <!-- Этаж -->
        <div class="skeleton-table-cell" style="width: 10%">
          <div class="skeleton-text" style="width: 70%"></div>
        </div>

        <!-- Цена -->
        <div class="skeleton-table-cell" style="width: 20%">
          <div class="skeleton-text" style="width: 90%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Пустой скрипт для скелетона
</script>

<style scoped>
.apartments-skeleton {
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  /*box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);*/
  width: 100%;
}

.skeleton-title {
  height: 36px;
  width: 220px;
  background: linear-gradient(90deg, #f6f6f6 25%, #ececec 50%, #f6f6f6 75%);
  background-size: 200% 100%;
  border-radius: 8px;
  margin-bottom: 28px;
  animation: skeleton-loading 1.8s ease-in-out infinite;
}

.skeleton-table {
  width: 100%;
}

.skeleton-table-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 2px solid #f3f3f3;
  margin-bottom: 16px;
}

.skeleton-table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 22px 0;
  border-bottom: 1px solid #f7f7f7;
}

.skeleton-table-cell {
  display: flex;
  align-items: center;
}

.skeleton-image {
  width: 70px;
  height: 50px;
  background: linear-gradient(90deg, #f6f6f6 25%, #ececec 50%, #f6f6f6 75%);
  background-size: 200% 100%;
  border-radius: 8px;
  animation: skeleton-loading 1.8s ease-in-out infinite;
}

.skeleton-text {
  height: 18px;
  background: linear-gradient(90deg, #f6f6f6 25%, #ececec 50%, #f6f6f6 75%);
  background-size: 200% 100%;
  border-radius: 6px;
  animation: skeleton-loading 1.8s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Адаптивность */
@media (max-width: 1024px) {
  .skeleton-table-header,
  .skeleton-table-row {
    grid-template-columns: 20% 30% 15% 15% 20%;
    gap: 16px;
  }

  .skeleton-image {
    width: 60px;
    height: 40px;
  }
}

@media (max-width: 768px) {
  .apartments-skeleton {
    padding: 24px 16px;
  }

  .skeleton-table-header,
  .skeleton-table-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .skeleton-table-cell {
    width: 100% !important;
  }

  .skeleton-image {
    width: 100%;
    height: 120px;
    margin-bottom: 8px;
  }
}
</style>
