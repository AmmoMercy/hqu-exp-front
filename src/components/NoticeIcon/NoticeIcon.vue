<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-list
          itemLayout="horizontal"
          :dataSource="dataList"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
              :description="'待处理申请数：'+item.applying_num"
            >
              <a slot="title" @click="goToApplyList(item)">{{ item.expId }}</a>

            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef">
      <a-badge :count="applying_num">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
import { getApplyCount } from '@/api/enterprise'
import store from '@/store'
export default {
  name: 'HeaderNotice',
  data () {
    return {
      dataList: [ ],
      loadding: false,
      visible: false,
      applying_num: 0
    }
  },
  mounted () {
    var _this = this
    if (store.getters.role !== 'enterprise') { return }
    getApplyCount().then(
      (res) => {
        for (var item of res.data) {
          if (item.applying_num !== 0) {
            _this.applying_num = _this.applying_num + item.applying_num
            _this.dataList.push(item)
          }
        }
      })
  },
  methods: {
    goToApplyList (e) {
      store.commit('SET_EXP_ID', e.expId)
      this.$router.push({ name: 'applicatinlist' })
    },
    fetchNotice () {
      if (!this.visible) {
        this.loadding = true
        setTimeout(() => {
          this.loadding = false
        }, 2000)
      } else {
        this.loadding = false
      }
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
