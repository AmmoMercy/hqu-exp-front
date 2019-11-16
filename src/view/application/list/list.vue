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
                  <a-select-option value="1">审核通过</a-select-option>
                  <a-select-option value="2">审核未通过</a-select-option>
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
        <span slot="action" slot-scope="text, record">
          <template>
            <a slot="action" @click="goToStuDetail(record.stu_id)" >查看&nbsp </a>
          </template>
          <template>
            <a slot="action" @click="passApply(record._id)" >通过</a>
          </template>
        </span>
      </a-table>
    </a-card>
  </a-spin>
</template>
<script>
import store from '@/store'
import { getApplyList, changeApplyStatus } from '@/api/enterprise'

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
    dataIndex: 'stuName'
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
    title: '审核状态',
    dataIndex: 'apply_status',
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
    /* getEntApp().then((res) => {
      this.apply_id = res.data
    }) */
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
    /* handleEdit (e) {
      console.log(e)
      this.applyId = e._id
      // this.mdl = Object.assign({}, record);
      this.visible = true
    }, */
    passApply (id) {
      var data = {}
      data.applyStatus = 2
      data.applyId = id
      changeApplyStatus(data).then()
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
    },
    goToStuDetail (stuid) {
      store.commit('SET_STU_ID', stuid)
      this.$router.push({ name: 'studentdetail' })
    }
  }
}
</script>
