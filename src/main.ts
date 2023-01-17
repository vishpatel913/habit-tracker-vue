import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import AppLayout from "./layouts/AppLayout.vue";

import "vant/lib/index.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.component("AppLayout", AppLayout);

app.mount("#app");
