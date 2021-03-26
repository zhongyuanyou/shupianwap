<template>
  <div class="attention_container">
    <sp-top-nav-bar
      title="我的粉丝"
      :fixed="true"
      left-arrow
      @on-click-left="$router.back()"
    />

    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="list_container"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index" class="item">
        <sp-image round class="user_avatar" fit="cover" src="" />
        <div class="user_info">
          <div class="title">用户名</div>
          <div class="introduce">简介或签名文字简介或签名文字…</div>
        </div>
      </div>
    </sp-list>
  </div>
</template>

<script>
import { TopNavBar, Image, List } from '@chipspc/vant-dgg'
import { userinfoApi } from '~/api'
export default {
  name: 'Collection',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Image.name]: Image,
    [List.name]: List,
  },
  data() {
    return {
      active: 0,
      content: '',
      list: [],
      loading: false,
      finished: false,
    }
  },
  mounted() {},
  methods: {
    tabChange(val) {
      console.log(val)
      this.list = []
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>

<style lang="less" scoped>
.attention_container {
  height: 100%;
  background-color: #f8f8f8;
  padding-top: 88px;

  /deep/ .sp-top-nav-bar {
    height: 88px;
  }

  .list_container {
    .item {
      background: #ffffff;
      padding: 28px 32px 28px;
      display: flex;
      align-items: center;

      .user_avatar {
        width: 72px;
        height: 72px;
        margin-right: 24px;
      }
      .user_info {
        flex: 1;
        .title {
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 30px;
          margin-right: 30px;
        }
        .introduce {
          margin-top: 12px;
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 26px;
          width: 414px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .clamp2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .clamp3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>
