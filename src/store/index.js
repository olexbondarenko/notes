import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userLoggedIn: false,
    currentUser: {
      providerId: "",
      uid: "",
      displayName: "",
      email: "",
      photoURL: ""
    },
    notes: [],
    notesData: [
      {
        id: 1,
        title: "Действия на главной",
        todos: [
          {
            id: 1,
            title: "Перейти к созданию новой заметки",
            completed: false,
            editable: false,
            textareaRows: 1
          },
          {
            id: 2,
            title: "Перейти к изменению",
            completed: false,
            editable: false,
            textareaRows: 1
          },
          {
            id: 3,
            title: "Удалить (необходимо подтверждение)",
            completed: false,
            editable: false,
            textareaRows: 1
          }
        ]
      },
      {
        id: 2,
        title: "Действия с заметкой",
        todos: [
          {
            id: 1,
            title: "Сохранить изменения",
            completed: false,
            editable: false,
            textareaRows: 1
          },
          {
            id: 2,
            title: "Отменить редактирование (необходимо подтверждение)",
            completed: false,
            editable: false,
            textareaRows: 1
          },
          {
            id: 3,
            title: "Удалить (необходимо подтверждение)",
            completed: false,
            editable: false,
            textareaRows: 1
          },
          {
            id: 4,
            title: "Отменить внесенное изменение",
            completed: false,
            editable: false,
            textareaRows: 1
          },
          {
            id: 5,
            title: "Повторить отмененное изменение",
            completed: false,
            editable: false,
            textareaRows: 1
          }
        ]
      },
      {
        id: 3,
        title: "Действия с пунктами Todo",
        todos: [
          {
            id: 1,
            title: "Добавить",
            completed: false,
            editable: false,
            textareaRows: 1
          },
          {
            id: 2,
            title: "Удалить",
            completed: false,
            editable: false,
            textareaRows: 1
          },
          {
            id: 3,
            title: "Отредактировать текст",
            completed: false,
            editable: false,
            textareaRows: 1
          },
          {
            id: 4,
            title: "Отметить как выполненный",
            completed: false,
            editable: false,
            textareaRows: 1
          }
        ]
      }
    ]
  },
  getters: {
    isUserLoggedIn(state) {
      return state.userLoggedIn;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    getNotes(state) {
      return state.notes;
    }
  },
  mutations: {
    checkAuthState(state) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          state.userLoggedIn = true;
          state.currentUser.providerId = user.providerId;
          state.currentUser.uid = user.uid;
          state.currentUser.displayName = user.displayName;
          state.currentUser.email = user.email;
          state.currentUser.photoURL = user.photoURL;
        }
      });
    },
    setNotes(state) {
      if (localStorage.notes === undefined) {
        localStorage.setItem("notes", JSON.stringify(state.notesData));
      }
    },
    updateNotes(state) {
      state.notes = JSON.parse(localStorage.getItem("notes"));
    },
    addNote(state, newNote) {
      state.notes.unshift(newNote);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote(state, noteId) {
      state.notes.forEach(function(note, index) {
        if (note.id === noteId) {
          state.notes.splice(index, 1);
          localStorage.setItem("notes", JSON.stringify(state.notes));
        }
      });
    },
    saveNote(state, savedNote) {
      state.notes.forEach(function(note, index) {
        if (note.id === savedNote.id) {
          state.notes.splice(index, 1, savedNote);
          localStorage.setItem("notes", JSON.stringify(state.notes));
        }
      });
    }
  },
  actions: {
    // Begin create user
    async createUser(context, { userEmail, userPassword }) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, userPassword);
    },
    // Begin sign in user
    async signInUser(context, { userEmail, userPassword }) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
          context.state.userLoggedIn = true;
        });
    },
    // Begin sign out user
    async signOutUser(context) {
      await firebase
        .auth()
        .signOut()
        .then(function() {
          context.state.userLoggedIn = false;
          console.log("Вы успешно вышли.");
        })
        .catch(error => {
          console.log(error);
        });
    },
    // Begin update profile user
    async updateProfileUser(context, { userName, userPhotoURL }) {
      await firebase
        .auth()
        .currentUser.updateProfile({
          displayName: userName,
          photoURL: userPhotoURL
        })
        .then(() => {
          context.commit("checkAuthState");
        })
        .catch(error => {
          console.log(error);
        });
    },
    // Begin update email user
    async updateEmailUser(context, { userEmail }) {
      await firebase
        .auth()
        .currentUser.updateEmail(userEmail)
        .then(() => {
          context.commit("checkAuthState");
        });
    }
  },
  modules: {}
});
