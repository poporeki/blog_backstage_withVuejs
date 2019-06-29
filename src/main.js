import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Axios from 'axios'
import echarts from 'echarts'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client';
import VueQuillEditor from 'vue-quill-editor';
import progressive from 'progressive-image/dist/vue'


import rem from '@/util/rem';
import qs from 'qs'

import {
  BASE_URL
} from '@/config/baseURL';

import './assets/css/cssreset.css'
import './plugins/element.js'
// import '../public/iconfont/iconfont.css'




Vue.prototype.$qs = qs;
Vue.prototype.$axios = Axios;
Vue.prototype.$echarts = echarts
Vue.use(VueSocketIO, 'https://v.yansk.cn');
Vue.use(VueQuillEditor);
Vue.use(progressive, {
  removePreview: true,
  scale: true
})
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

    console.log("auth");
    if (data.auth.status) {
      _store.state.isLogin = true;
      _store.state.userInfo = data.auth.info.user;
      next();
      return;
    }

    _store.state.isLogin = false;
    _store.state.userInfo = {};
    if (to.path === '/login') {
      next()
      return
    }
    next('/login')
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

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

vm.$socket.disconnect();