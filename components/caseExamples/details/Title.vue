<template>
  <div class="title">
    <div class="title_tags">
      <div class="title_tags_left">
        <div v-if="info.detailInfo && info.detailInfo.caseLabel">
          <span
            v-for="item of info.detailInfo.caseLabel"
            :key="item.labelCode"
            class="title_tags_item"
            >{{ item.labelName }}</span
          >
        </div>
      </div>
      <div class="title_tags_right">
        <my-icon name="login_ic_look" size="0.24rem" color="#4974F5" />
        <span class="view">{{
          (info.caseDefaultRead || 0) + (info.caseRealReadNum || 0)
        }}</span>
      </div>
    </div>

    <p class="title_btitle">{{ info.caseName }}</p>

    <div class="title_info flex">
      <div class="flex_1">
        <div class="title_info_num">
          {{ (info.commodityAmount / 100 || 0).toFixed(2) }}元
        </div>
        价格
      </div>
      <div class="flex_1">
        <div class="title_info_num">{{ info.dealTime || 0 }}天</div>
        办理周期
      </div>
      <div class="flex_1">
        <div class="title_info_num">
          {{ info.dealProvince }}{{ info.dealCity }}
        </div>
        办理区域
      </div>
    </div>

    <div
      v-if="priceData.length > 0 && info.caseType === 'CASE_TYPE_1'"
      class="title_bottom"
    >
      <QuotationScheme :info="priceData || []"></QuotationScheme>
      <!-- <div class="title_bottom_button">报价方案</div> -->
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'
import QuotationScheme from '@/components/caseExamples/details/QuotationScheme.vue'

export default {
  name: 'Title',
  components: {
    [Image.name]: Image,
    QuotationScheme,
    // SpIcon: Icon,
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    priceData() {
      return this.info?.detailInfo?.priceData || []
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.title {
  font-family: PingFangSC;
  padding: 45px 40px 40px;
  border-bottom: 0.24rem solid #f8f8f8;
  background: #ffffff;
  font-size: 0;
  .flex {
    display: flex;
    align-items: center;
    // align-items: flex-start;
  }
  .flex_1 {
    flex: 1;
  }

  .title_tags {
    position: relative;
    height: 42px;
    .title_tags_left {
      div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right: 150px;
      }
      .title_tags_item {
        background: #f0f2f5;
        border-radius: 4px;
        display: inline-block;
        margin-right: 12px;
        padding: 5px 8px;
        margin-right: 10px;
        font-size: 22px;
        color: #5c7499;
        letter-spacing: 0;
        text-align: center;
      }
    }
    .title_tags_right {
      position: absolute;
      right: 0;
      top: 8px;
      font-size: 24px;
      color: #222222;
      letter-spacing: 0;
      line-height: 24px;
      width: 140px;
      .view {
        margin-left: 12px;
      }
    }
  }

  .title_btitle {
    font-family: PingFangSC-Medium;
    font-weight: bold;
    font-size: 44px;
    color: #222222;
    line-height: 58px;
    margin: 20px 0 38px;
  }

  .title_info {
    font-size: 22px;
    color: #999999;
    letter-spacing: 0;
    line-height: 30px;

    .title_info_num {
      letter-spacing: 0;
      font-weight: bold;

      font-family: PingFangSC-Medium;
      font-size: 40px;
      color: #ec5330;
      line-height: 56px;

      white-space: nowrap;
    }
  }
  .title_info > div:nth-child(2) {
    border-right: 1px solid #f4f4f4;
    border-left: 1px solid #f4f4f4;
    padding: 0 20px;
    margin: 0 20px;
  }

  .title_bottom {
    margin-top: 40px;
    // &_button {
    //   height: 96px;
    //   line-height: 96px;
    //   background: #4974f5;
    //   border-radius: 8px;

    //   font-family: PingFangSC-Medium;
    //   font-weight: bold;
    //   font-size: 32px;
    //   color: #ffffff;
    //   text-align: center;
    // }
  }
}
</style>
