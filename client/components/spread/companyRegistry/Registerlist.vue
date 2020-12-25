<template>
  <div class="register-list">
    <div
      class="register-list_hidden"
      :class="isMore ? 'register-list_max' : 'register-list_max--active'"
    >
      <div
        v-for="(listCounts, index) of listCount"
        :key="index"
        :style="{
          background:
            'url(' + listCounts.bgImg + ')' + 'top center/100% auto no-repeat',
        }"
        class="list"
        @click="onMessage('', index, $event)"
      >
        <div
          v-md-map
          v-md:WebClick
          v-md:p_IMClick
          data-im_type="售前"
          data-form_type="售前"
          data-name="工商注册_服务介绍_在线咨询"
          class="list-count"
        >
          <div class="list-count_item">
            <span>{{ listCounts.operating.actualSales }}</span>
            <div>在线咨询</div>
          </div>
          <div class="list-count_item">
            <span>{{ listCounts.operating.actualViews }}</span>
            <div>累计成交</div>
          </div>
          <div class="list-count_item">
            <span>{{ listCounts.operating.defaultSales }}</span>
            <div>成功案例</div>
          </div>
        </div>
        <div class="list-advisory">
          <span
            v-md-map
            v-md:WebClick
            v-md:p_IMClick
            data-im_type="售前"
            data-form_type="售前"
            data-name="工商注册_服务介绍_在线咨询"
            class="price"
            ><span>{{ listCounts.pric }}</span
            >元起</span
          >
          <div class="advisory">
            <sp-image
              v-md-map
              v-md:WebClick
              v-md:p_IMClick
              data-im_type="售前"
              data-form_type="售前"
              data-name="工商注册_服务介绍_在线咨询"
              round
              width="28px"
              height="28px"
              :src="listCounts.imgSrc"
            />
            <span
              v-md-map
              v-md:WebClick
              v-md:p_IMClick
              data-im_type="售前"
              data-form_type="售前"
              data-name="工商注册_服务介绍_在线咨询"
              ><my-icon
                name="notify_ic_chat"
                size="20px"
                color="#4974F5"
              ></my-icon
            ></span>
            <span @click="onPhone(index)">
              <my-icon
                name="notify_ic_tel"
                size="20px"
                color="#4974F5"
                data-stop="stop"
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
        return [
          {
            pric: 4000,
            bgImg: require('~/assets/spreadImages/company_registry/busi_img_fwjs_yxze.png'),
            operating: {
              actualViews: 3291,
              defaultSales: 1837,
              actualSales: 1832,
            },
          },
          {
            pric: 5000,
            bgImg: require('~/assets/spreadImages/company_registry/busi_img_fwjs_gtzc.png'),
            operating: {
              actualViews: 3291,
              defaultSales: 1837,
              actualSales: 1832,
            },
          },
          {
            pric: 7000,
            bgImg: require('~/assets/spreadImages/company_registry/busi_img_fwjs_fgs.png'),
            operating: {
              actualViews: 3291,
              defaultSales: 1837,
              actualSales: 1832,
            },
          },
        ]
      },
    },
    isMore: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  methods: {
    onMessage(url, index, e) {
      if (e.target.dataset.stop !== 'stop') {
        if (url !== '') {
          window.location.href = url
        } else {
          this.$root.$emit(
            'openIMM',
            this.listCount[index].id,
            this.listCount[index].name,
            this.listCount[index].jobNum,
            this.listCount[index].imgSrc
          )
        }
      }
    },
    onPhone(index) {
      console.log(index)
      Toast('电话')
      window.location.href = `tel:${this.listCount[index].telephone}`
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
  // 选择更多高度
  .register-list_max {
    max-height: 10000px;
  }
  .register-list_max--active {
    max-height: 1610px;
  }
}
</style>
