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
      <p v-if="payStatus" class="title title1">
        <my-icon
          name="pay_ic_fail"
          size="0.4rem"
          color="rgba(241, 82, 78, 1)"
        ></my-icon>
        支付失败
      </p>
      <p v-else class="title title1">
        <my-icon
          name="pay_ic_success"
          size="0.4rem"
          color="rgba(73, 116, 245, 1)"
        ></my-icon>
        支付成功
      </p>

      <p v-if="payStatus" class="toast">
        请尽快完成付款，超过订单付款期限，<br />
        系统将自动取消订单
      </p>
      <p v-else class="toast">
        本次支付已完成，付款5000元，<br />
        详细信息请点击查看订单
      </p>
      <div class="btn-area">
        <sp-button class="btn1">查看订单</sp-button>
        <sp-button v-if="payStatus" class="btn3" @click="againPay"
          >重新支付</sp-button
        >
        <sp-button v-else class="btn2">返回首页</sp-button>
      </div>
    </div>
    <div class="list"></div>
    <div class="body_container">
      <div class="recommend">为你推荐</div>
      <!-- <Recommend ref="recommendRef" /> -->
      <sp-skeleton
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
      </sp-skeleton>
    </div>
  </section>
</template>

<script>
import { Button, Skeleton } from '@chipspc/vant-dgg'
import { pay, recommendApi } from '@/api'
import getUserSign from '~/utils/fingerprint'
export default {
  components: {
    [Button.name]: Button,
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      responseData: [],
      productList: [],
      formData: {
        payCusId: 10000000,
      }, // 请求数据
      payStatus: false,
      deviceId: null, // 设备唯一码
      loading: true,
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
    this.init()
  },
  methods: {
    init() {
      this.payStatus = this.$route.query.payStatus
      pay
        .enablePayMoney({ axios: this.$axios }, this.formData)
        .then((result) => {
          // console.log('result的值', result)
          this.responseData = result.data
        })
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
          }
        })
      this.findRecomList()
    },
    onLeftClick() {
      this.$router.go(-1)
    },
    againPay() {
      this.$router.replace('/pay/payType')
    },
    // 查询推荐商品
    async findRecomList() {
      if (!this.deviceId) {
        this.deviceId = await getUserSign()
      }
      console.log(
        "this.proDetail.classCodeLevel.split(',')[0] ",
        this.proDetail.classCodeLevel.split(',')[0]
      )
      console.log(
        'this.proDetail.classCodeLevel',
        this.proDetail.classCodeLevel
      )
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
          platform: 'APP', // 平台（app,m,pc）
          page: {
            pageNo: 1,
            pageSize: 10,
          },
          formatIds: '',
        })
        .then((res) => {
          if (res.code === 200) {
            this.loading = false
            this.productList = res.data.records
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
    height: 120px;
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
