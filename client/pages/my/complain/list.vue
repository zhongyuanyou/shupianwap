<template>
  <div class="complaintList">
    <sp-sticky>
      <sp-top-nav-bar title="反馈进度" ellipsis @on-click-left="back">
        <template #left>
          <div>
            <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
          </div>
        </template>
      </sp-top-nav-bar>
    </sp-sticky>
    <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <sp-cell
          v-for="(item, index) in complaintList"
          :key="index"
          title-class="complaintList-item-title"
          value-class="complaintList-item-value"
          label-class="complaintList-item-label"
          :title="item.title"
          :label="item.createdTime"
          is-link
          center
          border
          :value="item.status"
          :to="{ path: './' + item.id }"
        />
      </sp-list>
    </sp-pull-refresh>
  </div>
</template>

<script>
import {
  Button,
  Toast,
  List,
  TopNavBar,
  PullRefresh,
  Cell,
  Sticky,
} from '@chipspc/vant-dgg'
export default {
  name: 'ComplaintList',
  components: {
    [Button.name]: Button,
    [TopNavBar.name]: TopNavBar,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Sticky.name]: Sticky,
  },
  data() {
    return {
      complaintList: [
        {
          id: 1,
          title: '我的问答在哪里查看？',
          status: '处理中',
          createdTime: '2020-10-14 10:00',
        },
        {
          id: 2,
          title: '设置免打扰怎么还给我打电话？你...',
          status: '已处理',
          createdTime: '2020-10-14 10:00',
        },
      ],
      loading: false,
      finished: true, // 默认false
      refreshing: false,
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    onLoad() {
      // setTimeout(() => {
      //   if (this.refreshing) {
      //     this.complaintList = []
      //     this.refreshing = false
      //   }
      //   for (let i = 0; i < 10; i++) {
      //     const obj = {
      //       title: '我的问答在哪里查看？',
      //       status: '处理中',
      //       createdTime: '2020-10-14 10:00',
      //     }
      //     this.complaintList.push(obj)
      //   }
      //   this.loading = false
      //   if (this.complaintList.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },
    onRefresh() {
      // 清空列表数据
      // this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      // this.onLoad()
    },
  },
}
</script>

<style lang="less" scoped>
.complaintList {
  /deep/.sp-cell {
    padding: 32px 40px;
    line-height: auto;
    &::after {
      border-bottom: 1px solid #f4f4f4;
      left: 40px;
      right: 40px;
    }
  }
  &-item {
    &-title {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &-value {
      width: 130px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      flex: none;
    }
    &-label {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin-top: 1px;
    }
  }
  /deep/.sp-cell__right-icon {
    color: #cccccc;
    margin-left: 12px;
    // &::before {
    //   font-size: 26px;
    // }
  }
}
</style>
