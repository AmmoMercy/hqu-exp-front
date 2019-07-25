<template>
  <div>
    <a-row style="margin-top: 50px">
      <a-col :span="18" :offset="3">
        <a-table :columns="columns" :dataSource="data" :pagination="false">
          <template slot="name" slot-scope="text">
            <a href="javascript:;">{{ text }}</a>
          </template>
        </a-table>
        <div>
        </div>
        <br />
        <br />
        <br />
      </a-col>
    </a-row>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label>
        <div class="dropbox">
          <a-upload-dragger
            v-decorator="['dragger', {
              rules: [{ required: true}],
              valuePropName: 'fileList1',
              getValueFromEvent: normFile,
            }]"
            name="files"
            :beforeUpload="fileBeforeUpload1"
            accept=".zip"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">点击选取或拖动文件到此处</p>
            <p class="ant-upload-hint">请将结业作业打包成一个zip</p>
          </a-upload-dragger>
        </div>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label>
        <div class="dropbox">
          <a-upload-dragger
            v-decorator="['dragger', {
              rules: [{ required: true}],
              valuePropName: 'fileList2',
              getValueFromEvent: normFile,
            }]"
            name="files"
            :beforeUpload="fileBeforeUpload2"
            accept=".docx"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">点击选取或拖动文件到此处</p>
            <p class="ant-upload-hint">请将结业作业打包成一个word</p>
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
// const data = [
//   {
//     key: "1",
//     name: "朱鹏屹",
//     topic: "给你妈一拳"
//   }
// ];

import store from '@/store'
import { getExpList, completion, perception } from '@/api/student'
// import { STable } from "@/components";

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    className: 'user-name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '实训项目',
    className: 'exp-name',
    dataIndex: 'topic'
  }
]

export default {
  // components: {
  //   STable
  // },
  data () {
    return {
      file: {},
      columns,
      // exp:{},
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18, offset: 3 }
        }
      }
      // loadData: parameter => {
      //   console.log("loadData.parameter", parameter);
      //   return getExpList(Object.assign(parameter, this.queryParam)).then(
      //     res => {
      //       return res.result;
      //     }
      //   );
      // }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    getExpList(exp).then(
      (response) => {
        if (response.code === 200) { this.exp = response.data }
      }
    )
  },
  methods: {
    fileBeforeUpload1 (file, fileList1) {
      this.file = file
      return false
    },
    fileBeforeUpload2 (file, fileList2) {
      this.file = file
      return false
    },
    normFile (event1) {
      console.log('Upload event:', event1)
      if (Array.isArray(event1)) {
        return event1
      }
      return event1 && event1.fileList
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.countDown()
          const formData1 = new FormData()
          delete values.dragger
          for (var key in values) {
            formData1.append(key, values[key])
          }
          formData1.append('completion_file', this.file)
          completion(formData1)
          const formData2 = new FormData()
          delete values.dragger
          for (var key in values) {
            formData2.append(key, values[key])
          }
          formData2.append('perception_file', this.file)
          perception(formData2)
        }
      })
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
th.exp-name {
  text-align: center !important;
}
td.user-name {
  background: white;
}
td.exp-name {
  text-align: center !important;
  background: white;
}

table.gridtable {
  text-align: center;
  width: 100%;
  text-align: center;
  font-family: verdana, arial, sans-serif;
  font-size: 14px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
}
table.gridtable th {
  border-width: 1px;
  padding: 15px 20px 15px 20px;
  border-style: solid;
  border-color: black;
  background-color: #87CEFA;
  filter: alpha(opacity=50);
}
table.gridtable td {
  border-width: 1px;
  padding: 15px 20px 15px 20px;
  border-style: solid;
  border-color: black;
  background-color: #ffffff;
}
</style>
