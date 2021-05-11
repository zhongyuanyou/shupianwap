<template>
  <div class="swipe_container">
    <ul class="swipes">
      <li class="swipe_item">
        <img src="" alt="" />
      </li>
    </ul>
    <div class="left_btn"></div>
    <div class="right_btn"></div>
    <ul class="anchors">
      <li class="anchor_item"></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
.swipe_container {
  width: 100%;
  height: 600px;
  position: relative;
  .swipes {
    display: flex;
    align-items: center;
    .swipe_item {
      width: 100%;
    }
  }
  .left_btn {
    height: 100px;
    width: 100px;
    background: black;
    opacity: 0.2;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: 50px;
  }
  .right_btn {
    height: 100px;
    width: 100px;
    background: black;
    opacity: 0.2;
    top: 50%;
    right: 0;
    margin-top: 50px;
  }
  .anchors {
    display: flex;
    align-items: center;
    height: 300px;
    width: 300px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -150px;
    display: flex;
    align-items: center;
    .anchors_item {
      background: #fff;
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
  }
}
</style>
