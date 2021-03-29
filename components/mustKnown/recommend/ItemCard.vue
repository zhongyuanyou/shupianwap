<template>
  <sp-list
    v-if="infoList.length"
    v-model="loading"
    :finished="finished"
    offset="0"
    finished-text="没有更多了"
  >
    <sp-cell v-for="(item, index) in infoList" :key="index">
      <div class="item">
        <div class="item_top">
          <div class="item_span"></div>
          <div class="item_content">
            <p>
              如何看待全国政协委员俞敏洪：建议修改义务教育法，让流动儿童在居住地就近入学？你支持吗？
            </p>
            <span class="item_bottom">2340 万热度</span>
          </div>
          <div class="item_img"></div>
        </div>
      </div>
    </sp-cell>
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
    // banner: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   },
    // },
  },
  data() {
    return {
      loading: true,
      finished: false,
      infoList: [
        {
          item: 1,
        },
        {
          item: 1,
        },
        {
          item: 1,
        },
        {
          item: 1,
        },
        {
          item: 1,
        },
      ],
    }
  },
  methods: {},
}
</script>
<style lang="less" scoped>
/deep/ .sp-cell {
  padding: 0;
}
.item {
  padding: 18px 0 28px 0;
  border-top: 1px solid #dddddd;
  .item_top {
    display: flex;
    // position: relative;
    justify-content: space-between;
    .item_span {
      width: 30px;
      height: 44px;
      background: linear-gradient(315deg, #fa2925 0%, #ff8e8e 100%);
      // position: absolute;
      margin-top: 10px;
      margin-right: 20px;
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
      width: 190px;
      height: 127px;
      background: #cccccc;
      border-radius: 12px;
      margin-top: 10px;
      margin-left: 40px;
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
