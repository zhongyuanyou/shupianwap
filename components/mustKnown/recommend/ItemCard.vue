<template>
  <sp-list
    v-if="listData.length"
    v-model="loading"
    :finished="finished"
    offset="0"
    finished-text="没有更多了"
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
          <div class="item_content">
            <p>
              {{ item.title }}
            </p>
            <span class="item_bottom"
              >{{ computeHotNumber(item.browseCount) }} 万热度</span
            >
          </div>
          <div class="item_img">
            <img
              v-if="item.contentImageUrl"
              :src="item.contentImageUrl.split(',')[0]"
              alt=""
            />
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
      loading: true,
      finished: false,
    }
  },
  computed: {},
  methods: {
    // 调到推荐页面
    goRecommend() {
      this.$router.push({
        path: '/',
      })
    },
    computeHotNumber(browseCount) {
      return browseCount / 10000
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
    justify-content: space-between;
    .item_span {
      text-align: center;
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #999999;
    }
    .first {
      width: 30px;
      height: 44px;
      background: linear-gradient(315deg, #fa2925 0%, #ff8e8e 100%);
      margin-top: 10px;
      margin-right: 20px;
      color: #fff;
    }
    .second {
      width: 30px;
      height: 44px;
      background: linear-gradient(315deg, #ff8208 0%, #ffb132 100%);
      margin-top: 10px;
      margin-right: 20px;
      color: #fff;
    }
    .third {
      width: 30px;
      height: 44px;
      background: linear-gradient(135deg, #e4c57c 0%, #e2a972 100%);
      margin-top: 10px;
      margin-right: 20px;
      color: #fff;
    }
    .item_content {
      width: 398px;
      height: auto;
      p {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 45px;
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
