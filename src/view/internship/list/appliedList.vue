<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="实训题目">
                <a-input placeholder="请输入实训题目" />
              </a-form-item>
            </a-col>
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
      <a-table :columns="columnsSelector()" :dataSource="internships" rowKey="_id">
        <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a> -->
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="qualificate_file">
          <a href="#">filestitle</a>
        </span>
        <span slot="description" slot-scope="text">{{ text|ellipsis }}</span>

        <span slot="action" slot-scope="text,record">
          <template>
            <a slot="action" @click="goToExpDetail(record)">查看</a>
            <a-divider type="vertical" v-if="role!='student'" />
            <a @click="goToAppList(record)" v-if="role!='student'">查看申请</a>
            <a-divider type="vertical" v-if="role!='student'" />
            <a @click="goToStudentList(record)" v-if="role!='student'">学生管理</a>
          </template>
        </span>
      </a-table>
    </a-card>
  </a-spin>
</template>
<script>
/* import moment from 'moment'
import { getRoleList, getServiceList } from '@/api/manage' */
import store from '@/store'
import { getInternshipList } from '@/api/enterprise'
import { getInternships } from '@/api/student'
import { dateTransformer } from '@/utils/util'

/* const statusMap = {
  0: {
    status: "default",
    text: "待审核"
  },
  1: {
    status: "processing",
    text: "审核中"
  },
  2: {
    status: "success",
    text: "审核通过"
  },
  3: {
    status: "error",
    text: "审核未通过"
  }
};
const enterpriseColumns = [
  {
    title: "#",
    scopedSlots: { customRender: "serial" }
  },
  {
    title: "实训题目",
    dataIndex: "topic"
  },
  {
    title: "实训开始日期",
    dataIndex: "exp_begin_time"
  },
  {
    title: "实训结束日期",
    dataIndex: "exp_end_time"
  },
  {
    title: "提交日期",
    dataIndex: "submit_time"
  },
  {
    title: "实训描述",
    dataIndex: "description",
    scopedSlots: { customRender: "description" }
  },
  {
    title: "申请截至日期",
    dataIndex: "apply_end_time"
  },
  {
    title: "审核状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" }
  }
]; */
const studentColumns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  { title: '公司' },
  {
    title: '实训题目',
    dataIndex: 'topic'
  },
  {
    title: '实训开始日期',
    dataIndex: 'exp_begin_time'
  },
  {
    title: '实训结束日期',
    dataIndex: 'exp_end_time'
  },
  {
    title: '提交日期',
    dataIndex: 'submit_time'
  },
  {
    title: '实训描述',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: '申请截至日期',
    dataIndex: 'apply_end_time'
  },

  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'ExpTableList',
  data () {
    return {
      // enterpriseColumns,
      studentColumns,
      mdl: {},
      queryParam: {},
      loading: false,
      internships: [],
      role: ''
    }
  },
  mounted () {
    this.role = store.getters.role
    if (this.role === 'enterprise') {
      getInternshipList().then(res => {
        this.internships = dateTransformer(res.data)
      })
    } else if (this.role === 'student') {
      getInternships().then(res => {
        this.internships = res.data
        this.internships = dateTransformer(res.data)
      })
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 4) {
        return value.slice(0, 4) + '...'
      }
      return value
    }
  },
  methods: {
    goToExpDetail (e) {
      const _this = this
      console.log(e)
      store.commit('SET_EXP_ID', e._id)
      _this.$router.push({ name: 'internshipdetail' })
    },
    /* goToAppList(e) {
      const _this = this;
      console.log(e);
      store.commit("SET_EXP_ID", e._id);
      _this.$router.push({ name: "applicatinlist" });
    },
    goToStudentList(e) {
      const _this = this;
      console.log(e);
      store.commit("SET_EXP_ID", e._id);
      _this.$router.push({ name: "studentmanage" });
    }, */
    columnsSelector () {
      this.role = store.getters.role
      if (this.role === 'enterprise') {
        return this.enterpriseColumns
      } else if (this.role === 'student') {
        return this.studentColumns
      } else {
        return this.adminColums
      }
    },
    Searchlist () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 300)
    }
  }
}
</script>
