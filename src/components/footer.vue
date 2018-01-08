<template>
  	<footer id="foot" class="vue-1px-t">
  		<div @click="home(1)" :class="{active:index == 1}">
  			<i class="iconfont icon-shouye icon_1" v-if="index != 1"></i>
  			<i class="iconfont icon-shouye icon_1" v-if="index == 1"></i>
  			<p>首页</p>
  		</div>
  		<div @click="invest(2)" :class="{active:index == 2}">
  			<i class="iconfont icon-licai1 icon_1" v-if="index != 2"></i>
  			<i class="iconfont icon-licai1 icon_1" v-if="index == 2"></i>
  			<p>投资</p>
  		</div>
  		<div @click="mine(3)" :class="{active:index == 3}">
  			<i class="iconfont icon-wode icon_1" v-if="index != 3"></i>
  			<i class="iconfont icon-wode icon_1" v-if="index == 3"></i>
  			<p>我的</p>
  		</div>
  	</footer>
</template>

<script>
	export default {
	  data () {
	    return {
	    	
	    }
	  },
	  computed: {
	  	index(){
	  			return this.$route.query.id || 1;
	  	}
	  },
	  mounted(){
	  	
	  },
	  methods:{
	  		home(){
	  			
			 		this.index = 1;
			 		this.$router.push({ path: 'Home',query:{ id:1}})
			 },
			 invest(){
			 		
			 		this.index = 2;
			 		this.$router.push({ path: 'invest',query:{ id:2}})
			 },
			 mine(){
			 		this.index = 3;
			 		this.$router.push({ path: 'mine',query:{ id:3}})
			 },
	  },
	  props:{//接收父组件参数
			
		},
	}
</script>


<style lang="less" scoped>
		#foot{
			height: 49px;box-sizing: border-box;padding-top: 5px;padding-bottom: 5px;
			display: flex;text-align: center;z-index: 998;
			background-color: #fff;width: 100%;border-top: 1px solid #aaaaaa;
			width: 100%;position: fixed;left: 50%;bottom: 0;max-width: 680px;margin: 0 auto;
			-webkit-transform: translate(-50%,0);  
        	transform: translate(-50%,0); 
			div{
				flex: 1;width: 33.33%;color: #888;font-size: 10px;
				i{
					width: 22px;height: 22px;display: inline-block;
					font-size: 22px;
				}
				p{
					padding-top: 2px;color: #b0b0b0;
				}
			}
			.active{
				color: #ffbf17 !important;
				p{
					color: #feaa00 !important;
				}
			}
		}
		.icon-qian{
			position: relative;top: 2px;color: #aaa;
		}
		.vue-1px-t:before{
			border-top: 1px solid #F6F6F6;
		}
		/*单独适配iphoneX*/
		@media only screen and (width: 375px) and (height: 690px){
		    #foot{
		    	height: 83px;
		    }
		}
</style>
