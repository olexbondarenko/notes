<template>
  <div class="notes" v-if="getNotes.length !== 0">
    <NoteItem
      v-for="(note, index) in getNotes"
      :key="note.id"
      :note="note"
      :index="index"
    />
  </div>
  <div class="align-center" v-else>
    Заметок пока что нет.
    <router-link to="/note/add">Добавьте свою первую заметку</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import NoteItem from "@/components/NoteItem.vue";

export default {
  name: "Notes",
  data() {
    return {};
  },
  components: {
    NoteItem
  },
  computed: {
    ...mapGetters(["getNotes"])
  }
};
</script>
<style scoped lang="scss">
.notes {
  &-null {
    p {
      margin-bottom: 30px;
    }
  }
}
</style>
