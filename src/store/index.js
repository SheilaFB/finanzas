import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
  },
  getters: {
    getToken: (state) => state.token,
  },
  mutations: {
    setToken(state, newValue) {
      state.token = newValue;
    },
  },
});
