<template>
  <TheLoader v-if="loading" />
  <template v-else-if="orderError">
    <h1 class="title">
      {{ orderError }}
    </h1>
    <router-link :to="{ name: 'main' }" class="back-btn"
      >Вернуться на главную</router-link
    >
  </template>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'cart' }" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <ClientInfoField title="Получатель" :content="order.name" />

            <ClientInfoField title="Адрес доставки" :content="order.address" />

            <ClientInfoField title="Телефон" :content="order.phone" />

            <ClientInfoField title="Email" :content="order.email" />

            <ClientInfoField
              title="Способ оплаты"
              :content="order.paymentType"
            />

            <ClientInfoField
              v-if="order.comment"
              title="Комментарий"
              :content="order.comment"
            />
          </ul>
        </div>

        <div class="cart__block">
          <OrderProductList :products="products" />

          <div class="cart__total">
            <p>
              Доставка:
              <b>{{
                order.deliveryType.price > 0
                  ? `${priceFormatter(order.deliveryType.price)} ₽`
                  : "бесплатно"
              }}</b>
            </p>
            <p>
              Итого: <b>{{ products.length }}</b> товара на сумму
              <b>{{ priceFormatter(order.totalPrice) }} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import store from "@/store";
import TheLoader from "@/components/layout/TheLoader.vue";
import OrderProductList from "@/components/Order/OrderProductList.vue";
import { priceFormatter } from "@/utils/priceFormatter";
import ClientInfoField from "@/components/OrderInfo/ClientInfoField.vue";

const props = defineProps({
  orderId: {
    type: String,
  },
});

const order = computed(() => store.getters.getOrderInfo);

const orderError = ref("");

const products = computed(() => order.value.basket.items);

const loading = ref(true);

onMounted(async () => {
  try {
    await store.dispatch("loadOrderInfo", props.orderId);
    loading.value = false;
  } catch (error) {
    loading.value = false;
    orderError.value = error.response.data.error.message;
  }
});
</script>

<style scoped>
.title {
  padding-top: 35px;
  margin: 0;
  text-align: center;
  margin-bottom: 40px;
}
.back-btn {
  display: block;
  margin: 0 auto 100px;
  width: fit-content;
  border-radius: 15px;
  padding: 15px 30px;
  background: #e02d71;
  color: white;
}
</style>
