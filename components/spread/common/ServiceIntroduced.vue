<template>
  <div class="serviceList">
    <span class="serviceList-title">{{ serviceTitle }}</span>
    <slot name="dropDown"></slot>
    <div
      v-for="(item, index) in serviceList"
      v-show="index > num ? false : true"
      :key="index"
      v-md-map
      v-sensorsTrack:webClick="{
        eventName: 'wap元素点击',
        type: '售前',
        name: `${serviceTitle}_${item.title}_在线咨询`,
      }"
      class="serviceList-content"
      href="javascript:;"
      @click="plannerIm(item.planner)"
    >
      <div
        class="serviceList-content-head"
        :style="{ backgroundImage: 'url(' + item.bgImg + ')' }"
      >
        <div class="serviceList-content-head-title">
          <span>{{ item.title }}</span>
          <img
            v-show="item.titleLabel !== undefined"
            :src="item.titleLabel"
            alt=""
          />
        </div>
        <span>{{ item.titleContent }}</span>
      </div>
      <div v-if="item.labelsType === col" class="lable-box">
        <span class="lable-title">{{ item.colLabels.title }}</span>
        <div
          v-for="(lable, nums) in item.colLabels.content"
          :key="nums"
          class="lable-content"
        >
          <img :src="item.colLabels.icon" alt="" />
          <span>{{ lable }}</span>
        </div>
      </div>
      <div v-else class="lable-row-box">
        <div
          v-for="(lable, nums) in item.rowLabels.text"
          :key="nums"
          class="lable-row-content"
        >
          <img
            class="lable-row-content-img"
            :src="item.rowLabels.icon"
            alt=""
          />
          <span class="lable-row-content-msg">{{ lable }}</span>
        </div>
      </div>
      <div class="serviceList-content-total">
        <div>
          <div>
            <span>{{ item.actualViews }}</span>
            <span>在线咨询</span>
          </div>
          <div>
            <span>{{ item.defaultSales }}</span>
            <span>累计成交</span>
          </div>
          <div>
            <span>{{ item.actualSales }}</span>
            <span>成功案例</span>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="serviceList-content-contact">
        <div class="price">
          <span>{{ item.price }}</span>
          <span>元起</span>
        </div>
        <div class="contact-btn">
          <a href="javascript:;">
            <img :src="item.planner.imgSrc" alt="" />
          </a>
          <a>
            <my-icon
              v-sensorsTrack:p_IMClick="{
                eventName: '在线咨询',
                type: '售前',
                name: `${serviceTitle}_${item.title}_在线咨询`,
              }"
              name="notify_ic_chat"
              color="#4974F5"
              size="0.4rem"
              class="icon"
              @click="
                () => {
                  $parent.openIM(item.url)
                }
              "
            >
            </my-icon>
          </a>
          <a href="javascript:;" @click="call(item.planner.telephone)">
            <my-icon
              v-sensorsTrack:webClick="{
                eventName: 'wap元素点击',
                type: '售前',
                name: `${serviceTitle}_${item.title}_拨打电话`,
              }"
              name="notify_ic_tel"
              color="#4974F5"
              size="0.4rem"
              class="icon"
            >
            </my-icon>
          </a>
        </div>
      </div>
    </div>
    <!-- 查看更多 -->
    <div
      v-show="serviceList.length > 3"
      class="show-more-btn"
      @click="showMore"
    >
      <a
        v-show="more"
        v-sensorsTrack:webClick="{
          eventName: 'wap元素点击',
          type: '售前',
          name: `${pageTitle}页面_更多服务`,
        }"
        href="javascript:;"
        >更多服务</a
      >
      <a
        v-show="close"
        v-sensorsTrack:webClick="{
          eventName: 'wap元素点击',
          type: '售前',
          name: `${pageTitle}页面_收起`,
        }"
        href="javascript:;"
        >收起</a
      >
      <my-icon
        v-show="more"
        name="tab_ic_all_n"
        size="0.2rem"
        class="input-ic-open"
        color="#cccccc"
      ></my-icon>
      <my-icon
        v-show="close"
        name="tab_ic_all_s"
        size="0.2rem"
        class="input-ic-open"
        color="#cccccc"
      ></my-icon>
    </div>
  </div>
</template>

