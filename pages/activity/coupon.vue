<template>
  <div class="act-coupon">
    <HeadWrapper :line="true">
      <Head ref="head" title="领券中心">
        <!-- <template #left>
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="uPGoBack"
          ></my-icon>
        </template> -->
      </Head>
    </HeadWrapper>
    <div v-if="productAdvertData.length > 0" class="banner">
      <sp-swipe :autoplay="3000" @change="onChange">
        <sp-swipe-item v-for="(item, index) in productAdvertData" :key="index">
          <a :href="item.materialLink" style="display: block; height: 100%">
            <sp-image
              fit="cover"
              :src="item.materialUrl"
              style="width: 100%; height: 100%"
          /></a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <div ref="scrollView" class="page-list" @scroll="scollChange">
      <div class="coupon_list">
        <div
          v-for="(item, index) in responseData"
          :key="index"
          class="coupon_item"
          :class="item.couponStatus === 1 ? 'haveUse' : 'notUse'"
        >
          <div class="item-lf">
            <div v-if="item.couponType === 1">
              <div class="coupon_price">
                {{ formatPrice(item.reducePrice) }}
                <span v-if="item.reducePrice >= 10000">万</span>
              </div>
              <div v-if="item.fullPrice == 0" class="can_use">无门槛</div>
              <div v-else class="can_use">
                满{{ formatPrice(item.fullPrice, true) }}可用
              </div>
            </div>

            <div v-else>
              <div class="coupon_discount">
                {{ getDiscount(item.discount) }}
                <span>折</span>
              </div>
            </div>
            <div
              v-if="item.couponStatus !== 1 && item.countSum !== -1"
              class="coupon_remain"
            >
              <div class="in_box">
                <div class="remain_bar">
                  <div
                    class="bar_inner"
                    :style="{ width: getRemainPercent(item) + '%' }"
                  ></div>
                </div>
                <div class="remain_num">剩余{{ getRemainPercent(item) }}%</div>
              </div>
            </div>
            <div
              v-if="item.couponStatus !== 1 && item.countSum === -1"
              class="coupon_remain"
            >
              <span class="no-num">不限量</span>
            </div>
          </div>
          <div class="item-rt">
            <!-- 气泡组件 start -->
            <Popover
              :ref="'myPop' + index"
              :text="item.remark"
              @closepop="closeBox"
            />
            <!-- 气泡组件 end-->
            <div class="title">
              <span
                :class="item.couponStatus === 1 ? 'no-coupon' : 'type-name'"
                >{{ item.couponType === 1 ? '满减券' : '折扣券' }}</span
              >{{ item.couponName }}
            </div>
            <div class="content" @click="popOver(index)">
              <span>{{ formatUseType(item) }}</span>
            </div>
            <div class="date">{{ item.serviceLife }}</div>
            <!-- 右侧显示 end-->
          </div>
          <div class="item-btn">
            <span
              v-if="item.couponStatus === 0"
              class="my-coupon"
              @click="operation_coupon(item)"
            >
              立即领取
            </span>
            <span v-if="item.couponStatus === 1" class="no-coupon">
              已领完
            </span>
            <span v-if="item.couponStatus === 2" class="no-use"> 已领取 </span>
          </div>
          <div v-if="item.couponStatus === 2" class="receive">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/1g2zj1jmy4o0000.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isNoData" class="no-data">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/dypjq91xxps0000.png"
        alt=""
        srcset=""
      />
      <p>目前没有优惠券可领哦~</p>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image, Toast } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import HeadWrapper from '@/components/common/head/HeadWrapper'
