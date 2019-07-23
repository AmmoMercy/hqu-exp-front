import Mock from 'mockjs2'
import { builder } from '../util'

const expList = (options) => {
  const result = []

  result.push({
    key: '1',
    name: '图灵',
    exp_name: '亚尔迪'
  })

  return builder({
    data: result
  })
}
const student = (options) => {
  console.log(options)
  return {
    'code': 200,
    'data': {
      'stu_id': '1725121099',
      'name': '图灵',
      'gender': '2',
      'enterence_year': '1998',
      'major': '1436864169',
      'email': '0',
      'tel': '13366668888',
      'intro': '这是一段描述' }
  }
}

const completion = options => {
  console.log(options.url)
  return {
    code: 200,
    msg: '处理成功'
  }
}
Mock.mock(/\/api\/student\/myinfo/, 'get', student)
Mock.mock(/\/api\/student\/completion\/work/, 'post', completion)
Mock.mock(/\/api\/student\/completion\/table/, 'get', expList)
