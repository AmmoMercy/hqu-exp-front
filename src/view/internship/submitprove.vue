

<template>
  <div>
    <a-row style="margin-top: 50px">
      <a-col :span="18" :offset="3">
        <a-table :columns="columns" :dataSource="data" >
          <template slot="name" slot-scope="text">
            <a href="javascript:;">{{text}}</a>
          </template>
        </a-table>
      </a-col>
    </a-row>
     <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="">
        <div class="dropbox">
          <a-upload-dragger
            v-decorator="['dragger', {
              rules: [{ required: true}],
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            }]"
            name="files"
            :beforeUpload="fileBeforeUpload"
            accept=".zip"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">点击选取或拖动文件到此处</p>
            <p class="ant-upload-hint">请将所有学生的成绩和证明打包成一个zip</p>
          </a-upload-dragger>
        </div>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button size="large" class="register-button" type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>  
  </div>
</template>


<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    className:"user-name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "成绩",
    className: "exp-mark",
    dataIndex: "exp_mark"
  }
];

const data = [
  {
    key: "1",
    name: '朱鹏屹',
    exp_mark: '60'
  },
  {
    key: "2",
    name: '裴瑞杰',
    exp_mark: '60'
  },
   {
    key: "3",
    name: '李传健',
    exp_mark: '60'
  },
   {
    key: "4",
    name: '高正凯',
    exp_mark: '60'
  },
]

import { submitprove } from "@/api/enterprise";
export default {
  data () {
    return {
      data,
      columns,
      file: {},
      formItemLayout: {
        
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18, offset:3}
        }
      },
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    fileBeforeUpload(file, fileList) {
      this.file = file;
      return false;
    },
    normFile(event1) {
      console.log("Upload event:", event1);
      if (Array.isArray(event1)) {
        return event1;
      }
      return event1 && event1.fileList;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.countDown()
          const formData = new FormData();
          delete values.dragger;
          for (var key in values) {
            formData.append(key, values[key]);
          }
          formData.append("certificate_file", this.file);
          submitprove(formData);
        }
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
  }
}
</script>
<style>

th.exp-mark{
  text-align: center !important;
}
td.user-name{
  background: white
}
td.exp-mark {
  text-align: center !important;
  background: white
}
</style>
