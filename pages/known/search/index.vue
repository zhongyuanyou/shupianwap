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
          <span :style="{ color: colorfn(index + 1) }">{{ index + 1 }}</span>
          <b> {{ item }}</b>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'

export default {
  name: 'SearchPage',
  components: {
    [Sticky.name]: Sticky,
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
    colorfn(index) {
      if (index === 2) {
        return '#FC6A48'
      } else if (index === 3) {
        return '#FF866A'
      } else if (index === 4) {
        return '#FF8266'
      } else if (index === 5) {
        return '#FF9780'
      } else if (index === 6) {
        return '#FFB5A4'
      } else if (index === 7) {
        return '#FFC4C4'
      } else if (index === 8) {
        return '#FFD4D4'
      } else if (index === 9) {
        return '#E0D3D3'
      } else if (index === 10) {
        return '#CCCCCC'
      }
    },
    historyfn(text) {
      this.value = text
      let b
      for (let i = 0; i < this.historyData.length; i++) {
        console.log(text, this.historyData[i])
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
      console.log(222)
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
        width: 46%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 30px;
        color: #222222;
        margin-bottom: 48px;
        > b {
          font-weight: normal;
        }
        > span {
          margin-right: 25px;
          color: rgba(236, 83, 48, 1);
        }
      }
    }
  }
}
</style>
