<template>
  <div class="planner">
    <div class="planner-title">咨询规划师</div>
    <div class="planner-flex">
      <sp-swipe
        :autoplay="3000"
        indicator-color="white"
        :show-indicators="false"
        class="planner-content my-swipe"
      >
        <sp-swipe-item
          v-for="item of 3"
          :key="item"
          class="planner-content-div"
        >
          <div class="planner-content-div-left">
            <div class="planner-content-div-left-person">
              <div class="planner-content-div-left-person-img"></div>
              <div class="planner-content-div-left-person-font">金牌规划师</div>
            </div>
            <div class="planner-content-div-left-content">
              <div class="planner-content-div-left-content-name">郭亮亮</div>
              <div class="planner-content-div-left-content-count">
                薯片分 138 | 服务次数 258
              </div>
              <div class="planner-content-div-left-content-tab">
                <div v-for="(tab, i) of tabs" :key="i">{{ tab }}</div>
              </div>
            </div>
            <div class="planner-content-div-left-icon">
              <div style="margin-right: 0.2rem" @click="$parent.openIm">
                <my-icon
                  name="notify_ic_chat"
                  color="#4974F5"
                  size="0.32rem"
                  class="icon line"
                ></my-icon>
              </div>
              <div>
                <my-icon
                  name="notify_ic_tel"
                  color="#4974F5"
                  size="0.32rem"
                  class="icon line"
                ></my-icon>
              </div>
            </div>
          </div>
        </sp-swipe-item>
        <div class="planner-content-space"></div>
      </sp-swipe>
      <div class="planner-right"></div>
    </div>
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
import dggImCompany from '~/components/spread/DggImCompany'
export default {
  name: 'Planner',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    dggImCompany,
  },
  data() {
    return {
      img: require('~/assets/spreadImages/tax/busi_img_swchbg01.png'),
      tabs: ['工商注册', '财税咨询', '税务筹划'],
    }
  },
  methods: {
    openIm() {
      this.$root.$emit('openIMM', '7862495547640840192', '张毅', '107547')
    },
  },
}
</script>

<style scoped lang="less">
.planner {
  width: 750px;
  height: 349px;
  padding: 30px 0 40px 40px;
  &-title {
    font-size: 40px;
    line-height: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 32px;
  }
  &-flex {
    display: flex;
  }
  &-content {
    width: 660px;
    height: 207px;
    margin-right: 20px;
    &-div {
      width: 660px;
      height: 207px;
      display: inline-block;
      &-left {
        width: 660px;
        height: 207px;
        background: url('~assets/spreadImages/tax/busi_img_swchbg01.png');
        background-size: 100% 100%;
        border: 1px solid rgba(205, 205, 205, 0.4);
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        display: flex;
        position: relative;
        &-person {
          margin: 0 -15px 27px 0;
          width: 180px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: relative;
          &-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: gray;
          }
          &-font {
            height: 26px;
            line-height: 24px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #9b6809;
            background: linear-gradient(135deg, #ffeab9, #edcf98);
            border: 1px solid #dfb45a;
            border-radius: 13px;
            position: absolute;
            bottom: 37px;
            padding: 0 9px;
          }
        }
        &-content {
          margin-top: 40px;
          &-name {
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: bold;
            margin-bottom: 23px;
            height: 32px;
            line-height: 32px;
          }
          &-count {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            margin-bottom: 16px;
            height: 24px;
            line-height: 24px;
          }
          &-tab {
            display: flex;
            div {
              text-align: center;
              width: 104px;
              height: 32px;
              background: #f0f1f3;
              border-radius: 4px;
              font-size: 22px;
              line-height: 32px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #68728d;
              margin-right: 12px;
            }
          }
        }
        &-icon {
          display: flex;
          height: 64px;
          position: absolute;
          top: 32px;
          right: 32px;
          div {
            width: 64px;
            height: 64px;
            background: #ebf3ff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            .line {
              line-height: 32px;
            }
          }
        }
      }
    }
    &-space {
      border: 15px solid transparent;
    }
  }
  &-right {
    width: 8px;
    height: 207px;
    background: #c1d4fc;
    border-radius: 2px;
  }
}
</style>
