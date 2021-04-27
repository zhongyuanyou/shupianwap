<template>
  <sp-list
    v-if="listData.length"
    v-model="loading"
    :finished="finished"
    offset="0"
    :finished-text="listData.length == 0 ? '' : '没有更多了'"
    @load="onLoad"
  >
    <sp-cell v-for="(item, index) in listData" :key="index">
      <div class="item">
        <div class="item_top">
          <div
            class="item_span"
            :class="
              index === 0
                ? 'first'
                : index == 1
                ? 'second'
                : index == 2
                ? 'third'
                : ''
            "
          >
            {{ index + 1 }}
          </div>

          <div class="item_middle">
            <div class="item_content" @click="goDetailPage(item.type, item.id)">
              <p>
                {{ item.title }}
              </p>
              <span class="item_bottom"
                >{{ computeHotNumber(item.browseCount) || 0 }} 热度</span
              >
            </div>
            <div class="item_img" @click="goDetailPage(item.type, item.id)">
              <img
                v-if="item.contentImageUrl"
                :src="item.contentImageUrl.split(',')[0]"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </sp-cell>
    <div class="bottom" @click="goRecommend">
      到底啦，去推荐看看吧
      <my-icon
        name="you"
        size="0.22rem"
        color="#999999"
        class="my_icon"
      ></my-icon>
    </div>
  </sp-list>
</template>
<script>
import {
  Tab,
  Tabs,
  Icon,
  TopNavBar,
  Toast,
  Swipe,
  SwipeItem,
  PullRefresh,
  List,
  Cell,
  Image,
} from '@chipspc/vant-dgg'

export default {
  name: 'ItemCard',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
  },

  props: {
    listData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      loading: false,
      finished: true,
      isLoading: false,
      pages: 0,
    }
  },
  computed: {},
  methods: {
    init() {},
    // 调到推荐页面
    goRecommend() {
      this.$router.push({
        path: '/',
      })
    },
    computeHotNumber(browseCount) {
      if (browseCount > 10000) {
        return browseCount / 10000 + '万'
      } else {
        return browseCount
      }
    },
    // 进入文章/问题/回答详情页面
    goDetailPage(type, id) {
      if (type === 1) {
        this.$router.push({
          path: '/known/detail/question',
          query: {
            id,
          },
        })
      } else if (type === 2) {
        this.$router.push({
          path: '/known/detail/article',
          query: {
            id,
          },
        })
      } else if (type === 3) {
        this.$router.push({
          path: '/known/detail/answer',
          query: {
            id,
          },
        })
      }
    },
    onLoad() {
      this.pages++
      this.$emit('load', this.pages)
    },
  },
}
</script>
<style lang="less" scoped>
/deep/ .sp-cell {
  padding: 0 32px;
}
.bottom {
  width: 336px;
  height: 60px;
  background: #f5f5f5;
  border-radius: 30px;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 24px;
  justify-content: center;
  margin: 60px auto;
  .my_icon {
    margin-left: 8px;
  }
}
.item {
  padding: 18px 0 28px 0;
  border-top: 1px solid #dddddd;
  .item_top {
    display: flex;
    // justify-content: space-between;
    .item_span {
      text-align: center;
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #999999;
      width: 0.33rem;
      height: 0.44rem;
      margin-top: 0.1rem;
      margin-right: 0.2rem;
    }
    .first {
      width: 30px;
      height: 44px;
      background: url('https://cdn.shupian.cn/sp-pt/wap/fszz6gnty1s0000.png');
      margin-top: 10px;
      margin-right: 20px;
      color: #fff;
      background-size: 100% 100%;
      line-height: 40px;
    }
    .second {
      width: 30px;
      height: 44px;
      background: url('https://cdn.shupian.cn/sp-pt/wap/5rd435gzz4s0000.png');
      margin-top: 10px;
      margin-right: 20px;
      color: #fff;
      background-size: 100% 100%;
      line-height: 40px;
    }
    .third {
      width: 30px;
      height: 44px;
      background: url('https://cdn.shupian.cn/sp-pt/wap/blyffrn3qg80000.png');
      margin-top: 10px;
      margin-right: 20px;
      color: #fff;
      background-size: 100% 100%;
      line-height: 40px;
    }
    .item_middle {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .item_content {
        height: auto;
        p {
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
          line-height: 45px;
          word-break: break-all;
        }
        span {
        }
      }
      .item_img {
        img {
          display: block;
          width: 190px;
          height: 127px;
          background: #cccccc;
          border-radius: 12px;
          margin-top: 10px;
          margin-left: 40px;
        }
      }
    }
  }
  .item_bottom {
    padding-top: 16px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 24px;
  }
}
</style>
