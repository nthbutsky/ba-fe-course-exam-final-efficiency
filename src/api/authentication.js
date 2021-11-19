import { app } from "../api/firebase";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import router from "../router/router";

export const authService = {
  async signUp(email, password) {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          router.replace("/");
          console.log(
            `USER ${userCredential.user.email} HAS BEEN SUCCESFULLY CREATED!`
          );
        }
      );
    } catch (error) {
      this.error = error;
    }
  },

  async logIn(email, password) {
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          router.replace("/");
          console.log(
            `USER ${userCredential.user.email} HAS BEEN SUCCESFULLY LOGGED IN!`
          );
        }
      );
    } catch (error) {
      this.error = error;
    }
  },

  async logOut() {
    try {
      const auth = getAuth(app);
      await signOut(auth).then(() => {
        router.replace("/login");
        console.log("logged out");
      });
    } catch (error) {
      this.error = error;
    }
  },

  async checkUserState() {
    try {
      const auth = getAuth(app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const name = user.reloadUserInfo.email;
          router.push("/");
          console.log(`USER ${name} IS SIGNED IN!`);
        } else {
          router.push("/login");
          console.log("NO USER SIGNED IN!");
        }
      });
    } catch (error) {
      this.error = error;
    }
  },
};
