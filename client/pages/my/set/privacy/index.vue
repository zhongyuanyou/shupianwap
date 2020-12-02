<template>
  <div class="user-privacy">
    <!-- s 头部分 -->
    <Header title="用户隐私与规则中心" />
    <!-- e 头部分 -->
    <!-- s 内容 -->
    <div class="content-main">
      <div v-for="(item, index) of ContentList" :key="index" class="content">
        <div class="content-title">{{ item }}</div>
        <my-icon
          name="notify_ic_next"
          size="0.1rem"
          color="#CCCCCC"
          class="content-icon"
        ></my-icon>
      </div>
    </div>
    <!-- e 内容 -->
  </div>
</template>

<script>
import { NavBar } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    [NavBar.name]: NavBar,
    Header,
  },
  data() {
    return {
      ContentList: ['薯片用户服务协议', '薯片隐私政策'],
    }
  },
}
</script>

<style lang="less" scoped>
.user-privacy {
  width: 100%;
}
.content-main {
  width: 100%;
  padding-left: 40px;
}
.content {
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
  .content-title {
    width: 300px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 44px;
  }
  .content-icon {
    width: 24px;
    height: 24px;
    margin-right: 40px;
  }
}
</style>
