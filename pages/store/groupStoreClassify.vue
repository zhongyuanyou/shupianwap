<template>
  <!-- 团队店铺二级分类 -->
  <div class="m-store group-store">
    <Header title="团队店铺" :fixed="true" />
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
    <div class="tabs-wrapper">
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
    <div v-if="info.goodsRecommend.length > 0" class="goods-recommend-wrapper">
      <div class="tabs">
        <div
          v-for="(item, index) in info.goodsRecommend"
          :key="index"
          class="tab"
          :class="[active === index ? 'z-active' : '']"
          @click="changeTab(index, item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="recommend">
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in goods"
            :key="index"
            class="recommend-item"
            @click="linkGood(item)"
          >
            <img :src="item.img" class="image" />

            <div class="item-content">
              <div class="tile">{{ item.name }}</div>
              <div class="tips">
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
                <div>{{ item.price }}</div>
                <div class="amount-unit">元</div>
              </div>
            </div>
          </div></sp-list
        >
      </div>
    </div>
    <div v-else class="empty">
      <img src="https://cdn.shupian.cn/sp-pt/wap/images/32lnvdx3omo0000.png" />
      <p>抱歉,未找到相关结果</p>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
import { Swipe, swipeItem, Image, List } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import { storeApi } from '@/api'

export default {
  name: 'GroupStore',
  components: {
    Header,
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    [Image.name]: Image,
    [List.name]: List,
  },
  data() {
    return {
      indicators: true, // 是否需要指示器
      autoplay: 5000,
      active: 0, // 活动分类
      activeMain: 1, // 页面分类
      page: 1,
      limit: 10,
      error: false,
      loading: false,
      finished: false,
      storeId: '',
      info: {
        teamInfo: {},
        goodsRecommend: []
      },
      goods: [],
      typeId: '',
    }
  },
  mounted() {
    const query = this.$route.query
    if (query.active === 0 || query.active) {
      this.active = Number(this.$route.query.active)
    }
    this.storeId = query.storeId
    this.typeId = query.typeId
    this.getGroupInfoApi()
  },
  methods: {
    onLoad() {
      this.getGoodsApi()
    },
    changeTab(index, item) {
      this.active = index
      this.initTab(item)
      // 查询推荐商品
      this.onLoad()
    },
    initTab(item) {
      this.loading = true
      this.finished = false
      this.error = false
      this.page = 1
      this.goods = []
      this.typeId = item.id
    },
    changeMainTab(index) {
      if (index === this.activeMain) {
        return
      }
      if (index === 0) {
        this.$router.push({
          path: '/store/groupStore',
          query: { storeId: this.storeId },
        })
      }
    },
    async getGoodsApi() {
      try {
        const params = {
          storeId: this.storeId,
          typeId: this.typeId,
          page: this.page,
          limit: this.limit,
          type: this.type || '',
        }
        const { code, data, message } = await this.$axios.post(
          storeApi.recommendGoods,
          params
        )
        if (code !== 200) {
          throw new Error(message)
        }
        if (Array.isArray(data.records)) {
          this.goods.push(...data.records)
        } else {
          this.goods = []
        }
        this.page++
        if (data.totalPage === undefined || this.page > data.totalPage) {
          this.finished = true
        }
        this.loading = false
      } catch (e) {
        this.$xToast.error(e.message)
        this.error = true
        this.goods = []
        this.loading = false
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
        this.info = data
      } catch (e) {
        this.$xToast.error(e.message)
        setTimeout(this.$back(), 2000)
      }
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
  },
}
</script>

<style lang="less" scoped>
.m-store.group-store {
  .group-tile {
    margin-top: 37px;
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
  .tabs-wrapper {
    margin-top: 30px;
    .tabs {
      padding: 0 40px;
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
    margin-top: 12px;
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
    left: 0;
    top: 88px;
    z-index: 99;
    background: #fff;
    .group-tile {
      margin-top: 40px;
    }
    .line {
      width: 100%;
      background: #f4f4f4;
      height: 1px;
    }
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
