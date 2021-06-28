<template>
  <div v-if="toolNavList && toolNavList.length !== 0" class="tool">
    <div class="content">
      <div class="title">企服工具</div>
      <div class="list">
        <div v-for="item in toolNavList" :key="item.id" @click="skip(item)">
          <sp-image
            class="img"
            fit="cover"
            :src="item.navigationImageUrl"
            alt=""
          />
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
  },
  props: {
    toolNavList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    skip(item) {
      if (item.url) {
        window.location.href = item.url
      }
    },
  },
}
</script>

<style lang="less" scoped>
.tool {
  padding: 0 0.2rem;
  margin-bottom: 20px;
  > .content {
    padding: 24px 0.2rem 0;
    width: 100%;
    background: #fff;
    border-radius: 16px;
    > .title {
      font-weight: bold;
      line-height: 1;
      font-size: 32px;
      color: #222222;
    }
    > .list {
      margin-top: 40px;
      display: flex;
      overflow-y: auto;
      padding-bottom: 32px;
      > div {
        text-align: center;
        margin-right: 50px;
        &:last-child {
          margin-right: 0;
        }
      }
      .img {
        width: 84px;
        height: 84px;
        background: #f7fafb;
        overflow: hidden;
      }
      .name {
        font-size: 24px;
        white-space: nowrap;
        color: #222222;
      }
    }
  }
}
</style>
