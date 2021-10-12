<template>
  <div class="cell youhui">
    <my-icon
      name="gerenzhongxin_youhuiquanicon"
      size="0.36rem"
      color="#EC5330"
      class="my_icon"
    ></my-icon>
    线下优惠可咨询规划师
    <sp-button
      v-if="plannerDetail.mchUserId"
      class="im_btn"
      @click="
        sendTemplateMsgWithImg(
          plannerDetail.mchUserId,
          plannerDetail.type,
          sellingGoodsData
        )
      "
      >询优惠</sp-button
    >
  </div>
</template>

<script>
/**
 * @author tangdaibing
 * @description 服务商品详情页咨询入口
 */
import { Button } from '@chipspc/vant-dgg'
import imHandle from '~/mixins/imHandle'
export default {
  components: {
    [Button.name]: Button,
  },
  mixins: [imHandle],
  props: {
    // 钻展规划师
    plannerDetail: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    sellingGoodsData() {
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
  },
}
</script>

<style lang="less" scoped>
.cell {
  padding: 0 40px 0 39px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f4f4f4;
  &:last-child {
    border-bottom: none;
  }
  &_left {
    display: flex;
    align-items: center;
    flex: 1;
    .label {
      color: #999999;
      font-size: 26px;
      margin-right: 40px;
    }
    .server_tags {
      font-size: 26px;
      color: #222222;
      .item {
        position: relative;
        padding-right: 40px;
        &::before {
          height: 16px;
          position: absolute;
          right: 15px;
          content: '·';
          top: 0;
          font-size: 24px;
          font-weight: 600;
        }
      }
      ::v-deep.last_item {
        position: initial;
        padding-right: 0;
        &::before {
          position: initial;
          content: '';
        }
      }
    }
    .content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      // align-items: center;
      // flex: 1;
      max-width: 550px;
      color: #222222;
      font-size: 26px;
      height: 40px;
      overflow: hidden;
      white-space: nowrap;
      .tag {
        display: inline-block;
        // width: 60px;
        padding: 0px 8px;
        border-radius: 4px;
        // height: 32px;
        // line-height: 32px;
        background-color: #feefef;
        color: #f1524e;
        font-size: 22px;
        text-align: center;
        margin-right: 9px;
      }
      .hide {
        width: 432px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .not_vouchers {
        color: #cccccc;
      }
      .item {
        margin-right: 32px;
        &::before {
          content: '1';
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          border-radius: 50%;
          text-align: center;
          border: 1px solid #cccccc;
          color: #cccccc;
          font-size: 16px;
          margin-right: 12px;
        }
        &:nth-child(2)::before {
          content: '2';
        }
        &:nth-child(3)::before {
          content: '3';
        }
      }
      .last-item {
        margin-right: 0;
      }
    }
  }
}
.youhui {
  display: block;
  padding: 0 60px;
  height: 88px;
  font-size: 28px;
  color: #1a1a1a;
  text-align: left;
  line-height: 88px;
  .my_icon {
    float: left;
    margin-right: 12px;
  }
  .im_btn {
    float: right;
    background: #ec5330;
    border-radius: 8px;
    width: 118px;
    height: 56px;
    text-align: center;
    color: white;
    font-size: 26px;
    padding: 0;
    line-height: 56px;
    margin-top: 16px;
  }
}
</style>
