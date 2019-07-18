

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
      <a-col :span="18" :offset="3">
        <a-upload-dragger
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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

const data = [
  {
    key: "1",
    name: '朱鹏屹',
    exp_name: '亚尔迪百万富翁之旅'
  }
]

export default {
  data () {
    return {
      data,
      columns
    }
  },
  methods: {
    handleChange (info) {
      const status = info.file.status
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`)
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
