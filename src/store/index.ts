import { createStore } from "vuex";

import user from "./userModule";
import { RootState } from "./types";

export default createStore<RootState>({
  modules: {
    user,
  },
});
