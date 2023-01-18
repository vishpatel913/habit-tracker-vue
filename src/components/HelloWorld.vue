<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png" class="logo" />
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  text-align: center;
}
h1 {
  color: #ffffff;
}
.logo {
  height: 52px;
}
</style>
