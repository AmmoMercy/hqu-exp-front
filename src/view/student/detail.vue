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
          <a-form-item v-bind="formItemLayout" label="专业">
            <a-input
              v-decorator="[
            'major',{initialValue:student.major,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="major"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="手机号码">
            <a-input
              v-decorator="[
            'tel',{initialValue:student.tel,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="tel"
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
          <a :href="student.works" target="_blank">点击下载</a>
        </detail-list-item>
      </detail-list>

      <a-modal title="编辑信息" :width="800" v-model="updateVisible" @ok="handleOk">
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout1">
            <div class="dropbox">
              <a-upload-dragger
                v-decorator="['dragger', {
              rules: [{ required: true}],
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            }]"
                name="files"
                :beforeUpload="fileBeforeUpload"
                accept=".zip"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">点击选取或拖动文件到此处</p>
                <p class="ant-upload-hint">多个文件请打包成一个文件上传</p>
              </a-upload-dragger>
            </div>
          </a-form-item>
        </a-form>
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
import { getStu, editStudent, studentUpload } from "../../api/student";
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
      file: {},
      formItemLayout1: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18, offset: 3 }
        }
      },
      role: store.getters.role,
      updateVisible: false,
      visible: false,
      mdl: {},
      student: {},
      stuid: store.getters.stuid
    };
  },
  computed: {
    getId() {
      return store.getters.stuid;
    }
  },
  mounted() {
    this.getStuInfo(this.stuid);
    this.student.gender = genderChanger(this.student.gender);
  },
  watch: {
    getId: function(val, oldVal) {
      this.getStuInfo(val);
    }
  },
  methods: {
    fileBeforeUpload(file, fileList) {
      this.file = file;
      return false;
    },
    getStuInfo(id) {
      var self = this;
      if (store.getters.role === "student") {
        this.student = store.getters.userInfo;
      } else {
        this.stuid = id;
        getStu(this.stuid).then(response => {
          if (response.code === "200") {
            self.student = response.data;
          }
        });
      }
    },
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
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields }
      } = this;
      const validateFieldsKey = ["major", "tel", "introduction", "exps"];
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
          editStudent(publishParams).then(res => {
            if (res.code === 200) this.countDown();
          });
        }
        console.log("Received values of form: ", values);
      });
    },
    normFile(event1) {
      console.log("Upload event:", event1);
      if (Array.isArray(event1)) {
        return event1;
      }
      return event1 && event1.fileList;
    },
    handleOk(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.countDown();
          const formData = new FormData();
          delete values.dragger;
          formData.append("file", this.file);
          studentUpload(formData);
        }
      });
    },
    countDown() {
      let secondsToGo = 5;
      const modal = this.$success({
        title: "提交成功",
        content: `这个窗口将于 ${secondsToGo} s后关闭。`
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `这个窗口将于 ${secondsToGo} s后关闭。`
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
      }, secondsToGo * 1000);
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
