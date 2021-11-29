import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Todos from "../components/Todos.vue";
import Calendar from "../components/Calendar.vue";
import Weather from "../components/Weather.vue";
import News from "../components/News.vue";
import UserLogin from "../views/UserLogin.vue";
import UserSignup from "../views/UserSignup.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/todos",
          name: "Todos",
          component: Todos,
          meta: { requiresAuth: true },
        },
        {
          path: "/calendar",
          name: "Calendar",
          component: Calendar,
          meta: { requiresAuth: true },
        },
        {
          path: "/weather",
          name: "Weather",
          component: Weather,
          meta: { requiresAuth: true },
        },
        {
          path: "/news",
          name: "News",
          component: News,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/login",
      name: "UserLogin",
      component: UserLogin,
      meta: { guest: true },
    },
    {
      path: "/signup",
      name: "UserSignup",
      component: UserSignup,
      meta: { guest: true },
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const guest = to.matched.some((record) => record.meta.guest);
  const authenticatedUser = localStorage.getItem("user");

  if (requiresAuth && !authenticatedUser) {
    next({
      path: "/login",
    });
  } else if (guest && authenticatedUser) {
    next({
      path: "/",
    });
  } else {
    next();
  }
});

export default router;
