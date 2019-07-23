

<template>
  <div>
    <a-row style="margin-top: 50px">
      <a-col :span="18" :offset="3">
        <s-table 
        :columns="columns" 
        :data="loadData"
        >
          <template slot="name" slot-scope="text">
            <a href="javascript:;">{{text}}</a>
          </template>
        </s-table>
      </a-col>
      <a-col :span="18" :offset="3">
        <a-upload-dragger
          name="file"
          :multiple="true"
          accept="application/zip"
          action="/api/student/completion/work"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">点击或拖动上传文件</p>
          <p class="ant-upload-hint">支持zip上传，严禁上传其他文件</p>
        </a-upload-dragger>
      </a-col>
    </a-row>
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
    title: "实训项目",
    className: "exp-name",
    dataIndex: "exp_name"
  }
];

// const data = [
//   {
//     key: "1",
//     name: '',
//     exp_name:''
//   }
// ]

import store from '@/store'
import {completion} from '@/api/student'
import {STable} from '@/components'
import { getExpList } from '@/api/student'

export default {
  components:{
    STable
  },
  data () {
    return {
      columns,
      student:{},
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getExpList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
            }
      )}
    }
  },



  
  methods: {
    handleChange (info) {
      const status = info.file.status
      if (status !== "uploading") {   
      const completionParams =['info.file','info.fileList']
      console.log(completionParams)
      .then((res) => {
        if (res.code ===200 && status === "done") 
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      })
      .catch((err) => {
        if (res.code === 100 || status === "error") 
        this.$message.error(`${info.file.name} file upload failed.`)
      })
      console.log("Received file")
    }       
  }
}
}
</script>
<style>

th.exp-name{
  text-align: center !important;
}
td.user-name{
  background: white
}
td.exp-name {
  text-align: center !important;
  background: white
}
</style>
