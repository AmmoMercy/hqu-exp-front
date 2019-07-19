import { axios } from '@/utils/request'
export function getEntInfo (parameter) {
  return axios({
    url: '/api/enterprise/detail?' + 'enterprise=' + parameter,
    method: 'get'
  })
}
