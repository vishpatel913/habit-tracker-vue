<template>
  <nav class="navigation">
    <Tabbar fixed placeholder route>
      <TabbarItem name="home" icon="home-o" to="/">Home</TabbarItem>
      <TabbarItem name="create" icon="plus" to="/create">Create</TabbarItem>
      <TabbarItem name="settings" icon="setting-o">Settings</TabbarItem>
    </Tabbar>
  </nav>
</template>

<script setup lang="ts">
import { Tabbar, TabbarItem } from "vant";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navigation {
  --van-tabbar-height: 56px;
}
</style>
