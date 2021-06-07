<template>
  <section>
    <div class="banner">
      <my-icon
        class="back-icon"
        name="nav_ic_back"
        size="0.4rem"
        color="rgba(26, 26, 26, 1)"
        @click.native="onLeftClick"
      ></my-icon>
      <p v-if="payStatus === 2" class="title title1">
        <my-icon
          name="pay_ic_fail"
          size="0.4rem"
          color="rgba(241, 82, 78, 1)"
        ></my-icon>
        支付失败
      </p>
      <p v-else-if="payStatus === 1" class="title title1">
        <my-icon
          name="pay_ic_success"
          size="0.4rem"
          color="rgba(73, 116, 245, 1)"
        ></my-icon>
        支付成功
      </p>
      <p v-else class="title title1">查询中</p>
      <p v-if="payStatus === 2" class="toast">
        请尽快完成付款，超过订单付款期限，<br />
        系统将自动取消订单
      </p>
      <p v-else-if="payStatus === 1" class="toast">
        本次支付已完成，付款{{ payMoney }}元，<br />
        详细信息请点击查看订单
      </p>
      <p v-else class="toast">正在查询本次付款信息，请稍后</p>
      <div v-if="payStatus" class="btn-area">
        <sp-button class="btn1" @click="toOrder">查看订单</sp-button>
        <sp-button v-if="payStatus == 2" class="btn3" @click="againPay"
          >重新支付</sp-button
        >
        <sp-button v-else class="btn2" @click="toHome">返回首页</sp-button>
      </div>
    </div>
    <div class="list"></div>
    <div class="body_container">
      <div class="recommend">为你推荐</div>
      <div class="goods-list">
        <sp-skeleton
          v-for="val in 3"
          :key="val + 'a'"
          avatar-shape="square"
          avatar-size="2.4rem"
          title
          title-width="100%"
          avatar
          :row="3"
          :row-width="['80%', '70%', '50%']"
          :loading="productList.length > 0 ? false : true"
        >
        </sp-skeleton>
        <div
          v-for="(item, goodsIndex) in productList"
          :key="goodsIndex"
          class="goods-item"
          @click="jumpPage(item)"
        >
          <div class="goods-lable-img">
            <span v-if="false" class="lable">2千元成交礼</span>
            <sp-image :src="item.img || item.goodsImg"></sp-image>
          </div>
          <div class="goods-info">
            <p class="goods-name">
              {{ item.name }}
            </p>
            <p
              v-if="
                (item.tag && item.tag.length) ||
                (item.salesGoodsSubVos && item.salesGoodsSubVos.length > 1) > 0
              "
              class="goods-tag"
            >
              <span
                v-if="item.salesGoodsSubVos && item.salesGoodsSubVos.length > 1"
                class="tag-item tag-tc"
                >套餐</span
              >
              <span
                v-for="(tagItem, index2) in item.tag"
                v-show="index2 < 3"
                :key="index2"
                class="tag-item"
                >{{ tagItem.tagName }}</span
              >
            </p>
            <p
              v-if="item.salesGoodsSubVos && item.salesGoodsSubVos.length === 1"
              class="goods-slogan goods-slogan1"
            >
              {{
                item.salesGoodsSubVos[0] &&
                item.salesGoodsSubVos[0].goodsSubDetailsName
              }}
            </p>
            <p v-else class="goods-slogan goods-slogan1">
              {{
                item.salesGoodsOperatings && item.salesGoodsOperatings.slogan
              }}
            </p>
            <div class="goods-price">
              <span
                v-if="
                  item.price == 0 ||
                  item.price === '0.00' ||
                  item.price === '0.0' ||
                  item.price === '0'
                "
                class="sales-proce"
                ><span class="big-value">面议</span></span
              >
              <span v-else class="sales-proce">
                <span class="big-value"
                  >{{
                    item.price || item.salesPrice || item.referencePrice
                  }}元</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- <Recommend ref="recommendRef" /> -->
      <!-- <sp-skeleton
        avatar
        avatar-shape="square"
        :row="3"
        :loading="loading"
        avatar-size="80px"
      >
        <div class="recommend_list">
          <div
            v-for="(item, index) in productList"
            :key="index"
            class="recommend_item"
            @click="goProductDetail(item)"
          >
            <div class="item_lf">
              <div class="hot">热卖</div>
              <img :src="item.img" alt="" />
            </div>
            <div class="item_rt">
              <div class="item_title">{{ item.name }}</div>
              <div class="item_span">
                <span>{{ item.classCodeLevelName }}</span>
              </div>
              <div class="item_content">{{ item.classCodeName }}</div>
              <div class="item_money">
                <div class="money_num">{{ item.price }}</div>
                <div class="money_icon">元</div>
                <div class="sale_num">半年销量 {{ item.salesVolume }}</div>
              </div>
            </div>
          </div>
        </div>
      </sp-skeleton> -->
    </div>
  </section>
