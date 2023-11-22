<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script setup>
import ProductItem from "@/components/Catalog/ProductItem.vue";

defineProps({
  products: {
    type: Array,
  },
});
</script>
