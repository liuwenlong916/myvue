export default {
  // namespaced: true, //调用dispatch/action 需要完整路径counter/add
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
  actions: {
    add({ commit }, num = 1) {
      setTimeout(function() {
        commit("add", num);
      }, 1000);
    },
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    },
  },
};
