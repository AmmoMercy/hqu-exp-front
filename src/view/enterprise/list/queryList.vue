<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="企业名称">
                <a-input v-model="queryParam.enterprisename" placeholder="请输入企业名称" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="审核状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">待审核</a-select-option>
                  <a-select-option value="1">审核中</a-select-option>
                  <a-select-option value="2">审核通过</a-select-option>
                  <a-select-option value="3">审核未通过</a-select-option>
                  <a-select-option value="4">全部</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col>
              <span>
                <a-button type="primary" @click="Searchlist">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
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
    dataIndex: 'contact_name'
  },
  {
    title: '联系人电话',
    dataIndex: 'contact_tel'
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
      store.commit('SET_ENT_ID', r._id)
      _this.$router.push({ name: 'enterprise' })
    },

    Searchlist () {
      this.loading = true
      setTimeout(() => {
        this.data = data
        this.loading = false
      }, 300)
    }
  }
}
</script>
