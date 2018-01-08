import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const home = r => require.ensure([], () => r(require('../views/home/')), 'home');//主页
const invest = r => require.ensure([], () => r(require('../views/invest/')), 'invest');//投资列表
const mine = r => require.ensure([], () => r(require('../views/mine/')), 'mine');//我的


export default new Router({
  routes: [
//二级路由,地址为空时跳转地址
    {
      path: '/',
      redirect:'/home'
    },
    //主页面
    {
      path: '/home',
      component: home,
      name:'home', 
    },
    //投资
    {
      path: '/invest',
      component: invest,
      name:'invest',
    },
    //我的
    {
      path: '/mine',
      component: mine,
      name:'mine',
    },
   
  ]
})
