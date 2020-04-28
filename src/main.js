import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import * as firebase from "firebase/app";
import Confirm from "@/plugins/confirm";
import Alert from "@/plugins/alert";

Vue.config.productionTip = true;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
};

Vue.use(Confirm);
Vue.use(Alert);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
