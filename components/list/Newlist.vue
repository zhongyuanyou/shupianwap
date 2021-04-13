<template>
  <div class="Newlist">
    <sp-list
      v-model="loading"
      :finished="finished"
      :finished-text="datalist.length == 0 ? '' : '没有更多了'"
      @load="onLoad"
    >
      <div
        v-for="(item, index) in datalist"
        :key="index"
        class="list"
        @click="godeatil(item)"
      >
        <div class="left">
          <img :src="item.img" alt="" />
        </div>
        <div class="right">
          <h1>{{ item.name }}</h1>
          <div v-if="item.tag.length > 0" class="tag">
            <p v-for="(tagitem, tagindex) in item.tag" :key="tagindex">
              {{ tagitem.tagName }}
            </p>
          </div>
          <p class="describe">
            {{ item.attr }}
          </p>
          <p class="price">{{ item.price }}元</p>
        </div>
      </div>
    </sp-list>
    <div v-show="datalist.length < 1" class="none">
      <img src="https://img10.dgg.cn/pt03/wap/cmxakdtkqxs0000.png" alt="" />
      <p>暂无商品</p>
    </div>
  </div>
</template>

<script>
import { PullRefresh, List } from '@chipspc/vant-dgg'
import { goods } from '@/api/index'

export default {
  name: 'Newlist',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
  },
  props: {
    searchtext: {
      type: String,
      default: '',
    },
    datalist: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      pages: 1,
    }
  },
  // mounted() {
  //   this.getlist()
  // },
  methods: {
    godeatil(item) {
      this.$router.push({
        path: '/detail',
        query: {
          productId: item.id,
        },
      })
    },
    getlist() {},
    onLoad() {
      this.$emit('load', this.pages)
      this.pages++
    },
  },
}
</script>

<style lang="less" scoped>
.Newlist {
  .list {
    margin: 20px 20px 0 20px;
    padding: 20px;
    height: 253px;
    background: #fff;
    border-radius: 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    // /deep/.list__finished-text {
    //   background: #e4e4e4;
    //   color: #fff;
    // }
    > .left {
      width: 160px;
      height: 160px;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    > .right {
      margin-left: 20px;
      width: calc(100% - 180px);
      > h1 {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > .tag {
        margin-top: 10px;
        height: 35px;
        display: flex;
        align-items: center;
        > p {
          max-width: 30%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          box-sizing: border-box;
          height: 32px;
          background: #f0f2f5;
          border-radius: 4px;
          padding: 0 9px;
          line-height: 32px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
          margin-left: 12px;
        }
        > p:nth-child(1) {
          margin-left: 0px;
        }
        > .act {
          background: #f1524e;
          color: #fff;
        }
      }
      > .describe {
        margin-top: 8px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
      }
      > .price {
        margin-top: 8px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ec5330;
      }
    }
  }
  .none {
    padding-top: 100px;
    margin: 0 auto;
    text-align: center;
    img {
      width: 340px;
      height: 340px;
    }
    p {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
</style>
