
<template>
  <page-view
    :title="internship.topic"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list
      slot="headerContent"
      size="small"
      :col="2"
      class="detail-layout"
      v-if="role==='admin'"
    >
      <detail-list-item term="提交日期">{{ internship.submit_time }}</detail-list-item>
      <detail-list-item term="类型">{{ internship.type }}</detail-list-item>
    </detail-list>
    <!-- actions -->
    <template slot="action" class="steps-action" v-if="role==='admin'">
      <a-button v-if="internship.status===0" type="primary" @click="pass">
        <a-icon type="check" />通过
      </a-button>
      <a-button v-if="internship.status ===0" style="margin-left: 8px" @click="fail">
        <a-icon type="close" />不通过
      </a-button>
      <a-button v-if="internship.status >= 1" style="margin-left: 8px" @click="reCheck">
        <a-icon type="close" />撤销操作
      </a-button>
    </template>

    <a-card :bordered="false" title="流程进度" v-if="role==='enterprise'||role==='admin'">
      <a-steps :current="internship.status+1">
        <a-step title="提交成功" description="请耐心等待审核。" />
        <a-step v-if="internship.status===0" title="审核中" description="审核结果将会在7个工作日内进行通知。" />
        <a-step v-if="internship.status===1" title="审核通过!" description="请留意学生报名情况。" />
        <a-step
          v-else-if="internship.status===2"
          title="审核未通过!"
          status="error"
          description="请修改实训信息，重新提交。"
        />
        <a-step v-else title="等待审核完毕" />
      </a-steps>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="实训详情">
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right">
        <a-button
          htmlType="submit"
          v-if="role==='enterprise'&&internship.status!=1"
          @click="handleEdit(record)"
        >
          <a-icon type="edit" />
        </a-button>
      </a-form-item>
      <detail-list title="一般信息">
        <detail-list-item term="类型">{{ enterprise.type }}</detail-list-item>
        <detail-list-item term="企业/导师名称">
          <a @click="goToEntDetail">{{ enterprise.name }}</a>
        </detail-list-item>
        <detail-list-item term="实训地址">{{ enterprise.address }}</detail-list-item>
        <detail-list-item term="实训起止日">{{ internship.exp_begin_time }}-{{ internship.exp_end_time }}</detail-list-item>
        <detail-list-item term="报名截止日期">{{ internship.apply_end_time }}</detail-list-item>
        <detail-list-item term="意向人数">{{ internship.need_num }}</detail-list-item>
        <detail-list-item term="已报名人数">{{ internship.submit_num }}人</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <a-form-item label="实训描述">
        <a-textarea
          contenteditable="false"
          rows="10"
          readonly
          :value="internship.description"
          style="border:none"
        />
      </a-form-item>
      <a-divider style="margin-bottom: 32px" />
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center" v-if="role==='student'">
        <a-button htmlType="submit" type="primary" @click="showConfirm">我要报名</a-button>
      </a-form-item>

      <a-modal
        title="编辑实训信息"
        :width="800"
        v-model="visible"
        @ok="handleSubmit"
        :confirmLoading="confirmLoading"
      >
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="id" v-if="0">
            <a-input
              v-decorator="[
                'id',{initialValue:internship._id,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="id"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="实训题目">
            <a-input
              v-decorator="[
                'topic',{initialValue:internship.topic,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="Topic"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="开始时间">
            <a-date-picker
              v-decorator="['exp_begin_time', config]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="结束时间">
            <a-date-picker
              v-decorator="['exp_end_time', config]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="项目简介">
            <a-textarea
              rows="8"
              v-decorator="[
                'description',
                {initialValue:internship.description,rules: [{ required: true, message: '请输入目标描述' }]}
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="需求人数">
            <a-input-number
              v-decorator="['need_num', { initialValue:internship.need_num,rules:[{required:true}] }]"
              :min="1"
              :max="100"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="申请截至时间">
            <a-date-picker
              v-decorator="['apply_end_time',config]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import store from '@/store'
import { getInternship } from '../../api/enterprise'
import {
  studentapply,
  stuGetInternship,
  stuGetEnterprise
} from '../../api/student'
import { adminGetEnt } from '@/api/admin'

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
      expid: store.getters.expid,
      state: {
        time: 60,
        smsSendBtn: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      entid: store.getters.entid,
      form: this.$form.createForm(this),
      config: {
        rules: [
          { type: 'object', required: true, message: 'Please select time!' }
        ]
      },
      // confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 0
          }
        }
      },
      role: store.getters.role,
      internship: { },
      enterprise: {},
      visible: false,
      enterVisible: false,
      mdl: {},
      confirmLoading: false
    }
  },
  computed: {
    getId () {
      return store.getters.expid
    },
    getInfo () {
      return store.getters.userInfo
    }
  },
  mounted () {
    this.getExpInfo(this.expid)
    this.getEnterpriseInfo(this.entid)
  },
  watch: {
    getId: function (val, oldVal) {
      this.getExpInfo(val)
    },
    getInfo: function (val, oldVa) {
      this.internship = val
    }
  },
  methods: {
    goToEntDetail () {
      const _this = this
      store.commit('SET_ENT_ID', _this.entid)
      _this.$router.push({ name: 'enterprise' })
    },
    openNotification1 () {
      this.$notification.open({
        type: 'success',
        message: '报名成功',
        description: '请耐心等待审核',
        style: {
          width: '600px',
          marginLeft: `${335 - 600}px`
        }
      })
    },
    openNotification () {
      this.$notification.open({
        type: 'error',
        message: '报名失败',
        description: '无法重复报名，请确定先前没有报名过此项目',
        style: {
          width: '600px',
          marginLeft: `${335 - 600}px`
        }
      })
    },
    showConfirm () {
      var _this = this
      this.$confirm({
        title: '确认报名吗',
        content: '一旦报名，不可取消，不可重复报名',
        onOk () {
          return new Promise((resolve, reject) => {
            var params = {}
            params.exp_id = _this.expid
            studentapply(params).then((res) => {
              if (res.code === '200') {
                _this.openNotification1()
                resolve()
              }
              if (res.code === '100') {
                _this.openNotification()
              }
            })
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          })
            .catch(() => console.log('Oops errors!'))
        },
        onCancel () {
          console.log('Cancel')
        },
        class: 'test'
      })
    },
    getExpInfo (id) {
      if (store.getters.role === 'enterprise') {
        getInternship(id).then(response => {
          if (response.code === '200') {
            this.internship = response.data
          }
        })
      } else if (store.getters.role === 'student') {
        stuGetInternship(id).then(response => {
          if (response.code === '200') {
            this.internship = response.data
          }
        })
      } else {
        adminGetEnt(id).then(response => {
          if (response.code === '200') {
            this.internship = response
            debugger
          }
        })
      }
    },
    getEnterpriseInfo (id) {
      if (store.getters.role === 'enterprise') {
        this.enterprise = store.getters.userInfo
      } else {
        stuGetEnterprise(id).then(response => {
          if (response.code === '200') {
            this.enterprise = response.data
          }
        })
      }
    },
    handleEdit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
    },
    handleEnter (record) {
      this.mdl = Object.assign({}, record)
      this.enterVisible = true
    },
    pass () {
      this.internship.status = 1
      // 此处加上保存进数据库的方法
    },
    fail () {
      this.internship.status = 2
      // 此处加上保存进数据库的方法
    },
    reCheck () {
      this.internship.status = 0
      // 此处加上保存进数据库的方法
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields }
      } = this
      const validateFieldsKey = [
        'expId',
        'topic',
        'exp_begin_time',
        'exp_end_time',
        'description',
        'need_num',
        'apply_end_time'
      ]
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const publishParams = { ...values }
          console.log(publishParams)
          publish(publishParams).then(res => {
            if (res.code === 200) this.countDown()
            store.dispatch('GetInfo')
          })
        }
        console.log('Received values of form: ', values)
      })
    },
    // handleOk() {
    //     const formData = new FormData()
    //     formData.append("exp_id",this.expid)
    //     studentapply(formData)
    //     this.countDown()
    // },
    countDown () {
      let secondsToGo = 3
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
      this.confirmLoading = true
      setTimeout(() => {
        clearInterval(interval)
        modal.destroy()
        this.visible = false
        this.enterVisible = false
        this.confirmLoading = false
      }, secondsToGo * 1000)
    }
  }
}
</script>

<style lang="less" scoped>
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

  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }
  .text {
  }
  .status-list {
    text-align: left;
  }
}
</style>
