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
