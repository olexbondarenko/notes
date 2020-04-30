<template>
  <div class="notes-form">
    <div class="notes-form__form">
      <h1 class="notes-form__title">Аккаунт</h1>
      <div class="notes-form__field">
        <label for="user-email">Email</label>
        <input
          type="email"
          id="user-email"
          ref="userEmail"
          v-model="getCurrentUser.email"
          placeholder
        />
      </div>
      <div class="notes-form__field">
        <label for="user-name">Имя</label>
        <input
          type="text"
          id="user-name"
          ref="userName"
          v-model="getCurrentUser.displayName"
          placeholder
        />
      </div>
      <div class="notes-form__field">
        <label for="user-photo">Фото</label>
        <input
          type="url"
          id="user-photo"
          ref="userPhoto"
          v-model="getCurrentUser.photoURL"
          placeholder
        />
      </div>
      <div class="notes-form__field">
        <div class="notes-form__field-avatar">
          <img
            :src="getCurrentUser.photoURL"
            v-if="getCurrentUser.photoURL"
            alt
          />
          <img src="https://via.placeholder.com/150" v-else alt />
        </div>
      </div>
      <div class="notes-form__btn">
        <button type="button" @click="updateProfileUser" class="btn btn-medium">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AccountUser",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getCurrentUser"])
  },
  methods: {
    ...mapMutations(["checkAuthState"]),
    updateProfileUser() {
      // Begin update user profile
      this.$store
        .dispatch("updateProfileUser", {
          userName: this.$refs.userName.value,
          userPhotoURL: this.$refs.userPhoto.value
        })
        .then(() => {
          this.$alert.show({
            title: "Данные успешно сохранены",
            className: "success"
          });
        })
        .catch(error => {
          this.errorMessage = error.message;
          this.$alert.show({
            title: error.message,
            className: "error"
          });
        });

      // Begin update user email
      this.$store
        .dispatch("updateEmailUser", {
          userEmail: this.$refs.userEmail.value
        })
        .then(() => {
          this.$alert.show({
            title: "Email успешно сохранен",
            className: "success"
          });
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
