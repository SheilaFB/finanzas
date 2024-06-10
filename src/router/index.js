import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChartView from "../views/ChartView";
import LoginView from "../views/LoginView";
import AnadirOperacion from "../views/AnadirOperacion";
import OperacionesView from "../views/OperacionesView";
import PerfilView from "@/views/PerfilView.vue";

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
    path: "/add/:isIngreso?/:operacion?/:home",
    name: "add",
    component: AnadirOperacion,
    props: true,
  },
  {
    path: "/operaciones",
    name: "operaciones",
    component: OperacionesView,
  },
  {
    path: "/perfil",
    name: "perfil",
    component: PerfilView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");

  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
