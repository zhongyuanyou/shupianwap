<template>
  <div class="m-evaluate list">
    <Header title="评价中心" :fixed="true" />
    <sp-tabs v-model="active" @change="changeTab">
      <sp-tab title="待评价">
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          class="list"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <evaluate-list
            v-for="(item, index) in orderList"
            :key="index"
            :item="item"
          />
        </sp-list>
      </sp-tab>
      <sp-tab title="已评价">
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          class="list"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <evaluate-list
            v-for="(item, index) in orderList"
            :key="index"
            :item="item"
        /></sp-list>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import EvaluateList from '@/components/my/evaluate/EvaluateList'

// mock data
// commentFlag: 1 已评价; commentFlag: 0 未评价
const mockOrderListFlag1 = [
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name:
      '四川省武侯区有限公司代办注册服务四川省武侯区有限公司代办注册服务四川省武侯区有限公司代办注册服务',
    desc:
      '武侯区;无注册地址;任教申请税务武侯区;无注册地址;任教申请税务武侯区;无注册地址;任教申请税务',
    commentFlag: 1,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司测试数据',
    desc: '青羊区;无注册地址;任教申请税务',
    commentFlag: 1,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司代办注册服务',
    desc: '武侯区;无注册地址;任教申请税务',
    commentFlag: 1,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司测试数据',
    desc: '青羊区;无注册地址;任教申请税务',
    commentFlag: 1,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司代办注册服务',
    desc: '武侯区;无注册地址;任教申请税务',
    commentFlag: 1,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司测试数据',
    desc: '青羊区;无注册地址;任教申请税务',
    commentFlag: 1,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司代办注册服务',
    desc: '武侯区;无注册地址;任教申请税务',
    commentFlag: 1,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司测试数据',
    desc: '青羊区;无注册地址;任教申请税务',
    commentFlag: 1,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司代办注册服务',
    desc: '武侯区;无注册地址;任教申请税务',
    commentFlag: 1,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司测试数据',
    desc: '青羊区;无注册地址;任教申请税务',
    commentFlag: 1,
  },
]

const mockOrderListFlag0 = [
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司代办注册服务',
    desc: '武侯区;无注册地址;任教申请税务',
    commentFlag: 0,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司测试数据',
    desc: '青羊区;无注册地址;任教申请税务',
    commentFlag: 0,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司代办注册服务',
    desc: '武侯区;无注册地址;任教申请税务',
    commentFlag: 0,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司测试数据',
    desc: '青羊区;无注册地址;任教申请税务',
    commentFlag: 0,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司代办注册服务',
    desc: '武侯区;无注册地址;任教申请税务',
    commentFlag: 0,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司测试数据',
    desc: '青羊区;无注册地址;任教申请税务',
    commentFlag: 0,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司代办注册服务',
    desc: '武侯区;无注册地址;任教申请税务',
    commentFlag: 0,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司测试数据',
    desc: '青羊区;无注册地址;任教申请税务',
    commentFlag: 0,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司代办注册服务',
    desc: '武侯区;无注册地址;任教申请税务',
    commentFlag: 0,
  },
  {
    avatar: 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png',
    name: '四川省武侯区有限公司测试数据',
    desc: '青羊区;无注册地址;任教申请税务',
    commentFlag: 0,
  },
]

export default {
  name: 'Evaluate',
  components: {
    Header,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    EvaluateList,
  },
  data() {
    return {
      active: 0, // 索引值: 0|待评价 1|已评价
      error: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 15,
      orderList: [], // 订单列表
    }
  },
  methods: {
    changeTab() {
      this.init()
      this.onLoad()
    },
    init() {
      this.orderList = []
      this.page = 1
      this.error = false
      this.finished = false
      this.loading = true
    },
    onLoad() {
      this.getOrderListApi()
    },
    getOrderListApi() {
      this.orderList = mockOrderListFlag1
      this.loading = false
      if (this.active === 1) {
        this.orderList = mockOrderListFlag0
      }
    },
  },
}
</script>

<style lang="less" scoped>
.m-evaluate.list {
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
