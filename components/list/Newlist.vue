<template>
  <div class="Newlist">
    <sp-pull-refresh
      v-model="isLoading"
      :success-text="`刷新成功`"
      @refresh="onRefresh"
    >
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in datalist" :key="index" class="list">
          <div class="left">
            <img :src="item.img" alt="" />
          </div>
          <div class="right">
            <h1>{{ item.name }}</h1>
            <p class="describe">
              {{ item.classCodeLevelName }}
            </p>
            <p class="price">{{ item.salesPrice }}元</p>
          </div>
        </div>
      </sp-list>
    </sp-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List } from '@chipspc/vant-dgg'
import { goods } from '@/api/index'

export default {
  name: 'Newlist',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
  },
  props: {
    searchtext: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      pages: 1,
      datalist: [],
      formData: {
        start: 1,
        limit: 10,
        needTypes: 0,
        needGoodsList: 1,
        searchKey: '',
      },
    }
  },
  mounted() {
    // this.getlist()
  },
  methods: {
    getlist() {
      console.log(this.searchtext)
      this.formData.searchKey = this.searchtext
      goods
        .transactionList({ axios: this.$axios }, this.formData)
        .then((data) => {
          console.log(data)
          if (this.datalist.length > 0) {
            this.datalist = this.datalist.concat(data.goods.records)
          } else {
            this.datalist = data.goods.records
          }
        })
        .catch()
    },
    onRefresh() {
      this.finished = false
      this.formData.start = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    onLoad() {
      if (this.isLoading) {
        this.datalist = []
      }
      goods
        .transactionList({ axios: this.$axios }, this.formData)
        .then((data) => {
          if (this.datalist.length > 0) {
            this.datalist = this.datalist.concat(data.goods.records)
            this.formData.start = this.formData.start + 1
            if (data.goods.records.length < 10) {
              this.finished = true
            }
            this.loading = false
            this.isLoading = false
          } else {
            this.datalist = data.goods.records
            this.formData.start = this.formData.start + 1
            if (data.goods.records.length < 10) {
              this.finished = true
            }
            this.loading = false
            this.isLoading = false
          }
        })
        .catch()
    },
  },
}
</script>

<style lang="less" scoped>
.Newlist {
  .list {
    margin: 20px 20px 0 20px;
    padding: 20px;
    height: 253px;
    background: #fff;
    border-radius: 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    > .left {
      width: 160px;
      height: 160px;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    > .right {
      margin-left: 20px;
      width: calc(100% - 180px);
      > h1 {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > .tag {
        margin-top: 10px;
        height: 35px;
        display: flex;
        align-items: center;
        > p {
          height: 32px;
          background: #f0f2f5;
          border-radius: 4px;
          padding: 0 9px;
          line-height: 32px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
          margin-left: 12px;
        }
        > p:nth-child(1) {
          margin-left: 0px;
        }
        > .act {
          background: #f1524e;
          color: #fff;
        }
      }
      > .describe {
        margin-top: 8px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
      }
      > .price {
        margin-top: 8px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ec5330;
      }
    }
  }
}
</style>
