<template>
  <div class="title">
    <div class="title_tags">
      <div class="title_tags_con">
        <!--        <div-->
        <!--          v-for="(item, index) in info.tags"-->
        <!--          :key="index"-->
        <!--          class="title_tags_con_item"-->
        <!--        >-->
        <!--          {{ item }}-->
        <!--        </div>-->
      </div>
      <div class="title_tags_remind">降价提醒</div>
    </div>
    <p class="title_btitle">{{ tcProductDetailData.name }}</p>
    <div class="imp_remind">
      <i class="icon certificates_icon"></i><span>重要提醒</span>
    </div>
    <p class="money">{{ tcProductDetailData.platformPrice }}元</p>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    tcProductDetailData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  padding: 36px 40px 39px 40px;
  background-color: #ffffff;
  border-bottom: 24px solid #f8f8f8;
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .certificates_icon {
    width: 40px;
    height: 28px;
    background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/3llegqu9ofs0000.png);
  }
  &_tags {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-direction: row;
    &_remind {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 36px;
    }
    &_con {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      flex-direction: row;
      &_item {
        height: 32px;
        padding: 0 6px;
        background: #f0f2f5;
        border-radius: 4px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #5c7499;
        line-height: 32px;
        margin-right: 12px;
      }
    }
  }
  &_btitle {
    font-size: 44px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 56px;
    margin-top: 19px;
  }
  .imp_remind {
    margin-top: 30px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    span {
      margin-left: 9px;
    }
  }
  .money {
    font-size: 52px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ec5330;
    line-height: 52px;
    margin-top: 50px;
  }
}
</style>
