<template>
  <div class="need">
    <span class="title">您可能还需要办理</span>
    <ul class="productlist">
      <li v-for="(item, index) in ProductList" :key="index">
        <a
          v-sensorsTrack="{
            eventName: 'wap元素点击',
            type: '售前',
            name: `银行服务_您可能还需要办理_${item.title}`,
          }"
          href="javascript:;"
          @click="
            () => {
              $parent.openIM(item.url)
            }
          "
          ><img :src="item.img" alt=""
        /></a>
      </li>
    </ul>
    <span class="answer">还有疑问？企服专家为您免费解答</span>
    <div class="phone">
      <my-icon name="notify_ic_tel" size="0.36rem" color="#4974F5"></my-icon>
      <div class="phonenumber">
        <span>电话咨询：</span>
        <span>4000 - 962540</span>
      </div>
      <a
        v-sensorsTrack:wapClick="{
          eventName: 'wap元素点击',
          type: '售前',
          name: '银行服务_还有疑问_立即咨询',
        }"
        href="javascript:;"
        @click="call()"
        ><span>立即咨询</span></a
      >
    </div>
    <div class="chips">
      <div>
        <div></div>
        <span>顶呱呱</span>
        <div></div>
      </div>
      <span class="service">顶呱呱企业服务平台，2800万用户的选择</span>
      <span>顶呱呱科技股份版权所有</span>
    </div>
    <div class="positionbox"></div>
  </div>
</template>

<script>
import MyIcon from '../../common/myIcon/MyIcon.vue'
export default {
  components: { MyIcon },
  data() {
    return {
      telephone: '4000-962540',
      url: '',
      ProductList: [
        {
          code: 1,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6rs29o764540000.png',
          url: '/spread/system',
          title: '体系认证',
        },
        {
          code: 2,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/82vsavebgnk0000.jpg',
          url: '/spread/agency/',
          title: '代理记账',
        },
        {
          code: 3,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/30xrqmq3bey0000.jpg',
          url: '/spread/system',
          title: '许可证办理',
        },
        {
          code: 4,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/akgnqp1al0g0000.jpg',
          url: '',
          title: '互联网资质',
        },
        {
          code: 5,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6f1d205sae40000.jpg',
          url: '/spread/tax',
          title: '财务税筹',
        },
        {
          code: 6,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3yl3jyk5e5c0000.jpg',
          url: '/spread/bankService',
          title: '银行服务',
        },
      ],
    }
  },
  created() {},
  methods: {
    call() {
      window.location.href = `tel:${this.telephone}`
    },
  },
}
</script>

<style lang="less" scoped>
.need {
  width: 100%;
  padding: 0 40px;
  margin-top: 22px;
  .title {
    display: block;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  .productlist {
    display: flex;
    flex-wrap: wrap;
    margin-top: 31px;
    justify-content: space-between;
    > li {
      flex-basis: 32%;
      background: #f8f8f8;
      border-radius: 8px;
      &:nth-child(3) ~ li {
        margin-top: 12px;
      }
      > a {
        width: 100%;
        height: 100%;

        > img {
          width: 100%;
          border-radius: 8px;
        }
      }
    }
  }
  .answer {
    display: block;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 29px;
    margin-top: 64px;
  }
  .phone {
    height: 80px;
    background: #ffffff;
    border: 2px solid #4974f5;
    border-radius: 8px;
    margin-top: 23px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 26px;
    .phonenumber {
      display: flex;
      align-items: center;
      margin-left: 16px;
      flex: 1;
      > span:first-child {
        display: block;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 23px;
      }
      > span:last-child {
        display: block;
        font-size: 40px;
        font-family: @Bebas;
        font-weight: 400;
        color: #4974f5;
        line-height: 32px;
        margin-left: -5px;
      }
    }
    > a {
      width: 204px;
      height: 80px;
      background: #4974f5;
      border-radius: 0px 8px 8px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        text-align: center;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
  .chips {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      align-items: center;
      > div {
        width: 90px;
        height: 1px;
        background: #c5c5c5;
      }
      > span {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #555555;
        line-height: 31px;
        display: block;
        margin-left: 11px;
        margin-right: 12px;
      }
    }
    .service {
      display: block;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 25px;
      margin-top: 15px;
    }
    > span:last-child {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #c5c5c5;
      line-height: 19px;
      margin-top: 24px;
      margin-bottom: 64px;
    }
  }
  .positionbox {
    height: 144px;
    width: 100%;
  }
}
</style>