<script>
import MyIcon from '../../common/myIcon/MyIcon.vue'
export default {
  components: { MyIcon },
  props: {
    // 服务介绍列表
    serviceList: {
      type: Array,
      default: () => {
        return {
          title: '银行销户',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '152',
          defaultSales: '108',
          actualSales: '108',
          price: 600,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'col',
          rowLabels: {
            title: '所需资料',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
            content: [
              '由法人代表及直接出具销户报告',
              '各种未使用的重要空白票据及结算凭证',
            ],
          },
        }
      },
    },
    // 服务列表主title
    serviceTitle: {
      type: String,
      default: () => {
        return '服务介绍'
      },
    },
    pageTitle: {
      type: String,
      default: () => {},
    },
  },
  data() {
    return {
      col: 'col',
      more: true,
      close: false,
      num: 2,
    }
  },
  methods: {
    call(telephone) {
      window.location.href = `tel:${telephone}`
      event.stopPropagation()
    },
    showMore() {
      if (this.more) {
        this.close = true
        this.more = false
        this.num = this.serviceList.length
      } else {
        this.close = false
        this.more = true
        this.num = 2
      }
    },
    plannerIm(planner) {
      const guiHuaShi = planner
      this.$root.$emit(
        'openIMM',
        guiHuaShi.id,
        guiHuaShi.name || '',
        guiHuaShi.jobNum || '',
        planner.imgSrc || ''
      )
    },
  },
}
</script>

<style lang="less" scoped>
.serviceList {
  width: 100%;
  padding: 0 40px;
  margin-top: 63px;
  .serviceList-title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    display: block;
  }
  .serviceList-content {
    display: block;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.3);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    margin-top: 31px;
    position: relative;
    margin-top: 25px;
    &:first-child {
      margin-top: 31px;
    }
  }
  .serviceList-content-head {
    width: 100%;
    height: 132px;
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-size: 100% 100%;
    border-radius: 8px 8px 0px 0px;
    padding: 32px 0 31px 31px;
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    .serviceList-content-head-title {
      display: flex;

      > span {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 31px;
        display: block;
      }
      > img {
        width: 96px;
        height: 32px;
        margin-left: 15px;
        margin-top: -3px;
      }
    }
    > span {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 23px;
      margin-top: 15px;
    }
  }
  .lable-box {
    width: 100%;
    padding-left: 32px;
    .lable-title {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 25px;
      display: block;
    }
    .lable-content {
      display: flex;
      align-items: center;
      margin-top: 24px;
      > img {
        margin-top: -1px;
        width: 24px;
        height: 24px;
        margin-right: 17px;
        flex-shrink: 0;
      }
      > span {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 24px;
        display: block;
      }
    }
  }
  .lable-row-box {
    padding: 0 32px;
    display: flex;
    align-items: center;
    .lable-row-content {
      display: flex;
      align-items: center;
    }
    .lable-row-content:not(:first-child) {
      margin-left: 40px;
    }
    .lable-row-content-img {
      width: 24px;
      height: 24px;
      margin-top: -1px;
      flex-shrink: 0;
    }
    .lable-row-content-msg {
      height: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 23px;
      display: block;
      margin-left: 13px;
    }
  }
  .serviceList-content-total {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 32px;
    margin-top: 48px;
    > div {
      display: flex;
      align-items: center;
      width: 100%;
      > div {
        flex: 1;
        position: relative;
        &:not(:first-child)::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 40px;
          background: #f4f4f4;
          left: -25px;
          top: 50%;
          margin-top: -20px;
        }
        > span {
          display: block;
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 31px;
          &:last-child {
            font-size: 22px;
            font-weight: normal;
            color: #999999;
            line-height: 21px;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .line {
    width: 100%;
    border-bottom: 1px dashed #f4f4f4;
    margin-top: 26px;
  }
  .serviceList-content-contact {
    margin: 24px 0;
    padding: 0 32px 0 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .price {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ec5330;
      line-height: 40px;
      display: flex;
      align-items: flex-end;

      > span {
        display: block;
      }
      > span:last-child {
        font-size: 22px;
        line-height: 30px;
        font-weight: normal;
      }
    }
    .contact-btn {
      width: 240px;
      height: 72px;
      background: #ebf3ff;
      border-radius: 36px;
      display: flex;
      align-items: center;
      position: relative;
      > a {
        width: 56px;
        height: 56px;
        position: relative;
        .icon {
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -20px;
          margin-left: -20px;
        }
      }
      > a:first-child {
        border-radius: 50%;
        margin-left: 8px;
        display: flex;
        > img {
          width: 100%;
          border-radius: 50%;
        }
      }
      > a:not(:first-child) {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 50%;
        margin-top: -22px;
      }
      > a:nth-child(2) {
        left: 104px;
      }
      > a:last-child {
        right: 24px;
      }
    }
  }
  .show-more-btn {
    width: 278px;
    height: 64px;
    background: #ffffff;
    border: 1px solid #cdcdcd;
    border-radius: 32px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 19px 0;
    margin-top: 40px;
    > a {
      display: block;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    .input-ic-open {
      margin-left: 12px;
      margin-top: 2px;
    }
  }
}
</style>
