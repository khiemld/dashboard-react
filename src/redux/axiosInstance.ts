import axios from 'axios'


// export let getToken = localStorage.getItem('accessToken')?.split('\"').join('')
let getToken = localStorage.getItem('accessToken')?.split('\"').join('')


if (!getToken) {
  getToken = sessionStorage.getItem('accessToken')?.split('\"').join('')
}


export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${getToken}`
}}
)

axiosInstance.interceptors.request.use(function (config) {
  let getToken = localStorage.getItem('accessToken')?.split('\"').join('')
  if (!getToken) {
    getToken = sessionStorage.getItem('accessToken')?.split('\"').join('')
  }
  config.headers['Authorization'] = 'Bearer ' + getToken
  return config
})