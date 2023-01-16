import { Module } from "vuex";
import { RootState, UserModule } from "./types";

const userModule: Module<UserModule, RootState> = {
  state: {
    user: null,
    isLoggedIn: false,
  },

  getters: {
    user(state) {
      return state.user || null;
    },
    isLoggedIn(state) {
      return !!state.isLoggedIn;
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
};

export default userModule;
