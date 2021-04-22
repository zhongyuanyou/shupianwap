<template>
  <div class="container" :style="{ marginTop: safeTop + 'px' }">
    <!-- S search -->
    <sp-sticky ref="header_sticky" :offset-top="safeTop">
      <div class="search">
        <div class="left-back" :style="style.iconStyle" @click="uPGoBack">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#FFFFFF"
          ></my-icon>
        </div>
        <div class="search-box" :style="style.searchStyle">
          <my-icon
            class="search-icon"
            name="sear_ic_sear"
            size="0.3rem"
            color="#FFFFFF"
            :style="{ marginLeft: iconLeft + 'rem' }"
          ></my-icon>
          <input
            placeholder="搜索特卖商品"
            readonly
            @click="clickInputHandle"
          />
        </div>
      </div>
    </sp-sticky>
    <!-- E search -->
    <!-- <sp-sticky></sp-sticky> -->
    <div class="container-advice">
      <!-- S countdown -->
      <div class="countdown">
        <div class="special-price">
          <div class="night"></div>
        </div>
        <div class="count-down">
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
      <!-- S avtar -->
      <div class="avtars">
        <!-- TODO 换回来activityTypeOptions -->
        <div
          v-for="item in activityProductList"
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
            <div class="money">
              <span>{{ item.specialPrice }}</span
              ><span>元</span>
            </div>
          </div>
        </div>
        <!-- <div class="avtar">
          <div class="touxiang"></div>
          <div class="content">视频作品著作权申请</div>
          <div class="background">
            <div class="bg-img"></div>
            <div class="money"><span>999</span><span>元</span></div>
          </div>
        </div>
        <div class="avtar">
          <div class="touxiang"></div>
          <div class="content">视频作品著作权申请</div>
          <div class="background">
            <div class="bg-img"></div>
            <div class="money"><span>999</span><span>元</span></div>
          </div>
        </div> -->
      </div>
      <!-- E avtar -->
    </div>

    <sp-sticky class="tabs-box" :offset-top="headerHeight + safeTop">
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
      </ul>
      <!-- <div>
        </div> -->
    </sp-sticky>
    <div class="container-body">
      <div class="body-content">
        <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <sp-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="(item, index) in activityProductList"
              :key="index"
              @click="jumpProductDetail(item)"
            >
              <!-- <div
              v-for="(item, index) in productList"
              :key="index"
              @click="jumpProductDetail(item)"
            > -->
              <div class="body-content-items">
                <div
                  class="left-content"
                  :style="{ 'background-image': item.imageUrl }"
                >
                  <div class="left-countdown">
                    距离结束{{ endTime.hour }}:{{ endTime.min }}:{{
                      endTime.sec
                    }}
                  </div>
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
                <div class="right-content">
                  <p class="rc-top">
                    <span class="rc-span">
                      <span>特卖</span>
                      <span>千万补贴</span>
                    </span>
                    <span class="rc-title">{{ item.skuName }}</span>
                  </p>
                  <div class="rc-middle">
                    <div
                      v-for="tag in item.tags.split(',').slice(0, 2)"
                      :key="tag"
                    >
                      {{ overflowDot(tag, 6) }}
                    </div>
                  </div>
                  <div class="rc-bottom">
                    <div class="rc-bottom-lf">
                      <div class="rc-bottom-lf-my">
                        <div>{{ item.specialPrice }}</div>
                        <div>元</div>
                      </div>
                      <div class="bf-my">原价{{ item.skuPrice }}元</div>
                    </div>
                    <div class="rc-bottom-rt">
                      <div>去抢购</div>
                      <div>
                        已成交{{
                          item.specialInventory - item.specialResidueInventory
                        }}单
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </sp-list>
        </sp-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CountDown,
  Sticky,
  List,
  WorkTabSort,
  WorkTabSortItem,
  PullRefresh,
} from '@chipspc/vant-dgg'
import activityMixin from '@/mixins/activityMixin'

