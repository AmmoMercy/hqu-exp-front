
<template>
  <page-view
    title="企业/导师名称"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="注册时间">2018-08-07</detail-list-item>
      <detail-list-item term="资质文件">
        <a>url</a>
      </detail-list-item>
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
        <detail-list-item term="类型">导师/企业</detail-list-item>
        <detail-list-item term="详细地址">地址</detail-list-item>
        <detail-list-item term="企业/导师email">email</detail-list-item>
        <detail-list-item term="企业/导师联系人">XXX</detail-list-item>
        <detail-list-item term="企业/导师联系方式">1234567890</detail-list-item>
        <detail-list-item term="备注">除了编辑按钮，其余所有人可见</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <a-form-item label="简介">
        <a-textarea contenteditable="false" rows="10" readonly value="我是简介" style="border:none" />
      </a-form-item>
      <a-divider style="margin-bottom: 32px" />
      <div class="clearfix">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          :fileList="fileList"
          @preview="handlePreview"
        ></a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
      <a-divider style="margin-bottom: 32px" orientation="right">❤照片墙❤</a-divider>
      <a-modal title="编辑信息" :width="800" v-model="visible" @ok="handleOk">
        <a-form-item label="详细地址">
          <a-input
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '必须填写详细地址' }]}
          ]"
            name="name"
            placeholder="详细地址"
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
          />
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea rows="10" placeholder="这里填写简介" />
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
      visible: false,
      mdl: {},
      previewVisible: false,
      previewImage: "",
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

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
