import { axios } from '@/utils/request'
export function getEnt () {
  return axios({
    url: '/admin/enterpriselist',
    method: 'get'
  })
}
export function Audit (parameter) {
  return axios({
    url: '/enterprise/detail',
    method: 'put',
    data: parameter
  })
}
export function AdminGetExpList () {
  return axios({
    url: '/admin/internshiplist?page=1',
    method: 'get'
  })
}
export function adminGetEnt (param) {
  return axios({
    url: '/admin/internship?internship=' + param,
    method: 'get'

  })
}
export function PostStatus (data) {
  return axios({
    url: '/admin/internship',
    method: 'PUT',
    data: data

  })
}
export function getGrade (level) {
  return axios({
    url: '/admin/stumanagelist' + level,
    method: 'GET'

  })
}
