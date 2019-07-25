<template>
<a-card :bordered="false">
  <a-form
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item
      v-bind="formItemLayout"
      label="原密码"
    >
      <a-input
        v-decorator="[
          'old_password',
          {
            rules: [{
              required: true, message: 'Please input your old password!',
            }]
            
          }
        ]"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="新密码"
    >
      <a-input
        v-decorator="[
          'new_password',
          {
            rules: [{
              required: true, message: 'Please input your new password!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="确定新密码"
    >
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
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <a-button size="large" class="register-button" type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</a-card>
    
</template>

<script>


export default {
  data () {
    return {
      form: this.$form.createForm(this),
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  methods: {
    handleConfirmBlur  (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('new_password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleSubmit (e) {
      e.preventDefault()
     const {
        form: { validateFields },
        
      } = this
      const validateFieldsKey=['old_password','new_password','confirm',]
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const publishParams = { ...values }
          console.log(publishParams)
          publish(publishParams)
          .then((res) =>{ 
          if (res.code === 200) 
          this.countDown();
          })
        }
        console.log("Received values of form: ", values);
      });
    },
    countDown () {
      let secondsToGo = 5
      const modal = this.$success({
        title: '提交成功',
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
  },
};
</script>