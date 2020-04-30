<template>
  <div class="notes-form">
    <h2 class="notes-form__title">Добавление заметки</h2>
    <div class="notes-form__form">
      <div class="notes-form__field">
        <label for="note-title">Название заметки:</label>
        <input type="text" id="note-title" v-model="noteTitle" placeholder />
      </div>
      <div class="todos">
        <div class="notes-form__field">
          <label for="todo-title">Задача:</label>
          <div class="notes-form__field--todo">
            <textarea
              ref="todotitle"
              rows="1"
              @input="autoHeight($event)"
              v-model="todoTitle"
              placeholder
            ></textarea>
            <button type="button" class="btn btn_bg_blue" @click="addTodo">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="todos__list">
          <div class="todos__list-item-wrap" v-if="this.todos.length">
            <div
              class="todos__list-item"
              v-for="(todo, index) in this.todos"
              :key="index"
            >
              <p>{{ todo.title }}</p>
              <div class="todos__list-item-options">
                <button
                  type="button"
                  class="btn btn_bg_deeppinc"
                  @click="removeTodo(index)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="todos__list-item empty">Задач пока-что нет.</div>
        </div>
      </div>
      <div class="notes-form__btn">
        <button type="button" class="btn btn-medium" @click="addNote">
          Сохранить заметку
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteAdd",
  data() {
    return {
      noteTitle: "",
      todoTitle: "",
      textareaRows: 1,
      todos: [],
      note: {
        id: null,
        title: "",
        todos: []
      }
    };
  },
  methods: {
    // Begin update textarea height
    autoHeight(event) {
      let newLines = event.target.value.split(/\r\n|\r|\n/).length;
      event.target.rows = this.textareaRows = newLines;
    },

    // Begin add todo
    addTodo() {
      if (this.todoTitle.trim().length !== 0) {
        this.todos.unshift({
          id: Date.now(),
          title: this.todoTitle,
          completed: false,
          editable: false,
          textareaRows: this.textareaRows
        });
        this.todoTitle = "";
        this.$refs.todotitle.setAttribute("rows", 1);
      }
    },

    // Begin remove todo
    removeTodo(indexTodo) {
      this.todos.splice(indexTodo, 1);
    },

    // Begin add note
    addNote() {
      if (this.noteTitle.trim().length !== 0 && this.todos.length !== 0) {
        this.note.id = Date.now();
        this.note.title = this.noteTitle;
        this.note.todos = this.todos;
        this.$store.commit("addNote", this.note);
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>
