import { useStore } from "vuex";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
// import { ref, child, get, set } from "firebase/database";
import { auth, db } from "@/firebase";

export const useAuth = () => {
  const store = useStore();
  const provider = new GoogleAuthProvider();

  auth.onAuthStateChanged((user) => {
    store.commit("setIsLoggedIn", !!user);
    if (!user) {
      signInWithRedirect(auth, provider);
    } else {
      store.commit("setUser", {
        id: user.uid,
        name: user.displayName,
        email: user.email,
      });
    }
  });
};

// const initUser = (userId: string, user = {}) => {
//   const dbRef = ref(db);
//   get(child(dbRef, `users/${userId}`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log("No user available... Creating user...");
//         set(ref(db, "users/" + userId), user);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
