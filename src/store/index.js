import { createStore } from "vuex";
import axios from "axios";

export const API_URL = "https://vue-moire.skillbox.cc/api";

export default createStore({
  state: {
    products: [],
    product: {},
    cart: [],
    orderInfo: {},
  },
  getters: {
    getAccessKey() {
      return localStorage.getItem("accessKey");
    },
    getProducts(state) {
      return state.products;
    },
    getProduct(state) {
      return state.product;
    },
    getCart(state) {
      return state.cart;
    },
    getOrderInfo(state) {
      return state.orderInfo;
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setCart(state, items) {
      state.cart = items;
    },
    setOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  actions: {
    async loadUserAccessKey({ getters }) {
      if (!getters.getAccessKey) {
        const response = await axios.get(`${API_URL}/users/accessKey`);
        localStorage.setItem("accessKey", response.data.accessKey);
      }
    },
    async loadCart({ commit, getters }) {
      const response = await axios.get(`${API_URL}/baskets`, {
        params: {
          userAccessKey: getters.getAccessKey,
        },
      });
      commit("setCart", response.data.items);
    },
    async loadProducts({ commit }, params) {
      const response = await axios.get(`${API_URL}/products`, {
        params,
      });
      commit("setProducts", response.data.items);
    },
    async loadProductById({ commit }, id) {
      const response = await axios.get(`${API_URL}/products/${id}`);
      commit("setProduct", response.data);
    },
    async addProductToCart({ dispatch, getters }, productData) {
      await axios.post(`${API_URL}/baskets/products`, productData, {
        params: {
          userAccessKey: getters.getAccessKey,
        },
      });
      await dispatch("loadCart");
    },
    async removeProductFromCart({ dispatch, getters }, productId) {
      await axios.delete(`${API_URL}/baskets/products`, {
        params: {
          userAccessKey: getters.getAccessKey,
        },
        data: {
          basketItemId: productId,
        },
      });
      await dispatch("loadCart");
    },
    async changeProductQuantity(
      { dispatch, getters },
      { basketItemId, quantity }
    ) {
      await axios.put(
        `${API_URL}/baskets/products`,
        { basketItemId, quantity },
        {
          params: {
            userAccessKey: getters.getAccessKey,
          },
        }
      );
      await dispatch("loadCart");
    },
    async loadPaymentMethods(_, deliveryTypeId) {
      const response = await axios.get(`${API_URL}/payments`, {
        params: {
          deliveryTypeId,
        },
      });
      return response.data;
    },
    async loadDeliveryMethods() {
      const response = await axios.get(`${API_URL}/deliveries`);
      return response.data;
    },
    async createOrder({ dispatch, getters }, data) {
      try {
        const response = await axios.post(`${API_URL}/orders`, data, {
          params: { userAccessKey: getters.getAccessKey },
        });
        await dispatch("loadCart");
        return response;
      } catch (e) {
        throw e.response.data.error.request;
      }
    },
    async loadOrderInfo({ commit, getters }, orderId) {
      const response = await axios.get(`${API_URL}/orders/${orderId}`, {
        params: { userAccessKey: getters.getAccessKey },
      });
      commit("setOrderInfo", response.data);
    },
  },
  modules: {},
});
