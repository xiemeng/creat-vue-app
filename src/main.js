// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from 'qs'
import './service/rem'
import FastClick from 'fastclick';
require('swiper/dist/css/swiper.css'); //swiper  css文件

import './api/config'
import VueScroller from 'vue-scroller'   //上下拉加载
Vue.use(VueScroller)
//import VueViewload from 'vue-viewload'   //图片懒加载  不能用，苹果9系统出不来页面
//Vue.use(VueViewload)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';




import store from './store/'
import {sync} from 'vuex-router-sync'//vuex和router同步插件
var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
var ua = window.navigator.userAgent.toLowerCase(); //判断是否是微信
if(ua.match(/MicroMessenger/i) == 'micromessenger'){  //微信环境
  round()
}else if(userAgent.indexOf("Safari") > -1){    //app环境
    	
	
}else{
	
		round()
}
//监听苹果手机滑屏事件
var endX;
document.addEventListener('touchmove',touch1, false); 
function touch1(event){
	var touch = event.targetTouches[0];
	endX = touch.pageX;
	
}

function round(){
	Vue.config.productionTip = false;
	sync(store, router)
	const history = window.sessionStorage;
	history.clear()
	let historyCount = history.getItem('count') * 1 || 0
	history.setItem('/', 0);
	
	router.beforeEach(function (to, from, next) {
		
		
		const toIndex = history.getItem(to.path);
		const fromIndex = history.getItem(from.path);
		
		if(endX){
			store.commit('updateDirectionStatus', {direction: ' '})
			
			endX = null;
		}else{
			store.commit('updateLoadingStatus', {isLoading: true});
			if (toIndex) {//页面过渡效果 
			
			    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
			    	 //第二次进入页面
			      store.commit('updateDirectionStatus', {direction: 'vux-pop-in'})
			    } else {   
			    	//第一次进入页面
			      store.commit('updateDirectionStatus', {direction: 'vux-pop-out'})
			    }
			} else {   //新页面
						++historyCount
				    history.setItem('count', historyCount)
				    to.path !== '/' && history.setItem(to.path, historyCount);
				    store.commit('updateDirectionStatus', {direction: 'vux-pop-in'})
			}
		}
			document.title = to.meta.title || '银蝶';
			
			next();
	})
	
	router.afterEach(function (to) {
		
			store.commit('updateLoadingStatus', {isLoading: false})
			
		
		
	})
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
FastClick.attach(document.body)