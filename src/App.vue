<template>
  <div id="app">
    <Loader :class="getLoaderStatus ? 'active' : ''" />
    <Header />
    <div class="page">
      <div class="container">
        <router-view />
      </div>
    </div>
    <Alert />
    <Confirm />
  </div>
</template>
<script>
import Loader from "@/components/Loader.vue";
import Header from "@/components/Header.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Loader,
    Header
  },
  computed: {
    ...mapGetters(["getLoaderStatus"])
  },
  beforeCreate() {
    this.$store.commit("initialiseStore");
    this.$store.commit("checkAuthState");
    // this.$store.dispatch("userNotes");
  }
};
</script>
<style lang="scss">
/* Begin imports */
@import "../node_modules/reset-css/sass/_reset";
/* // */
/* Begin default styles */
*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  min-height: 100%;
}

body {
  background-color: #f6f6f6;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  color: #ff0476;
}

input,
textarea {
  font-family: Helvetica, Arial, sans-serif;
  &:focus {
    outline: none;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input,
  textarea,
  button {
    background-image: -webkit-linear-gradient(
      hsla(0, 0%, 100%, 0),
      hsla(0, 0%, 100%, 0)
    );
    border-radius: 0;
    appearance: none;
  }
}
/* // */
/* Begin helper classes */
.page {
  padding: 50px 0 50px;
}

.container {
  max-width: 750px;
  margin: auto;
  padding: 0 15px;
}

.note-title {
  margin-bottom: 20px;
  font-size: 23px;
  color: #ff0476;
}
.align-center {
  text-align: center;
}

.align-right {
  text-align: right;
}
/* // */
/* Begin buttons */
.btn {
  display: inline-block;
  padding: 13px 15px;
  border-radius: 3px;
  background-color: #1aaf37;
  border: none;
  font-size: 14px;
  text-decoration: none;
  line-height: inherit;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.5s;
  text-align: center;
  &:hover {
    opacity: 0.7;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &_bg {
    &_blue {
      background-color: #0485ff;
    }
    &_yellow {
      background-color: #fd7e14;
    }
    &_deeppinc {
      background-color: #ff0476;
    }
  }
}
/* // */

/* Begin notes form */
.notes-form {
  padding: 30px;
  background-color: #ffffff;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  &__title {
    margin-bottom: 20px;
    font-size: 23px;
    color: #ff0476;
  }
  &__field {
    margin-bottom: 20px;
    label {
      display: block;
      margin-bottom: 5px;
      color: #949494;
    }
    input,
    textarea {
      display: block;
      width: 100%;
      border-radius: 3px;
      font-size: 16px;
      border: 1px solid #d4d4d4;
    }
    input {
      height: 40px;
      padding: 0 15px;
    }
    textarea {
      height: auto;
      padding: 10px 15px;
      resize: none;
    }
    &--todo {
      textarea {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
      .btn {
        width: 100%;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
    &-avatar {
      position: relative;
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 50%;
      img {
        display: block;
        max-width: 100%;
      }
    }
  }
  &__info {
    padding-top: 20px;
  }
  &__btn {
    padding-top: 20px;
    .btn {
      &:not(.btn-medium) {
        width: 45px;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
/* // */

/* Begin todos */
.todos {
  padding-bottom: 20px;
  border-bottom: 1px solid #d4d4d4;
  &__list {
    &-item {
      position: relative;
      display: block;
      width: 100%;
      background-color: #f6f6f6;
      padding: 16px 15px;
      margin-bottom: 10px;
      border-left: 3px solid #ff0476;
      border-radius: 5px;
      box-shadow: 0px 2px 2px -2px rgba(0, 0, 0, 0.5);
      p {
        font-size: 14px;
        white-space: pre-line;
        color: #949494;
        line-height: 22px;
      }
      &--editable {
        padding: 0;
      }
      textarea {
        display: block;
        width: 100%;
        padding: 15px 15px;
        border: 1px solid transparent;
        box-shadow: none;
        background: transparent;
        border-radius: 5px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        font-size: 14px;
        resize: none;
        &:focus {
          border: 1px solid #ff0476;
          outline: none;
          opacity: 1;
        }
        &.completed {
          opacity: 0.5;
          text-decoration: line-through;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
      &.empty {
        border: none;
        text-align: center;
      }
      &.completed {
        opacity: 0.5;
        text-decoration: line-through;
      }
      &.editable {
        border-left: none;
      }
      &-options {
        position: absolute;
        top: 24px;
        right: 0;
        transform: translateY(-50%);
        padding: 0 10px;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.5s;
        .btn {
          margin-right: 5px;
          font-size: 12px;
          &:last-of-type {
            margin-right: 0;
          }
        }
      }
      &:hover {
        .todos {
          &__list {
            &-item {
              &-options {
                visibility: visible;
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
}
/* // */

/* Begin media queries */
@media screen and (max-width: 480px) {
  .confitm {
    &__content {
      padding: 30px 15px;
    }
  }
  .note-title {
    font-size: 20px;
  }
  .notes-form {
    padding: 30px 15px;
    &__btn {
      .btn {
        width: 100%;
      }
    }
  }
  .todos {
    &__list {
      &-item {
        &-options {
          position: relative;
          top: inherit;
          transform: translateY(0);
          visibility: visible;
          padding: 10px 10px;
          background: #fff;
          opacity: 1;
        }
      }
    }
  }
}
/* // */
</style>
