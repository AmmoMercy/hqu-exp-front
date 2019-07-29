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
          {{ text|ellipsis }}
        </span>
        <span slot="exps" slot-scope="text">
          {{ text|ellipsis }}
        </span>
        <span slot="works">
          <a href="#">filestitle</a>
        </span>
        <span slot="action" slot-scope="text,record">
          <template>
            <a @click="goToStuDetail(record)">查看</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)">评分</a>
          </template>
        </span>
      </a-table>

      <a-modal title="请给学生打分" :width="800" v-model="visible" @ok="handleSubmit">
        <a-form :form="form">
          <!-- <a-form-item v-bind="formItemLayout" label="学生">
            <a-input
              v-decorator="[
            'stu_id',{initialValue:student.stu_id,}]"
              placeholder="stu_id"
              disabled="true"
            />
          </a-form-item> -->
          <a-form-item
            v-bind="formItemLayout"
            label="实训成绩"
          >
            <a-input-number
              v-decorator="['mark', { initialValue: 0 }]"
              :min="1"
              :max="100"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </a-spin>

</template>
<script>
import store from '@/store'
import { putmark, getApplyList } from '@/api/enterprise'

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
    dataIndex: 'exps',
    scopedSlots: { customRender: 'exps' }
  },
  {
    title: '实训成绩',
    dataIndex: 'grade'
  },
  {
    title: '作品',
    dataIndex: 'works',
    scopedSlots: { customRender: 'works' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  // name: "StudentList",
  data () {
    return {
      applyId: '',
      intershipId: store.getters.expid,
      columns,
      mdl: {},
      queryParam: {},
      loading: false,
      managestu: [],
      role: '',
      search: '',
      visible: false,
      student: {},
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        }
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    getApplyList(this.intershipId)
      .then(
        (res) => {
          this.managestu = res.data
        })
  },
  computed: {
    getExpId: function () {
      return store.getters.expid
    }
  },
  watch: {
    getExpId: function (val, oldVal) {
      this.intershipId = val
      getApplyList(this.intershipId)
        .then(
          (res) => {
            this.managestu = res.data
          }
        )
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
    goToStuDetail (e) {
      const _this = this
      console.log(e)
      store.commit('SET_STU_ID', e.stu_id)
      _this.$router.push({ name: 'studentdetail' })
    },
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
    Searchlist: function (data) {
      this.loading = true
      setTimeout(() => {
        this.data = data
        this.loading = false
      }, 300)
      for (var i = 0; i < this.data; i++) {
        if (this.data[i].stu_id.search(this.searchVal) != -1) {
          searchData.push(this.data[i])
        }
      }
      return searchData
    },
    handleSubmit (e) {
      const _this = this
      e.preventDefault()
      const {
        form: { validateFields }
      } = this
      const validateFieldsKey = ['mark' ]
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const publishParams = { ...values }

          publishParams.apply_id = _this.applyId
          console.log(publishParams)
          putmark(publishParams)
            .then((res) => {
              if (res.code === 200) { this.countDown() }
            })
        }
        console.log('Received values of form: ', values)
      })
    },
    countDown () {
      let secondsToGo = 5
      const modal = this.$success({
        title: '提交成功',
        content: `这个窗口将于 ${secondsToGo} s后关闭。`
      })
      const interval = setInterval(() => {
        secondsToGo -= 1
        modal.update({
          content: `这个窗口将于 ${secondsToGo} s后关闭。`
        })
      }, 1000)
      setTimeout(() => {
        clearInterval(interval)
        modal.destroy()
      }, secondsToGo * 1000)
    }
  }
}
</script>
