import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.View.vue";
import About from "@/views/About.View.vue";
import Manage from "@/views/Manage.View.vue";
import Song from "@/views/Song.View.vue";

import useUserStore from "../stores/User.State";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "manage",
    path: "/manage",
    alias: "/manage-music",
    component: Manage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  const store = useUserStore();

  if (!to.meta.requiresAuth) {
    next();
  } else if (store.isLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
