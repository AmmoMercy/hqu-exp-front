import { axios } from '@/utils/request'
import api from './manage'
export function getStu (parameter) {
  return axios({
    url: '/api/student/detail?' + 'student=' + parameter,
    method: 'get'
  })
}
export function getStuInfo () {
  return axios({
    url: '/api/student/myinfo',
    method: 'get'
  })
}
export function completion (parameter) {
  return axios({
    url: '/api/student/completion/work',
    method: 'post',
    data: parameter
  })
}
export function getExpList (parameter) {
  return axios({
    url: '/api/student/completion/table',
    method: 'get',
    parameter: parameter

  })
}
