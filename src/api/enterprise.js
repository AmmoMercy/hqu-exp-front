import { axios } from '@/utils/request'
export function getEnt (parameter) {
  return axios({
    url: '/enterprise/detail?' + 'enterprise=' + parameter,
    method: 'get'
  })
}
export function getEntInfo (parameter) {
  return axios({
    url: '/enterprise/info',
    method: 'get'
  })
}
export function publish (parameter) {
  return axios({
    url: '/enterprise/internship',
    method: 'post',
    data: parameter
  })
}
export function register (parameter) {
  return axios({
    url: '/enterprise/register',
    method: 'post',
    data: parameter
  })
}
export function submitprove (parameter) {
  return axios({
    url: '/enterprise/result',
    method: 'post',
    data: parameter
  })
}
