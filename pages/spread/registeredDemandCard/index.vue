<template>
  <div class="regdemand">
    <!-- 头部加banner -->
    <Header />
    <div class="content">
      <!-- 公司成立区域 -->
      <div class="company-area">
        <span class="company-area-title">您的公司打算成立在哪个区域？</span>
        <div class="company-area-input" @click="show">
          <input
            v-model="area"
            type="text"
            placeholder="不限"
            readonly="readonly"
          />
          <my-icon
            name="tap_ic_pen_n"
            color="#CCCCCC"
            size="0.18rem"
            class="icon"
          >
          </my-icon>
        </div>
      </div>
      <!-- 是否有公司地址 -->
      <div class="company-address">
        <span class="company-address-title">您的公司是否有地址？</span>
        <div class="company-address-choose">
          <div
            v-for="(item, index) in choose"
            :key="index"
            :class="[chooseActived === index ? 'isActived' : '']"
            @click="isChoose(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <!-- 公司是否确认完毕 -->
      <div class="company-confirm">
        <span class="company-confirm-title">您的公司信息是否已确定完毕？</span>
        <span class="company-confirm-msg"
          >公司名字、法人、股东、注册资金、经营范围等</span
        >
        <div class="company-confirm-choose">
          <div
            v-for="(item, index) in choose"
            :key="index"
            :class="[confirmActived === index ? 'isActived' : '']"
            @click="confirm(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <!-- 什么时候办理 -->
      <div class="transact">
        <span class="transact-title">您打算什么时候办理？</span>
        <div class="transact-time">
          <div
            v-for="(item, index) in times"
            :key="index"
            class="transact-time-choose"
            :class="[transactActived === index ? 'isActived' : '']"
            @click="isTransact(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <!-- 占位符 -->
      <div class="box"></div>
      <!-- 底部按钮 -->
      <div class="footer-btn">
        <a href="javascript:;" @click="next()">下一步(1/2)</a>
      </div>
    </div>
    <DropDown v-show="isShow" :title="title" />
  </div>
</template>
<script>
import { Field } from 'vant'
import Header from '../../../components/spread/registeredDemandCard/header'
import DropDown from '../../../components/spread/common/DropDownChoose'
export default {
  components: {
    Header,
    DropDown,
    [Field.name]: Field,
  },
  data() {
    return {
      obj: {},
      times: ['1个月内', '2个月内', '半年内', '1年内'],
      choose: ['是', '否'],
      chooseActived: 0,
      confirmActived: 0,
      transactActived: 0,
      ishave: '是',
      isconfirm: '是',
      istsransact: '1月内',
      area: '',
      isShow: false,
      title: '选择区域',
    }
  },
  watch() {},
  methods: {
    show() {
      this.isShow = true
    },
    isChoose(index) {
      this.chooseActived = index
      this.ishave = this.choose[index]
    },
    confirm(index) {
      this.confirmActived = index
      this.isconfirm = this.choose[index]
    },
    isTransact(index) {
      this.transactActived = index
      this.istsransact = this.times[index]
    },
    next() {},
  },
  head() {
    return {
      title: '公司注册需求卡',
    }
  },
}
</script>
<style lang="less" scoped>
.regdemand {
  width: 750px;
  margin: 0 auto;
  position: relative;
  .content {
    padding: 0 40px;
    .company-area {
      .company-area-title {
        display: block;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        margin-top: 64px;
      }
      .company-area-input {
        margin-top: 32px;
        position: relative;
        input {
          display: block;
          width: 100%;
          height: 72px;
          background: #ffffff;
          border: 1px solid rgba(205, 205, 205, 0.5);
          border-radius: 4px;
          padding: 25px 24px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          &::-webkit-input-placeholder {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #222222;
          }
        }
        .icon {
          position: absolute;
          right: 24px;
          top: 30px;
        }
      }
    }
    .company-address {
      margin-top: 64px;
      .company-address-title {
        display: block;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
      .company-address-choose {
        display: flex;
        align-items: center;
        margin-top: 32px;
        div {
          width: 207px;
          height: 72px;
          background: #f8f8f8;
          border-radius: 8px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          text-align: center;
          line-height: 72px;
          &:last-child {
            margin-left: 24px;
          }
        }
        .isActived {
          background: #ffffff;
          border: 3px solid #000000;
        }
      }
    }
    .company-confirm {
      margin-top: 64px;
      .company-confirm-title {
        font-size: 36px;
        display: block;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 35px;
      }
      .company-confirm-msg {
        margin-top: 15px;
        display: block;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 23px;
      }
      .company-confirm-choose {
        display: flex;
        align-items: center;
        margin-top: 32px;
        div {
          width: 207px;
          height: 72px;
          background: #f8f8f8;
          border-radius: 8px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          text-align: center;
          line-height: 72px;
          &:last-child {
            margin-left: 24px;
          }
        }
        .isActived {
          background: #ffffff;
          border: 3px solid #000000;
        }
      }
    }
    .transact {
      margin-top: 64px;
      .transact-title {
        display: block;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
      .transact-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .transact-time-choose {
          margin-top: 32px;
          width: 149px;
          height: 72px;
          background: #f8f8f8;
          border-radius: 8px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          text-align: center;
          line-height: 72px;
        }
        .isActived {
          background: #ffffff;
          border: 3px solid #000000;
        }
      }
    }
    .box {
      width: 670px;
      height: 168px;
    }
    .footer-btn {
      width: 670px;
      height: 136px;
      // padding: 24px 40px;
      position: fixed;
      margin-left: -335px;
      left: 50%;
      bottom: 0;
      > a {
        display: block;
        width: 100%;
        height: 88px;
        background: #4974f5;
        border-radius: 8px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        line-height: 88px;
      }
    }
  }
}
</style>
