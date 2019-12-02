<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
      </div>
      <a-table :columns="columns" :dataSource="enterprises" rowKey="_id">
        <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a> -->
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="qualificate_file">
          <a href="#">下载</a>
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>

            <a @click="goToEnterprise(record)" >查看</a>

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
import { getEnt } from '@/api/admin'
// import { getInternshipList } from '@/api/enterprise'
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
    text: '审核不通过'
  }
}
const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '企业名称',
    dataIndex: 'name'
  },
  {
    title: '地址',
    dataIndex: 'address'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '联系人姓名',
    dataIndex: 'contactName'
  },
  {
    title: '联系人电话',
    dataIndex: 'contactTel'
  },
  {
    title: '资质文件',
    dataIndex: 'qualificate_file',
    scopedSlots: { customRender: 'qualificate_file' }
  },
  {
    title: '简介',
    dataIndex: 'intro',
    scopedSlots: { customRender: 'intro' }
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    filters: [
      { text: '未审核',
        value: '0' },
      { text: '通过',
        value: '1' },
      { text: '未通过',
        value: '2' }
    ],
    onFilter: (value, record) => record.status.toString().indexOf(value) === 0,
    scopedSlots: { customRender: 'status' }

  },
  {
    title: '注册时间',
    dataIndex: 'register_time'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'EnterpriseList',
  data () {
    return {
      columns,
      mdl: {},
      queryParam: {},
      enterprises: [],
      role: '',
      loading: false
    }
  },
  mounted () {
    getEnt().then((res) => {
      this.enterprises = res.data
    })
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  methods: {
    goToEnterprise (r) {
      const _this = this
      store.commit('SET_ENT_ID', r.enterpriseId)
      _this.$router.push({ name: 'enterprise' })
    }

  }
}
</script>
