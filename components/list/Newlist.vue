<template>
  <div class="Newlist">
    <sp-list
      v-model="loading"
      :immediate-check="false"
      :finished="finished"
      :finished-text="datalist.length == 0 ? '' : '我是有底线的...'"
      offset="0"
      @load="onLoad"
    >
      <div
        v-for="(item, index) in datalist"
        :key="index"
        class="list"
        data-even_name="p_commodityClick"
        :data-com_level_1_code="
          item.classCodeLevel ? item.classCodeLevel.split(',')[0] : ''
        "
        :data-com_level_2_code="
          item.classCodeLevel ? item.classCodeLevel.split(',')[1] : ''
        "
        data-commodity_level_1=""
        data-commodity_level_2=""
        :data-n_now_price="item.price || ''"
        :data-commodity_number="item.goodsNo || ''"
        :data-commodity_name="item.name || ''"
        data-commodity_type="服务商品"
        @click="godeatil(item)"
      >
        <div class="left">
          <img :src="item.img" alt="" />
        </div>
        <div class="right">
          <h1>
            {{ item.name }}
          </h1>
          <div v-if="item.tag.length > 0" class="tag">
            <div v-if="item.salesGoodsSubVos.length > 1">套餐</div>
            <p v-for="(tagitem, tagindex) in item.tag" :key="tagindex">
              {{ tagitem.tagName }}
            </p>
          </div>
          <p v-if="item.attr" class="describe">
            {{ item.attr }}
          </p>
          <p class="price">
            {{ item.price === '0.00' ? '面议' : item.price
            }}<span v-if="item.price !== '0.00'">元</span>
          </p>
        </div>
      </div>
      <div class="claassicon"></div>
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
      if (this.$parent && this.$parent.onshow) {
        this.loading = true
        this.pages++
        this.$emit('load', this.pages)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.Newlist {
  .list {
    margin: 0 40px 0 40px;
    padding: 32px 0;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #f4f4f4;
    > .left {
      width: 220px;
      height: 220px;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
      }
    }
    > .right {
      margin-left: 32px;
      width: calc(100% - 240px);
      min-height: 220px;
      position: relative;
      > h1 {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #222222;
        line-height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > .tag {
        margin-top: 16px;
        height: 33px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
        > div {
          background: #ec5330;
          box-sizing: border-box;
          height: 32px;
          border-radius: 4px;
          padding: 0 9px;
          line-height: 37px;
          font-size: 22px;
          font-weight: 400;
          color: #fff;
          margin-left: 12px;
          color: #ffffff;
        }
        > p {
          display: inline-block;
          height: 32px;
          border-radius: 4px;
          padding: 0 9px;
          line-height: 32px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          background: #f0f2f5;
          border-radius: 4px;
          margin-left: 20px;
          color: #5c7499;
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
        min-height: 20px;
        margin-top: 16px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 22px;
      }
      > .price {
        position: absolute;
        bottom: 0;
        margin-top: 19px;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #ec5330;
        line-height: 36px;
        align-self: flex-end;
        > span {
          font-size: 22px;
          line-height: 22px;
        }
      }
    }
  }
  .claassicon {
    min-height: 1px;
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
