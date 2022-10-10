import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

if (process.env.NODE_ENV === "production") {
  process.env.APP_BASE_URL = "https://user-module22.herokuapp.com";
} else {
  process.env.APP_BASE_URL = "http://localhost:3000";
}
app.use(store);
app.use(router);

app.mount("#app");
