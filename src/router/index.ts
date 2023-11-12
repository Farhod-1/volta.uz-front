import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginPage from "@/views/LoginPage.vue";
import Register from "@/views/Register.vue";
import DevicesView from "@/views/DevicesView.vue";
import AddDeviceView from "@/views/AddDeviceView.vue";
import AboutViewVue from "@/views/AboutView.vue";
import PanelsView from "@/views/PanelsView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/devices",
      name: "devices",
      component: DevicesView,
    },
    {
      path: "/adddevice",
      name: "adddevice",
      component: AddDeviceView,
    },
    {
      path: "/panels",
      name: "panels",
      component: PanelsView,
    },

    {
      path: "/about",
      name: "about",
      component: AboutViewVue,
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.name !== "login" &&
    to.name !== "register" &&
    !localStorage.getItem("token")
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
