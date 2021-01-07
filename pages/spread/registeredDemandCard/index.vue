<template>
  <div class="regdemand">
    <!-- 头部加banner -->
    <Header @onCity="onCity" />
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
            name="sear_ic_open"
            color="#CCCCCC"
            size="0.183rem"
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
            <span>{{ item }}</span>
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
            <span>{{ item }}</span>
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
            <span>{{ item }}</span>
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
    <!-- 底部调起列表 -->
    <sp-popup
      v-model="isShow"
      position="bottom"
      round
      :style="{ height: '55%' }"
    >
      <sp-picker
        title="选择区域"
        show-toolbar
        :default-index="3"
        :columns="actionsRegion"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </sp-popup>
  </div>
</template>
<script>
import { Popup, Field, Picker } from '@chipspc/vant-dgg'
import Header from '../../../components/spread/registeredDemandCard/header'
import { planner, dict } from '@/api'
export default {
  components: {
    Header,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Picker.name]: Picker,
  },
  data() {
    return {
      times: ['1个月内', '2个月内', '半年内', '1年内'],
      choose: ['是', '否'],
      chooseActived: 0,
      confirmActived: 0,
      transactActived: 0,
      ishave: '是', // 是否有地址
      isconfirm: '是', // 公司信息是否确认完毕
      istsransact: '1月内', // 打算办理时间
      area: '',
      isShow: false,
      actionsRegion: [
        '锦江区',
        '青羊区',
        '金牛区',
        '武侯区',
        '成华区',
        '成都高新区',
        '成都天府新区',
        '青白江',
        '龙泉驿',
        '郫都',
        '新都',
        '温江',
        '双流',
      ],
      cityVal: {
        code: '510100',
        name: '成都市',
      },
    }
  },
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '免费帮找页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
  methods: {
    // 获取地区
    onCity(val) {
      if (val.code !== undefined) this.cityVal = val
      this.getRegionList(this.cityVal.code)
    },
    // 显示下拉框
    show() {
      this.isShow = true
    },
    // 选择区域返回到输入框
    onConfirm(value, index) {
      this.area = value
      this.isShow = false
    },
    onChange(picker, value, index) {
      this.area = value
    },
    onCancel() {
      this.isShow = false
    },
    // 获取公司是否有地址的选择
    isChoose(index) {
      this.chooseActived = index
      this.ishave = this.choose[index]
    },
    // 获取公司信息是否完成的选择
    confirm(index) {
      this.confirmActived = index
      this.isconfirm = this.choose[index]
    },
    // 获取打算办理时间的选择
    isTransact(index) {
      this.transactActived = index
      this.istsransact = this.times[index]
    },
    // 跳转到下一页,存储当前页面信息
    next() {
      const obj = JSON.stringify({
        type: 'gszc',
        yxblqy: this.area,
        sydz: this.ishave,
        content: {
          公司信息确认完毕: this.isconfirm,
          办理时间: this.istsransact,
        },
      })
      localStorage.setItem('data', obj)
      this.$router.push({ path: '/spread/second' })
    },
    // 获取区域信息列表
    async getRegionList(code) {
      try {
        const data = await dict.findCmsTier({ axios: this.$axios }, { code })
        if (Array.isArray(data) && data.length) {
          const cityData = []
          data.forEach((resultArray) => {
            cityData.push(resultArray.name)
          })
          this.actionsRegion = cityData
        }
        return
      } catch (error) {
        return Promise.reject(error)
      }
    },
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
  width: @spread-page-width;
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
          display: flex;
          justify-content: center;
          align-items: center;
          > span {
            display: block;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1a1a1a;
            text-align: center;
          }
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
          display: flex;
          justify-content: center;
          align-items: center;
          > span {
            display: block;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1a1a1a;
            text-align: center;
          }
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
          display: flex;
          justify-content: center;
          align-items: center;
          > span {
            display: block;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1a1a1a;
            text-align: center;
          }
        }
        .isActived {
          background: #ffffff;
          border: 3px solid #000000;
        }
      }
    }
    .footer-btn {
      width: 670px;
      height: 136px;
      padding: 24px 0;
      background: #ffffff;
      margin: 0 auto;
      margin-top: 32px;
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
  /deep/.sp-popup {
    width: @spread-page-width;
    position: absolute;
    left: 50%;
    margin-left: calc(-@spread-page-width / 2);
  }
  /deep/.sp-overlay {
    width: @spread-page-width;
    position: absolute;
    left: 50%;
    margin-left: calc(-@spread-page-width / 2);
  }
}
</style>
