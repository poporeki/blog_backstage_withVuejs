import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Axios from 'axios'
import echarts from 'echarts'
import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client';
import VueQuillEditor from 'vue-quill-editor';
import rem from '@/util/rem';
import qs from 'qs'

import {
  BASE_URL
} from '@/config/baseURL';

import './assets/css/cssreset.css'
import './plugins/element.js'
import '../public/iconfont/iconfont.css'



Vue.prototype.$qs = qs;
Vue.prototype.$axios = Axios;
Vue.prototype.$echarts = echarts
Vue.use(VueSocketIO, 'wss://v.yansk.cn');
Vue.use(VueQuillEditor);
Vue.config.productionTip = false

Axios.defaults.baseURL = BASE_URL;
Axios.defaults.withCredentials = true;
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
router.beforeEach((to, from, next) => {

  let _store = store;
  window.document.title = (to.meta.title || '') + "-" + window.document.title;
  // 用户时效验证
  Axios.post("/auth").then(({
    data
  }) => {
    next();
    console.log("auth");
    if (data.auth.status) {
      _store.state.isLogin = true;
      _store.state.userInfo = data.auth.info.user;
      return;
    }

    _store.state.isLogin = false;
    _store.state.userInfo = {};
    router.push("/login")
  });

});

//定义一个请求拦截器
Axios.interceptors.request.use(function (config) {
  if (config.url === BASE_URL + "/auth") return config;
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config;
});

Axios.interceptors.response.use(function (config) {
  let data = config.data;
  if (data.status === -9) {
    /* router.replace({
      path: "login",
      query: {
        redirect: router.currentRoute.fullPath
      }
    }); */
    router.push("/login")
  }

  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')