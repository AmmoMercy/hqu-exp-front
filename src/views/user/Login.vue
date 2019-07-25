<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="student" tab="学生登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入学号"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: validateEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码: admin or ant.design"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="admin" tab="管理员登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入学号"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: validateEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码: admin or ant.design"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="enterprise" tab="公司登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入学号"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: validateEmail ,message:'请输入正确的邮箱'}], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码: admin or ant.design"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
      <a-form-item v-if="customActiveKey=='enterprise'">
        <router-link

          :to="{ name: 'register' }"
          class="forge-password"
          style="float: right;"
        >企业注册</router-link>
      </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
export default {
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      customActiveKey: 'student',
      // login type: student, admin,  enterprise
      loginType: 'student',
      form: this.$form.createForm(this),
      values: {},
      state: {
        time: 60,
        loginBtn: false,
        // login type: 1 student, 2 admin, 3 enterprise
        loginType: 'student'
      }
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    validateEmail (rule, value, callback) {
      // if you want to return true just callback with no param, else with a string
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        console.log(value)
        callback()
      } else {
        callback(new Error('请输入正确的邮箱'))
      }
    },
    handleTabClick (key) {
      this.customActiveKey = key
      this.state.loginType = this.customActiveKey
      // this.form.resetFields()
    },
    toCaptcha () {
      var self = this
      var captcha = new TencentCaptcha('2085027395', (res) => {
        // res（未通过验证）= {ret: 1, ticket: null}
        // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
        if (res.ret === 0) {
          self.goLogin()
        }
      })
      // 显示验证码
      captcha.show()
    },
    handleSubmit (e) {
      e.preventDefault()

      const validateFieldsKey = ['email', 'password']
      this.form.validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          this.toCaptcha()
          this.values = values
        } else {
          setTimeout(() => {
            this.state.loginBtn = false
          }, 600)
        }
      })
    },
    goLogin () {
      const {
        state,
        Login,
        values
      } = this
      state.loginBtn = true
      const loginParams = { ...values }
      loginParams.password = md5(values.password)
      loginParams.loginType = state.loginType
      Login(loginParams)
        .then((res) => this.loginSuccess(res))
        .catch(err => this.requestFailed(err))
        .finally(() => {
          state.loginBtn = false
        })
    },
    handleValidate () {
      console.log('true')
    },

    loginSuccess (res) {
      console.log(res)
      this.$router.push({ name: 'internship' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
