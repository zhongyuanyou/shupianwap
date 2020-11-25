<!--
 * @Author: xiao pu
 * @Date: 2020-11-25 15:28:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-25 20:05:19
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/planner/detail.vue
-->

<template>
  <div class="detail">
    <div class="head">
      <sp-top-nav-bar
        title="规划师"
        left-arrow
        ellipsis
        @on-click-left="onClickLeft"
        @on-click-right="onClickRight"
      >
        <template #left>
          <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A" />
        </template>
        <template #right>
          <my-icon name="nav_ic_share" size="0.4rem" color="#1A1A1A" />
        </template>
      </sp-top-nav-bar>
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
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                  />
                </div>
                <div>
                  <h4 class="detail-content__name">王译名</h4>
                  <p class="detail-content__discript">
                    公司过户请联系我噢噢公司过户请联系我
                    噢噢公司过户请联系我噢噢公司过户请联
                  </p>
                </div>
              </div>

              <div class="detail-content__tag-list">
                <sp-tag size="large" color="#EADACD" text-color="#222222"
                  >公司过户</sp-tag
                >
                <sp-tag size="large" color="#EADACD" text-color="#222222"
                  >商标过户</sp-tag
                >
                <sp-tag size="large" color="#EADACD" text-color="#222222"
                  >股权变更</sp-tag
                >
              </div>
            </div>
            <div class="detail-content__wrap-body">
              <div class="detail-content__section-title">个人信息</div>
              <ul class="detail-content__section-content">
                <li>
                  <span class="label">服务次数：</span>
                  <span class="content">10次</span>
                </li>
                <li>
                  <span class="label">好评率：</span>
                  <span class="content">98.7%</span>
                </li>
                <li>
                  <span class="label">服务经验：</span>
                  <span class="content">小于1年</span>
                </li>
                <li>
                  <span class="label">成交记录：</span>
                  <span class="content">58次</span>
                </li>
                <li>
                  <span class="label">平均响应时间：</span>
                  <span class="content">17s</span>
                </li>
              </ul>
            </div>
            <div class="detail-content__wrap-footer">
              <div class="detail-content__section-title flex-r-sb flex-r-a-c">
                <i class="horizontal-line"></i>
                <span>薯片分</span>
                <i class="horizontal-line"></i>
              </div>
              <div class="detail-content__sp-score">440</div>
              <div class="detail-content__level">打败96%的规划师</div>
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
      <div v-if="!list || !list.length" class="recommend">
        <h3 class="recommend__title">为您推荐</h3>
        <div class="recommend-list">
          <sp-cell v-for="item in recommendList" :key="item" class="item-wrap">
            <div class="item">
              <div class="left">
                <div class="item_avatar">
                  <sp-image
                    width="1.6rem"
                    height="1.6rem"
                    fit="cover"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                  />
                </div>
                <div class="item_detail">
                  <h4>
                    <span class="item_detail--name">黄橙橙</span>
                  </h4>

                  <p class="item_detail--address">
                    顶呱呱·跳伞塔·桃源办公中心.一楼
                  </p>
                  <div class="item_detail--tag-list">
                    <sp-tag color="#F8F8F8" text-color="#999999"
                      >服务标杆</sp-tag
                    >
                    <sp-tag color="#F8F8F8" text-color="#999999"
                      >态度真诚热情</sp-tag
                    >
                  </div>
                  <div class="item_detail--data">
                    <div class="data-item">
                      <h5>95</h5>
                      <p>历史成交</p>
                    </div>
                    <div class="vertical-line"></div>
                    <div class="data-item">
                      <h5>4.9</h5>
                      <p>用户评价</p>
                    </div>
                    <div class="vertical-line"></div>
                    <div class="data-item">
                      <h5>154</h5>
                      <p>薯片分</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </sp-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  TopNavBar,
  Button,
  DropdownMenu,
  DropdownItem,
  NavSearch,
  Toast,
  PullRefresh,
  List,
  Cell,
  Image,
  Tag,
} from '@chipspc/vant-dgg'

// import CoupleSelect from '@/components/common/coupleSelected/CoupleSelect'

import { city } from '@/utils/city'

export default {
  name: 'List',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [NavSearch.name]: NavSearch,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  data() {
    return {
      recommendList: [],
      loading: false,
    }
  },
  computed: {
    city() {
      return city
    },
  },
  created() {
    this.getList()
  },
  methods: {
    onClickLeft() {
      console.log('nav onClickLeft')
    },
    onClickRight() {
      console.log('nav onClickRight')
    },
    getList() {
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.recommendList.push(this.recommendList.length + 1)
        }
        this.loading = false
      }, 1000)
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

.flex-r-c {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.flex-r-sb {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.flex-r-a-s {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.flex-r-a-c {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.detail {
  height: 100%;
  overflow-y: scroll;
  .head {
    position: sticky;
    top: 0;
    z-index: 100;
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
        /deep/.sp-tag {
          margin-left: 12px;
          font-size: 24px;
          font-weight: 400;
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
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .item-wrap {
    padding: 40px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left {
      display: flex;
      align-items: flex-start;
      flex: 1;
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
  }
}
</style>
