import Mock from 'mockjs2'
const internship = (options) => {
  console.log(options)
  return {
    'code': 200,
    'msg': '查询成功',
    'data':
    {
      'expId': '1',
      'topic': '基于kooboo的实训管理系统开发',
      'enterprise': '亚尔迪',
      'exp_begin_time': '1970-01-01T00:00:00',
      'exp_end_time': '1970-01-01T00:00:00',
      'submit_time': '1970-01-01T00:00:00',
      'description': '描述',
      'need_num': '8',
      'submit_num': '8',
      'enterprise_check_num': '8',
      'stu_check_num': '7',
      'apply_end_time': '1970-01-01T00:00:00',
      'status': 2,
      'type': '企业'
    }
  }
}
Mock.mock(/\/api\/enterprise\/internship/, 'post', internship)
