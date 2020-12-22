<template>
  <div class="register-list">
    <div
      class="register-list_hidden"
      :style="{ maxHeight: `${isMore ? '30000px' : '805px'}` }"
    >
      <div
        v-for="(listCounts, index) of listCount"
        :key="index"
        :style="{
          background:
            'url(' + listCounts.bgImg + ')' + 'top center/100% auto no-repeat',
        }"
        class="list"
      >
        <nuxt-link to="/">
          <div class="list-count">
            <div class="list-count_item">
              <span>100万+</span>
              <div>在线咨询</div>
            </div>
            <div class="list-count_item">
              <span>100万+</span>
              <div>在线咨询</div>
            </div>
            <div class="list-count_item">
              <span>100万+</span>
              <div>在线咨询</div>
            </div>
          </div>
        </nuxt-link>

        <div class="list-advisory">
          <span class="price"
            ><span>{{ listCounts.pric }}</span
            >元</span
          >
          <div class="advisory">
            <sp-image
              round
              width="28px"
              height="28px"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <span @click="onMessage"
              ><my-icon
                name="notify_ic_chat"
                size="20px"
                color="#4974F5"
              ></my-icon
            ></span>
            <span>
              <my-icon
                name="notify_ic_tel"
                size="20px"
                color="#4974F5"
                @click="onPhone"
              ></my-icon
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon, Image, Toast } from '@chipspc/vant-dgg'
export default {
  name: 'Introduction',
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Toast.name]: Toast,
  },
  props: {
    listCount: {
      type: Array,
      default: () => {
        return []
      },
    },
    isMore: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    onMessage() {
      this.$root.$emit('openIMM', '7862499547640840192', '张毅', '107547')
    },
    onPhone() {
      Toast('电话')
    },
  },
}
</script>
<style lang="less" scoped>
.register-list {
  .register-list_hidden {
    overflow-y: hidden;
    .list:last-child {
      margin-bottom: 0px;
    }
    .list {
      width: 670px;
      border: 1px solid rgba(205, 205, 205, 0.3);
      border-radius: 8px;
      background: url(~assets/spreadImages/company_registry/busi_img_fwjs_gtzc.png)
        top center/100% auto no-repeat;
      margin-bottom: 25px;
      .list-count {
        display: flex;
        justify-content: space-between;
        padding: 216px 82px 78px;
        position: relative;
        .list-count_item {
          font-size: 34px;
          font-weight: bold;
          color: #222222;
          line-height: 52px;
          span {
            font-size: 34px;
            font-weight: bold;
            color: #222222;
            line-height: 52px;
          }
          div {
            font-size: 22px;
            font-weight: 400;
            color: #999999;
            line-height: 52px;
          }
        }
      }
      .list-advisory {
        display: flex;
        justify-content: space-between;
        padding: 0px 32px 46px;
        .price {
          font-size: 24px;
          font-weight: bold;
          color: #ec5330;
          span {
            font-size: 40px;
          }
        }
        .advisory {
          width: 240px;
          height: 72px;
          background-color: #4974f5;
          background: #ebf3ff;
          border-radius: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 28px 0 8px;
          > span {
            height: 72px;
            line-height: 35px;
          }
        }
      }
    }
  }
}
</style>
