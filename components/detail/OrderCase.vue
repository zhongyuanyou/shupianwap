<template>
  <div class="case">
    <h1>精选案例</h1>
    <div class="box">
      <div class="head">
        <img :src="ordercase.img" alt="" />
        <h1>{{ ordercase.name }}</h1>
        <p>{{ ordercase.time }}</p>
      </div>
      <div class="cell">
        <p>办理业务：{{ ordercase.type }}</p>
        <p>办理周期：{{ ordercase.date }}</p>
        <div class="list">
          <p>办理经过：</p>
          <div v-show="!show" class="box">
            <div
              v-for="(item, index) in ordercase.list.slice(0, 3)"
              :key="index"
              class="item"
            >
              <span>
                {{ index + 1 > 10 ? index + 1 : '0' + (index + 1) }}
              </span>
              <div class="head">
                <h1>{{ item.title }}</h1>
                <p>{{ item.date }}</p>
              </div>
              <div class="tit">
                <img :src="item.img" alt="" />
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>
          <div v-show="show" class="box">
            <div
              v-for="(item, index) in ordercase.list"
              :key="index"
              class="item"
            >
              <span>
                {{ index + 1 > 10 ? index + 1 : '0' + (index + 1) }}
              </span>
              <div class="head">
                <h1>{{ item.title }}</h1>
                <p>{{ item.date }}</p>
              </div>
              <div class="tit">
                <img :src="item.img" alt="" />
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="ordercase.list.length > 3" class="btn" @click="show = !show">
        查看全部办理流程
        <sp-icon
          :name="show ? 'arrow-up' : 'arrow-down'"
          size="0.3rem"
          color="#4974F5"
          class="icon"
        />
      </div>
      <div class="rate">
        <div class="head">
          <p>案例评价：</p>
          <sp-rate
            v-model="ordercase.rate"
            size="0.35rem"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
        <p>{{ ordercase.ratetit }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Rate, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'OrderCase',
  components: {
    [Rate.name]: Rate,
    [Icon.name]: Icon,
  },
  data() {
    return {
      show: false,
      ordercase: {
        img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
        name: '用户昵称',
        time: '2021.04.13',
        type: '公司注册',
        date: '七个工作日',
        list: [
          {
            title: '收集资料',
            time: '2021.04.13',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
            name: '办理人员',
          },
          {
            title: '收集资料',
            time: '2021.04.13',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
            name: '办理人员',
          },
          {
            title: '收集资料',
            time: '2021.04.13',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
            name: '办理人员',
          },
          {
            title: '收集资料',
            time: '2021.04.13',
            img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
            name: '办理人员',
          },
        ],
        rate: 90,
        ratetit:
          '服务态度很好。这里是评价内容，这里是评价内容这里是评价内容这里是评价内容这里是评价内容，这里是评价内容这里。',
      },
    }
  },
}
</script>

<style lang="less" scoped>
.case {
  background: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 48px 0 40px 0;
  > h1 {
    padding-left: 40px;
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  > .box {
    margin-top: 48px;
    padding: 0 40px;
    > .head {
      display: flex;
      align-items: center;
      > img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
      }
      > h1 {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        margin-left: 20px;
        color: #222222;
        line-height: 32px;
      }
      > p {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
        margin-left: auto;
      }
    }
    > .cell {
      margin-bottom: 12px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 26px;
      > p {
        margin-top: 28px;
      }
      > .list {
        display: flex;
        margin-top: 28px;
        > p {
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 26px;
        }
        > .box {
          > .item {
            padding: 0 0 48px 60px;
            position: relative;
            border-left: 1px solid #4974f5;
            margin-left: 20px;
            padding-left: 39px;
            > span {
              font-size: 22px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #4974f5;
              line-height: 22px;
              border-radius: 50%;
              padding: 9px;
              position: absolute;
              left: -23px;
              top: -2px;
              background: #f2f5ff;
              border: 1px solid #4974f5;
            }
            > .head {
              display: flex;
              padding-top: 3px;
              > h1 {
                font-size: 30px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 600;
                color: #4974f5;
              }
              > p {
                font-size: 26px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #4974f5;
                line-height: 26px;
              }
            }
            > .tit {
              display: flex;
              margin-top: 20px;
              align-items: center;
              img {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 12px;
              }
              p {
                font-size: 26px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
              }
            }
          }
          > .item:last-child {
            border: none;
          }
        }
      }
    }
    > .btn {
      width: 310px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4974f5;
      margin: 0 auto 24px auto;
      .icon {
        margin-left: 12px;
        vertical-align: -1px;
      }
    }
    > .rate {
      margin-top: 16px;
      background: #f2f5ff;
      border-radius: 8px;
      padding: 32px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      > .head {
        display: flex;
      }
      > p {
        margin: 12px 0 0 130px;
      }
    }
  }
}
</style>
