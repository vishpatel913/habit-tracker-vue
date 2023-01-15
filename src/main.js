import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import AppLayout from './layouts/AppLayout.vue'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
}

initializeApp(firebaseConfig)

createApp(App)
  .use(router)
  .use(store)
  .component('AppLayout', AppLayout)
  .mount('#app')
