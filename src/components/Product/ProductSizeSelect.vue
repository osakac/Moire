<template>
  <label class="form__label form__label--small form__label--select">
    <select class="form__select" name="category" v-model="size">
      <option v-for="size in sizes" :key="size.id" :value="size.id">
        {{ size.title }}
      </option>
    </select>
  </label>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  sizes: {
    type: Array,
  },
  productSizeId: {
    type: Number,
  },
});

const emit = defineEmits(["update:productSizeId"]);

const size = computed({
  get() {
    return props.productSizeId;
  },
  set(value) {
    emit("update:productSizeId", value);
  },
});
</script>
