<template>
  <li class="options__item">
    <label class="options__label">
      <input
        class="options__radio sr-only"
        type="radio"
        name="pay"
        :value="method.id"
        v-model="currentMethod"
      />
      <span class="options__value"> {{ method.title }} </span>
    </label>
  </li>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  method: {
    type: Object,
  },
  pickedMethod: {
    type: Number,
  },
});

const emit = defineEmits(["update:pickedMethod"]);

const currentMethod = computed({
  get() {
    return props.pickedMethod;
  },
  set(value) {
    emit("update:pickedMethod", value);
  },
});
</script>
