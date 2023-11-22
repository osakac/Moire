<template>
  <ul class="check-list">
    <AsideFilterMaterialItem
      v-for="material in materials"
      :key="material.id"
      :material="material"
      v-model:picked-material="currentMaterial"
    />
  </ul>
</template>

<script setup>
import AsideFilterMaterialItem from "@/components/AsideFilter/AsideFilterMaterialItem.vue";
import { computed } from "vue";

const props = defineProps({
  materials: {
    type: Array,
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
