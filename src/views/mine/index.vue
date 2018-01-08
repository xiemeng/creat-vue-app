<template>
  <div id="home">
  	我的
    
  	<foot></foot>
  	<toast :errorHideBool="errorHideBool" :boolTip="boolTip"  :tipText="tipText"></toast>
  </div>
  	
</template>

<script>
	import toast from '@/components/toast';
	import foot from '@/components/footer.vue';
	export default {
		components: {foot,toast},
	  data () {
	    return {
	    	timer2:'',
				timer:'',
	    	showShade:false,
	    	tels:'',//用户电话
	    	tipText:'hello',
				boolTip:false,
				errorHideBool:false,
	    	
	    }
	  },
	  methods:{
	  		
				fnError(test){   //toast  提示
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
			            
//			            this.errorHideBool = false;
			          },2000);
			    },
	  },
	  created(){
	  	
	  },
	  activated(){
	  	
	  },
	  mounted(){
	 			
	  },
	  
	}
</script>


<style lang="less" scoped>

</style>
