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
      beforeEnter: (to, from, next) => {
        if (getAuth(app).currentUser === null) {
          next({ name: "UserLogin" });
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      name: "UserLogin",
      component: UserLogin,

      beforeEnter: (to, from, next) => {
        if (getAuth(app).currentUser !== null) {
          next({ name: "Home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/signup",
      name: "UserSignup",
      component: UserSignup,

      beforeEnter: (to, from, next) => {
        if (getAuth(app).currentUser !== null) {
          next({ name: "Home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   // Check for requiresAuth guard
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // Check if NO logged user
//     if (!getAuth(app).currentUser) {
//       // Go to login
//       next({
//         path: "/login",
//         query: {
//           redirect: to.fullPath,
//         },
//       });
//     } else {
//       // Proceed to route
//       next();
//     }
//   } else if (to.matched.some((record) => record.meta.requiresGuest)) {
//     // Check if NO logged user
//     if (getAuth(app).currentUser) {
//       // Go to login
//       next({
//         path: "/",
//         query: {
//           redirect: to.fullPath,
//         },
//       });
//     } else {
//       // Proceed to route
//       next();
//     }
//   } else {
//     // Proceed to route
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   const currentUser = getAuth(app).currentUser;
//   const isAuth = to.matched.some((record) => record.meta.requiresAuth);
//   console.log(currentUser);
//   console.log(isAuth);
//   if (isAuth && !currentUser) {
//     next({ name: "UserLogin" });
//   } else {
//     next();
//   }
// });

export default router;
