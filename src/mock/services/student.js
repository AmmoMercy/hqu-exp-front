import Mock from 'mockjs2'
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
Mock.mock(/\/api\/student\/myinfo/, 'get', student)
