<template>
  <a-spin :spinning="spinning">

    <a-row>
      <a-col :span="24">
        <a-form
          :form="form"
          @submit="handleSubmit">
          <a-form-item
            v-bind="formItemLayout"
            label="邮箱">
            <a-input
              size="large"
              v-decorator="[
                'email',
                {
                  rules: [{
                    type: 'email', message: '请输入正确的邮箱',
                  }, {
                    required: true, message: '请输入邮箱',
                  }]
                }
              ]"
              placeholder="请输入邮箱 该邮箱将作为您的登录账号" />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="密码">
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [{
                    required: true, message: '请输入密码',
                  }, {
                    validator: validateToNextPassword,
                  }],
                }
              ]"
              type="password"
              placeholder="请输入密码" />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="再次输入密码">
            <a-input
              v-decorator="[
                'confirm',
                {
                  rules: [{
                    required: true, message: '请再次输入密码',
                  }, {
                    validator: compareToFirstPassword,
                  }],
                }
              ]"
              placeholder="请再次输入密码"
              type="password"
              @blur="handleConfirmBlur" />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="注册类型">
            <a-select
              v-decorator="[
                'type',
                {rules: [{ required: true, message: '请选择您的类型' }]}
              ]"
              placeholder="请选择您的身份">
              <a-select-option value="enterprise">公司</a-select-option>
              <a-select-option value="tutor">导师</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label">
              公司名称&nbsp;
              <a-tooltip title="导师请输入导师姓名">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: '请输入公司名称', whitespace: true }]
                }
              ]"
              placeholder="公司名称" />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="公司地址">
            <a-input
              v-decorator="[
                'address',
                {
                  rules: [{ required: true, message: '请输入公司地址' }],
                }
              ]"
              placeholder="公司地址" />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="联系人姓名">
            <a-input
              v-decorator="[
                'contact_name',
                {
                  rules: [{ required: true, message: '请输入联系人姓名' }],
                }
              ]"
              placeholder="联系人姓名" />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="联系人电话">
            <a-input
              v-decorator="[
                'contact_tel',
                {
                  rules: [{ required: true, message: '请输入联系人电话' },{validator:validatePhone}],
                }
              ]"
              placeholder="联系人电话"
              style="width: 100%">
              <a-select
                slot="addonBefore"
                v-decorator="[
                  'prefix',
                  { initialValue: '86' }
                ]"
                style="width: 70px">
                <a-select-option value="86">+86</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="公司概述">
            <a-textarea
              rows="20"
              v-decorator="[
                'intro',
                {rules: [{ required: true, message: '请输入公司概述' }]}
              ]"
              placeholder="公司概述" />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="公司环境照片与营业执照">
            <a-upload
              v-decorator="['images', {
                rules: [{ required: true}],
              }]"
              accept=".png,.jpg,.jpeg"
              :beforeUpload="imageBeforeUpload"
              listType="picture-card"
              :fileList="imageList"
              @preview="handlePreview"
              @change="handleChange">
              <div v-if="imageList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">仅限png或jpg</div>
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel">
              <img
                alt="example"
                style="width: 100%"
                :src="previewImage" />
            </a-modal>
          </a-form-item>
          <a-form-item v-bind="tailFormItemLayout">
            <label for=""></label>

          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="实训承诺书">
            <a href="#">点击下载承诺书模板</a>
            <div class="dropbox">
              <a-upload-dragger
                v-decorator="['dragger', {
                  rules: [{ required: true}],
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                }]"
                name="files"
                :beforeUpload="fileBeforeUpload"
                accept=".zip">
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">点击选取或拖动文件到此处</p>
                <p class="ant-upload-hint">在此处上传承诺书</p>
              </a-upload-dragger>
            </div>
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
              {rules: [{ required: true, message: '请输入 the captcha you got!' }]}
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
            <a-checkbox
              @change="handleCheckBox()"
              v-decorator="['agreement', {valuePropName: 'checked'}]">
              本人保证所提交信息均为真实有效信息 并承担因提供不实信息所产生的全部责任
            </a-checkbox>
          </a-form-item>
          <a-form-item
            :wrapperCol="{ span: 24 }"
            style="text-align: center">
            <a-button
              size="large"
              class="register-button"
              type="primary"
              html-type="submit"
              :disabled="isChecked "
              :loading="registerBtn">注册</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script>
// import SIdentify from "@/views/enterprise/identify";
import { register } from '@/api/enterprise'
import md5 from 'md5'
export default {
  data () {
    return {
      spinning: false,
      values: {},
      registerBtn: false,
      validated: false,
      flag: true, // 该值变化，就会触发刷新
      code: '',
      previewVisible: false,
      previewImage: '',
      imageList: [],
      file: {},
      isChecked: true,
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 10 }
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
  //   components: {
  //     SIdentify
  //   },

  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    this.flag = !this.flag
  },
  methods: {
    toCaptcha () {
      var self = this
      var captcha = new TencentCaptcha('2085027395', res => {
        // res（未通过验证）= {ret: 1, ticket: null}
        // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
        if (res.ret === 0) {
          this.goRegister()
        }
      })
      // 显示验证码
      captcha.show()
    },
    handleCheckBox () {
      this.isChecked = this.form.getFieldValue('agreement')
    },
    imageBeforeUpload (file, fileList) {
      this.imageList.push(file)
      return false
    },
    fileBeforeUpload (file, fileList) {
      this.file = file
      return false
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码输入不一致!')
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
    handleConfirmBlur (event3) {
      const value = event3.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.imageList = fileList
    },
    handleCancel () {
      this.previewVisible = false
    },
    normFile (event1) {
      if (Array.isArray(event1)) {
        return event1
      }
      return event1 && event1.fileList
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.toCaptcha()
          this.values = values
        }
      })
    },
    goRegister () {
      var values = this.values
      var self = this
      this.spinning = true
      const formData = new FormData()
      delete values.prefix
      delete values.images
      delete values.dragger
      values.password = md5(values.password)
      for (var key in values) {
        formData.append(key, values[key])
      }
      this.imageList.forEach(file => {
        formData.append('images', file)
      })
      formData.append('qualificate_file', this.file)
      self.registerBtn = true
      register(formData)
        .then(res => {
          if (res.code === 200) {
            self.countDown()
          } else {
            this.registerFailed(res)
          }
        })
        .catch(err => {
          this.requestFailed(err)
        })
        .finally(() => {
          self.registerBtn = false
          self.spinning = false
        })
    },
    countDown () {
      var _this = this
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
        _this.$router.push({ name: 'login' })
      }, secondsToGo * 1000)
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description:
          ((err.response || {}).data || {}).message ||
          '请求出现错误，请稍后再试',
        duration: 4
      })
    },
    registerFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: (err || {}).msg || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>
<style>
#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}

/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.code {
  /* margin: 400px auto; */
  width: 114px;
  height: 40px;
  /* border: 1px solid red; */
}
</style>
