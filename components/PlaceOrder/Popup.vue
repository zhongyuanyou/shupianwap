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
            ><b v-if="item.num">{{ `(${item.num})` }}</b>
            <i class="icon"></i>
          </p>
        </div>
        <div v-if="tablist[tabAct].is" class="calculation">
          {{ calculation }}
          <span class="red">{{ num }}</span>
        </div>
        <div v-if="tablist[tabAct].is">
          <div class="databox">
            <div class="listbox">
              <div v-for="(item, index) in datalist" :key="index" class="list">
                <div class="left">
                  <h1>{{ item.money }}</h1>
                  <p>{{ item.data }}</p>
                </div>
                <div class="right">
                  <div class="data">
                    <h1>{{ item.name }}</h1>
                    <p>{{ item.ms }}</p>
                    <p class="date">{{ item.date }}</p>
                  </div>
                  <div class="right">
                    <Checkbox v-model="item.check"></Checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn">
              <p>确定</p>
            </div>
          </div>
        </div>
        <div v-else class="databox nodatabox">
          <div class="listbox">
            <div v-for="(item, index) in datalist" :key="index" class="nolist">
              <div class="top">
                <div class="left">
                  <h1>{{ item.money }}</h1>
                  <p>{{ item.data }}</p>
                </div>
                <div class="right">
                  <div class="data">
                    <h1>{{ item.name }}</h1>
                    <p>{{ item.ms }}</p>
                    <p class="date">{{ item.date }}</p>
                  </div>
                </div>
              </div>
              <p>{{ item.nodata }}</p>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup, Icon, Checkbox } from '@chipspc/vant-dgg'
export default {
  name: 'PlaceOrderPopup',
  components: {
    Popup,
    Icon,
    Checkbox,
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
    num: {
      type: String,
      default() {
        return ''
      },
    },
    datalist: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      tabAct: 0,
    }
  },
  methods: {
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
        > .left {
          width: 201px;
          height: 100%;
          background: red;
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
        background: #ffffff;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        > .top {
          display: flex;
          > .left {
            width: 201px;
            height: 212px;
            background: red;
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
