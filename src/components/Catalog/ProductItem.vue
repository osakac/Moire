<template>
  <li class="catalog__item">
    <router-link
      :to="{ name: 'product', params: { productId: product.id } }"
      class="catalog__pic"
      href="#"
    >
      <img :src="image" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ priceFormatter(product.price) }} ₽ </span>

    <ProductColors
      :colors="product.colors"
      v-model:item-color-id="itemColorId"
    />

    <button
      @click="addProductToCart"
      class="catalog__add-btn"
      :disabled="submitting"
    >
      в корзину
    </button>
  </li>
</template>

<script setup>
import { priceFormatter } from "@/utils/priceFormatter.js";
import { computed, ref } from "vue";
import ProductColors from "@/components/Product/ProductColors.vue";
import store from "@/store";
import { API_URL } from "@/store";
import axios from "axios";

const props = defineProps({
  product: {
    type: Object,
  },
});

const itemColorId = ref(props.product.colors[0].color.id);
const image = computed(() => {
  const object = props.product.colors.find(
    (item) => item.color.id === itemColorId.value
  );
  return object.gallery ? object.gallery[0].file.url : "";
});

const submitting = ref(false);

async function addProductToCart() {
  submitting.value = true;
  const response = await axios.get(`${API_URL}/products/${props.product.id}`);
  const productData = {
    productId: props.product.id,
    colorId: itemColorId.value,
    sizeId: response.data.sizes[0].id,
    quantity: 1,
  };
  await store.dispatch("addProductToCart", productData);
  submitting.value = false;
}
</script>

<style scoped>
.catalog__add-btn {
  margin-top: 15px;
  border: none;
  background: rgb(66, 124, 66);
  color: white;
  font-size: 14px;
  font-family: inherit;
  border-radius: 5px;
  text-transform: uppercase;
  padding: 5px 10px;
  letter-spacing: 1.5px;
  cursor: pointer;
}
</style>
