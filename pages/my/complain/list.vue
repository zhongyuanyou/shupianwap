<template>
  <div class="complaintList">
    <Header title="反馈进度">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
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
          :title="item.content"
          :label="item.createTime | dateTime"
          is-link
          center
          border
          :value="item.isDispose ? '已处理' : '未处理'"
          :to="{ path: '/my/complain/' + item.id }"
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
import { mapState } from 'vuex'
import { complain } from '~/api'
import Header from '@/components/common/head/header'
export default {
  name: 'ComplaintList',
  components: {
    [Button.name]: Button,
    [TopNavBar.name]: TopNavBar,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Sticky.name]: Sticky,
    Header,
  },
  filters: {
    dateTime(time) {
      return time.replace(/-/g, '.')
    },
  },
  data() {
    return {
      complaintList: [],
      loading: false,
      finished: true, // 默认false
      refreshing: false,
      page: 1, // 当前页
      limit: 10, // 每页显示条数
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId,
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    this.getComplainList()
    if (this.isInApp) {
      // 设置app导航名称
      this.$appFn.dggSetTitle(
        {
          title: '反馈进度',
        },
        (res) => {}
      )
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    async onLoad() {
      const page = this.page++
      const params = {
        userId: this.userId,
        limit: this.limit,
        page,
      }
      const data = await complain.list({ axios: this.$axios }, params)
      if (data.rows.length) {
        this.loading = false
        this.complaintList = this.complaintList.concat(data.rows)
      } else {
        this.finished = true
      }
    },
    onRefresh() {
      // 清空列表数据
      // this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      // this.onLoad()
      this.refreshing = true
      this.page = 1
      this.getComplainList()
    },
    async getComplainList() {
      // 获取吐槽列表数据
      const params = {
        // userId: this.userId,
        userId: this.userId,
        page: this.page,
        limit: this.limit,
      }
      try {
        const data = await complain.list({ axios: this.$axios }, params)
        this.refreshing = false
        this.complaintList = data.rows
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.complaintList {
  height: 100%;
  background-color: #fff;
  .back_icon {
    margin-left: 40px;
  }
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
    //   fonts-size: 26px;
    // }
  }
}
</style>
