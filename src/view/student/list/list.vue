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
      <s-table ref="table" size="default" :columns="columns" :data="loadData" :pagination=false>
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
      </s-table>
    </a-card>
  </a-spin>
</template>
<script>
import moment from "moment";
import { STable, Ellipsis } from "@/components";
import { getRoleList, getServiceList } from "@/api/manage";
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
/* const data = [
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
]; */
export default {
  name: "StudentList",
  components: {
    STable,
    Ellipsis
  },
  data() {
    return {
      columns,
      mdl: {},
      queryParam: {},
      loading: false,
      loadData: parameter => {
        console.log("loadData.parameter", parameter);
        return getServiceList(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res.result;
          }
        );
      },
      search: ""
    };
  },
  /* created() {
    // 获取的接口数据
    this.getList();
  }, */
  /* mounted(){
    getStuInfo(Object.assign(parameter, this.queryParam)).then(
        (response) => {
          if (response.code === 200) { return response.data }
        }
      )
  }, */
  methods: {
    Searchlist: function(data) {
      this.loading = true;
      setTimeout(() => {
        this.data = data;
        this.loading = false;
      }, 300);
      var search = this.search;
      var searchData = [];
      /* if (search) {
        this.searchData = this.data.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return (
              String(product[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      } else if (search.length === 0) {
        this.searchData = this.data;
      } else {
        return this.searchData;
      } */
      for (var i = 0; i < this.data; i++) {
        if (this.data[i].stu_id.search(this.searchVal) != -1) {
          searchData.push(this.data[i]);
        }
      }
      return searchData;
    }
  }
};
</script>
