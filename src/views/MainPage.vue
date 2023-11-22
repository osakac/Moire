<template>
  <TheLoader v-if="loading" class="loader" />
  <main v-else class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ products.length }} товара </span>
      </div>
      <label class="products-per-page">
        Количество товаров на странице:
        <select class="select" v-model="productsPerPage">
          <option :value="12" class="select__option">12</option>
          <option :value="24" class="select__option">24</option>
          <option :value="32" class="select__option">32</option>
        </select>
      </label>
    </div>

    <div class="content__catalog">
      <AsideFilter
        v-model:category="filter.category"
        :maxAvailablePrice="maxAvailablePrice"
      />

      <section class="catalog">
        <h1 v-if="products.length === 0" style="text-align: center">
          Результатов нет
        </h1>
        <ProductList :products="productsList" />

        <ThePagination
          v-model:current-page="currentPage"
          :products-per-page="productsPerPage"
          :total-pages="totalPages"
        />
      </section>
    </div>
  </main>
</template>

<script setup>
import TheLoader from "@/components/layout/TheLoader.vue";
import AsideFilter from "@/components/AsideFilter/AsideFilter.vue";
import ProductList from "@/components/Catalog/ProductList.vue";
import ThePagination from "@/components/layout/ThePagination.vue";
import store from "@/store";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const products = computed(() => store.getters.getProducts);

const maxAvailablePrice = computed(() => {
  return products.value.length
    ? Math.max(...products.value.map((el) => el.price))
    : 0;
});

const productsList = computed(() => {
  const startIndex = (currentPage.value - 1) * productsPerPage.value;
  const endIndex = startIndex + productsPerPage.value;
  return products.value.slice(startIndex, endIndex);
});

const currentPage = ref(1);
const productsPerPage = ref(12);
const totalPages = computed(() =>
  Math.ceil(products.value.length / productsPerPage.value)
);

const filter = reactive({
  category: 0,
});

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  if (route.query.categoryId) {
    const params = { categoryId: route.query.categoryId };
    filter.category = +route.query.categoryId;
    await store.dispatch("loadProducts", params);
  } else await store.dispatch("loadProducts");
  loading.value = false;
});
</script>

<style scoped>
.content__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.products-per-page {
  color: #9d9d9d;
  position: relative;
}

.select {
  padding: 5px 15px 5px 15px;
  font-size: inherit;
  font-family: inherit;
  font-weight: 500;
  border: none;
  outline: none;
  appearance: none;
}

.products-per-page::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  width: 14px;
  height: 7px;
  background-image: url(@/assets/img/svg/icon-arrow-bottom.svg);
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
