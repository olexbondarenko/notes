<template>
  <Notes v-if="isUserLoggedIn" />
  <SignInUser v-else />
</template>

<script>
// @ is an alias to /src
import Notes from "@/components/Notes.vue";
import SignInUser from "@/views/SignInUser.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Notes,
    SignInUser
  },
  computed: {
    ...mapGetters(["isUserLoggedIn"])
  }
};
</script>
<style scoped lang="scss">
.home {
  text-align: center;
  a {
    margin-right: 30px;
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
