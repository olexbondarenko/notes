<template>
  <div class="notes-form">
    <form action="/" method="post" class="notes-form__form">
      <h1 class="notes-form__title">Регистрация</h1>
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
        <button type="button" @click="createUser" class="btn btn-medium">
          Создать аккаунт
        </button>
      </div>
    </form>
    <div class="notes-form__info">
      Если у Вас уже есть аккаунт нажмите
      <router-link to="/sign-in">Войти</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateUser",
  data() {
    return {
      userEmail: "",
      userPassword: ""
    };
  },
  methods: {
    createUser() {
      this.$store
        .dispatch("createUser", {
          userEmail: this.userEmail,
          userPassword: this.userPassword
        })
        .then(() => {
          this.$store.dispatch("signInUser", {
            userEmail: this.userEmail,
            userPassword: this.userPassword
          });
          this.$alert.show({
            title: "Пользователь успешно создан",
            className: "success"
          });
          this.$router.push("/account");
        })
        .catch(error => {
          this.$alert.show({
            title: error.message,
            className: "error"
          });
        });
    }
  }
};
</script>
