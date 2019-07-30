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
    url: '/enterprise/detail',
    method: 'get'
  })
}
/* export function getEntApp (parameter) {
  return axios({
    url: '/enterprise/applicationlist?' + 'internshipId=' + parameter & 'page=' + parameter,
    method: 'get'
  })
} */
export function getInternshipList () {
  return axios({
    url: '/enterprise/internshiplist',
    method: 'get'
  })
}
export function getApplyList (internshipId) {
  return axios({
    url: '/enterprise/applicationlist?internshipId=' + internshipId + '&page=1',
    method: 'get'
  })
}
export function getInternship (id) {
  return axios({
    url: '/enterprise/internship?internship=' + id,
    method: 'get'
  })
}
export function putmark (param) {
  return axios({
    url: '/enterprise/result/mark',
    method: 'put',
    data: param
  })
}
export function getStuManageList (internshipId) {
  return axios({
    url: '/enterprise/stumanagelist?exp_id=' + internshipId + '&page=1',
    method: 'get'
  })
}
export function getApplyCount () {
  return axios({
    url: '/enterprise/application/count',
    method: 'get'

  })
}
