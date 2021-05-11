<template>
  <div class="m-evaluate detail">
    <Header title="评价详情" :fixed="true" />
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
      <div class="desc">
        <div class="name">
          <div class="name-name">{{ name }}</div>
          <div class="name-time">2020/09/19 14:00</div>
        </div>
        <div class="score">
          <div class="score-tile">服务评分</div>
          <template v-for="(item, index) in stars">
            <my-icon
              :key="index"
              class="score-icon"
              name="dafen_mian"
              size="0.22rem"
              :color="item.flag ? '#FFB400' : '#F0F0F0'"
            ></my-icon>
          </template>
          <div class="score-desc">一般</div>
        </div>
        <div class="score-sub">
          <span>专业能力:1星</span>
          <span>回复时效:3星</span>
          <span>时效效率:4星</span>
        </div>
      </div>
    </div>
    <div class="placeholder"></div>
    <div class="content">
      化妆只是注重形象的表现吧，不代表化妆了女人就靠生殖价值活着了，现在日韩男人都开始打扮甚至化妆了，难道代表这些日韩男人靠生殖价值活？不见得吧
    </div>
    <div class="tips">
      <my-icon
        class="tips-icon"
        name="biaoqian"
        size="0.24rem"
        color="#999999"
      ></my-icon>
      <div class="tips-desc">性价比高，服务质量好，办理效率高</div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import { evaluateApi } from '@/api'
// mock data
const avatar = 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png'
const name = '吴月茹'

export default {
  name: 'EvaluateDetail',
  components: {
    Header,
    [Image.name]: Image,
  },
  data() {
    return {
      avatar,
      avatarSize: '0.8rem',
      name,
      starLevel: 3, // 星级
      stars: [
        { flag: false },
        { flag: false },
        { flag: false },
        { flag: false },
        { flag: false },
      ], // flag 图标是否点亮
    }
  },
  mounted() {
    this.setStars()
    this.init()
  },
  methods: {
    async init() {
      const params = {
        infoId: '123',
      }
      const res = await this.$axios.get(evaluateApi.detail, { params })
      if (res.code === 200) {
        console.log(res)
      }
    },
    setStars() {
      // 构建星级
      const _this = this
      this.stars.forEach((item, index) => {
        if (_this.starLevel > index) {
          item.flag = true
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.m-evaluate.detail {
  .mixin-flex {
    display: flex;
  }

  .header-line {
    width: 100%;
    height: 1px;
    background: #f4f4f4;
  }
  .info {
    .mixin-flex();
    margin: 41px 0 40px 40px;
    .img {
      margin-right: 24px;
    }
    .desc {
      .name {
        .mixin-flex();
        align-items: center;
        margin-bottom: 24px;
        &-name {
          font: bold 34px @fontf-pfsc-med;
          color: #1a1a1a;
          margin-right: 262px;
        }
        &-time {
          font: 400 24px @fontf-pfsc-reg;
          color: #999999;
        }
      }
      .score {
        .mixin-flex();
        align-items: center;
        margin-bottom: 24px;
        &-tile {
          font: 400 24px @fontf-pfsc-reg;
          color: #222222;
          margin-right: 16px;
        }
        &-icon {
          margin-right: 8px;
        }
        &-desc {
          margin-left: 8px;
          font: 400 22px @fontf-pfsc-reg;
          color: #555555;
        }
      }
      .score-sub {
        .mixin-flex();
        align-items: center;
        font: 400 24px @fontf-pfsc-reg;
        color: #999999;
        span {
          display: inline-block;
          margin-right: 24px;
        }
      }
    }
  }
  .placeholder {
    height: 1px;
    background: #f4f4f4;
    margin: 0 40px;
  }
  .content {
    margin: 40px 40px 32px;
    font: 400 28px/44px @fontf-pfsc-reg;
    color: #222222;
  }
  .tips {
    .mixin-flex();
    align-items: center;
    margin-left: 40px;
    &-icon {
      margin-right: 12px;
    }
    &-desc {
      font: 400 24px/24px @fontf-pfsc-reg;
      color: #999999;
    }
  }
}
</style>
