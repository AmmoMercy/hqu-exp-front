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
    url: '/enterprise/result/certificate',
    method: 'put',
    data: parameter
  })
}
export function getEntDetail (parameter) {
  return axios({
    url: '/api/enterprise/detail',
    method: 'get'
  })
}
export function getEntApp (parameter) {
  return axios({
    url: '/api/enterprise/applicationlist?' + 'internshipId=' + parameter & 'page=' + parameter & 'status=' + parameter,
    method: 'get'
  })
}
export function getInternshipList () {
  return axios({
    url: '/enterprise/internshiplist',
    method: 'get'
  })
}
