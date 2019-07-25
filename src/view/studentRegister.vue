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
      <a-form-item v-bind="formItemLayout" label="Password">
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
      <a-form-item v-bind="formItemLayout" label="Confirm Password">
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
      <a-form-item v-bind="formItemLayout" label="StudentNumber">
        <a-input
          v-decorator="[
          'student-number',
          {
            rules: [{  required: true, message: 'Please input your StudentNumber !' }],
          }
        ]"
          placeholder="StudentNumber"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          Nickname&nbsp;
          <a-tooltip title="What do you want others to call you?">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
          'nickname',
          {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
          }
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Gender">
        <a-select
          v-decorator="[
          'gender',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
          placeholder="请选择你的性别"
        >
          <a-select-option value="male">男</a-select-option>
          <a-select-option value="female">女</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="EnterYear">
        <a-input
          v-decorator="[
          'enter-year',
          {
            rules: [{  required: true, message: 'Please input your EnterYear !' }],
          }
        ]"
          placeholder="请输入入学年份"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Major">
        <a-input
          v-decorator="[
          'major',
          {
            rules: [{  required: true, message: 'Please input your Major !' }],
          }
        ]"
          placeholder="请输入你的专业"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Phone Number">
        <a-input
          v-decorator="[
          'contact-tel',
          {
            rules: [{ required: true, message: 'Please input your phone number!' },{validator:validatePhone}],
          }
        ]"
          placeholder="Phone Number"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="[
            'prefix',
            { initialValue: '86' }
          ]"
            style="width: 70px"
          >
            <a-select-option value="86">+86</a-select-option>
            <a-select-option value="87">+87</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <!-- <a-form-item
      v-bind="formItemLayout"
      label="Captcha"
      extra="We must make sure that your are a human."
    >
      <a-row :gutter="8">
        <a-col :span="12">
          <a-input
            v-decorator="[
              'captcha',
              {rules: [{ required: true, message: 'Please input the captcha you got!' }]}
            ]"
          />
        </a-col>
        <a-col :span="12">
          <div class="code" @click="refreshCode">
              <s-identify :fresh="flag" @makedCode="getMakedCode"></s-identify>
            </div>
        </a-col>
      </a-row>
      </a-form-item>-->
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox @change="handleCheckBox()" v-decorator="['agreement', {valuePropName: 'checked'}]">
            本人保证所提交信息均为真实有效信息 并承担因提供不实信息所产生的全部责任
          </a-checkbox>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button
            size="large"
            type="default"
            v-if="!validated"
            @click="toCaptcha"
          >点击获取验证码</a-button>
          <a-button size="large" class="register-button" type="primary" html-type="submit" :disabled="isChecked || !validated">注册</a-button>
        </a-form-item>
    </a-form>
    </a-col>
  </a-row>
</template>

<script>
// import SIdentify from '@/views/enterprise/identify'
import { register } from '@/api/student'
export default {
  data() {
    return {
      flag: true, //该值变化，就会触发刷新
      code: "",
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
    };
  },
  components: {
    SIdentify
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.flag = !this.flag;
  },
  methods: {
    toCaptcha () {
      var self = this
      var captcha = new TencentCaptcha('2085027395', (res) => {
      // res（未通过验证）= {ret: 1, ticket: null}
      // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
        console.log(self, this)
        if (res.ret === 0) {
          self.validated = true
        }
      })
      // 显示验证码
      captcha.show()
    },
    handleCheckBox () {
      this.isChecked = this.form.getFieldValue('agreement')
      console.log(this.isChecked)
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    //     refreshCode() {
    //       this.flag = !this.flag;
    //     },
    //     getMakedCode(code){
    //       this.code = code
    //       console.log("getMakedCode:",this.code);
    //     }
    validatePhone(rule, value, callback) {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error("请输入正确的电话号码"));
        } else {
          callback();
        }
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.countDown();
          const formData = new FormData()
          for (var key in values) {
            formData.append(key, values[key])
          }
          register(formData)
        }
      });
    },
    countDown() {
      let secondsToGo = 5;
      const modal = this.$success({
        title: "注册成功",
        content: `这个窗口将于 ${secondsToGo} s后关闭。`
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `这个窗口将于 ${secondsToGo} s后关闭。`
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
      }, secondsToGo * 1000);
    }
  }
};
</script>
<style>
.code {
  /* margin: 400px auto; */
  width: 114px;
  height: 40px;
  /* border: 1px solid red; */
}
</style>
