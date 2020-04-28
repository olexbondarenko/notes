import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/registration/",
    name: "registration",
    component: () => import("../views/CreateUser.vue")
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("../views/SignInUser.vue")
  },
  {
    path: "/sign-out",
    name: "sign-out",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/account/",
    name: "account",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/AccountUser.vue")
  },
  {
    path: "/",
    name: "home",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/NoteAdd.vue")
  },
  {
    path: "/notes",
    name: "notes",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/Notes.vue")
  },
  {
    path: "/note/add",
    name: "note-add",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/NoteAdd.vue")
  },
  {
    path: "/note/:id",
    name: "note",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/NoteEdit.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (
    from.name !== null &&
    from.name !== undefined &&
    to.matched.some(record => record.meta.requiresAuth)
  ) {
    if (!store.getters.isUserLoggedIn) {
      next({
        path: "/sign-in",
        query: {
          redirect: to.fullPath
        }
      });
    } else if (to.name === "sign-out") {
      store.dispatch("signOutUser").then(() => {
        next({
          path: "/sign-in"
        });
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
