<template>
  <div class="title">
    <div class="title_tags">
      <div class="title_tags_con">
        <div
          v-for="(item, index) in info.tags"
          :key="index"
          class="title_tags_con_item"
        >
          {{ item }}
        </div>
      </div>
      <div class="title_tags_remind">降价提醒</div>
    </div>
    <p class="title_btitle">{{ info.title }}</p>
    <div class="imp_remind">重要提醒</div>
    <p class="money">{{ info.money }}元</p>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          tags: [],
        }
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
    line-height: 44px;
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
