
<template>
  <page-view
    :title="enterprise.name"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="注册时间">{{enterprise.register_time}}</detail-list-item>
      <detail-list-item term="资质文件">
        <a>url</a>
      </detail-list-item>
      <detail-list-item term="类型">{{enterprise.type}}</detail-list-item>
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
        <a-step title="注册完成"></a-step>
        <a-step title="审核中"></a-step>
        <a-step style="margin-left: 8px" title="审核通过"></a-step>
      </a-steps>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="企业信息">
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: right">
        <a-button htmlType="submit" @click="handleEdit(record)">
          <a-icon type="edit" />
        </a-button>
      </a-form-item>
      <detail-list title="一般信息">
        <detail-list-item term="类型">{{enterprise.type}}</detail-list-item>
        <detail-list-item term="详细地址">{{enterprise.address}}</detail-list-item>
        <detail-list-item term="企业/导师email">{{enterprise.email}}</detail-list-item>
        <detail-list-item term="企业/导师联系人">{{enterprise.contact_name}}</detail-list-item>
        <detail-list-item term="企业/导师联系方式">{{enterprise.contact_tel}}</detail-list-item>
        <detail-list-item term="备注">除了编辑按钮，其余所有人可见</detail-list-item>
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
      <a-modal title="编辑信息" :width="800" v-model="visible" @ok="handleOk">
        <a-form-item label="详细地址">
          <a-input
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '必须填写详细地址' }]}
          ]"
            name="name"
            placeholder="address"
            v-model="enterprise.address"
          />
        </a-form-item>
        <a-form-item label="企业/导师email">
          <a-input
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '必须填写企业/导师email' }]}
          ]"
            name="name"
            placeholder="email"
            v-model="enterprise.email"
          />
        </a-form-item>
        <a-form-item label="企业/导师联系人">
          <a-input
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '必须填写企业/导师联系人' }]}
          ]"
            name="name"
            placeholder="联系人本名"
            v-model="enterprise.contact_name"
          />
        </a-form-item>
        <a-form-item label="企业/导师联系方式">
          <a-input
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '必须填写联系方式' }]}
          ]"
            name="name"
            placeholder="手机号码"
            v-model="enterprise.contact_tel"
          />
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea
            rows="10"
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '必须填写简介' }]}
          ]"
            name="name"
            placeholder="这里填写简介"
            v-model="enterprise.intro"
          />
        </a-form-item>
        <a-divider style="margin-bottom: 32px" orientation="left">上传照片</a-divider>
        <div class="clearfix">
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
      visible: false,
      baseUrl,
      mdl: {},
      previewVisible: false,
      previewImage: "",
      enterprise: {},
      fileList: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
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
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    handleEdit(record) {
      this.mdl = Object.assign({}, record);
      this.visible = true;
    },
    handleOk() {},
    getImgUrl(i) {
      return `${baseUrl}abstract0${i + 1}.jpg`;
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
