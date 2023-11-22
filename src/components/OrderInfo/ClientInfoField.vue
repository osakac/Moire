<template>
  <li class="dictionary__item">
    <span class="dictionary__key"> {{ title }} </span>
    <span class="dictionary__value">
      {{ content }}
    </span>
  </li>
</template>

<script setup>
defineProps({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});
</script>
