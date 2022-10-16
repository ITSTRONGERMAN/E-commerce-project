<template>
  <div id="app">
    <router-view></router-view>
    <APPTabBar></APPTabBar>
  </div>
</template>

<script>
import APPTabBar from "@/components/APPTabBar.vue";
export default {
  components: APPTabBar,
  components: {
    APPTabBar,
  },
};
</script>

<style>
#app {
  background: #efefef;
  min-height: 100%;
}
body,
html {
  height: 100%;
}
</style>
