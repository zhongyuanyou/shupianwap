<template>
  <div class="list">
    <div class="flex list_header">
      <div v-if="item.caseImg" class="goods_img">
        <sp-image
          width="100%"
          height="100%"
          fit="cover"
          :src="$resizeImg(88, 70, item.caseImg)"
        />
      </div>
      <div class="flex_1 list_header_center">
        <div class="name">{{ item.caseName }}</div>
        <div class="time">办理周期：{{ item.dealTime || 0 }}天</div>
      </div>
      <div v-if="item.caseScore" class="list_header_right">
        <span
          class="score"
          :class="{ low_score: (item.caseScore / 100 || 0) < 8 }"
          >{{ (item.caseScore / 100 || 0).toFixed(1) }}
        </span>
        <span
          class="unit"
          :class="{ low_score: (item.caseScore / 100 || 0) < 8 }"
          >分</span
        >
      </div>
    </div>
    <!-- 服务产品类型 CASE_TYPE_1
      交易产品类型  CASE_TYPE_2 -->
    <div class="list_content">
      <div class="list_content_text">案例简介：{{ content }}</div>
    </div>
  </div>
</template>
<script>
import { Image, Button, Empty } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    content() {
      if (
        this.item?.caseIntro?.show &&
        this.item?.caseIntro?.show?.length > 0
      ) {
        return this.item?.caseIntro?.show[0]?.content || ''
      }
      return ''
    },
  },
}
</script>

<style lang="less" scoped>
.list {
  .flex {
    display: flex;
  }
  .flex_1 {
    flex: 1;
  }
  font-size: 0;
  margin-top: 20px;
  padding: 40px;
  background-color: #ffffff;

  .list_header {
    .goods_img {
      width: 174px;
      height: 120px;
      background: #d8d8d8;
      border-radius: 4px;
      overflow: hidden;
      margin-right: 24px;
    }
    .list_header_center {
      margin-right: 35px;
      .name {
        font-family: PingFangSC-Medium;
        font-weight: bold;
        font-size: 32px;
        color: #222222;
        line-height: 44px;
      }
      .time {
        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #1a1a1a;
        margin-top: 14px;
      }
    }
    .list_header_right {
      .score {
        font-family: Bebas;
        font-size: 46px;
        color: #4975f5;
        letter-spacing: 0;
      }

      .unit {
        font-family: PingFangSC-Medium;
        font-weight: bold;
        font-size: 24px;
        color: #4974f5;
        letter-spacing: 0;
        line-height: 24px;
      }
      .low_score {
        color: #7a9bff;
      }
    }
  }

  .list_content {
    position: relative;

    padding: 20px;
    background: #f8f8f8;
    margin-top: 30px;
    border-radius: 12px;

    .list_content_text {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #555555;
      letter-spacing: 0;
      line-height: 38px;
      .textOverflow(3);
    }
  }
  .list_content::after {
    content: '';
    position: absolute;
    top: -16px;
    left: 79px;

    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 16px solid #f8f8f8;
  }
}
</style>
