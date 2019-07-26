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
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right" v-if="role==='student'">
        <a-button htmlType="submit" @click="handleEdit(record)">
          <a-icon type="edit" />
        </a-button>
      </a-form-item>
      <detail-list>
        <detail-list-item term="手机号码">{{ student.tel }}</detail-list-item>
        <detail-list-item term="emial">{{student.email}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <a-form-item label="个人简介">
        <a-textarea
          contenteditable="false"
          rows="10"
          readonly
          v-model="student.introduction"
          style="border:none"
        />
      </a-form-item>
      <a-divider style="margin-bottom: 32px" />
      <a-form-item label="实训经历">
        <a-textarea
          contenteditable="false"
          rows="10"
          readonly
          v-model="student.exps"
          style="border:none"
        />
      </a-form-item>

      <a-modal title="编辑个人简历" :width="800" v-model="visible" @ok="handleSubmit">
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="手机号码">
            <a-input
              v-decorator="[
            'tel',{initialValue:student.tel,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="tel"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="email地址">
            <a-input
              v-decorator="[
            'email',{initialValue:student.email,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="email"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="个人简介">
            <a-textarea
              rows="8"
              v-decorator="[
            'introduction',
            {initialValue:student.introduction,rules: [{ required: true, message: '请输入目标描述' }]}
          ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="实训经历">
            <a-textarea
              rows="8"
              v-decorator="[
            'exps',
            {initialValue:student.exps,rules: [{ required: true, message: '请输入目标描述' }]}
          ]"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="学生作品">
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right">
        <a-button htmlType="submit" @click="handleUpdateEdit(record)" v-if="role==='student'">
          <a-icon type="edit" />
        </a-button>
      </a-form-item>
      <detail-list>
        <detail-list-item term="学生作品名">
          <a :href="student.works">url</a>
        </detail-list-item>
      </detail-list>

      <a-modal title="编辑信息" :width="800" v-model="updateVisible" @ok="handleOk">
        <a-upload :defaultFileList="defaultFileList">
          <a-button>
            <a-icon type="upload" />Upload
          </a-button>
        </a-upload>
      </a-modal>
    </a-card>
  </page-view>
</template>

<script>
import { mixinDevice } from "@/utils/mixin";
import { PageView } from "@/layouts";
import DetailList from "@/components/tools/DetailList";
import store from "@/store";
import { genderChanger } from "@/utils/util";
import { getStu } from "../../api/student";
import student from "../../store/modules/jumper";
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
      form: this.$form.createForm(this),
      config: {
        rules: [
          { type: "object", required: true, message: "Please select time!" }
        ]
      },
      confirmDirty: false,
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
      defaultFileList: [
        {
          uid: "1",
          name: "xxx.png",
          response: "Server Error 500", // custom error message to show
          url: "http://www.baidu.com/xxx.png"
        },
        {
          uid: "2",
          name: "yyy.png",
          url: "http://www.baidu.com/yyy.png"
        },
        {
          uid: "3",
          name: "zzz.png",
          response: "Server Error 500", // custom error message to show
          url: "http://www.baidu.com/zzz.png"
        }
      ],
      role: store.getters.role,
      updateVisible: false,
      visible: false,
      mdl: {},
      student: {}
    };
  },
  mounted() {
    if (store.getters.role === "student") {
      this.student = store.getters.userInfo;
    } else {
      const stuid = store.getters.stuid;
      getStu(stuid).then(response => {
        if (response.code === 200) {
          this.student = response.data;
        }
      });
    }
    this.student.gender = genderChanger(this.student.gender);
  },
  methods: {
    handleChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    handleEdit(record) {
      this.mdl = Object.assign({}, record);
      this.visible = true;
    },
    handleUpdateEdit(record) {
      this.mdl = Object.assign({}, record);
      this.updateVisible = true;
      alert(this.student.description);
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields }
      } = this;
      const validateFieldsKey = ["tel", "email", "intro", "description"];
      // const values = {
      //   ...fieldsValue,
      //   'date-time-picker': fieldsValue['date-time-picker'].format(
      //     'YYYY-MM-DD HH:mm:ss'
      //   )
      // }
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const publishParams = { ...values };
          console.log(publishParams);
          publish(publishParams).then(res => {
            if (res.code === 200) this.countDown();
          });
        }
        console.log("Received values of form: ", values);
      });
    },
    handleOk() {
      //点击确定之后更新数据库里的学生作品数据
    }
  }
};
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
.no-data i {
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
