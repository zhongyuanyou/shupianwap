<template>
  <div v-show="show" class="box">
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
          <p v-if="help">{{ help }}</p>
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
        <div v-if="tablist[tabAct].is" class="calculation">
           {{ num ? '已选中优惠券，可抵扣' : '请选择优惠券' }}
          <span v-if="num" class="red">{{ num }}元</span>
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
                  <div v-if="item.cardType === 1">
                    <div class="coupon_price">
                      {{ item.rebatePrice }}
                    </div>
                    <div v-if="item.rebateNeedPrice === 0" class="can_use">
                      无门槛
                    </div>
                    <div v-else class="can_use">
                      满{{ item.rebateNeedPrice }}元可用
                    </div>
                  </div>
                  <div v-else>
                    <div class="coupon_discount">
                      {{ item.discount }}
                      <span>折</span>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="data">
                    <h1 class="title">
                      <span class="type-name">{{
                        item.cardType == 1 ? '满减卡' : '折扣卡'
                      }}</span>
                      {{ item.cardName }}
                    </h1>
                    <!-- <p v-if="item.useLimit === 1">全品类通用</p> -->
                    <p v-if="item.useLimit === 2">仅限指定品类使用</p>
                    <p v-else-if="item.useLimit === 3">仅限指定商品使用</p>
                    <p class="date">
                      {{ formatTime(item.validateDateStart) }}-{{
                        formatTime(item.validateDateEnd)
                      }}
                    </p>
                  </div>
                  <div class="right">
                    <sp-radio-group v-model="radio">
                      <sp-radio
                        :name="index"
                        disabled
                        :class="radio === index ? 'act' : ''"
                      ></sp-radio>
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
              <p @click="sum">确定</p>
            </div>
          </div>
        </div>
        <div v-else class="databox nodatabox">
          <div v-if="nolist.length > 0" class="listbox">
            <!-- {"id":"8101730035742867456","cardName":"满减活动卡1",
            "cardId":"8101719748410933248","cardType":1,
            "rebateNeedPrice":"2.00","rebatePrice":"1.00",
            "validateDate":999,
            "validateDateStart":"2021-07-09 14:46:17","validateDateEnd":"2024-04-03 14:46:17"}]} -->

            <div v-for="(item, index) in nolist" :key="index" class="nolist">
              <div class="top">
                <div class="left">
                  <div v-if="item.cardType === 1">
                    <div class="coupon_price">
                      {{ item.rebatePrice }}
                    </div>
                    <div v-if="item.rebateNeedPrice === 0" class="can_use">
                      无门槛
                    </div>
                    <div v-else class="can_use">
                      满{{ item.rebateNeedPrice }}元可用
                    </div>
                  </div>
                  <div v-else>
                    <div class="coupon_discount">
                      {{ item.discount }}
                      <span>折</span>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="data">
                    <h1 class="title">
                      <span class="type-name">{{
                        item.cardType == 1 ? '满减卡' : '折扣卡'
                      }}</span>
                      {{ item.cardName }}
                    </h1>
                    <p v-if="item.marketingCouponVO.useType === 2">
                      仅限指定品类使用
                    </p>
                    <p v-if="item.marketingCouponVO.useType === 3">
                      仅限指定商品使用
                    </p>
                    <p class="date">
                      {{ formatTime(item.validateDateStart) }}-{{
                        formatTime(item.validateDateEnd)
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <p>订单金额不符合使用条件</p>
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
  </div>
</template>

<script>
import { Popup, Icon, RadioGroup, Radio, Toast } from '@chipspc/vant-dgg'
import { order } from '@/api/index'
export default {
  name: 'PlaceOrderPopup',
  components: {
    Popup,
    Icon,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
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
  },
  data() {
    return {
      tabAct: 0,
      checkarr: '',
      radio: null,
      // num: 0,
    }
  },
  computed: {
    num() {
      if (this.checkarr) {
        if (this.checkarr.cardType === 1) {
          return this.checkarr.rebatePrice
        } else {
          const price =
            this.$route.query.type === 'shopcar'
              ? this.$parent.order.skuTotalPrice
              : this.$parent.order.salesPrice

          const discount = parseFloat(this.checkarr.discount) / 10
          const discountNum = ((10 - discount) / 10) * price

          return Math.ceil(discountNum * 100) / 100
        }
      }
      return 0
    },
  },
  mounted() {},
  methods: {
    formatTime(time) {
      if (time) {
        return time.replaceAll('-', '.').split(' ')[0]
      }
      return ''
    },
    sum() {
      // 在后台进行精度计算
      order
        .getcalculation(
          { axios: this.$axios },
          {
            price:
              this.$route.query.type === 'shopcar'
                ? this.$parent.order.skuTotalPrice
                : this.$parent.order.salesPrice,
            culation: this.num,
          }
        )
        .then((result) => {
          // this.$parent.price = result

          this.$emit('change', result, -this.num, this.checkarr)

          this.close()
        })
        .catch((e) => {
          Toast({
            message: e.data.error,
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
            overlay: true,
          })
        })
    },
    checkitem(item, index) {
      if (this.radio === index) {
        this.checkarr = ''
        this.radio = -1
      } else {
        this.checkarr = item
        this.radio = index
      }
    },
    close(data) {
      this.$emit('close', data)
    },
    tabactivefn(item, index) {
      this.tabAct = index
      this.$emit('tabactive', item, index)
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  padding: 20px 0;
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
    }
  }
  .databox {
    height: calc(67vh - 324px);
    .listbox {
      height: calc(100% - 180px);
      overflow-y: auto;
      padding: 0 40px;
      > .list {
        margin: 24px auto 0;
        width: 670px;
        height: 212px;
        background: #ffffff;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        display: flex;
        background: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png')
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
            padding-top: 44px;
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
          margin-left: 24px;
          > .data {
            width: 335px;
            .title {
              font-size: 32px;
              color: #222222;
              line-height: 40px;
              margin: 30px 0 12px 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span {
                border-radius: 4px;
                padding: 2px;
                font-size: 20px;
              }
              .type-name {
                color: #ffffff;
                background-image: linear-gradient(
                  90deg,
                  #fa6d5a 0%,
                  #fa5741 100%
                );
              }
            }
            > p {
              font-size: 24px;
              font-weight: 400;
              color: #555555;
              margin-top: 18px;
            }
            > .date {
              margin-top: 13px;
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
        height: 271px;
        margin: 24px auto 0;
        width: 670px;
        background: url(https://cdn.shupian.cn/sp-pt/wap/2u00dwnv4aw0000.png)
          no-repeat;
        background-size: 100%;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        > .top {
          display: flex;
          > .left {
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
              padding-top: 44px;
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
                margin: 30px 0 12px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span {
                  border-radius: 4px;
                  padding: 2px;
                  font-size: 20px;
                }
                .type-name {
                  background: #cccccc;
                  color: #ffffff;
                }
              }
              > p {
                font-size: 24px;
                font-weight: 400;
                color: #555555;
                margin-top: 18px;
              }
              > .date {
                margin-top: 13px;
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
</style>
