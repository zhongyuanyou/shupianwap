<template>
  <div class="container" :style="{ marginTop: safeTop + 'px' }">
    <!-- Sheader -->
    <sp-sticky ref="header_sticky" :offset-top="safeTop">
      <div class="header">
        <div class="left-back" @click="uPGoBack">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#FFFFFF"
          ></my-icon>
        </div>
        <div class="title">
          <!-- <img src="" alt="" /> -->
          <!-- 限时秒杀 -->
        </div>
      </div>
    </sp-sticky>

    <!-- Eheader -->
    <div class="container-advice">
      <!-- S countdown -->
      <div class="countdown">
        <div class="special-price">
          <div class="night">
            <!-- <img
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171210%2Ff010a6e7f6864fccad3c9ba2b4d0a467.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617336043&t=8c59d6d00865e6bff20ca88933fde51c"
              alt=""
            /> -->
          </div>
          <div class="low-money">近15天全网底价</div>
        </div>
        <div v-show="endTime.sec" class="count-down">
          <div class="end-time">距本场结束还剩</div>
          <div class="down-time">
            <span class="block">{{ endTime.hour }}</span>
            <span class="colon">:</span>
            <span class="block">{{ endTime.min }}</span>
            <span class="colon">:</span>
            <span class="block">{{ endTime.sec }}</span>
            <!-- <sp-count-down :time="time">
              <template #default="timeData">
                <span class="block">{{ '0' + timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ '0' + timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ '0' + timeData.seconds }}</span>
              </template>
            </sp-count-down> -->
          </div>
        </div>
      </div>
      <!-- E countdown -->
      <!-- S wrapper -->
      <div class="wrapper">
        <div
          v-for="item in recommendProductList"
          :key="item.id"
          class="item"
          @click="jumpProductDetail(item)"
        >
          <div class="item-tp" :style="{ 'background-image': item.imageUrl }">
            <img
              height="100%"
              width="100%"
              :src="
                item.imageUrl ||
                'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg'
              "
              alt="商品图片"
            />
            <div class="item_tp_title">
              <div class="item-icon"></div>
              <div class="item-money">限时直降{{ item.minusPrice }}元</div>
            </div>
          </div>
          <div class="item-bt">
            <div class="item-bt-tp">{{ item.skuName }}</div>
            <div class="item-bt-md">
              <span>{{ item.specialPrice }}</span>
              <span>元</span>
            </div>
            <!-- <div class="item-bt-bt">
              <div class="avtars">
                <div class="avtar1"></div>
                <div class="avtar2"></div>
              </div>

              <span class="counsel">{{ item.time }}秒之前咨询</span>
            </div> -->
          </div>
        </div>
      </div>
      <!-- E wrapper -->
    </div>
    <!-- S container-body -->
    <div class="container-body">
      <sp-sticky :offset-top="headerHeight + safeTop">
        <div class="body-tabs">
          <div class="care-select"></div>
          <ul class="tab-box">
            <!-- <li class="tab-item active">精选</li>
          <li class="tab-item">工商</li>
          <li class="tab-item">财税</li>
          <li class="tab-item">知识</li> -->
            <li v-for="item in introWords" :key="item" class="tab-item">
              {{ item }}
            </li>
            <!-- <li
            v-for="(item, index) in activityTypeOptions"
            :key="index"
            class="tab-item"
            :class="{ active: index == currentIndex }"
            @click="menuTab(item, index)"
          >
            {{ item.labelName }}
          </li> -->
          </ul>
        </div>
      </sp-sticky>
      <div class="body-content">
        <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
              v-for="(item, index) in items"
              :key="index"
              @click="jumpProductDetail(item)"
            > -->
                <div class="body-content-items">
                  <div
                    class="left-content"
                    :style="{ 'background-image': item.imageUrl }"
                  >
                    <img
                      height="100%"
                      width="100%"
                      :src="
                        item.imageUrl ||
                        'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg'
                      "
                      alt="商品图片"
                    />
                    <div class="left-countdown">
                      距离结束{{ endTime.hour }}:{{ endTime.min }}:{{
                        endTime.sec
                      }}
                    </div>
                  </div>
                  <div class="right-content">
                    <div class="rc-top">
                      <!-- <span>{{ item.span1 }}</span>
                    <span>{{ item.span2 }}</span> -->
                      <span>特卖</span>
                      <span>千万补贴</span>
                      {{ item.skuName }}
                    </div>
                    <div class="rc-middle">
                      <div class="reduce-price">
                        限时直降{{ item.minusPrice }}元
                      </div>
                      <div class="deal-ok">
                        已成交{{
                          item.specialInventory - item.specialResidueInventory
                        }}单
                      </div>
                    </div>
                    <div class="rc-bottom">
                      <div class="rc-bottom-lf">
                        <div class="rc-bottom-lf-my">
                          秒杀价<span>{{ item.specialPrice }}</span
                          >元
                          <!-- <div>秒杀价</div>
                        <div>{{ item.specialPrice }}</div>
                        <div>元</div> -->
                        </div>
                        <!-- <div class="bf-my">近{{ item.dijia }}天历史低价</div> -->
                      </div>
                      <div class="rc-bottom-rt">
                        <div>去抢购</div>
                        <div class="process-per">
                          <sp-progress
                            color="#FFF166"
                            :percentage="
                              getPercentage(
                                item.specialResidueInventory,
                                item.specialInventory
                              )
                            "
                          />
                          <div class="pro-per">
                            {{
                              getPercentage(
                                item.specialResidueInventory,
                                item.specialInventory
                              )
                            }}%
                          </div>
                        </div>
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
    <!-- E container-body -->
  </div>
