import { useStore } from 'vuex'
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'

export const useAuth = () => {
  const store = useStore()
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const handleUserAuth = (user) => {
    store.commit('setIsLoggedIn', !!user)
    if (!user) {
      signInWithRedirect(auth, provider)
    } else {
      store.commit('setUser', {
        id: user.uid,
        name: user.displayName,
        email: user.email,
      })
    }
  }

  auth.onAuthStateChanged(handleUserAuth)
}
