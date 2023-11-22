<template>
  <ul class="check-list">
    <AsideFilterSeasonsItem
      v-for="season in seasons"
      :key="season.id"
      :season="season"
      v-model:picked-season="currentSeason"
    />
  </ul>
</template>

<script setup>
import AsideFilterSeasonsItem from "@/components/AsideFilter/AsideFilterSeasonsItem.vue";
import { computed } from "vue";

const props = defineProps({
  seasons: {
    type: Array,
  },
  pickedSeason: {
    type: Array,
  },
});

const emit = defineEmits(["update:pickedSeason"]);

const currentSeason = computed({
  get() {
    return props.pickedSeason;
  },
  set(value) {
    emit("update:pickedSeason", value);
  },
});
</script>
