<template>
  <div class="m-evaluate write">
    <Header v-if="!isHideH5Nav || isHideH5Nav !== '1'" title="评价">
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
    <div class="info">
      <sp-image
        square
        class="img"
        fit="cover"
        :src="avatar"
        :width="avatarSize"
        :height="avatarSize"
        radius="8px"
      />
      <div class="info_right">
        <div class="info_right_title">{{ name }}</div>
        <div class="info_right_sku">{{ orderDesc }}</div>
      </div>
    </div>
    <evaluate-star />
    <sp-center-popup
      v-model="showPop"
      button-type="confirm"
      :field="Field"
      @confirm="confirm"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { Image, CenterPopup } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import EvaluateStar from '@/components/evaluate/EvaluateStar'

export default {
  name: 'EvaluateWrite',
  components: {
    Header,
    [Image.name]: Image,
    [CenterPopup.name]: CenterPopup,
    EvaluateStar,
  },
  data() {
    return {
      avatar: '',
      avatarSize: '1.3rem',
      name: '',
      showPop: false,
      Field: {
        type: 'functional',
        title: '温馨提示',
        description: '差一点就评价完了，是否确认退出？',
        confirmButtonText: '继续评价',
        cancelButtonText: '退出',
      },
      orderDesc: '', // 评价属性
    }
  },
  computed: {
    isHideH5Nav() {
      return this.$route.query.isHideH5Nav
    },
  },
  mounted() {
    const routeInfo = this.$route.query
    this.avatar = routeInfo.indexImg
    this.name = routeInfo.orderName
    this.orderDesc = routeInfo.orderDesc
  },
  methods: {
    back() {
      this.showPop = true
    },
    confirm() {
      this.showPop = false
    },
    cancel() {
      this.$back()
    },
  },
}
</script>

<style lang="less" scoped>
@font-medium:pingfangsc-medium, PingFang SC;
@font-regular:pingfangsc-regular, PingFang SC;
::v-deep .my-head {
  border-bottom: 1px solid #f4f4f4;
}
::v-deep .sp-center-popup {
  width: 540px;
}
::v-deep .sp-center-popup__containerConfirm {
  width: 540px;
}
::v-deep .sp-center-popup__description {
  font: 400 28px @font-regular;
  color: #222222;
  line-height: 40px;
  padding: 20px 40px 37px 40px !important;
  margin-top: 0 !important;
}
::v-deep .sp-center-popup__title {
  height: 48px;
  font: bold 36px @font-medium;
  color: #1a1a1a;
  line-height: 48px;
}
.m-evaluate.write {
  .mixin-flex {
    display: flex;
  }
  .back_icon {
    margin-left: 32px;
  }
  .info {
    padding: 41px 40px 40px 40px;
    .mixin-flex();
    &_right {
      margin-left: 24px;
      width: 516px;
      &_title {
        font: bold 28px @font-medium;
        color: #222222;
        line-height: 36px;
        margin-bottom: 20px;
        .textOverflow(2);
      }
      &_sku {
        font: 400 24px @font-regular;
        color: #999999;
        line-height: 24px;
      }
    }
    .name {
      height: 34px;
      font: bold 34px/34px @fontf-pfsc-med;
      color: #1a1a1a;
      margin: 0 16px 0 24px;
    }
    .desc {
      box-sizing: border-box;
      padding: 10px 12px;
      border-radius: 4px;
      border: 1px solid #dddddd;
      font: 24px @fontf-pfsc-reg;
      color: #999999;
    }
  }
}
</style>
