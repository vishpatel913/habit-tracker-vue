import { createApp } from "vue";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store, { storeKey } from "./store";

import AppLayout from "./layouts/AppLayout.vue";

createApp(App)
  .use(store, storeKey)
  .use(router)
  .component("AppLayout", AppLayout)
  .mount("#app");
