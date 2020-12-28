<template>
  <div class="search">
    <!--S 搜索框-->
    <FoundHeader @inputChange="inputChange" />
    <!--E 搜索框-->
    <!--S 内容-->
    <div class="search_con">
      <!--S 有搜索历史-->
      <div v-show="historySearch.length && !keywords" class="has_history">
        <div class="has_history_title">
          <p>搜索历史</p>
          <my-icon name="search_ic_deleted" size="0.22rem" color="#1a1a1a" />
        </div>
        <div class="has_history_con">
          <div
            v-for="(item, index) in historySearch"
            :key="index"
            class="has_history_con_item"
            @click="handleClick(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <!--E 有搜索历史-->
      <!--S 无搜索历史-->
      <div v-show="!historySearch.length && !keywords" class="no_history">
        <p>没有任何搜索历史</p>
      </div>
      <!--E 无搜索历史-->
      <!--S 搜索检索-->
      <div v-show="keywords" class="keyword" @click="handleClick(keywords)">
        <p>
          搜索"<span>{{ keywords }}</span
          >"
        </p>
        <div>
          <my-icon name="shop_ic_next" color="#ccc" size="0.25rem" />
        </div>
      </div>
      <!--E 搜索检索-->
    </div>
    <!--E 内容-->
  </div>
</template>

<script>
import FoundHeader from '~/components/found/common/FoundHeader'
export default {
  name: 'FoundSearch',
  components: { FoundHeader },
  data() {
    return {
      historySearch: [
        '科技公司',
        '账目干净',
        '成立三年',
        '小规模记账',
        '纳税人代理记账',
      ], // 搜索历史
      keywords: '', // 搜索检索关键字
    }
  },
  methods: {
    handleClick(keywords) {
      // 带参跳转到搜索结果页
      this.$router.push(`/found/${keywords}`)
    },
    inputChange(data) {
      // input改变事件
      this.keywords = data
    },
  },
}
</script>

<style lang="less" scoped>
.search {
  padding: 0 40px;
  &_con {
    margin-top: 128px;
    display: flex;
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    .no_history {
      margin-top: 279px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
    }
    .has_history {
      margin-top: 49px;
      &_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        p {
          font-size: 36px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #1a1a1a;
          line-height: 44px;
        }
      }
      &_con {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 17px;
        &_item {
          height: 64px;
          background: #f9f9f9;
          border-radius: 4px;
          padding: 0 25px;
          margin-right: 16px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
          text-align: center;
          line-height: 64px;
          margin-top: 16px;
        }
      }
    }
    .keyword {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      height: 102px;
      border-bottom: 1px solid #f4f4f4;
      p {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        span {
          color: #4974f5;
        }
      }
    }
  }
}
</style>
