import Vue from 'vue'
import Vuex from 'vuex'

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
//安装vuex
Vue.use(Vuex)

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state: state,
  getters:getters,
  mutations: mutations,
  actions: actions
})

export default store
