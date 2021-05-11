<template>
  <div class="m-evaluate write">
    <Header title="评价" :fixed="true" />
    <div class="header-line"></div>
    <div class="info">
      <sp-image
        round
        class="img"
        fit="cover"
        :src="avatar"
        :width="avatarSize"
        :height="avatarSize"
      />
      <div class="name">{{ name }}</div>
      <div class="desc">已对规划师匿名</div>
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

// mock data
const avatar = 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png'
const name = '吴月茹'

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
      avatar,
      avatarSize: '0.8rem',
      name,
    }
  },
}
</script>

<style lang="less" scoped>
.m-evaluate.write {
  .mixin-flex {
    display: flex;
    align-items: center;
  }

  .header-line {
    width: 100%;
    height: 1px;
    background: #f4f4f4;
  }
  .info {
    margin: 41px 0 40px 40px;
    .mixin-flex();
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
