import axios from 'axios'

const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  const AUTH_TOKEN = localStorage.getItem('token')
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
  Vue.prototype.$http = axios
}
export default MyHttpServer
