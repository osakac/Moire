<template>
  <ul class="colors colors--black">
    <li
      class="colors__item"
      v-for="color in colors"
      :key="color.id"
      :title="color.title"
    >
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          name="color"
          :value="color.id"
          v-model="currentColor"
        />
        <span class="colors__value" :style="`background-color: ${color.code}`">
        </span>
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
  pickedColor: {
    type: Number,
  },
});

const emit = defineEmits(["update:pickedColor"]);

const currentColor = computed({
  get() {
    return props.pickedColor;
  },
  set(value) {
    emit("update:pickedColor", value);
  },
});
</script>
