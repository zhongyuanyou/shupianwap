<template>
  <div class="item">
    <sp-image width="100%" height="6.61rem" fit="cover" :src="item.image" />
    <div class="content_box">
      <div class="desc">
        <div class="count">
          <my-icon name="a-guankan2" color="#FFFFFF" size="0.32rem"></my-icon>
          <div class="count-count">{{ item.custTotalCount | numChange }}</div>
        </div>
        <div class="classify">jajajajjajaja</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
import { numChangeW } from '@/utils/common'

export default {
  name: 'KnownSearchSmallVideoItem',
  components: { [Image.name]: Image },
  filters: {
    numChange(val) {
      return numChangeW(val)
    },
  },
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
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  .content_box {
    position: absolute;
    bottom: 0;
    left: 5px;
    right: 5px;
    height: 215px;
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    border-radius: 0 0 4px 4px;
    .desc {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      top: 59px;
      left: 20px;
      right: 20px;
      .count {
        display: flex;
        align-items: center;
        &-count {
          font-size: 24px;
          color: #fff;
          line-height: 1;
          margin-left: 8px;
        }
      }
      .classify {
        background: #fff;
        padding: 4px 10px;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 16px;
        color: #000;
      }
    }
  }
}
</style>
