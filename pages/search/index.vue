<template>
  <div class="search-page">
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
    <!-- E 搜索历史 -->
    <!-- S 猜您需要 -->
    <div
      v-if="searchHeight.length || searchTop.length"
      class="search-moudle search-need"
    >
      <div>
        <strong>猜您需要</strong>
        <my-icon
          v-if="searchTop.length"
          name="search_ic_re"
          size="0.32rem"
          color="#CCCCCC"
          @click.native="refreshKeywords"
        ></my-icon>
      </div>
      <ul v-if="searchHeight.length" class="search-top">
        <li v-for="(item, index) in searchHeight" :key="index">
          <my-icon
            name="search_ic_hot"
            size="0.24rem"
            bg-color="linear-gradient(0deg, #FB5B44 0%, #FE8878 100%)"
          ></my-icon>
          <a href="javascript:void(0)" @click="cacheSearch(item)">{{
            item.name
          }}</a>
        </li>
      </ul>
      <ul v-if="searchTop.length" class="search-btm">
        <li v-for="(item, index) in searchTop" :key="index">
          <a href="javascript:void(0)" @click="cacheSearch(item)">{{
            item.name
          }}</a>
        </li>
      </ul>
    </div>
    <!-- E 猜您需要 -->
    <!-- S 热搜词 -->
    <div v-if="searchHot.length" class="search-moudle search-hot">
      <div>
        <strong>热搜词</strong>
      </div>
      <ul>
        <li v-for="(item, index) in searchHot" :key="index">
          <a href="javascript:void(0)" @click="cacheSearch(item)">
            <span>{{ index + 1 }}</span>
            <p>{{ item.name }}</p>
            <i>{{ item.allSearchTimes }}</i>
          </a>
        </li>
      </ul>
    </div>
    <!-- E 热搜词 -->
    <Loading-center v-show="loading" />
  </div>
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import { CHIPS_PLATFORM_CODE, WAP_TERMINAL_CODE } from '@/config/constant'
import { searchApi } from '@/api'
import Search from '@/components/common/search/Search'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import addSearchHistory from '~/mixins/addSearchHistory'
export default {
  name: 'SearchPage',
  components: {
    [Sticky.name]: Sticky,
    Search,
    LoadingCenter,
  },
  mixins: [addSearchHistory],
  data() {
    return {
      loading: false,
      value: '',
      historyData: [],
      searchHeight: [], // 高亮关键词
      searchTop: [], // 置顶非高亮关键词
      searchHot: [], // 热搜
      params: {
        findType: 3, // 查询类型 （0：只查推荐（置顶）+ 高亮 1：查询推荐（非高亮） 2：查询热搜 3：查询3中类型的列表数据）
        topLimit: 10, // 查询置顶的每页数量
        topPage: 1, // 查询置顶的当前页
        heightLimit: 4, // 查询置顶+高亮的每页数量
        heightPage: 1, // 查询置顶+高亮的每页数量
        hotLimit: 5, // 查询热搜的每页数量
        hotPage: 1, // 查询热搜的当前页
        terminalCode: WAP_TERMINAL_CODE, // 查询资讯的终端code
        platformCode: CHIPS_PLATFORM_CODE, // 查询资讯的平台code
      },
    }
  },
  created() {
    if (process.client) {
      this.getInitData()
      this.historyData = this.$cookies.get('searchHistory')
        ? this.$cookies.get('searchHistory')
        : []
    }
  },
  methods: {
    // 取消
    clooseHandle() {
      this.$router.back()
    },
    keyClickHandle() {
      const data = {
        name: this.value,
        isJumpLink: 0,
      }
      this.addSearchHistoryMixin(data)
      this.jumpHandle(data)
    },
    // 清除搜索历史
    removeHistory() {
      this.$cookies.remove('searchHistory')
      this.historyData = []
    },
    // 刷新搜索词(查询置顶非高亮)
    refreshKeywords() {
      this.params.findType = 1
      this.params.topPage += 1
      this.getInitData()
    },
    getInitData() {
      this.loading = true
      this.$axios
        .get(searchApi.findKeywords, { params: this.params })
        .then((res) => {
          this.loading = false
          // findType == 1；点击刷新置顶关键词；
          if (res.code === 200 && this.params.findType === 1) {
            // 若查询关键词为空，并且不是第一页，说明查询到了最后一页；将topPage设为1，重复查询第一页数据
            if (!res.data.topUnHeightList.length && this.params.topPage > 1) {
              this.params.topPage = 1
              this.getInitData()
              return
            }
            // 若查询出的数据相同，说明没有更多数据
            if (
              this.searchTop.length === res.data.topUnHeightList.length &&
              this.searchTop[0].id === res.data.topUnHeightList[0].id
            ) {
              this.$xToast.show({
                message: '暂无更多数据',
                duration: 1000,
                icon: 'toast_ic_remind',
                forbidClick: false,
              })

              return
            }
            this.searchTop = res.data.topUnHeightList
            return
          }
          if (res.code === 200) {
            this.searchHeight = res.data.topHeightList
            this.searchTop = res.data.topUnHeightList
            this.searchHot = res.data.hotList
          }
        })
    },
    // 跳转处理
    jumpHandle(item) {
      let url = ''
      switch (item.isJumpLink) {
        // 跳转内链
        case 1:
          url = item.wapRoute
          this.$router.push({
            path: url,
          })
          break
        // 跳转外链
        case 2:
          url = item.url
          window.location.href = url
          break
        // 跳转图片链接
        case 3:
          url = `img`
          this.$router.push({
            name: url,
            params: {
              url: item.imageUrl,
            },
          })
          break
        default:
          url = `/search/searchResult`
          this.$router.push({
            path: url,
            query: {
              keywords: item.name,
            },
          })
          break
      }
    },
    // 缓存搜索
    cacheSearch(item) {
      const data = {
        name: item.name,
        isJumpLink: item.isJumpLink,
        wapRoute: item.wapRoute,
        url: item.url,
        imageUrl: item.imageUrl,
      }
      this.addSearchHistoryMixin(data)
      this.jumpHandle(item)
    },
  },
}
</script>

<style lang="less" scoped>
.search-page {
  font-size: 24px;
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
}
</style>
