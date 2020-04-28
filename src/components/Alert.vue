<template>
  <div class="alert" v-if="visibility">
    <transition-group name="fade">
      <div
        class="alert__message"
        v-for="message in messages"
        :class="message.className"
        :key="message.index"
      >
        <h6 class="alert__title">{{ message.title }}</h6>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Alert from "@/plugins/alert";

export default {
  name: "Alert",
  data() {
    return {
      visibility: false,
      messages: [],
      index: 0,
      className: "",
      title: ""
    };
  },
  methods: {
    // Begin show messages
    show: function(params) {
      let title = (this.title = params.title);
      let className = (this.className = params.className);
      let message = {
        index: this.index++,
        title,
        className
      };

      // Begin add message and show alert
      this.messages.push(message);
      this.visibility = true;

      // Begin delete message
      setTimeout(() => {
        this.messages.shift();
      }, 4000);

      // begin hide alert
      if (this.messages.length === 0) {
        this.visibility = false;
      }
    }
  },
  beforeMount() {
    Alert.EventBus.$on("show", params => {
      this.show(params);
    });
  }
};
</script>
<style scoped lang="scss">
.alert {
  position: fixed;
  left: 50%;
  bottom: 30px;
  width: 100%;
  max-width: 720px;
  transform: translateX(-50%);
  &__message {
    margin-bottom: 10px;
    padding: 15px 30px;
    border-radius: 3px;
    color: #fff;
    &.success {
      background: #1aaf37;
    }
    &.error {
      background: #ff0476;
    }
  }
  &__title {
    margin-top: 0;
    font-size: 14px;
  }
}
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 1s linear;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
