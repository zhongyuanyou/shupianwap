<template>
  <div class="item">
    <div class="lf_img">
      <img v-if="item.image" :src="item.image.split(',')[0]" alt="" />
      <div class="time">{{ totime(item.duration) }}</div>
    </div>
    <div class="rt_content">
      <div class="title">
        <p v-html="item.videoNameHtml"></p>
        <!-- {{ item.videoName }} -->
      </div>
      <div class="name_time">
        <div class="name">{{ item.createrName }}</div>
        <div class="time">
          {{ timeSplice(item.createTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KnownSearchVideoItem',
  props: {
    videoItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    item() {
      return this.videoItem
    },
  },
  methods: {
    timeSplice(time) {
      return time.substring(0, time.length - 3)
    },
    totime(time) {
      if (!time) {
        return ''
      }
      let hour = Math.floor(time / 3600)
      let mid = Math.floor((time - 3600 * hour) / 60)
      // math.flotime / 60
      let sec = Math.floor((time - 3600 * hour) % 60)
      if (hour < 10) {
        hour = '0' + hour
      }
      if (mid < 10) {
        mid = '0' + mid
      }
      if (sec < 10) {
        sec = '0' + sec
      }

      return hour + ':' + mid + ':' + sec
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  padding: 28px 32px;
  display: flex;
  align-items: center;
  .lf_img {
    width: 240px;
    height: 135px;
    background: #f5f5f5;
    border-radius: 8px;
    position: relative;
    margin-right: 28px;
    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 8px;
    }
    .time {
      background: #000000;
      border-radius: 8px;
      opacity: 0.6;
      position: absolute;
      bottom: 8px;
      left: 9px;
      font: bold 22px/30px PingFangSC-Medium, PingFang SC;
      color: #ffffff;
      padding: 3px 8px;
    }
  }
  .rt_content {
    width: 402px;
    .title {
      color: #222222;
      font: bold 30px/42px PingFangSC-Medium, PingFang SC;
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      height: 84px;
    }
    .name_time {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        color: #555555;
        font: bold 26px/36px PingFangSC-Medium, PingFang SC;
      }
      .time {
        color: #999999;
        font: 400 26px/32px PingFangSC-Regular, PingFang SC;
      }
    }
  }
}
</style>
