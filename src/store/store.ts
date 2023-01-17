import { InjectionKey } from "vue";
import {
  createStore,
  Store as VuexStore,
  useStore as useVuexStore,
} from "vuex";

import user from "./userModule";
import { RootState } from "./types";

// type Store = Omit<VuexStore<RootState>, "getters"> & { getters: RootState };
type Store = VuexStore<RootState>;

export const storeKey: InjectionKey<Store> = Symbol();

export const useStore = (): Store => useVuexStore(storeKey);

export default createStore<RootState>({
  modules: {
    user,
  },
});
