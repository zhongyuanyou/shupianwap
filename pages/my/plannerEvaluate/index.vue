<template>
  <div class="evaluate_container">
    <!--S 头部-->
    <Header title="评价">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.39rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <sp-center-popup
      v-model="showPop"
      button-type="confirm"
      :field="Field"
      @confirm="confirm"
      @cancel="cancel"
    />
    <!--E 头部-->
    <div class="middle_container">
      <!--S 规划师-->
      <div class="planer_container">
        <div class="planer_left">
          <img :src="avatar" alt="" />
        </div>
        <div class="planer_name">{{ plannerName }}</div>
        <div class="planer_right">已对规划师匿名</div>
      </div>
      <!--E 规划师-->
      <!--S 评分-->
      <evaluate-star :upload="false" :cinfo-id="infoId" />
      <!--E 评分-->
    </div>
    <!-- <div class="btn">
      <div class="evaluate_btn">发布评价</div>
    </div> -->
  </div>
</template>

<script>
import { CenterPopup } from '@chipspc/vant-dgg'
import { evaluateApi } from '@/api'
import Header from '@/components/common/head/header'
import EvaluateStar from '@/components/evaluate/EvaluateStar'
export default {
  layout: 'keepAlive',
  name: 'Evaluate',
  components: {
    Header,
    EvaluateStar,
    [CenterPopup.name]: CenterPopup,
  },

  data() {
    return {
      infoId: '',
      avatar: '',
      plannerName: '',
      showPop: false,
      plannerId: '',
      Field: {
        type: 'functional',
        title: '温馨提示',
        description: '差一点就评价完了，是否确认退出？',
        confirmButtonText: '继续评价',
        cancelButtonText: '操作',
      },
    }
  },
  computed: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query.plannerAvatar) {
        this.avatar = this.$route.query.plannerAvatar
      } else {
        this.getPlannerInfo()
      }
      this.plannerName = this.$route.query.plannerName || ''
      this.plannerId = this.$route.query.plannerId || ''
      this.infoId = this.$route.query.infoId
    },
    back() {
      console.log('back')
      this.showPop = true
    },
    confirm() {
      this.showPop = false
    },
    cancel() {
      this.$back()
    },
    async getPlannerInfo() {
      const params = {
        plannerId: this.$route.query.plannerId,
      }
      const res = await this.$axios.get(evaluateApi.getAvatar, { params })
      if (res.code === 200) {
        this.avatar = res.data[0].img
      } else {
        this.$xToast.error('获取头像失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .sp-center-popup {
  width: 540px;
}
::v-deep .sp-center-popup__containerConfirm {
  width: 540px;
}
::v-deep .sp-center-popup__description {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #222222;
  line-height: 40px;
  padding: 20px 40px 37px 40px !important;
  margin-top: 0 !important;
}
::v-deep .sp-center-popup__title {
  height: 48px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: blod;
  color: #1a1a1a;
  line-height: 48px;
}
.evaluate_container {
  @font-medium: PingFangSC-Medium, PingFang SC;
  @font-regular: PingFangSC-Regular, PingFang SC;
  position: relative;
  height: 100%;
  .back_icon {
    margin-left: 32px;
  }
  .middle_container {
    height: calc(100vh - 88px - 112px);
    overflow: auto;
    .planer_container {
      padding: 40px;
      display: flex;
      align-items: center;
      border-top: 1px solid #f4f4f4;
      .planer_left {
        width: 80px;
        height: 80px;
        background: #d8d8d8;
        border-radius: 50%;
        margin-right: 24px;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 50%;
        }
      }
      .planer_name {
        height: 34px;
        font: 500 34px @font-medium;
        color: #1a1a1a;
        line-height: 34px;
        margin-right: 16px;
      }
      .planer_right {
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #dddddd;
        font: 400 24px @font-regular;
        color: #999999;
        line-height: 24px;
        padding: 10px 12px;
      }
    }
  }
}
</style>
