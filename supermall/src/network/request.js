import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })

  //拦截器
  axios.interceptors.request.use(config=>{
    return config
  },err=>{

  })

  axios.interceptors.request.use(result=>{
    return result.data
  },err=>{

  })
  return instance(config)
}
