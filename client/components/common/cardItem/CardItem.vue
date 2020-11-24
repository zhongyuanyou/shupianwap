<template>
  <div class="card_item" @click="handleClick">
    <div v-if="!layout || !image">
      <p class="title">
        <span v-if="favour.hot" class="hot">热门</span>{{ favour.title }}
      </p>
      <img v-if="image && image.src" :src="image.src" class="normal_img" />
      <div class="card_item_bot">
        <p class="card_item_bot_lf">
          {{ favour.name }}<span>{{ favour.time }}</span>
        </p>
        <div class="hot_con"></div>
      </div>
    </div>
    <div v-else class="space_item">
      <div class="space_item_lf">
        <p :class="['title', 'space_title']">
          <span v-if="favour.hot" class="hot">热门</span>{{ favour.title }}
        </p>
        <p class="space_lf">
          {{ favour.name }}<span>{{ favour.time }}</span>
        </p>
      </div>
      <div class="space_img_con">
        <div :class="['hot_con', 'hot_con_pos']"></div>
        <img :src="image.src" class="space_img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    favour: {
      type: Object,
      default: () => {
        return {
          title: '',
          icon: '',
          value: 0,
        }
      },
    },
    image: {
      type: Object,
      default: () => {
        return {}
      },
    },
    layout: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  methods: {
    handleClick() {
      // 点击
      this.$emit('click')
    },
  },
}
</script>

<style lang="less" scoped>
.card_item {
  margin: 32px 40px 0 40px;
  border-bottom: 1px solid #f4f4f4;
  padding-bottom: 32px;
  &_bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 33px;
    &_lf {
      font-size: 22px;
      color: #999;
      span {
        margin-left: 21px;
      }
    }
  }
  .normal_img {
    width: 670px;
    height: 378px;
    border-radius: 8px;
    margin-top: 33px;
  }
  .space_item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    &_lf {
      height: 180px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      .space_lf {
        font-size: 22px;
        color: #999;
        line-height: 42px;
        font-family: PingFang SC;
        font-weight: 400;
        span {
          margin-left: 21px;
        }
      }
    }
  }
  .title {
    color: #333;
    font-size: 32px;
    font-weight: bold;
    line-height: 46px;
    font-family: PingFang SC;
    .hot {
      padding: 0 7px;
      height: 32px;
      background: #fa5741;
      border-radius: 3px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      margin-right: 10px;
      line-height: 46px;
      vertical-align: bottom;
    }
  }
  .space_title {
    width: 381px;
  }
  .space_img_con {
    position: relative;
    .space_img {
      width: 248px;
      height: 180px;
      border-radius: 8px;
    }
    .hot_con_pos {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
  }
  .hot_con {
    width: 84px;
    height: 38px;
    border-radius: 19px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
}
</style>
