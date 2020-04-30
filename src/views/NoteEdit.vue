<template>
  <div class="notes-form">
    <h2 class="notes-form__title">Редактирование заметки</h2>
    <div class="notes-form__form">
      <div class="notes-form__field">
        <label for="note-title">Название заметки:</label>
        <input
          type="text"
          id="note-title"
          v-model="currentState.title"
          @change="onNoteChange"
          placeholder
        />
      </div>
      <!-- Begin todos -->
      <div class="todos">
        <div class="notes-form__field">
          <label for="todo-title">Задача:</label>
          <div class="notes-form__field--todo">
            <textarea
              id="todo-title"
              ref="todotitle"
              @change="onNoteChange"
              @input="autoHeight($event)"
              v-model="todoTitle"
              placeholder
              rows="1"
            ></textarea>
            <button type="button" class="btn" @click="addTodo">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="todos__list">
          <div class="todos__list-item-wrap" v-if="currentState.todos.length">
            <div
              class="todos__list-item todos__list-item--editable"
              v-for="(todo, index) in currentState.todos"
              :key="index"
            >
              <textarea
                ref="todoitem"
                :rows="todo.textareaRows"
                :class="[
                  todo.editable ? 'editable' : '',
                  todo.completed ? 'completed' : ''
                ]"
                :disabled="!todo.editable"
                v-model="todo.title"
                @input="autoHeight($event)"
                @blur="editTotoFocusOut(index)"
              ></textarea>
              <div class="todos__list-item-options">
                <button
                  type="button"
                  class="btn btn_bg_deeppinc"
                  title="Удалить"
                  @click="removeTodo(index)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button
                  type="button"
                  class="btn btn_bg_blue"
                  title="Отредактировать текст"
                  @click="editTodo(index)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  class="btn"
                  title="Отметить как выполненный"
                  @click="completeTodo(index)"
                >
                  <i class="fas fa-check"></i>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="todos__list-item empty">Задач пока-что нет.</div>
        </div>
      </div>
      <!-- // -->
      <!-- Begin notes form -->
      <div class="notes-form__btn">
        <button type="button" class="btn" title="Сохранить" @click="saveNote">
          <i class="fas fa-save"></i>
        </button>
        <button
          class="btn btn_bg_yellow"
          title="Отменить редактирование"
          @click="cancelEdit"
        >
          <i class="fas fa-times"></i>
        </button>

        <button
          type="button"
          class="btn btn_bg_deeppinc"
          title="Удалить"
          @click="deleteNote(noteId)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>

        <button
          type="button"
          class="btn btn_bg_blue"
          title="Отменить внесенное изменение"
          :disabled="changesIndex === 0"
          @click="onUndo"
        >
          <i class="fas fa-undo-alt"></i>
        </button>
        <button
          type="button"
          class="btn btn_bg_blue"
          title="Повторить отмененное изменение"
          :disabled="changesIndex === changesState.length - 1"
          @click="onRedo"
        >
          <i class="fas fa-redo-alt"></i>
        </button>
      </div>
      <!-- // -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteEdit",
  data() {
    return {
      noteId: null,
      textareaRows: 1,
      todoTitle: "",
      currentState: Object,
      changesState: [],
      changesIndex: 0
    };
  },
  methods: {
    // Begin delete note
    deleteNote(noteId) {
      this.$confirm.show({
        title: "Вы уверенны что хотите удалить замеку?",
        confirmText: "Подтвердить",
        cancelText: "Отменить",
        onConfirm: () => {
          return this.isConfirmDelete(noteId);
        }
      });
    },

    // Begin delete confirm
    isConfirmDelete(noteId) {
      this.$store.commit("deleteNote", noteId);
      this.$router.push({ path: "/" });
    },

    // Begin update textarea height
    autoHeight(event) {
      let newLines = event.target.value.split(/\r\n|\r|\n/).length;
      event.target.rows = this.textareaRows = newLines;
    },

    // Begin on todo fousout
    editTotoFocusOut(index) {
      let todoRows = this.currentState.todos[index].textareaRows;
      this.currentState.todos[index].editable = false;
      if (todoRows > 1) {
        todoRows = this.textareaRows;
      } else {
        this.textareaRows = 1;
      }
    },

    // Begin add todo
    addTodo() {
      if (this.todoTitle.trim().length !== 0) {
        this.currentState.todos.unshift({
          id: Date.now(),
          title: this.todoTitle,
          completed: false,
          editable: false,
          textareaRows: this.textareaRows
        });
        this.todoTitle = "";
        this.onNoteChange();
        this.$refs.todotitle.setAttribute("rows", 1);
      }
    },

    // Begin edit todo
    editTodo(index) {
      this.currentState.todos[index].editable = true;
      this.$nextTick(function() {
        this.$refs.todoitem[index].focus();
      });
    },

    // Begin remove todo
    removeTodo(indexTodo) {
      this.currentState.todos.splice(indexTodo, 1);
      this.onNoteChange();
    },

    // Begin complete todo
    completeTodo(indexTodo) {
      this.currentState.todos[indexTodo].completed = !this.currentState.todos[
        indexTodo
      ].completed;
      this.onNoteChange();
    },

    // Begin on note change
    onNoteChange() {
      this.changesState.length = ++this.changesIndex;
      let currentChange = JSON.parse(JSON.stringify(this.currentState));
      this.changesState.push(currentChange);
    },

    // Begin  save note
    saveNote() {
      let savedNote = JSON.parse(JSON.stringify(this.currentState));
      this.$store.commit("saveNote", savedNote);
      this.$router.push({ path: "/" });
    },

    // Begin cancel edit note
    cancelEdit() {
      this.$confirm.show({
        title: "Вы уверенны что хотите отменить редактирование?",
        confirmText: "Подтвердить",
        cancelText: "Отменить",
        onConfirm: () => {
          return this.$router.push({ path: "/" });
        }
      });
    },

    // Begin key events
    keyEvents(event) {
      var evtObj = window.event ? event : event;
      if (
        (evtObj.keyCode === 90 && evtObj.ctrlKey) ||
        evtObj.keyCode === 27 ||
        (evtObj.keyCode === 90 && evtObj.keyCode === 91) ||
        (evtObj.keyCode === 90 && evtObj.keyCode === 93)
      ) {
        this.onUndo();
      }
      if (evtObj.keyCode === 89 && evtObj.ctrlKey) {
        this.onRedo();
      }
    },

    onUndo() {
      if (this.changesIndex > 0) {
        this.currentState = JSON.parse(
          JSON.stringify(this.changesState[--this.changesIndex])
        );
      }
    },

    onRedo() {
      if (this.changesIndex < this.changesState.length - 1) {
        this.currentState = JSON.parse(
          JSON.stringify(this.changesState[++this.changesIndex])
        );
      }
    }
  },
  beforeMount() {
    this.noteId = parseInt(this.$route.params.id);
    this.$store.state.notes.forEach(note => {
      if (note.id === this.noteId) {
        this.currentState = JSON.parse(JSON.stringify(note));
        this.changesState.push(JSON.parse(JSON.stringify(note)));
      }
    });
    document.addEventListener("keyup", event => {
      this.keyEvents(event);
    });
  }
};
</script>

<style lang="scss" scoped></style>
