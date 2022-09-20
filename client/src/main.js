// import { createApp } from 'vue'
// import App from './App.vue'

// const router = require('./router');

// createApp(App).mount('#app')
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
