<template>
  <div class="item" @click="handleClick">
    <div v-if="info.imageUrl">
      <div class="item_tp">
        <div class="item_tp_lf">
          <div class="title">{{ info.title }}</div>
          <div class="content">{{ info.description }}</div>
        </div>
        <div class="item_tp_rt">
          <img :src="info.imageUrl" />
        </div>
      </div>
      <div class="item_bot">
        <div class="item_bot_lf">
          <img
            class="avatar"
            src="https://cdn.shupian.cn/sp-pt/wap/images/chc1l64fweo0000.png"
          />
          <p class="name">{{ nameList[info.id % 30] }}</p>
        </div>
        <div class="item_bot_rt">
          {{ info.createTime }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="title">{{ info.title }}</div>
      <div class="content">{{ info.description }}</div>
      <div :class="['item_bot', 'item_bot_copy']">
        <div class="item_bot_lf">
          <sp-image
            width="0.48rem"
            height="0.48rem"
            radius="0.24rem"
            fit="cover"
            src="https://cdn.shupian.cn/sp-pt/wap/images/chc1l64fweo0000.png"
          />
          <p class="name">{{ nameList[info.id % 30] }}</p>
        </div>
        <div class="item_bot_rt">
          {{ info.createTime }}
        </div>
      </div>
    </div>
    <Loading-center v-show="loadingCenter" />
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { domainUrl } from '@/config'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import nameList from '@/config/nameList'
export default {
  name: 'Item',
  components: { [Image.name]: Image, LoadingCenter },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      loadingCenter: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
      isApplets: (state) => state.app.isApplets,
    }),
    nameList() {
      return nameList
    },
  },
  methods: {
    handleClick() {
      // 点击跳转详情
      if (this.isInApp || this.isApplets) {
        let url = ''
        let hide = 0
        if (this.isApplets) {
          this.loadingCenter = true
        }
        switch (this.info.linkType) {
          // 跳转文章详情
          case 1:
            url = `${domainUrl}found/detail/${this.info.id}`
            hide = 1
            if (this.isApplets) {
              this.uni.navigateTo({
                url:
                  '/pages/common_son/webview/index?id=' +
                  this.info.id +
                  '&dt=true&url=found/detail',
              })
            }
            break
          // 跳转内链
          case 2:
            url = `${this.info.wapRoute}`
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            if (this.isApplets) {
              this.uni.navigateTo({
                url:
                  '/pages/common_son/webview/index?id=' +
                  this.info.id +
                  '&dt=true&url=found/detail',
              })
            }
            break
          // 跳转外链
          case 3:
            url = this.info.link
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            if (this.isApplets) {
              this.uni.navigateTo({
                url: '/pages/common_son/link/outLink?url=' + this.info.link,
              })
            }
            break
          // 跳转图片链接
          case 4:
            url = this.info.jumpImageUrl
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            alert(123)
            if (this.isApplets) {
              this.uni.navigateTo({
                url:
                  '/pages/common_son/link/imgLink?imgUrl=' +
                  this.info.jumpImageUrl,
              })
            }
            break
          default:
            url = `${domainUrl}found/detail/${this.info.id}`
            hide = 1
            break
        }
        const iosRouter =
          '{"path":"CPSCustomer:CPSCustomer/CPSBaseWebViewController///push/animation","parameter":{"urlstr":"' +
          `${url}` +
          '","isHideNav":' +
          hide +
          ',"emptyTitle":"标题"},"isLogin":"0","version":"1.0.0"}'
        const adRouter =
          '{"path":"/common/android/SingleWeb","parameter":{"urlstr":"' +
          `${url}` +
          '","isHideNav":' +
          hide +
          ',"emptyTitle":"标题"},"isLogin":"0","version":"1.0.0"}'
        // if (this.isApplets) {
        //   this.uni.navigateTo({
        //     url:
        //       '/pages/common_son/webview/index?id=' +
        //       item.id +
        //       '&dt=true&url=found/detail',
        //   })
        // }
        if (this.isInApp) {
          this.$appFn.dggJumpRoute(
            {
              iOSRouter: iosRouter,
              androidRouter: adRouter,
            },
            (res) => {}
          )
        }
        return
      }
      // linkType跳转链接类型 1、跳转文章详情,2、跳转内链,3、跳转外链,4、跳转图片链接
      switch (this.info.linkType) {
        // 跳转文章详情
        case 1:
          this.$router.push({
            path: `/found/detail/${this.info.id}`,
          })
          break
        // 跳转内链
        case 2:
          this.$router.push({
            path: `${this.info.wapRoute}`,
          })
          break
        // 跳转外链
        case 3:
          window.location.href = this.info.link
          break
        // 跳转图片链接
        case 4:
          this.$router.push({
            name: 'img',
            params: {
              url: this.info.jumpImageUrl,
            },
          })
          break
        default:
          this.$router.push({
            path: `/found/detail/${this.info.id}`,
          })
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  margin-top: 40px;
  padding-bottom: 31px;
  border-bottom: 1px solid #f4f4f4;
  .title {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 36px;
    .textOverflow(2);
  }
  .content {
    font-size: 24px;
    margin-top: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    .textOverflow(2);
  }
  &_tp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_lf {
      width: 479px;
      height: 144px;
    }
    &_rt {
      width: 144px;
      height: 144px;
      img {
        width: 144px;
        height: 144px;
      }
    }
  }
  &_bot {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 20px;
    &_lf {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      .name {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        margin-left: 12px;
      }
    }
    &_rt {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
  .item_bot_copy {
    margin-top: 24px;
  }
}
</style>
