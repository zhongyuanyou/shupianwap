<template>
  <div class="container">
    <div class="container-advice">
      <!-- S search -->
      <sp-sticky @scroll="scrollHandle">
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
      <!-- S advert -->
      <div class="advert_box">
        <div class="advert_item"></div>
        <div class="advert_item"></div>
        <div class="advert_item"></div>
      </div>
      <!-- E advert -->
    </div>
    <div class="container-body" :style="containerStyle">
      <div class="tabs-box">
        <div class="drop_down">
          <div class="drop_down_title">成都</div>
          <div class="drop_down_icon"></div>
        </div>
        <ul class="tabs-box-items">
          <li class="active">精选</li>
          <li>工商</li>
          <li>财税</li>
          <li>知产</li>
          <li>法律</li>
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
                <div class="left-content"></div>
                <div class="right-content">
                  <div class="rc-top">
                    <span class="span1">{{ item.span1 }}</span>
                    <span class="span2">{{ item.span2 }}</span>
                    <span class="span3"> {{ item.content }}</span>
                  </div>
                  <div class="rc-middle">
                    <div>免手续费</div>
                    <div>1对1服务</div>
                    <div>店铺干净</div>
                  </div>
                  <div class="rc-bottom">
                    <div class="rc-bottom-lf">
                      <div class="rc-bottom-lf-my">
                        <div>{{ item.money }}</div>
                        <div>元</div>
                      </div>
                      <div class="bf-my">{{ item.price }}元</div>
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
    width: 750px;
    height: 821px;
    padding: 0 20px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/33iptmq9cya0000.png');
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    position: relative;
    /deep/.sp-sticky--fixed {
      max-width: 10rem;
      width: 100%;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);

      background: linear-gradient(180deg, #ff582e 0%, #ef202c 100%);
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
    .advert_box {
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 438px;
      .advert_item {
        width: 230px;
        height: 288px;
        background: #fff2e3;
        border-radius: 12px;
        margin-right: 10px;
      }
    }
  }
  .container-body {
    position: absolute;
    width: 750px;
    height: 1667px;
    background: #ffffff;
    border-radius: 24px;
    padding: 0 20px;
    top: 758px;
    .tabs-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88px;
      padding: 12px 0 0 0;
      .drop_down {
        width: 131px;
        height: 56px;
        background: linear-gradient(270deg, #f3363f 0%, #ec5330 100%);
        border-radius: 32px;
        display: flex;
        align-items: center;
        .drop_down_title {
          padding: 0 8px 0 24px;
          height: 30px;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 30px;
        }
        .drop_down_icon {
          background: url('https://cdn.shupian.cn/sp-pt/wap/9ij1cu5sv4g0000.png');
          width: 15px;
          height: 10px;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
        }
      }
      .tabs-box-items {
        display: flex;
        justify-content: space-between;
        li {
          height: 32px;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #555555;
          line-height: 32px;
          margin-left: 48px;
        }
        li.active {
          //   padding: 17px 42px;
          width: 64px;
          height: 32px;
          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ec5330;
          line-height: 32px;
        }
        li:nth-child(1) {
          // margin-left: 20px;
        }
        li:nth-last-child(1) {
          margin-right: 15px;
        }
      }
    }

    .body-content {
      .line {
        width: 710px;
        height: 1px;
        background: #dcdcdc;
      }
      .body-content-items {
        display: flex;
        height: 284px;
        width: 100%;
        padding: 32px 0;
      }
      .left-content {
        position: relative;
        margin-right: 32px;
        width: 220px;
        height: 220px;
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
        }
      }
      .right-content {
        .rc-top {
          font-size: 32px;
          height: 84px;
          font-weight: 500;
          color: #222222;
          width: 395px;
          .span1 {
            height: 32px;
            background: #ec5330;
            border-radius: 4px;
            padding: 6px 8px;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;

            font-weight: 500;
            color: #ffffff;
            line-height: 20px;
          }
          .span2 {
            height: 32px;
            background: #ec5330;
            border-radius: 4px;
            padding: 6px 8px;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 20px;
          }
        }
        .rc-middle {
          margin-top: 12px;
          display: flex;
          justify-content: flex-start;
          margin-right: 14px;
          margin-bottom: 32px;
          div {
            // height: 20px;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #5c7499;
            line-height: 20px;
            padding: 4px 6px;

            background: #f0f2f5;
            border-radius: 4px;
          }
        }
        .rc-bottom {
          display: flex;
          justify-content: space-between;
          .rc-bottom-lf {
            margin-top: 2px;
            .rc-bottom-lf-my {
              display: flex;
              flex-direction: row;
              align-content: flex-start;
              align-items: center;
              //   padding-top: 2px;
              div {
                color: #ec5330;
              }
              div:nth-of-type(1) {
                font-size: 32px;
                font-weight: 500;
                line-height: 32px;
                font-family: PingFangSC-Medium, PingFang SC;
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
              margin-top: 4px;
              font-size: 22px;
              font-weight: 400;
              color: #999999;
              line-height: 22px;
              margin-left: 2px;
            }
          }
          .rc-bottom-rt {
            width: 200px;
            height: 64px;
            background: linear-gradient(90deg, #ec5330 0%, #f3363f 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            margin-left: 134px;
            div:nth-child(1) {
              height: 32px;
              font-size: 32px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 32px;
              padding: 0 8px 0 16px;
            }
            :nth-last-child(1) {
              height: 32px;
              width: 32px;
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
  name: 'Subsidy',
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
      iconLeft: 0.35,
      time: '',
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      containerStyle: '',
      items: [
        {
          span1: '好品',
          span2: '千万补贴',
          title: '独家转售',
          content: '成都锦江区有限 公司免地址注册',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '698.99',
          price: '998',
        },
        {
          span1: '好品',
          span2: '千万补贴',
          title: '独家转售',
          content: '成都锦江区有限 公司免地址注册',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '698.99',
          price: '998',
        },
        {
          span1: '好品',
          span2: '千万补贴',
          title: '独家转售',
          content: '成都锦江区有限 公司免地址注册',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '698.99',
          price: '998',
        },
        {
          span1: '好品',
          span2: '千万补贴',
          title: '独家转售',
          content: '成都锦江区有限 公司免地址注册',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '698.99',
          price: '998',
        },
        {
          span1: '好品',
          span2: '千万补贴',
          title: '独家转售',
          content: '成都锦江区有限 公司免地址注册',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '698.99',
          price: '998',
        },
        {
          span1: '好品',
          span2: '千万补贴',
          title: '独家转售',
          content: '成都锦江区有限 公司免地址注册',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '698.99',
          price: '998',
        },
      ],
      defaultData: {
        index: 0,
        sort: -1, // 倒序
      },
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
    handlerItemChange(action, index) {
      console.log(action, index)
      this.$toast(`选择结果：${JSON.stringify({ type: action, index })}`)
    },
    scrollHandle({ scrollTop }) {
      // 滚动事件
      if (scrollTop > 315) {
        this.containerStyle = 'border-radius: 0px;'
      } else {
        this.containerStyle = 'border-radius: 12px;'
      }
    },
  },
}
</script>