</template>

<script>
import {
  CountDown,
  Sticky,
  Progress,
  List,
  PullRefresh,
} from '@chipspc/vant-dgg'
import activityMixin from '@/mixins/activityMixin'

export default {
  name: 'Seckill',
  components: {
    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [Progress.name]: Progress,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_XSQG',
      advice: [
        {
          lowmoney: '限时直降499元',
          title: '小规模纳税人财税代理',
          money: '488',
          time: '38',
        },
        {
          lowmoney: '限时直降498元',
          title: '小规模纳税人财税代理',
          money: '488',
          time: '30',
        },
        {
          lowmoney: '限时直降499元',
          title: '小规模纳税人财税代理',
          money: '488',
          time: '22',
        },
        {
          lowmoney: '限时直降499元',
          title: '小规模纳税人财税代理',
          money: '488',
          time: '21',
        },
      ],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      allText: '精选',
      introWords: ['人工选品', '限时限量', '低价高质'],
    }
  },
}
</script>

<style lang="less" scoped>
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
  position: relative;
  background: url('https://cdn.shupian.cn/sp-pt/wap/b5p8oqng6sg0000.png');
  background-size: 100% auto;
  background-attachment: fixed;
  min-height: 80vh;
  .header {
    width: 100%;
    height: 88px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('https://cdn.shupian.cn/sp-pt/wap/b5p8oqng6sg0000.png');
    background-size: 100% auto;
    .back_icon {
      width: 40px;
      height: 34px;
      position: absolute;
      top: 24px;
      left: 32px;
    }
    .title {
      width: 160px;
      height: 32px;
      background: url('https://cdn.shupian.cn/sp-pt/wap/dgfhzoli9mw0000.png');
      background-size: 100% 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .container-advice {
    width: 750px;
    padding: 0 20px;
    .countdown {
      display: flex;
      justify-content: space-between;
      .special-price {
        margin: 35px 0 34px 0;
        display: flex;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        .low-money {
          font-size: 24px;
          font-weight: 500;
          color: #fefffe;
          margin-left: 8px;
          justify-content: center;
          align-items: center;
          display: flex;
          font-family: PingFangSC-Medium, PingFang SC;
        }

        .night {
          width: 148px;
          height: 30px;
          // img {
          //   width: 100%;
          // }
          background-repeat: no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          background-image: url('https://cdn.shupian.cn/sp-pt/wap/517ehbgbgvg0000.png');
        }
      }
      .count-down {
        margin: 35px 0 34px 0;
        display: flex;
        flex-direction: row;
        font-size: 30px;

        justify-content: center;
        align-items: center;
        .end-time {
          font-size: 24px;
          font-weight: 500;
          color: #fefffe;
          margin-right: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
        }
        .down-time {
          .block {
            padding: 6px;
            width: 36px;
            height: 36px;
            font-size: 24px;
            font-weight: 500;
            color: #ec5330;
            line-height: 24px;
            background: #ffffff;
            border-radius: 4px;
          }
          .colon {
            font-size: 24px;
            font-weight: 500;
            color: #fefffe;
            // // line-height: 24px;
            // margin-right: 12px;
          }
          // .sp-count-down {
          //   .block {
          //     padding: 6px;
          //     width: 36px;
          //     height: 36px;
          //     font-size: 24px;
          //     font-weight: 500;
          //     color: #ec5330;
          //     line-height: 24px;
          //     background: #ffffff;
          //     border-radius: 4px;
          //   }
          //   .colon {
          //     font-size: 24px;
          //     font-weight: 500;
          //     color: #fefffe;
          //     // // line-height: 24px;
          //     // margin-right: 12px;
          //   }
          // }
        }
      }
    }
    .wrapper {
      display: flex;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0 !important;
      }
      padding-bottom: 32px;
      .item {
        padding-bottom: 19px;
        width: 225px;
        border-radius: 16px;
        margin: 10px 16px 0 0;
        background: #ffffff;
        flex-shrink: 0;
        justify-content: space-between;
        .item-tp {
          width: 225px;
          overflow: hidden;
          height: 220px;
          border-radius: 16px 16px 0px 0px;
          position: relative;
          bottom: 0;
          left: 0;
          .item_tp_title {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 40px;
            background: linear-gradient(90deg, #ff8208 0%, #ffb132 100%);
            .item-icon {
              width: 16px;
              height: 17px;
              background: url('https://cdn.shupian.cn/sp-pt/wap/1ow7r57sv3hc000.png');
              background-size: 100% 100%;
              position: absolute;
              top: 12px;
              left: 12px;
            }
            .item-money {
              font-size: 22px;
              line-height: 40px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 34px;
            }
          }
        }
        .item-bt {
          .item-bt-tp {
            font-size: 26px;
            font-weight: 500;
            color: #222222;
            padding: 16px 22px 12px 16px;
          }
          .item-bt-md {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span:nth-child(1) {
              font-size: 30px;
              font-weight: 500;
              color: #ec5330;
              line-height: 30px;
              padding: 0 0 0 16px;
            }
            span:nth-last-child(1) {
              font-size: 22px;
              font-weight: 500;
              color: #ec5330;
              line-height: 22px;
            }
          }
          .item-bt-bt {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            margin-top: 12px;
            .avtars {
              .avtar1 {
                width: 26px;
                height: 26px;
                background: #6d7177;
                border-radius: 50%;
                position: absolute;
                left: 16px;
                bottom: 0.16px;
              }
              .avtar2 {
                width: 26px;
                height: 26px;
                background: #6d7177;
                border-radius: 50%;
                position: absolute;
                left: 30px;
                bottom: 0.16px;
              }
            }

            .counsel {
              font-size: 20px;
              font-weight: 400;
              color: #999999;
              line-height: 20px;
              margin-left: 60px;
              margin-right: 16px;
              width: 144px;
              height: 20px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .container-body {
    width: 100vw;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    position: absolute;
    min-height: 80vh;
    .body-tabs {
      width: 750px;
      height: 88px;
      background: #ffffff;
      border-radius: 24px 24px 0px 0px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 10px 16px 0 0;
      padding-left: 20px;
      padding-right: 20px;
      .care-select {
        height: 30px;
        width: 150px;
        background: url('https://cdn.shupian.cn/sp-pt/wap/g1uo11x1t3c0000.png');
        background-size: 100% 100%;
      }
      .tab-box {
        display: flex;
        justify-content: flex-start;
        li {
          font-size: 32px;
          font-weight: 500;
          color: #555555;
          line-height: 32px;
          margin-left: 48px;
        }
        li.active {
          font-size: 32px;
          font-weight: 500;
          color: #ec5330;
          line-height: 32px;
        }
        li:nth-child(1) {
        }
        li:nth-last-child(1) {
        }
      }
    }
    .sp-sticky--fixed .body-tabs {
      border-radius: none;
    }
    .body-content {
      padding: 0 20px;
      background-color: #fff;
      min-height: 80vh;
      width: 100vw;
      .line {
        width: 710px;
        height: 1px;
        background: #f4f4f4;
        margin: 0 20px;
      }
      .body-content-items {
        display: flex;
        justify-content: space-between;
        height: 328px;
        width: 100%;
        padding: 32px 0;
      }
      .left-content {
        position: relative;
        margin-right: 32px;
        width: 260px;
        height: 260px;
        overflow: hidden;
        border-radius: 12px;
        .left-countdown {
          font-size: 22px;
          font-weight: 400;
          color: #ffffff;
          line-height: 22px;
          padding: 9px 23px 9px 12px;
          position: absolute;
          top: 0px;
          left: 0px;
          word-break: break-all;
          background: #ec5330;
          border-radius: 24px 0px 98px 0px;
        }
      }
      .right-content {
        width: 418px;
        display: flex;
        align-content: flex-start;
        flex-direction: column;
        .rc-top {
          font-size: 32px;
          height: 84px;
          font-weight: 500;
          color: #222222;
          line-height: 0.42rem;
          span {
            margin-right: 8px;
            background: #ec5330;
            border-radius: 4px;
            padding: 6px 8px;
            font-size: 20px;
            font-weight: 500;
            color: #ffffff;
            line-height: 20px;
          }
        }
        .rc-middle {
          display: flex;
          // justify-content: space-between;
          align-content: flex-start;
          margin-top: 12px;
          .reduce-price {
            padding: 4px 8px;
            border-radius: 4px;
            margin-right: 12px;
            font-size: 24px;
            font-weight: 400;
            color: #ec5330;
            background: rgba(236, 83, 48, 0.1);
          }
          .deal-ok {
            padding: 4px 0;
            font-size: 22px;
            font-weight: 400;
            color: #999999;
          }
        }
        .rc-bottom {
          display: flex;
          justify-content: space-between;
          .rc-bottom-lf {
            margin-top: 58px;
            .rc-bottom-lf-my {
              display: flex;
              flex-direction: row;
              height: 100%;
              align-items: center;
              color: #ec5330;
              font-size: 22px;
              font-weight: 400;
              span {
                font-size: 40px;
                font-weight: 500;
                display: inline-block;
                transform: translateY(-3px);
                margin: 0 4px;
              }
            }
            .bf-my {
              display: flex;
              flex-direction: row;
              margin-top: 7px;
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
            margin-top: 56px;
            width: 160px;
            height: 80px;
            background: linear-gradient(139deg, #fe525d 0%, #fd3543 100%);
            border-radius: 8px;
            position: relative;
            div:nth-of-type(1) {
              padding: 12px 0 10px 0;
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
            .process-per {
              display: flex;
              align-items: center;
              .pro-per {
                // position: absolute;
                font-size: 16px;
                font-weight: 500;
                color: #fffccd;
                font-family: PingFangSC-Medium, PingFang SC;
                line-height: 16px;
                // right: 6px;
                // bottom: 6px;
              }
              /deep/ .sp-progress {
                padding: 0;
                width: 98px;
                height: 6px;
                // position: absolute;
                // left: 10px;
                // bottom: 17px;
                margin: 0 5px 0 10px;
              }
              /deep/ .sp-progress__pivot {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