export default {
  name: 'Special',
  components: {
    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [WorkTabSort.name]: WorkTabSort,
    [WorkTabSortItem.name]: WorkTabSortItem,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_TM',
      nowIndex: 0,
      list: [],
      style: {
        iconStyle: '',
        searchStyle: '',
      },
      tabs: ['全部', '99元封顶', '899元封顶', '1999元封顶'],
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  background: url('https://cdn.shupian.cn/sp-pt/wap/erdd6dsvru00000.png');
  background-size: 100% auto;
  background-attachment: fixed;
  .search {
    background: url('https://cdn.shupian.cn/sp-pt/wap/erdd6dsvru00000.png');
    background-size: 100% auto;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 16px;
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
      margin-right: 20px;
      flex: 1;
      height: 88px;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      background: #000000;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      // justify-content: space-between;
      align-items: center;
      .search-icon {
        margin: 29px 12px 28px 32px;
      }
      input {
        border: none;
        font-size: 32px;
        font-weight: 500;
        color: #ffffff;
        line-height: 32px;
        background: transparent;
        display: flex;
        align-items: center;

        font-family: PingFangSC-Medium, PingFang SC;

        &::placeholder {
          /* Internet Explorer 10+ */
          color: #ffffff !important;
        }
      }
    }
  }
  .container-advice {
    width: 100%;
    // height: 746px;
    // background: linear-gradient(to right, #fe8000, #ff4c00);
    padding: 0 20px;

    margin-bottom: 32px;

    /* /deep/.sp-sticky--fixed {
      max-width: 10rem;
      width: 100%;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      background: linear-gradient(to right, #fe8000, #ff4c00);
    } */
    .countdown {
      display: flex;
      justify-content: space-between;
      // justify-content: center;
      align-items: center;
      .special-price {
        margin: 32px 0 36px 0px;
        display: flex;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        .night {
          width: 158px;
          height: 31px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          background-image: url('https://cdn.shupian.cn/sp-pt/wap/7i50w7a30oo0000.png');
        }
        .special {
          width: 72px;
          height: 29px;
          background: #fff37f;
          margin: 0 0 0 2px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          background-image: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171210%2Ff010a6e7f6864fccad3c9ba2b4d0a467.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617336043&t=8c59d6d00865e6bff20ca88933fde51c');
        }
      }
      .count-down {
        margin: 32px 0px 36px 0;
        display: flex;
        flex-direction: row;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        .down-time {
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #fefffe;
          line-height: 24px;
          display: flex;
          align-items: center;
          span {
            width: 36px;
            height: 36px;
            padding: 6px 4px;
            background: #ffffff;
            border-radius: 4px;
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ec5330;
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
      overflow-x: scroll;

      .avtar {
        width: 226px;
        height: 366px;
        background: #ffffff;
        border-radius: 16px;
        margin-right: 16px;
        .touxiang {
          width: 210px;
          height: 210px;
          margin: 8px 8px 16px 8px;
          background-size: cover;
          background-repeat: no-repeat;
          // -moz-background-size: 100% 100%;
          border-radius: 12px 12px 0px 0px;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            #46494d 0%,
            #797d83 0%,
            #414347 100%
          );
          // background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3117941574,298505346&fm=26&gp=0.jpg');
        }
        .content {
          font-size: 26px;
          font-weight: 500;
          color: #222222;
          line-height: 34px;
          margin: 0 24px 0 20px;
          text-overflow: ellipsis;
          word-break: break-all;
          overflow: hidden;
          white-space: normal;
          width: 182px;
          height: 68px;
          font-family: PingFangSC-Medium, PingFang SC;
        }
        .background {
          width: 210px;
          height: 44px;
          // background: #ec5330;
          border-radius: 0px 0px 12px 12px;
          margin: 12px 8px 8px 8px;
          display: flex;
          justify-content: flex-start;
          font-size: 28px;
          font-weight: 500;
          color: #ffffff;
          line-height: 28px;
          background: url('https://cdn.shupian.cn/sp-pt/wap/2xojhogcpt40000.png');
          background-size: 100% 100%;
          .money {
            margin: 8px;
            font-family: PingFangSC-Medium, PingFang SC;
            color: #ffffff;
            font-weight: 500;
            span:nth-of-type(1) {
              line-height: 28px;
              font-size: 28px;
            }
            span:nth-of-type(2) {
              font-size: 22px;
              line-height: 22px;
            }
          }
          .bg-img {
            width: 97px;
            height: 44px;
            margin: 0;
            border-radius: 0px 0px 0px 12px;
          }
        }
      }
    }
  }

  .tabs-box {
    width: 100vw;
    /deep/ .sp-sticky {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      overflow: hidden;
      &.sp-sticky--fixed {
        border-radius: 0 0 0 0;
        .tabs-box-items {
          padding: 32px 20px;
        }
      }
    }

    .tabs-box-items {
      padding: 32px 20px;
      display: flex;
      background-color: #ffffff;
      justify-content: flex-start;
      .li-tab {
        padding: 0 24px;
        background: #f5f5f5;
        border-radius: 32px;
        font-size: 26px;
        font-weight: 500;
        color: #222222;
        line-height: 26px;
        display: flex;
        align-items: center;
        height: 64px;
        margin-right: 16px;
      }
      .active {
        padding: 0 42px;
        font-size: 30px;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
        background: #ec5330;
        font-family: PingFangSC-Medium, PingFang SC;
        height: 64px;
      }
    }
  }
  .container-body {
    width: 100%;
    // height: auto;
    background: #ffffff;
    z-index: 1;
    // top: 622px;
    padding: 0 20px;
    .body-content {
      position: absolute;
      .line {
        height: 1px;
        background: #f4f4f4;
      }
      .body-content-items {
        display: flex;
        justify-content: space-between;
        height: 332px;
        width: 100%;
        padding: 32px 0;
      }
      .left-content {
        position: relative;
        margin-right: 32px;
        width: 260px;
        overflow: hidden;
        height: 260px;
        background: linear-gradient(
          180deg,
          #46494d 0%,
          #797d83 0%,
          #414347 100%
        );
        border-radius: 12px;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        // background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3117941574,298505346&fm=26&gp=0.jpg');
        .left-countdown {
          height: 40px;
          font-size: 22px;
          font-weight: 400;
          color: #ffffff;
          line-height: 40px;
          padding: 0 23px 0 12px;
          position: absolute;
          top: 0px;
          left: 0px;
          word-break: break-all;
          background: #ec5330;
          border-radius: 24px 0px 98px 0px;
          font-family: PingFangSC-Regular, PingFang SC;
        }
      }
      .right-content {
        width: 418px;
        display: flex;
        align-content: flex-start;
        position: relative;
        height: 260px;
        flex-direction: column;
        .rc-top {
          font-size: 32px;
          font-weight: 500;
          color: #222222;
          line-height: 32px;
          text-overflow: ellipsis;
          word-break: break-all;
          font-family: PingFangSC-Medium, PingFang SC;
          overflow: hidden;
          white-space: normal;
          height: 84px;
          line-height: 42px;
          .rc-span {
            display: inline-flex;
            align-items: center;
            span:nth-child(1) {
              margin-right: 8px;
            }
            span {
              height: 32px;
              line-height: 32px;
              background: #ec5330;
              border-radius: 4px;
              padding: 0px 8px;
              font-size: 20px;
              font-weight: 500;
              color: #ffffff;
              // line-height: 20px;
              display: flex;
              align-items: center;
              font-family: PingFangSC-Medium, PingFang SC;
            }
          }
          .rc-title {
            // line-height: 28px;
            // background: #f0f2f5;
            // border-radius: 4px;

            font-size: 32px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            line-height: 42px;
          }
        }
        .rc-middle {
          display: flex;
          // justify-content: space-between;
          align-content: flex-start;
          margin-top: 12px;
          div {
            font-size: 20px;
            font-weight: 400;
            color: #5c7499;
            line-height: 28px;
            padding: 0 6px;
            background: #f0f2f5;
            border-radius: 4px;
            margin-right: 8px;
            font-family: PingFangSC-Regular, PingFang SC;
          }
        }
        .rc-bottom {
          position: absolute;
          bottom: 0;
          display: flex;
          width: 100%;
          justify-content: space-between;
          .rc-bottom-lf {
            // margin-top: 60px;
            .rc-bottom-lf-my {
              display: flex;
              flex-direction: row;
              align-content: flex-start;
              padding-top: 0.05rem;
              align-items: center;
              div {
                color: #ec5330;
              }
              div:nth-of-type(1) {
                font-size: 40px;
                height: 40px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                line-height: 40px;
              }
              div:nth-of-type(2) {
                font-size: 22px;
                font-weight: 500;
                margin: 13px 0 0 2px;
                line-height: 22px;
              }
            }
            .bf-my {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-top: 8px;
              font-size: 22px;
              font-weight: 400;
              color: #999999;
              line-height: 22px;
              margin-left: 2px;
            }
          }
          .rc-bottom-rt {
            width: 100px;
            height: 100px;
            background: yellow;
            // margin-top: 60px;
            width: 176px;
            height: 80px;
            font-family: PingFangSC-Medium, PingFang SC;
            background: linear-gradient(139deg, #fe525d 0%, #fd3543 100%);
            border-radius: 8px;
            div:nth-of-type(1) {
              padding: 12px 0 4px 0;
              text-align: center;
              font-size: 30px;
              font-weight: 500;
              color: #ffffff;
              line-height: 30px;
            }
            div:nth-of-type(2) {
              font-size: 22px;
              font-weight: 400;
              color: #ffffff;
              line-height: 22px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
