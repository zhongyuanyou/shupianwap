<template>
  <div class="contractList">
    <Head ref="head" title="合同列表" :hide-shadow="true">
      <template #left>
        <my-icon
          class="back-icon"
          name="nav_ic_back"
          size="0.4rem"
          color="#1A1A1A"
          @click.native="onLeftClick"
        ></my-icon>
      </template>
    </Head>
    <div class="tab">
      <p :class="tabAct == 1 ? 'act' : ''" @click="changeTab(1)">
        待签署<i class="icon"></i>
      </p>
      <p :class="tabAct == 2 ? 'act' : ''" @click="changeTab(2)">
        已签署<i class="icon"></i>
      </p>
    </div>
    <div class="list">
      <div class="spaceholder"></div>
      <sp-list
        v-show="!contractEmptyFlag"
        v-model="loading"
        :finished="finished"
        class="list"
        finished-text="我是有底线的..."
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <template v-for="(info, i) in list">
          <Item :key="i" :info="info" />
        </template>
      </sp-list>
      <div v-show="contractEmptyFlag" class="none">
        <img src="https://img10.dgg.cn/pt03/wap/cmxakdtkqxs0000.png" alt="" />
        <p>暂无合同</p>
      </div>
    </div>
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import Head from '@/components/common/head/header'
import Item from '@/components/contract/Item'
import contractApi from '@/api/contract'
export default {
  name: 'Contractlist',
  components: {
    Head,
    Item,
    [List.name]: List,
  },
  data() {
    return {
      tabAct: 1,
      page: 1,
      limit: 10,
      status: ['STRUTS_QSZ'], // 签署中状态
      list: [],
      error: false,
      loading: false,
      finished: false,
      contractEmptyFlag: false,
    }
  },
  methods: {
    onLoad() {
      contractApi
        .contartlist(
          { axios: this.axios },
          {
            cusUserId: this.$store.state.user.userId,
            statusList: this.status,
            page: this.page,
            limit: this.limit,
          }
        )
        .then((res) => {
          if (res.totalPage === 0 && res.totalCount === 0) {
            this.contractEmptyFlag = true
          }
          this.list.push(...res.records)
          this.page++
          if (this.page > res.totalPage) {
            this.finished = true
          }
        })
        .catch((err) => {
          this.error = true
          this.$xToast.show('查询合同列表失败')
          console.log('错误信息err', err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    changeTab(index) {
      if (this.tabAct === index) {
        return
      }
      this.tabAct = index
      this.page = 1
      this.contractEmptyFlag = false
      this.list = []
      this.loading = true
      this.finished = false
      this.error = false
      this.contractEmptyFlag = false
      if (this.tabAct === 1) {
        // 状态签署中
        this.status = ['STRUTS_QSZ']
        // 状态已完成
      } else {
        this.status = ['STRUTS_YWC']
      }
      this.onLoad()
    },
    onLeftClick() {
      this.$router.push({
        path: '/my',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.contractList {
  background: #f8f8f8;
  min-height: 100vh;
  > .tab {
    width: 100%;
    position: fixed;
    top: 88px;
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
      width: 50%;
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
  > .list {
    margin-top: 88px;
    background: #f8f8f8;
    .spaceholder {
      width: 100%;
      height: 1px;
    }
  }
  .none {
    padding-top: 100px;
    margin: 0 auto;
    text-align: center;
    img {
      width: 340px;
      height: 340px;
    }
    p {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
</style>
