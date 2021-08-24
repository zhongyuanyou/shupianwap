<template>
  <div v-show="show" class="popup">
    <Popup
      v-model="show"
      position="bottom"
      :close-on-click-overlay="false"
      :style="{ height: '70%' }"
      round
      @click-overlay="close(false)"
    >
      <div class="box">
        <div class="head">
          <h1 v-if="title">{{ title }}</h1>
          <p v-if="help" @click="TipsShow = true">{{ help }}</p>
          <Icon v-if="closeIcon" name="cross" size="22" @click="close(false)" />
        </div>
        <div class="tablist">
          <p
            v-for="(item, index) in tablist"
            :key="index"
            :style="{ width: 100 / tablist.length + '%' }"
            :class="tabAct == index ? 'act' : ''"
            @click="tabactivefn(item, index)"
          >
            <span>{{ item.name }}</span
            ><b v-if="index == 0">{{ `(${datalist.length || 0})` }}</b>
            <b v-else>{{ `(${nolist.length || 0})` }}</b>
            <i class="icon"></i>
          </p>
        </div>
        <div class="calculation">
          {{ disPrice ? '已选中优惠券，可抵扣' : '请选择优惠券' }}
          <span v-if="disPrice" class="red">{{ disPrice }}元</span>
        </div>
        <div v-if="tablist[tabAct].is">
          <div class="databox">
            <div v-if="datalist.length > 0" class="listbox">
              <div
                v-for="(item, index) in datalist"
                :key="index"
                class="list"
                @click="checkitem(item, index)"
              >
                <div class="left">
                  <div v-if="item.marketingCouponVO.couponType === 1">
                    <div class="coupon_price">
                      {{ item.marketingCouponVO.reducePrice }}
                    </div>
                    <div v-if="item.useType === 1" class="can_use">无门槛</div>
                    <div v-else class="can_use">
                      满{{ item.marketingCouponVO.fullPrice }}元可用
                    </div>
                  </div>
                  <div v-else>
                    <div class="coupon_discount">
                      {{ getDiscount(item.marketingCouponVO.discount) }}
                      <span>折</span>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="data">
                    <h1 class="title">
                      <span class="type-name type-name1">{{
                        item.marketingCouponVO.typeName
                      }}</span>
                      {{ item.marketingCouponVO.couponName }}
                    </h1>
                    <div class="goods-types">
                      <p v-if="item.marketingCouponVO.useType === 1">
                        全场通用
                      </p>
                      <p v-if="item.marketingCouponVO.useType === 2">
                        仅限指定品类使用
                      </p>
                      <p v-if="item.marketingCouponVO.useType === 3">
                        {{
                          item.marketingCouponVO.productName
                            ? item.marketingCouponVO.productName + '-可用'
                            : '仅限指定商品使用'
                        }}
                      </p>
                    </div>
                    <p class="date">{{ item.marketingCouponVO.serviceLife }}</p>
                  </div>
                  <div class="right">
                    <sp-radio-group v-model="radio">
                      <sp-radio
                        :name="index"
                        disabled
                        :class="radio === index ? 'act' : ''"
                      >
                        <template #icon="props">
                          <my-icon
                            :name="
                              props.checked
                                ? 'order_ic_success'
                                : 'pay_ic_radio_n'
                            "
                            size="0.32rem"
                            :color="radio === index ? '#4E78F5' : '#dddddd'"
                          ></my-icon>
                        </template>
                      </sp-radio>
                    </sp-radio-group>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="none">
              <img
                src="https://img10.dgg.cn/pt03/wap/e5g6ntopcpc0000.png"
                alt=""
              />
              <p>暂无优惠券</p>
            </div>
            <div v-if="datalist.length > 0" class="btn">
              <p @click="submit">确定</p>
            </div>
          </div>
        </div>
        <div v-else class="databox nodatabox">
          <div v-if="nolist.length > 0" class="listbox">
            <div v-for="(item, index) in nolist" :key="index" class="nolist">
              <div class="top">
                <div class="left">
                  <div v-if="item.marketingCouponVO.couponType === 1">
                    <div class="coupon_price">
                      {{ item.marketingCouponVO.reducePrice }}
                    </div>
                    <div v-if="item.useType === 1" class="can_use">无门槛</div>
                    <div v-else class="can_use">
                      满{{ item.marketingCouponVO.fullPrice }}元可用
                    </div>
                  </div>
                  <div v-else>
                    <div class="coupon_discount">
                      {{ getDiscount(item.marketingCouponVO.discount) }}
                      <span>折</span>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="data">
                    <h1 class="title">
                      <span class="type-name type-name2">{{
                        item.marketingCouponVO.typeName
                      }}</span>
                      {{ item.marketingCouponVO.couponName }}
                    </h1>
                    <div class="goods-types">
                      <p v-if="item.marketingCouponVO.useType === 1">
                        全场通用
                      </p>
                      <p v-if="item.marketingCouponVO.useType === 2">
                        仅限指定品类使用
                      </p>
                      <p v-else-if="item.marketingCouponVO.useType === 3">
                        {{
                          item.marketingCouponVO.productName
                            ? item.marketingCouponVO.productName + '-可用'
                            : '仅限指定商品使用'
                        }}
                      </p>
                    </div>
                    <p class="date">{{ item.marketingCouponVO.serviceLife }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="none">
            <img
              src="https://img10.dgg.cn/pt03/wap/e5g6ntopcpc0000.png"
              alt=""
            />
            <p>暂无优惠券</p>
          </div>
        </div>
      </div>
    </Popup>

    <sp-dialog v-model="TipsShow" :show-confirm-button="false">
      <div class="dialog">
        <div class="head">温馨提示</div>
        <div class="body">
          请您务必审慎阅读、充分理解<a
            class="protocol_name"
            @click="handleProtocol('protocol100122')"
            >《薯片用户服务协议》</a
          >和<a class="protocol_name" @click="handleProtocol('protocol100121')"
            >《薯片隐私协议》</a
          >和《权限使用规则》各条款，包括但不限于: 各条款，包括但不限于: <br />
          为了向您提供即时通讯、内容分享等服务，我们需要收集您的设备信息、操作日志等个人信息。你可以在“设置中查看、变更、删除个人信息并管理您的授权。”
          如果您不同意本协议的修改，请立即停止访问或使用本网站或取消已经获得的服务；如果您选择继续访问或使用本网站，则视为您已接受本协议。
        </div>
        <div class="btn" @click="TipsShow = false">我知道了</div>
      </div>
    </sp-dialog>
  </div>
</template>

<script>
import {
  Popup,
  Icon,
  RadioGroup,
  Radio,
  Toast,
  Button,
  Dialog,
} from '@chipspc/vant-dgg'
import { order } from '@/api/index'
export default {
  name: 'PlaceOrderPopup',
  components: {
    Popup,
    Icon,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
  },
  props: {
    show: {
      type: Boolean,
      default() {
        return false
      },
    },
    height: {
      type: Number,
      default() {
        return 30
      },
    },
    title: {
      type: String,
      default() {
        return '优惠券'
      },
    },
    help: {
      type: String,
      default() {
        return ''
      },
    },
    closeIcon: {
      type: Boolean,
      default() {
        return true
      },
    },
    tablist: {
      type: Array,
      default() {
        return []
      },
    },
    datalist: {
      type: Array,
      default() {
        return []
      },
    },
    nolist: {
      type: Array,
      default() {
        return []
      },
    },
    originPrice: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      tabAct: 0,
      checkarr: '',
      radio: null,

      // disPrice: 0,

      TipsShow: false,
    }
  },
  computed: {
    // 折算后售价
    price() {
      // 原价
      // const originPrice =
      //   this.$route.query.type === 'shopcar'
      //     ? this.$parent.order.skuTotalPrice
      //     : this.$parent.order.salesPrice

      let price = 0
      if (!this.checkarr.marketingCouponVO) {
        return this.originPrice
      }

      if (this.checkarr.marketingCouponVO.discount) {
        price =
          Number(this.originPrice) *
          10000 *
          (this.checkarr.marketingCouponVO.discount / 1000)
        if (price % 100 === 0) {
          price = price / 10000
        } else {
          price = (Math.floor(price / 100) + 1) / 100
        }
      } else {
        price =
          Number(this.originPrice) - this.checkarr.marketingCouponVO.reducePrice
      }
      return price
    },

    // 折扣价
    disPrice() {
      // 原价
      // const originPrice =
      //   this.$route.query.type === 'shopcar'
      //     ? this.$parent.order.skuTotalPrice
      //     : this.$parent.order.salesPrice
      return (
        Math.ceil(Number(this.originPrice) * 100 - Number(this.price) * 100) /
        100
      )
    },
  },

  mounted() {},
  methods: {
    //
    getDiscount(count) {
      return Number(count) / 100
    },
    // sum() {
    //   // 原价
    //   const originPrice =
    //     this.$route.query.type === 'shopcar'
    //       ? this.$parent.order.skuTotalPrice
    //       : this.$parent.order.salesPrice
    //   // 售价
    //   let price = 0

    //   if (this.checkarr.marketingCouponVO.discount) {
    //     price =
    //       Number(originPrice) *
    //       10000 *
    //       (this.checkarr.marketingCouponVO.discount / 1000)
    //     if (price % 100 === 0) {
    //       price = price / 10000
    //     } else {
    //       price = (Math.floor(price / 100) + 1) / 100
    //     }
    //   } else {
    //     price =
    //       Number(originPrice) - this.checkarr.marketingCouponVO.reducePrice
    //   }
    //   // 折扣价
    //   this.disPrice =
    //     Math.ceil(Number(originPrice) * 100 - Number(price) * 100) / 100

    //   // price计算后售价，disPrice折扣价，checkarr选择项
    //   this.$emit('change', price, -this.disPrice, this.checkarr)
    // },
    checkitem(item, index) {
      // this.checkarr = item
      if (this.radio === index) {
        this.checkarr = ''
        this.radio = -1
      } else {
        this.checkarr = item
        this.radio = index
      }
    },
    close() {
      this.$emit('close')
    },
    submit() {
      // price计算后售价，disPrice折扣价，checkarr选择项
      this.$emit('change', this.price, -this.disPrice, this.checkarr)
      this.close()
    },
    tabactivefn(item, index) {
      this.tabAct = index
      this.$emit('tabactive', item, index)
    },
  },
}
</script>

