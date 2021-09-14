<template>
  <div class="item">
    <template v-if="liveFlag">
      <div class="lf_img">
        <img :src="item.myCoverUrl" alt="" />
        <div v-if="item.myStatusName" class="live" :class="liveStatusClass">
          <my-icon
            v-if="item.myStatusName === '直播中'"
            name="zhibozhong"
            size="0.2rem"
            color="#fff"
          ></my-icon>
          <div class="txt">{{ item.myStatusName }}</div>
        </div>
      </div>
      <div class="rt_content">
        <div class="title">
          <p v-html="item.myStudioNameTxt"></p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="lf_img">
        <img v-if="item.image" :src="item.image.split(',')[0]" alt="" />
        <div v-if="custCode !== 'course' && item.duration" class="time">
          {{ totime(item.duration) }}
        </div>
      </div>
      <div
        class="rt_content"
        :class="[custCode === 'course' ? 'z-course' : '']"
      >
        <div class="title">
          <p v-if="custCode === 'video'" v-html="item.videoNameHtml"></p>
          <p v-else v-html="item.courseNameHtml"></p>
          <!-- {{ item.videoName }} -->
        </div>
        <div v-if="custCode === 'video'" class="name_time">
          <div class="name">{{ item.authorName }}</div>
          <div class="time">
            {{ timeSplice(item.createTime) }}
          </div>
        </div>
        <template v-if="custCode === 'course'">
          <div class="name_desc">
            <div class="name">{{ item.authorName }}</div>
            <div class="desc">{{ item.authorTile }}</div>
          </div>
          <div class="num_desc">{{ item.totalViewCount | numChange }} 人次</div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { numChangeW } from '@/utils/common'

export default {
  name: 'KnownSearchVideoItem',
  filters: {
    numChange(val) {
      return numChangeW(val)
    },
  },
  props: {
    videoItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
    code: {
      type: String,
      default: '',
    },
  },
  computed: {
    item() {
      return this.videoItem
    },
    custCode() {
      return this.code
    },
    liveFlag() {
      if (this.code === 'live' || this.code === 'vback') {
        return true
      } else {
        return false
      }
    },
    liveStatusClass() {
      if (this.videoItem.myStatusName === '直播中') {
        return 'z-live'
      } else if (this.videoItem.myStatusName === '待直播') {
        return 'z-waitlive'
      } else {
        return 'z-vback'
      }
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
  align-items: flex-start;
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
    .live {
      position: absolute;
      left: 8px;
      top: 8px;
      border-radius: 4px;
      padding: 6px 10px;
      &.z-live {
        display: flex;
        align-items: center;
        background-image: linear-gradient(90deg, #80acfb 0%, #4974f5 100%);
        > div {
          margin-left: 6px;
        }
      }
      &.z-waitlive {
        background-image: linear-gradient(90deg, #faaa5a 0%, #f57622 100%);
      }
      &.z-vback {
        padding: 6px 20px;
        background-image: linear-gradient(90deg, #adadad 0%, #808080 100%);
      }
      .txt {
        font-size: 20px;
        line-height: 1;
        font-weight: bold;
        color: #fff;
      }
    }
  }
  .rt_content {
    width: 402px;
    height: 135px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &.z-course {
      margin-top: -5px;
    }
    .title {
      color: #222222;
      font: bold 30px/42px PingFangSC-Medium, PingFang SC;
      .textOverflow(2);
    }
    .name_time {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        color: #555555;
        font: bold 26px/36px PingFangSC-Medium, PingFang SC;
        max-width: 150px;
        .mixin-text-oneoverflow();
      }
      .time {
        color: #999999;
        font: 400 26px/32px PingFangSC-Regular, PingFang SC;
      }
    }
    .name_desc {
      display: flex;
      align-items: center;
      .name {
        max-width: 150px;
        margin-right: 20px;
        color: #222222;
        font: bold 26px/36px PingFangSC-Medium, PingFang SC;
        .mixin-text-oneoverflow();
      }
      .desc {
        flex: 1;
        color: #999999;
        font-size: 28px;
        line-height: 28px;
        .mixin-text-oneoverflow();
      }
    }
    .num_desc {
      margin-top: 28px;
      color: #999;
      font-size: 24px;
      line-height: 24px;
    }
  }
}
</style>
