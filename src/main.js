import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  mounted() {
    console.log(this);
  },
  render: (h) => h(App),
}).$mount("#app");
