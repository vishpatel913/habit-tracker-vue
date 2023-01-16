import { useStore } from "vuex";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";
// import DatabaseService from '../services/database'

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
