<template>
  <div class="m-evaluate success">
    <Header v-if="!isInApp" :hide-back="true">
      <template #right><div @click="back">完成</div></template>
    </Header>
    <div class="content-wrap">
      <sp-image round class="img" fit="cover" :src="$ossImgSetV2(avatar)" />
      <div class="tile">感谢您的评价~</div>
      <div class="desc">
        非常感谢您的评价，为我们服务质量的提升提供了宝贵意见！
      </div>
      <div v-if="isInApp" class="btn" @click="back">完成</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'

export default {
  name: 'EvaluateSucccess',
  components: {
    Header,
    [Image.name]: Image,
  },
  data() {
    return {
      avatar: 'fap9pjecawg0000.png',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  methods: {
    back() {
      this.$back()
    },
  },
}
</script>

<style lang="less" scoped>
.m-evaluate.success {
  @img-size: 140px;

  ::v-deep.slot-right {
    color: #222222;
    font: 400 32px @fontf-pfsc-reg;
    padding-right: 40px;
  }
  .content-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img {
      height: @img-size;
      width: @img-size;
      margin: 112px 0 56px;
    }
    .tile {
      font: bold 44px @fontf-pfsc-med;
      color: #1a1a1a;
      margin-bottom: 32px;
    }
    .desc {
      font: 400 28px/40px @fontf-pfsc-reg;
      color: #999999;
      text-align: center;
      margin: 0 80px;
    }
    .btn {
      width: 160px;
      height: 64px;
      line-height: 64px;
      border-radius: 6px;
      border: 1px solid #cccccc;
      font-weight: bold;
      font-size: 26px;
      color: #555555;
      text-align: center;
      margin-top: 32px;
    }
  }
}
</style>
