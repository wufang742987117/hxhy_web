import "babel-polyfill";
import { Message } from 'element-ui';
import axios from 'axios'
import qs from 'qs'
import { GET } from "common/js/user"
import vue from '@/main'

// axios 配置
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.common['Authorization'] = ''
// axios.defaults.headers.token = get_userInfo('resultSet')

// POST传参序列化
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }

  if (GET('TOKEN')) {
    console.log(GET('TOKEN'))
    config.headers.common['token'] = GET('TOKEN');
  }

  return config;
}, error => {
  Message.error('错误的传参')
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(res => {
  if (res.data.success === true) {
    console.log(res.config.url, res.data)
    return res.data;
  } else {
    console.error(res.config.url, res.data)
    if(res.data.code === '2003'){
      vue.$router.push('/login')
    }
    // Message.error(res.data.msg)
    return Promise.reject(res.data);
  }
}, error => {
  Message.error('网络异常')
  // return Promise.reject(error);
});

axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'http://47.96.116.58:12539';



