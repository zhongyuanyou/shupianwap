<template>
  <div class="need">
    <span class="title">你可能还需要办理</span>
    <ul class="productlist">
      <li v-for="(item, index) in ProductList" :key="index">
        <a
          v-md-map
          v-md:webClick
          href="javascript:;"
          data-name="needlist[index]"
          @click="
            () => {
              $parent.openIM(item.url)
            }
          "
          ><img :src="item.img" alt=""
        /></a>
      </li>
    </ul>
    <span class="answer">对代理记账有疑问？企服专家为您免费解答</span>
    <div class="phone">
      <my-icon name="notify_ic_tel" size="0.36rem" color="#4974F5"></my-icon>
      <div class="phonenumber">
        <span>电话咨询：</span>
        <span>4000 - 962540</span>
      </div>
      <a
        v-md-map
        v-md:webClick
        href="javascript:;"
        data-name="代理记账_还有疑问_立即咨询"
        @click="call()"
        >立即咨询</a
      >
    </div>
    <div class="chips">
      <div>
        <div></div>
        <span>薯片找人</span>
        <div></div>
      </div>
      <span class="service">薯片找人企业服务平台，2800万用户的选择</span>
      <span>薯片科技版权所有</span>
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
      telephone: '4000 - 962540',
      needlist: [
        '代理记账_您可能还需要办理_工商注册',
        '代理记账_您可能还需要办理_税务筹划',
        '代理记账_您可能还需要办理_其他服务',
      ],
      ProductList: [
        {
          code: 1,
          img: require('~/assets/spreadImages/agency/busi_img_dljzbl01@1,5x.jpg'),
          url: '',
        },
        {
          code: 2,
          img: require('~/assets/spreadImages/agency/busi_img_dljzbl02@1,5x.jpg'),
          url: '',
        },
        {
          code: 3,
          img: require('~/assets/spreadImages/agency/busi_img_dljzbl03@1,5x.jpg'),
          url: '',
        },
      ],
      url: '',
    }
  },
  created() {},
  methods: {
    call() {
      window.location.href = `tel:${this.telephone}`
      console.log(this.telephone)
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
      border: 1px solid rgba(205, 205, 205, 0.3);
      border-radius: 8px;
      > a {
        > img {
          width: 100%;
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
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 80px;
      text-align: center;
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
