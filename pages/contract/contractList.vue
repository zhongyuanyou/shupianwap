<template>
  <div class="contractList">
    <Head ref="head" title="合同列表"></Head>
    <div class="tab">
      <p :class="tabAct == 0 ? 'act' : ''" @click="tabFn(0)">
        全部<i class="icon"></i>
      </p>
      <p :class="tabAct == 1 ? 'act' : ''" @click="tabFn(1)">
        待签署<i class="icon"></i>
      </p>
      <p :class="tabAct == 2 ? 'act' : ''" @click="tabFn(2)">
        已签署<i class="icon"></i>
      </p>
    </div>
    <List :list="list"></List>
  </div>
</template>

<script>
import Head from '@/components/common/head/header'
import List from '@/components/contract/list'
export default {
  name: 'Contractlist',
  components: {
    Head,
    List,
  },
  data() {
    return {
      tabAct: 0,
      list: [
        {
          name: '这个是合同的名称',
          state: '1',
          date: '2020.12.12 09:30:56',
          price: '500',
          ordersn: 'C2020101300320001',
          contract: 'HT-202010102365',
        },
        {
          name: '这个是合同的名称111',
          state: '1',
          date: '2020.12.12 09:30:56',
          price: '500',
          ordersn: 'C2020101300320001',
          contract: 'HT-202010102365',
        },
      ],
    }
  },
  methods: {
    tabFn(index) {
      if (this.tabAct !== index) {
        this.tabAct = index
      }
    },
  },
}
</script>

<style lang="less" scoped>
.contractList {
  background: #f8f8f8;
  min-height: 100vh;
  > .tab {
    height: 88px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    > p {
      height: 88px;
      line-height: 88px;
      font-size: 28px;
      font-weight: 400;
      color: #222222;
      text-align: center;
      width: 33.3%;
      position: relative;
      > .icon {
        width: 32px;
        height: 4px;
        background: #4974f5;
        border-radius: 2px;
        display: none;
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    > .act {
      color: #4974f5;
      > .icon {
        display: block;
      }
    }
  }
}
</style>
