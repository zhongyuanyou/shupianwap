<template>
  <sp-list
    v-if="infoList.length"
    v-model="loading"
    :finished="finished"
    offset="0"
    finished-text="没有更多了"
  >
    <sp-cell v-for="(item, index) in infoList" :key="index">
      <div class="item" @click="$router.push('/known/detail/article')">
        <div class="item_title">什么情况下你会毫不犹豫地辞职呢？</div>

        <div class="item_content">
          <div class="item_content_lf">
            <div class="item_Info">
              <div class="userPhoto">
                <img src="" alt="" />
              </div>
              <div class="userName">摇铃铛</div>
            </div>
            <p class="content">
              今年两会，全国人大将审查国民经济和社会发展第十四个五年规划和2035年远景目标纲要草案，为未来五年与更长远的…
            </p>
          </div>
          <img class="content_img" src="" alt="" />
        </div>
        <div class="item_bottom">
          <span class="like">2.1 万赞同</span>
          <span class="comment"> · 4424 评论</span>
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
  Lazyload,
  PullRefresh,
  List,
  Cell,
  Image,
} from '@chipspc/vant-dgg'

export default {
  name: 'ListItem',
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
  padding: 0 0 20px 0;
  position: relative;
  background: none;
}
.item_span {
  width: 94px;
  height: 40px;
  background: #4974f5;
  border-radius: 4px;
  position: absolute;
  top: -20px;
  right: 32px;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 0.4rem;
  text-align: center;
}
.item {
  background: #fff;
  border-radius: 12px;
  padding: 24px 32px 28px 28px;

  .item_title {
    height: 36px;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1a1a1a;
    line-height: 36px;
  }

  .item_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .item_content_lf {
      .item_Info {
        display: flex;
        margin-top: 16px;
        margin-bottom: 12px;
        align-items: center;
        .userPhoto {
          width: 40px;
          height: 40px;
          background: #6d7177;
          margin-right: 20px;
          border-radius: 50%;
          img {
          }
        }
        .userName {
          height: 26px;
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 26px;
        }
      }
      .content {
        width: 448px;
        min-height: 84px;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 42px;
        // margin-right: 0.32rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }

    .content_img {
      display: block;
      width: 190px;
      height: 127px;
      background: #cccccc;
      border-radius: 12px;
      margin-top: 21px;
    }
  }
  .item_bottom {
    // width: 294px;
    // height: 28px;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 28px;
  }
}
</style>
