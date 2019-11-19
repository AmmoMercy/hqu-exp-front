<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col
              :md="8"
              :sm="24">
              <a-form-item label="实训项目">
                <a-select
                  @change="getApplicantions"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="internship in internshipList"
                    :value="internship._id"
                    :key="internship._id">{{ internship.topic }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item> <label>需求人数：{{ selectedInternship.need_num }}</label></a-form-item>

            </a-col>

          </a-row>
        </a-form>
      </div>
      <a-table
        :columns="columnsSelector()"
        :dataSource="applications"
        rowKey="_id">
        <span
          slot="serial"
          slot-scope="text, record, index">{{ index + 1 }}</span>
        <span
          slot="status"
          slot-scope="text">
          <a-badge
            :status="text | statusTypeFilter"
            :text="text | statusFilter" />
        </span>
        <span
          slot="action"
          slot-scope="text, record">
          <template>
            <a
              slot="action"
              @click="goToStuDetail(record.stu_id)">查看&nbsp </a>
          </template>
          <template v-if="record.apply_status===0">
            <a
              slot="action"
              @click="modifyApplication(record._id,2)">接受&nbsp</a>
            <a
              slot="action"
              @click="modifyApplication(record._id,3)">拒绝</a>
          </template>
        </span>
      </a-table>
    </a-card>
  </a-spin>
</template>
<script>
import store from '@/store'
import { getApplyList, changeApplyStatus, getInternshipList } from '@/api/enterprise'

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
      loading: false,
      internshipList: [],
      selectedInternship: {}
    }
  },
  computed: {
    getId () {
      return store.getters.expid
    }
  },

  mounted () {
    getInternshipList().then((res) => { this.internshipList = res.data })
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
    internshipFilter (id) {
      if (this.id === null) return 0
      this.internshipList.forEach(x => {
        if (x._id === id) { this.selectedInternship = x }
      })
    },
    getApplicantions (expid) {
      this.loading = true
      this.internshipFilter(expid)
      getApplyList(expid).then((res) => {
        this.applications = res.data
      }).finally(() => { this.loading = false })
    },

    modifyApplication (id, status) {
      var data = {}
      data.applyStatus = 2
      data.applyId = id
      changeApplyStatus(data).then((res) => {
        if (res.code === '200') {
          this.$notification.open({
            type: 'success',
            message: '成功',
            description: res.msg,
            style: {
              width: '600px',
              marginLeft: `${335 - 600}px`
            }
          })
          this.getApplicantions(this.selectedInternship._id)
        }
      })
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
