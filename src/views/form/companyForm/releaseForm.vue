<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="实训课题"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
          name="name"
          placeholder="给目标起个名字"
        />
      </a-form-item>
      <a-form-item
        label="实训起止日期"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-range-picker
          name="buildTime"
          style="width: 100%"
          v-decorator="[
            'buildTime',
            {rules: [{ required: true, message: '请选择起止日期' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="实训内容"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-textarea
          rows="4"
          placeholder="请输入本实训的主要工作内容，例如：年级要求，工作要求等"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '必须输入本实训的主要工作内容' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="目标人数"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input-number
          :min="0"
          :max="100"
          name="peopleNum"
          v-decorator="[
            'peopleNum',
            {rules: [{ required: true, message: '必须填写目标人数' }]}
          ]"
        />
        <span>  人</span>
      </a-form-item>

      <a-form-item
        label="报名截止日期"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-DatePicker
          name="stopTime"
          style="width: 100%"
          v-decorator="[
            'stopTime',
            {rules: [{ required: true, message: '必须填写报名截止日期' }]}
          ]"
        />
      </a-form-item>

      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  name: 'BaseForm',
  data () {
    return {
      description: '编辑并发布实训信息，让更多学生加入你的团队',
      value: 1,
      // 这个值没搞明白！！！↑
      // form
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>
