<template>
  <!-- 侧边栏提问 -->
  <div class="sider-consult">
    <div v-if="!active" class="inactive" @click="active = !active">
      <my-icon
        name="tap_ic_pen_s"
        size="0.12rem"
        color="#4974F5"
        class="inactive__icon"
      ></my-icon>
    </div>
    <sp-overlay :show="active" @click.stop="active = !active">
      <div class="active">
        <div class="active__question">
          <div
            v-for="(item, i) in tepmList"
            :key="i"
            class="item"
            @click="toIM(item)"
          >
            <div class="item__txt">{{ item.content }}</div>
            <img :src="questionIcon" />
          </div>
        </div>
        <div class="active__btn--wrap">
          <div class="active__btn">
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
    </sp-overlay>
  </div>
</template>

<script>
import { Overlay } from '@chipspc/vant-dgg'
import { goodDetail } from '~/utils/static/imgs.js'
import imHandle from '~/mixins/imHandle'
import { productDetailsApi } from '~/api'

export default {
  name: 'GoodDetailSiderConsult',
  components: {
    [Overlay.name]: Overlay,
  },
  mixins: [imHandle],
  data() {
    return {
      active: false,
      questionIcon: goodDetail['c-siderConsult-questionIcon'],
      tepmList: [
        { content: '可以提供定制可以提供定制可以提供定制' },
        { content: '可以提供定制可以提供定制可以提供定制' },
        { content: '可以提供定制可以提供定制可以提供定制' },
        { content: '可以提供定制可以提供定制可以提供定制' },
      ],
    }
  },
  computed: {
    recPlanner() {
      return this.$store.state.planner.recodBottomPlanner
    },
    sellingGoodsData() {
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
  },
  mounted() {
    this.productInformationContent()
  },
  methods: {
    toIM(item) {
      this.sendTextMessage(this.recPlanner.mchUserId)
    },
    async productInformationContent() {
      try {
        const key = this.sellingGoodsData.classCodeLevel.split(',')
        const params = {
          page: 1,
          limit: 4,
          twoLevelCategoryCode: key[1],
          contentType: 1,
        }
        const { data, code, message } = await this.$axios.get(
          productDetailsApi.productInformationContent,
          { params }
        )
        if (code !== 200) {
          throw new Error(message)
        }
        if (data.rows.length) {
          this.tepmList = data
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.sider-consult {
  ::v-deep.sp-overlay {
    background-color: unset;
  }
  position: fixed;
  right: 0;
  bottom: 148px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
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
    position: fixed;
    right: 60px;
    bottom: 148px;
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
