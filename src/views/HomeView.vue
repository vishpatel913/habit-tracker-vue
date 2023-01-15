<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world :msg="helloMessage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const user = computed(() => ({
  ...store.getters.user,
  isLoggedIn: store.getters.isLoggedIn,
}))

const helloMessage = computed(() =>
  user.value.isLoggedIn ? `Hello ${user.value.name}` : 'Not Logged In',
)
</script>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
}
</script>
