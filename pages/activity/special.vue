<template>
  <div class="container">
    <!-- <sp-sticky></sp-sticky> -->
    <div class="container-advice">
      <!-- S search -->
      <sp-sticky @scroll="scrollHandle">
        <div class="search">
          <div class="left-back" :style="style.iconStyle">
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
            <input placeholder="搜索特卖商品" />
          </div>
        </div>
      </sp-sticky>
      <!-- E search -->
      <!-- S countdown -->
      <div class="countdown">
        <div class="special-price">
          <div class="night"></div>
        </div>
        <div class="count-down">
          <div class="end">距本场结束还剩</div>
          <div class="down-time">
            <sp-count-down :time="time">
              <template #default="timeData">
                <span class="block">{{ '0' + timeData.days }}</span>
                <span class="colon">天</span>
                <span class="block">{{ '0' + timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ '0' + timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ '0' + timeData.seconds }}</span>
              </template>
            </sp-count-down>
          </div>
        </div>
      </div>
      <!-- E countdown -->
      <!-- S avtar -->
      <div class="avtars">
        <div class="avtar">
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
        </div>
        <div class="avtar">
          <div class="touxiang"></div>
          <div class="content">视频作品著作权申请</div>
          <div class="background">
            <div class="bg-img"></div>
            <div class="money"><span>999</span><span>元</span></div>
          </div>
        </div>
      </div>
      <!-- E avtar -->
    </div>
    <div class="container-body" :style="style.containerStyle">
      <div class="tabs-box">
        <ul class="tabs-box-items">
          <li class="active">全部</li>
          <li>99元封顶</li>
          <li>899元封顶</li>
          <li>1999元封顶</li>
        </ul>
      </div>
      <div class="body-content">
        <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <sp-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="(item, index) in itemsData"
              :key="index"
              class="body-content-items"
            >
              <div class="left-content">
                <div class="left-countdown">距离结束21:18:02</div>
              </div>
              <div class="right-content">
                <div class="rc-top">
                  <span class="rc-span">
                    <span>{{ item.span1 }}</span>
                    <span>{{ item.span2 }}</span>
                  </span>
                  {{ item.content }}
                </div>
                <div class="rc-middle">
                  <div>{{ item.span3 }}</div>
                  <div>{{ item.span4 }}</div>
                  <div>{{ item.span5 }}</div>
                </div>
                <div class="rc-bottom">
                  <div class="rc-bottom-lf">
                    <div class="rc-bottom-lf-my">
                      <div>{{ item.beforeMoney }}</div>
                      <div>元</div>
                    </div>
                    <div class="bf-my">原价{{ item.money }}元</div>
                  </div>
                  <div class="rc-bottom-rt">
                    <div>去抢购</div>
                    <div>已成交{{ item.dan }}单</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="line"></div>
          </sp-list>
        </sp-pull-refresh>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  position: relative;
  .container-advice {
    width: 100%;
    height: 746px;
    // background: linear-gradient(to right, #fe8000, #ff4c00);
    background: url('https://cdn.shupian.cn/sp-pt/wap/erdd6dsvru00000.png');
    background-size: 100% 100%;
    padding: 0 20px;

    margin-bottom: 32px;

    /deep/.sp-sticky--fixed {
      max-width: 10rem;
      width: 100%;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      background: linear-gradient(to right, #fe8000, #ff4c00);
    }
    .search {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      margin-bottom: 16px;
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
        .end {
          font-size: 24px;
          font-weight: 500;
          color: #fefffe;
          line-height: 24px;
          margin-right: 6px;
          font-family: PingFangSC-Medium, PingFang SC;
        }
        .down-time {
          .sp-count-down {
            color: #1a1a1a;
            font-size: 14px;
            line-height: 20px;
            display: flex;
            align-items: center;
            .block {
              width: 36px;
              height: 36px;
              font-size: 24px;
              font-weight: 500;
              color: #ec5330;
              line-height: 24px;
              background: #ffffff;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 6px;
            }
            .colon {
              height: 24px;
              font-size: 24px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #fefffe;
              line-height: 24px;
            }
          }
        }
      }
    }
    .avtars {
      display: flex;
      justify-content: space-between;
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
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          border-radius: 12px 12px 0px 0px;
          background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3117941574,298505346&fm=26&gp=0.jpg');
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
            span:nth-of-type(2) {
              font-size: 22px;
              font-weight: 500;
              color: #ffffff;
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
  .container-body {
    width: 100%;
    height: auto;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    z-index: 1;
    position: absolute;
    top: 622px;
    padding: 0 20px;
    .tabs-box-items {
      padding-top: 32px;
      display: flex;
      justify-content: space-between;
      li {
        padding: 19px 24px;
        background: #f5f5f5;
        border-radius: 32px;
        font-size: 26px;
        font-weight: 500;
        color: #222222;
        line-height: 26px;
        display: flex;
        align-items: center;
        height: 64px;
      }
      li.active {
        padding: 17px 42px;
        font-size: 30px;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
        background: #ec5330;
        font-family: PingFangSC-Medium, PingFang SC;
      }
    }
    .body-content {
      .line {
        width: 710px;
        height: 1px;
        background: #f4f4f4;
        margin: 0 20px;
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
        background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3117941574,298505346&fm=26&gp=0.jpg');
        .left-countdown {
          height: 40px;
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

          font-weight: 500;
          color: #222222;
          // line-height: 42px;
          text-overflow: ellipsis;
          word-break: break-all;
          overflow: hidden;
          white-space: normal;
          .rc-span {
            display: inline-flex;
            align-items: center;
            padding-bottom: 8px;
            span:nth-child(1) {
              margin-right: 8px;
            }
            span {
              height: 32px;
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
            line-height: 20px;
            padding: 4px 6px;
            background: #f0f2f5;
            border-radius: 4px;
            margin-right: 8px;
          }
        }
        .rc-bottom {
          display: flex;
          justify-content: space-between;
          .rc-bottom-lf {
            margin-top: 60px;
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
            margin-top: 60px;
            width: 176px;
            height: 80px;
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

<script>
import {
  CountDown,
  Sticky,
  List,
  WorkTabSort,
  WorkTabSortItem,
  PullRefresh,
} from '@chipspc/vant-dgg'

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
  data() {
    return {
      time: '',
      iconLeft: 0.35,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      style: {
        containerStyle: '',
        iconStyle: '',
        searchStyle: '',
      },
      itemsData: [
        {
          span1: '特卖',
          span2: '千万补贴',
          content: '公司干净 成都**国际融资租赁有限公司',
          span3: '免手续',
          span4: '1对1服务',
          span5: '店铺干净',
          beforeMoney: '98.95',
          money: '998',
          dan: '335',
        },
        {
          span1: '特卖',
          span2: '千万补贴',
          content: '公司干净 成都**国际融资租赁有限公司',
          span3: '免手续',
          span4: '1对1服务',
          span5: '店铺干净',
          beforeMoney: '98.95',
          money: '998',
          dan: '335',
        },
        {
          span1: '特卖',
          span2: '千万补贴',
          content: '公司干净 成都**国际融资租赁有限公司',
          span3: '免手续',
          span4: '1对1服务',
          span5: '店铺干净',
          beforeMoney: '98.95',
          money: '998',
          dan: '335',
        },
        {
          span1: '特卖',
          span2: '千万补贴',
          content: '公司干净 成都**国际融资租赁有限公司',
          span3: '免手续',
          span4: '1对1服务',
          span5: '店铺干净',
          beforeMoney: '98.95',
          money: '998',
          dan: '335',
        },
      ],
    }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    scrollHandle({ scrollTop }) {
      // console.log(scrollTop)
      // 滚动事件
      if (scrollTop > 250) {
        this.style.containerStyle = 'border-radius: 0px;'
        // this.style.searchStyle = 'margin-right:20px;'
      } else {
        this.style.containerStyle = 'border-radius: 12px;'
        // this.style.searchStyle = 'margin-right:0;'
        // this.style.iconStyle = 'margin-left:12px;'
      }
    },
  },
}
</script>
