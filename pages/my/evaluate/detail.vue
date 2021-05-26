<template>
  <div class="m-evaluate detail">
    <Header title="评价详情" :fixed="true" />
    <div class="header-line"></div>
    <div class="info">
      <sp-image
        square
        class="img"
        fit="cover"
        :src="indexImg"
        :width="imageSize"
        :height="imageSize"
        radius="8px"
      />
      <div class="info_right">
        <div class="info_right_title">{{ orderName }}</div>
        <div class="info_right_sku">{{ orderDesc }}</div>
      </div>
    </div>
    <div class="score">
      <div class="score-block">
        <div class="score-block-tile">服务评分</div>
        <template v-for="(item, index) in stars">
          <my-icon
            :key="index"
            class="score-block-icon"
            name="dafen_mian"
            size="0.22rem"
            :color="item.flag ? '#FFB400' : '#F0F0F0'"
          ></my-icon>
        </template>
        <div class="score-block-desc">
          {{
            starLevel === 1
              ? '非常差'
              : starLevel === 2
              ? '差'
              : starLevel === 3
              ? '一般'
              : starLevel === 4
              ? '好'
              : starLevel === 5
              ? '非常好'
              : ''
          }}
        </div>
      </div>
      <div class="score-time">{{ evaluateTime }}</div>
    </div>
    <div class="score-sub">
      <span v-for="(item, index) in evaluateDimensionList" :key="index"
        >{{ item.name }}:&nbsp;{{
          item.fraction === 1
            ? '1星'
            : item.fraction === 2
            ? '2星'
            : item.fraction === 3
            ? '3星'
            : item.fraction === 4
            ? '4星'
            : item.fraction === 5
            ? '5星'
            : ''
        }}</span
      >
    </div>
    <div class="placeholder"></div>
    <div class="content">
      {{ evaluateContent }}
    </div>
    <div class="imgs">
      <sp-image
        v-for="(item, index) in evaluateImgs"
        :key="index"
        square
        class="img"
        fit="cover"
        :src="item"
        :width="size"
        :height="size"
        radius="8px"
      />
    </div>
    <div v-if="evaluateTagFlag" class="tips">
      <my-icon
        class="tips-icon"
        name="biaoqian"
        size="0.24rem"
        color="#999999"
      ></my-icon>
      <div class="tips-desc">
        <p>{{ evaluateTagList }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import { evaluateApi } from '@/api'
// mock data

export default {
  layout: 'keepAlive',
  name: 'EvaluateDetail',
  components: {
    Header,
    [Image.name]: Image,
  },
  data() {
    return {
      evaluateImgs: [],
      imgs: '',
      orderDesc: '',
      indexImg: '',
      imageSize: '1.3rem',
      size: '2.1rem',
      orderName: '',
      starLevel: 1, // 星级
      stars: [
        { flag: false },
        { flag: false },
        { flag: false },
        { flag: false },
        { flag: false },
      ], // flag 图标是否点亮
      evaluateContent: '',
      evaluateTagList: '',
      evaluateTagFlag: false,
      evaluateDimensionList: [],
      serverScore: 0, // 服务分
      evaluateTime: '',
    }
  },
  mounted() {
    this.init()
    this.setStars()
  },
  methods: {
    init() {
      this.getEvaluateDetail()
      this.initData()
    },
    async getEvaluateDetail() {
      const params = {
        infoId: this.$route.query.infoId,
        userId: this.$store.state.user.userId,
      }
      const res = await this.$axios.get(evaluateApi.detail, { params })
      if (res.code === 200) {
        this.evaluateContent = res.data.evaluateContent
        if (res.data.evaluateTagList.length > 0) {
          this.evaluateTagList = (
            res.data.evaluateTagList.map((item) => {
              return item.name
            }) || []
          ).join(', ')
          this.evaluateTagFlag = true
        }

        this.evaluateDimensionList = res.data.evaluateDimensionList
        this.evaluateImgs = res.data.evaluateImgs || []
        this.evaluateTime = res.data.evaluateTime
        if (res.data.serverScore) {
          this.starLevel = res.data.serverScore
          this.setStars()
        }
      } else {
        this.$xToast.show({ message: '获取信息失败' })
      }
    },
    initData() {
      this.indexImg = this.$route.query.indexImg
      this.orderName = this.$route.query.orderName
      this.orderDesc = this.$route.query.orderDesc
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
@font-medium:pingfangsc-medium, PingFang SC;
@font-regular:pingfangsc-regular, PingFang SC;
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
    padding: 41px 40px 24px 40px;
    .mixin-flex();
    &_right {
      margin-left: 24px;
      width: 516px;
      &_title {
        font: bold 28px/36px @font-medium;
        color: #222222;
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
  .score {
    padding: 0 40px;
    .mixin-flex();
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    &-block {
      .mixin-flex();
      align-items: center;
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
    &-time {
      font: 400 0.24rem @font-regular;
      color: #999999;
    }
  }
  .score-sub {
    padding: 0 40px 40px 40px;
    .mixin-flex();
    align-items: center;
    font: 400 24px @fontf-pfsc-reg;
    color: #999999;
    span {
      display: inline-block;
      margin-right: 24px;
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
  .imgs {
    .mixin-flex();
    padding: 0 40px;
    margin-bottom: 24px;
    ::v-deep .img {
      margin: 0 20px 0 0;
    }
    ::v-deep .img:nth-last-child(1) {
      margin: 0;
    }
  }
  .tips {
    padding: 0 40px;
    position: relative;
    &-icon {
      position: absolute;
      top: 8px;
    }
    &-desc {
      margin-left: 36px;
      font: 400 24px/40px @fontf-pfsc-reg;
      color: #999999;
    }
  }
}
</style>
