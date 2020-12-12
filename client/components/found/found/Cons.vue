<template>
  <div class="con">
    <!--S banner-->
    <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="con_banner">
        <sp-swipe :autoplay="3000" class="con_banner_list" @change="onChange">
          <sp-swipe-item
            v-for="(image, index) in images"
            :key="index"
            class="con_banner_list_item"
          >
            <sp-image height="2.58rem" fit="cover" :src="image" />
          </sp-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              <div
                v-for="(item, index) in images"
                :key="index"
                :class="[
                  'custom-indicator_item',
                  { active_item: current === index },
                ]"
              ></div>
            </div>
          </template>
        </sp-swipe>
      </div>
      <!--E banner-->
      <!--S 列表-->
      <div class="con_list">
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <sp-cell v-for="(item, index) in list" :key="index">
            <CardItem
              :favour="item"
              :image="item.imageUrl ? { src: item.imageUrl } : null"
              :layout="item.listType === 1 ? true : false"
              @click="handleClick(item, index)"
            />
          </sp-cell>
        </sp-list>
      </div>
    </sp-pull-refresh>
    <!--E 列表-->
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Swipe,
  SwipeItem,
  Lazyload,
  PullRefresh,
  List,
  Cell,
  Image,
} from '@chipspc/vant-dgg'
import CardItem from '~/components/common/cardItem/CardItem'
Vue.use(Lazyload)
export default {
  name: 'Con',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    CardItem,
  },
  props: {
    banner: {
      type: Array,
      default: () => {
        return []
      },
    },
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
      ],
      current: 0,
      refreshing: false,
      loading: false,
      finished: false,
      cardList: [
        {
          title: '豪华车销量冠军几无悬念，宝马凭什么撼动奥迪王座？',
          icon: 'good-job-o',
          value: 25,
          activeClass: '',
          hot: true,
          name: '成都顶呱呱',
          time: '25分钟前',
          images: {
            src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
        },
        {
          title: '豪华车销量冠军几无悬念，宝马凭什么撼动奥迪王座？',
          icon: 'good-job-o',
          value: 25,
          activeClass: '',
          hot: true,
          name: '成都顶呱呱',
          time: '25分钟前',
        },
        {
          title: '理性过剩，信息同质化，创业者如何培养超级创造力？',
          icon: 'good-job-o',
          value: 25,
          activeClass: '',
          layout: true,
          name: '成都顶呱呱',
          time: '25分钟前',
          images: {
            src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
        },
      ],
    }
  },
  methods: {
    onChange(index) {
      // 切换轮播
      this.current = index
    },
    handleClick(item, index) {
      // 点击
      this.$router.push('/found/detail')
    },
    onRefresh() {
      setTimeout(() => {
        this.refreshing = false
      }, 2000)
    },
    onLoad() {},
  },
}
</script>

<style lang="less" scoped>
.con {
  /deep/.sp-cell {
    padding: 40px 32px;
  }
  &_banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 32px;
    border-radius: 12px;
    overflow: hidden;
    &_list {
      width: 670px;
      height: 284px;
      &_item {
        width: 100%;
        height: 258px;
        background-color: #f8f8f8;
      }
      .custom-indicator {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: row;
        &_item {
          width: 20px;
          height: 6px;
          background: #222222;
          opacity: 0.1;
          border-radius: 3px;
          margin-left: 8px;
          &:first-child {
            margin-left: 0;
          }
        }
        .active_item {
          opacity: 1;
        }
      }
    }
  }
  &_list {
    margin-top: 40px;
  }
}
</style>
