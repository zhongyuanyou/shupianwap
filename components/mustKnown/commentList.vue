<template>
  <div class="comment">
    <sp-popup
      v-model="show"
      position="bottom"
      :style="{ height: '95%' }"
      round
      close-icon="close"
      :close-on-click-overlay="false"
    >
      <div class="head">
        {{ title }}
        <sp-icon name="clear" size="0.4rem" class="icon" @click="close" />
      </div>
      <div class="btns">
        <span>评论 {{ list.length }}</span>
        <p>
          <i :class="sort === 1 ? 'right' : ''"></i>
          <span :class="sort === 0 ? 'act' : ''" @click="sortfn(0)">默认</span>
          <span :class="sort === 1 ? 'act' : ''" @click="sortfn(1)">时间</span>
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
                <sp-icon name="good-job-o" size="0.34rem" />
                {{ item.Likes }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot">
        <sp-field v-model="text" placeholder="请输入手机号" />
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
import { Popup, Icon, Field } from '@chipspc/vant-dgg'
export default {
  name: 'Comment',
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Field.name]: Field,
  },
  props: {
    title: {
      type: String,
      default: '全部评论',
    },
    show: {
      type: Boolean,
      default: false,
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
      sort: 0,
      text: '',
    }
  },
  methods: {
    sortfn(index) {
      if (this.sort !== index) {
        this.sort = index
        this.$emit('sort', index)
      }
    },
    sum() {
      this.$emit('release', this.text)
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.comment {
  .head {
    height: 130px;
    font-size: 34px;
    color: #1a1a1a;
    text-align: center;
    padding-top: 30px;
    box-sizing: border-box;
    position: relative;
    > .icon {
      position: absolute;
      right: 32px;
      top: 30px;
    }
  }
  .btns {
    font-size: 32px;
    color: #222222;
    display: flex;
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
    height: calc(100% - 286px);
    padding: 0 32px;
    overflow: auto;
    > .list {
      display: flex;
      margin-top: 40px;
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
          margin-top: 20px;
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
            /deep/.sp-icon {
              vertical-align: -3px;
            }
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
