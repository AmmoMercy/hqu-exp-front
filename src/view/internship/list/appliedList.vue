<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
      </div>
      <a-table :columns="studentColumns" :dataSource="internships" rowKey="_id">
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">{{ text|ellipsis }}</span>
        <span slot="action" slot-scope="text,record">
          <template>
            <a slot="action" @click="goToExpDetail(record)">查看</a>
          </template>
        </span></a-table>
    </a-card>
  </a-spin>
</template>
<script>

import store from '@/store'
import { getInternships } from '@/api/student'
import { dateTransformer } from '@/utils/util'

const statusMap = {
  0: {
    status: 'default',
    text: '待审核'
  },
  1: {
    status: 'default',
    text: '学生已取消'
  },
  2: {
    status: 'processing',
    text: '已通过'
  },
  3: {
    status: 'error',
    text: '已拒绝'
  },
  4: {
    status: 'success',
    text: '学生已同意'
  },
  5: {
    status: 'error',
    text: '学生已拒绝'
  },
  6: {
    status: 'success',
    text: '正常结业'
  },
  7: {
    status: 'default',
    text: '非正常结业'
  }
}

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
    title: '实训描述',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: '申请状态',
    dataIndex: 'apply_status',
    scopedSlots: { customRender: 'status' }
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
    getInternships().then(res => {
      this.internships = res.data
      this.internships = dateTransformer(res.data)
    })
  },
  filters: {
    // 显示简介
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.slice(0, 10) + '...'
      }
      return value
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
      console.log(e)
      store.commit('SET_EXP_ID', e._id)
      _this.$router.push({ name: 'internshipdetail' })
    }
  }
}
</script>
