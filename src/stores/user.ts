import { defineStore } from "pinia";
import {
  GoogleAuthProvider,
  // getRedirectResult,
  signInWithRedirect,
  User as AuthUser,
} from "firebase/auth";

import { auth } from "@/firebase";
import { User } from "@/models/user.model";

type RootState = {
  user: User | null;
  isLoggedIn: boolean;
};

const useUserStore = defineStore("user", {
  state: (): RootState => ({
    user: null,
    isLoggedIn: false,
  }),

  actions: {
    async signInWithGoogleRedirect(user: AuthUser | null) {
      // const result = await getRedirectResult(auth);
      // const { user } = result || {};
      this.isLoggedIn = !!user;
      if (!user) {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
      } else {
        const userState = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        };
        this.user = userState;
      }
    },
  },
});

export default useUserStore;
