<template>
  <TheLoader v-if="loading" class="loader" />
  <h1 v-else-if="products.length === 0" class="empty-title">
    В корзине нет товаров.
  </h1>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Корзина</h1>
        <span class="content__info">
          {{ $store.getters.getCart.length }} товара
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <CartList :products="products" />
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ priceFormatter(totalPrice) }} ₽</span>
          </p>

          <router-link
            :to="{ name: 'order' }"
            class="cart__button button button--primery"
            type="submit"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import store from "@/store";
import { computed, onMounted, ref } from "vue";
import TheLoader from "@/components/layout/TheLoader.vue";
import { priceFormatter } from "@/utils/priceFormatter";
import CartList from "@/components/Cart/CartList.vue";

const products = computed(() => store.getters.getCart);

const totalPrice = computed(() => {
  return products.value.reduce((acc, p) => acc + p.price * p.quantity, 0);
});

const loading = ref(true);

onMounted(async () => {
  await store.dispatch("loadCart");
  loading.value = false;
});
</script>

<style scoped>
.empty-title {
  margin: 0;
  padding: 50px 0;
  text-align: center;
}

.cart__button {
  text-align: center;
}
</style>
