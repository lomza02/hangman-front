import { createRouter, createWebHashHistory } from "vue-router";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import GameView from "../views/GameView.vue";
import MainView from "../views/MainView.vue";
import MyRecordsView from "../views/MyRecordsView.vue";
import helper from "@/services/helper";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
    meta: { requiresAuth: true },
  },
  {
    path: "/my-records",
    name: "myRecords",
    component: MyRecordsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { redirectToMain: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { redirectToMain: true },
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!helper.isLoggedIn()) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
