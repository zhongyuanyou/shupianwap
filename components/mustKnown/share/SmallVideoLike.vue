<template>
  <div class="m-known-share svlike">
    <div class="like">猜你喜欢</div>
    <div v-if="mVlist.length > 0" class="video-list">
      <div
        v-for="(item, index) in mVlist"
        :key="index"
        class="item"
        :style="{
          backgroundImage: 'url(' + item.image + ')',
          backgroundSize: '100%',
          'background-repeat': 'no-repeat',
        }"
        @click="openApp"
      >
        <div class="content">
          <div class="count">{{ item.custTotalCount }} 次观看</div>
          <div class="tile">{{ item.videoName }}</div>
        </div>
      </div>
    </div>
    <div class="placeholder"></div>
    <sp-center-popup
      v-model="showPop"
      button-type="confirm"
      :field="Field"
      @confirm="confirm"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import openappV2 from '@/mixins/openappV2'

export default {
  name: 'KnownSmallVideoLike',
  mixins: [openappV2],
  props: {
    vList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    mVlist() {
      return this.vList
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.m-known-share.svlike {
  .like {
    height: 128px;
    text-align: center;
    font: bold 32px/128px @fontf-pfsc-med;
    color: #fff;
  }
  .video-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .item {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      border: 1px #1a1a1a solid;
      width: 50%;
      height: 660px;
      .content {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        font-family: @fontf-pfsc-med;
        font-weight: bold;
        color: #fff;
        width: 100%;
        height: 200px;
        background-image: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.4) 0%,
          rgba(0, 0, 0, 0) 100%
        );
        bottom: 0;
        left: 0;
        .count {
          font-size: 24px;
          opacity: 0.8;
          margin-bottom: 8px;
        }
        .tile {
          font-size: 36px;
          .textOverflow(2);
        }
      }
    }
  }
  .placeholder {
    height: 64px;
    width: 100%;
  }
}
</style>
