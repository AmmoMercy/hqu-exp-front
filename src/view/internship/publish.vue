<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="Topic">
        <a-input
          v-decorator="[
            'topic',
            {
              rules: [{ required: true, message: 'Please input your topic!' }],
            }
          ]"
          placeholder="Topic"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="BeginTime">
        <a-date-picker
          v-decorator="['date-time-picker', config]"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="EndTime">
        <a-date-picker v-decorator="['EndTime', config]" show-time format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="description">
        <a-textarea
          rows="20"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入目标描述' }]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="NeedNum">
        <a-input-number
          v-decorator="['need-num', { initialValue: 20,rules:[{required:true}] }]"
          :min="1"
          :max="100"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="RequestEndTime">
        <a-date-picker
          v-decorator="['RequestEndTime',config]"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button type="primary" html-type="submit" @click="countDown">Publish</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
export default {
  data () {
    return {
      config: {
        rules: [
          { type: 'object', required: true, message: 'Please select time!' }
        ]
      },
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
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
            offset: 0
          }
        }
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      // const values = {
      //   ...fieldsValue,
      //   'date-time-picker': fieldsValue['date-time-picker'].format(
      //     'YYYY-MM-DD HH:mm:ss'
      //   )
      // }
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          return
        }
        console.log('Received values of form: ', values)
      })
    },
    countDown() {
      let secondsToGo = 5;
      const modal = this.$success({
        title: '发布成功',
        content: `这个窗口将于 ${secondsToGo} s后关闭。`,
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `这个窗口将于 ${secondsToGo} s后关闭。`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval)
        modal.destroy()
      }, secondsToGo * 1000);
    }
  }
}
</script>
