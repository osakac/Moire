import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/MainPage.vue"),
  },
  {
    path: "/product/:productId",
    name: "product",
    props: true,
    component: () => import("@/views/ProductPage.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/CartPage.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/OrderPage.vue"),
  },
  {
    path: "/order-info/:orderId",
    name: "orderInfo",
    props: true,
    component: () => import("@/views/OrderInfoPage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notFoundPage",
    component: () => import("@/views/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
