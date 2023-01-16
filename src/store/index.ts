import { createStore } from "vuex";

export default createStore({
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  getters: {
    user(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
  },
  actions: {},
});
