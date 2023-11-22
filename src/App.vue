<template>
  <TheHeader />

  <router-view />

  <TheFooter />
</template>

<script setup>
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import { onMounted } from "vue";
import store from "@/store";

onMounted(async () => {
  await store.dispatch("loadUserAccessKey");
  await store.dispatch("loadCart");
});
</script>
