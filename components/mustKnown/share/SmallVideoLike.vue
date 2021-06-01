<template>
  <div class="m-share like">
    <div class="like">猜你喜欢</div>
    <div class="video-list">
      <div class="item">
        <div class="content">
          <div class="count">20.5w次观看</div>
          <div class="tile">#感谢薯片 #工作历程全记录</div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="count">20.5w次观看</div>
          <div class="tile">论团队和团伙的区别</div>
        </div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
export default {
  name: 'KnownSmallVideoLike',
}
</script>

<style lang="less" scoped>
.m-share.like {
  .like {
    height: 128px;
    text-align: center;
    font: 32px/128px @fontf-pfsc-med;
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
      height: 40vh;
      background: #ccc;
      .content {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        font-family: @fontf-pfsc-med;
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
