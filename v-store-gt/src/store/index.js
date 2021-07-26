import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import apiPlugins from "../plugins/api";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules,
  plugins: [apiPlugins]
});

/*export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});*/
