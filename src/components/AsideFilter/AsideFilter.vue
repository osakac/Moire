<template>
  <aside class="filter">
    <form
      class="filter__form form"
      @submit.prevent="applyFilter"
      action="#"
      method="get"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="number"
            name="min-price"
            placeholder="0"
            v-model.number="filter.minPrice"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="number"
            name="max-price"
            :placeholder="maxAvailablePrice"
            v-model.number="filter.maxPrice"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <AsideFilterCategorySelect
          :categories="categories"
          v-model:category="filter.categoryId"
        />
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <AsideFilterColors
          :colors="colors"
          v-model:picked-color="filter.colorIds"
        />
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <AsideFilterMaterialList
          :materials="materials"
          v-model:picked-material="filter.materialIds"
        />
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <AsideFilterSeasonsList
          :seasons="seasons"
          v-model:picked-season="filter.seasonIds"
        />
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        v-if="!isEmptyFilter"
        @click.prevent="resetFilter"
        class="filter__reset button button--second"
        type="button"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import AsideFilterMaterialList from "@/components/AsideFilter/AsideFilterMaterialList.vue";
import AsideFilterSeasonsList from "@/components/AsideFilter/AsideFilterSeasonsList.vue";
import AsideFilterCategorySelect from "@/components/AsideFilter/AsideFilterCategorySelect.vue";
import AsideFilterColors from "./AsideFilterColors.vue";
import router from "@/router";
import store from "@/store";
import { API_URL } from "@/store";

const props = defineProps({
  category: {
    type: Number,
  },
  maxAvailablePrice: {
    type: Number,
  },
});

const emit = defineEmits(["update:category"]);

const filter = reactive({
  minPrice: "",
  maxPrice: "",
  categoryId: props.category,
  colorIds: 0,
  materialIds: [],
  seasonIds: [],
});

async function applyFilter() {
  emit("update:category", filter.categoryId);
  await store.dispatch("loadProducts", filter);
  filterCheck();
  if (isEmptyFilter.value) router.replace({ query: {} });
}

async function resetFilter() {
  filter.minPrice = "";
  filter.maxPrice = "";
  filter.categoryId = 0;
  filter.colorIds = 0;
  filter.materialIds = [];
  filter.seasonIds = [];
  emit("update:category", filter.categoryId);
  isEmptyFilter.value = true;
  await store.dispatch("loadProducts");
  router.replace({ query: {} });
}

const isEmptyFilter = ref(true);

function filterCheck() {
  for (const key of Object.keys(filter)) {
    if (typeof filter[key] === "object") {
      if (filter[key].length) {
        isEmptyFilter.value = false;
        break;
      }
    } else if (filter[key]) {
      isEmptyFilter.value = false;
      break;
    } else isEmptyFilter.value = true;
  }
}

const categories = ref([]);
const colors = ref([]);
const materials = ref([]);
const seasons = ref([]);

onMounted(async () => {
  const responses = await Promise.all([
    axios.get(`${API_URL}/productCategories`),
    axios.get(`${API_URL}/colors`),
    axios.get(`${API_URL}/materials`),
    axios.get(`${API_URL}/seasons`),
  ]);
  const data = responses.map((res) => res.data.items);
  [categories.value, colors.value, materials.value, seasons.value] = data;

  if (props.category) isEmptyFilter.value = false;
});
</script>
