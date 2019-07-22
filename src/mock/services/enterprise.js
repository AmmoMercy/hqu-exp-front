import Mock from 'mockjs2'
const publish = options => {
  console.log(options.url)
  return {
    code: 200,
    msg: '处理成功'
  }
}

const enterpriseInfo = (options) => {
  console.log(options.url)
  return {
    'code': 200,
    'msg': '请求成功',
    'data': {
      'enterpriseId': '1',
      'type': '企业',
      'name': '厦门亚尔迪',
      'address': '厦门软件园三期',
      'email': 'admin@kooboo.com',
      'contact_name': '戴先生',
      'contact_tel': '18866668888',
      'intro': '简介',
      'register_time': '1970-01-01T00:00:00',
      'status': '已通过',
      ' images': '图片'
    }
  }
}
Mock.mock(/\/api\/enterprise\/internship/, 'post', publish)
Mock.mock(/\/api\/enterprise\/info/, 'get', enterpriseInfo)
