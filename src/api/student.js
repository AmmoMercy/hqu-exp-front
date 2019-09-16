import { axios } from '@/utils/request'
export function getStu (parameter) {
  return axios({
    url: '/student/detail?' + 'student=' + parameter,
    method: 'get'
  })
}
export function getStuInfo () {
  return axios({
    url: '/student/myinfo',
    method: 'get'
  })
}
export function completion (parameter) {
  return axios({
    url: '/student/completion/work',
    method: 'put',
    data: parameter
  })
}
export function perception (parameter) {
  return axios({
    url: '/student/completion/perception',
    method: 'put',
    data: parameter
  })
}
export function getProcessingExp () {
  return axios({
    url: '/student/exping',
    methodd: 'get'
  })
}
export function editStudent (parameter) {
  return axios({
    url: '/student/edit',
    method: 'put',
    data: parameter
  })
}
export function getInternships () {
  return axios(
    {
      url: '/student/internshiplist'
    }
  )
}
export function studentUpload (parameter) {
  return axios({
    url: '/student/work',
    method: 'put',
    data: parameter
  })
}
export function studentapply (parameter) {
  return axios({
    url: '/student/application',
    method: 'post',
    data: parameter
  })
}
export function stuGetInternship (id) {
  return axios({
    url: '/student/internship?internship=' + id,
    methodd: 'get'
  })
}
export function stuGetEnterprise (id) {
  return axios({
    url: 'enterprise/detail?enterprise=' + id,
    methodd: 'get'
  })
}
export function register (val) {
  return axios({
    url: '/student/register',
    method: 'post',
    data: val
  })
}
