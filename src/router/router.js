import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import UserLogin from "../views/UserLogin.vue";
import UserSignup from "../views/UserSignup.vue";
import NotFound from "../views/NotFound.vue";
import { app } from "../api/firebase";
import { getAuth } from "firebase/auth";

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
    },
    {
      path: "/login",
      name: "UserLogin",
      component: UserLogin,
      meta: { requiresGuest: true },
    },
    {
      path: "/signup",
      name: "UserSignup",
      component: UserSignup,
      meta: { requiresGuest: true },
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
      meta: { requiresGuest: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth(app).currentUser === null) {
      next({
        name: "UserLogin",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (getAuth(app).currentUser !== null) {
      next({
        name: "Home",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
