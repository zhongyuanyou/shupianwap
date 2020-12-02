<template>
  <div class="open">
    <div class="open_lf">
      <sp-image
        fit="cover"
        width="0.57rem"
        height="0.57rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <span>薯片招人APP</span>
    </div>
    <sp-button type="primary" size="small">立即打开</sp-button>
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'
export default {
  name: 'Open',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
}
</script>

<style lang="less" scoped>
.open {
  width: 100%;
  padding: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  &_lf {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    span {
      margin-left: 24px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
</style>
