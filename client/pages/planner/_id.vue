<!--
 * @Author: xiao pu
 * @Date: 2020-11-25 15:28:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-15 11:56:44
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/planner/serviceDetails.vue
-->

<template>
  <div class="detail">
    <div class="head">
      <Header title="规划师">
        <template #right>
          <my-icon
            class="head__icon-share"
            name="nav_ic_share"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="onClickRight"
          />
        </template>
      </Header>
    </div>
    <div class="body">
      <div class="detail-content">
        <div class="detail-content__bg">
          <div class="detail-content__wrap">
            <div class="detail-content__wrap-head">
              <div class="flex-r-s flex-r-a-c">
                <div class="detail-content__avatar">
                  <sp-image
                    round
                    width="1.2rem"
                    height="1.2rem"
                    fit="cover"
                    :src="
                      detailData.img || 'https://img.yzcdn.cn/vant/cat.jpeg'
                    "
                  />
                </div>
                <div>
                  <h4 class="detail-content__name">{{ detailData.name }}</h4>
                  <p class="detail-content__discript">
                    {{ detailData.synopsis }}
                  </p>
                </div>
              </div>

              <div class="detail-content__tag-list">
                <sp-tag
                  v-for="tag of formatTagList"
                  :key="tag"
                  size="large"
                  color="#EADACD"
                  text-color="#222222"
                  class="detail-content__tag"
                  >{{ tag }}</sp-tag
                >
              </div>
            </div>
            <div class="detail-content__wrap-body">
              <div class="detail-content__section-title">个人信息</div>
              <ul class="detail-content__section-content">
                <li>
                  <span class="label">服务人数：</span>
                  <span class="content">{{
                    detailData.serveNum ? `${detailData.serveNum}人` : '--'
                  }}</span>
                </li>
                <li>
                  <span class="label">好评率：</span>
                  <span class="content">{{
                    detailData.goodReputation
                      ? `${detailData.goodReputation}次`
                      : '--'
                  }}</span>
                </li>
                <li>
                  <span class="label">服务经验：</span>
                  <span class="content">{{
                    detailData.serveAge ? `${detailData.serveAge}年` : '--'
                  }}</span>
                </li>
                <li>
                  <span class="label">成交记录：</span>
                  <span class="content">{{
                    detailData.serveAge ? `${detailData.serveAge}次` : '--'
                  }}</span>
                </li>
                <li>
                  <span class="label">平均响应时间：</span>
                  <span class="content">{{
                    detailData.averageResponseTime
                      ? `${detailData.averageResponseTime}s`
                      : '--'
                  }}</span>
                </li>
              </ul>
            </div>
            <div class="detail-content__wrap-footer">
              <div class="detail-content__section-title flex-r-sb flex-r-a-c">
                <i class="horizontal-line"></i>
                <span>薯片分</span>
                <i class="horizontal-line"></i>
              </div>
              <div class="detail-content__sp-score">
                {{ detailData.point || '--' }}
              </div>
              <div class="detail-content__level">
                打败{{ detailData.prop }}的规划师
              </div>
              <div class="detail-content__explain">
                <span>
                  什么是薯片分
                  <my-icon name="per_ic_help" size="0.24rem" color="#666666" />
                </span>
                <sp-button class="detail-content__explain-btn"
                  >查看详情</sp-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="recommendList && recommendList.length" class="recommend">
        <h3 class="recommend__title">为您推荐</h3>
        <div class="recommend-list">
          <GoodsPro
            v-for="item in recommendList"
            :key="item"
            class="item-wrap"
          />
        </div>
      </div>
    </div>
    <div class="footer">
      <sp-bottombar safe-area-inset-bottom>
        <sp-bottombar-button
          type="primary"
          text="电话联系"
          @click="handleCall"
        />
        <sp-bottombar-button type="info" text="在线联系" @click="handleIM" />
      </sp-bottombar>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Toast,
  Image,
  Tag,
  Bottombar,
  BottombarButton,
} from '@chipspc/vant-dgg'

import Header from '@/components/common/head/header'
import GoodsPro from '@/components/planner/GoodsPro'

import { planner } from '@/api'

