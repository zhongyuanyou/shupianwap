<template>
  <!-- 侧边栏提问 -->
  <div class="sider-consult" :class="[active ? 'sider-consult--active' : '']">
    <div v-if="!active" class="inactive" @click="active = !active">
      <my-icon
        name="tap_ic_pen_s"
        size="0.12rem"
        color="#4974F5"
        class="inactive__icon"
      ></my-icon>
    </div>
    <div v-else class="active">
      <div class="active__question">
        <div class="item">
          <div class="item__txt">可以提供定制可以提供定制可以提供定制</div>
          <img :src="questionIcon" />
        </div>
        <div class="item">
          <div class="item__txt">可以提供定制可以提供定制可以提供定制</div>
          <img :src="questionIcon" />
        </div>
        <div class="item">
          <div class="item__txt">可以提供定制可以提供定制可以提供定制</div>
          <img :src="questionIcon" />
        </div>
        <div class="item">
          <div class="item__txt">可以提供定制可以提供定制可以提供定制</div>
          <img :src="questionIcon" />
        </div>
      </div>
      <div class="active__btn--wrap">
        <div class="active__btn" @click="active = !active">
          <my-icon
            name="tap_ic_pen_n"
            size="0.12rem"
            color="#4974F5"
            class="active__icon"
          ></my-icon>
          <span>提问</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goodDetail } from '~/utils/static/imgs.js'

export default {
  name: 'GoodDetailSiderConsult',
  data() {
    return {
      active: false,
      questionIcon: goodDetail['c-siderConsult-questionIcon'],
    }
  },
}
</script>

<style lang="less" scoped>
.sider-consult {
  position: fixed;
  right: 0;
  bottom: 148px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  &--active {
    right: 60px;
  }
  .inactive {
    background: #fff;
    z-index: 1;
    height: 64px;
    width: 62px;
    border: 1px solid #dddddd;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
    border-top-left-radius: 32px;
    border-bottom-left-radius: 32px;
    &__icon {
      position: absolute;
      right: 14px;
      bottom: 22px;
    }
  }
  .active {
    z-index: 1;
    &__icon {
      margin-right: 8px;
    }
    &__btn--wrap {
      width: 410px;
      display: flex;
      justify-content: end;
    }
    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      width: 132px;
      background: #fff;
      border: 1px solid #dddddd;
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
      border-radius: 32px;
      span {
        color: #1a1a1a;
        font-size: 24px;
        line-height: 33px;
      }
    }
    &__question {
      margin-bottom: 20px;
      .item {
        margin-bottom: 20px;
        width: 410px;
        height: 96px;
        background: #ffffff;
        border: 1px solid #dddddd;
        box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        padding: 0 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        &__txt {
          .mixin-text-oneoverflow();
          width: 254px;
          line-height: 40px;
          font-size: 28px;
          color: #1a1a1a;
          margin-right: 40px;
        }
        img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          flex: 1;
        }
      }
    }
  }
}
</style>
