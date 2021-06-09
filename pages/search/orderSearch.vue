<template>
  <div class="search-page">
    <sp-sticky>
      <Search
        ref="searchRef"
        v-model="keyValue"
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
    <!-- S 搜索历史 -->
    <div v-show="historyData.length" class="search-moudle search-history">
      <div>
        <strong>搜索历史</strong>
        <my-icon
          name="search_ic_deleted"
          size="0.32rem"
          color="#CCCCCC"
          @click.native="removeHistory"
        ></my-icon>
      </div>
      <ul>
        <li v-for="(item, index) in historyData" :key="index">
          <a href="javascript:void(0)" @click="cacheSearch(item)">{{
            item.name
          }}</a>
        </li>
      </ul>
    </div>
  </div>
  <!-- E 搜索历史 -->
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import addSearchHistory from '~/mixins/addSearchHistory'
export default {
  components: {
    [Sticky.name]: Sticky,
    Search,
  },
  mixins: [addSearchHistory],
  data() {
    return {
      historyData: [],
      keyValue: '',
    }
  },
  created() {
    if (process.client) {
      // this.getInitData()
      this.historyData = this.$cookies.get('searchHistory')
        ? this.$cookies.get('searchHistory')
        : []
    }
  },
  methods: {
    keyClickHandle() {
      console.log(this.keyValue)
      const data = {
        name: this.keyValue,
        isJumpLink: 0,
      }
      this.addSearchHistoryMixin(data)
    },
    clooseHandle() {
      this.$router.back()
    },
    // 清除搜索历史
    removeHistory() {
      this.$cookies.remove('searchHistory')
      this.historyData = []
    },
  },
}
</script>

<style lang="less" scoped>
.cloose-btn {
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #1a1a1a;
  margin-left: 40px;
}
.search-moudle {
  display: flex;
  flex-direction: column;
  padding: 56px 24px 24px 40px;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-right: 16px;
    > strong {
      font-size: 38px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
  > ul {
    display: flex;
    flex-wrap: wrap;
    > li {
      height: 70px;
      line-height: 70px;
      padding: 0 25px;
      margin: 16px 16px 0 0;
      background: #f9f9f9;
      text-align: center;
      .textOverflow(1);
      > a {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
      }
    }
  }
}
.search-history > ul {
  max-height: 172px;
  overflow: hidden;
}
.search-need {
  padding-top: 32px;
  padding-bottom: 0;
  .search-top {
    max-height: 86px;
    overflow: hidden;
  }
  .search-btm {
    max-height: 172px;
    overflow: hidden;
  }
}
.search-hot {
  padding-top: 56px;
  padding-right: 40px;
  > ul {
    display: flex;
    flex-direction: column;
    > li {
      width: 100%;
      height: 108px;
      background: #ffffff;
      border-bottom: 1px solid #f4f4f4;
      padding: 0;
      margin: 0;
      a {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        > span {
          width: 36px;
          height: 36px;
          background: #f8f8f8;
          border-radius: 4px;
          font-size: 22px;
          font-family: Bebas;
          font-weight: bold;
          font-weight: 400;
          color: #555555;
          margin-right: 24px;
          text-align: center;
          line-height: 36px;
        }
        > p {
          flex: 1;
          text-align: left;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
          .textOverflow(1);
        }
        > i {
          font-style: inherit;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          margin-left: 24px;
        }
      }
      &:nth-child(1) a > span {
        color: #ffffff;
        background: #fa5741;
      }
      &:nth-child(2) a > span {
        color: #ffffff;
        background: #fa8f41;
      }
      &:nth-child(3) a > span {
        color: #ffffff;
        background: #fac841;
      }
    }
  }
}
</style>
