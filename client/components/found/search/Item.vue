<template>
  <div class="item">
    <div v-if="info.img">
      <div class="item_tp">
        <div class="item_tp_lf">
          <div class="title">{{ info.title }}</div>
          <div class="content">{{ info.content }}</div>
        </div>
        <div class="item_tp_rt">
          <img :src="info.img" />
        </div>
      </div>
      <div class="item_bot">
        <div class="item_bot_lf">
          <img class="avatar" :src="info.avatar" />
          <p class="name">{{ info.name }}</p>
        </div>
        <div class="item_bot_rt">
          {{ info.time }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="title">{{ info.title }}</div>
      <div class="content">{{ info.content }}</div>
      <div :class="['item_bot', 'item_bot_copy']">
        <div class="item_bot_lf">
          <img class="avatar" :src="info.avatar" />
          <p class="name">{{ info.name }}</p>
        </div>
        <div class="item_bot_rt">
          {{ info.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  margin-top: 40px;
  padding-bottom: 31px;
  border-bottom: 1px solid #f4f4f4;
  .title {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 36px;
    .textOverflow(2);
  }
  .content {
    font-size: 24px;
    margin-top: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 24px;
    .textOverflow(2);
  }
  &_tp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_lf {
      width: 479px;
      height: 144px;
    }
    &_rt {
      width: 144px;
      height: 144px;
      img {
        width: 144px;
        height: 144px;
      }
    }
  }
  &_bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 20px;
    &_lf {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      .name {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        margin-left: 12px;
      }
    }
    &_rt {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
  .item_bot_copy {
    margin-top: 24px;
  }
}
</style>
