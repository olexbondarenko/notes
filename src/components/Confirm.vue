<template>
  <div class="confirm" v-if="visibility">
    <div class="confirm__content">
      <h2 class="confirm__title">{{ title }}</h2>
      <div class="confirm__buttons">
        <button type="button" class="btn" @click="confirm">
          {{ confirmText }}
        </button>
        <button type="button" class="btn btn_bg_deeppinc" @click="cancel">
          {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Confirm from "@/plugins/confirm";

export default {
  name: "Confirm",
  data() {
    return {
      visibility: false,
      title: "",
      confirmText: "",
      cancelText: "",
      onConfirm: {}
    };
  },
  methods: {
    confirm() {
      if (typeof this.onConfirm === "function") {
        this.onConfirm();
        this.cancel();
      } else {
        this.cancel();
      }
    },
    cancel() {
      this.visibility = false;
    },
    show: function(params) {
      this.visibility = true;
      this.title = params.title;
      this.confirmText = params.confirmText;
      this.cancelText = params.cancelText;
      this.onConfirm = params.onConfirm;
    }
  },
  beforeMount() {
    Confirm.EventBus.$on("show", params => {
      this.show(params);
    });
  }
};
</script>
<style scoped lang="scss">
.confirm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  &__content {
    max-width: 500px;
    margin: 30px auto;
    padding: 30px 30px;
    background: #ffffff;
    border-radius: 5px;
  }
  &__title {
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 15px;
    font-size: 18px;
    border-bottom: 1px solid #d4d4d4;
  }

  &__buttons {
    text-align: right;
    .btn {
      margin-right: 10px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
