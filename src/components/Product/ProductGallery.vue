<template>
  <div class="item__pics pics">
    <div class="pics__wrapper">
      <img width="570" height="570" :src="mainImage" alt="" />
    </div>
    <ul class="pics__list">
      <li
        class="pics__item"
        v-for="image in gallery"
        :key="image.name"
        @click.prevent="changeMainImage(image.url)"
      >
        <a
          href=""
          class="pics__link"
          :class="{ 'pics__link--current': mainImage === image.url }"
        >
          <img width="98" height="98" :src="image.url" alt="" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  productColors: {
    type: Array,
  },
});

const gallery = computed(() => {
  let gallery = [];
  for (let color of props.productColors) {
    if (color.gallery) {
      const colorGallery = color.gallery.map((el) => el.file);
      gallery = gallery.concat(colorGallery);
    }
  }
  return gallery;
});

const mainImage = ref(gallery?.value[0]?.url);

function changeMainImage(imageUrl) {
  mainImage.value = imageUrl;
}

watch(gallery, (value) => {
  mainImage.value = value[0]?.file?.url;
});
</script>
