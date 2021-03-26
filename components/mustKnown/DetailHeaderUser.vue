<template>
  <div class="head head2">
    <my-icon
      class="btn-icon"
      name="nav_ic_back"
      size="0.4rem"
      color="#1A1A1A"
      @click.native="onLeftClick"
    ></my-icon>
    <div class="user-info">
      <sp-image class="img" src="" />
      <div class="infos">
        <p>周转</p>
        我是一个牛人
      </div>
      <div class="btn">
        <sp-button>关注</sp-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 88px;
  background: #ffffff;
  line-height: 88px;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4974f5;
  padding: 0 40px;
  .btn-icon {
    float: left;
  }
}
.head2 {
  height: 104px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  .user-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    padding-left: 20px;
    .img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #d8d8d8;
      overflow: hidden;
    }
    .infos {
      flex: 1;
      height: 26px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
      padding-left: 20px;
      p {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-bottom: 20px;
      }
    }
    .btn {
      background: none;
      border-radius: 12px;
      .sp-button {
        width: 100%;
        height: 100%;
        background: none;
        color: rgba(73, 116, 245, 1);
        display: block;
        float: left;
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #4974f5;
        border: none;
      }
    }
  }
  .btn-icon {
    line-height: 104px;
    float: left;
  }
}
</style>
