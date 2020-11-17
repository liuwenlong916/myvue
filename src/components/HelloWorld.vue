<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/Home">home</router-link>
    <router-link to="/Detail">detail</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import router from "../router/index";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  router,
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
