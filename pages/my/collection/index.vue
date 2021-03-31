<template>
  <div class="collection_container">
    <sp-tabs
      v-model="active"
      title-active-color="#4974F5"
      title-inactive-color="#222222"
      @change="tabChange"
    >
      <sp-tab
        v-for="(item, index) in ['问题', '回答', '文章']"
        :key="index"
        :title="item"
      ></sp-tab>
    </sp-tabs>

    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="list_container"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index" class="item">
        <div class="title clamp2">中小企业如何快速报税？</div>
        <div v-if="active" class="user">
          <sp-image round class="user_avatar" fit="cover" src="" /> 紫风
        </div>
        <div v-if="index % 2" class="content clamp2">
          2017年孙正义问WeWork创始人诺伊曼，“你觉得在一场战斗中，聪明人和疯子，究竟谁会赢？”诺伊…
        </div>
        <div v-else class="content_img">
          <div class="left_content clamp3">
            2017年孙正义问WeWork创始人诺伊曼，“你觉得在一场战斗中，聪明人和疯子，究竟谁会赢？”诺伊…
          </div>
          <sp-image class="right_img" fit="cover" src="" />
        </div>
        <div class="bottom">
          {{ active ? '4639 赞 · 1304 评论' : ' 3 回答 · 4 收藏' }}
        </div>
      </div>
    </sp-list>
  </div>
</template>

<script>
import { Tabs, Tab, Image, List } from '@chipspc/vant-dgg'
import { userinfoApi } from '~/api'
export default {
  name: 'Collection',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
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
.collection_container {
  height: 100%;
  background-color: #f8f8f8;

  .sp-tabs {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 88px;
  }

  /deep/ .sp-tabs__line {
    width: 32px;
    height: 4px;
    border-radius: 2px;
    bottom: 32px;
  }

  .list_container {
    padding-top: 108px;
    .item {
      background: #ffffff;
      padding: 24px 32px 28px;
      margin-bottom: 20px;
      .title {
        font-family: PingFangSC-Medium, PingFang SC;
        font-size: 36px;
        font-weight: 500;
        color: #1a1a1a;
        line-height: 48px;
        margin-bottom: 16px;
      }
      .user {
        display: flex;
        align-items: center;
        color: #555555;
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        margin-bottom: 12px;
        .user_avatar {
          width: 40px;
          height: 40px;
          margin-right: 12px;
        }
      }
      .content {
        font-family: PingFangSC-Regular, PingFang SC;
        font-size: 30px;
        font-weight: 400;
        color: #555555;
        line-height: 42px;
      }
      .content_img {
        display: flex;
        .left_content {
          font-family: PingFangSC-Regular, PingFang SC;
          font-size: 30px;
          font-weight: 400;
          color: #555555;
          line-height: 42px;
          flex: 1;
          margin-right: 48px;
        }
        .right_img {
          width: 190px;
          height: 127px;
          background: #cccccc;
          border-radius: 12px;
        }
      }
      .bottom {
        font-family: PingFangSC-Regular, PingFang SC;
        margin-top: 24px;
        font-size: 28px;
        font-weight: 400;
        color: #999999;
        line-height: 28px;
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
