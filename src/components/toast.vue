<template>
	<div id="toast">
		<div id="errorBox" class="errorBox BoxMove3" :class="{errorBoxHide:errorHideBool}" v-if="boolTip"><p>{{tipText}}</p></div>
	</div>
</template>


<script>
		
	export default {
	  data () {
	    return {
	    	
	    }
	  },
	  props:{//接收父组件参数
		boolTip:false,
		tipText:'',
		errorHideBool:false
	  },
	  created(){
	  	
	  },
	  methods:{
	  		
	  },

	}
	
</script>


<style lang="less" scoped>
	#toast{
		position: absolute;left: 0;
		width: 100%;z-index: 1001;
	}
	.BoxMove3 {transition: all 1s ease-in-out;-webkit-transition: all 1s ease-in-out;}
  #errorBox{width: 200px;border-radius: 3px; margin-left:-100px;z-index: 999;position: fixed;left: 50%;top:30%; overflow: hidden;font-family: "microsoft yahei";background: rgba(51,51,51,0.7);}
  #errorBox.succeed{background:rgba(58, 181,74, 0.7);}
  #errorBox p{border-radius: 3px;padding: 12px;width: 89%;height: 100%;color: #fff;text-align: center;font-size: 12px;}
  .errorBox{opacity:1;}
  .errorBoxHide{opacity: 0;}
</style>