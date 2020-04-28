import ConfirmModal from "@/components/Confirm";

const Confirm = {
  install(Vue) {
    this.EventBus = new Vue();
    Vue.component("Confirm", ConfirmModal);
    Vue.prototype.$confirm = {
      show(params) {
        Confirm.EventBus.$emit("show", params);
      }
    };
  }
};

export default Confirm;
