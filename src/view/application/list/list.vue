<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="审核状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">待审核</a-select-option>
                  <a-select-option value="1">审核中</a-select-option>
                  <a-select-option value="2">审核通过</a-select-option>
                  <a-select-option value="3">审核未通过</a-select-option>
                  <a-select-option value="4">全部</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <span>
              <a-button type="primary" @click="Searchlist">查询</a-button>
            </span>
          </a-row>
        </a-form>
      </div>
      <a-table :columns="columns" :dataSource="data">
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action">
          <a href="#">查看</a>
        </span>
      </a-table>
    </a-card>
  </a-spin>
</template>
<script>
const statusMap = {
  0: {
    status: 'default',
    text: '待审核'
  },
  1: {
    status: 'processing',
    text: '审核中'
  },
  2: {
    status: 'success',
    text: '审核通过'
  },
  3: {
    status: 'error',
    text: '审核未通过'
  }
};

const columns = [
  {
    title: "#",
    scopedSlots: { customRender: "serial" }
  },
  {
    title: "学号",
    dataIndex: "stu_id"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "性别",
    dataIndex: "gender",
    scopedSlots: { customRender: "gender" }
  },
  {
    title: "入学年份",
    dataIndex: "enterence_year"
  },
  {
    title: "专业",
    dataIndex: "major"
  },
  {
    title: "联系方式",
    dataIndex: "tel"
  },
  {
    title: "简介",
    dataIndex: "introduction",
    scopedSlots: { customRender: "introduction" }
  },
  {
    title: "邮箱",
    dataIndex: "email"
  },
  {
    title: "实训经历",
    dataIndex: "exps"
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" }
  }
];
const data = [
  {
    key: "1",
    stu_id: "21313131",
    name: "KooBoo",
    gender: '男',
    enterence_year: "2019",
    major: "IT",
    tel: "123456",
    introduction: "this is intro",
    email: "Kooboo@qq.com",
    exps: "this is exps",
    status:2
  },
  {
    key: "2",
    stu_id: "123123",
    name: "tencent",
    gender: '女',
    enterence_year: "2019",
    major: "IT",
    tel: "123456",
    introduction: "this is intro",
    email: "tencent@qq.com",
    exps: "this is exps",
    status:3
  }
];
export default {
  name: "ApplicationList",
  data() {
    return {
      data,
      columns,
      mdl: {},
      queryParam: {},
      loading: false
    };
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text;
    },
    statusTypeFilter(type) {
      return statusMap[type].status;
    }
  },
  methods: {
    Searchlist: function(data) {
      this.loading = true;
      setTimeout(() => {
        // this.data = data
        this.loading = false;
      }, 300);
    },
    /* computed: {
      filteredData: function() {
        var data_arry = this.data,
          sid = this.sid;
          if(!sid){
                return data_arry;
            }
            sid = sid.trim().toLowerCase();
            data_arry = data_arry.filter(function(item){
                if(item.stu_id.toLowerCase().indexOf(sid) !== -1){
                    return item;
                }
            })
            return data_arry;;
      }
    } */
  }
};
</script>
