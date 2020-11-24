import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 1,
  },
  //commite
  mutations: {
    add(state, num = 1) {
      state.counter += num;
    },
  },
  //dispatch
  actions: {},
});
