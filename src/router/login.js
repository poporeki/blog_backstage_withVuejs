import Login from '@/views/Login'
import store from '../store/index'
export default {
  path: '/login',
  meta: {
    title: '登录'
  },
  component: Login,
  beforeEnter: (to, from, next) => {
    if (store.state.userInfo && ['root', 'admin'].indexOf(store.state.userInfo.permissions) !== -1) {
      next('/index');
    } else {
      next()
    }


    console.log(store.userInfo);
  }
}