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
            ><b v-if="index == 0">{{ `(${datalist.length})` }}</b>
            <b v-else>{{ `(${nolist.length})` }}</b>
            <i class="icon"></i>
          </p>
        </div>
        <div v-if="tablist[tabAct].is" class="calculation">
          {{ calculation }}
          <span class="red">{{ num }}元</span>
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
                  <h1>{{ item.reducePrice }}</h1>
                  <p>满{{ item.fullPrice }}元可用</p>
                </div>
                <div class="right">
                  <div class="data">
                    <h1>{{ item.couponName }}</h1>
                    <p v-if="item.useType === 1">全品类通用</p>
                    <p v-else-if="item.useType === 2">限定“部分类别产品”使用</p>
                    <p v-else>限定“指定产品”使用</p>
                    <p class="date">{{ item.serviceLife }}</p>
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
            <div v-for="(item, index) in nolist" :key="index" class="nolist">
              <div class="top">
                <div class="left">
                  <h1>{{ item.reducePrice }}</h1>
                  <p>满{{ item.fullPrice }}元可用</p>
                </div>
                <div class="right">
                  <div class="data">
                    <h1>{{ item.couponName }}</h1>
                    <p v-if="item.useType === 1">全品类通用</p>
                    <p v-else-if="item.useType === 2">限定“部分类别产品”使用</p>
                    <p v-else>限定“指定产品”使用</p>
                    <p class="date">{{ item.serviceLife }}</p>
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
    calculation: {
      type: String,
      default() {
        return '请选择优惠券'
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
      num: 0,
    }
  },
  mounted() {},
  methods: {
    sum() {
      order
        .getcalculation(
          { axios: this.$axios },
          {
            price:
              this.$route.query.type === 'shopcar'
                ? this.$parent.order.skuTotalPrice
                : this.$parent.order.salesPrice,
            culation: this.checkarr.reducePrice || 0,
          }
        )
        .then((result) => {
          this.$parent.price = result
          this.$parent.popupshow = false
          this.$parent.coupon = `-${this.checkarr.reducePrice}`
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
        this.num = 0
      } else {
        this.checkarr = item
        this.radio = index
        this.num = this.checkarr.reducePrice
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
        margin-top: 24px;
        height: 212px;
        background: #ffffff;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        display: flex;
        background: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png')
          no-repeat;
        background-size: 100%;
        /deep/.sp-radio__icon--checked .sp-icon {
          color: #fff;
          background-color: #4974f5 !important;
          border-color: #4974f5;
        }
        /deep/.sp-radio__icon--disabled {
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
          > h1 {
            font-size: 72px;
            font-family: Bebas;
            font-weight: 400;
            text-align: center;
            padding: 0 10px;
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
          padding: 25px 0;
          display: flex;
          margin-left: 24px;
          > .data {
            width: 335px;
            > h1 {
              font-size: 32px;
              color: #222222;
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
        margin-top: 24px;
        background: url(https://img10.dgg.cn/pt03/wap/83kzvunu5vw0000.png)
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
            > h1 {
              font-size: 72px;
              font-family: Bebas;
              font-weight: 400;
              text-align: center;
              padding: 0 10px;
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
              > h1 {
                font-size: 32px;
                color: #222222;
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
