import axios from 'axios' //引入 axios

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.API, // api 的 base_url
  timeout: 15000, // 请求超时时间
})
 
export default service