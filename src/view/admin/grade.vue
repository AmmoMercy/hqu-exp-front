<template>
  <a-spin :spinning="loading">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="学号">
                <a-input v-model="search" placeholder="请输入学号" />
              </a-form-item>
            </a-col>
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
      <a-table ref="table" size="default" :columns="columns" :dataSource="data" showPagination="auto">
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
    </a-card>
  </a-spin>
</template>
<script>
const columns = [
  {
    title: "#",
    scopedSlots: { customRender: "serial" }
  },
  {
    title: "学号",
    dataIndex: "stu_id"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "性别",
    dataIndex: "gender",
    scopedSlots: { customRender: "gender" }
  },
  {
    title: "入学年份",
    dataIndex: "enterence_year"
  },
  {
    title: "专业",
    dataIndex: "major"
  },
  {
    title: "联系方式",
    dataIndex: "tel"
  },
  {
    title: "简介",
    dataIndex: "introduction",
    scopedSlots: { customRender: "introduction" }
  },
  {
    title: "邮箱",
    dataIndex: "email"
  },
  {
    title: "实训经历",
    dataIndex: "exps",
    scopedSlots: { customRender: "exps" }
  },
  {
    title: "实训成绩",
    dataIndex: "grade"
  },
  {
    title: "作品",
    dataIndex: "works",
    scopedSlots: { customRender: "works" }
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" }
  }
];
const data = [
  {
    key: "1",
    stu_id: "21313131",
    name: "KooBoo",
    gender: '男',
    enterence_year: "2019",
    major: "IT",
    tel: "123456",
    introduction: "this is intro",
    email: "Kooboo@qq.com",
    exps: "this is exps",
    grade: 80
  },
  {
    key: "2",
    stu_id: "123123",
    name: "tencent",
    gender: '女',
    enterence_year: "2019",
    major: "IT",
    tel: "123456",
    introduction: "this is intro",
    email: "tencent@qq.com",
    exps: "this is exps",
    grade: 80
  }
];
export default {
  name: "GradeList",
  data() {
    return {
      data,
      columns,
      mdl: {},
      queryParam: {},
      loading: false,
    };
  },
  methods: {
    Searchlist: function(data) {
      this.loading = true;
      setTimeout(() => {
        this.data = data;
        this.loading = false;
      }, 300);
    }
  }
};
</script>