import Head from '@/components/common/head/Head'
import Popover from '~/components/common/popover/popover_old.vue'
import { coupon, activityApi } from '@/api/index'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    HeadWrapper,
    Popover,
    Head,
  },
  data() {
    return {
      current: '',
      loading: false,
      usedCount: 0, // 已使用
      notUsedCount: 0, // 未使用
      invalidCount: 0, // 已过期
      showColorTime: true, // 是否显示红色
      nowTimeStamp: 0, // 时间戳
      responseData: [], // 请求成功返回数据
      // 请求数据格式
      formData: {}, // 请求数据
      indexNum: 0,
      couponType: 0, // 优惠券类型 未使用 已使用 已失效
      isShow: false, // 控制显示气泡
      advertCode: 'ad113304',
      productAdvertData: [],
      isNoData: false,
      page: 1,
      limit: 100,
      nomore: false,
      isLogin: '',

      timer: null,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      userInfo: (state) => state.user, // 登录的用户信息
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    this.getAdvertisingData()
    this.getInitCouponData()
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    // 将价格转为万元
    formatPrice(price, haveUnit) {
      let p = parseFloat(price)
      let unit = '元'
      if (p >= 10000) {
        unit = '万'
        p = parseFloat((p / 10000).toFixed(2))
      }

      if (haveUnit) {
        return p + unit
      }
      return p
    },

    formatUseType(item) {
      if (item.useType === 1) {
        return '全场通用'
      } else if (item.useType === 2) {
        return item.productName ? `"${item.productName}"-可用` : '仅限指定品类使用'
      } else if (item.useType === 3) {
        return item.productName ? `"${item.productName}"-可用` : '仅限指定商品使用'
      }
      return ''
    },
    /**
     * 当有优惠券领取时间到期后，刷新数据
     */
    setRefresh() {
      clearTimeout(this.timer)

      const list = [...this.responseData]
      if (list.length > 0) {
        list.sort((a, b) => {
          return a.receiveEndDate - b.receiveEndDate
        })

        const time = list[0].receiveEndDate - Date.now()
        if (time > 0) {
          console.log('添加刷新计时器', time, 'ms')
          this.timer = setTimeout(() => {
            console.log('刷新页面数据')
            this.getInitCouponData()
          }, time)
        }
      }
    },
    getRemainPercent(data) {
      if (data.countSum > 0 && data.countSur > 0) {
        return Math.ceil((Number(data.countSur) * 100) / Number(data.countSum))
      } else {
        return 0
      }
    },
    getDiscount(count) {
      return Number(count) / 100
    },
    uPGoBack() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {
          if (!res || res.code !== 200) {
            this.$xToast.show({
              message: '返回失败',
              duration: 1000,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
          }
        })
        return
      }

      // 在浏览器里 返回, 若没返回记录了，就跳转到首页
      if (window && window.history && window.history.length <= 1) {
        this.$router.replace('/')
        return
      }
      this.$router.back(-1)
    },
    scollChange() {
      const scrollTop = this.$refs.scrollView.scrollTop
      const scrollHeight = this.$refs.scrollView.scrollHeight
      const windowHeight = window.innerHeight
      // 提前100px拉取下页数据
      if (scrollTop + windowHeight > scrollHeight - 100) {
        if (!this.nomore && !this.loading) {
          this.nomore = true
          this.loading = true
          this.page++
          this.getInitCouponData()
        }
      }
    },
    operation_coupon(item) {
      if (item.countSur === 0) {
        Toast('该优惠券已领完，请领取其他优惠券！')
      }
      if (item.couponStatus === 0) {
        this.setCouponStatus(item)
      } else {
        Toast('无法领取')
      }
    },
    async setCouponStatus(item) {
      console.log('loading', this.loading)
      if (this.loading) return
      if (!this.isLogin) {
        this.isLogin = await this.$isLogin()
        if (this.isLogin === 'app_login_success') {
          this.getInitCouponData()
          return
        }
      }
      this.loading = true
      this.$axios
        .post(`${CHIPS_WAP_BASE_URL}/yk/coupon/v2/receive_coupon.do`, {
          couponId: item.id,
        })
        .then((res) => {
          console.log(res)
          this.loading = false
          if (res && res.code === 200) {
            Toast('领取成功')

            item.couponStatus = 2
          } else if (res && res.code === 510) {
            // 重复领取
            item.couponStatus = 2
            this.$xToast.error(res.message || '领取失败')
          } else {
            // res.code === 500
            item.couponStatus = 1
            this.$xToast.error(res.message || '领取失败')
          }
          this.page = 1
          this.getInitCouponData()
          this.nomore = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          Toast.fail({
            duration: 2000,
            message: err.message || err || '领取失败',
            forbidClick: true,
            className: 'my-toast-style',
          })
        })
    },
    onChange(index) {
      this.current = index
    },
    getAdvertisingData() {
      this.$axios
        .get(activityApi.activityAdvertising, {
          params: {
            locationCode: this.advertCode,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.productAdvertData = res.data.sortMaterialList
              ? res.data.sortMaterialList[0].materialList
              : []
          } else {
          }
        })
    },
    getInitCouponData() {
      const params = {
        orderByWhere: 'createTime=desc;',
        findType: 1,
        limit: this.limit,
        page: this.page,
      }
      this.userId ? (params.userId = this.userId) : (params.userId = '')
      this.loading = true
      coupon
        .findPage({ axios: this.$axios }, params)
        .then((result) => {
          this.loading = false
          this.isNoData = false
          if (result.length === 0 && this.page === 1) {
            this.isNoData = true
          }
          for (let i = 0, length = result.length; i < length; i++) {
            let useTime = result[i].serviceLife
            useTime = useTime.slice(11)
            const thisTime = useTime.split('.').join('-')
            const time = new Date(thisTime).getTime()
            if (time - this.nowTimeStamp < 172800000) {
              result[i].showColorTime = this.showColorTime
            }
          }
          let dataArr = []
          if (this.page === 1) {
            dataArr = result
          } else {
            const oldList = JSON.parse(JSON.stringify(this.responseData))
            dataArr = oldList.concat(result)
          }
          // this.usedCount = result.usedCount
          // this.notUsedCount = result.notUsedCount
          // this.invalidCount = result.invalidCount
          this.responseData = dataArr

          this.setRefresh()

          this.loading = false
          if (result.length < this.limit) {
            this.nomore = true
          } else {
            this.nomore = false
          }
          console.log('nomore', this.nomore)
        })
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
          }
        })
    },

    popOver(index) {
      const l = this.responseData.length
      for (let i = 0; i < l; i++) {
        this.$refs['myPop' + i][0].isShow = false
      }
      // if(index)
      this.$refs['myPop' + index][0].isShow = true
      this.$refs['myPop' + index][0].indexData = index
    },
    // 关闭气泡组件
    closeBox(data) {
      this.indexNum = data
      this.$refs['myPop' + this.indexNum][0].isShow = false
    },
  },
}
</script>

