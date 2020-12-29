<template>
  <div class="search">
    <!--S 搜索框-->
    <FoundHeader @inputChange="inputChange" @handelKeydown="handelKeydown" />
    <!--E 搜索框-->
    <!--S 内容-->
    <div class="search_con">
      <!--S 有搜索历史-->
      <div v-show="historySearch.length && !keywords" class="has_history">
        <div class="has_history_title">
          <p>搜索历史</p>
          <p @click="clearHistory">
            <my-icon name="search_ic_deleted" size="0.32rem" color="#1a1a1a" />
          </p>
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
      historySearch: [], // 搜索历史
      keywords: '', // 搜索检索关键字
    }
  },
  mounted() {
    try {
      this.historySearch = this.$cookies.get('foundHistory')
        ? this.$cookies.get('foundHistory')
        : []
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    handleClick(keywords) {
      // 带参跳转到搜索结果页
      const history = this.historySearch
      const isHas = history.some((item) => {
        return item === keywords
      })
      if (!isHas && keywords) {
        history.push(keywords)
      }
      this.$cookies.set('foundHistory', history)
      this.$router.push(`/found/${keywords || ' '}`)
    },
    inputChange(data) {
      // input改变事件
      this.keywords = data
    },
    clearHistory() {
      // 清除数据
      this.$cookies.remove('foundHistory')
      this.historySearch = []
    },
    handelKeydown(data) {
      this.handleClick(data)
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
      width: 100%;
      margin-top: 49px;
      &_title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        p {
          line-height: 44px;
          font-size: 36px;
          &:first-child {
            font-size: 36px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #1a1a1a;
          }
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
      > p {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        span {
          color: #4974f5;
        }
      }
      > div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;
      }
    }
  }
}
</style>
