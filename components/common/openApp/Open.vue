<template>
  <div class="open">
    <div class="open_lf">
      <sp-image
        fit="cover"
        width="0.67rem"
        height="0.67rem"
        src="https://cdn.shupian.cn/sp-pt/wap/images/g6trabnxtg80000.png?x-oss-process=image/resize,m_fill,w_67,h_67,limit_0"
      />
      <span>薯片找人APP</span>
    </div>
    <sp-button class="openBtn" type="primary" size="small" @click="openApp"
      >立即打开</sp-button
    >
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'
import openapp from '~/mixins/openapp'
export default {
  name: 'Open',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
  mixins: [openapp],
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
  .openBtn {
    width: 170px;
    font-size: 28px;
  }
}
</style>
