<template>
  <div class="container" :style="{ marginTop: safeTop + 'px' }">
    <sp-sticky
      :style="safeTopStyle"
      style="
        background: url('https://cdn.shupian.cn/sp-pt/wap/2z5tsl5cs4q0000.png');
      "
      offset-top="0"
    />
    <!-- <sp-sticky></sp-sticky> -->
    <!-- S search -->
    <sp-sticky ref="header_sticky" :offset-top="safeTop">
      <div class="search">
        <div class="left-back" @click="uPGoBack">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#FFFFFF"
          ></my-icon>
        </div>
        <div class="search-box">
          <my-icon
            class="search-icon"
            name="sear_ic_sear"
            size="0.3rem"
            color="#FFFFFF"
            :style="{ marginLeft: iconLeft + 'rem' }"
          ></my-icon>
          <input placeholder="搜索商品" readonly @click="clickInputHandle" />
        </div>
      </div>
    </sp-sticky>
    <!-- E search -->
    <div class="container-advice">
      <!-- S countdown -->
      <div class="countdown">
        <div class="special-price"></div>
        <div v-if="isTimerShow" class="count-down">
          <p class="down-time">
            距本场结束还剩
            <span>{{ time.day }}</span
            >天 <span>{{ time.hour }}</span
            >: <span>{{ time.min }}</span
            >: <span>{{ time.sec }}</span>
          </p>
        </div>
      </div>
      <!-- E countdown -->
      <!-- S avtar -->
      <div class="avtars">
        <div
          v-for="item in recommendProductList.slice(0, 3)"
          :key="item.id"
          class="avtar"
          @click="jumpProductDetail(item)"
        >
          <div class="touxiang">
            <img
              height="100%"
              width="100%"
              :src="
                item.imageUrl ||
                'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg'
              "
              alt="商品图片"
            />
          </div>
          <div class="content">{{ item.skuName }}</div>
          <div class="background">
            <div class="bg-img"></div>
            <div v-if="parsePrice(item.specialPrice) !== '面议'" class="money">
              <span>{{ item.specialPrice }}</span
              ><span>元</span>
            </div>
            <div v-else class="money">面议</div>
          </div>
        </div>
      </div>
      <!-- E avtar -->
    </div>

    <div class="container-body" :style="style.containerStyle">
      <sp-sticky :offset-top="headerHeight + safeTop">
        <div class="tabs-box">
          <ul class="tabs-box-items">
            <li
              v-for="(item, index) in activityTypeOptions"
              :key="index"
              class="li-tab"
              :class="{ active: index == currentIndex }"
              @click="menuTab(item, index)"
            >
              {{ item.labelName }}
            </li>
            <!-- <li>99元封顶</li>
          <li>899元封顶</li>
          <li>1999元封顶</li> -->
          </ul>
        </div>
      </sp-sticky>

      <div class="body-content">
        <sp-pull-refresh
          v-model="refreshing"
          :disabled="refreshDisabled"
          @refresh="onRefresh"
        >
          <sp-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-if="activityProductList && activityProductList.length > 0">
              <div
                v-for="(item, index) in activityProductList"
                :key="index"
                @click="jumpProductDetail(item)"
              >
                <div class="body-content-items">
                  <div class="left-content">
                    <img
                      height="100%"
                      width="100%"
                      :src="
                        item.imageUrl ||
                        'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg'
                      "
                      alt="商品图片"
                    />
                    <div class="left-span">独家专售</div>
                  </div>
                  <div class="right-content">
                    <div class="rc-top">
                      <span>好品</span>
                      {{ item.skuName }}
                    </div>
                    <div class="rc-middle">
                      {{ item.remark }}
                    </div>
                    <div class="rc-bottom">
                      <div class="rc-bottom-lf">
                        <template>
                          <div
                            v-if="parsePrice(item.specialPrice) !== '面议'"
                            class="rc-bottom-lf-my"
                          >
                            <div>{{ item.specialPrice }}</div>
                            <div>元</div>
                          </div>
                          <div v-else class="rc-bottom-lf-my">
                            <div>面议</div>
                          </div>
                        </template>
                        <div
                          v-if="parsePrice(item.specialPrice) !== '面议'"
                          class="bf-my"
                        >
                          原价{{ item.skuPrice }}元
                        </div>
                      </div>
                      <div class="rc-bottom-rt">立即抢购</div>
                    </div>
                  </div>
                </div>
                <div class="line"></div>
              </div>
            </div>
            <div v-if="isNoData" class="no-data">
              <img
                src="https://cdn.shupian.cn/sp-pt/wap/images/bzre7lw14o00000.png"
                alt=""
                srcset=""
              />
            </div>
          </sp-list>
        </sp-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import { CountDown, Sticky, List, PullRefresh } from '@chipspc/vant-dgg'
