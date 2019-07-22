import { axios } from '@/utils/request'
export function getEnt (parameter) {
  return axios({
    url: '/api/enterprise/detail?' + 'enterprise=' + parameter,
    method: 'get'
  })
}
export function getEntInfo (parameter) {
  return axios({
    url: '/api/enterprise/info',
    method: 'get'
  })
}
export function publish (parameter) {
  return axios({
    url: '/api/enterprise/internship',
    method: 'post',
    data: parameter
  })
}