export default {
  name: 'List',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    Header,
    GoodsPro,
  },
  data() {
    return {
      recommendList: [],
      loading: true,
      detailData: {},
    }
  },
  computed: {
    formatTagList() {
      const tagList = this.detailData.tagList
      if (!Array.isArray(tagList)) return []
      const formatData = tagList.slice(0, 2)
      formatData.push('时代峰峻水电费水电费')
      return formatData
    },
  },
  created() {
    if (process && process.client) {
      this.getDetail()
    }
  },
  methods: {
    onClickLeft() {
      console.log('nav onClickLeft')
    },
    onClickRight() {
      console.log('nav onClickRight')
    },
    handleCall() {
      console.log('call ')
    },
    handleIM() {
      console.log('IM ')
    },
    // 获取详情数据
    async getDetail() {
      try {
        const { mchUserId } = this.$route.query
        if (mchUserId == null) {
          Toast('缺少规划师参数')
          return
        }
        const params = { id: mchUserId }
        const data = await planner.detail(params)
        console.log(data)
        this.detailData = data || {}
        return data
      } catch (error) {
        console.error('getDetail:', error)
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

.flex-r-s {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.flex-r-sb {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.detail {
  height: 100%;
  overflow-y: scroll;
  .head {
    &__icon-share {
      margin-right: 40px;
    }
  }
  .body {
    padding: 0;
    .detail-content {
      &__bg {
        padding: 40px;
        position: relative;
        background: url(~assets/images/planner/detail_bg.png) top center/100%
          auto no-repeat;
      }
      &__wrap {
        height: 768px;
        background: linear-gradient(135deg, #f9f1e8, #f9f1e8, #e3d1c3);
        border-radius: 8px;
        padding: 48px 40px;
        box-sizing: border-box;
        &-head {
        }
        &-body {
          padding-top: 42px;
        }
        &-footer {
          margin-top: 14px;
        }
      }
      &__avatar {
        width: 120px;
        height: 120px;
        margin-right: 24px;
        position: relative;
        &::after {
          content: '';
          display: block;
          width: 98px;
          height: 26px;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background: url(~assets/images/planner/per_img_gold.png) center/cover
            no-repeat;
        }
      }
      &__name {
        font-size: 36px;
        font-weight: bold;
        color: #222222;
        line-height: 40px;
        .textOverflow(1);
      }
      &__discript {
        margin-top: 20px;
        font-size: 24px;
        line-height: 30px;
        font-weight: 400;
        color: #222222;
        .textOverflow(2);
      }
      &__tag-list {
        margin-top: 24px;
        line-height: 1em;
        font-size: 0;
        display: flex;
        /deep/.sp-tag {
          max-width: 280px;
          margin-left: 12px;
          font-size: 24px;
          font-weight: 400;
          white-space: nowrap;
          word-break: normal;
          .textOverflow(1);
          &:first-child {
            margin-left: 0;
          }
        }
      }
      &__section-title {
        font-size: 28px;
        font-weight: bold;
        line-height: 32px;
      }
      &__section-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 38px;
        > li {
          flex: 50% 1 0;
          height: 23px;
          font-size: 24px;
          font-weight: 400;
          color: #222222;
          line-height: 28px;
          margin-bottom: 24px;
        }
      }
      &__sp-score {
        font-size: 58px;
        font-family: Bebas;
        font-weight: 400;
        color: #222222;
        line-height: 62px;
        text-align: center;
        margin-top: 20px;
      }
      &__level {
        font-size: 24px;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
        text-align: center;
        margin-top: 16px;
      }
      &__explain {
        font-size: 28px;
        line-height: 32px;
        font-weight: 400;
        color: #222222;
        margin-top: 22px;
        text-align: center;
      }
      &__explain-btn {
        height: 32px;
        background-color: transparent;
        border: none;
      }
      .horizontal-line {
        .horizontal-line(@width:208px; @bgColor:#DFD4CA; @skewX:0deg; @height:2px;);
      }
    }
  }
  .footer {
    /deep/.sp-bottombar {
      z-index: 100;
      .sp-button--info {
        background-color: #24ae68;
        border: 1px solid #24ae68;
      }
    }
  }
  .recommend {
    &__title {
      padding: 0 40px;
      font-size: 40px;
      font-weight: bold;
      color: @title-text-color;
      line-height: 44px;
      margin-bottom: 6px;
    }
  }
  .item-wrap {
    padding: 40px;
  }
}
</style>
