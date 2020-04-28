<template>
  <div class="notes-form">
    <div class="notes-form__form">
      <h1 class="notes-form__title">Вход</h1>
      <form action="/" method="get" @submit.prevent="signInUser">
        <div class="notes-form__field">
          <label for="user-email">Введите Email</label>
          <input type="email" id="user-email" v-model="userEmail" placeholder />
        </div>
        <div class="notes-form__field">
          <label for="user-password">Введите пароль</label>
          <input
            id="user-password"
            type="password"
            v-model="userPassword"
            placeholder
          />
        </div>
        <div class="notes-form__btn">
          <button type="submit" class="btn btn-medium">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignInUser",
  data() {
    return {
      userEmail: "",
      userPassword: ""
    };
  },
  methods: {
    signInUser() {
      this.$store
        .dispatch("signInUser", {
          userEmail: this.userEmail,
          userPassword: this.userPassword
        })
        .then(() => {
          this.$alert.show({
            title: "Вы успешно вошли в аккаунт.",
            className: "success"
          });
          this.$router.push("/note/add");
        })
        .catch(error => {
          this.errorMessage = error.message;
          this.$alert.show({
            title: error.message,
            className: "error"
          });
        });
    }
  }
};
</script>
