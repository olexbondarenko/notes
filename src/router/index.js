import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import CreateUser from "@/views/CreateUser.vue";
import SignInUser from "@/views/SignInUser.vue";
import AccountUser from "@/views/AccountUser.vue";
import NoteAdd from "../views/NoteAdd.vue";
import NoteEdit from "../views/NoteEdit.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: NotFound
  },
  {
    path: "/",
    name: "home",
    meta: {
      private: true
    },
    component: Home
  },
  {
    path: "/registration",
    name: "registration",
    component: CreateUser
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignInUser
  },
  {
    path: "/sign-out",
    name: "sign-out",
    meta: {
      private: true
    },
    beforeEnter: (to, from, next) => {
      store.dispatch("signOutUser").then(() => {
        next({
          path: "/sign-in"
        });
      });
    }
  },
  {
    path: "/account",
    name: "account",
    meta: {
      private: true
    },
    component: AccountUser
  },
  {
    path: "/note/add",
    name: "note-add",
    meta: {
      private: true
    },
    component: NoteAdd
  },
  {
    path: "/note/:id",
    name: "note",
    meta: {
      private: true
    },
    component: NoteEdit
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.private)) {
    Vue.nextTick(() => {
      if (!store.getters.isUserLoggedIn) {
        next({
          name: "sign-in"
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
