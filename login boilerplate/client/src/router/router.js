import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/UserView.vue";
import UserDetailView from "../views/UserDetailView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
    },
    {
      path: "/userdetail",
      name: "userdetail",
      component: UserDetailView,
    },
  ],
});

export default router;
