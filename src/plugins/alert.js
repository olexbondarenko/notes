import AlertModal from "@/components/Alert";

const Alert = {
  install(Vue) {
    this.EventBus = new Vue();
    Vue.component("Alert", AlertModal);
    Vue.prototype.$alert = {
      show(params) {
        Alert.EventBus.$emit("show", params);
      }
    };
  }
};

export default Alert;
