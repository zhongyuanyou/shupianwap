<template>
  <div class="m-store group-store">
    <Header title="团队店铺" :fixed="true" :head-style="styleObject">
      <template #left>
        <div v-if="urlData.isShare !== '1'">
          <my-icon
            class-prefix="spiconfont"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-left: 0.32rem"
            @click.native="onClickLeft"
          />
        </div>
        <div v-else>
          <my-icon
            class-prefix="spiconfont"
            name="xiaochengxuzhuye"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-left: 0.36rem"
            @click.native="gohome"
          />
        </div>
      </template>
      <template v-if="isInApp" #right>
        <my-icon
          class-prefix="spiconfont"
          class="head__icon-share"
          name="fenxiang"
          size="0.4rem"
          color="#1A1A1A"
          style="margin-right: 0.4rem"
          @click.native="handleShare"
        ></my-icon> </template
    ></Header>
    <div class="group-swiper">
      <sp-swipe
        class="my-swiper"
        :autoplay="autoplay"
        :show-indicators="indicators"
      >
        <sp-swipe-item v-for="(item, index) in info.banners" :key="index">
          <a href="javascript:void(0)" class="swiper-box">
            <img :src="item" alt="" />
          </a>
        </sp-swipe-item>
      </sp-swipe>
      <div class="swiper-spaceholder"></div>
    </div>
    <sp-skeleton
      title
      avatar
      avatar-size="1.2rem"
      :row="3"
      :loading="groupInfoLoading"
    >
    </sp-skeleton>
    <div v-if="!groupInfoLoading" class="group-tile">
      <sp-image
        :src="info.teamInfo.img"
        fit="cover"
        round
        height="1.2rem"
        width="1.2rem"
        class="content-left"
      ></sp-image>
      <div class="content-right">
        <div class="tile">{{ info.teamInfo.name }}</div>
        <div class="desc">团队口号：{{ info.teamInfo.profile }}</div>
      </div>
    </div>
    <div v-if="info.mchStoreId" class="company-content" @click="linkMch">
      <sp-image
        :src="
          info.mchLogo ||
          'https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png'
        "
        fit="cover"
        round
        height="0.9rem"
        width="0.9rem"
        class="content-left"
      ></sp-image>
      <div class="tile-content">
        <div class="tile">{{ info.mchName || '' }}</div>
        <div class="level"></div>
      </div>
      <my-icon name="you" size="0.4rem" color="#BBBBBB"></my-icon>
    </div>
    <div class="group-server">
      <div ref="sticky" class="tile">团队服务</div>
      <sp-skeleton :row="3" :loading="groupInfoLoading"> </sp-skeleton>
      <div v-if="!groupInfoLoading" class="server-block">
        <div class="server-block-line1">
          <div class="item">
            <div class="item-content">
              <div class="res">
                <span>{{ info.teamService.personNum }}</span
                ><span class="unit">人</span>
              </div>
              <div class="desc">团队人数</div>
            </div>
            <img
              class="item-img"
              src="https://cdn.shupian.cn/sp-pt/wap/images/20vfp3gnwpfk000.png	"
            />
          </div>
          <div class="item">
            <div class="item-content">
              <div class="res">
                <span>{{ info.teamService.customerNum }}</span
                ><span class="unit">位</span>
              </div>
              <div class="desc">服务客户</div>
            </div>
            <img
              class="item-img"
              src="https://cdn.shupian.cn/sp-pt/wap/images/7lc1ert8stg0000.png"
            />
          </div>
        </div>
        <div class="server-block-tile">客户满意</div>
        <div class="server-block-custinfo">
          <div class="item">
            1分钟响应率：{{ info.teamService.consultResponse }}
          </div>
          <div class="item">
            电话接通率：{{ info.teamService.callThroughRate }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="goodsRecommend.length > 0" class="goods-recommend-wrapper">
      <div class="main-tile">为您推荐</div>
      <div class="tabs">
        <div
          v-for="(item, index) in goodsRecommend"
          :key="index"
          class="tab"
          :class="[active === index ? 'z-active' : '']"
          @click="changeTab(index, item.id)"
        >
          <div class="tab-name">{{ item.name }}</div>
        </div>
      </div>

      <div v-if="info.goods.length > 0 && !goodsLoading" class="recommend">
        <div
          v-for="(item, index) in info.goods"
          :key="index"
          class="recommend-item"
          @click="linkGood(item)"
        >
          <img :src="item.img" class="image" />

          <div class="item-content">
            <div class="tile">{{ item.name }}</div>
            <div
              v-if="Array.isArray(item.tags) && item.tags.length > 0"
              class="tips"
            >
              <div
                v-for="(itemTip, indexTip) in item.tags"
                :key="indexTip"
                class="tip"
              >
                {{ itemTip }}
              </div>
            </div>
            <div class="desc">{{ item.desc }}</div>
            <div class="amount">
              <span>{{ item.price }}</span>
              <span class="amount-unit">元</span>
            </div>
          </div>
        </div>
      </div>
      <sp-skeleton
        v-for="(item, index) of 4"
        :key="index"
        title
        avatar
        :row="3"
        :loading="goodsLoading"
      >
      </sp-skeleton>
    </div>
    <div
      v-if="goodsRecommend.length > 0"
      class="more-recommend"
      @click="toClassifyPage"
    >
      更多优惠
    </div>
    <div v-if="info.planners.length > 0" class="recommend-planner-wrapper">
      <div class="main-tile">推荐规划师</div>
      <div class="recommend-content">
        <div
          v-for="(item, index) in info.planners"
          :key="index"
          class="recommend-item"
          @click="linkPlanner(item)"
        >
          <img class="item-avatar" :src="item.img" />
          <div class="name">{{ item.name }}</div>
          <img
            class="line"
            src="https://cdn.shupian.cn/sp-pt/wap/images/fy75fih34c80000.png"
          />
          <div class="score">薯片分{{ item.score }}</div>
          <div v-if="item.category !== ''" class="desc">
            {{ item.category }}
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="stickyFlag"
        class="group-sticky"
        :style="{
          top: isInApp
            ? `${Number(appInfo.statusBarHeight) / 100 + 1.18}rem`
            : '0.88rem',
        }"
      >
        <div v-if="Object.keys(info.teamInfo).length > 0" class="group-tile">
          <sp-image
            :src="info.teamInfo.img"
            fit="cover"
            round
            height="1.2rem"
            width="1.2rem"
            class="content-left"
          ></sp-image>
          <div class="content-right">
            <div class="tile">{{ info.teamInfo.name }}</div>
            <div class="desc">团队口号：{{ info.teamInfo.profile }}</div>
          </div>
        </div>
        <div class="tabs">
          <div
            class="tab"
            :class="[activeMain === 0 ? 'z-active' : '']"
            @click="changeMainTab(0)"
          >
            主页
          </div>
          <div
            class="tab"
            :class="[activeMain === 1 ? 'z-active' : '']"
            @click="changeMainTab(1)"
          >
            热门推荐
          </div>
        </div>
        <div class="line"></div>
      </div>
    </transition>
    <div class="placeholder"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Swipe, swipeItem, Image, Skeleton } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import { storeApi } from '@/api'
