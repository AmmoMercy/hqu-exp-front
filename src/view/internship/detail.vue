
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
      <detail-list-item term="提交日期">{{internship.submit_time}}</detail-list-item>
      <detail-list-item term="类型">{{internship.type}}</detail-list-item>
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
        <a-button htmlType="submit" v-if="role==='enterprise'" @click="handleEdit(record)">
          <a-icon type="edit" />
        </a-button>
      </a-form-item>
      <detail-list title="一般信息">
        <detail-list-item term="类型">{{internship.type}}</detail-list-item>
        <detail-list-item term="企业/导师名称">
          <a>{{internship.enterprise}}</a>
        </detail-list-item>
        <detail-list-item term="实训地址">{{internship.address}}</detail-list-item>
        <detail-list-item term="实训起止日">{{internship.exp_begin_time}}-{{internship.exp_end_time}}</detail-list-item>
        <detail-list-item term="报名截止日期">{{internship.apply_end_time}}</detail-list-item>
        <detail-list-item term="意向人数">{{internship.need_num}}</detail-list-item>
        <detail-list-item term="已报名人数">{{internship.submit_num}}人</detail-list-item>
        <detail-list-item term="备注">编辑按钮企业可见，报名按钮学生可见，其余所有人可见，编辑后需要重新审核</detail-list-item>
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
        <a-button htmlType="submit" type="primary" @click="handleEnter(record)">我要报名</a-button>
      </a-form-item>

      <a-modal title="编辑实训信息" :width="800" v-model="visible" @ok="handleOk">
        <a-form-item label="实训地址">
          <a-input
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '必须填写详细地址' }]}
          ]"
            name="name"
            placeholder="详细地址"
            v-model="internship.address"
          />
        </a-form-item>
        <a-form-item label="实训起止日期">
          <a-range-picker
            name="buildTime"
            style="width: 100%"
            v-decorator="[
            'buildTime',
            {rules: [{ required: true, message: '请选择起止日期' }]}
          ]"
          />
        </a-form-item>
        <a-form-item label="报名截止日期">
          <a-DatePicker
            name="stopTime"
            style="width: 100%"
            v-decorator="[
            'stopTime',
            {rules: [{ required: true, message: '必须填写报名截止日期' }]}
          ]"
          />
        </a-form-item>
        <a-form-item label="意向人数">
          <a-input-number
            :min="0"
            :max="100"
            name="peopleNum"
            v-decorator="[
            'peopleNum',
            {rules: [{ required: true, message: '必须填写意向人数' }]}
          ]"
            v-model="internship.need_num"
          />
          <span>人</span>
        </a-form-item>
        <a-form-item label="实训描述">
          <a-textarea
            rows="10"
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '必须填写实训描述' }]}
          ]"
            name="name"
            placeholder="这里填写实训描述"
            v-model="internship.description"
          />
        </a-form-item>
      </a-modal>

      <a-modal title="确认报名" :width="800" v-model="enterVisible" @ok="handleOk">
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="20">
            <a-form-item extra="我们将发送一串验证码至您的邮箱，以确认是您本人的操作">
              <a-input
                size="large"
                type="text"
                placeholder="验证码"
                v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
              >
                <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="4">
            <a-button
              class="getCaptcha"
              size="large"
              :disabled="state.smsSendBtn"
              @click.stop.prevent="getCaptcha"
              v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
            ></a-button>
          </a-col>
        </a-row>
      </a-modal>
    </a-card>
  </page-view>
</template>

<script>
import { mixinDevice } from "@/utils/mixin";
import { PageView } from "@/layouts";
import DetailList from "@/components/tools/DetailList";
import store from "@/store";
import { publish } from "../../api/enterprise";

const DetailListItem = DetailList.Item;

export default {
  name: "Advanced",
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  mixins: [mixinDevice],
  data() {
    return {
      state: {
        time: 60,
        smsSendBtn: false,
        percent: 10,
        progressColor: "#FF0000"
      },
      role: 0,
      internship: {},
      visible: false,
      enterVisible: false,
      mdl: {}
    };
  },
  mounted() {
    if (store.getters.role === "internship") {
      this.internship = store.getters.userInfo;
    } else {
      const expid = store.getters.expid;
      publish(expid).then(response => {
        if (response.code === 200) {
          this.internship = response.data;
        }
      });
    }
    this.role = store.getters.role;
  },
  methods: {
    handleEdit(record) {
      this.mdl = Object.assign({}, record);
      this.visible = true;
    },
    handleEnter(record) {
      this.mdl = Object.assign({}, record);
      this.enterVisible = true;
    },
    pass() {
      this.internship.status = 1;
      //此处加上保存进数据库的方法
    },
    fail() {
      this.internship.status = 2;
      //此处加上保存进数据库的方法
    },
    reCheck() {
      alert(this.role);
      this.internship.status = 0;
      //此处加上保存进数据库的方法
    },
    handleOk() {}
  }
};
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