<style lang="less" scoped>
.popup {
  .box {
    // padding: 20px 0;
    box-sizing: border-box;
    > .head {
      padding: 0 40px;
      display: flex;
      align-items: center;
      height: 136px;
      box-sizing: border-box;
      > h1 {
        height: 40px;
        font-size: 40px;
        font-weight: bold;
        color: #222222;
        line-height: 40px;
      }
      > p {
        height: 40px;
        font-size: 26px;
        font-weight: 400;
        color: #999999;
        margin-left: auto;
        line-height: 40px;
        margin-right: 42px;
      }
    }
    > .tablist {
      height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      border-bottom: 1px solid #f4f4f4;
      > p {
        font-size: 28px;
        height: 50px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        text-align: center;
        > i {
          display: none;
          width: 32px;
          height: 4px;
          background: #4974f5;
          border-radius: 2px;
          margin: 15px auto 0 auto;
        }
      }
      > .act {
        color: #4974f5;
        font-weight: 600;
        i {
          display: block;
        }
      }
    }
    > .calculation {
      padding: 35px;
      height: 100px;
      font-size: 26px;
      font-weight: 400;
      color: #222222;
      box-sizing: border-box;
      > span {
        color: #ec5330;
        font-weight: bold;
      }
    }
    .databox {
      height: calc(67vh - 324px);
      .listbox {
        height: calc(100% - 130px);
        overflow-y: auto;
        padding: 0 40px;
        > .list {
          margin: 24px auto 0;
          width: 670px;
          height: 212px;
          background: #ffffff;
          // box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
          display: flex;

          background: url('https://cdn.shupian.cn/sp-pt/wap/g4kbai7wgrk0000.png')
            no-repeat;
          background-size: 100%;
          ::v-deep.sp-radio__icon--checked .sp-icon {
            color: #fff;
            background-color: #4974f5 !important;
            border-color: #4974f5;
          }
          ::v-deep.sp-radio__icon--disabled {
            background: #fff;
            .sp-icon {
              background: #fff;
            }
          }
          > .left {
            margin-left: 10px;
            width: 201px;
            height: 100%;
            color: #fff;
            padding-top: 20px;
            box-sizing: border-box;
            .coupon_discount {
              font-size: 72px;
              font-family: Bebas;
              font-weight: 400;
              color: #ffffff;
              text-align: center;
              padding-top: 34px;
              position: relative;
              padding-right: 20px;
              margin-bottom: 10px;
              span {
                position: absolute;
                font-size: 28px;
                bottom: 0;
              }
            }
            .coupon_price {
              //   height: 67px;
              font-size: 62px;
              font-family: Bebas;
              font-weight: 400;
              color: #ffffff;
              text-align: center;
              padding-top: 27px;
              overflow: hidden;
              position: relative;
              // text-overflow: ellipsis;
              // white-space: nowrap;
            }
            .can_use {
              margin-top: 14px;
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
              text-align: center;
            }
            > p {
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              text-align: center;
              margin-top: 15px;
            }
          }
          > .right {
            width: calc(100% - 201px);
            padding: 25px 0;
            display: flex;
            margin-left: 30px;
            > .data {
              width: 335px;
              .title {
                font-size: 32px;
                color: #222222;
                line-height: 40px;
                margin: 5px 0 12px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                position: relative;
                padding-left: 80px;
                .type-name {
                  border-radius: 4px;
                  overflow: hidden;
                  font-size: 24px;
                  position: absolute;
                  height: 36px;
                  padding-bottom: 2px;
                  width: 84px;
                  text-align: center;
                  top: 2px;
                  left: 0;
                  font-weight: normal;
                  transform: scale(0.83);
                  transform-origin: 0 0;
                  color: #ffffff;
                  background-image: linear-gradient(
                    90deg,
                    #fa6d5a 0%,
                    #fa5741 100%
                  );
                }
              }
              .goods-types {
                min-height: 64px;
                font-size: 24px;
                font-weight: 400;
                color: #555555;
                margin-top: 6px;

                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: break-all;
              }

              > .date {
                font-size: 24px;
                font-weight: 400;

                margin-top: 8px;

                color: #999999;

                transform: scale(0.83);
                transform-origin: left center;
              }
            }
            > .right {
              margin-left: auto;
              align-self: center;
              margin-right: 40px;
            }
          }
        }
      }
      .none {
        overflow-y: auto;
        padding-top: 40px;
        > img {
          width: 340px;
          height: 340px;
          display: block;
          margin: 0 auto;
        }
        > p {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #1a1a1a;
          margin-top: 24px;
          text-align: center;
        }
      }
      .btn {
        height: 180px;
        box-sizing: border-box;
        padding: 40px;
        > p {
          width: 100%;
          height: 100px;
          background: #4974f5;
          text-align: center;
          line-height: 100px;
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          border-radius: 8px;
        }
      }
    }
    .nodatabox {
      height: calc(76vh - 324px);
      .listbox {
        height: 100%;
        > .nolist {
          height: 220px;
          margin: 24px auto 0;
          width: 670px;
          background: url(https://cdn.shupian.cn/sp-pt/wap/2u00dwnv4aw0000.png)
            no-repeat;
          background-size: 100%;
          // box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
          > .top {
            display: flex;
            > .left {
              margin-left: 10px;
              width: 201px;
              height: 212px;
              color: #fff;
              padding-top: 20px;
              box-sizing: border-box;
              .coupon_discount {
                font-size: 72px;
                font-family: Bebas;
                font-weight: 400;
                color: #ffffff;
                text-align: center;
                padding-top: 34px;
                position: relative;
                padding-right: 20px;
                margin-bottom: 10px;
                span {
                  position: absolute;
                  font-size: 28px;
                  bottom: 0;
                }
              }
              .coupon_price {
                //   height: 67px;
                font-size: 62px;
                font-family: Bebas;
                font-weight: 400;
                color: #ffffff;
                text-align: center;
                padding-top: 27px;
                overflow: hidden;
                position: relative;
                // text-overflow: ellipsis;
                // white-space: nowrap;
              }
              .can_use {
                margin-top: 14px;
                font-size: 24px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #ffffff;
                text-align: center;
              }
              > p {
                font-size: 24px;
                font-family: PingFang SC;
                font-weight: 400;
                text-align: center;
                padding: 0 10px;
                margin-top: 15px;
              }
            }
            > .right {
              width: calc(100% - 201px);
              height: 212px;
              box-sizing: border-box;
              padding: 25px 0;
              display: flex;
              margin-left: 24px;
              > .data {
                width: 335px;
                .title {
                  font-size: 32px;
                  color: #222222;
                  line-height: 40px;
                  margin: 5px 0 12px 0;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-weight: normal;
                  position: relative;
                  padding-left: 80px;
                  .type-name {
                    text-align: center;
                    border-radius: 4px;
                    overflow: hidden;
                    font-size: 24px;
                    position: absolute;
                    height: 36px;
                    padding-bottom: 2px;
                    width: 84px;
                    left: 0;
                    top: 2px;
                    font-weight: normal;
                    transform: scale(0.83);
                    transform-origin: 0 0;
                    background: #cccccc;
                    color: #ffffff;
                    text-align: center;
                  }
                }
                .goods-types {
                  min-height: 64px;
                  font-size: 24px;
                  font-weight: 400;
                  color: #555555;
                  margin-top: 6px;

                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  word-break: break-all;
                }

                > .date {
                  font-size: 24px;
                  margin-top: 8px;
                  color: #999999;
                  transform: scale(0.83);
                  transform-origin: left center;
                }
              }
              > .right {
                margin-left: auto;
                align-self: center;
                margin-right: 40px;
              }
            }
          }
          > p {
            width: 100%;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            padding: 13px 20px;
          }
        }
      }
    }
  }

  ::v-deep .sp-overlay {
    background-color: rgba(0, 0, 0, 0.4);
  }
  ::v-deep .sp-dialog {
    width: 540px;
  }
  .dialog {
    padding: 48px 0 0 0;
    > .head {
      padding: 0 40px;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
    }
    > .body {
      padding: 0 40px;
      margin-top: 32px;

      font-weight: 400;

      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #555555;
      letter-spacing: 0;
      line-height: 42px;

      .protocol_name {
        text-decoration: underline;
        color: #658af6;
      }
    }
    > .btn {
      border-top: 1px solid #f4f4f4;

      height: 96px;
      text-align: center;
      font-size: 32px;
      font-weight: 400;

      line-height: 96px;

      background: #4974f5;
      border-radius: 8px;
      color: white;
      margin: 50px 40px 40px;
    }
  }

  ::v-deep .sp-radio__icon {
    height: auto;
    line-height: normal;
    font-size: 0;
  }
}
</style>
