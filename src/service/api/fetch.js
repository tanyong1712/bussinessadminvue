import axios from "axios"
import router from '../../router'
const _URL_API = apiServer
// 添加请求拦截器
axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token")

    if (token) {
        // config.headers.common['Authorization'] = 'bearer ' + token;
    }
    config.url = _URL_API + config.url;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response=>{
    console.log('Result:')
    console.log(response)
    // 对响应数据做点什么
    if (response.status == 200 || response.status == 201) {
        //图形验证码直接返回
        if (response.config.url === "/api/captcha") {
            return response.data
        }
        if (response.data.code === 1001) {
          //登录过期 返回登录页面
          router.push({path: '/login'})
          return Promise.reject(response.data.msg);
        }

        //console.log('1submit!!');
        return response.data
    }else{
        //console.log('2submit!!');
        return Promise.reject(response.data.msg);
    }
    //console.log('3submit!!');
    return Promise.reject(response);
}, function (error) {
    console.log(error)
    // error
    return Promise.reject(error);
});

export default axios
