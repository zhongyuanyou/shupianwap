<template>
  <div class="comment">
    <sp-popup
      v-model="popupShow"
      position="bottom"
      :style="{ height: '95%' }"
      round
      close-icon="close"
      :close-on-click-overlay="false"
    >
      <div class="head">
        全部评论
        <my-icon
          name="guanbihuise_mian"
          size="0.48rem"
          color="#F5F5F5"
          class="icon"
          @click.native="popupShow = false"
        />
      </div>
      <div class="btns">
        <span>评论 {{ list.length }}</span>
        <p>
          <i :class="{ right: sort }"></i>
          <span
            v-for="(item, index) in ['默认', '时间']"
            :key="index"
            :class="{ act: sort === index }"
            @click="sortfn(index)"
            >{{ item }}</span
          >
        </p>
      </div>
      <div class="listbox">
        <div v-for="(item, index) in list" :key="index" class="list">
          <img :src="item.img" alt="" />
          <div class="user">
            <h1>{{ item.username }}</h1>
            <p>{{ item.content }}</p>
            <div>
              <span>{{ item.time }}</span>
              <div>
                <my-icon
                  name="dianzan"
                  size="0.32rem"
                  color="#999999"
                ></my-icon>
                {{ item.Likes }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <sp-field v-model="text" placeholder="请输入您的评论内容" />
        <p
          :style="{ color: text ? 'rgba(73, 116, 245, 1)' : '' }"
          @click="sum()"
        >
          发布
        </p>
      </div>
    </sp-popup>
  </div>
</template>

<script>
import { Popup, Field } from '@chipspc/vant-dgg'
export default {
  name: 'Comment',
  components: {
    [Popup.name]: Popup,
    [Field.name]: Field,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    articleId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      sort: 0,
      text: '',
      list: [
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
      ],
    }
  },
  computed: {
    popupShow: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    sortfn(index) {
      if (this.sort !== index) {
        this.sort = index
      }
    },
    sum() {
      this.$emit('release', this.text)
    },
  },
}
</script>

<style lang="less" scoped>
.comment {
  .head {
    height: 108px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    color: #1a1a1a;
    position: relative;
    > .icon {
      position: absolute;
      right: 32px;
      top: 38px;
    }
  }
  .btns {
    font-size: 32px;
    color: #222222;
    height: 96px;
    display: flex;
    align-items: center;
    padding: 0 32px;
    > p {
      margin-left: auto;
      width: 156px;
      height: 56px;
      background: #f5f5f5;
      border-radius: 28px;
      display: flex;
      padding: 4px;
      box-sizing: border-box;
      position: relative;
      > span {
        font-size: 24px;
        font-weight: 500;
        color: #999;
        display: block;
        height: 48px;
        width: 74px;
        position: relative;
        z-index: 1;
        text-align: center;
        line-height: 48px;
      }
      > .act {
        color: #222;
      }
      > i {
        width: 74px;
        height: 48px;
        background: #fff;
        border-radius: 28px;
        position: absolute;
        z-index: 0;
        left: 4px;
        top: 4px;
        transition: all 0.2s;
      }
      > .right {
        left: 78px;
        transition: all 0.2s;
      }
    }
  }
  .listbox {
    height: calc(100% - 300px);
    padding: 0 32px;
    overflow: auto;
    > .list {
      display: flex;
      margin-bottom: 30px;
      padding-top: 8px;
      > img {
        width: 60px;
        height: 60px;
        background: #d8d8d8;
        border-radius: 50%;
        object-fit: cover;
      }
      .user {
        margin-left: 20px;
        > h1 {
          font-size: 30px;
          color: #555555;
        }
        > p {
          margin-top: 14px;
          font-size: 30px;
          font-weight: 400;
          color: #555555;
          line-height: 42px;
        }
        > div {
          margin-top: 20px;
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 400;
          color: #999999;
          > div {
            margin-left: auto;
          }
        }
      }
    }
  }
  .foot {
    border-top: 1px solid #ddd;
    height: 96px;
    display: flex;
    align-items: center;
    padding-right: 32px;
    /deep/.sp-cell {
      width: 610px;
    }
    /deep/.sp-cell::after {
      display: none;
    }
    > p {
      margin-left: auto;
      height: 28px;
      font-size: 28px;
      font-weight: 500;
      color: rgba(73, 116, 245, 0.4);
    }
  }
}
</style>
