<template>
  <div class="planner-search-item" @click.stop="handleClick('detail')">
    <div class="left">
      <div class="planner-search-item__avatar">
        <sp-image
          width="1.2rem"
          height="1.6rem"
          fit="cover"
          class="planner-search-item__avatar-image"
          lazy-load
          :src="
            itemData.img ||
            'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg?x-oss-process=image/resize,m_fill,w_240,h_240,limit_0'
          "
        />
      </div>
      <div class="planner-search-item__detail">
        <h4>
          <span class="planner-search-item__detail-name">{{
            itemData.userName
          }}</span>
        </h4>

        <p class="planner-search-item__detail-address">
          {{ itemData.recentCompany }}
        </p>
        <div class="planner-search-item__detail-tag-list">
          <sp-tag
            v-for="tag of formatTagList"
            :key="tag"
            class="planner-search-item__detail-tag"
            color="#F8F8F8"
            text-color="#999999"
            >{{ tag }}</sp-tag
          >
        </div>
        <div class="planner-search-item__detail-data">
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
      <div class="planner-search-item__contact">
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
import { Button, Image, Tag } from '@chipspc/vant-dgg'

import { mapState } from 'vuex'
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
      const formatData = this.itemData.tagList.slice(0, 5)
      return formatData
    },
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    city() {
      return this.$store.state.city.currentCity
    },
  },
  async mounted() {
    if (!this.city.code) {
      await this.POSITION_CITY({ type: 'init' })
    }
  },
  methods: {
    async handleClick(type) {
      let data = {}
      switch (type) {
        case 'IM':
          data = {
            mchUserId: this.itemData.mchUserId,
            userName: this.itemData.userName,
            type: this.itemData.type,
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
      const params = {
        areaCode: this.city.code,
        areaName: this.city.name,
        customerUserId: this.$store.state.user.userId,
        plannerId: this.itemData.mchUserId,
        requireCode: '',
        requireName: '',
      }
      try {
        const data = await planner.newtel(params)
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
  &__avatar {
    &-image {
      border-radius: 4px;
      overflow: hidden;
    }
  }
  &__detail {
    padding-left: 34px;
    h4 {
      display: flex;
    }
    &-name {
      font-size: 32px;
      font-weight: bold;
      color: @title-text-color;
      line-height: 36px;
      margin-right: 16px;
      max-width: 330px;
      .textOverflow(1);
    }
    &-address {
      max-width: 330px;
      font-size: 24px;
      font-weight: 400;
      color: @title-text-color;
      line-height: 28px;
      margin-top: 20px;
      .textOverflow(1);
    }
    &-tag-list {
      margin-top: 12px;
      line-height: 1;
      font-size: 22px;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      max-height: 40px;
    }
    &-tag {
      max-width: 148px;
      min-height: 32px;
      padding: 0 8px;
      line-height: 32px;
      margin-left: 12px;
      margin-bottom: 12px;
      .textOverflow(1);
      &:first-child {
        margin-left: 0;
      }
    }
    &-data {
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
  &__contact {
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
