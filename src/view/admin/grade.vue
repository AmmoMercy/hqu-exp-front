<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="实训年级">
                <a-select @change="getGradeByLevel" v-model="level" :defauValue="level">
                  <a-select-option value="2018">2018</a-select-option>
                  <a-select-option value="2017">2017</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

          </a-row></a-form>
      </div>
      <a-table ref="table" size="default" :columns="columns" :dataSource="grades" showPagination="auto">
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="introduction" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="exps" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="works">
          <a href="#">filestitle</a>
        </span>
        <span slot="action">
          <a href="#">查看</a>
        </span>
      </a-table>
      <a-button type="link"><download-excel
        class="button"
        :data="grades"
        :fields="json_fields"
        type="xls"
        name="实训成绩.xls">
        点击导出实训成绩文件
      </download-excel></a-button>

    </a-card>
  </a-spin>
</template>
<script>
import { getGrade } from '@/api/admin'
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
    title: '邮箱',
    dataIndex: 'email'
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
  name: 'GradeList',
  data () {
    return {
      level: null,
      grades: [],
      columns,
      mdl: {},
      queryParam: {},
      loading: false,
      json_fields: {
        '学号': 'stu_id',
        '年级': 'enterence_year'

      },
      json_data: [{ 'stu_id': '121', 'enterence_year': '2017软件工程1班' }, { 'stu_id': 'asdfasdf', 'enterence_year': '2017软件工程1班', 'stuName': 'asdfasdf' }],
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ]
    }
  },
  mounted () {

  },
  methods: {
    getGradeByLevel (level) {
      this.loading = true
      getGrade(level).then(res => {
        this.grades = res.data
      }).finally(() => { this.loading = false })
    },
    Searchlist: function (data) {
      this.loading = true
      setTimeout(() => {
        this.data = data
        this.loading = false
      }, 300)
    }
  }
}
</script>
