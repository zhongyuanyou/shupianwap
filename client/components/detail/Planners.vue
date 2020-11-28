<template>
  <div class="planners">
    <p class="planners_title">推荐规划师</p>
    <div
      v-for="(item, index) in info.planners"
      :key="index"
      class="planners_item"
      :style="{ marginTop: index === 0 ? '0.48rem' : '0.66rem' }"
    >
      <div class="planners_item_lf">
        <sp-image
          width="0.8rem"
          height="0.8rem"
          round
          fit="cover"
          :src="item.avatar"
        />
        <div class="info">
          <div class="info_tp">
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  name: 'Planners',
  components: {
    [Image.name]: Image,
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          planners: [],
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.planners {
  border-top: 24px solid #f8f8f8;
  padding: 48px 40px 56px 40px;
  background-color: #fff;
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
  }
  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_lf {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      .info {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        margin-left: 24px;
        &_tp {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: row;
          .name {
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #1a1a1a;
          }
        }
      }
    }
  }
}
</style>
