import { axios } from '@/utils/request'
export function getEnt () {
  return axios({
    url: '/admin/enterpriselist',
    method: 'get'
  })
}
export function Audit (parameter) {
  return axios({
    url: '/admin/enterprise',
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
export function adminGetExp (param) {
  return axios({
    url: '/admin/internship?expId=' + param,
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
    url: '/admin/stumanagelist?level=' + level,
    method: 'GET'

  })
}
