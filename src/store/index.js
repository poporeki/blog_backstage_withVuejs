import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import Loading from './modules/loading'
import SocketHardware from './modules/socket'

const USER_LOGOUT = 'USER_LOGOUT';
const USER_LOGIN = 'USER_LOGIN';
const USER_INFO_RESET = 'USER_INFO_RESET';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //登录用户信息
    userInfo: {},
    //登录状态
    isLogin: false,
    //导航栏状态
    isCollapseSidebar: true
  },
  mutations: {
    /**改变导航栏展开状态 */
    isCollapse(state) {
      state.isCollapseSidebar = !state.isCollapseSidebar;
    },
    /**重置用户相关数据 */
    [USER_INFO_RESET](state) {
      state.userInfo = {};
      state.isLogin = false;
    }

  },
  actions: {
    /**退出登录 */
    [USER_LOGOUT]({
      commit
    }, vm) {
      let url = '/logout';
      vm.$axios.post('/logout').then(({
        data
      }) => {
        if (data.status === 1) {
          commit('USER_INFO_RESET');
          vm.$router.push({
            path: '/login'
          });
        }
      })
    }
  },
  modules: {
    loading: Loading,
    socket: SocketHardware
  }
})