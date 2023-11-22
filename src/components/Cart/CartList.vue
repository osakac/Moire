<template>
  <ul class="cart__list">
    <CartItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script setup>
import CartItem from "@/components/Cart/CartItem.vue";
defineProps({
  products: {
    type: Array,
  },
});
</script>
