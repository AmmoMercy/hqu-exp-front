
<template>
  <page-view
    title="实训项目名称"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="提交日期">2018-08-07</detail-list-item>
      <detail-list-item term="类型">企业/导师</detail-list-item>
      <detail-list-item term="备注">这部分为管理员可见</detail-list-item>
    </detail-list>
    <!-- actions -->
    <template slot="action">
      <a-button htmlType="submit" type="primary">
        <a-icon type="check" />审核通过
      </a-button>
      <a-button style="margin-left: 8px">
        <a-icon type="close" />审核不通过
      </a-button>
    </template>

    <a-card :bordered="false" title="流程进度">
      <span>这部分为企业和管理员可见</span>
      <a-divider style="margin-bottom: 32px" />
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="2" progressDot>
        <a-step title="提交完成"></a-step>
        <a-step title="审核中"></a-step>
        <a-step style="margin-left: 8px" title="审核通过"></a-step>
      </a-steps>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="实训详情">
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right">
        <a-button htmlType="submit" @click="handleEdit(record)">
          <a-icon type="edit" />
        </a-button>
      </a-form-item>
      <detail-list title="一般信息">
        <detail-list-item term="类型">导师/企业</detail-list-item>
        <detail-list-item term="企业/导师名称">
          <a>xx企业（转跳至该企业详情页）</a>
        </detail-list-item>
        <detail-list-item term="实训地址">地址</detail-list-item>
        <detail-list-item term="实训起止日">时间--时间</detail-list-item>
        <detail-list-item term="报名截止日期">时间</detail-list-item>
        <detail-list-item term="意向人数">xxxxx人</detail-list-item>
        <detail-list-item term="已报名人数">xxxxx/xxxxxx人</detail-list-item>
        <detail-list-item term="备注">编辑按钮企业可见，报名按钮学生可见，其余所有人可见，编辑后需要重新审核</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <a-form-item label="实训描述">
        <a-textarea
          contenteditable="false"
          rows="10"
          readonly
          value="我是描述、要求等"
          style="border:none"
        />
      </a-form-item>
      <a-divider style="margin-bottom: 32px" />
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
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
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'

const DetailListItem = DetailList.Item

export default {
  name: 'Advanced',
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
        progressColor: '#FF0000'
      },
      visible: false,
      enterVisible: false,
      mdl: {},
    }
  },
  methods: {
    handleEdit(record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
    },
    handleEnter(record) {
      this.mdl = Object.assign({}, record)
      this.enterVisible = true
    },
    handleOk() {}
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
