import Vue from "vue";
import Vuex from "vuex";
// import Vuex from "../Plugins/kvuex/kvuex";
import counter from "./counter";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {
  //   mainCounter: 1,
  // },
  // //commite
  // mutations: {
  //   add(state, num = 1) {
  //     state.counter += num;
  //   },
  // },
  // //dispatch
  // actions: {
  //   add({ commit }, num = 1) {
  //     setTimeout(function() {
  //       commit("add", num);
  //     }, 1000);
  //   },
  // },
  // getters: {
  //   doubleCounter(state) {
  //     return state.counter * 2;
  //   },
  // },

  modules: {
    counter,
  },
});
