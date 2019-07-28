<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="姓名">
                <a-input v-model="search" placeholder="请输入姓名" />
              </a-form-item>
            </a-col>
            <span>
              <a-button type="primary" @click="Searchlist">查询</a-button>
            </span>
          </a-row>
        </a-form>
      </div>
      <a-table :columns="columnsSelector()" :dataSource="managestu" rowKey="_id">
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="introduction" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="exps" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="works">
          <a href="#">filestitle</a>
        </span>
        <span slot="action">
          <template>
          <a>查看</a>
          <a-divider type="vertical" />
          <a>评分</a>
          </template>
        </span>
      </a-table>
    </a-card>
  </a-spin>
</template>
<script>
import store from '@/store'
import { getInternshipList } from '@/api/enterprise'
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
    dataIndex: "exps",
    scopedSlots: { customRender: "exps" }
  },
  {
    title: "实训成绩",
    dataIndex: "grade"
  },
  {
    title: "作品",
    dataIndex: "works",
    scopedSlots: { customRender: "works" }
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  name: "StudentList",
  data() {
    return {
      columns,
      mdl: {},
      queryParam: {},
      loading: false,
      managestu: [],
      role: '',
      search: ""
    };
  },
  mounted () {
    getInternshipList().then((res) => {
      this.managestu = res.data
    })
  },
  methods: {
    columnsSelector () {
    this.role = store.getters.role
    if (this.role === 'enterprise') {
      return this.columns
    } else if (this.role === 'student') {
      return this.studentColumns
    } else { return this.adminColums }
  },
    Searchlist: function(data) {
      this.loading = true;
      setTimeout(() => {
        this.data = data;
        this.loading = false;
      }, 300);
      for (var i = 0; i < this.data; i++) {
        if (this.data[i].stu_id.search(this.searchVal) != -1) {
          searchData.push(this.data[i]);
        }
      }
      return searchData;
    }
  }
};
</script>
