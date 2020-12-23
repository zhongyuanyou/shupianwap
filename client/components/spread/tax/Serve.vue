<template>
  <div class="serve">
    <div class="serve-text">稅筹服务介绍</div>
    <div
      v-for="(item, i) of cards"
      :key="i"
      class="serve-card"
      :style="item.bg"
      @click="openImUrl"
    >
      <div class="serve-card-first">
        <div>
          <div class="serve-card-first-big">{{ item.num1 }}万+</div>
          <div class="serve-card-first-small">在线咨询</div>
        </div>
        <div class="serve-card-first-hr"></div>
        <div>
          <div class="serve-card-first-big">{{ item.num2 }}万+</div>
          <div class="serve-card-first-small">累计成交</div>
        </div>
        <div class="serve-card-first-hr"></div>
        <div>
          <div class="serve-card-first-big">{{ item.num3 }}万+</div>
          <div class="serve-card-first-small">成功案列</div>
        </div>
      </div>
      <div class="serve-card-second">
        <div class="serve-card-second-left">
          <span>{{ item.price }}</span
          ><span>元起</span><strike>488.00元</strike>
        </div>
        <div class="serve-card-second-right">
          <div class="serve-card-second-right-person"></div>
          <div class="serve-card-second-right-rap" @click="$parent.openIm">
            <my-icon
              name="notify_ic_chat"
              color="#4974F5"
              size="0.4rem"
              class="icon"
            ></my-icon>
          </div>
          <div class="serve-card-second-right-rap" @click="call">
            <my-icon
              name="notify_ic_tel"
              color="#4974F5"
              size="0.4rem"
              class="icon"
            ></my-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Serve',
  data() {
    return {
      cards: [
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchlist1.jpg') +
              ')',
          },
          num1: '28',
          num2: '27',
          num3: '27',
          price: '500',
          person: '',
        },
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchlist2.jpg') +
              ')',
          },
          num1: '28',
          num2: '27',
          num3: '27',
          price: '500',
          person: '',
        },
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchlist3.jpg') +
              ')',
          },
          num1: '28',
          num2: '27',
          num3: '27',
          price: '500',
          person: '',
        },
      ],
      url: '',
    }
  },
  methods: {
    call(e) {
      e.stopPropagation()
    },
    openImUrl() {
      if (this.url !== '') {
        window.open = this.url
      } else {
        this.$parent.openIm()
      }
    },
  },
}
</script>

<style scoped lang="less">
.serve {
  margin: 50px 40px 0;
  &-text {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin: 0 0 32px 10px;
    line-height: 40px;
  }
  &-card {
    width: 670px;
    height: 472px;
    background: url('~assets/spreadImages/tax/busi_img_swchlist1.jpg');
    background-size: 101% 101%;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid rgba(205, 205, 205, 0.3);
    border-radius: 4px;
    margin-bottom: 25px;
    &-first {
      height: 351px;
      padding: 0 0 32px 0;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      border-bottom: 1px dashed #f4f4f4;
      &-big {
        font-size: 34px;
        line-height: 34px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-bottom: 17px;
      }
      &-small {
        font-size: 22px;
        line-height: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
      &-hr {
        width: 0.01rem;
        height: 34px;
        background: #f4f4f4;
        margin-bottom: 11px;
      }
    }
    &-second {
      height: 120px;
      padding: 0 22px 0 33px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-left {
        display: flex;
        align-items: center;
        height: 72px;
        > :nth-child(1) {
          font-size: 40px;
          line-height: 40px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        > :nth-child(2) {
          font-size: 24px;
          line-height: 24px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        > :nth-child(3) {
          font-size: 20px;
          line-height: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          text-decoration: line-through;
          color: #cccccc;
          margin-left: 15px;
        }
      }
      &-right {
        height: 72px;
        width: 240px;
        background: #ebf3ff;
        border-radius: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px 0 8px;
        &-person {
          height: 56px;
          width: 56px;
          border-radius: 50%;
          background-image: url('http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg');
          background-position: center center;
          background-size: 100% 100%;
        }
        &-rap {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
