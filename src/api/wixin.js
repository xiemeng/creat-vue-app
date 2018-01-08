import {M_BASE_URL} from './commoe_url'

//微信授权第一步，获取APPID
export const getAppid = (type) => axios.post(M_BASE_URL, {
  opact: 'Wechat/getAppid',
  type:type
});

//第二步，静默授权
export const defAuth = (type,code) => axios.post(M_BASE_URL,{
	opact:'Wechat/defAuth',
	type:type,
	code:code
});

//第三步，重新主动授权，获取用户信息
export const UserAuth = (type,code) => axios.post(M_BASE_URL,{
	opact:'Wechat/UserAuth',
	type:type,
	code:code,
});


export const shareReturn = (share_type,act_id) => axios.post(M_BASE_URL, {   //分享回调
  opact: 'Wechat/shareReturn',
  share_type:share_type,
  act_id:act_id,
});
export const getSignPackage = (URL,) => axios.post(M_BASE_URL, {   //获取微信分享签名
  opact: 'Wechat/getSignPackage',
  url:URL,
  type:2,
});
export const WxLogin = () => axios.post(M_BASE_URL, {   //微信免登陆
  opact: 'Wechat/WxLogin',
});
export const getActShareInfo = (act_id) => axios.post(M_BASE_URL, {   //获取活动分享信息
  opact: 'WechatShare/getActShareInfo',
  act_id:act_id,
});
export const getCurShareInfo = () => axios.post(M_BASE_URL, {   //获取分享信息//非活动
  opact: 'WechatShare/getCurShareInfo',
});






