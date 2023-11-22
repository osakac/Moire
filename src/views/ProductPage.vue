<template>
  <TheLoader v-if="loading" class="loader" />
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            :to="{ name: 'main', query: { categoryId: product.category.id } }"
            class="breadcrumbs__link"
          >
            {{ product.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ product.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <ProductGallery :product-colors="product.colors" />

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="submit">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button
                  @click="changeQuantity(productQuantity - 1)"
                  type="button"
                  aria-label="Убрать один товар"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use
                      xlink:href="@/assets/img/svg/sprite.svg#icon-minus"
                    ></use>
                  </svg>
                </button>

                <input type="text" :value="productQuantity" name="count" />

                <button
                  @click="changeQuantity(productQuantity + 1)"
                  type="button"
                  aria-label="Добавить один товар"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use
                      xlink:href="@/assets/img/svg/sprite.svg#icon-plus"
                    ></use>
                  </svg>
                </button>
              </div>

              <b class="item__price"> {{ priceFormatter(totalPrice) }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ProductColors
                  :colors="product.colors"
                  v-model:item-color-id="itemColorId"
                />
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <ProductSizeSelect
                  :sizes="product.sizes"
                  v-model:product-size-id="productSizeId"
                />
              </fieldset>
            </div>

            <button
              class="item__button button button--primery"
              type="submit"
              :disabled="submitting"
            >
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item" @click.prevent="changeTab('Descr')">
            <a
              class="tabs__link"
              :class="{ 'tabs__link--current': currentTab === 'Descr' }"
              href="#"
            >
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item" @click.prevent="changeTab('Delivery')">
            <a
              class="tabs__link"
              :class="{ 'tabs__link--current': currentTab === 'Delivery' }"
              href="#"
            >
              Доставка и возврат
            </a>
          </li>
        </ul>

        <component :is="tabName" />
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import store from "@/store";
import TheLoader from "@/components/layout/TheLoader.vue";
import { priceFormatter } from "@/utils/priceFormatter";
import ProductColors from "@/components/Product/ProductColors.vue";
import ProductSizeSelect from "@/components/Product/ProductSizeSelect.vue";
import ProductGallery from "@/components/Product/ProductGallery.vue";
import ProductDescr from "@/components/Product/ProductDescr.vue";
import ProductDelivery from "@/components/Product/ProductDelivery.vue";

const props = defineProps({
  productId: {
    type: String,
  },
});

const product = computed(() => store.getters.getProduct);

const totalPrice = computed(() => product.value.price * productQuantity.value);

const productQuantity = ref(1);
function changeQuantity(newQuantity) {
  if (newQuantity === 0) return;
  productQuantity.value = newQuantity;
}

const itemColorId = ref(0);

const productSizeId = ref(0);

const loading = ref(true);

const components = {
  ProductDescr,
  ProductDelivery,
};
const currentTab = ref("Descr");
const tabName = computed(() => components[`Product${currentTab.value}`]);
function changeTab(tabName) {
  currentTab.value = tabName;
}

const submitting = ref(false);
async function submit() {
  submitting.value = true;
  const item = {
    productId: product.value.id,
    colorId: itemColorId.value,
    sizeId: productSizeId.value,
    quantity: productQuantity.value,
  };
  await store.dispatch("addProductToCart", item);
  submitting.value = false;
}

watch(product, (value) => {
  itemColorId.value = value.colors[0].color.id;
  productSizeId.value = value.sizes[0].id;
});

onMounted(async () => {
  await store.dispatch("loadProductById", props.productId);
  loading.value = false;
});
</script>
