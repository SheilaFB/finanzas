import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChartView from "../views/ChartView";
import LoginView from "../views/LoginView";
import AnadirOperacion from "../views/AnadirOperacion";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/chart",
    name: "chart",
    component: ChartView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/add",
    name: "anadirOperacion",
    component: AnadirOperacion,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
