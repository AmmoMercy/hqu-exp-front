<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="实训题目">
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
      <a-form-item v-bind="formItemLayout" label="开始时间">
        <a-date-picker
          :disabledDate="disabledStartDate"
          v-model="beginDate"
          v-decorator="['exp_begin_time', config]"
          format="YYYY-MM-DD"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="结束时间">
        <a-date-picker
          :disabledDate="disabledEndDate"
          v-model="endDate"
          v-decorator="['exp_end_time', config]"
          format="YYYY-MM-DD " />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="项目简介">
        <a-textarea
          rows="20"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入目标描述' }]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="需求人数">
        <a-input-number
          v-decorator="['need_num', { initialValue: 20,rules:[{required:true}] }]"
          :min="1"
          :max="100"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="申请截至时间">
        <a-date-picker
          :disabledDate="disableBeforeToday"
          v-decorator="['apply_end_time',config]"
          show-time
          format="YYYY-MM-DD HH:mm:ss"

        />
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button
          type="primary"
          html-type="submit"
        >Publish</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
import { publish } from '@/api/enterprise'
import moment from 'moment'
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      config: {
        rules: [
          { type: 'object', required: true, message: '请选择日期' }
        ]
      },
      beginDate: null,
      endDate: null,
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
  methods: {
    moment,
    disableBeforeToday (current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day')
    },
    disabledStartDate (beginDate) {
      const endDate = this.endDate
      if (!beginDate || !endDate) {
        return beginDate < moment().endOf('day')
      }
      return beginDate.valueOf() > endDate.valueOf() || beginDate < moment().endOf('day')
    },
    disabledEndDate (endDate) {
      const beginDate = this.beginDate
      if (!endDate || !beginDate) {
        return endDate < moment().endOf('day')
      }
      return beginDate.valueOf() >= endDate.valueOf() || endDate < moment().endOf('day')
    },

    countDown () {
      let secondsToGo = 5
      const modal = this.$success({
        title: '发布成功',
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
        this.$router.push({ name: 'list' })
      }, secondsToGo * 1000)
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields }
      } = this
      const validateFieldsKey = ['topic', 'exp_begin_time', 'exp_end_time', 'description', 'need_num', 'apply_end_time']
      // const values = {
      //   ...fieldsValue,
      //   'date-time-picker': fieldsValue['date-time-picker'].format(
      //     'YYYY-MM-DD HH:mm:ss'
      //   )
      // }
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const publishParams = { ...values }
          publishParams.exp_begin_time = Date.parse(publishParams.exp_begin_time)
          publishParams.exp_end_time = Date.parse(publishParams.exp_end_time)
          publishParams.apply_end_time = Date.parse(publishParams.apply_end_time)
          console.log(publishParams)
          publish(publishParams)
            .then((res) => {
              console.log(res)
              if (res.code === '200') { this.countDown() }
            })
        }
        console.log('Received values of form: ', values)
      })
    }

  }
}
</script>
