<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="image(product.color.gallery)"
        width="120"
        height="120"
        :alt="product.product.title"
      />
    </div>
    <h3 class="product__title">{{ product.product.title }}</h3>
    <p class="product__info product__info--size">
      Размер: {{ product.size.title }}
    </p>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="`background-color: ${product.color.color.code}`"></i>
        {{ product.color.color.title }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ product.product.id }} </span>

    <div class="product__counter form__counter">
      <button
        @click="changeQuantity(productQuantity - 1)"
        type="button"
        aria-label="Убрать один товар"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="@/assets/img/svg/sprite.svg#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model="productQuantity" name="count" />

      <button
        @click="changeQuantity(productQuantity + 1)"
        type="button"
        aria-label="Добавить один товар"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="@/assets/img/svg/sprite.svg#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ priceFormatter(product.price * product.quantity) }} ₽
    </b>

    <button
      @click="removeProduct(product.id)"
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      style="cursor: pointer"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="@/assets/img/svg/sprite.svg#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script setup>
import store from "@/store";
import { priceFormatter } from "@/utils/priceFormatter";
import { computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
  },
});

const productQuantity = computed({
  get() {
    return props.product.quantity;
  },
  set(value) {
    if (value < 1 || value === "-") return;
    changeQuantity(value);
  },
});
function changeQuantity(newQuantity) {
  if (newQuantity < 1) return;
  store.dispatch("changeProductQuantity", {
    basketItemId: props.product.id,
    quantity: newQuantity,
  });
}

function image(gallery) {
  if (gallery) return gallery[0].file.url;
  return "";
}

function removeProduct(productId) {
  store.dispatch("removeProductFromCart", productId);
}
</script>
