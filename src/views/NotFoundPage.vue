<template>
  <main class="container content">
    <h1 class="title">Страница не найдена</h1>
    <router-link :to="{ name: 'main' }" class="back-btn"
      >Вернуться на главную</router-link
    >
  </main>
</template>

<script setup></script>

<style scoped>
.title {
  margin: 0;
  text-align: center;
  margin-bottom: 40px;
}
.back-btn {
  display: block;
  margin: 0 auto;
  width: fit-content;
  border-radius: 15px;
  padding: 15px 30px;
  background: #e02d71;
  color: white;
}
</style>
