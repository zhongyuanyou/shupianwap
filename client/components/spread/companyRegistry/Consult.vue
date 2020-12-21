<template>
  <div class="consult">
    <sp-swipe :loop="false" :width="300" :show-indicators="false">
      <sp-swipe-item v-for="(item, index) of 3" :key="index">
        <div></div>
        <div>
          <sp-image
            width="50px"
            height="50px"
            fit="cover"
            round
            :src="
              require('' +
                '~/assets/spreadImages/company_registry/busi_img_fwrx.png')
            "
          />
          <span class="log">金牌规划师</span>
        </div>
        <div>
          <p>郭亮亮</p>
          <div class="count">
            <label>薯片分 <span>138</span></label
            >&nbsp;|&nbsp;
            <label>服务次数 <span>258</span></label>
          </div>
          <div class="label">
            <span>工商注册</span>
            <span>财税咨询</span>
            <span>水务筹划</span>
          </div>
        </div>
        <div>
          <i
            ><sp-image
              round
              width="16px"
              height="16px"
              :src="
                require('' +
                  '~/assets/spreadImages/company_registry/busi_img_gszcxx.png')
              "
          /></i>
          <i
            ><sp-image
              round
              width="16px"
              height="16px"
              :src="
                require('' +
                  '~/assets/spreadImages/company_registry/busi_img_fwrx.png')
              "
          /></i>
        </div>
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>
<script>
import { Toast, Image, Swipe, SwipeItem } from '@chipspc/vant-dgg'
export default {
  name: 'Standard',
  components: {
    [Image.name]: Image,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.consult {
  padding: 32px 16px 0px 0px;
  /deep/.sp-swipe {
    width: 100%;
    .sp-swipe-item {
      width: 660px !important;
      height: 207px;
      background: #ffffff;
      border: 1px solid rgba(205, 205, 205, 0.5);
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      margin-right: 24px;
      display: flex;
      div:first-child {
        width: 8px;
        height: 207px;
        background: #c1d4fc;
        border-radius: 2px;
      }
      /deep/div:nth-child(2) {
        width: 156px;
        height: 207px;
        line-height: 207px;
        padding: 0 25px 0 35px;
        position: relative;
        .sp-image {
          border-radius: 50%;
        }
        .log {
          width: 140px;
          height: 40px;
          line-height: 36px;
          text-align: center;
          background: linear-gradient(135deg, #ffeab9, #edcf98);
          border: 1px solid #dfb45a;
          border-radius: 13px;
          position: absolute;
          font-weight: bold;
          color: #9b6809;
          font-size: 16px;
          bottom: 64px;
          left: 16px;
          transform: scale(0.7);
        }
      }
      > div:nth-child(3) {
        height: 207px;
        line-height: 207px;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        font-size: 32px;
        p {
          width: 100%;
          height: 31px;
          line-height: 31px;
          font-size: 32px;
          font-weight: bold;
          color: #222222;
        }
        .count {
          width: 100%;
          height: 25px;
          margin: 24px 0 16px 0;
          padding: 0px;
          line-height: 25px;
          font-size: 24px;
          color: #222222;
        }
        .label {
          height: 42px;
          line-height: 42px;
          font-weight: 400;
          color: #68728d;
          span {
            width: 104px;
            height: 32px;
            font-size: 20px;
            background: #f0f1f3;
            border-radius: 4px;
            padding: 4px 8px;
          }
        }
      }
      > div:last-child {
        width: 168px;
        height: 64px;
        line-height: 64px;
        position: absolute;
        display: flex;
        top: 32px;
        right: 32px;
        i {
          width: 64px;
          height: 64px;
          line-height: 64px;
          display: inline-block;
          border-radius: 50%;
          background-color: #b4cafb;
          margin-left: 20px;
          .sp-image {
            margin: 16px;
          }
        }
      }
    }
  }
}
</style>
