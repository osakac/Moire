<template>
  <TheLoader v-if="loading" />
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

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form
        @submit.prevent="createOrder"
        class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <div class="cart__data">
            <OrderFormInput
              title="ФИО"
              placeholder="Введите ваше полное имя"
              v-model="orderData.name"
              :error="orderError.name"
            />

            <OrderFormInput
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
              v-model="orderData.address"
              :error="orderError.address"
            />

            <OrderFormInput
              title="Телефон"
              placeholder="Введите ваш телефон"
              input-type="tel"
              v-model="orderData.phone"
              :error="orderError.phone"
            />

            <OrderFormInput
              title="Email"
              placeholder="Введите ваш Email"
              input-type="email"
              v-model="orderData.email"
              :error="orderError.email"
            />

            <label class="form__label">
              <textarea
                class="form__input form__input--area"
                name="comments"
                placeholder="Ваши пожелания"
                v-model="orderData.comment"
              ></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <DeliveryMethodList
              :delivery-methods="deliveryMethods"
              v-model:picked-method="deliveryTypeId"
            />

            <h3 class="cart__title">Оплата</h3>
            <PaymentMethodList
              :payment-methods="paymentMethods"
              v-model:picked-method="paymentTypeId"
            />
          </div>
        </div>

        <div class="cart__block">
          <OrderProductList :products="products" />

          <div class="cart__total">
            <p>
              Доставка:
              <b>{{
                deliveryPrice > 0 ? `${deliveryPrice} ₽` : "бесплатно"
              }}</b>
            </p>
            <p>
              Итого: <b>{{ products.length }}</b> товара на сумму
              <b>{{ priceFormatter(totalPrice) }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-if="orderError.emptyCart" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p style="color: red">
            {{ orderError.emptyCart }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import OrderProductList from "@/components/Order/OrderProductList.vue";
import store from "@/store";
import { priceFormatter } from "@/utils/priceFormatter";
import OrderFormInput from "@/components/Order/OrderFormInput.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import DeliveryMethodList from "@/components/Order/DeliveryMethodList.vue";
import PaymentMethodList from "@/components/Order/PaymentMethodList.vue";
import TheLoader from "@/components/layout/TheLoader.vue";
import router from "@/router";

const products = computed(() => store.getters.getCart);

const totalPrice = computed(() => {
  const productsPrice = products.value.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );
  if (deliveryPrice.value > 0)
    return productsPrice + Number(deliveryPrice.value);
  return productsPrice;
});

const orderData = reactive({});
const orderError = ref({});

const deliveryPrice = computed(() => {
  return deliveryMethods.value.find((m) => m.id === deliveryTypeId.value).price;
});
const deliveryTypeId = ref(1);
const paymentTypeId = ref(1);
const deliveryMethods = ref([]);
const paymentMethods = ref([]);

watch(deliveryTypeId, async (value) => {
  paymentMethods.value = await store.dispatch("loadPaymentMethods", value);
  paymentTypeId.value = paymentMethods.value[0].id;
});

async function createOrder() {
  if (products.value.length === 0) {
    orderError.value.emptyCart =
      "Чтобы сделать заказ необходимо добавить хотя бы один товар в корзину";
    return;
  }

  orderError.value = {};
  const item = {
    name: orderData.name,
    address: orderData.address,
    phone: orderData.phone,
    email: orderData.email,
    comment: orderData.comment,
    deliveryTypeId: deliveryTypeId.value,
    paymentTypeId: paymentTypeId.value,
  };

  try {
    const response = await store.dispatch("createOrder", item);
    router.push({ name: "orderInfo", params: { orderId: response.data.id } });
  } catch (error) {
    orderError.value = error;
  }
}

const loading = ref(true);

onMounted(async () => {
  const responses = await Promise.all([
    store.dispatch("loadPaymentMethods", deliveryTypeId.value),
    store.dispatch("loadDeliveryMethods"),
  ]);
  [paymentMethods.value, deliveryMethods.value] = responses;
  loading.value = false;
});
</script>
