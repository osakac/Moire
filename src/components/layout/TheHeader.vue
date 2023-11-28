<template>
  <header class="header container">
    <div class="header__wrapper">
      <router-link :to="{ name: 'main' }" class="header__info"
        >Каталог</router-link
      >

      <router-link :to="{ name: 'main' }" class="header__logo">
        <img
          src="@/assets/img/svg/logo-moire.svg"
          alt="Логотип интернет магазина Moire"
          width="116"
          height="34"
        />
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09"> 8 800 600 90 09 </a>

      <router-link
        :to="{ name: 'cart' }"
        class="header__cart"
        aria-label="Корзина с товарами"
      >
        <svg width="19" height="24">
          <use xlink:href="@/assets/img/svg/sprite.svg#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">{{
          $store.getters.getCart.length
        }}</span>
      </router-link>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.header__info:hover {
  color: #e02d71;
}
.header__tel:hover {
  color: #e02d71;
}
.header__cart {
  transition: all 0.5s ease;
}
.header__cart:hover {
  transform: scale(1.3);
}
</style>
