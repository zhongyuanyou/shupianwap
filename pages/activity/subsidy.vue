<template>
  <div class="container" :style="{ paddingTop: safeTop + 'px' }">
    <div
      class="rule-tag"
      :style="{ top: convert2vw(safeTop + headerHeight) + 'vw' }"
      @click="$router.push('/login/protocol?categoryCode=protocol100034')"
    >
      规则
    </div>
    <sp-sticky
      :style="safeTopStyle"
      style="
        background: url('https://cdn.shupian.cn/sp-pt/wap/images/5xaor0rxs3g0000.png');
      "
      offset-top="0"
    />
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
      <!-- S advert -->
      <div class="advert_box">
        <div
          v-for="item in splittedRecommendProduct"
          :key="item.id"
          class="advert_item"
          @click="jumpProductDetail(item)"
        >
          <div class="advert_item-img">
            <div class="advert_item-angle"></div>
            <div class="advert_item-tag">真便宜 不用算</div>
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
          <div class="advert_item-title">
            <div class="advert_item-title-name">{{ item.skuName }}</div>
            <div
              v-if="parsePrice(item.specialPrice) !== '面议'"
              class="advert_item-title-price"
            >
              低至
              <span class="advert_item-title-num">{{
                item.specialUnit ? item.specialNewPrice : item.specialPrice
              }}</span>
              {{ item.specialUnit || '元' }}
            </div>
            <div v-else class="advert_item-title-price">
              <span class="advert_item-title-num">面议</span>
            </div>
          </div>
        </div>
        <!-- <div class="advert_item"></div>
        <div class="advert_item"></div> -->
      </div>
      <!-- E advert -->
    </div>
    <sp-sticky class="tabs-box" :offset-top="headerHeight + safeTop">
      <div class="drop_down">
        <div class="drop_down_title" @click="swichCityHandle">
          {{ cityName ? cityName : '定位中' }}
        </div>
        <div class="drop_down_icon"></div>
      </div>
      <ul class="tabs-box-items">
        <li
          v-for="(item, index) in activityTypeOptions"
          :key="item.labelName"
          :class="{ active: index == currentIndex }"
          @click="menuTab(item, index)"
        >
          {{ item.labelName }}
        </li>
      </ul>
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
                  </div>
                  <div class="right-content">
                    <div class="rc-top">
                      <div style="display: inline-block">
                        <span class="span1">好品</span>
                        <span class="span2">千万补贴</span>
                      </div>
                      <span class="span3">{{ item.skuName }}</span>
                    </div>
                    <div v-show="item.tags" class="rc-middle">
                      <div
                        v-for="tag in item.tags.split(',').slice(0, 3)"
                        :key="tag"
                      >
                        {{ overflowDot(tag, 6) }}
                        <!-- {{ tag }} -->
                      </div>
                    </div>
                    <div class="rc-bottom">
                      <div class="rc-bottom-lf">
                        <template>
                          <div
                            v-if="parsePrice(item.specialPrice) !== '面议'"
                            class="rc-bottom-lf-my"
                          >
                            <div>
                              {{
                                item.specialUnit
                                  ? parsePrice(item.specialNewPrice).yuan
                                  : parsePrice(item.specialPrice).yuan
                              }}.
                              <span class="rc-bottom-lf-my-cent">
                                {{
                                  item.specialUnit
                                    ? parsePrice(item.specialNewPrice).jiao
                                    : parsePrice(item.specialPrice).jiao
                                }}
                              </span>
                              <span class="rc-bottom-lf-my-unit">{{
                                item.specialUnit || '元'
                              }}</span>
                            </div>
                          </div>
                          <div v-else class="rc-bottom-lf-my">
                            <div>面议</div>
                          </div>
                        </template>
                        <div
                          v-if="parsePrice(item.skuPrice) !== '面议'"
                          class="bf-my"
                        >
                          {{ item.skuUnit ? item.skuNewPrice : item.skuPrice }}
                          <span>{{ item.skuUnit || '元' }}</span>
                        </div>
                      </div>
                      <div class="rc-bottom-rt">
                        <div>立即购买</div>
                        <div></div>
                      </div>
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
  name: 'Subsidy',
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
      specType: 'HDZT_ZTTYPE_QWBT',
      hasCity: true,
    }
  },
}
</script>

