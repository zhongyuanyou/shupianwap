<template>
  <div class="m-known-share smallVideo">
    <app-link />
    <div class="small-video">
      <my-icon
        name="bofang_mian"
        size="1.28rem"
        color="rgba(0,0,0,0.40)"
      ></my-icon>
      <div class="content">
        <div class="name">@黄奇帆</div>
        <div class="desc">
          王健林批评马云：平时不看书，还讲一堆大道理,给青少年灌输不好思想
        </div>
      </div>
    </div>
    <small-video-like />
  </div>
</template>

<script>
export default {
  name: 'KnownSmallVideo',
  components: {
    AppLink: () => import('@/components/mustKnown/share/AppLink'),
    SmallVideoLike: () => import('@/components/mustKnown/share/SmallVideoLike'),
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.m-known-share.smallVideo {
  background: #1a1a1a;
  min-height: 100vh;
  .small-video {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ccc;
    width: 100%;
    height: 80vh;
    .content {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 32px;
      font-family: @fontf-pfsc-med;
      font-weight: bold;
      color: #fff;
      width: 100%;
      height: 254px;
      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      bottom: 0;
      left: 0;
      .name {
        font-size: 40px;
        margin-bottom: 10px;
      }
      .desc {
        font-size: 32px;
        .textOverflow(2);
      }
    }
  }
}
</style>