import { setUrlParams } from '@/utils/common'

export default {
  name: 'GroupStore',
  components: {
    Header,
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    [Image.name]: Image,
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      groupInfoLoading: true, // 团队信息loading
      goodsLoading: true, // 商品信息loading
      indicators: true, // 是否需要指示器
      autoplay: 5000,
      active: 0,
      activeMain: 0,
      stickyFlag: false,
      storeId: '', // 768006091074595352
      info: {
        banners: [],
        goods: [],
        teamInfo: {},
        teamService: {},
        planners: [],
      }, // 详情数据
      goodsRecommend: [],
      type: '', // 页面类型
      styleObject: {
        'box-shadow': '0px 1px 0px 0px #f4f4f4',
      },
      urlData: this.$route.query,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    const query = this.$route.query
    if (query.storeId) {
      this.storeId = query.storeId
    } else {
      this.$xToast.error('获取团队店铺信息失败')
      setTimeout(this.$back(), 2000)
      return
    }
    if (query.pageStatus === 'preview') {
      this.type = 'preview'
    }
    window.addEventListener('scroll', this.handleScroll)

    this.getGroupInfoApi()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    changeTab(index, typeid) {
      this.active = index
      this.goodsLoading = true
      // 查询推荐商品
      this.getGoodsApi(typeid)
    },
    changeMainTab(index) {
      if (index === this.activeMain) {
        return
      }
      if (index === 1) {
        this.toClassifyPage()
      }
    },
    onClickLeft() {
      this.$router.back(-1)
    },
    gohome() {
      this.$router.push('/')
    },
    toClassifyPage() {
      // 得到tpeid
      let typeId = ''
      if (this.goodsRecommend.length > 0) {
        typeId = this.goodsRecommend[this.active].id
      }
      this.$router.push({
        path: '/store/groupStoreClassify',
        query: {
          active: this.active,
          storeId: this.storeId,
          typeId,
          type: this.type,
        },
      })
    },
    handleScroll() {
      // 获得团队服务距离顶部高度
      const top = this.$refs.sticky.getBoundingClientRect().top
      if (top < 220) {
        this.stickyFlag = true
      } else {
        this.stickyFlag = false
      }
    },
    async getGroupInfoApi() {
      try {
        const params = {
          storeId: this.storeId,
          ignoreDataScope: 'goods',
          type: this.type,
        }
        const { code, data, message } = await this.$axios.get(
          storeApi.mchStoreInfo,
          { params }
        )
        if (code !== 200) {
          throw new Error(message)
        }
        if (this.isInApp) {
          this.mdAppViewScreen(data)
        }
        data.planners.forEach((item) => {
          if (item) {
            this.mdPlannerStore(item)
          }
        })
        // 赋值查询团队信息
        this.info = data
        // 处理 bannber 为空情况
        if (this.info.banners.length === 0) {
          this.info.banners.push(
            'https://cdn.shupian.cn/sp-pt/wap/images/29nq2m9p6pno000.jpg'
          )
        }
        this.groupInfoLoading = false
        const res = await this.$axios.post(storeApi.recommendGoodsClassify, {
          goodsRecommend: data.goodsRecommend,
          storeId: this.storeId,
          type: this.type,
        })
        if (res.code === 200) {
          this.goodsRecommend = res.data
        }
        // 这里添加查询商品分类接口
        if (this.goodsRecommend.length !== 0) {
          const typeId = this.goodsRecommend[0].id
          this.getGoodsApi(typeId)
        } else {
          this.goodsLoading = false
        }
      } catch (e) {
        if (this.info.banners.length === 0) {
          this.info.banners.push(
            'https://cdn.shupian.cn/sp-pt/wap/images/29nq2m9p6pno000.jpg'
          )
        }
        this.groupInfoLoading = false
        this.$xToast.error(e.message)
      }
    },
    async getGoodsApi(typeId) {
      try {
        const params = {
          storeId: this.storeId,
          typeId,
          page: 1,
          limit: 4,
          type: this.type,
        }
        const { code, data, message } = await this.$axios.post(
          storeApi.recommendGoods,
          params
        )
        if (code !== 200) {
          throw new Error(message)
        }
        const goods = Array.isArray(data.records) ? data.records : []

        this.info.goods = goods.filter((item) => {
          return item.state === 1
        })
        this.goodsLoading = false
      } catch (e) {
        this.$xToast.error(e.message)
        this.info.goods = []
        this.goodsLoading = false
      }
    },
    linkMch() {
      if (this.type === 'preview') {
        return
      }
      this.$router.push({
        path: '/store/merchantsStore',
        query: {
          storeId: this.info.mchStoreId,
        },
      })
    },
    linkGood(item) {
      if (this.type === 'preview') {
        return
      }
      if (item.productType === 'PRO_CLASS_TYPE_TRANSACTION') {
        this.$router.push({
          path: '/detail/transactionDetails',
          query: {
            type: item.typeCode,
            productId: item.id,
          },
        })
      } else {
        this.$router.push({
          path: '/detail',
          query: {
            productId: item.id,
          },
        })
      }
    },
    linkPlanner(item) {
      if (this.type === 'preview') {
        return
      }
      // 处理规划师展位点击
      window.spptMd.spptTrackRow('p_plannerBoothClick', {
        track_code: this.isInApp ? 'SPP001152' : 'SPW000151',
        planner_name: item.name,
        crisps_fraction: item.point,
      })
      this.$router.push({
        path: '/planner/detail',
        query: {
          mchUserId: item.plannerId,
        },
      })
    },
    handleShare() {
      if (this.type === 'preview') {
        return
      }
      if (this.isInApp) {
        const url = window && window.location.href
        const sharedUrl = setUrlParams(url, { isShare: 1 })
        console.log('sharedUrl:', sharedUrl)
        this.$appFn.dggShare(
          {
            image:
              'https://cdn.shupian.cn/sp-pt/wap/images/2tmwcm165ma0000.png',
            title: '团队店铺',
            subTitle: `优选团队 - ${this.info.teamInfo.name}的团队店铺`,
            url: sharedUrl,
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast.show({
                message: '分享失败！',
                duration: 1500,
                forbidClick: false,
                icon: 'toast_ic_remind',
              })
            }
          }
        )
        return
      }
      this.shareOptions = [{ name: '复制链接', icon: 'link' }]
      this.showShare = true
    },
    mdAppViewScreen(info) {
      // 处理埋点逻辑
      window.spptMd.spptTrackRow('$AppViewScreen', {
        track_code: 'SPP001150',
        content_type: '店铺',
        planner_shop_id: info.id,
      })
    },
    mdPlannerStore(info) {
      // 处理曝光埋点
      window.spptMd.spptTrackRow('p_plannerBoothVisit', {
        track_code: this.isInApp ? 'SPP001151' : 'SPW000150',
        planner_name: info.name,
        crisps_fraction: info.score,
      })
    },
  },
  head() {
    return {
      title: '',
      meta: [
        {
          name: 'spptmd-track_code',
          content: this.isInApp ? 'SPP000019' : 'SPW000019',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.m-store.group-store {
  ::v-deep .sp-skeleton {
    margin: 16px 0 0 0;
  }
  .group-swiper {
    width: 100%;
    height: 500px;
    position: relative;
    .swiper-box {
      display: block;
      width: 100%;
      height: 500px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .my-swiper {
      ::v-deep.sp-swipe__indicators {
        bottom: 40px;
      }
    }
    .swiper-spaceholder {
      position: absolute;
      width: 100%;
      height: 24px;
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
      bottom: 0;
      left: 0;
      z-index: 1;
      background: #fff;
    }
  }
  .group-tile {
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    padding: 0 40px;
    .content-left {
      margin-right: 32px;
    }
    .content-right {
      flex: 1;
      .tile {
        color: #222222;
        font-weight: bold;
        font-size: 44px;
        line-height: 62px;
        margin-bottom: 13px;
      }
      .desc {
        color: #999999;
        font-size: 26px;
        line-height: 37px;
      }
    }
  }
  .company-content {
    margin: 0 40px;
    margin-top: 36px;
    height: 154px;
    padding: 26px 32px 30px 32px;
    display: flex;
    align-items: center;
    background: #f8f8f8;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    .content-left {
      margin-right: 20px;
    }
    .tile-content {
      margin-right: 32px;
      .tile {
        .mixin-text-oneoverflow();
        width: 424px;
        color: #555555;
        font-size: 32px;
        line-height: 45px;
      }
    }
  }
  .group-server {
    margin-top: 56px;
    padding: 0 40px;
    .tile {
      font-size: 40px;
      line-height: 56px;
      font-weight: bold;
      color: #222222;
    }
    .server-block {
      margin-top: 32px;
      height: 348px;
      background: #ffffff;
      border: 1px solid #dddddd;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      padding: 40px 40px 34px 40px;
      &-line1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          width: 285px;
          height: 140px;
          padding: 14px 22px 19px 32px;
          background: #f8f8f8;
          border-radius: 8px;
          position: relative;
          &-content {
            display: flex;
            flex-direction: column;
            .res {
              font: 56px/74px Bebas;
              color: #222222;
              .unit {
                font: bold 24px/33px PingFangSC;
                color: #999;
              }
            }
            .desc {
              color: #999999;
              font-size: 24px;
              line-height: 33px;
            }
          }
          &-img {
            position: absolute;
            bottom: 22px;
            right: 22px;
            width: 80px;
            height: 80px;
            object-fit: cover;
          }
        }
      }
      &-tile {
        margin-top: 37px;
        color: #222222;
        font-size: 32px;
        line-height: 45px;
        font-weight: bold;
      }
      &-custinfo {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        .item {
          font-size: 28px;
          line-height: 40px;
          color: #222222;
        }
      }
    }
  }
  .goods-recommend-wrapper {
    padding: 0 40px;
    margin-top: 56px;
    .main-tile {
      font-size: 40px;
      color: #222222;
      font-weight: bold;
      height: 56px;
    }
    .tabs {
      margin-top: 8px;
      height: 80px;
      display: flex;
      align-items: center;
      .tab {
        position: relative;
        font-size: 30px;
        line-height: 30px;
        color: #999999;
        margin-right: 56px;
        max-width: 30%;
        &-name {
          text-align: center;
          .mixin-text-oneoverflow();
        }
        &.z-active {
          color: #222222;
          font-weight: bold;
          font-size: 32px;
          line-height: 32px;
          color: #222222;
        }
        &.z-active::after {
          position: absolute;
          content: '';
          width: 28px;
          height: 6px;
          background: #4974f5;
          border-radius: 3px;
          transform: translate(-50%, -50%);
          left: 50%;
          bottom: -16px;
        }
      }
    }
    .recommend {
      margin-top: 12px;
      &-item {
        padding: 22px 0 28px 0;
        display: flex;
        align-items: flex-start;
        .image {
          height: 160px;
          width: 160px;
          margin-right: 28px;
          border-radius: 12px;
          object-fit: cover;
        }

        .item-content {
          flex: 1;
          width: 482px;
          .tile {
            font-size: 32px;
            line-height: 42px;
            font-weight: bold;
            color: #222222;
          }
          .tips {
            margin-top: 12px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .tip {
              height: 32px;
              line-height: 32px;
              background: #f0f2f5;
              border-radius: 4px;
              font-size: 22px;
              color: #5c7499;
              text-align: center;
              margin-right: 12px;
              padding: 0 4px;
              margin-bottom: 5px;
            }
          }
          .desc {
            margin-top: 11px;
            font-size: 22px;
            color: #1a1a1a;
            .mixin-text-oneoverflow();
          }
          .amount {
            margin-top: 20px;
            color: #ec5330;
            font-size: 36px;
            font-weight: bold;
            span {
              display: inline-block;
            }
            &-unit {
              margin-left: -10px;
              font-size: 22px;
            }
          }
        }
      }
    }
  }
  .more-recommend {
    margin: 20px 40px 0 40px;
    height: 96px;
    line-height: 96px;
    text-align: center;
    background: #f2f5ff;
    border-radius: 8px;
    font-size: 32px;
    color: #4974f5;
    font-weight: bold;
  }
  .recommend-planner-wrapper {
    margin-top: 56px;
    padding: 0 40px;
    .main-tile {
      height: 56px;
      font-size: 40px;
      font-weight: bold;
      color: #222222;
    }
    .recommend-content {
      margin-top: 32px;
      height: 330px;
      border: 1px solid #dddddd;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      padding: 40px 40px 35px 40px;
      box-sizing: border-box;
      display: flex;
      overflow-y: auto;
      .recommend-item {
        display: flex;
        align-items: center;
        flex-direction: column;
        &:first-child {
          margin-right: 43px;
        }
        &:nth-child(2) {
          margin-right: 43px;
        }
        .item-avatar {
          width: 96px;
          height: 96px;
          border-radius: 100%;
          margin-bottom: 26px;
          object-fit: cover;
        }
        .name {
          text-align: center;
          width: 168px;
          height: 37px;
          font-size: 26px;
          color: #222222;
          font-weight: bold;
          .mixin-text-oneoverflow();
        }
        .line {
          width: 168px;
          height: 4px;
          margin-top: 8px;
        }
        .score {
          text-align: center;
          margin-top: 10px;
          width: 168px;
          height: 33px;
          font-size: 24px;
          color: #222222;
          font-weight: bold;
          .mixin-text-oneoverflow();
        }
        .desc {
          text-align: center;
          margin-top: 7px;
          width: 168px;
          height: 33px;
          font-size: 24px;
          color: #999999;
          font-weight: bold;
          .mixin-text-oneoverflow();
        }
      }
    }
  }
  .placeholder {
    background: #fff;
    height: 64px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .group-sticky {
    position: fixed;
    width: 100%;
    left: 0;
    z-index: 99;
    background: #fff;
    .group-tile {
      margin-top: 40px;
    }
    .tabs {
      padding: 0 40px;
      margin-top: 20px;
      height: 80px;
      display: flex;
      align-items: center;
      .tab {
        position: relative;
        font-size: 30px;
        line-height: 30px;
        color: #999999;
        margin-right: 56px;
        &.z-active {
          color: #222222;
          font-weight: bold;
          font-size: 32px;
          line-height: 32px;
          color: #222222;
        }
        &.z-active::after {
          position: absolute;
          content: '';
          width: 28px;
          height: 6px;
          background: #4974f5;
          border-radius: 3px;
          transform: translate(-50%, -50%);
          left: 50%;
          bottom: -16px;
        }
      }
    }
    .line {
      width: 100%;
      background: #f4f4f4;
      height: 1px;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .empty {
    text-align: center;
    font-size: 26px;
    color: #999;
    img {
      width: 340px;
      height: 340px;
      margin: 0 auto;
    }
  }
}
</style>
