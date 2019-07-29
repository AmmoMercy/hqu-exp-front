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
      <a-table :columns="columnsSelector()" :dataSource="applications" rowKey="_id">
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="introduction" slot-scope="text">
          {{ text|ellipsis }}
        </span>
        <span slot="exps" slot-scope="text">
          {{ text|ellipsis }}
        </span>
        <span slot="action">
          <template>
            <a slot="action" @click="goToExpDetail(record)" >查看</a>
          </template>
        </span>
      </a-table>
    </a-card>
  </a-spin>
</template>
<script>
import store from '@/store'
import { getApplyList, getExpInfo, getEntApp } from '@/api/enterprise'
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
    title: '学号',
    dataIndex: 'stu_id'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    scopedSlots: { customRender: 'gender' }
  },
  {
    title: '入学年份',
    dataIndex: 'enterence_year'
  },
  {
    title: '专业',
    dataIndex: 'major'
  },
  {
    title: '联系方式',
    dataIndex: 'tel'
  },
  {
    title: '简介',
    dataIndex: 'introduction',
    scopedSlots: { customRender: 'introduction' }
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '实训经历',
    dataIndex: 'exps'
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
export default {
  name: 'Applicationlist',
  data () {
    return {
      applyId: '',
      intershipId: store.getters.expid,
      columns,
      mdl: {},
      queryParam: {},
      applications: [],
      role: '',
      loading: false
    }
  },
  computed: {
    getId () {
      return store.getters.expid
    }
  },
  watch: {
    getId (val, oldVal) {
      this.intershipId = val
      getApplyList(this.intershipId).then((res) => {
        this.applications = res.data
      })
    }
  },
  mounted () {
    getApplyList(this.intershipId).then((res) => {
      this.applications = res.data
    })
    getEntApp().then((res) => {
      this.apply_id = res.data
    })
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 4) {
        return value.slice(0, 4) + '...'
      }
      return value
    }
  },
  methods: {
    handleEdit (e) {
      console.log(e)
      this.applyId = e._id
      // this.mdl = Object.assign({}, record);
      this.visible = true
    },
    columnsSelector () {
      this.role = store.getters.role
      if (this.role === 'enterprise') {
        return this.columns
      } else if (this.role === 'student') {
        return this.studentColumns
      } else { return this.adminColums }
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