</template>

<script>
import { Button, Skeleton, Image } from '@chipspc/vant-dgg'
import { pay, recommendApi } from '@/api'
import getUserSign from '~/utils/fingerprint'
// 支付结果回调定时器
let payResultTimer
export default {
  components: {
    [Button.name]: Button,
    [Skeleton.name]: Skeleton,
    [Image.name]: Image,
  },
  data() {
    return {
      responseData: [],
      productList: [],
      formData: {
        payCusId: 10000000,
      }, // 请求数据
      payStatus: '', // 1成功 2失败
      deviceId: null, // 设备唯一码
      loading: true,
      payMoney: '',
      noData: false,
      payCallBackData: {},
      number: 0,
    }
  },
  computed: {
    // 产品详情
    proDetail() {
      return this.$store.state.tcProductDetail.detailData
    },
    city() {
      return this.$store.state.city.currentCity
    },
  },
  mounted() {
    this.productType = localStorage.getItem('productType')
    this.init()
  },
  methods: {
    init() {
      this.payMoney = localStorage.getItem('payMoney')
      this.findRecomList()
      const startTime = localStorage.getItem('startTime')
      if (
        localStorage.getItem('cusOrderId') &&
        localStorage.getItem('serialNumber')
      ) {
        if (startTime) {
          const nowTime = this.getNowTime()
          if (nowTime - startTime < 3 * 60 * 1000) {
            this.resultLoading = true
            payResultTimer = setInterval(() => {
              this.number++
              this.getPayResult()
            }, 2000)
          } else {
            this.clearLocalStorage()
            // this.$router.replace({
            //   path: '/pay/payResult',
            //   query: {
            //     payStatus: 2,
            //     orderId: this.$route.query.orderId,
            //     cusOrderId: this.formData.cusOrderId,
            //     batchIds: this.$route.query.batchIds,
            //   },
            // })
          }
        }
      }
    },
    onLeftClick() {
      this.$router.go(-1)
    },
    againPay() {
      this.$router.replace({
        path: '/pay/payType',
        query: {
          orderId: this.$route.query.orderId,
          cusOrderId: this.$route.query.cusOrderId,
          batchIds: this.$route.query.batchIds,
        },
      })
    },
    // 获取当前时间戳
    getNowTime() {
      return new Date().getTime()
    },
    toOrder() {
      this.$router.replace({
        path: '/order/detail',
        query: {
          id: this.$route.query.orderId,
          cusOrderId: this.$route.query.cusOrderId,
          batchIds: this.$route.query.batchIds,
        },
      })
    },
    // 获取回调信息
    getPayResult() {
      this.payCallBackData.cusOrderId = localStorage.getItem('cusOrderId')
      this.payCallBackData.serialNumber = localStorage.getItem('serialNumber')
      pay
        .getPayResult(this.payCallBackData)
        .then((result) => {
          if (result.data === 1 || result.data === '1') {
            this.resultLoading = false
            this.payStatus = 1
            clearInterval(payResultTimer)
            this.clearLocalStorage()
          } else if (this.number > 10) {
            this.resultLoading = false
            this.payStatus = 2
            clearInterval(payResultTimer)
            this.clearLocalStorage()
          }
        })
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
          }
        })
    },
    // 清空localStorage
    clearLocalStorage() {
      localStorage.removeItem('cusOrderId')
      localStorage.removeItem('serialNumber')
      localStorage.removeItem('startTime')
      localStorage.removeItem('payMoney')
    },
    jumpPage(item) {
      this.$router.push({
        path: '/detail',
        query: {
          productId: item.id,
        },
      })
    },
    toHome() {
      this.$router.replace('/')
    },
    // 查询推荐商品
    async findRecomList() {
      if (!this.deviceId) {
        this.deviceId = await getUserSign()
      }
      const formatId1 = this.proDetail.classCodeLevel.split(',')[0] // 产品二级分类
      const formatId2 = this.proDetail.classCodeLevel.split(',')[1] // 产品二级分类
      const formatId3 = this.proDetail.classCodeLevel.split(',')[2] // 产品三级分类
      const formatId = formatId3 || formatId2
      this.$axios
        .post(recommendApi.saleList, {
          userId: this.$cookies.get('userId', { path: '/' }), // 用户id
          deviceId: this.deviceId, // 设备ID
          areaCode: this.cityCode || '510100', // 区域编码
          sceneId: 'app-jycpxq-02', // 场景ID
          platform: 'm', // 平台（app,m,pc）
          page: {
            pageNo: 1,
            pageSize: 10,
          },
          productType: this.productType || 'PRO_CLASS_TYPE_SALES',
        })
        .then((res) => {
          if (res.code === 200) {
            this.loading = false
            this.productList = res.data.records
            if (!this.productList.length) this.noData = true
          }
        })
        .catch((err) => {
          console.log(err)
          this.$xToast.show({
            message: '网络错误,请刷稍后再试',
            duration: 1000,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
        })
    },
    goProductDetail(item) {
      this.$router.push({
        path: '/detail',
        query: {
          productId: item.id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.banner {
  background: #f4f4f4;
  position: relative;
  padding-top: 88px;
  padding-bottom: 20px;
  .back-icon {
    position: absolute;
    left: 40px;
    top: 20px;
    color: white;
  }
  .title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 44px;
    text-align: center;
    margin-bottom: 20px;
  }
  .toast {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 36px;
    text-align: center;
  }
  .btn-area {
    display: flex;
    justify-content: space-between;
    margin: 40px auto 0 auto;
    width: 60%;
    height: 100px;
    .sp-button {
      width: 210px;
      height: 72px;
      border-radius: 4px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      background: none;
    }
    .btn1 {
      color: #555555;
      border: 1px solid #cdcdcd;
    }
    .btn2 {
      border: 1px solid #4974f5;
      border-radius: 4px;
      color: #4974f5;
    }
    .btn3 {
      background: #fa5741;
      border-radius: 4px;
      color: #ffffff;
      border: none;
    }
  }
}
.goods-list {
  position: relative;
  width: 100%;
  padding: 0 20px;
  min-height: 400px;
  .goods-item {
    padding: 20px;
    background: white;
    margin: 0 auto 20px auto;
    border-radius: 24px;
    font-size: 24px;
    width: 100%;
    padding: 32px 0;
    display: flex;
    overflow: hidden;
    .goods-lable-img {
      position: relative;
      width: 220px;
      height: 220px;
      border-radius: 8px;
      overflow: hidden;
      margin-right: 22px;
      .sp-image {
        width: 100%;
        height: 100%;
      }
      &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        //   background: rgba(0, 0, 0, 0.2);
      }
      > img {
        width: 100%;
        height: 100%;
      }
      > .lable {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        z-index: 2;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        height: 44px;
        padding: 0 12px;
        background: #ec5330;
        border-radius: 8px 0px 8px 0px;
      }
    }
    .goods-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      .goods-name {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 42px;
        .textOverflow(2);
        .pro-lable {
          display: inline-block;
          position: relative;
          top: -2px;
          margin-right: 8px;
          background-color: #ec5330;
          border-radius: 4px;
          overflow: hidden;
          line-height: 32px;
          vertical-align: middle;
          > i {
            position: relative;
            font-style: inherit;
            display: inline-flex;
            align-items: center;
            padding: 0 7px;
            line-height: 32px;
            color: #fff;
            font-size: 20px;
            font-family: PingFang SC;
            color: #ffffff;
          }
        }
      }
      .goods-tag {
        margin-top: 12px;
        .textOverflow(1);
        .tag-item {
          display: inline-block;
          height: 0.32rem;
          background: #f0f2f5;
          border-radius: 0.04rem;
          padding: 0 0.09rem;
          line-height: 0.32rem;
          font-size: 0.22rem;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
          // margin-right: 10px;
        }
        .tag-tc {
          background: #fc4e41;
          border-radius: 4px;
          color: white;
          font-weight: 700;
        }
      }
      .goods-slogan {
        color: #999;
      }
      .goods-slogan1 {
        .textOverflow(1);
        margin-top: 16px;
      }
      .goods-slogan2 {
        .textOverflow(2);
      }
      .goods-lable {
        display: flex;
        flex-wrap: wrap;
        > span {
          display: flex;
          align-items: center;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
          background: #f0f2f5;
          border-radius: 4px;
          padding: 0 6px;
          margin-right: 8px;
          margin-top: 10px;
          .textOverflow(1);
        }
      }
      .goods-sku {
        display: flex;
        margin-top: 12px;
        color: #222222;
        .textOverflow(1);
        > span {
          position: relative;
          display: inline;
          align-items: center;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
          padding-right: 12px;
          margin: 8px 0 8px 0;
          &:not(:last-child) {
            &::after {
              content: '';
              position: relative;
              top: 4px;
              display: inline-block;
              margin-left: 12px;
              width: 0;
              height: 23px;
              border-right: 1px solid #222222;
            }
          }
        }
      }
      .goods-price {
        flex: 1;
        display: flex;
        line-height: 36px;
        align-items: flex-end;
        vertical-align: middle;
        // margin-bottom: 5px;
        .sales-proce {
          display: flex;
          align-items: baseline;
          .big-value {
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ec5330;
          }
          .small-value {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ec5330;
          }
          .unit {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ec5330;
            margin-left: 4px;
          }
        }
        .original-price {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          margin-left: 16px;
          line-height: 30px;
          transform: translateY(5px);
          .textOverflow(1);
        }
      }
      .recommend {
        width: 100%;
        margin-top: 8px;
        padding-top: 16px;
        display: flex;
        align-items: center;
        border-top: 1px solid #f4f4f4;
        > span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 28px;
          height: 28px;
          background: #ffb042;
          border-radius: 4px;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          margin-right: 13px;
        }
        > p {
          flex: 1;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 32px;
          .textOverflow(1);
        }
      }
    }
  }
  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background: #f4f4f4;
  }
  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
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
.body_container {
  padding: 48px 40px 0 40px;
  .recommend {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    margin-bottom: 7px;
  }
  .recommend_item {
    display: flex;
    justify-content: flex-start;
    padding: 32px 0;
    .item_lf {
      width: 160px;
      height: 160px;
      background: #ddd;
      border-radius: 8px;
      position: relative;
      margin-right: 32px;
      .hot {
        position: absolute;
        top: 0;
        left: 0;
        height: 44px;
        background: #fa5741;
        border-radius: 8px 0px 8px 0px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 44px;
        padding: 0 13px;
      }
      img {
        width: 160px;
        height: 160px;
      }
    }
    .item_rt {
      flex: 1;
      .item_title {
        width: 401px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-bottom: 15px;
        text-overflow: ellipsis;
        word-break: break-all;
        overflow: hidden;
        white-space: nowrap;
        height: 32px;
        line-height: 32px;
      }
      .item_span {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 15px;
        line-height: 28px;
        height: 28px;
        width: 420px;
        span {
          background: #f0f2f5;
          border-radius: 4px;
          padding: 0 5px;
          margin-right: 14px;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
          // line-height: 28px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .item_content {
        width: 411px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        margin-bottom: 18px;
        height: 23px;
        line-height: 23px;
        text-overflow: ellipsis;
        word-break: break-all;
        overflow: hidden;
        white-space: nowrap;
      }
      .item_money {
        display: flex;
        // justify-content: center;
        align-items: center;
        .money_num {
          height: 24px;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
          line-height: 24px;
        }
        .money_icon {
          // width: 21px;
          // height: 19px;
          height: 22px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ec5330;
          line-height: 22px;
          margin: 4px 0 0 4px;
        }
        .sale_num {
          height: 22px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 22px;
          margin-left: 18px;
          margin-top: 2px;
        }
      }
    }
  }
}
</style>
