
<template>
  <page-view
    :title="enterprise.name"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list
      slot="headerContent"
      size="small"
      :col="2"
      class="detail-layout"
      v-if="role==='admin'"
    >
      <detail-list-item term="注册时间">{{enterprise.register_time}}</detail-list-item>
      <detail-list-item term="资质文件">
        <a>url</a>
      </detail-list-item>
      <detail-list-item term="类型">{{enterprise.type}}</detail-list-item>
    </detail-list>
    <!-- actions -->
    <template slot="action" class="steps-action" v-if="role==='admin'">
      <a-button v-if="enterprise.status===0" type="primary" @click="pass">
        <a-icon type="check" />通过
      </a-button>
      <a-button v-if="enterprise.status ===0" style="margin-left: 8px" @click="fail">
        <a-icon type="close" />不通过
      </a-button>
      <a-button v-if="enterprise.status >= 1" style="margin-left: 8px" @click="reCheck">
        <a-icon type="close" />撤销
      </a-button>
    </template>

    <a-card :bordered="false" title="流程进度" v-if="role==='enterprise'||role==='admin'">
      <a-steps :current="enterprise.status+1">
        <a-step title="提交成功" description="请耐心等待审核。" />
        <a-step v-if="enterprise.status===0" title="审核中" description="审核结果将会在7个工作日内进行通知。" />
        <a-step v-if="enterprise.status===1" title="审核通过!" description="贵企业已经可以进行实训信息发布。" />
        <a-step
          v-else-if="enterprise.status===2"
          title="审核未通过!"
          status="error"
          description="请修改企业信息，重新提交。"
        />
        <a-step v-else title="等待审核完毕" />
      </a-steps>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="企业信息">
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right">
        <a-button htmlType="submit" @click="handleEdit(record)" v-if="role==='enterprise'">
          <a-icon type="edit" />
        </a-button>
      </a-form-item>
      <detail-list title="一般信息">
        <detail-list-item term="类型">{{enterprise.type}}</detail-list-item>
        <detail-list-item term="详细地址">{{enterprise.address}}</detail-list-item>
        <detail-list-item term="企业/导师email">{{enterprise.email}}</detail-list-item>
        <detail-list-item term="企业/导师联系人">{{enterprise.contact_name}}</detail-list-item>
        <detail-list-item term="企业/导师联系方式">{{enterprise.contact_tel}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <a-form-item label="简介">
        <a-textarea
          contenteditable="false"
          rows="10"
          readonly
          v-model="enterprise.intro"
          style="border:none"
        />
      </a-form-item>
      <a-divider>❤照片墙❤</a-divider>

      <a-carousel arrows dotsClass="slick-dots slick-thumb" style="margin-bottom: 75px">
        <a slot="customPaging" slot-scope="props">
          <img :src="getImgUrl(props.i)" />
        </a>
        <div v-for="item in 4">
          <img :src="baseUrl+'abstract0'+item+'.jpg'" />
        </div>
      </a-carousel>

      <a-modal title="编辑信息" :width="800" v-model="visible" @ok="handleSubmit">
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="名称">
            <a-input
              v-decorator="[
            'name',{initialValue:enterprise.name,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="name"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="详细地址">
            <a-input
              v-decorator="[
            'address',{initialValue:enterprise.address,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="address"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="email地址">
            <a-input
              v-decorator="[
            'email',{initialValue:enterprise.email,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="email"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="联系人">
            <a-input
              v-decorator="[
            'contact_name',{initialValue:enterprise.contact_name,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="contact_name"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="联系电话">
            <a-input
              v-decorator="[
            'contact_tel',{initialValue:enterprise.contact_tel,rules: [{ required: true, message: 'Please input your topic!' }],}]"
              placeholder="contact_tel"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="项目简介">
            <a-textarea
              rows="8"
              v-decorator="[
            'intro',
            {initialValue:enterprise.intro,rules: [{ required: true, message: '请输入目标描述' }]}
          ]"
            />
          </a-form-item>
          <a-form-item a-form-item v-bind="formItemLayout" label="上传照片">
            <div class="clearfix">
              <a-upload
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 3">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
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
import { getEnt } from "../../api/enterprise";

const DetailListItem = DetailList.Item;
const baseUrl =
  "https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/";

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
      visible: false,
      baseUrl,
      mdl: {},
      previewVisible: false,
      previewImage: "",
      enterprise: {},
      role: store.getters.role,
      fileList: [
        {
          uid: "-1",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        },
        {
          uid: "-1",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        },
        {
          uid: "-1",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ]
    };
  },
  mounted() {
    if (store.getters.role === "enterprise") {
      this.enterprise = store.getters.userInfo;
    } else {
      const entid = store.getters.entid;
      getEnt(entid).then(response => {
        if (response.code === 200) {
          this.enterprise = response.data;
        }
      });
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
      //补充从数据库添加新照片的方法
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      //补充从数据库删除该照片的方法
    },
    handleEdit(record) {
      this.mdl = Object.assign({}, record);
      this.visible = true;
    },
    handleOk() {},
    pass() {
      this.enterprise.status = 1;
      //此处加上保存进数据库的方法
    },
    fail() {
      this.enterprise.status = 2;
      //此处加上保存进数据库的方法
    },
    reCheck() {
      this.enterprise.status = 0;
      //此处加上保存进数据库的方法
    },
    getImgUrl(i) {
      return `${baseUrl}abstract0${i + 1}.jpg`;
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields }
      } = this;
      const validateFieldsKey = [
        "name",
        "address",
        "email",
        "contact_name",
        "contact_tel",
        "intro"
      ];
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
.ant-carousel >>> .slick-dots {
  height: auto;
}
.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  width: 800px;
  max-width: 100%;
}
.ant-carousel >>> .slick-thumb {
  bottom: -75px;
}
.ant-carousel >>> .slick-thumb li {
  width: 100px;
  height: 75px;
}
.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
