import Mock from 'mockjs2'
const publish = (options) => {
  console.log(options.url)
  return {
    code: 200,
    msg: '处理成功'
  }
}
Mock.mock(/\/api\/enterprise\/internship/, 'post', publish)
