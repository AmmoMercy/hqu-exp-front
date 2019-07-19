import { axios } from '@/utils/request'
export function getStu (parameter) {
  return axios({
    url: '/api/student/detail?' + 'student=' + parameter,
    method: 'get'
  })
}
export function getStuInfo (parameter) {
  return axios({
    url: '/api/student/myinfo',
    method: 'get'
  })
}
