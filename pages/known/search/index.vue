<template>
  <div class="search">
    <sp-sticky>
      <Search
        ref="searchRef"
        v-model.trim="value"
        :icon-left="0.24"
        placeholder="请输入搜索关键词"
        @searchKeydownHandle="keyClickHandle"
      >
        <template v-slot:center>
          <sp-icon
            @click="clearInput"
            name="clear"
            class="clear"
            color="#CCCCCC"
            size="0.35rem"
            v-show="value != ''"
          />
        </template>
        <template v-slot:right>
          <a class="cloose-btn" href="javascript:void(0);" @click="clooseHandle"
            >取消</a
          >
        </template>
      </Search>
    </sp-sticky>
    <div class="history">
      <div class="tile">
        <h1>历史记录</h1>
        <span @click="clearHistory">清空</span>
      </div>
      <ul class="box">
        <li
          v-for="(item, index) in knownHistory"
          :key="index"
          @click="historyfn(item)"
        >
          <sp-icon name="clock-o" class="clock" size="0.4rem" color="#555555" />
          <b> {{ item }}</b>
          <sp-icon
            name="cross"
            class="close"
            size="0.34rem"
            color="#555555"
            @click.stop="del(index)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Sticky, Icon } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'

export default {
  name: 'SearchPage',
  components: {
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
    Search,
  },
  mounted() {
    // 历史记录从localStorage中取
    const localHistory = localStorage.getItem('knownHistory') || '[]'
    const tempHistory = JSON.parse(localHistory)
    this.knownHistory = tempHistory
    // 聚焦search按钮
    const _this = this
    this.$nextTick(() => {
      _this.$refs.searchRef.$refs.inputRef.focus()
    })
    // 判断是否从结果查询页面返回对应查询
    if (this.$route.query.type) {
      this.tabIndex = this.$route.query.type
    }
    this.tabIndex = this.$route.query.type || '1'
    this.value = this.$route.query.keyword || ''
  },
  data() {
    return {
      value: '',
      knownHistory: [], // 搜索历史记录
      tabIndex: '1', // 搜索结果页面tab,默认为问题:1
    }
  },
  methods: {
    del(index) {
      const tempHistory = this.knownHistory.splice(index, 1)
      localStorage.setItem('knownHistory', JSON.stringify(tempHistory))
    },
    historyfn(keyword) {
      // 拿到key位置
      let b
      for (let i = 0, l = this.knownHistory.length; i < l; i++) {
        if (keyword === this.knownHistory[i]) {
          b = i
        }
      }
      this.addHistoryItem(keyword, b)
      this.$router.push({
        path: '/known/search/result',
        query: { keyword, type: this.tabIndex },
      })
    },
    keyClickHandle() {
      const keyword = this.value
      if (keyword) {
        this.addHistoryItem(keyword)
        this.$router.push({
          path: '/known/search/result',
          query: { keyword, type: this.tabIndex },
        })
      }
    },
    clooseHandle() {
      this.$router.push('/known')
    },
    clearHistory() {
      this.knownHistory = []
      localStorage.removeItem('knownHistory')
    },
    addHistoryItem(key, i) {
      const tempKnownHistory = this.knownHistory
      const len = tempKnownHistory.length
      if (typeof i === 'number') {
        // 存在i证明存在key, 则需将选择值前移至首位
        tempKnownHistory.splice(i, 1)
      } else if (len > 8) {
        // 列表数量最大为10
        tempKnownHistory.splice(9, 1)
      }
      tempKnownHistory.unshift(key)
      localStorage.setItem('knownHistory', JSON.stringify(tempKnownHistory))
    },
    clearInput() {
      this.value = ''
      this.$refs.searchRef.$refs.inputRef.focus()
    },
  },
}
</script>

<style lang="less" scoped>
.search {
  min-height: 100vh;
  /deep/.sp-sticky {
    .search-content {
      padding: 10px 24px;
    }
    .input-box {
      position: relative;
      background: #f5f5f5;
      border: none;
      box-shadow: none;
      height: 64px;
      input {
        background: #f5f5f5;
      }
      .clear {
        position: absolute;
        right: 24px;
      }
    }
    .cloose-btn {
      margin-left: 32px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #222222;
    }
  }
  > .history {
    margin-top: 24px;
    .tile {
      padding: 0 32px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      > h1 {
        font-size: 30px;
        font-weight: 600;
        color: #222222;
      }
      > span {
        display: inline-block;
        font-size: 26px;
        color: #999999;
      }
    }
    > .box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-left: 32px;
      > li {
        display: flex;
        font-size: 30px;
        color: #222222;
        align-items: center;
        height: 88px;
        border-bottom: 1px solid #ddd;
        width: 100%;
        > .clock {
          display: block;
          margin-right: 24px;
        }
        > b {
          font-weight: normal;
          width: 550px;
          color: #555;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        > .close {
          display: block;
          margin-left: auto;
          margin-right: 32px;
        }
      }
    }
  }
}
</style>
