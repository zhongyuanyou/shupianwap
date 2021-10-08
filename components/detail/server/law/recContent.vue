<template>
  <div v-if="cList.length" class="container">
    <h3 class="c_title">维权攻略</h3>
    <div class="c_list">
      <div
        v-for="(item, index) in cList"
        :key="index"
        class="c_item"
        :class="index === 0 ? 'no_border' : ''"
        @click="handleClick(item)"
      >
        <div v-if="item.imageUrl" class="item item1">
          <div class="item_l">
            <div class="item_title">{{ item.title }}</div>
            <div class="item_author">
              <span class="name">{{ nameList[item.id % 30] }}</span>
              <span class="time"> {{ getTime(item.createTime) }}</span>
            </div>
          </div>
          <div class="item_r">
            <sp-image :src="$resizeImg(240, 190, item.imageUrl)" />
          </div>
        </div>
        <div v-else class="item">
          <div class="item_title">{{ item.title }}</div>
          <div class="item_author">
            <span class="name">{{ nameList[item.id % 30] }}</span>
            <span class="time"> {{ getTime(item.createTime) }}</span>
          </div>
        </div>
        <Loading-center v-show="loadingCenter" />
      </div>
    </div>
    <p class="btn_im">
      <imBtn />
    </p>
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { commonApi } from '@/api/common'
import { domainUrl } from '@/config'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import nameList from '@/config/nameList'
import imBtn from '@/components/detail/common/RecImBtn'
export default {
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    LoadingCenter,
    imBtn,
  },
  props: {
    categoryCode: {
      type: String,
      default: 'con100189', // 法律
    },
  },
  data() {
    return {
      loadingCenter: false,
      cList: [],
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
    goodsInfo() {
      return this.$store.sellingGoodsDetail.sellingGoodsData
    },
  },
  mounted() {
    this.getContentList()
  },
  methods: {
    getContentList() {
      this.$axios
        .get(commonApi.contentList, {
          params: {
            categoryCode: this.categoryCode,
            page: 1,
            limit: 20,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            const arr = res.data.rows.sort(() => {
              return Math.random() - 0.5
            })
            if (arr.length > 2) {
              this.cList = arr.splice(0, 2)
            } else {
              this.cList = arr
            }
          }
        })
    },
    getTime(str) {
      return str.substring(0, 11)
    },
    handleClick(item) {
      // 点击跳转详情
      if (this.isInApp || this.isApplets) {
        let url = ''
        let hide = 0
        if (this.isApplets) {
          this.loadingCenter = true
        }
        switch (item.linkType) {
          // 跳转文章详情
          case 1:
            url = `${domainUrl}found/detail/${item.id}`
            hide = 1
            if (this.isApplets) {
              this.uni.navigateTo({
                url:
                  '/pages/common_son/webview/index?id=' +
                  item.id +
                  '&dt=true&url=found/detail',
              })
            }
            break
          // 跳转内链
          case 2:
            url = `${item.wapRoute}`
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            if (this.isApplets) {
              this.uni.navigateTo({
                url:
                  '/pages/common_son/webview/index?id=' +
                  item.id +
                  '&dt=true&url=found/detail',
              })
            }
            break
          // 跳转外链
          case 3:
            url = item.link
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            if (this.isApplets) {
              this.uni.navigateTo({
                url: '/pages/common_son/link/outLink?url=' + item.link,
              })
            }
            break
          // 跳转图片链接
          case 4:
            url = item.jumpImageUrl
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            alert(123)
            if (this.isApplets) {
              this.uni.navigateTo({
                url:
                  '/pages/common_son/link/imgLink?imgUrl=' + item.jumpImageUrl,
              })
            }
            break
          default:
            url = `${domainUrl}found/detail/${item.id}`
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
      switch (item.linkType) {
        // 跳转文章详情
        case 1:
          this.$router.push({
            path: `/found/detail/${item.id}`,
          })
          break
        // 跳转内链
        case 2:
          this.$router.push({
            path: `${item.wapRoute}`,
          })
          break
        // 跳转外链
        case 3:
          window.location.href = item.link
          break
        // 跳转图片链接
        case 4:
          this.$router.push({
            name: 'img',
            params: {
              url: item.jumpImageUrl,
            },
          })
          break
        default:
          this.$router.push({
            path: `/found/detail/${item.id}`,
          })
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: auto;
  background: #ffffff;
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 20px;
  .c_title {
    height: 56px;
    font-size: 40px;
    color: #1a1a1a;
    letter-spacing: 0;
    margin-bottom: 20px;
  }
  .c_list {
    .c_item {
      border-top: 1px solid #f4f4f4;
    }
    .no_border {
      border: none !important;
    }
    .item1 {
      display: flex;
      justify-content: space-between;
    }
    .item {
      margin-top: 40px;
      padding-bottom: 31px;
      .item_title {
        font-size: 32px;
        color: #222222;
        letter-spacing: 0;
        line-height: 44px;
        margin-bottom: 20px;
        .textOverflow(2);
      }
      .item_author {
        font-size: 22px;
        color: #999999;
        letter-spacing: 0;
        span {
          margin-right: 10px;
        }
      }
      .item_l {
        flex: 1;
        padding: 20px 40px 0 0;
      }
      .item_r {
        width: 240px;
        height: 190px;
        border-radius: 8px;
        overflow: hidden;
      }
      .item_bot_copy {
        margin-top: 24px;
      }
    }
  }
  .btn_im {
    .sp-button {
      width: 100%;
      height: 88px;
      background: #f2f5ff;
      border-radius: 8px;
      font-size: 32px;
      color: #4974f5;
      text-align: center;
    }
  }
}
</style>
