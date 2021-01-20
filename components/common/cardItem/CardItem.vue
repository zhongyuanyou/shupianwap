<template>
  <div class="card_item" @click="handleClick">
    <div v-if="!layout || !image">
      <p
        class="title"
        :style="{ color: hasLook.includes(favour.id) ? '#999999' : '#333' }"
      >
        <span v-if="favour.hot" class="hot">热门</span>{{ favour.title }}
      </p>
      <sp-image
        v-if="image && image.src"
        height="3.78rem"
        radius="0.08rem"
        fit="cover"
        class="normal_img"
        :src="image.src"
      />
      <div class="card_item_bot">
        <p class="card_item_bot_lf">
          {{ favour.createrName
          }}<span>{{ favour.createTime | dateTime }}</span>
        </p>
        <div class="hot_con">
          <my-icon name="news_ic_heat" color="#fff" size="0.17rem" />
          <p class="num">
            {{ favour.newsReadAll > 99999 ? '10w+' : favour.newsReadAll }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="space_item">
      <div class="space_item_lf">
        <p
          :class="['title', 'space_title']"
          :style="{ color: hasLook.includes(favour.id) ? '#999999' : '#333' }"
        >
          <span v-if="favour.hot" class="hot">热门</span>{{ favour.title }}
        </p>
        <p class="space_lf">
          {{ favour.createrName
          }}<span>{{ favour.createTime | dateTime }}</span>
        </p>
      </div>
      <div class="space_img_con">
        <div :class="['hot_con', 'hot_con_pos']">
          <my-icon name="news_ic_heat" color="#fff" size="0.17rem" />
          <p class="num">
            {{ favour.newsReadAll > 99999 ? '10w+' : favour.newsReadAll }}
          </p>
        </div>
        <sp-image
          v-if="image && image.src"
          width="2.48rem"
          height="1.8rem"
          radius="0.08rem"
          fit="cover"
          :src="image.src"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  name: 'CardItem',
  components: {
    [Image.name]: Image,
  },
  filters: {
    dateTime(time) {
      return time.replace(/-/g, '.')
    },
  },
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
  data() {
    return {
      hasLook: [], // 当前被点击过的文章id
    }
  },
  methods: {
    handleClick() {
      // 点击
      if (!this.hasLook.length) {
        this.hasLook.push(this.favour.id)
      } else {
        const isHas = this.hasLook.some((item) => {
          return item.id === this.favour.id
        })
        if (!isHas) {
          this.hasLook.push(this.favour.id)
        }
      }
      this.$emit('click')
    },
  },
}
</script>

<style lang="less" scoped>
.card_item {
  .gray_title {
    color: red;
  }
  .sp-cell {
    padding: 40px 32px;
  }
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
    width: 100%;
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
    .textOverflow(2);
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
    width: 248px;
    height: 180px;
    .hot_con_pos {
      position: absolute;
      right: 12px;
      bottom: 12px;
      z-index: 1;
    }
  }
  .hot_con {
    width: 105px;
    height: 38px;
    border-radius: 19px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    .num {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #fff;
      margin-left: 5px;
    }
  }
}
</style>
