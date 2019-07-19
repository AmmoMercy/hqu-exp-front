<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="学号">
                <a-input placeholder="请输入学号" />
              </a-form-item>
            </a-col>
            <span>
              <a-button type="primary" @click="Searchlist">查询</a-button>
            </span>
          </a-row>
        </a-form>
      </div>
      <a-table :columns="columns" :dataSource="data">
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="works">
          <a href="#">filestitle</a>
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

const genderMap = {
  1: {
    status: 'processing',
    text: '男'
  },
  2: {
    status: 'error',
    text: '女'
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
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '入学年份',
    dataIndex: 'enterence_year',
    sorter: true
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
const data = [
  {
    key: '1',
    stu_id: '21313131',
    name: 'KooBoo',
    status: 2,
    enterence_year: '2019',
    major: 'IT',
    tel: '123456',
    introduction: 'this is intro',
    email: 'Kooboo@qq.com',
    exps: 'this is exps'
  }
]
export default {
  name: 'StudentList',
  data () {
    return {
      data,
      columns,
      mdl: {},
      queryParam: {},
      loading: false
    }
  },
  filters: {
    statusFilter (type) {
      return genderMap[type].text
    },
    statusTypeFilter (type) {
      return genderMap[type].status
    }
  },
  methods: {
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
