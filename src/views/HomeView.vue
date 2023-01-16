<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="helloMessage" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const user = computed(() => ({
  ...store.getters.user,
  isLoggedIn: store.getters.isLoggedIn,
}));

const helloMessage = computed(() =>
  user.value.isLoggedIn ? `Hello ${user.value.name}` : "Not Logged In"
);
</script>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
});
</script>
