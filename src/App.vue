<template>
  <div id="app">
  	<!--<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">-->
  	<transition :name="direction">
      <keep-alive>
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
    <loading v-model="isLoading" style="position: relative;z-index: 9999;"></loading>
  </div>
  
</template>

<script>
		import {wixi_fen} from '@/service/wixi_code'
	 import { Loading } from 'vux'
	 import store from './store/' //引入数据
  	export default {
    components: {Loading},
    computed: {
      direction(){
      	return store.state.common.direction;
      },
      isLoading(){
      	return store.state.common.isLoading;
      }
    },
    data () {
      return {
      	
      }
    },
    mounted(){
    		var url = window.location.href;
	  		wixi_fen(url);
    },
    methods: {
    	
    },
  }
</script>

<style lang="less" scoped>
	@import url("assets/css/common.css");
	@import url("assets/font/iconfont.css");
	html, body{
		max-width: 680px;margin: 0 auto;
	}
	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  color: #2c3e50;max-width: 680px;margin: 0 auto;
	  width: 100%;height: 100%;position: relative;
	}
	
	.router-view {
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
	
	.vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    backface-visibility: hidden;
    transition: all 500ms;
    position: absolute;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
