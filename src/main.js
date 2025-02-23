import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.config.globalProperties.document = document;
app.config.globalProperties.window = window;

app.mount("#app");
