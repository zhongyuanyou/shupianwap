<template>
  <div class="planners">
    <p class="planners_title">推荐规划师</p>
    <div
      v-for="(item, index) in info"
      :key="item.userCenterId"
      class="planners_item"
      :style="{ marginTop: index === 0 ? '0.48rem' : '0.66rem' }"
    >
      <div class="planners_item_lf">
        <sp-image
          width="0.8rem"
          height="0.8rem"
          round
          fit="cover"
          :src="item.avatar"
        />
        <div class="info">
          <div class="info_tp">
            <p class="name">{{ item.userName }}</p>
            <i class="gold_icon">{{ item.postName }}</i>
          </div>
          <div class="info_bot">
            <span class="num">{{ Number(item.point) }}</span
            ><span class="txt">薯片分 | {{ Number(item.payNum) }}次服务</span>
          </div>
        </div>
      </div>
      <div class="planners_item_rt">
        <sp-button round class="contact-btn"
          ><my-icon
            class=""
            name="notify_ic_chat"
            size="0.32rem"
            color="#4974F5"
        /></sp-button>
        <sp-button round class="contact-btn" @click="handleTel"
          ><my-icon
            class=""
            name="notify_ic_tel"
            size="0.32rem"
            color="#4974F5"
        /></sp-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'
export default {
  name: 'Planners',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
  props: {
    info: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleTel() {
      window.location.href = 'tel://18116757032'
    },
  },
}
</script>

<style lang="less" scoped>
.planners {
  border-top: 24px solid #f8f8f8;
  padding: 48px 40px 56px 40px;
  background-color: #fff;
  border-bottom: 24px solid #f8f8f8;
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .gold_icon {
    min-width: 146px;
    max-width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 34px;
    line-height: 32px;
    border: 1px solid #e0a963;
    margin-left: 12px;
    border-radius: 16px;
    font-size: 20px;
    font-weight: 400;
    color: #e0a963;
    padding-left: 38px;
    padding-right: 7px;
    text-align: center;
    position: relative;
    font-style: normal;
    &::before {
      content: '';
      display: block;
      width: 34px;
      height: 34px;
      background: url('~assets/images/planner/per_img_gold.png') no-repeat;
      background-size: 34px 34px;
      position: absolute;
      left: -1px;
      top: -1px;
    }
  }
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
  }
  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 80px;
    &_lf {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      .info {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        margin-left: 24px;
        &_tp {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: row;
          height: 32px;
          .name {
            max-width: 200px;
            font-size: 32px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-weight: bold;
            color: #1a1a1a;
            line-height: 32px;
          }
        }
        &_bot {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          flex-direction: row;
          height: 30px;
          line-height: 30px;
          .num {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ec5330;
          }
          .txt {
            margin-left: 17px;
          }
        }
      }
    }
    &_rt {
      height: 80px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      /deep/ .sp-button {
        border: none;
      }
      .contact-btn {
        width: 80px;
        height: 80px;
        background: rgba(235, 243, 255, 0.8);
        margin-right: 40px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
