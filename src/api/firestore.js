import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

export const dbService = {
  async getFromDB() {
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
      return dbList;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  async addToDB(task) {
    const dbDoc = doc(db, "todos", `${task.id}`);
    try {
      await setDoc(dbDoc, {
        id: task.id,
        title: task.title,
        done: task.done,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  async updateToDB(task) {
    const dbDoc = doc(db, "todos", `${task.id}`);
    try {
      await updateDoc(dbDoc, task);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  async deleteToDB(task) {
    const dbDoc = doc(db, "todos", `${task.id}`);
    try {
      await deleteDoc(dbDoc);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  },
};
