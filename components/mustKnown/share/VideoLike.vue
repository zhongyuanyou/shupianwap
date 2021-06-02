<template>
  <div class="m-known-share vlike">
    <div class="like">猜你喜欢</div>
    <div class="video-list">
      <div class="item">
        <div class="item-video">
          <div class="time">00:15:50</div>
        </div>
        <div class="item-desc">
          <div class="tile">12314212523123213213213213</div>
          <div class="desc">
            <span>徐志斌</span>
            <span>2021.05.17 12:30</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-video">
          <div class="time">00:15:50</div>
        </div>
        <div class="item-desc">
          <div class="tile">
            顶呱呱科技有限公司10周庆，邀您好看顶呱呱科技有限公司10周庆，邀您好看顶呱呱科技有限公司10周庆，邀您好看
          </div>
          <div class="desc">
            <span>徐志斌</span>
            <span>2021.05.17 12:30</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-video">
          <div class="time">00:15:50</div>
        </div>
        <div class="item-desc">
          <div class="tile">顶呱呱科技有限公司10周庆，邀您好看</div>
          <div class="desc">
            <span>徐志斌</span>
            <span>2021.05.17 12:30</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KnownVideoLike',
}
</script>

<style lang="less" scoped>
.m-known-share.vlike {
  padding: 16px 32px;
  .like {
    font-size: 32px;
    color: #222222;
    font: 32px/44px @fontf-pfsc-med;
    margin-bottom: 10px;
  }
  .video-list {
    .item {
      padding: 28px 0;
      display: flex;
      &-video {
        position: relative;
        width: 240px;
        height: 135px;
        background: #f5f5f5;
        border-radius: 8px;
        margin-right: 28px;
        .time {
          position: absolute;
          padding: 3px 8px;
          box-sizing: border-box;
          bottom: 8px;
          left: 8px;
          opacity: 0.6;
          background: #000000;
          font: 22px @fontf-pfsc-med;
          color: #ffffff;
          border-radius: 8px;
        }
      }
      &-desc {
        width: 418px;
        .tile {
          font: 32px/44px @fontf-pfsc-med;
          color: #222222;
          height: 88px;
          .textOverflow(2);
          margin-bottom: 13px;
        }
        .desc {
          display: flex;
          justify-content: space-between;
          span:first-child {
            font: 26px @fontf-pfsc-med;
            color: #555555;
          }
          span:nth-child(2) {
            font: 24px @fontf-pfsc-reg;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
