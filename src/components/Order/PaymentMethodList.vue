<template>
  <ul class="cart__options options">
    <PaymentMethodItem
      v-for="method in paymentMethods"
      :key="method.id"
      :method="method"
      v-model:picked-method="currentMethod"
    />
  </ul>
</template>

<script setup>
import { computed } from "vue";
import PaymentMethodItem from "@/components/Order/PaymentMethodItem.vue";

const props = defineProps({
  paymentMethods: {
    type: Array,
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
