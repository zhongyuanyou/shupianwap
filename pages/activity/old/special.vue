<template>
  <div class="container" :style="{ marginTop: safeTop + 'px' }">
    <!-- <sp-sticky
      :style="safeTopStyle"
      style="
        background: url('https://cdn.shupian.cn/sp-pt/wap/images/f4eiumfehnc0000.png');
      "
      offset-top="0"
    /> -->
    <!-- S search -->
    <sp-sticky ref="header_sticky" :offset-top="safeTop">
      <div class="search">
        <!-- <img :src="$ossImgSetV2(imageHead)" alt="" /> -->
        <img class="image-head" :src="imageHead" alt="" />
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
          <input placeholder="搜索商品" readonly @click="clickInputHandle" />
        </div>
      </div>
    </sp-sticky>
    <!-- E search -->
    <div class="container-advice">
      <img class="container-img" :src="containerImage" alt="" />
      <!-- S countdown -->
      <div class="countdown">
        <div class="special-price">
          <div class="night"></div>
        </div>
        <div v-if="isTimerShow" class="count-down">
          <div class="down-time">
            <div class="end">距本场结束还剩</div>
            <div>{{ time.day }}</div>
            <div>天</div>
            <div>{{ time.hour }}</div>
            <div>:</div>
            <div>{{ time.min }}</div>
            <div>:</div>
            <div>{{ time.sec }}</div>
          </div>
        </div>
      </div>
      <!-- E countdown -->
      <!-- S avtar -->
      <div class="avtars">
        <div
          v-for="item in recommendProductList"
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
              <span>{{
                item.specialUnit ? item.specialNewPrice : item.specialPrice
              }}</span
              ><span>{{ item.specialUnit || '元' }}</span>
            </div>
            <div v-else class="money">面议</div>
          </div>
        </div>
      </div>
      <!-- E avtar -->
    </div>
    <div class="body-box">
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
                      <div class="goods-name">
                        <span class="rc-span">特卖</span>
                        <span class="rc-span">千万补贴</span>{{ item.skuName }}
                      </div>
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
                          <div
                            v-if="parsePrice(item.specialPrice) !== '面议'"
                            class="rc-bottom-lf-my"
                          >
                            <div>
                              {{
                                item.specialUnit
                                  ? item.specialNewPrice
                                  : item.specialPrice
                              }}
                            </div>
                            <div>{{ item.specialUnit || '元' }}</div>
                          </div>
                          <div v-else class="rc-bottom-lf-my">
                            <div>面议</div>
                          </div>

                          <div
                            v-if="parsePrice(item.specialPrice) !== '面议'"
                            class="bf-my"
                          >
                            原价{{
                              item.skuUnit ? item.skuNewPrice : item.skuPrice
                            }}{{ item.skuUnit || '元' }}
                          </div>
                        </div>
                        <div class="rc-bottom-rt">去抢购</div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  CountDown,
  Sticky,
  List,
  WorkTabSort,
  WorkTabSortItem,
  PullRefresh,
} from '@chipspc/vant-dgg'
import activityMixin from '~/mixins/activityMixin_old'
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
      // specType: 'HDZT_ZTTYPE_QWBT',
      nowIndex: 0,
      list: [],
      style: {
        iconStyle: '',
        searchStyle: '',
      },
      tabs: ['全部', '99元封顶', '899元封顶', '1999元封顶'],
      hasCity: true,
      // imageHead: '4c82jr0u5nk0000.png',
      imageHead: 'https://cdn.shupian.cn/sp-pt/wap/4c82jr0u5nk0000.png',
      imageContainer: 'https://cdn.shupian.cn/sp-pt/wap/b46sw5kz7xs0000.png',
      containerImage: 'https://cdn.shupian.cn/sp-pt/wap/b46sw5kz7xs0000.png',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
    }),
    userInfo() {
      return this.$store.state.user
    },
  },
}
</script>

