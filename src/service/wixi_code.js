
import {getAppid,defAuth,UserAuth,getSignPackage,shareReturn,getActShareInfo} from 'api/wixin'
export const wixi_code = (type,reFunc) =>{
		var appid;
		var urls;
//		var ua = window.navigator.userAgent.toLowerCase(); //判断是否是微信
//      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
           get_appid()  //去执行
//      }else{
//          return false;
//      }

		function get_appid(){
			
			getAppid(type).then((res)=>{   //获取appid
		  		if(res.code == 1000){
		  			appid = res.data.appid;
		  			
		  			if(localStorage.getItem('CodeError')){
		  				
	                       getCode_two();
	                }else{
	                       getCode_one();
	                       
	                }
		  		}
		  })
		}
		
		function getCode_one(){//获取授权码code  静默授权
	        	/* 微信静默授权调用 地址必须加上encodeURIComponent解码  snsapi_base 代表静默授权*/
	        	urls = window.location.href;
            	var REDIRECT_URI = encodeURIComponent(window.location.href);
				var code = getQueryString('code');
            	//判断code有没有存在，存在去请求后端接口
            	if(!code){
            		
	                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+REDIRECT_URI+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
	             }else{
	             	
		                get_openid();
	                }

	        };
		function getQueryString(name){ //截取授权码code
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
                var r = window.location.search.substr(1).match(reg);
                if (r!=null){
                	console.log(unescape(r[2]))
                    return unescape(r[2]);
                }else{
                    return null
                };
            };
        function  get_openid(){//传递code给后端返回需要的微信个人信息接口
	            var code = getQueryString('code');
	            if(code){
		            defAuth(type,code).then((res)=>{
		            	console.log(res)
		                if(res.code ==1000){
		                	localStorage.setItem('CodeOK',1);
		                   if(res.data.is_auth == 2){   //获取信息
		                   		getEnd()
		                   		console.log('静默授权成功')
		                   }
		                }else{
		                	
	                      if(res.data.is_auth == 1){  //去动态授权
		                   		getCode_two();
		                   		
		                   		localStorage.setItem('CodeError',0);
		                   	}else{
		                   		
		                   	}
		      
		                }
		            })
	            }else{
	            	getCode_one()
	            }
       		};
       	
	    function getURLcode(url){//去除code，拼接链接

	            var star1 = url.indexOf('?');
	            var star0 = url.substring(0,star1);
	            var star2 = url.indexOf('#');
	            var star3 = url.substring(star2);
	            var nowUrl = star0+star3;
	            return nowUrl;

		};
   		function  getCode_two(){ //获取授权码code  动态授权
   			
            	urls = window.location.href;
	            var nowUrl = getURLcode(urls);
	            var REDIRECT_URI = encodeURIComponent(nowUrl);
	            
	            if(!localStorage.getItem('CodeOK')){
	                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+REDIRECT_URI+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
	                localStorage.setItem('CodeOK',1);
	            }else{
	            	
	                getWtwo();//第二次传code,获取用户信息
	            }
				
        };
        function getWtwo(){//第二次传code,获取用户信息
	            var code = getQueryString('code');
	            if(code){
		            UserAuth(type,code).then((res)=>{
		                 console.log(res)
		                 	if(res.code ==1000){
			                   if(res.data.is_auth == 2){   //获取信息
			                   		console.log('动态授权成功')
			                   		getEnd()
			                   }
			                }else{
			                	getEnd();
		                      if(res.data.is_auth == 1){  //去动态授权
			                   		getCode_two();
			                   		
			                   		
			                   	}else{
			                   		
			                   	}
			      
			                }
		                 
		            })
	            }else{
	            	getCode_one()
	            }
       		};
       	function getEnd(){
       			reFunc();
	       			console.log('执行了回掉')
	       			localStorage.removeItem('CodeOK',1);
	            	localStorage.removeItem('CodeError',0);
	        	};
}


//微信分享
export const wixi_fen = (url, activity_id,das) =>{
		
		var url = location.href.split('#')[0]
	  		url = encodeURIComponent(url);
        var activity_id = activity_id, das=das;
        var wx_title,
            wx_desc,
            wx_url ,
            activityid,
            share_money,
            is_share,
            wx_share_img;
        var ua = window.navigator.userAgent.toLowerCase(); //判断是否是微信
	        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        	
	           wixi_Sign(url);
	        }else{
	            return false;
	        }
        
        function wixi_Sign(url){ //获取验圈签名
        	
             getSignPackage(url).then((r)=>{
             	
                    if(r.code==1000){
                    	console.log(r)
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: r.data.appId, // 必填，公众号的唯一标识
                            timestamp:r.data.timestamp  , // 必填，生成签名的时间戳
                            nonceStr: r.data.nonceStr, // 必填，生成签名的随机串
                            signature: r.data.signature,// 必填，签名，见附录1
                            jsApiList: [
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        if(das == 1){
                        	
                           getActivityInfo(activity_id);
                        }else{
                        	
                           getweek();
                        }

                    }
             });
        };
        function getweek(){//周分享
//      	activity_id = r.data.activity_id;  //活动id
            wx_title = '好东西就要和好友一起分享'; //分享标题
            wx_desc = '我在银蝶投资，收益高，推荐给你！注册即送5000元体验金！';  //分享内容
            wx_url = 'http://dev.yindies.com/wap/#/weixinlogin'; //分享链接  测试
//          wx_url = 'http://www.yindies.com/wap/#/weixinlogin'; //分享链接
	        wx_share_img = 'http://yindie.b0.upaiyun.com/20170809/wechatshare.png';   //分享图片
	        
            wixi_ready();
//          getweekShare().then((r)=>{
//               if(r.code==1000){
//                  activity_id = r.data.activity_id;  //活动id
//                  wx_title = r.data.wx_title; //分享标题
//                  wx_desc = r.data.wx_desc;  //分享内容
//                  wx_url = r.data.wx_url; //分享链接
//                  wx_share_img = r.data.wx_share_img;   //分享图片
//                  share_money = r.data.share_money;  //分享金额
//                  is_share = r.data.is_share; //是否已分享 0没有 1已分享
//                  wixi_ready();
//               }
//          })
        };
        function getActivityInfo (activity_id){//单个活动分享
                getActShareInfo(activity_id).then((r)=>{
                	console.log(r)
                    if(r.code == 1000){
                            wx_title = r.data.title;   //标题
                            wx_desc = r.data.content;   //内容
                            wx_url = r.data.link;
                            wx_share_img = r.data.image;
                            
                            wixi_ready();
                    }
                });

        };
        function wixi_ready(){
        		
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在rea   dy函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                wx.ready(function(){
                    wx.onMenuShareTimeline({//分享朋友圈
                            title: wx_title , // 分享标题
                            link: wx_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl:wx_share_img, // 分享图标
                        success: function () {
                                // 用户确认分享后执行的回调函数
                                
                                getReturn(1)
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
								
                        }
                    });
                wx.onMenuShareAppMessage({//分享朋友
                        title: wx_title, // 分享标题
                        desc: wx_desc, // 分享描述
                        link: wx_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: wx_share_img, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            
                            getReturn(2)
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                wx.error(function(res){
                     //alert(res);
                });
        };
        function getReturn(num){
            shareReturn(1,1).then((r)=>{
                    if(r.code==1000){
                        console.log('分享成功')
                    }else{
                        console.log('分享取消')
                    }
             })
        }
}
