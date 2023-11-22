<template>
  <label class="form__label">
    <input
      class="form__input"
      :type="inputType"
      name="name"
      :placeholder="placeholder"
      v-model="inputValue"
    />
    <span class="form__value">{{ title }}</span>
    <span v-if="error" class="form__error">{{ error }}</span>
  </label>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  inputType: {
    type: String,
    default: "text",
  },
  error: {
    type: String,
  },
  modelValue: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
