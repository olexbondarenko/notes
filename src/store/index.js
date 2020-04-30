import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

Vue.use(Vuex);

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default new Vuex.Store({
  state: {
    loaderActive: false,
    userLoggedIn: false,
    currentUser: {
      providerId: "",
      uid: "",
      displayName: "",
      email: "",
      photoURL: ""
    },
    notes: []
  },
  methods: {},
  getters: {
    getLoaderStatus(state) {
      return state.loaderActive;
    },
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
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          state.currentUser.providerId = user.providerId;
          state.currentUser.uid = user.uid;
          state.currentUser.displayName = user.displayName;
          state.currentUser.email = user.email;
          state.currentUser.photoURL = user.photoURL;
        }
      });
    },
    setNotes(state, notes) {
      if (notes !== undefined) {
        state.notes = notes;
      }
    },
    addNote(state, newNote) {
      state.notes.unshift(newNote);
      var usersRef = db.collection("users");
      usersRef.doc(state.currentUser.uid).set({
        notes: state.notes
      });
    },
    deleteNote(state, noteId) {
      state.notes.forEach(function(note, index) {
        if (note.id === noteId) {
          state.notes.splice(index, 1);
          var usersRef = db.collection("users");
          usersRef.doc(state.currentUser.uid).set({
            notes: state.notes
          });
        }
      });
    },
    saveNote(state, savedNote) {
      state.notes.forEach(function(note, index) {
        if (note.id === savedNote.id) {
          state.notes.splice(index, 1, savedNote);
          var usersRef = db.collection("users");
          usersRef.doc(state.currentUser.uid).set({
            notes: state.notes
          });
        }
      });
    },
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
    signOutUser(state) {
      state.userLoggedIn = false;
    }
  },
  actions: {
    // Begin create user
    async createUser(context, { userEmail, userPassword }) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
          let user = firebase.auth().currentUser;
          let usersRef = db.collection("users");
          if (user) {
            usersRef.doc(user.uid).set({
              notes: context.state.notes
            });
          }
        });
    },
    // Begin sign in user
    async signInUser(context, { userEmail, userPassword }) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
          context.state.userLoggedIn = true;
          context.dispatch("getNotesUser");
        });
    },
    // Begin sign out user
    async signOutUser(context) {
      await firebase
        .auth()
        .signOut()
        .then(function() {
          context.commit("signOutUser");
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
    },
    getNotesUser(context) {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          await db
            .collection("users")
            .doc(user.uid)
            .get()
            .then(doc => {
              if (doc.exists) {
                context.commit("setNotes", doc.data().notes);
              } else {
                console.log("No such document!");
              }
            })
            .catch(error => {
              console.log("Error getting document:", error);
            });
        }
      });
    }
  },
  modules: {}
});
