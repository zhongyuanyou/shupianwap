<template>
  <div class="item">
    <sp-image width="3.72rem" height="6.61rem" fit="cover" :src="item.image" />
    <div class="content_box">
      <div class="content">
        <div class="count">{{ item.custTotalCount }} 次观看</div>
        <div class="tile">{{ item.videoName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  name: 'KnownSearchSmallVideoItem',
  components: { [Image.name]: Image },
  props: {
    svideoItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    item() {
      return this.svideoItem
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.item {
  ::v-deep .sp-image__img {
    border-radius: 4px;
  }
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 50%;
  height: 661px;
  margin: 2px 0;
  .content_box {
    position: absolute;
    bottom: 0;
    height: 200px;
    width: 100%;
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    border-radius: 0 0 4px 4px;
    .content {
      position: absolute;
      bottom: 16px;
      left: 20px;
      .count {
        font-size: 24px;
        opacity: 0.8;
        margin-bottom: 8px;
        line-height: 32px;
        color: #fff;
        font-weight: bold;
      }
      .tile {
        line-height: 44px;
        font-size: 36px;
        .textOverflow(2);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        color: #fff;
        font-weight: bold;
        width: 340px;
      }
    }
  }
}
</style>
