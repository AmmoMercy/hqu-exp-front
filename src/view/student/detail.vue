<template>
  <page-view
    title="学生信息"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list slot="headerContent" size="small" :col="3" class="detail-layout">
      <detail-list-item v-if="role=='student'" term="学号">{{ student.stu_id }}</detail-list-item>
      <detail-list-item term="姓名">{{ student.name }}</detail-list-item>
      <detail-list-item term="性别">{{ student.gender }}</detail-list-item>
      <detail-list-item term="入学年份">{{ student.enterence_year }}</detail-list-item>
      <detail-list-item term="专业">{{ student.major }}</detail-list-item>
    </detail-list>

    <a-card style="margin-top: 24px" :bordered="false" title="详细信息">
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right">
        <a-button htmlType="submit" @click="handleEdit(record)">
          <a-icon type="edit" />
        </a-button>
      </a-form-item>
      <detail-list>
        <detail-list-item term="手机号码">{{ student.tel }}</detail-list-item>
        <detail-list-item term="emial">email</detail-list-item>
        <detail-list-item term="备注" v-if="role!='student'">除了编辑按钮学生本人可见，其余所有人可见</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <a-form-item label="个人简介">
        <a-textarea contenteditable="false" rows="10" readonly :value="student.intro" style="border:none" />
      </a-form-item>
      <a-divider style="margin-bottom: 32px" />
      <a-form-item label="实训经历">
        <a-textarea contenteditable="false" rows="10" readonly value="我是简介" style="border:none" />
      </a-form-item>

      <a-modal title="编辑信息" :width="800" v-model="visible" @ok="handleOk">
        <a-form-item label="手机号码">
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '必须填写手机号码' }]}
            ]"
            name="name"
            placeholder="手机号码"
          />
        </a-form-item>
        <a-form-item label="email">
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '必须填写email' }]}
            ]"
            name="name"
            placeholder="email"
          />
        </a-form-item>

        <a-form-item label="个人简介">
          <a-textarea
            rows="10"
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '必须填写个人简介' }]}
            ]"
            name="name"
            placeholder="这里填写个人简介"
          />
        </a-form-item>

        <a-form-item label="实训经历">
          <a-textarea
            rows="10"
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '必须填写实训经历' }]}
            ]"
            name="name"
            placeholder="这里填写实训经历"
          />
        </a-form-item>
      </a-modal>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="学生作品">
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right">
        <a-button htmlType="submit" @click="handleUpdateEdit(record)">
          <a-icon type="edit" />
        </a-button>
      </a-form-item>
      <detail-list>
        <detail-list-item term="学生作品名">
          <a>url</a>
        </detail-list-item>
        <detail-list-item term="学生作品名">
          <a>url</a>
        </detail-list-item>
        <detail-list-item term="学生作品名">
          <a>url</a>
        </detail-list-item>
      </detail-list>

      <a-modal title="编辑信息" :width="800" v-model="updateVisible" @ok="handleOk">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :defaultFileList="defaultFileList"
        >
          <a-button>
            <a-icon type="upload" />Upload
          </a-button>
        </a-upload>
      </a-modal>
    </a-card>
  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import store from '@/store'
import { genderChanger } from '@/utils/util'
import { getStu } from '@/api'
const DetailListItem = DetailList.Item

export default {
  name: 'Advanced',
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  mixins: [mixinDevice],
  data () {
    return {
      defaultFileList: [
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/xxx.png'
        },
        {
          uid: '2',
          name: 'yyy.png',
          status: 'done',
          url: 'http://www.baidu.com/yyy.png'
        },
        {
          uid: '3',
          name: 'zzz.png',
          status: 'error',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/zzz.png'
        }
      ],
      role: store.getters.role,
      updateVisible: false,
      visible: false,
      mdl: {},
      student: {}
    }
  },
  mounted () {
    if (store.getters.role === 'student') { this.student = store.getters.userInfo } else {
      const stuid = store.getters.stuid
      getStu(stuid).then(
        (response) => {
          if (response.code === 200) { this.student = response.data }
        }
      )
    }
    this.student.gender = genderChanger(this.student.gender)
  },
  methods: {
    handleChange ({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList)
      }
    },
    handleEdit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
    },
    handleUpdateEdit (record) {
      this.mdl = Object.assign({}, record)
      this.updateVisible = true
    },
    handleOk () {}
  }
}
</script>

<style scoped>
.detail-layout {
  margin-left: 44px;
}
.text {
  color: rgba(0, 0, 0, 0.45);
}

.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}

.no-data {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;

}
.no-data  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }

 .mobile .detail-layout {
    margin-left: unset;
  }
 .mobile .text {
  }
 .mobile .status-list {
    text-align: left;
  }

</style>
