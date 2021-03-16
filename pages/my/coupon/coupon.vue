<template>
  <div class="coupon-page">
    <Header title="我的优惠券" />
    <sp-tabs v-model="couponType" @click="changeTab">
      <sp-tab
        v-for="(item, index) in tabs"
        :key="index"
        :title="item.title"
        :name="item.name"
      ></sp-tab>
    </sp-tabs>
    <div class="coupon_list">
      <div
        v-for="(item, index) in items"
        :key="index"
        :style="style"
        class="coupon_item"
      >
        <div class="item-lf">
          <div class="coupon_price">450</div>
          <div class="can_use">满3800元可用</div>
        </div>
        <div class="item-rt">
          <Popover
            :ref="'myPop' + index"
            :text="item.content"
            @closepop="closeBox"
          />
          <div :style="signStyle" class="sign"></div>
          <div class="title">{{ item.title }}</div>
          <div ref="textpro" class="content" @click="popOver(index)">
            {{ item.content }}
          </div>
          <div v-if="couponType == 0" class="expiredate">{{ item.date }}</div>
          <div v-else class="date">{{ item.date }}</div>
        </div>
      </div>
    </div>
    <p v-if="couponType == 2" class="coupon_tip">
      当优惠券超出使用时间范围时，该优惠券即会失效。失效超过180天
      的优惠券会被系统自动清除，若有疑惑，请<span>联系客服</span>
    </p>
  </div>
</template>

<script>
import { Button, RadioGroup, Radio, Cell, Tab, Tabs } from '@chipspc/vant-dgg'
import Popover from '@/components/common/popover/popover.vue'
import Header from '@/components/common/head/header'
import { coupon } from '@/api/index'
export default {
  components: {
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Header,
    Popover,
  },
  data() {
    return {
      formData: {
        findType: 1,
      },
      indexNum: 0,
      couponType: 0,
      buttonText: '你好',
      isShow: false,
      style:
        "background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png')",
      signStyle:
        "background-image: url('https://cdn.shupian.cn/sp-pt/wap/dcdo6nc5o6g0000.png')",
      tabs: [
        {
          name: 0,
          title: '未使用(2)',
        },
        {
          name: 1,
          title: '已使用(3)',
        },
        {
          name: 2,
          title: '已失效(1)',
        },
      ],
      items: [],
      itemsData: [
        {
          title: '财税助力特惠券',
          content: '限工商财税类“小规模纳税人代理记账” 服务使用',
          date: '即将到期 2020.09.01-2020.09.31',
        },
        {
          title: '新用户通用券',
          content:
            '限工商财税类“小规模纳税人代理记账” 服务使用限工商财税类“小规模纳税…',
          date: '即将到期 2020.09.01-2020.09.31',
        },
        {
          title: '商标服务超惠券',
          content: '全品类通用',
          date: '即将到期 2020.09.01-2020.09.31',
        },
        {
          title: '财税助力特惠券',
          content: '限商标类服务使用',
          date: '即将到期 2020.09.01-2020.09.31',
        },
      ],
      useData: [
        {
          title: '财税助力特惠券',
          content: '限工商财税类“小规模纳税人代理记账” 服务使用',
          date: '即将到期 2020.09.01-2020.09.31',
        },
        {
          title: '财税助力特惠券',
          content: '限工商财税类“小规模纳税人代理记账” 服务使用',
          date: '即将到期 2020.09.01-2020.09.31',
        },
      ],
      failData: [
        {
          title: '财税助力特惠券',
          content: '限工商财税类“小规模纳税人代理记账” 服务使用',
          date: '即将到期 2020.09.01-2020.09.31',
        },
        {
          title: '财税助力特惠券',
          content: '限工商财税类“小规模纳税人代理记账” 服务使用',
          date: '即将到期 2020.09.01-2020.09.31',
        },
      ],
    }
  },
  mounted() {
    this.items = this.itemsData
    this.getInitData()
  },
  methods: {
    getInitData() {
      coupon
        .getCouponList({ axios: this.$axios }, this.formData)
        .then((result) => result)
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
          }
        })
    },
    changeTab(name, title) {
      // console.log(name, title)
      this.$refs['myPop' + this.indexNum][0].isShow = false

      const type = this.couponType
      if (type === 1) {
        this.items = this.useData
        this.style =
          "background-image: url('https://cdn.shupian.cn/sp-pt/wap/8j18z03j8c00000.png');"
        this.signStyle =
          "background-image: url('https://cdn.shupian.cn/sp-pt/wap/29a165hg8w4k000.png');"
      } else if (type === 2) {
        this.items = this.failData
        this.style =
          "background-image: url('https://cdn.shupian.cn/sp-pt/wap/8j18z03j8c00000.png');"
        this.signStyle =
          "background-image: url('https://cdn.shupian.cn/sp-pt/wap/8a099vjhmbc0000.png');"
      } else if (type === 0) {
        this.items = this.itemsData
        this.style =
          "background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png');"
        this.signStyle =
          "background-image: url('https://cdn.shupian.cn/sp-pt/wap/dcdo6nc5o6g0000.png');"
      }
    },
    dialogContent(event) {
      console.log(event)
    },
    popOver(index) {
      this.$refs['myPop' + index][0].isShow = true
      this.$refs['myPop' + index][0].indexData = index
    },
    closeBox(data) {
      this.indexNum = data
      this.$refs['myPop' + this.indexNum][0].isShow = false
    },
  },
}
</script>

<style lang="less" scoped>
.coupon-page {
  .coupon_list {
    width: 100%;
    padding: 12px 40px 0 40px;
    height: auto;
    background: #f8f8f8;
    .coupon_item {
      width: 670px;
      height: 212px;
      background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png');
      background-size: 100% 100%;
      margin: 24px 0;
      display: flex;
      position: relative;
      .item-lf {
        width: 201px;
        height: 212px;
        .coupon_price {
          //   height: 67px;
          font-size: 72px;
          font-family: Bebas;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          padding-top: 27px;
        }
        .can_use {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          padding-top: 23px;
        }
      }
      .item-rt {
        padding-left: 24px;
        height: auto;
        flex: 1;
        .title {
          height: 32px;
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 32px;
          margin: 36px 0 23px 0;
        }
        .content {
          width: 404px;
          height: 56px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 32px;
          margin-bottom: 13px;
          text-overflow: ellipsis;
          word-break: break-all;
          overflow: hidden;
          white-space: nowrap;
        }
        .date {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        .expiredate {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #f1524e;
        }
        .sign {
          position: absolute;
          width: 90px;
          height: 84px;
          background-image: url('https://cdn.shupian.cn/sp-pt/wap/dcdo6nc5o6g0000.png');
          background-size: 100% 100%;
          right: 0px;
          top: 0px;
        }
      }
    }
  }
  .coupon_tip {
    width: 661px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    margin: 0 auto;
    margin-top: 24px;
    span {
      color: #4974f5;
    }
  }
}
/deep/ .sp-tabs__line {
  width: 64px;
}
/deep/ .sp-tab--active {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #4974f5;
}
</style>