import activityMixin from '@/mixins/activityMixin'
export default {
  name: 'Exclusive',
  components: {
    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_DJZS',
      style: {
        containerStyle: '',
        iconStyle: '',
        searchStyle: '',
      },
      tabs: [
        '全部',
        '99元封顶',
        '899元封顶',
        '1999元封顶',
        '1999元封顶',
        '1999元封顶',
      ],
      time: '',
      list: [],
      items: [
        {
          span1: '好品',
          title: '独家转售',
          content: '公司干净，成都某某国际融资租赁有限公司',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
        {
          span1: '好品',
          title: '独家转售',
          content: '公司干净，成都某某国际融资租赁有限公司',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
        {
          span1: '好品',
          title: '独家转售',
          content: '公司干净，成都某某国际融资租赁有限公司',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
        {
          span1: '好品',
          title: '独家转售',
          content: '公司干净，成都某某国际融资租赁有限公司',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
        {
          span1: '好品',
          title: '独家转售',
          content: '公司干净，成都某某国际融资租赁有限公司',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
        {
          span1: '好品',
          title: '独家转售',
          content: '公司干净，成都某某国际融资租赁有限公司',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
      ],
      hasCity: false,
    }
  },
}
</script>

<style lang="less" scoped>
html::-webkit-scrollbar {
  display: none;
}
.multiRowOverflowDot {
  //width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; //行数
  -webkit-box-orient: vertical;
}
.no-data {
  text-align: center;
  padding-top: 10px;
  img {
    display: block;
    width: 340px;
    height: 340px;
    margin: 0 auto;
  }
  p {
    width: 100%;
    color: #222222;
    font-size: 28px;
  }
}
.container {
  width: 100%;
  height: 746px;
  background: url('https://cdn.shupian.cn/sp-pt/wap/e5ubrp1fm800000.png');
  background-size: 100% auto;
  background-attachment: fixed;
  .search {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    background: url('https://cdn.shupian.cn/sp-pt/wap/e5ubrp1fm800000.png');
    background-size: 100% auto;
    .left-back {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 32px;
      .back_icon {
        width: 40px;
        height: 40px;
      }
    }
    .search-box {
      margin-right: 40px;
      height: 88px;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      background: #000000;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      flex: 1;
      .search-icon {
        margin: 29px 12px 28px 32px;
      }
      input {
        border: none;
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
        line-height: 32px;
        background: transparent;
        display: flex;
        align-items: center;
        &::placeholder {
          /* Internet Explorer 10+ */
          color: #ffffff !important;
        }
      }
    }
  }
  .container-advice {
    margin-bottom: 40px;
    width: 750px;
    // height: 750px;
    // background: linear-gradient(125deg, #e1b876 0%, #b7782c 100%);
    .countdown {
      display: flex;
      justify-content: space-between;
      // justify-content: center;
      .special-price {
        width: 150px;
        height: 30px;
        margin: 36px 0 35px 20px;
        display: flex;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        background-size: 100% 100%;
        background-image: url('https://cdn.shupian.cn/sp-pt/wap/dai4vjldrjs0000.png');
      }
      .count-down {
        margin: 32px 20px 32px 0;
        display: flex;
        flex-direction: row;
        font-size: 30px;

        justify-content: center;
        align-items: center;
        :nth-of-type(1) {
          font-size: 24px;
          font-weight: bold;
          color: #ffedcb;
          line-height: 24px;
          margin-right: 15px;
        }
        .down-time {
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #fefffe;
          line-height: 24px;
          display: flex;
          align-items: center;
          span {
            min-width: 36px;
            white-space: normal;
            height: 36px;
            padding: 6px 4px;
            background: linear-gradient(139deg, #ffe1ab 0%, #fac46e 100%);
            border-radius: 4px;
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #835436;
            line-height: 24px;
            margin: 0 6px;
            text-align: center;
          }
        }
      }
    }
    .avtars {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 40px;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        width: 0 !important;
      }
      div:nth-of-type(1) {
        margin-left: 20px;
      }
      div:nth-of-type(2) {
        margin-left: 8px;
        margin-right: 8px;
      }
      div:nth-of-type(3) {
        margin-right: 20px;
      }

      .avtar {
        width: 226px;
        height: 374px;
        background: #ffffff;
        border-radius: 16px;

        .touxiang {
          width: 226px;
          height: 226px;
          margin: 0;
          // background-size: 100% 100%;
          // -moz-background-size: 100% 100%;
          border-radius: 12px 12px 0px 0px;
          overflow: hidden;
          // background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3117941574,298505346&fm=26&gp=0.jpg');
        }
        .content {
          font-size: 26px;
          font-weight: bold;
          color: #222222;
          line-height: 34px;
          margin: 16px 24px 12px 20px;
          text-overflow: ellipsis;
          word-break: break-all;
          overflow: hidden;
          white-space: normal;
          width: 182px;
          height: 68px;
        }
        .background {
          width: 215px;
          height: 44px;
          border-radius: 8px;
          background: url('https://cdn.shupian.cn/sp-pt/wap/2qtj44rmu8m0000.png');
          background-size: 100% 100%;
          margin: 0 auto 8px auto;
          display: flex;
          justify-content: flex-start;

          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
          line-height: 28px;
          .money {
            font-size: 28px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #835436;
            margin: 0;
            position: relative;
            line-height: 44px;
            span:nth-of-type(2) {
              font-size: 22px;
            }
          }

          .bg-img {
            width: 104px;
            height: 44px;
            margin: 0 6px 0 0;
            border-radius: 8px 0px 0px 8px;
          }
        }
      }
    }
  }
  .container-body {
    width: 750px;
    height: 1720px;
    // background: #ffffff;
    z-index: 1;
    ::v-deep .sp-sticky {
      // outline: 1px solid red;
      border-radius: 24px 24px 0px 0px;
      overflow: hidden;
      width: 100vw;
      &.sp-sticky--fixed {
        border-radius: 0;
      }
      .tabs-box {
        background-color: #fff;
        padding: 32px 20px;
        .tabs-box-items {
          display: flex;
          overflow: auto;
          &::-webkit-scrollbar {
            width: 0 !important;
          }
          .li-tab {
            white-space: nowrap;
            background-color: #f00;
            flex-shrink: 0;
            padding: 19px 24px;
            background: #f5f5f5;
            border-radius: 32px;
            font-size: 26px;
            font-weight: bold;
            color: #222222;
            line-height: 26px;
            margin-right: 16px;
          }
          .active {
            // padding: 17px 42px;
            // font-size: 30px;
            // font-weight: bold;
            color: #835436;
            background: #ec5330;
            background: linear-gradient(139deg, #ffe1ab 0%, #fac46e 100%);
            // border-radius: 32px;
          }

          li:nth-child(1) {
            // margin-left: 20px;
          }
          li:nth-last-child(1) {
            margin-right: 16px;
          }
        }
      }
    }

    .body-content {
      background-color: #fff;
      min-height: 80vh;
      width: 100vw;
      .line {
        width: 710px;
        height: 1px;
        background: #f4f4f4;
        margin: 0 20px;
      }
      ::v-deep .sp-list {
        > div > div:first-child .body-content-items {
          margin-top: 0;
        }
      }
      .body-content-items {
        display: flex;
        justify-content: space-between;
        height: 260px;
        width: 100%;
        // padding: 32px 20px;
        margin: 32px 0;
        padding: 0 20px;
      }
      .left-content {
        position: relative;
        margin-right: 32px;
        width: 260px;
        height: 260px;
        // background: linear-gradient(
        //   180deg,
        //   #46494d 0%,
        //   #797d83 0%,
        //   #414347 100%
        // );
        border-radius: 12px;
        // background-size: 100% 100%;
        // -moz-background-size: 100% 100%;
        overflow: hidden;
        // background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3117941574,298505346&fm=26&gp=0.jpg');
        .left-span {
          position: absolute;
          background: url('https://cdn.shupian.cn/sp-pt/wap/7nccpoc61co0000.png');
          background-size: 100% 100%;
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          top: -6px;
          left: 0;
          padding: 12px 12px 16px 6px;
        }
      }
      .right-content {
        width: 418px;
        display: flex;
        align-content: flex-start;
        flex-direction: column;
        position: relative;
        .rc-top {
          font-size: 32px;
          // height: 84px;
          font-weight: bold;
          color: #222222;
          line-height: 42px;
          .multiRowOverflowDot();

          span {
            background: #ec5330;
            border-radius: 4px;
            padding: 8px;
            font-size: 20px;
            font-weight: bold;
            color: #ffffff;
            margin-top: 6px;
          }
        }
        .rc-middle {
          margin: 16px 0 58px 0;
          width: 409px;
          height: 22px;
          line-height: 22px;
          font-size: 22px;
          font-weight: 400;
          color: #222222;
          word-break: break-all;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 1px 0;
        }
        .rc-bottom {
          position: absolute;
          display: flex;
          justify-content: space-between;
          bottom: 0;
          right: 0;
          width: 100%;
          .rc-bottom-lf {
            margin-top: 5px;
            .rc-bottom-lf-my {
              display: flex;
              flex-direction: row;
              align-content: flex-start;
              align-items: center;
              padding-top: 0.05rem;
              div {
                color: #ec5330;
              }
              div:nth-of-type(1) {
                font-size: 40px;
                font-weight: bold;
                line-height: 40px;
              }
              div:nth-of-type(2) {
                font-size: 22px;
                font-weight: bold;
                margin: 13px 0 0 2px;
                line-height: 22px;
              }
            }
            .bf-my {
              display: flex;
              flex-direction: row;
              margin-top: 8px;
              font-size: 22px;
              font-weight: 400;
              color: #999999;
              line-height: 22px;
              margin-left: 2px;
            }
          }
          .rc-bottom-rt {
            //width: 176px;
            height: 80px;
            background: linear-gradient(139deg, #ffe1ab 0%, #fac46e 100%);
            border-radius: 8px;
            border-radius: 8px;
            font-size: 30px;
            font-weight: bold;
            color: #835436;
            line-height: 30px;
            padding: 25px 28px;
            text-align: center;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
