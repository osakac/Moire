<template>
  <li class="check-list__item">
    <label class="check-list__label">
      <input
        class="check-list__check sr-only"
        type="checkbox"
        name="collection"
        :value="season.id"
        v-model="currentSeason"
      />
      <span class="check-list__desc">
        {{ season.title }}
        <span>({{ season.productsCount }})</span>
      </span>
    </label>
  </li>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  season: {
    type: Object,
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
