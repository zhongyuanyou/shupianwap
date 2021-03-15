<template>
  <div class="container">
    <!-- <sp-sticky></sp-sticky> -->
    <div class="container-advice">
      <!-- S search -->
      <sp-sticky>
        <div class="search">
          <div class="left-back">
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
            <input placeholder="搜索特卖商品" />
          </div>
        </div>
      </sp-sticky>
      <!-- E search -->
      <!-- S countdown -->
      <div class="countdown">
        <div class="special-price">
          <div class="night">
            <!-- <img
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171210%2Ff010a6e7f6864fccad3c9ba2b4d0a467.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617336043&t=8c59d6d00865e6bff20ca88933fde51c"
              alt=""
            /> -->
          </div>
          <div class="special">
            <!-- <img
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg36.ddimg.cn%2F59%2F24%2F1307438906-1_u_2.jpg&refer=http%3A%2F%2Fimg36.ddimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617336043&t=13c39fc99b458705d1d01d77b58ac353"
              alt=""
            /> -->
          </div>
        </div>
        <div class="count-down">
          <div>距本场结束还剩</div>
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
      <div class="container-body">
        <div class="tabs-box">
          <ul class="tabs-box-items">
            <li class="active">全部</li>
            <li>99元封顶</li>
            <li>899元封顶</li>
            <li>1999元封顶</li>
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
              <div v-for="(item, index) in items" :key="index">
                <div class="body-content-items">
                  <div class="left-content">
                    <div class="left-span">{{ item.title }}</div>
                  </div>
                  <div class="right-content">
                    <div class="rc-top">
                      <span>{{ item.span1 }}</span>
                      {{ item.content }}
                    </div>
                    <div class="rc-middle">
                      {{ item.mdTitle }}
                    </div>
                    <div class="rc-bottom">
                      <div class="rc-bottom-lf">
                        <div class="rc-bottom-lf-my">
                          <div>{{ item.money }}</div>
                          <div>元</div>
                        </div>
                        <div class="bf-my">原价{{ item.price }}元</div>
                      </div>
                      <div class="rc-bottom-rt">去抢购</div>
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
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 746px;
  .container-advice {
    margin-bottom: 32px;
    width: 750px;
    height: 750px;
    background: linear-gradient(125deg, #e1b876 0%, #b7782c 100%);
    .search {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      padding-top: 56px;
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
          font-weight: 500;
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
    .countdown {
      display: flex;
      justify-content: space-between;
      // justify-content: center;
      .special-price {
        margin: 36px 0 35px 20px;
        display: flex;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        .night {
          width: 72px;
          height: 29px;
          // img {
          //   width: 100%;
          // }
          background-repeat: no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          background-image: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171210%2Ff010a6e7f6864fccad3c9ba2b4d0a467.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617336043&t=8c59d6d00865e6bff20ca88933fde51c');
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
        margin: 32px 20px 32px 0;
        display: flex;
        flex-direction: row;
        font-size: 30px;

        justify-content: center;
        align-items: center;
        :nth-of-type(1) {
          font-size: 24px;
          font-weight: 500;
          color: #ffedcb;
          line-height: 24px;
          margin-right: 15px;
        }
        .down-time {
          .sp-count-down {
            .block {
              margin: 0;
              padding: 6px;
              width: 36px;
              height: 36px;
              font-size: 24px;
              font-weight: 500;
              color: #ec5330;
              background: #ffffff;
              border-radius: 4px;
              width: 29px;
              height: 24px;
              font-size: 24px;
              font-weight: 500;
              color: #835436;
              line-height: 24px;
              background: linear-gradient(139deg, #ffe1ab 0%, #fac46e 100%);
              border-radius: 4px;
            }
            .colon {
            }
          }
        }
      }
    }
    .avtars {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
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
          margin: 16px 24px 12px 20px;
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
          background: linear-gradient(139deg, #ffe1ab 0%, #fac46e 100%);
          border-radius: 8px;

          width: 210px;
          height: 44px;
          margin: 0 8px 8px 8px;
          display: flex;
          justify-content: flex-start;

          font-size: 28px;
          font-weight: 500;
          color: #ffffff;
          line-height: 28px;
          .money {
            padding: 8px;
            span:nth-of-type(2) {
              font-size: 22px;
              font-weight: 500;
              color: #ffffff;
              line-height: 22px;
            }
          }

          .bg-img {
            width: 104px;
            height: 44px;
            margin: 0;
            border-radius: 8px 0px 0px 8px;
            background: red;
          }
        }
      }
    }
  }
  .container-body {
    width: 750px;
    height: 1720px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    z-index: 1;
    .tabs-box-items {
      display: flex;
      overflow: auto;
      padding: 22px 10px 0 10px;
      li {
        background-color: #f00;
        margin: 10px;
        flex-shrink: 0;

        padding: 19px 24px;
        background: #f5f5f5;
        border-radius: 32px;
        font-size: 26px;
        font-weight: 500;
        color: #222222;
        line-height: 26px;
        margin-right: 16px;
      }
      li.active {
        padding: 17px 42px;
        font-size: 30px;
        font-weight: 500;
        color: #ffffff;
        background: #ec5330;
        background: linear-gradient(139deg, #ffe1ab 0%, #fac46e 100%);
        border-radius: 32px;
      }
      li:nth-child(1) {
        // margin-left: 20px;
      }
      li:nth-last-child(1) {
        margin-right: 16px;
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
        height: 324px;
        width: 100%;
        padding: 32px 20px;
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
        .left-span {
          position: absolute;
          border-radius: 12px 0 0 0;
          background: linear-gradient(90deg, #ffb132 0%, #ff8208 100%);
          font-size: 20px;
          font-weight: 500;
          color: #ffffff;
          top: -6px;
          left: 0;
          padding: 12px 6px 16px 6px;
          // font-size: 22px;
          // font-weight: 400;
          // color: #ffffff;
          // line-height: 22px;
          // padding: 9px 0px 9px 12px;
          // position: absolute;
          // top: 0px;
          // left: 0px;
          // word-break: break-all;
          // background: #ec5330;
          // border-radius: 24px 0px 98px 0px;
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
          line-height: 42px;

          span {
            background: #ec5330;
            border-radius: 4px;
            padding: 8px;
            font-size: 20px;
            font-weight: 500;
            color: #ffffff;
            margin-top: 6px;
          }
        }
        .rc-middle {
          // margin-top: 16px;
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
          display: flex;
          justify-content: space-between;
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
            width: 176px;
            height: 80px;
            background: linear-gradient(139deg, #ffe1ab 0%, #fac46e 100%);
            border-radius: 8px;
            // margin-top: 58px;
            border-radius: 8px;
            font-size: 30px;
            font-weight: 500;
            color: #835436;
            line-height: 30px;
            padding: 25px 28px;
            text-align: center;

            // width: 120px;
            // height: 30px;
            // font-size: 30px;
            // font-family: PingFangSC-Medium, PingFang SC;
            // font-weight: 500;
            // color: #835436;
            // line-height: 30px;
          }
        }
      }
    }
  }
}
</style>

<script>
import { CountDown, Sticky, List } from '@chipspc/vant-dgg'

export default {
  name: 'Exclusive',
  components: {
    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
  },
  data() {
    return {
      iconLeft: 0.35,
      time: '',
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
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
  },
}
</script>
