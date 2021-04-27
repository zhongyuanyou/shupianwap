<template>
  <div class="coupon-page">
    <!-- header头部 start -->
    <Header title="我的优惠券" @click="$router.push({ path: '/my' })" />
    <!-- header头部 end -->
    <!-- tabs切换 start -->
    <sp-tabs v-model="couponType" @click="changeTab">
      <!-- :title="item.title+'('+`${}`+')'" -->
      <sp-tab :title="'未使用' + '(' + `${notUsedCount}` + ')'"></sp-tab>
      <sp-tab :title="'已使用' + '(' + `${usedCount}` + ')'"></sp-tab>
      <sp-tab :title="'已失效' + '(' + `${invalidCount}` + ')'"></sp-tab>
    </sp-tabs>
    <!-- tabs切换 end -->
    <!-- 优惠券列表 start -->
    <div
      class="coupon_list"
      :class="responseData.length === 0 ? 'not_coupon_data' : ''"
    >
      <div
        v-for="(item, index) in responseData"
        :key="index"
        :class="couponType === 0 ? 'notUse' : 'haveUse'"
        class="coupon_item"
      >
        <div class="item-lf">
          <div class="coupon_price">
            {{ item.marketingCouponVO.reducePrice }}
          </div>
          <div class="can_use">
            满{{ item.marketingCouponVO.fullPrice }}元可用
          </div>
        </div>
        <div class="item-rt">
          <!-- 气泡组件 start -->
          <!-- <Popover
            :ref="'myPop' + index"
            :text="item.remark"
            @closepop="closeBox"
          /> -->
          <!-- 气泡组件 end-->
          <!-- 右侧显示 start-->
          <div
            class="sign"
            :class="
              couponType === 1
                ? 'have_use_icon'
                : couponType === 0
                ? ''
                : 'lose'
            "
          ></div>
          <div class="title" @click="goDetailPage(item)">
            {{ item.marketingCouponVO.couponName }}
          </div>
          <div ref="textpro" class="content">
            {{
              item.marketingCouponVO.useType === 1
                ? '全品类通用'
                : item.marketingCouponVO.useType === 2
                ? '限定部分类别产品使用'
                : '置顶产品使用'
            }}
          </div>
          <div
            class="date"
            :class="item.marketingCouponVO.showColorTime ? 'expiredate' : ''"
          >
            {{ item.marketingCouponVO.serviceLife }}
          </div>
          <!-- 右侧显示 end-->
        </div>
      </div>
      <div v-show="responseData.length === 0" class="not_coupon">
        <img :src="imgAddress" alt="" />
        <span>暂无优惠券</span>
      </div>
    </div>

    <!-- 优惠券列表 end -->
    <!-- 515上线客服跳转客服 现在暂时留着-->
    <p v-if="couponType == 2" class="coupon_tip">
      当优惠券超出使用时间范围时，该优惠券即会失效。失效超过180天
      的优惠券会被系统自动清除，若有疑惑，请<span>联系客服</span>
    </p>
    <LoadingCenter v-show="loading" />
  </div>
</template>

