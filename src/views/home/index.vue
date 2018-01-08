<template>
  <div id="home">
  	首页
  	<foot></foot>
  	<toast :errorHideBool="errorHideBool" :boolTip="boolTip"  :tipText="tipText"></toast>
  </div>
  	
</template>

<script>
	import {WxLogin} from 'api/wixin'
	import {wixi_code,wixi_fen} from '@/service/wixi_code'
	import foot from '@/components/footer.vue';
	import toast from '@/components/toast';
	
	export default {
		components: {foot,toast},
	  data () {
	    return {
	    	timer:'',
	    	timer2:'',
	    	tipText:'hello',
		    boolTip:false,
		    errorHideBool:false,
	    }
	  },
	  
	  methods:{
	  		
	  		fnError(test){
								this.errorHideBool = false;
			          this.boolTip=true;
			          this.tipText = test;
			          clearTimeout(this.timer2);
			          clearTimeout(this.timer);
			          this.timer2 = setTimeout(()=>{
			            this.errorHideBool = true;
			            },1000);
			          
			          this.timer = setTimeout(()=>{
			            this.boolTip=false;
			            
			          },2000);
			    },
			 	
			
	  },
	  created(){
				
	  },
	  activated(){
	  	
	  },
	  mounted(){
	  	
	  	
//	  	this.getList();
	  },
	  watch: {
	   	$route(){
           //数字滚动特效
	  			 
        }
	  },
	}
</script>


<style lang="less" scoped>

</style>
