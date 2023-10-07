import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import { bootstrap } from "bootstrap/dist/js/bootstrap.bundle";
import { createApp } from "vue";
import vueCookies from "vue-cookies";
import router from "./router/router.js";

const app = createApp(App);
app.use(bootstrap);
app.use(vueCookies);
app.use(router);
app.mount("#app");
