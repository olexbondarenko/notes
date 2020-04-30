import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Confirm from "@/plugins/confirm";
import Alert from "@/plugins/alert";

Vue.config.productionTip = true;

// Vue uses
Vue.use(Confirm);
Vue.use(Alert);

// Subscribe on store mutations, set localStorage like state
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
