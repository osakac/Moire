<template>
  <li class="check-list__item">
    <label class="check-list__label">
      <input
        class="check-list__check sr-only"
        type="checkbox"
        name="material"
        :value="material.id"
        v-model="currentMaterial"
      />
      <span class="check-list__desc">
        {{ material.title }}
        <span>({{ material.productsCount }})</span>
      </span>
    </label>
  </li>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  material: {
    type: Object,
  },
  pickedMaterial: {
    type: Array,
  },
});

const emit = defineEmits(["update:pickedMaterial"]);

const currentMaterial = computed({
  get() {
    return props.pickedMaterial;
  },
  set(value) {
    emit("update:pickedMaterial", value);
  },
});
</script>
