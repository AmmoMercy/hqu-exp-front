

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
            <p class="ant-upload-hint">请将结业作业和企业证明打包成一个zip</p>
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
    className: "user-name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "实训项目",
    className: "exp-name",
    dataIndex: "exp_name"
  }
];

const data = [
  {
    key: "1",
    name: '朱鹏屹',
    exp_name:'给你妈一拳'
  }
]

import store from "@/store";
import { completion } from "@/api/student";
// import { STable } from "@/components";
// import { getExpList } from "@/api/student";

export default {
  // components: {
  //   STable
  // },
  data() {
    return {
      file: {},
      data,
      columns,
      student: {},
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
      // loadData: parameter => {
      //   console.log("loadData.parameter", parameter);
      //   return getExpList(Object.assign(parameter, this.queryParam)).then(
      //     res => {
      //       return res.result;
      //     }
      //   );
      // }
    };
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
          formData.append("completion_file", this.file);
          completion(formData);
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
};
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
</style>
