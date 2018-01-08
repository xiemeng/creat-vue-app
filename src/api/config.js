import router from '../router'
import {stringify} from 'qs'//引用qs（类似引用vue等--他是全局的）一种转换数据的工具  qs是webpack里的
//import {clearStorage} from 'service/utils.js'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'//判断当前网站环境,
// axios.defaults.baseURL = M_BASE_URL;
axios.defaults.method = 'POST';
axios.defaults.timeout = 10000;//设置ajax请求超时时间，这里为10s
axios.defaults.data = {//ajax都要传的参数（公用的）
  version: "1_0_0"
};
axios.defaults.withCredentials=true;//解决session
axios.defaults.transformRequest = [function (data) {
  //为了避免qs格式化时对内层对象的格式化先把内层的对象转为
  debug&&console.info( data); //ajax请求前开始输出参数--debug:判断当前网站环境,
 // data.CustData = JSON.stringify(data.CustData);//stringify：格式化对象为json

  data = stringify(data);//stringify：将json转成后端可接收的数据

  return data;
}];

// axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


/*添加拦截器*/
/*axios.interceptors.request.use(function (config) {
  //在发送请求之前做某事
  return config;-
});*/
// 添加响应拦截器

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  debug&&console.info(response.data );  //ajax请求后开始输出参数

  // console.info('url---code--1-',response.data.url_code)
	if(response.data.url_code==102){
	//  clearStorage();
			localStorage.removeItem("enter");
	    console.info('是不是该登录去了',location.href);
	    console.log(router)
	    router.push({path:'enter',query:{url:location.href}});
	
	}else if(response.data.url_code==103){
		console.info('去绑卡',location.href);
		router.push({path:'noCard'});
	}
  return response.data;
}, function (error) {
  return Promise.reject(error);
});



