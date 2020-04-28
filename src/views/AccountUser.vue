<template>
  <div class="notes-form">
    <div class="notes-form__form">
      <h1 class="notes-form__title">Аккаунт</h1>
      <div class="notes-form__field">
        <label for="user-email">Email</label>
        <input type="email" id="user-email" v-model="userEmail" placeholder />
      </div>
      <div class="notes-form__field">
        <label for="user-name">Имя</label>
        <input type="text" id="user-name" v-model="userName" placeholder />
      </div>
      <div class="notes-form__field">
        <label for="user-photo">Фото</label>
        <input type="url" id="user-photo" v-model="userPhotoURL" placeholder />
      </div>
      <div class="notes-form__field">
        <div class="notes-form__field-avatar">
          <img :src="userPhotoURL" v-if="userPhotoURL" alt />
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
import { mapMutations } from "vuex";
export default {
  name: "AccountUser",
  data() {
    return {
      userEmail: "",
      userName: "",
      userPhotoURL: ""
    };
  },

  methods: {
    ...mapMutations(["checkAuthState"]),
    updateProfileUser() {
      // Begin update user profile
      this.$store
        .dispatch("updateProfileUser", {
          userName: this.userName,
          userPhotoURL: this.userPhotoURL
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
          userEmail: this.userEmail
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
  },
  beforeMount() {
    // Begin get user data from firebase
    let currentUser = this.$store.getters.getCurrentUser;
    this.userEmail = currentUser.email;
    this.userName = currentUser.displayName;
    this.userPhotoURL = currentUser.photoURL;
  }
};
</script>
