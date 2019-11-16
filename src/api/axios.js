import axios from 'axios'
import store from '../store'
import vue from '@/main'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? '/api' : process.env.BASE_API, // api 的 BASE_API
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.userInfo.token) {
      config.headers['token'] = store.getters.userInfo.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code == 403) {
        localStorage.removeItem('userInfo')
        vue.$store.commit('SET_USERINFO', {})
        vue.$router.push('/login')
        setTimeout(() => {
          location.reload()
        },200)
        
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
