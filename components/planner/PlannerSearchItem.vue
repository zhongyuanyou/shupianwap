<!--
 * @Author: xiao pu
 * @Date: 2020-12-14 10:48:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-19 14:34:55
 * @Description: file content
 * @FilePath: /chips-wap/components/planner/PlannerSearchItem.vue
-->
<template>
  <div class="planner-search-item" @click.stop="handleClick('detail')">
    <div class="left">
      <div class="planner-search-item_avatar">
        <sp-image
          width="1.2rem"
          height="1.6rem"
          fit="cover"
          :src="itemData.img"
        />
      </div>
      <div class="planner-search-item_detail">
        <h4>
          <span class="planner-search-item_detail--name">{{
            itemData.userName
          }}</span>
        </h4>

        <p class="planner-search-item_detail--address">
          {{ itemData.recentCompany }}
        </p>
        <div class="planner-search-item_detail--tag-list">
          <sp-tag
            v-for="tag of formatTagList"
            :key="tag"
            class="planner-search-item_detail--tag"
            color="#F8F8F8"
            text-color="#999999"
            >{{ tag }}</sp-tag
          >
        </div>
        <div class="planner-search-item_detail--data">
          <div class="data-item">
            <h5>{{ itemData.payNum || '--' }}</h5>
            <p>历史成交</p>
          </div>
          <div class="vertical-line"></div>
          <div class="data-item">
            <h5>{{ itemData.goodReputation || '--' }}</h5>
            <p>好评率</p>
          </div>
          <div class="vertical-line"></div>
          <div class="data-item">
            <h5>{{ itemData.point || '--' }}</h5>
            <p>薯片分</p>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="planner-search-item_contact">
        <sp-button round class="contact-btn" @click.stop="handleClick('IM')"
          ><my-icon name="notify_ic_chat" size="0.32rem" color="#4974F5"
        /></sp-button>
        <sp-button round class="contact-btn" @click.stop="handleClick('tel')"
          ><my-icon name="notify_ic_tel" size="0.32rem" color="#4974F5"
        /></sp-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Toast, Image, Tag } from '@chipspc/vant-dgg'

import { planner } from '@/api'

export default {
  name: 'PlannerSearchItem',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [Tag.name]: Tag,
  },
  props: {
    itemData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    formatTagList() {
      if (!Array.isArray(this.itemData.tagList)) return []
      return this.itemData.tagList.slice(0, 2)
    },
  },
  methods: {
    async handleClick(type) {
      let data = {}
      switch (type) {
        case 'IM':
          data = {
            mchUserId: this.itemData.mchUserId,
            userName: this.itemData.userName,
          }
          break
        case 'tel':
          data = await this.getTel()
          break
        case 'detail':
          data = { mchUserId: this.itemData.mchUserId, isShare: 0 }
          break
      }
      if (data) {
        this.$emit('operation', { type, data })
      }
    },
    async getTel() {
      const params = { id: this.itemData.mchUserId }
      try {
        const data = await planner.tel(params)
        console.log(data)
        return data
      } catch (error) {
        console.error('getTel:', error)
        return Promise.reject(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.planner-search-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .left {
    display: flex;
    align-items: flex-start;
    flex: 1;
  }
  .right {
    position: relative;
    flex: 100px 0 1;
  }
  &_avatar {
    img {
      border-radius: 4px;
    }
  }
  &_detail {
    padding-left: 34px;
    h4 {
      display: flex;
    }
    &--name {
      font-size: 32px;
      font-weight: bold;
      color: @title-text-color;
      line-height: 36px;
      margin-right: 16px;
      max-width: 330px;
      .textOverflow(1);
    }
    &--address {
      max-width: 330px;
      font-size: 24px;
      font-weight: 400;
      color: @title-text-color;
      line-height: 28px;
      margin-top: 20px;
      .textOverflow(1);
    }
    &--tag-list {
      margin-top: 12px;
      line-height: 1;
      font-size: 22px;
      display: flex;
    }
    &--tag {
      max-width: 148px;
      height: 32px;
      margin-left: 12px;
      .textOverflow(1);
      &:first-child {
        margin-left: 0;
      }
    }
    &--data {
      display: flex;
      margin-top: 20px;
      .data-item {
        font-weight: 400;
        padding: 0 30px;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          padding-right: 0;
        }
        h5 {
          font-size: 36px;
          font-family: Bebas;
          color: #222222;
          line-height: 40px;
        }
        p {
          margin-top: 8px;
          font-size: 24px;
          color: #999999;
          line-height: 28px;
        }
      }
      .vertical-line {
        .vertical-line(@height:70px; @bgColor:#E5E5E5; @skewX:-15deg;);
      }
    }
  }
  &_contact {
    position: absolute;
    top: 0;
    right: 0;
    width: 152px;
    display: flex;
    justify-content: space-between;
    .contact-btn {
      border: none;
      width: 64px;
      height: 64px;
      background: #ebf3ff;
    }
  }
}
</style>
