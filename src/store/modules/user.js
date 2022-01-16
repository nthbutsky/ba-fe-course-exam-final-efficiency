import { app } from "../../api/firebase";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import router from "../../router/router";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../api/firebase";

export default {
  state: {
    user: {
      name: localStorage.getItem("userName"),
      uid: localStorage.getItem("userUid"),
      email: localStorage.getItem("userEmail"),
    },
    status: null,
    error: null,
  },

  getters: {
    user(state) {
      return state.user;
    },
    userName(state) {
      return state.user.name;
    },
    userEmail(state) {
      return state.user.email;
    },
    userUid(state) {
      return state.user.uid;
    },
    status(state) {
      return state.status;
    },
    error(state) {
      return state.error;
    },
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setUserName(state, payload) {
      state.user.name = payload;
    },
    removeUser(state) {
      state.user = null;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },

  actions: {
    signUpAction({ commit }, payload) {
      commit("setStatus", "loading");
      createUserWithEmailAndPassword(
        getAuth(app),
        payload.email,
        payload.password
      )
        .then((response) => {
          commit("setStatus", "success");
          commit("setError", null);
          router.replace("/login");
          console.log(
            `USER ${response.user.email} HAS BEEN SUCCESSFULLY CREATED!`
          );

          const dbDoc = doc(db, "users", `${response.user.uid}`);
          setDoc(dbDoc, {
            name: null,
            uid: response.user.uid,
            email: response.user.email,
          });
        })
        .catch((error) => {
          commit("setStatus", "failure");
          commit("setError", error.message);
        });
    },

    signInAction({ commit }, payload) {
      signInWithEmailAndPassword(getAuth(app), payload.email, payload.password)
        .then((response) => {
          const user = {
            name: null,
            uid: response.user.uid,
            email: response.user.email,
          };
          commit("setUser", user);
          commit("setStatus", "success");
          commit("setError", null);
          console.log(
            `USER ${response.user.email} HAS BEEN SUCCESFULLY LOGGED IN!`
          );
          localStorage.setItem("userName", response.user.email);
          localStorage.setItem("userUid", response.user.uid);
          localStorage.setItem("userEmail", response.user.email);
          router.push("/");
        })
        .catch((error) => {
          commit("setStatus", "failure");
          commit("setError", error.message);
          console.log("error: " + error);
        });
    },

    signOutAction({ commit }) {
      signOut(getAuth(app))
        .then(() => {
          commit("setUser", null);
          commit("setStatus", "success");
          commit("setError", null);
          localStorage.clear("user");
          console.log("USER LOGGED OUT!");
          router.push("/login");
        })
        .catch((error) => {
          commit("setStatus", "failure");
          commit("setError", error.message);
        });
    },

    addUserName({ getters, commit }, payload) {
      const userUid = getters.userUid;
      const dbDoc = doc(db, "users", `${userUid}`);
      updateDoc(dbDoc, { name: payload });
      localStorage.userName = payload;
      commit("setUserName", payload);
    },
  },
};
