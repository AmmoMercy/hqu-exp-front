<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">

      </div>
      <a-table
        :columns="columnsSelector()"
        :dataSource="internships"
        rowKey="expId">
        <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a> -->
        <span
          slot="serial"
          slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="apply_end_time" slot-scope="text">{{ text|dateFilter }}</span>
        <span
          slot="exp_begin_time"
          slot-scope="text">{{ text|dateFilter }}</span>
        <span
          slot="exp_end_time"
          slot-scope="text">{{ text|dateFilter }}</span>
        <span
          slot="status"
          slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>

        <span
          slot="action"
          slot-scope="text,record">
          <template>
            <a
              slot="action"
              @click="goToExpDetail(record)">查看</a>
            <a-divider
              type="vertical"
              v-if="role!='student'" />
            <a
              @click="goToAppList(record)"
              v-if="role!='student'">查看申请</a>
            <a-divider
              type="vertical"
              v-if="role!='student'" />
            <a
              @click="goToStudentList(record)"
              v-if="role!='student'">学生管理</a>
          </template>
        </span>
      </a-table>
    </a-card>
  </a-spin>
</template>
<script>

import store from '@/store'
import { getInternshipList } from '@/api/enterprise'
import { AdminGetExpList } from '@/api/admin'
import { getInternships } from '@/api/student'

const statusMap = {
  0: {
    status: 'default',
    text: '待审核'
  },
  1: {
    status: 'success',
    text: '审核通过'
  },
  2: {
    status: 'error',
    text: '审核未通过'
  }

}
const enterpriseColumns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '实训题目',
    dataIndex: 'topic'
  },
  {
    title: '实训开始日期',
    dataIndex: 'exp_begin_time',
    scopedSlots: { customRender: 'exp_begin_time' }
  },
  {
    title: '实训结束日期',
    dataIndex: 'exp_end_time',
    scopedSlots: { customRender: 'exp_end_time' }
  },
  {
    title: '提交日期',
    dataIndex: 'submit_time',
    scopedSlots: { customRender: 'submit_time' }
  },

  {
    title: '审核状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    filters: [
      { text: '未审核',
        value: '0' },
      { text: '通过',
        value: '1' },
      { text: '未通过',
        value: '2' }
    ],
    onFilter: (value, record) => record.status.toString().indexOf(value) === 0

  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
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
    title: '意向人数',
    dataIndex: 'need_num'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const adminColums = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  { title: '公司/导师',
    dataIndex: 'enterprise' },
  {
    title: '实训题目',
    dataIndex: 'topic'
  },
  {
    title: '实训开始日期',
    dataIndex: 'exp_begin_time',
    scopedSlots: { customRender: 'exp_begin_time' }
  },
  {
    title: '实训结束日期',
    dataIndex: 'exp_end_time',
    scopedSlots: { customRender: 'exp_end_time' }
  },
  {
    title: '提交日期',
    dataIndex: 'submit_time'
  },

  {
    title: '审核状态',
    dataIndex: 'status',
    filters: [
      { text: '未审核',
        value: '0' },
      { text: '审核通过',
        value: '1' },
      { text: '审核不通过',
        value: '2' }
    ],
    onFilter: (value, record) => record.status.toString().indexOf(value) === 0,
    scopedSlots: { customRender: 'status' }

  },
  {
    title: '意向人数',
    dataIndex: 'need_num'
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
      enterpriseColumns,
      studentColumns,
      mdl: {},
      queryParam: {},
      loading: false,
      internships: [],
      role: '',
      adminColums
    }
  },
  mounted () {
    this.role = store.getters.role
    if (this.role === 'enterprise') {
      getInternshipList().then(res => {
        this.internships = res.data
      })
    } else if (this.role === 'student') {
      getInternships().then(res => {
        this.internships = res.data
        this.internships = res.data
      })
    } else if (this.role === 'admin') {
      AdminGetExpList().then(res => {
        this.internships = res.data
        this.internships = res.data
      })
    }
  },
  filters: {
    dateFilter (date) {
      return date.slice(0, 10)
    },
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  methods: {
    goToExpDetail (e) {
      const _this = this

      store.commit('SET_EXP_ID', e.expId)
      store.commit('SET_ENT_ID', e.enterprise_id)
      _this.$router.push({ name: 'internshipdetail' })
    },
    goToAppList (e) {
      const _this = this
      store.commit('SET_EXP_ID', e.expId)
      _this.$router.push({ name: 'applicatinlist' })
    },
    goToStudentList (e) {
      const _this = this
      store.commit('SET_EXP_ID', e.expId)
      _this.$router.push({ name: 'studentmanage' })
    },
    columnsSelector () {
      this.role = store.getters.role
      if (this.role === 'enterprise') {
        return this.enterpriseColumns
      } else if (this.role === 'student') {
        return this.studentColumns
      } else {
        return this.adminColums
      }
    }
  }
}
</script>
