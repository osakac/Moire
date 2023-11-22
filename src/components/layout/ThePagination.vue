<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        @click.prevent="prevPage"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': currentPage === 1 }"
        href="#"
        aria-label="Предыдущая страница"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="@/assets/img/svg/sprite.svg#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="page in totalPages" :key="page">
      <a
        @click.prevent="changePage(page)"
        class="pagination__link cursor-pointer"
        :class="{ 'pagination__link--current': page === currentPage }"
      >
        {{ page }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        @click.prevent="nextPage"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': currentPage === totalPages }"
        href="#"
        aria-label="Следующая страница"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="@/assets/img/svg/sprite.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
  },
  productsPerPage: {
    type: Number,
  },
  totalPages: {
    type: Number,
  },
});

const emit = defineEmits(["update:currentPage"]);

function prevPage() {
  if (props.currentPage !== 1) {
    emit("update:currentPage", props.currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function nextPage() {
  if (props.currentPage !== props.totalPages) {
    emit("update:currentPage", props.currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function changePage(pageNumber) {
  emit("update:currentPage", pageNumber);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
