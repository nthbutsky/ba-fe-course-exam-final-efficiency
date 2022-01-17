import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../api/firebase";

export default {
  state: {
    todos: null,
  },

  getters: {
    todos(state) {
      return state.todos;
    },
  },

  mutations: {
    SET_TODOS(state, payload) {
      state.todos = payload;
    },

    ADD_TODO(state, payload) {
      state.todos.push(payload);
    },

    UPDATE_TODO(state, payload) {
      state.todos.filter((todo) => todo.id !== payload.id).push(payload);
    },

    DELETE_TODO(state, payload) {
      state.todos = state.todos.filter((todo) => todo.id !== payload.id);
    },
  },

  actions: {
    async getTodos({ commit }) {
      const dbDocs = collection(db, "todos");

      try {
        const querySnapshot = await getDocs(dbDocs);
        const dbList = querySnapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return {
            id,
            title: data.title,
            done: data.done,
          };
        });
        commit("SET_TODOS", dbList);
        return dbList;
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    async addTodo({ commit }, payload) {
      const dbDoc = doc(db, "todos", `${payload.id}`);
      try {
        await setDoc(dbDoc, {
          id: payload.id,
          title: payload.title,
          done: payload.done,
        });
        commit("ADD_TODO", payload);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    async updateTodo({ commit }, payload) {
      const dbDoc = doc(db, "todos", `${payload.id}`);
      try {
        await updateDoc(dbDoc, payload);
        commit("UPDATE_TODO", payload);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },

    async deleteTodo({ commit }, payload) {
      const dbDoc = doc(db, "todos", `${payload.id}`);
      try {
        await deleteDoc(dbDoc);
        commit("DELETE_TODO", payload);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    },
  },
};