<style lang="less" scoped>
.no-data {
  text-align: center;
  padding-top: 150px;
  img {
    width: 340px;
    height: 340px;
  }
  p {
    width: 100%;
    color: #222222;
    font-size: 28px;
  }
}
.lose {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/8a099vjhmbc0000.png');
}
.have_use_icon {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/29a165hg8w4k000.png');
}
.haveUse {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/2ozhssqe5py0000.png');
  background-size: cover;
}
.notUse {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/g4kbai7wgrk0000.png');
  background-size: cover;
}
.act-coupon {
  max-width: 7.5rem;
  margin: 0 auto;
}
.banner {
  margin-top: 88px;
  ::v-deep .sp-swipe {
    width: 100%;
    height: 300px;
    /*background-color: #999;*/
    overflow: hidden;
    position: relative;
    margin-top: -88px;
    ::v-deep .sp-swipe-item {
      height: 300px;
      a {
        width: 100%;
        height: 100%;
      }
    }
    ::v-deep .sp-image {
      height: 300px;
      width: 100%;
      > img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: fill !important;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 24px;
      bottom: 24px;
      padding: 0 28px;
      height: 44px;
      line-height: 44px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      background: #000000;
      opacity: 0.4;
      border-radius: 24px;
    }
  }
}
.coupon_list {
  width: 100%;
  padding: 12px 40px 20px 30px;
  height: auto;
  .coupon_item {
    position: relative;
    height: 222px;
    // box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    // background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png');
    background-size: 100% 100%;
    margin: 4px 0 0;
    position: relative;
    .item-lf {
      width: 208px;
      height: 100%;
      padding-left: 6px;
      float: left;
      .coupon_discount {
        font-size: 42px;
        font-family: Bebas;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        padding-top: 44px;
        position: relative;
        padding-right: 20px;
        margin-bottom: 10px;
        span {
          position: absolute;
          font-size: 26px;
          bottom: 0;
        }
      }
      .coupon_price {
        //   height: 67px;
        font-size: 42px;
        font-family: Bebas;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        padding-top: 27px;
        overflow: hidden;
        position: relative;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        span {
          position: absolute;
          font-size: 26px;
          bottom: 0;
        }
      }
      .coupon_remain {
        margin-top: 10px;
        width: 100%;
        font-size: 24px;
        .in_box {
          display: inline-block;
          height: 30px;
          width: 300px;
          margin: 0 auto;
          .remain_bar {
            margin-left: 20px;
            width: 90px;
            height: 8px;
            border-radius: 4px;
            background: #ff9467;
            margin-top: 12px;
            position: relative;
            overflow: hidden;
            float: left;
            .bar_inner {
              position: absolute;
              left: 0;
              bottom: 0;
              height: 100%;
              border-radius: 4px;
              background: #fff166;
            }
          }
          .remain_num {
            width: 120px;
            float: left;
            opacity: 0.8;
            font-size: 24px;
            color: #fffcd6;
            letter-spacing: 0;
            transform: scale(0.7);
            transform-origin: 14px 14px;
            text-align: left;
            white-space: nowrap;
          }
        }
        .no-num {
          text-align: center;
          color: #ffffff;
          width: 100%;
          display: inline-block;
        }
      }
      .can_use {
        margin-top: 0.3rem;

        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        white-space: nowrap;
      }
    }
    .item-rt {
      padding: 24px 0 0 24px;
      height: auto;
      box-sizing: border-box;
      width: auto;
      padding-left: 236px;
      position: relative;
      .title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 80px;
        padding-bottom: 12px;
        margin-right: 30px;
        position: relative;
        z-index: 2;
        span {
          position: absolute;
          border-radius: 4px;
          font-size: 24px;
          left: 0;
          top: 2px;
          line-height: 24px;
        }
        .type-name {
          color: #ffffff;
          background-image: linear-gradient(90deg, #fa6d5a 0%, #fa5741 100%);
          transform: scale(0.8);
          transform-origin: 0 center;
          line-height: 0;
          padding: 20px 6px;
        }
        .no-coupon {
          background: #cccccc;
          color: #ffffff;
          transform: scale(0.8);
          transform-origin: 0 4px;
          line-height: 0;
          padding: 20px 6px;
        }
      }
      .content {
        width: 404px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 32px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding-right: 1.88rem;
        min-height: 64px;
        margin-bottom: 8px;
      }
      .date {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        transform: scale(0.9);
        transform-origin: 10px 0;
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
    .receive {
      position: absolute;
      right: 12px;
      top: 8px;
      z-index: 1;
      width: 90px;
      height: 90px;
      font-size: 0;
      img {
        width: 90px;
        height: 90px;
      }
    }
    .item-btn {
      width: 132px;
      height: 54px;
      font-size: 24px;
      position: absolute;
      right: 50px;
      // top: 55%;
      bottom: 54px;
      span {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 54px;
        font-size: 0.24rem;
        white-space: nowrap;
        text-align: center;
        &.my-coupon {
          background: #ec5330;
          border-radius: 27px;
          color: #fff;
        }
        &.no-use {
          background: #fdedea;
          border: 1px solid #ec5330;
          border-radius: 27px;
          color: #ec5330;
        }
        &.no-coupon {
          background: #cccccc;
          border-radius: 27px;
          color: #ffffff;
        }
      }
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
::v-deep .sp-tabs__line {
  width: 64px;
}
::v-deep .sp-tab--active {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #4974f5;
}
.page-list {
  // height: calc(100vh - 120px);
  // overflow-y: scroll;
}
</style>