<style lang="less" scoped>
@font-medium:pingfangsc-medium, PingFang SC;
html::-webkit-scrollbar {
  display: none;
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

.multiRowOverflowDot {
  //width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; //行数
  -webkit-box-orient: vertical;
}
.container {
  position: relative;
  .search {
    display: flex;
    align-items: center;
    height: 158px;
    .image-head {
      position: absolute;
      height: auto;
      width: 100%;
    }
    .left-back {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 32px;
      position: absolute;
      top: 50px;
      .back_icon {
        width: 40px;
        height: 40px;
      }
    }
    .search-box {
      margin-right: 20px;
      flex: 1;
      height: 88px;
      border-radius: 8px;
      background: #000000;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.1);
      display: inline-flex;
      align-items: center;
      position: absolute;
      left: 104px;
      width: 606px;
      top: 25px;
      .search-icon {
        margin: 29px 12px 28px 32px;
      }
      input {
        display: block;
        border: none;
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
        line-height: 32px;
        background: transparent;
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
    height: 587px;
    position: relative;
    .container-img {
      width: 100%;
      height: auto;
      position: absolute;
      z-index: 0;
    }

    /* ::v-deep.sp-sticky--fixed {
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
      align-items: center;
      z-index: 1;
      .special-price {
        position: absolute;
        left: 20px;
        display: flex;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        top: 36px;
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
        display: flex;
        flex-direction: row;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 39px;
        right: 20px;
        .down-time {
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #fefffe;
          line-height: 24px;
          display: flex;
          align-items: center;
          .end {
            margin-top: 1px !important;
          }

          div:nth-child(2n + 1) {
            background: none;
            font: bold 24px/24px PingFangSC-Medium, PingFang SC;
            color: #fefffe;
            padding: 0;
          }

          div {
            white-space: normal;
            padding: 6px 4px 5px 4px;
            background: #ffffff;
            border-radius: 4px;
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
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
      overflow-y: hidden;
      position: absolute;
      z-index: 1;
      left: 20px;
      top: 101px;
      &::-webkit-scrollbar {
        width: 0 !important;
      }

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
          border-radius: 12px 12px 0px 0px;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            #46494d 0%,
            #797d83 0%,
            #414347 100%
          );
        }
        .content {
          font-size: 26px;
          font-weight: bold;
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
          border-radius: 0px 0px 12px 12px;
          margin: 12px 8px 8px 8px;
          display: flex;
          justify-content: flex-start;
          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
          line-height: 28px;
          background: url('https://cdn.shupian.cn/sp-pt/wap/2xojhogcpt40000.png');
          background-size: 100% 100%;
          .money {
            margin: 8px;
            font-family: PingFangSC-Medium, PingFang SC;
            color: #ffffff;
            font-weight: bold;
            transform: scale(0.8);
            width: 4rem;
            position: relative;
            left: 0.36rem;
            span:nth-of-type(1) {
              line-height: 28px;
              font-size: 28px;
              font-weight: bold;
            }
            span:nth-of-type(2) {
              font-size: 22px;
              line-height: 22px;
              font-weight: bold;
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

  .body-box {
    position: absolute;
    top: 667px;
    .tabs-box {
      width: 100vw;
      border-radius: 24px 24px 0 0;
      ::v-deep .sp-sticky {
        border-radius: 24px 24px 0px 0px;
        background-color: #fff;
        overflow: hidden;
        padding: 0 20px;
        &.sp-sticky--fixed {
          border-radius: 0 0 0 0;
        }
      }

      .tabs-box-items {
        padding: 32px 0 0 0;
        display: flex;
        background-color: #ffffff;
        justify-content: flex-start;
        overflow-x: scroll;
        &::-webkit-scrollbar {
          width: 0 !important;
        }
        .li-tab {
          white-space: nowrap;
          padding: 0 24px;
          background: #f5f5f5;
          border-radius: 32px;
          font-size: 26px;
          font-weight: bold;
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
          font-weight: bold;
          color: #ffffff;
          line-height: 30px;
          background: #ec5330;
          font-family: PingFangSC-Medium, PingFang SC;
          height: 64px;
        }
      }
    }
    .container-body {
      background: #ffffff;
      z-index: 1;
      padding: 0 20px;
      &::after {
        display: block;
        clear: both;
      }
      .body-content {
        background-color: #fff;
        min-height: 80vh;
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
          flex: 1;
          width: 418px;
          display: flex;
          align-content: flex-start;
          position: relative;
          height: 260px;
          flex-direction: column;
          .goods-name {
            font-size: 32px;
            height: 92px;
            font-weight: bold;
            color: #222222;
            line-height: 0.42rem;
            padding-bottom: 24px;
            .multiRowOverflowDot();
            span {
              margin-right: 4px;
              background: #ec5330;
              border-radius: 4px;
              padding: 6px 8px;
              font-size: 20px;
              font-weight: bold;
              color: #ffffff;
              line-height: 20px;
            }
          }
          .rc-top {
            font-size: 32px;
            font-weight: bold;
            color: #222222;
            line-height: 32px;
            text-overflow: ellipsis;
            word-break: break-all;
            font-family: PingFangSC-Medium, PingFang SC;
            overflow: hidden;
            white-space: normal;
            max-height: 84px;
            line-height: 42px;
            text-indent: 172px;
            .multiRowOverflowDot();

            .rc-title {
              font-size: 32px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              line-height: 42px;
            }
          }
          .rc-middle {
            display: flex;
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
              //height: 100px;
              background: yellow;
              width: 176px;
              //height: 80px;
              font-family: PingFangSC-Medium, PingFang SC;
              background: linear-gradient(139deg, #fe525d 0%, #fd3543 100%);
              border-radius: 8px;
              text-align: center;
              font-size: 30px;
              font-weight: bold;
              color: #ffffff;
              line-height: 80px;
            }
          }
        }
      }
    }
  }
}
</style>
