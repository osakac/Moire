<template>
  <label class="form__label form__label--select">
    <select class="form__select" name="category" v-model="pickedCategory">
      <option :value="0">Все категории</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.title }}
      </option>
    </select>
  </label>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  categories: {
    type: Array,
  },
  category: {
    type: Number,
  },
});

const emit = defineEmits(["update:category"]);

const pickedCategory = computed({
  get() {
    return props.category;
  },
  set(value) {
    emit("update:category", value);
  },
});
</script>
