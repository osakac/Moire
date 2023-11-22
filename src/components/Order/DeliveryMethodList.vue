<template>
  <ul class="cart__options options">
    <DeliveryMethodItem
      v-for="method in deliveryMethods"
      :key="method.id"
      :method="method"
      v-model:picked-method="currentMethod"
    />
  </ul>
</template>

<script setup>
import { computed } from "vue";
import DeliveryMethodItem from "@/components/Order/DeliveryMethodItem.vue";

const props = defineProps({
  deliveryMethods: {
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
