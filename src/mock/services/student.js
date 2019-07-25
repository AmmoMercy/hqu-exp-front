import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'
// import { builder } from '../util'

// const expList = (options) => {
//   console.log(options)
//   return {
//     'code': 200,
//     'exp': {
//       'name': '图灵',
//       'topic': '2'
//     }
//   }
// }
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
      'intro': '这是一段描述',
      'description': '这是实训经历'
    }
  }
}

const completion = options => {
  console.log(options)
  return {
    code: 200,
    msg: '处理成功'
  }
}
const perception = options => {
  console.log(options)
  return {
    code: 200,
    msg: '处理成功'
  }
}


const totalCount = 30
const serverList = (options) => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  // const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    result.push({
      key: '1',
      stu_id: '21313131',
      name: 'KooBoo',
      gender: '男',
      enterence_year: '2019',
      major: 'IT',
      tel: '123456',
      introduction: '这是一段描述',
      email: 'Kooboo@qq.com',
      exps: 'this is exps balabalabalabalabalabala',
      grade: '80'
    },
    {
      key: '2',
      stu_id: '123123',
      name: 'tencent',
      gender: '女',
      enterence_year: '2019',
      major: 'IT',
      tel: '123456',
      introduction: '这是一段描述',
      email: 'tencent@qq.com',
      exps: 'this is exps balabalabalabalabalabala',
      grade: '80'
    })
  }
  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  }
  )
}

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/api\/student\/completion\/perception/, 'post', perception)
Mock.mock(/\/api\/student\/myinfo/, 'get', student)
Mock.mock(/\/api\/student\/completion\/work/, 'post', completion)
// Mock.mock(/\/api\/student\/completion\/table/, 'get', expList)
