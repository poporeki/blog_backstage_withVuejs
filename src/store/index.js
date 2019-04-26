import Vue from 'vue'
import Vuex from 'vuex'

import Loading from './modules/loading'
import SocketHardware from './modules/socket'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    loading: Loading,
    socket: SocketHardware
  }
})