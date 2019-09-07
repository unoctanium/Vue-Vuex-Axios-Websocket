import Vue from "vue";
import Vuex from "vuex";

//import moduleStatus from "./moduleSettings";
//import moduleSettings from "./moduleSettings";

Vue.use(Vuex);

const modules = {
  //  status: moduleStatus,
  //  settings: moduleSettings
};

const state = {
  test: "jo"
};

const mutations = {};

const actions = {};

const getters = {};

export default new Vuex.Store({
  modules,
  state,
  mutations,
  actions,
  getters
});
