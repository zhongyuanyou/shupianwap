<template>
  <div class="itemCard">
    <sp-cell
      v-for="(item, index) in listData"
      :key="index"
      @click="goDetailPage(item.type, item.id)"
    >
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
            <div class="item_content">
              <p>
                {{ item.title }}
              </p>
              <span class="item_bottom"
                >{{
                  item.hotNumber > 10000
                    ? item.hotNumber / 10000 + '万'
                    : item.hotNumber || 0
                }}
                热度</span
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
      </div>
    </sp-cell>
    <div v-show="toLoad" class="bottom" @click="goRecommend">
      到底啦，去推荐看看吧
      <my-icon
        name="you"
        size="0.22rem"
        color="#999999"
        class="my_icon"
        style="margin-top: 2px"
      ></my-icon>
    </div>
  </div>
</template>
<script>
import {
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
    toLoad: {
      type: Boolean,
      default: () => false,
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
  watch: {
    listData() {
      return true
    },
  },
  methods: {
    init() {},
    // 调到推荐页面
    goRecommend() {
      this.$emit('goRecommend', 'tuijian')
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
  },
}
</script>
<style lang="less" scoped>
::v-deep .sp-cell {
  padding: 0 32px;
}
.itemCard {
  padding-bottom: 100px;
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
  // line-height: 24px;
  justify-content: center;
  margin: 60px auto;
  .my_icon {
    margin-left: 8px;
  }
}
.item {
  padding: 18px 0 28px 0;
  // border-top: 1px solid #dddddd;
  .item_top {
    display: flex;
    // justify-content: space-between;
    .item_span {
      text-align: center;
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #999999;
      // width: 0.33rem;
      word-break: normal;
      height: 0.44rem;
      margin-top: 0.08rem;
      margin-right: 0.2rem;
    }
    .first {
      width: 30px;
      height: 44px;
      background: url('https://cdn.shupian.cn/sp-pt/wap/fszz6gnty1s0000.png');
      margin-top: 8px;
      margin-right: 20px;
      color: #fff;
      background-size: 100% 100%;
      line-height: 40px;
    }
    .second {
      width: 30px;
      height: 44px;
      background: url('https://cdn.shupian.cn/sp-pt/wap/5rd435gzz4s0000.png');
      margin-top: 8px;
      margin-right: 20px;
      color: #fff;
      background-size: 100% 100%;
      line-height: 40px;
    }
    .third {
      width: 30px;
      height: 44px;
      background: url('https://cdn.shupian.cn/sp-pt/wap/blyffrn3qg80000.png');
      margin-top: 8px;
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
          font-weight: bold;
          color: #555555;
          line-height: 50px;
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
          object-fit: cover;
          background: #cccccc;
          border-radius: 12px;
          margin-top: 10px;
          margin-left: 40px;
        }
      }
    }
  }
  .item_bottom {
    display: inline-block;
    margin-top: 26px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 24px;
  }
}
.item::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #f4f4f4;
  -webkit-transform: scaleY(0.6);
  transform: scaleY(0.6);
}
</style>
