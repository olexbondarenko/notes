<template>
  <header class="header">
    <div class="container">
      <div class="header__row">
        <router-link class="header__logo" to="/">Notes</router-link>
        <nav class="header__nav">
          <template v-if="isUserLoggedIn">
            <router-link class="header__nav-link" to="/note/add" exact
              >Добавить</router-link
            >
            <router-link class="header__nav-link" to="/notes"
              >Заметки</router-link
            >
          </template>
        </nav>
        <div class="header__account" v-if="isUserLoggedIn">
          <div class="header__account-image">
            <router-link to="/account" title="Аккаунт">
              <img
                :src="getCurrentUser.photoURL"
                v-if="getCurrentUser.photoURL"
                :alt="getCurrentUser.displayName"
              />
              <img
                src="https://via.placeholder.com/150"
                v-else
                :alt="getCurrentUser.displayName"
              />
            </router-link>
          </div>
        </div>
        <div class="header__options" v-if="!isUserLoggedIn">
          <router-link
            class="header__options-link"
            to="/registration"
            exact
            title="Регистрация"
          >
            <i class="fas fa-user-plus"></i>
          </router-link>
          <router-link class="header__options-link" to="/sign-in" title="Вход">
            <i class="fas fa-sign-in-alt"></i>
          </router-link>
        </div>
        <div class="header__options" v-if="isUserLoggedIn">
          <router-link
            class="header__options-link"
            to="/sign-out"
            title="Выйти"
          >
            <i class="fas fa-sign-out-alt"></i>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["isUserLoggedIn", "getCurrentUser"])
  }
};
</script>

<style lang="scss">
.header {
  background: #fff;
  padding: 15px 0;
  &__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  &__logo {
    flex-grow: 1;
    font-size: 30px;
    text-decoration: none;
    font-weight: 700;
    text-transform: uppercase;
    color: #949494;
  }
  &__nav {
    padding-right: 30px;
    &-link {
      margin-left: 10px;
      font-size: 13px;
      text-decoration: none;
      text-transform: uppercase;
      color: #949494;
      &:first-of-type {
        margin-left: 0;
      }
      &.router-link-active,
      &:hover {
        color: #ff0476;
      }
    }
  }
  &__account {
    margin: 0 15px;
    &-image {
      position: relative;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  &__options {
    &-link {
      margin-left: 15px;
      font-size: 20px;
      text-decoration: none;
      text-transform: uppercase;
      color: #949494;
      &:first-of-type {
        margin-left: 0;
      }
      &.router-link-active,
      &:hover {
        color: #ff0476;
      }
    }
  }
}
</style>
