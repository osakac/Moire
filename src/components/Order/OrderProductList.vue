<template>
  <ul class="cart__orders">
    <li class="cart__order" v-for="product in products" :key="product.id">
      <h3>{{ product.product.title }}</h3>
      <b>{{ priceFormatter(product.price * product.quantity) }} ₽</b>
      <span>Артикул: {{ product.product.id }}</span>
      <span class="cart__quantity">{{ product.quantity }} шт.</span>
      <span>Размер: {{ product.size.title }}</span>
    </li>
  </ul>
</template>

<script setup>
import { priceFormatter } from "@/utils/priceFormatter";
defineProps({
  products: {
    type: Array,
  },
});
</script>

<style scoped>
.cart__quantity {
  text-align: right;
}
</style>
