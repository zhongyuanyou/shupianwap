<template>
  <div class="con">
    <!--S banner-->
    <sp-pull-refresh
      v-model="refreshing"
      style="min-height: calc(100vh - 88px)"
      @refresh="onRefresh"
    >
      <div
        v-if="banner.length && banner[0].sortMaterialList"
        class="con_banner"
      >
        <sp-swipe
          :autoplay="3000"
          :loop="true"
          class="con_banner_list"
          @change="onChange"
        >
          <sp-swipe-item
            v-for="(image, index) in banner[0].sortMaterialList"
            :key="index"
            class="con_banner_list_item"
            @click="
              isInApp
                ? handleImage(image)
                : adJumpHandleMixin(image.materialList[0])
            "
          >
            <sp-image
              height="2.58rem"
              fit="fill"
              :src="image.materialList[0].materialUrl"
            />
          </sp-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              <div
                v-for="(item, index) in banner[0].sortMaterialList"
                :key="index"
                :class="[
                  'custom-indicator_item',
                  { active_item: current === index },
                ]"
              ></div>
            </div>
          </template>
        </sp-swipe>
      </div>
      <!--E banner-->
      <!--S 列表-->
      <div class="con_list">
        <sp-list
          v-if="infoList.length"
          v-model="loading"
          :finished="finished"
          offset="0"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <sp-cell v-for="(item, index) in infoList" :key="index">
            <CardItem
              :favour="item"
              :image="item.imageUrl ? { src: item.imageUrl } : null"
              :layout="item.listType === 1 ? true : false"
              @click="handleClick(item, index)"
            />
          </sp-cell>
        </sp-list>
        <div v-if="!infoList.length" class="no-data">
          <img :src="$ossImgSet(340, 340, '3py8wghbsaq000.png')" alt="" />
          <p>暂无数据</p>
        </div>
      </div>
    </sp-pull-refresh>
    <!--E 列表-->
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Swipe,
  SwipeItem,
  Lazyload,
  PullRefresh,
  List,
  Cell,
  Image,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import CardItem from '~/components/common/cardItem/CardItem'
import { foundApi } from '@/api'
import adJumpHandle from '~/mixins/adJumpHandle'
import { domainUrl } from '~/config/index'
Vue.use(Lazyload)
export default {
  name: 'Con',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    CardItem,
  },
  mixins: [adJumpHandle],
  props: {
    banner: {
      type: Array,
      default: () => {
        return []
      },
    },
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    refreshStatus: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    categoryCode: {
      type: String,
      default: '',
    },
    activeTab: {
      type: Number || String,
      default: () => {
        return 0
      },
    },
  },
  data() {
    return {
      current: 0,
      refreshing: this.refreshStatus,
      loading: false,
      finished: false,
      limit: 10, // 每页显示条数
      page: 2, // 当前页
      infoList: this.list, // 资讯列表
      bannerList: this.banner, // 广告集合
      code: this.categoryCode,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
    }),
  },
  watch: {
    banner(newVal) {
      this.bannerList = newVal
    },
    list(newVal) {
      this.infoList = newVal
    },
    categoryCode(newVal) {
      this.code = newVal
    },
    refreshStatus(newVal) {
      this.refreshing = newVal
    },
    activeTab() {
      this.loading = false
      this.finished = false
      this.page = 2
    },
  },
  methods: {
    onChange(index) {
      // 切换轮播
      this.current = index
    },
    handleClick(item, index) {
      // 点击
      if (this.isInApp) {
        let url = ''
        let hide = 0
        switch (item.linkType) {
          // 跳转文章详情
          case 1:
            url = `${domainUrl}/found/detail/${item.id}`
            hide = 1
            break
          // 跳转内链
          case 2:
            url = `${item.wapRoute}`
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            break
          // 跳转外链
          case 3:
            url = item.link
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            break
          // 跳转图片链接
          case 4:
            url = item.jumpImageUrl
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            break
          default:
            url = `${domainUrl}/found/detail/${item.id}`
            hide = 1
            break
        }
        const iosRouter =
          '{"path":"CPSCustomer:CPSCustomer/CPSBaseWebViewController///push/animation","parameter":{"urlstr":"' +
          `${url}` +
          '","isHideNav":' +
          hide +
          ',"emptyTitle":"标题"},"isLogin":"1","version":"1.0.0"}'
        const adRouter =
          '{"path":"/common/android/SingleWeb","parameter":{"urlstr":"' +
          `${url}` +
          '","isHideNav":' +
          hide +
          ',"emptyTitle":"标题"},"isLogin":"1","version":"1.0.0"}'
        this.$appFn.dggJumpRoute(
          { iOSRouter: iosRouter, androidRouter: adRouter },
          (res) => {}
        )
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
      // this.$router.push(`/found/detail/${item.id}`)
    },
    onRefresh() {
      this.page = 2
      this.loading = false
      this.finished = false
      this.$emit('refresh')
    },
    async onLoad() {
      // 上滑加载更多资讯列表
      const page = this.page++
      const params = {
        categoryCode: this.code,
        limit: this.limit,
        page,
        platformCode: this.isInApp
          ? this.appInfo.platformCode
          : 'COMDIC_PLATFORM_CRISPS',
        terminalCode: this.isInApp
          ? 'COMDIC_TERMINAL_APP'
          : 'COMDIC_TERMINAL_WAP',
      }
      const res = await this.$axios.get(foundApi.infoList, { params })
      if (res.code === 200) {
        if (res.data.information_list.length) {
          this.loading = false
          this.finished = false
          this.infoList = this.infoList.concat(res.data.information_list)
        } else {
          this.finished = true
        }
      }
    },
    handleImage(item) {
      // 点击图片
      this.$appFn.dggJumpRoute({
        iOSRouter: item.materialList[0].iosLink,
        androidRouter: item.materialList[0].androidLink,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.con {
  /deep/.sp-cell {
    padding: 40px 32px;
  }
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  &_banner {
    width: 100%;
    padding: 0 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 32px;
    border-radius: 12px;
    overflow: hidden;
    &_list {
      width: 100%;
      height: 284px;
      border-radius: 12px;
      overflow: hidden;
      &_item {
        width: 100%;
        height: 258px;
        background-color: #f8f8f8;
        overflow: hidden;
        /deep/ .sp-image__img {
          width: 100%;
          border-radius: 12px;
        }
      }
      .custom-indicator {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: row;
        &_item {
          width: 20px;
          height: 6px;
          background: #222222;
          opacity: 0.1;
          border-radius: 3px;
          margin-left: 8px;
          &:first-child {
            margin-left: 0;
          }
        }
        .active_item {
          opacity: 1;
        }
      }
    }
  }
  &_list {
    margin-top: 40px;
    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      img {
        width: 340px;
        height: 340px;
      }
      > p {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
    }
  }
}
</style>
