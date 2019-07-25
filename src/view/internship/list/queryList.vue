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
      <a-table :columns="columns" :dataSource="data">
        <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a> -->
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="qualificate_file">
          <a href="#">filestitle</a>
        </span>
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
/* import moment from 'moment'
import { getRoleList, getServiceList } from '@/api/manage' */

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
}
const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '实训题目',
    dataIndex: 'topic'
  },
  {
    title: '实训公司',
    dataIndex: 'enterprise_id'
  },
  {
    title: '实训开始日期',
    dataIndex: 'exp_begin_time',
  },
  {
    title: '实训结束日期',
    dataIndex: 'exp_end_time',
  },
  {
    title: '提交日期',
    dataIndex: 'submit_time',
  },
  {
    title: '实训描述',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' }
  },
   {
    title: '意向人数',
    dataIndex: 'need_num'
  },
  {
    title: '申请截至日期',
    dataIndex: 'apply_end_time',
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const data = [
  {
    key: '1',
    topic: 'KooBoo-exp',
    enterprise_id: 'KooBoo',
    exp_begin_time: '2019-07-02',
    exp_end_time: '2019-07-30',
    submit_time: '2019-07-02',
    description: 'this is intro',
    need_num:20,
    apply_end_time: '2019-07-02',
    status: 2
  },
  {
    key: '2',
    topic: 'tencent-exp',
    enterprise_id: 'tencent',
    exp_begin_time: '2019-07-02',
    exp_end_time: '2019-07-30',
    submit_time: '2019-07-02',
    description: 'this is intro',
    need_num:20,
    apply_end_time: '2019-07-02',
    status: 0
  }
]
export default {
  name: 'ExpTableList',
  data() {
    return {
      data,
      columns,
      mdl: {},
      queryParam: {},
      loading: false
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  methods: {
    Searchlist() {
      this.loading = true
      setTimeout(() => {
        this.data = data
        this.loading = false
      }, 300)
    }
  }
}
</script>