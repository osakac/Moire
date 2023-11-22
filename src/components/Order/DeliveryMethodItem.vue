<template>
  <li class="options__item">
    <label class="options__label">
      <input
        class="options__radio sr-only"
        type="radio"
        name="delivery"
        :value="method.id"
        v-model="currentMethod"
      />
      <span class="options__value">
        {{ method.title }}: <b>{{ price(method.price) }}</b>
      </span>
    </label>
  </li>
</template>

<script setup>
import { computed } from "vue";
import { priceFormatter } from "@/utils/priceFormatter";

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

function price(price) {
  if (price > 0) return `${priceFormatter(price)} ₽`;
  return "бесплатно";
}
</script>
