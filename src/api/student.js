import { axios } from '@/utils/request'
// import api from './manage'
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
    method: 'post',
    data: parameter
  })
}
export function perception (parameter) {
  return axios({
    url: '/student/completion/perception',
    method: 'post',
    data: parameter
  })
}
export function getProcessingExp () {
  return axios({
    url: '/student/exping',
    methodd: 'get'
  })
}
// export function getExpList (parameter) {
//   return axios({
//     url: '/student/completion/table',
//     method: 'get',
//     parameter: parameter

//   })
// }
