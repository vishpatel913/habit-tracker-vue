<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="helloMessage" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useUserStore from "@/stores/user";

const userStore = useUserStore();

const user = computed(() => ({
  ...userStore.user,
  isLoggedIn: userStore.isLoggedIn,
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