<style lang="less" scoped>
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
.overflowDot {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.multiRowOverflowDot {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; //行数
  -webkit-box-orient: vertical;
}
.container {
  position: relative;
  background: url('https://cdn.shupian.cn/sp-pt/wap/33iptmq9cya0000.png');
  background-size: 100% auto;
  -moz-background-size: 100% auto;
  width: 100vw;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  .rule-tag {
    position: absolute;
    right: 0;
    width: 68px;
    height: 36px;
    line-height: 36px;
    background: linear-gradient(42deg, #ffa291 0%, #ffdb12 100%);
    box-shadow: 0px 0px 20px 0px rgba(192, 24, 33, 0.5);
    border-radius: 32px 0px 0px 32px;
    z-index: 10;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #ffffff;
    text-align: right;
    padding-right: 12px;
  }
  .search {
    display: flex;
    align-items: center;
    padding: 16px 0;
    margin-bottom: 16px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/33iptmq9cya0000.png');
    background-size: 100% auto;
    -moz-background-size: 100% auto;
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
      //box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      //background: #000000;
      background: rgba(0, 0, 0, 0.1);
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
    width: 750px;
    padding: 290px 0 32px 0;
    ::v-deep.sp-sticky--fixed {
      max-width: 10rem;
      width: 100%;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);

      background: linear-gradient(180deg, #ff582e 0%, #ef202c 100%);
    }
    .advert_box {
      display: flex;
      justify-content: flex-start;
      padding: 0 20px;
      overflow-x: scroll;
      overflow-y: hidden;
      .advert_item {
        width: 30vw;
        height: 38.4vw;
        background: #fff2e3;
        border-radius: 12px;
        margin-right: 10px;
        font-family: PingFangSC-Medium, PingFang SC;
        overflow: hidden;
        .advert_item-img {
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          width: 100%;
          //height: 202px;
          height: 26.9vw;
          .advert_item-angle {
            position: absolute;
            left: 4px;
            top: 4px;
            width: 60px;
            height: 60px;
            background-size: 100% 100%;
            background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/ev3o08ysl400000.png);
          }
          .advert_item-tag {
            bottom: 6px;
            position: absolute;
            background-repeat: no-repeat;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #ffffff;
            background-size: 100% 100%;
            width: 160px;
            height: 38px;
            line-height: 35px;
            left: 50%;
            text-align: center;
            transform: translateX(-50%);
            background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/9joze15ug200000.png);
          }
        }
        .advert_item-title {
          text-align: center;
          height: 86px;
          .advert_item-title-name {
            font-size: 22px;
            font-weight: bold;
            color: #222222;
            line-height: 22px;
            margin: 12px 0 5px 0;
            .overflowDot();
          }
          .advert_item-title-price {
            font-size: 20px;
            font-weight: bold;
            color: #ec5330;
            .advert_item-title-num {
              font-size: 35px;
            }
          }
        }
      }
    }
  }

  .tabs-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 88px;
    padding: 12px 0 0 0;
    border-radius: 24px 24px 0 0;
    background-color: #fff;
    width: 100vw;
    width: 100vw;
    ::v-deep .sp-sticky {
      border-radius: 24px 24px 0 0;
      background-color: #fff;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // height: 88px;
      // padding: 0 20px;
      padding: 28px 20px;
      &.sp-sticky--fixed {
        border-radius: 0;
      }
    }
    .drop_down {
      height: 56px;
      background: linear-gradient(270deg, #f3363f 0%, #ec5330 100%);
      border-radius: 32px;
      display: flex;
      align-items: center;
      margin-right: 48px;
      padding: 0 28px;
      .drop_down_title {
        white-space: nowrap;
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 56px;
      }
      .drop_down_icon {
        background: url('https://cdn.shupian.cn/sp-pt/wap/9ij1cu5sv4g0000.png');
        width: 15px;
        height: 10px;
        margin-left: 8px;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }
    }
    .tabs-box-items {
      height: 56px;
      display: flex;
      justify-content: flex-start;
      overflow-x: scroll;
      // margin: auto 0;
      &::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
      }
      li {
        white-space: nowrap;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #555555;
        line-height: 56px;
        height: 56px;
        margin-right: 48px;
        &.active {
          font-weight: bold;
          color: #ec5330;
        }
      }
    }
  }
  .container-body {
    position: absolute;
    width: 100vw;
    height: 1667px;
    background: #ffffff;
    padding: 0 20px;

    .body-content {
      .line {
        height: 1px;
        background: #f4f4f4;
      }
      .body-content-items {
        height: 284px;
        width: 100%;
        padding: 32px 0;
        display: flex;
      }
      .left-content {
        width: 220px;
        height: 220px;
        border-radius: 12px;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        overflow: hidden;
        margin-right: 32px;
      }
      .right-content {
        position: relative;
        flex: 1;
        .rc-top {
          font-weight: 500;
          width: 395px;
          font-size: 32px;
          .multiRowOverflowDot();
          .span1,
          .span2 {
            background: #ec5330;
            border-radius: 4px;
            padding: 0 8px;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 32px;
            height: 32px;
            float: left;
            margin: 4px 8px 0 0;
          }
          .span3 {
            color: #222222;
            font-weight: bold;
            font-family: PingFangSC-Medium, PingFang SC;
            line-height: 42px;
          }
        }

        .rc-middle {
          margin-top: 12px;
          display: flex;
          justify-content: flex-start;
          margin-right: 14px;
          margin-bottom: 32px;
          div {
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #5c7499;
            line-height: 28px;
            padding: 0 6px;

            background: #f0f2f5;
            border-radius: 4px;
            margin-right: 8px;
          }
        }
        .rc-bottom {
          display: flex;
          position: absolute;
          width: 100%;
          bottom: 0;
          justify-content: space-between;
          .rc-bottom-lf {
            margin-top: 2px;
            .rc-bottom-lf-my {
              display: flex;
              flex-direction: row;
              align-content: flex-start;
              align-items: center;
              div {
                color: #ec5330;
              }
              div:nth-of-type(1) {
                font-size: 32px;
                font-weight: bold;
                line-height: 32px;
                font-family: PingFangSC-Medium, PingFang SC;
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
              margin-top: 4px;
              font-size: 22px;
              font-weight: 400;
              color: #999999;
              line-height: 22px;
              margin-left: 2px;
            }
            .rc-bottom-lf-my-cent {
              font-size: 28px;
              display: inline-block;
              margin-left: -10px;
            }
            .rc-bottom-lf-my-unit {
              font-size: 22px;
            }
          }
          .rc-bottom-rt {
            width: 200px;
            height: 64px;
            background: linear-gradient(90deg, #ec5330 0%, #f3363f 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            div:nth-child(1) {
              height: 32px;
              font-size: 32px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #ffffff;
              line-height: 32px;
              padding: 1px 8px 0 16px;
              white-space: nowrap;
            }
            div:nth-last-child(1) {
              height: 32px;
              width: 32px;
              margin-right: 16px;
              background: url('https://cdn.shupian.cn/sp-pt/wap/g76q42107k00000.png');
              background-size: 100% 100%;
              -moz-background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
}
</style>
