<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
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
          placeholder="请输入和上次相同的密码"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="type">
        <a-select
          v-decorator="[
            'type',
            {rules: [{ required: true, message: 'Please select your type!' }]}
          ]"
          placeholder="请选择导师制还是公司制"
        >
          <a-select-option value="enterprise">公司</a-select-option>
          <a-select-option value="tutor">导师</a-select-option>
        </a-select>
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
          placeholder="nickname"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Address">
        <a-input
          v-decorator="[
            'address',
            {
              rules: [{ required: true, message: 'Please input your address !' }],
            }
          ]"
          placeholder="Address"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Contact Name">
        <a-input
          v-decorator="[
            'contact-name',
            {
              rules: [{ required: true, message: 'Please input your name !' }],
            }
          ]"
          placeholder="Contact Name"
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
      <a-form-item v-bind="formItemLayout" label="introduce">
        <a-textarea
          rows="20"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入目标描述' }]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="images">
        <a-upload
          v-decorator="['images', {
            rules: [{ required: true}],
          }]"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          :fileList="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 3">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="资质文件">
        <div class="dropbox">
          <a-upload-dragger
            v-decorator="['dragger', {
              rules: [{ required: true}],
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            }]"
            name="files"
            action="/upload.do"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">Support for a single or bulk upload.</p>
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
        <a-checkbox v-decorator="['agreement', {valuePropName: 'checked'}]">
          I have read the
          <a href>agreement</a>
        </a-checkbox>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button type="primary" html-type="submit">Register</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
// import SIdentify from "@/views/enterprise/identify";
export default {
  data () {
    return {
      flag: true, // 该值变化，就会触发刷新
      code: '',
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ],
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
        if (!reg.test(value) && value != '') {
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
      this.fileList = fileList
    },
    handleCancel () {
      this.previewVisible = false
    },
    normFile (event1) {
      console.log('Upload event:', event1)
      if (Array.isArray(event1)) {
        return event1
      }
      return event1 && event1.fileList
    },
    handleSubmit (event2) {
      event2.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.countDown()
          console.log('Received values of form: ', values)
        }
      })
    },
    // refreshCode() {
    //   this.flag = !this.flag;
    // },
    // getMakedCode(code) {
    //   this.code = code;
    //   console.log("getMakedCode:", this.code);
    // }
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
