<template>
  <a-row>
    <a-col :span="24">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="E-mail">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }]
              }
            ]"
            placeholder="请输入邮箱，邮箱即为登录账号"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码">
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: validateToNextPassword,
                }],
              }
            ]"
            type="password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码">
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: compareToFirstPassword,
                }],
              }
            ]"
            type="password"
            placeholder="请输入和上次相同的密码"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="学号">
          <a-input
            v-decorator="[
              'stu_id',
              {
                rules: [{ required: true, message: '请输入学号 !' }],
              }
            ]"
            placeholder="学号"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            姓名&nbsp;
            <a-tooltip title="What do you want others to call you?">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入姓名!', whitespace: true }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="性别">
          <a-select
            v-decorator="[
              'gender',
              {rules: [{ required: true, message: '请选择性别' }]}
            ]"
            placeholder="请选择你的性别"
          >
            <a-select-option value="1">男</a-select-option>
            <a-select-option value="0">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="入学年份">
          <a-input
            v-decorator="[
              'enterence_year',
              {
                rules: [{ required: true, message: '请输入入学年份!' }],
              }
            ]"
            placeholder="请输入入学年份"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="专业">
          <a-input
            v-decorator="[
              'major',
              {
                rules: [{ required: true, message: 'Please input your Major !' }],
              }
            ]"
            placeholder="请输入你的专业"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="电话号码">
          <a-input
            v-decorator="[
              'tel',
              {
                rules: [{ required: true, message: 'Please input your phone number!' },{validator:validatePhone}],
              }
            ]"
            placeholder="电话号码"
            style="width: 100%"
          >
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="个人描述">
          <a-textarea
            :autosize="{minRows: 4, maxRows: 10 }"

            v-decorator="[
              'introduction',
              {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              }
            ]"
            placeholder="请输入个人描述，如实训经历等，以便企业筛选。"
            style="width: 100%">

          </a-textarea >
        </a-form-item>

        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">

          <a-button
            size="large"
            class="register-button"
            type="primary"
            html-type="submit"
          >
            注册
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
// import SIdentify from '@/views/enterprise/identify'
import { register } from '@/api/student'
export default {
  data () {
    return {
      flag: true, // 该值变化，就会触发刷新
      code: '',
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    }
  },
  components: {
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    this.flag = !this.flag
  },
  methods: {
    toCaptcha (values) {
      var self = this
      var captcha = new TencentCaptcha('2085027395', (res) => {
      // res（未通过验证）= {ret: 1, ticket: null}
      // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
        console.log(self, this)
        if (res.ret === 0) {
          self.validated = true
          self.goRegister(values)
        }
      })
      // 显示验证码
      captcha.show()
    },
    goRegister (values) {
      const formData = new FormData()
      for (var key in values) {
        formData.append(key, values[key])
      }
      register(formData)
    },
    handleCheckBox () {
      this.isChecked = this.form.getFieldValue('agreement')
      console.log(this.isChecked)
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },

    validatePhone (rule, value, callback) {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (value === '' || value === undefined || value == null) {
        callback()
      } else {
        if (!reg.test(value) && value !== '') {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.toCaptcha(values)
          this.countDown()
        }
      })
    },
    countDown () {
      let secondsToGo = 5
      const modal = this.$success({
        title: '注册成功',
        content: `这个窗口将于 ${secondsToGo} s后关闭。`
      })
      const interval = setInterval(() => {
        secondsToGo -= 1
        modal.update({
          content: `这个窗口将于 ${secondsToGo} s后关闭。`
        })
      }, 1000)
      setTimeout(() => {
        clearInterval(interval)
        modal.destroy()
      }, secondsToGo * 1000)
    }
  }
}
</script>
<style>
.code {
  /* margin: 400px auto; */
  width: 114px;
  height: 40px;
  /* border: 1px solid red; */
}
</style>
