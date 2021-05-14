<template>
  <div class="m-known create-center">
    <Header title="创作中心" :fixed="true" />
    <sp-tabs v-model="active" @change="changeTab">
      <sp-tab v-for="(item, index) in tabList" :key="index" :title="item.tab">
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          class="list"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
        </sp-list>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Button, List, Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import knownApi from '@/api/known'

export default {
  name: 'CreateCenter',
  components: {
    Header,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [List.name]: List,
    [Image.name]: Image,
  },
  data() {
    return {
      error: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 15,
      list: [],
      active: 0,
      activeMapping: ['', '1', '0', '2'], // status: 1 | 审核通过; 2 | 拒绝; 0 | 待审核, 如果不传status,则默认返回所有数据
      tabList: [
        {
          tab: '全部',
        },
        {
          tab: '已发布',
        },
        {
          tab: '审核中',
        },
        {
          tab: '未通过',
        },
      ],
    }
  },
  methods: {
    changeTab() {
      this.init()
      this.onLoad()
    },
    init() {
      this.page = 1
      this.error = false
      this.finished = false
      this.loading = true
      this.list = []
    },
    onLoad() {
      this.findListByStatusApi()
    },
    async findListByStatusApi() {
      try {
        const params = {
          page: this.page,
          limit: this.limit,
          status: this.activeMapping[this.active],
        }
        const { code, data } = await this.$axios.post(
          knownApi.questionArticle.findListByStatus,
          params
        )
        this.loading = false
        if (code !== 200) {
          throw new Error('请求接口失败!')
        }
        this.list.push(...data.records)
        this.page++
        if (this.page > data.totalPage) {
          this.finished = true
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.m-known.create-center {
  ::v-deep.sp-tabs {
    .sp-tabs__wrap {
      height: 72px;
      padding-bottom: 8px;
      border-bottom: 1px solid #f4f4f4;
      .sp-tab {
        font: 400 30px/30px PingFangSC-Regular, PingFang SC;
        color: #999999;
      }
      .sp-tab--active {
        color: #222222;
        font-weight: bold;
      }
      .sp-tab__text--ellipsis {
        overflow: unset;
      }
      .sp-tabs__line {
        width: 28px;
        height: 6px;
        background: #4974f5;
        border-radius: 3px;
      }
    }
  }
}
</style>
