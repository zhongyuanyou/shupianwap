<template>
  <div class="m-store group-store">
    <Header title="团队店铺" />
    <div class="group-swiper">
      <sp-swipe
        class="my-swiper"
        :autoplay="autoplay"
        :show-indicators="indicators"
      >
        <sp-swipe-item v-for="(item, index) in info.banners" :key="index">
          <a href="javascript:void(0)" class="swiper-box">
            <img :src="item + $ossImgSet(750, 552)" alt="" />
          </a>
        </sp-swipe-item>
      </sp-swipe>
      <div class="swiper-spaceholder"></div>
    </div>
    <div class="group-tile">
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
      <div class="server-block">
        <div class="server-block-line1">
          <div class="item">
            <div class="item-res">
              <span>{{ info.teamService.personNum }}</span
              ><span class="unit">人</span>
            </div>
            <div class="item-desc">团队人数</div>
          </div>
          <div class="item">
            <div class="item-res">
              <span>{{ info.teamService.customerNum }}</span
              ><span class="unit">位</span>
            </div>
            <div class="item-desc">服务客户</div>
          </div>
          <div class="item">
            <div class="item-res">
              <span>{{ info.teamService.maintenanceNum }}</span
              ><span class="unit">人</span>
            </div>
            <div class="item-desc">维护商品</div>
          </div>
        </div>
        <div class="server-block-tile">客户满意</div>
        <div class="server-block-custinfo">
          <div class="item">
            3分钟响应率：{{ info.teamService.consultResponse }}
          </div>
          <div class="item">
            电话接通率：{{ info.teamService.callThroughRate }}
          </div>
        </div>
      </div>
    </div>
    <div id="goodRecommend" class="goods-recommend-wrapper">
      <div class="main-tile">为您推荐</div>
      <div class="tabs">
        <div
          v-for="(item, index) in info.goodsRecommend"
          :key="index"
          class="tab"
          :class="[active === index ? 'z-active' : '']"
          @click="changeTab(index, item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <div v-if="info.goods.length > 0" class="recommend">
        <div
          v-for="(item, index) in info.goods"
          :key="index"
          class="recommend-item"
          @click="linkGood(item)"
        >
          <img :src="item.img" class="image" />

          <div class="item-content">
            <div class="tile">{{ item.name }}</div>
            <div class="tips">
              <div
                v-for="(itemTip, indexTip) in item.tips"
                :key="indexTip"
                class="tip"
              >
                {{ itemTip }}
              </div>
            </div>
            <div class="desc">{{ item.desc }}</div>
            <div class="amount">
              <div>{{ item.price }}</div>
              <div class="amount-unit">元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="more-recommend" @click="toClassifyPage">更多优惠</div>
    <div class="recommend-planner-wrapper">
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
          <div class="desc">{{ item.category }}</div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="stickyFlag" class="group-sticky">
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
import { Swipe, swipeItem, Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import { storeApi } from '@/api'

export default {
  name: 'GroupStore',
  components: {
    Header,
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    [Image.name]: Image,
  },
  data() {
    return {
      indicators: true, // 是否需要指示器
      autoplay: 5000,
      active: 0,
      activeMain: 0,
      stickyFlag: false,
      storeId: '768006091074595352',
      info: {
        banners: [],
        goodsRecommend: [],
        goods: [],
        teamInfo: {},
        teamService: {},
        planners: [],
      }, // 详情数据
    }
  },
  mounted() {
    const query = this.$route.query
    if (query.storeId) {
      this.storeId = query.storeId
    } else {
      /*
      this.$xToast.error('获取团队店铺信息失败')
      setTimeout(this.$back(),2000)
      return
      */
    }
    if (query.active === 0 || query.active) {
      this.active = Number(query.active)
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
      // 查询推荐商品
      this.getGoodsApi(typeid)
    },
    changeMainTab(index) {
      if (index === this.activeMain) {
        return
      }
      if (index === 1) {
        this.$router.push({
          path: '/store/groupStoreClassify',
          query: {
            active: this.active,
          },
        })
      }
    },
    toClassifyPage() {
      this.$router.push({
        path: '/store/groupStoreClassify',
        query: {
          active: this.active,
        },
      })
    },
    handleScroll() {
      // 获得团队服务距离顶部高度
      const top = this.$refs.sticky.getBoundingClientRect().top
      if (top < 20) {
        this.stickyFlag = true
      } else {
        this.stickyFlag = false
      }
    },
    async getGroupInfoApi() {
      try {
        const params = {
          storeId: this.storeId,
        }
        const { code, data, message } = await this.$axios.get(
          storeApi.mchStoreInfo,
          { params }
        )
        if (code !== 200) {
          throw new Error(message)
        }
        // 商品只取4条记录
        const goods = data.goods.slice(0, 4)
        data.goods = goods
        this.info = data
        return data
      } catch (e) {
        this.$xToast.error(e.message)
        // setTimeout(this.$back(), 2000)
      }
    },
    async getGoodsApi(typeId) {
      try {
        const params = {
          storeId: this.storeId,
          typeId,
        }
        const { code, data, message } = await this.$axios.post(
          storeApi.recommendGoods,
          params
        )
        if (code !== 200) {
          throw new Error(message)
        }
        const goods = Array.isArray(data.records)
          ? data.records.slice(0, 4)
          : []
        this.info.goods = goods
      } catch (e) {
        this.$xToast.error(e.message)
        this.info.goods = []
      }
    },
    linkMch() {
      this.$router.push({
        path: '/store/merchantsStore',
        query: {
          storeId: this.info.mchStoreId,
        },
      })
    },
    linkGood(item) {
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
      this.$router.push({
        path: '/planner/detail',
        query: {
          mchUserId: item.plannerId,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.m-store.group-store {
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
    align-items: center;
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
        .textOverflow(2);
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
    border-radius: 12px;
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
      padding: 50px 40px 54px 40px;
      &-line1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          &-res {
            font: 56px/74px bold Bebas;
            color: #222222;
            .unit {
              font: 24px/33px bold PingFangSC;
            }
            margin-bottom: 3px;
          }
          &-desc {
            color: #999999;
            font-size: 24px;
            line-height: 33px;
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
          border-radius: 8px;
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
            }
          }
          .desc {
            margin-top: 16px;
            font-size: 22px;
            color: #1a1a1a;
          }
          .amount {
            margin-top: 20px;
            color: #ec5330;
            font-size: 36px;
            font-weight: bold;
            div {
              display: inline-block;
            }
            &-unit {
              margin-left: 2px;
              font-size: 22px;
              font-weight: normal;
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
      align-items: center;
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
    height: 64px;
    padding-bottom: constant(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-top);
  }
  .group-sticky {
    position: fixed;
    width: 100%;
    left: 0;
    top: 88px;
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
}
</style>
