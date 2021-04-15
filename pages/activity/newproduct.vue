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
              size="0.31rem"
              color="#FFFFFF"
              :style="{ marginLeft: iconLeft + 'rem' }"
            ></my-icon>
            <input placeholder="搜索首发商品" />
          </div>
        </div>
      </sp-sticky>
      <!-- E search -->
      <div class="rules">
        <p>规则</p>
      </div>
      <div class="advice-box">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="container-body">
      <div class="tabs-box">
        <div class="tabs-box-left">
          <div>成都</div>
          <div></div>
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
                    <span>{{ item.span1 }}</span>
                    <span>{{ item.span2 }}</span>
                    {{ item.content }}
                  </div>
                  <div class="rc-middle">
                    <div>免手续</div>
                    <div>1对1</div>
                    <div>店铺干净</div>
                  </div>
                  <div class="rc-bottom">
                    <div class="rc-bottom-lf">
                      <div class="rc-bottom-lf-my">
                        <div>{{ item.money }}</div>
                        <div>元</div>
                      </div>
                      <div class="bf-my">原价{{ item.price }}元</div>
                    </div>
                    <div class="rc-bottom-rt">
                      <div class="imm_consult">立即咨询</div>
                      <div class="imm_img"></div>
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
/deep/.sp-sticky--fixed {
  max-width: 10rem;
  width: 100%;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background: linear-gradient(90deg, #d20001 0%, #f80302 100%);
}
.container {
  width: 100%;
  overflow-x: hidden;
  .container-advice {
    padding: 0 20px;
    margin-bottom: 32px;
    width: 750px;
    height: 717px;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/aey2uyjrfcg0000.png');
    position: relative;
    .rules {
      width: 68px;
      height: 36px;
      background: linear-gradient(45deg, #ffd800 0%, #ff2828 100%);
      box-shadow: 0px 0px 20px 0px #d70000;
      border-radius: 32px 0px 0px 32px;
      // opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: -4px;
      top: 164px;
      p {
        height: 20px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
      }
    }
    .search {
      display: flex;
      align-items: center;
      padding: 16px 0;
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
    .advice-box {
      position: absolute;
      display: flex;
      justify-content: space-between;
      bottom: 92px;
      div {
        margin-right: 10px;
        width: 230px;
        height: 160px;
        //background: linear-gradient(137deg, #ffffff 0%, #fff3eb 100%);
        border-radius: 12px;
        border: 5px solid #ffab6f;
      }
    }
  }
  .container-body {
    padding: 0 20px;
    position: absolute;
    width: 100%;
    height: 1720px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    top: 658px;
    z-index: 1;
    .tabs-box {
      display: flex;
      justify-content: space-between;
      padding-top: 12px;
      height: 88px;
      align-items: center;
      .tabs-box-left {
        width: 131px;
        height: 56px;
        background: linear-gradient(270deg, #f3363f 0%, #ec5330 100%);
        border-radius: 32px;

        display: flex;
        justify-content: center;
        align-items: center;
        div:nth-child(1) {
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 30px;
        }
        div:nth-last-child(1) {
          // width: 15px;
          // height: 10px;
          // background: #ffffff;
          margin-left: 8px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 12px solid #ffffff;
        }
      }
    }

    .tabs-box-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 15px;
      // padding: 22px 10px 0 10px;
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
        justify-content: space-between;
        height: 324px;
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
        width: 418px;
        display: flex;
        align-content: flex-start;
        flex-direction: column;
        .rc-top {
          width: 378px;
          height: 84px;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 42px;
          // white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
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
          display: flex;
          // justify-content: space-between;
          align-content: flex-start;
          margin-top: 12px;
          div {
            height: 20px;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
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
            margin-top: 5px;
            .rc-bottom-lf-my {
              display: flex;
              flex-direction: row;
              align-content: flex-start;
              align-items: center;
              margin-top: 52px;
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
              margin-top: 4px;
              font-size: 22px;
              font-weight: 400;
              color: #999999;
              line-height: 22px;
              margin-left: 2px;
            }
          }
          .rc-bottom-rt {
            width: 192px;
            height: 80px;
            background: linear-gradient(270deg, #f3363f 0%, #ec5330 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 56px;
            .imm_consult {
              height: 30px;
              font-size: 30px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 30px;
            }
            .imm_img {
              width: 32px;
              height: 32px;
              background-size: 100% 100%;
              -moz-background-size: 100% 100%;
              background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/625y4ztzqec0000.png');
              margin-left: 8px;
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
} from '@chipspc/vant-dgg'
export default {
  name: 'Newproduct',
  components: {
    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [WorkTabSort.name]: WorkTabSort,
    [WorkTabSortItem.name]: WorkTabSortItem,
  },
  data() {
    return {
      defaultData: {
        index: 0,
        sort: -1, // 倒序
      },

      iconLeft: 0.35,
      time: '',
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      items: [
        {
          span1: '好品',
          span2: '独家转售',
          content: '公司干净 成都 **国际融资租赁有限公司',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
        {
          span1: '好品',
          span2: '独家转售',
          content: '公司干净 成都 **国际融资租赁有限公司',

          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
        {
          span1: '好品',
          span2: '独家转售',
          content: '公司干净 成都 **国际融资租赁有限公司',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
        {
          span1: '好品',
          span2: '独家转售',
          content: '公司干净 成都 **国际融资租赁有限公司',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
        {
          span1: '好品',
          span2: '独家转售',
          content: '公司干净 成都 **国际融资租赁有限公司',
          mdTitle: '适用项目：服装;成品衣;内衣;童装;鞋;帽;…',
          money: '98.95',
          price: '998',
        },
        {
          span1: '好品',
          span2: '独家转售',
          content: '公司干净 成都 **国际融资租赁有限公司',
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
    handlerItemChange(action, index) {
      console.log(action, index)
    },
  },
}
</script>
