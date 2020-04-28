<template>
  <div class="note">
    <div class="note-title">{{ note.title }}</div>
    <!-- Begin todos -->
    <div class="todos">
      <div class="todos__list">
        <div
          class="todos__list-item"
          v-for="(todo, index) in note.todos.slice(0, 3)"
          :class="todo.completed ? 'completed' : ''"
          :key="index"
        >
          <p>{{ todo.title }}</p>
        </div>
      </div>
    </div>
    <!-- // -->
    <!-- Begin notes options -->
    <div class="note__options">
      <router-link
        :to="{ name: 'note', params: { id: note.id } }"
        class="btn btn_bg_blue"
      >
        <i class="fas fa-edit"></i>
      </router-link>
      <button
        type="button"
        class="btn btn_bg_deeppinc"
        @click="deleteNote(note.id)"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <!-- // -->
  </div>
</template>

<script>
export default {
  name: "NoteItem",
  props: {
    index: Number,
    note: Object
  },
  methods: {
    deleteNote(noteId) {
      const params = {
        title: "Вы уверенны что хотите удалить замеку?",
        confirmText: "Подтвердить",
        cancelText: "Отменить",
        onConfirm: () => {
          return this.$store.commit("deleteNote", noteId);
        }
      };
      this.$confirm.show(params);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.note {
  margin-bottom: 30px;
  padding: 30px;
  background-color: #ffffff;
  border: 1px solid #f5f6f8;
  border-radius: 5px;
  box-shadow: 0px 2px 2px -2px rgba(0, 0, 0, 0.5);
  &__options {
    padding-top: 30px;
    .btn {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
@media screen and (max-width: 480px) {
  .note {
    padding: 30px 15px;
    &__options {
      .btn {
        width: 100%;
        margin-right: 0;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
