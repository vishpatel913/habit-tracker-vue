import { createApp } from "vue";
import { createPinia } from "pinia";

import { Locale } from "vant";
import enUS from "vant/es/locale/lang/en-US";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import "vant/lib/index.css";

Locale.use("en-US", enUS);

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