<script>
import { Button, RadioGroup, Radio, Cell, Tab, Tabs } from '@chipspc/vant-dgg'
// import Popover from '~/components/common/popover/popover_old.vue'
import Header from '@/components/common/head/header'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import { coupon } from '@/api/index'
export default {
  components: {
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Header,
    // Popover,
    LoadingCenter,
  },
  data() {
    return {
      imgAddress: 'https://cdn.shupian.cn/sp-pt/wap/1d02v37qg6gw000.png',
      loading: false,
      usedCount: 0, // 已使用
      notUsedCount: 0, // 未使用
      invalidCount: 0, // 已过期
      showColorTime: true, // 是否显示红色
      nowTimeStamp: 0, // 时间戳
      responseData: [], // 请求成功返回数据
      // 请求数据格式
      formData: {
        orderByWhere: 'log_receive_time=desc;',
        findType: 2,
        userId: this.$store.state.user.userId,
        limit: '100',
        page: '1',
      }, // 请求数据
      indexNum: 0,
      couponType: 0, // 优惠券类型 未使用 已使用 已失效
      isShow: false, // 控制显示气泡
      // tabs栏
      tabs: [
        {
          name: 0,
          title: '未使用',
        },
        {
          name: 1,
          title: '已使用',
        },
        {
          name: 2,
          title: '已失效',
        },
      ],
    }
  },
  mounted() {
    this.nowTimeStamp = new Date().getTime()
    this.items = this.itemsData
    this.getInitData()
  },
  methods: {
    getInitData() {
      coupon
        .getCouponList({ axios: this.$axios }, this.formData)
        .then((result) => {
          this.responseData = result.marketingCouponLogList
          for (let i = 0, length = this.responseData.length; i < length; i++) {
            let useTime = this.responseData[i].marketingCouponVO.serviceLife
            useTime = useTime.slice(11)
            console.log('useTime', useTime)
            const thisTime = useTime.split('.').join('-')
            const time = new Date(thisTime).getTime()
            if (time - this.nowTimeStamp < 172800000) {
              this.responseData[
                i
              ].marketingCouponVO.showColorTime = this.showColorTime
            }
          }
          this.usedCount = result.usedCount
          this.notUsedCount = result.notUsedCount
          this.invalidCount = result.invalidCount
          this.loading = false
        })
        .catch((e) => {
          if (e.code !== 200) {
            this.responseData = []
            console.log(e)
          }
        })
    },
    changeTab(name, title) {
      // this.$refs['myPop' + this.indexNum][0].isShow = false
      const type = this.couponType
      this.loading = true
      if (type === 0) {
        this.formData.findType = 2
        this.formData.orderByWhere = 'log_receive_time=desc;'
        this.getInitData()
      } else if (type === 1) {
        this.formData.findType = 3
        this.formData.orderByWhere = 'log_use_time=desc;'
        coupon
          .getCouponList({ axios: this.$axios }, this.formData)
          .then((result) => {
            this.responseData = result.marketingCouponLogList
            this.loading = false
          })
          .catch((e) => {
            if (e.code !== 200) {
              this.responseData = []
              console.log(e)
            }
          })
      } else if (type === 2) {
        this.formData.orderByWhere = 'effectEnd=desc;'
        this.formData.findType = 4
        coupon
          .getCouponList({ axios: this.$axios }, this.formData)
          .then((result) => {
            this.responseData = result.marketingCouponLogList
            this.loading = false
          })
          .catch((e) => {
            if (e.code !== 200) {
              this.responseData = []
              console.log(e)
            }
          })
      }
    },

    // 进入详情
    goDetailPage(item) {
      if (item.useType === 1) {
        // 全服务品类列表
        // this.$router.push({ path: '/' })
      } else if (item.useType === 2) {
        // 分类列表
        // this.$router.push({ path: '/' })
      } else {
        // 商品列表
        // this.$router.push({ path: '/' })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.lose {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/8a099vjhmbc0000.png');
}
.have_use_icon {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/29a165hg8w4k000.png');
}
.haveUse {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/8j18z03j8c00000.png');
}
.notUse {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png');
}
.not_coupon_data {
  background: #ffffff !important;
}
.coupon-page {
  .coupon_list {
    width: 100%;
    padding: 12px 40px 12px 40px;
    height: auto;
    background: #f8f8f8;
    .coupon_item {
      width: 670px;
      height: 212px;
      // background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png');
      background-size: 100% 100%;
      margin: 24px 0;
      display: flex;
      position: relative;
      box-shadow: 0px 0.04rem 0.16rem 0px rgba(0, 0, 0, 0.05);
      .item-lf {
        width: 201px;
        height: 212px;
        .coupon_price {
          //   height: 67px;
          font-size: 72px;
          font-family: Bebas;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          padding-top: 27px;
        }
        .can_use {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          padding-top: 23px;
        }
      }
      .item-rt {
        padding-left: 24px;
        height: auto;
        flex: 1;
        .title {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 32px;
          margin: 36px 0 23px 0;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
          overflow: hidden;
        }
        .content {
          width: 404px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 32px;
          margin-bottom: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        .date {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        .expiredate {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #f1524e;
        }
        .sign {
          position: absolute;
          width: 90px;
          height: 84px;
          // background-image: url('https://cdn.shupian.cn/sp-pt/wap/dcdo6nc5o6g0000.png');
          background-size: 100% 100%;
          right: 0px;
          top: 0px;
        }
      }
    }
    .not_coupon {
      width: 340px;
      height: 340px;
      margin: 176px auto;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
    }
  }
  .coupon_tip {
    width: 661px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    margin: 0 auto;
    margin-top: 24px;
    span {
      color: #4974f5;
    }
  }
}
/deep/ .sp-tabs__line {
  width: 64px;
}
/deep/ .sp-tab--active {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #4974f5;
}
</style>
