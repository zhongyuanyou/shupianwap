<template>
  <div class="case_introduction">
    <div v-if="title" class="title">{{ title }}</div>

    <div v-if="list.length > 0" class="list">
      <div class="list_container">
        <div class="list_item" v-for="(item, index) in list" :key="index">
          <div class="img_container">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/snvfwuqf4rk000.png"
              class="hot"
            />
            <sp-image
              class="picture"
              fit="cover"
              :src="item"
              @click="$emit('preview', item)"
            ></sp-image>
          </div>
          <div class="title">aaaaaaaaaaaaaaaaaa</div>
          <div class="price">ddddd元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'

export default {
  name: 'CaseIntroduction',
  components: {
    [Image.name]: Image,

    // SpIcon: Icon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },

    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    commentfn() {
      this.$emit('onComment')
    },
  },
}
</script>

<style lang="less" scoped>
.case_introduction {
  font-family: PingFangSC;
  margin: 24px 20px;
  padding: 24px 20px;
  background: #ffffff;
  border-radius: 24px;

  font-size: 0;
  .flex {
    display: flex;
    align-items: center;
    // align-items: flex-start;
  }
  .flex_1 {
    flex: 1;
  }

  .title {
    font-weight: bold;
    font-size: 32px;
    color: #222222;
    margin-bottom: 21px;
  }

  .list {
    overflow: hidden;
    margin-top: 28px;
    .list_container {
      margin: 0 -5px;
    }
    .list_item {
      margin: 0 6px;
      display: inline-block;
      width: 32%;

      width: calc(33% - 10px);

      height: 144px;

      overflow: hidden;

      max-width: 215px;
      height: 260px;
      background: #f7f7f7;
      border-radius: 12px;
      text-align: center;

      .title {
        font-size: 24px;
        color: #222222;
        text-align: center;
        line-height: 28px;
        height: 56px;
        padding: 0 20px;
        .textOverflow(2);
      }
      .price {
        color: #ec5330;
        letter-spacing: 0;
      }
      .img_container {
        position: relative;
        .hot {
          position: absolute;
          left: 17px;
          top: 0;

          width: 30px;
        }
        .picture {
          margin: 24px auto;
          height: 112px;
        }
      }
    }
  }
}
</style>
