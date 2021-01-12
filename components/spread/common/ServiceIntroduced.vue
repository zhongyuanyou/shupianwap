<template>
  <div class="serviceList">
    <span class="serviceList-title">{{ labelStyle.title }}</span>
    <div
      v-for="(item, index) in servicelist"
      v-show="index > num ? false : true"
      :key="index"
      class="serviceList-content"
      @click="
        () => {
          $parent.openIM(item.url)
        }
      "
    >
      <div
        class="serviceList-content-head"
        :style="{ backgroundImage: 'url(' + item.bgimg + ')' }"
      >
        <div class="serviceList-content-head-title">
          <span>{{ item.title }}</span>
          <img
            v-show="item.titlelable !== undefined"
            :src="item.titlelable"
            alt=""
          />
        </div>
        <span>{{ item.titleContent }}</span>
      </div>
      <div v-if="labelStyle.style === col" class="lable-box">
        <span class="lable-title">{{ lables[index].title }}</span>
        <div
          v-for="(lable, nums) in lables[index].content"
          :key="nums"
          class="lable-content"
        >
          <img :src="labelStyle.icon" alt="" />
          <span>{{ lable }}</span>
        </div>
      </div>
      <div v-else class="lable-row-box">
        <div
          v-for="(lable, nums) in lables[index]"
          :key="nums"
          class="lable-row-content"
        >
          <img class="lable-row-content-img" :src="labelStyle.icon" alt="" />
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
      v-show="servicelist.length > 3"
      class="show-more-btn"
      @click="showMore"
    >
      <span v-show="more">更多服务</span>
      <span v-show="close">收起</span>
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
    servicelist: {
      type: Array,
      default: () => {},
    },
    labelStyle: {
      type: Object,
      default: () => {
        return {}
      },
    },
    lables: {
      type: Array,
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
        this.num = this.servicelist.length
      } else {
        this.close = false
        this.more = true
        this.num = 2
      }
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
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
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
      align-items: center;
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
    > span {
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
