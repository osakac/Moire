<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="item in colors" :key="item">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :value="item.color.id"
          v-model="color"
        />
        <span
          class="colors__value"
          :style="`background-color: ${item.color.code}`"
        ></span>
      </label>
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  colors: {
    type: Array,
  },
  itemColorId: {
    type: Number,
  },
});

const emit = defineEmits(["update:itemColorId"]);

const color = computed({
  get() {
    return props.itemColorId;
  },
  set(value) {
    emit("update:itemColorId", value);
  },
});
</script>
