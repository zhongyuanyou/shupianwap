<template>
  <div class="search">
    <sp-sticky>
      <Search
        ref="searchRef"
        v-model="value"
        :icon-left="0.24"
        placeholder="请输入搜索内容"
        @searchKeydownHandle="keyClickHandle"
      >
        <template v-slot:right>
          <a class="cloose-btn" href="javascript:void(0);" @click="clooseHandle"
            >取消</a
          >
        </template>
      </Search>
    </sp-sticky>
    <div class="history">
      <h1>热门搜索</h1>
      <ul class="box">
        <li
          v-for="(item, index) in historyData"
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
            @click="del(index)"
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
  data() {
    return {
      historyData: [
        '测试0',
        '测试1',
        '测试2',
        '测试3',
        '测试4',
        '测试5',
        '测试6',
        '测试7',
      ],
      value: '',
    }
  },
  methods: {
    del(index) {
      console.log(index)
      this.historyData.splice(index, 1)
    },
    historyfn(text) {
      this.value = text
      let b
      for (let i = 0; i < this.historyData.length; i++) {
        if (text === this.historyData[i]) {
          b = i
        }
      }
      this.historyData.splice(b, 1)
      this.historyData.unshift(text)
    },
    keyClickHandle() {
      console.log(111)
    },
    clooseHandle() {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.search {
  min-height: 100vh;
  /deep/.sp-sticky {
    .input-box {
      background: #f5f5f5;
      border: none;
      box-shadow: none;
      height: 64px;
      input {
        background: #f5f5f5;
      }
    }
    .cloose-btn {
      margin-left: 32px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
    }
  }
  > .history {
    margin-top: 24px;
    padding: 0 32px;
    > h1 {
      font-size: 30px;
      margin-bottom: 40px;
      font-weight: 500;
      color: #222222;
      line-height: 30px;
      font-weight: bold;
    }
    > .box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      > li {
        margin: 0 32px;
        display: flex;
        font-size: 30px;
        color: #222222;
        align-items: center;
        height: 88px;
        border-bottom: 1px solid #ddd;
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
        }
      }
    }
  }
}
</style>
