<template>
  <div
    v-md:p_plannerBoothClick
    data-even_name="p_plannerBoothClick"
    :data-track_code="isInApp ? 'SPP001112' : 'SPW000112'"
    :data-recommend_number="itemData.dggPlannerRecomLog || ''"
    :data-planner_number="itemData.userCenterNo"
    :data-planner_name="itemData.userName"
    :data-crisps_fraction="itemData.point"
    class="planner-search-item"
    @click.stop="handleClick('detail')"
  >
    <div class="left">
      <div class="planner-search-item__avatar">
        <sp-image
          width="1.2rem"
          height="1.6rem"
          fit="cover"
          class="planner-search-item__avatar-image"
          lazy-load
          :src="$resizeImg(320, 320, itemData.img || PlannerHeadList)"
        />
      </div>
      <div class="planner-search-item__detail">
        <h4>
          <span class="planner-search-item__detail-name">{{
            itemData.userName || itemData.mchUserName
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
import { PlannerHeadList } from '~/config/constant'
import { planner } from '@/api'
import imHandle from '@/mixins/imHandle'
import { parseTel } from '~/utils/common'
export default {
  name: 'PlannerSearchItem',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [Tag.name]: Tag,
  },
  mixins: [imHandle],
  props: {
    itemData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      PlannerHeadList,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
    formatTagList() {
      if (!Array.isArray(this.itemData.tagList)) return []
      const formatData = this.itemData.tagList.slice(0, 5)
      return formatData
    },
    city() {
      return this.$store.state.city.currentCity
    },
  },
  // async mounted() {
  //   if (!this.city.code) {
  //     await this.POSITION_CITY({ type: 'init' })
  //   }
  // },
  methods: {
    async handleClick(type) {
      let data = {}
      // 添加埋点
      if (type === 'IM' || type === 'tel') {
        window.spptMd.spptTrackRow('p_IMClick', {
          track_code: this.isInApp ? 'SPP001113' : 'SPW000113',
          im_type: '售前',
          planner_number: this.itemData.userCenterNo,
          planner_name: this.itemData.userName,
          crisps_fraction: this.itemData.point,
          recommend_number: this.itemData.dggPlannerRecomLog || '',
        })
      }
      switch (type) {
        case 'IM':
          data = {
            mchUserId: this.itemData.mchUserId,
            userCenterId: this.itemData.userCenterId,
            mchDetailId: this.itemData.mchDetailId,
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
      this.$xToast.show({
        message: '为了持续为您提供服务，规划师可能会主动联系您',
        duration: 2000,
        forbidClick: true,
      })
      await planner.awaitTip()

      if (this.isInApp) {
        this.$appFn.dggBindHiddenPhone(
          { plannerId: this.itemData.mchUserId },
          (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast.show({
                message: '拨号失败！',
                duration: 1000,
                forbidClick: true,
                icon: 'toast_ic_remind',
              })
            }
          }
        )
      } else {
        // const isLogin = await this.judgeLoginMixin()
        // if (isLogin) {
        console.log(this.$store.state.user)
        const params = {
          areaCode: this.city.code,
          areaName: this.city.name,
          customerUserId: this.$store.state.user.userId,
          customerId: this.$store.state.user.customerID || '',
          plannerId: this.itemData.mchUserId,
          customerPhone:
            this.$store.state.user.mainAccountFull ||
            this.$cookies.get('mainAccountFull', { path: '/' }) ||
            '',
          requireCode: '',
          requireName: '',
        }
        try {
          const data = await planner.newtel(params)
          console.log(data)
          return data
        } catch (error) {
          console.error('getTel:', error)
          return Promise.reject(error)
        }
        // }
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
