<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h1 @click="click">counter:{{ $store.state.counter.counter }}</h1> -->
    <h1 @click="click">counter:{{ $store.state.counter }}</h1>
    <h1 @click="clickAsync">Async counter:{{ $store.state.counter }}</h1>
    <!-- <h1>Module double counter:{{ $store.getters }}</h1> -->
    <h1>DoubleCounter:{{ $store.getters["doubleCounter"] }}</h1>
    <!-- <h1>DoubleCounter:{{ $store.getters["counter/doubleCounter"] }}</h1> -->
    <h1>Computed DoubleCounter:{{ doubleCounter }}</h1>
    <router-link to="/Home">home</router-link>
    <router-link to="/Detail">detail</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import router from "../router/index";
import store from "../store/index";
import { mapGetters } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    click() {
      this.$store.commit("add");
      //namespaced :false 不需要加命名空间counter，包括$store.getters["counter/doubleCounter"]
      // this.$store.commit("counter/add");
    },
    clickAsync() {
      this.$store.dispatch("add");
      // this.$store.dispatch("counter/add");
    },
  },
  computed: {
    ...mapGetters({
      //可以传数组/对象
      doubleCounter: "doubleCounter",
      // doubleCounter: "counter/doubleCounter",
      // ...
    }),
  },
  router,
  store,
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
