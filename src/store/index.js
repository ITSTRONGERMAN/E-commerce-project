import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shadow: false,
  },
  getters: {},
  mutations: {
    changeShadow(state, val) {
      state.shadow = val;
    },
  },
  actions: {},
  modules: {},
});
