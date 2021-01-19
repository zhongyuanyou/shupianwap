<template>
  <div class="item" @click="handleClick">
    <div v-if="info.imageUrl">
      <div class="item_tp">
        <div class="item_tp_lf">
          <div class="title">{{ info.title }}</div>
          <div class="content">{{ info.description }}</div>
        </div>
        <div class="item_tp_rt">
          <img :src="info.imageUrl" />
        </div>
      </div>
      <div class="item_bot">
        <div class="item_bot_lf">
          <img class="avatar" :src="info.imageUrl" />
          <p class="name">{{ info.updaterName }}</p>
        </div>
        <div class="item_bot_rt">
          {{ info.createTime }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="title">{{ info.title }}</div>
      <div class="content">{{ info.description }}</div>
      <div :class="['item_bot', 'item_bot_copy']">
        <div class="item_bot_lf">
          <sp-image
            width="0.48rem"
            height="0.48rem"
            radius="0.24rem"
            fit="cover"
            :src="info.imageUrl"
          />
          <p class="name">{{ info.updaterName }}</p>
        </div>
        <div class="item_bot_rt">
          {{ info.updateTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  name: 'Item',
  components: { [Image.name]: Image },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  methods: {
    handleClick() {
      // 点击跳转详情
      this.$router.push(`/found/detail/${this.info.id}`)
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
    width: 100%;
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
