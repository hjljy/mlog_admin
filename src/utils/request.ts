import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session } from '/@/utils/storage';

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as any,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    'x-requested-with': 'XMLHttpRequest'
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config: { headers: { Authorization?: any; "Content-Type"?: string; "x-requested-with"?: string; }; }) => {
    if (!config.headers) {
      config.headers = {
        'Content-Type': 'application/json',
        'x-requested-with': 'XMLHttpRequest'
      }
    }
    // 在发送请求之前做些什么 token
    if (Session.get('token')) {
      config.headers.Authorization = `${Session.get('token')}`;
    }
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response: { data: any; }) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code && res.code !== 0) {
      ElMessageBox.alert(res.msg, '提示', {})
        .then(() => { })
        .catch(() => { });
      // `token` 过期或者账号已在别处登录
      if (res.code >= 20000 && res.code <= 30001) {
        Session.clear(); // 清除浏览器全部临时缓存
        window.location.href = '/'; // 去登录页
      }
      return Promise.reject(service.interceptors.response);
    } else {
      return response.data;
    }
  },
  (error: { message: string | string[]; response: { data: any; statusText: any; }; }) => {
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') != -1) {
      ElMessage.error('网络超时');
    } else if (error.message == 'Network Error') {
      ElMessage.error('网络连接错误');
    } else {
      if (error.response.data) ElMessage.error(error.response.statusText);
      else ElMessage.error('接口路径找不到');
    }
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default service;
