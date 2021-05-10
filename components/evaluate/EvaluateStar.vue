<template>
  <div class="evaluateStar_container">
    <div v-if="scoreFlag" class="score">
      <div class="score-total">
        <div class="tile">服务评分</div>
        <template v-for="(item, index) in totalStars">
          <my-icon
            :key="index"
            class="score-total-icon"
            name="dafen_mian"
            size="0.56rem"
            :color="item.flag ? '#FFB400' : '#F0F0F0'"
            @click.native="clkItemStar(index, 'totalStarLevel')"
          ></my-icon>
        </template>
        <div class="desc">超赞</div>
      </div>
      <template v-if="subScoreFlag">
        <div class="score-item">
          <div class="tile">专业能力</div>
          <template v-for="(item, index) in specialtyStars">
            <img
              :key="index"
              :src="item.src"
              class="score-item-img"
              @click="clkItemStar(index, 'specialtyStarLevel')"
            />
          </template>
          <div class="desc">超赞</div>
        </div>
        <div class="score-item">
          <div class="tile">回复时效</div>
          <template v-for="(item, index) in replayStars">
            <img
              :key="index"
              :src="item.src"
              class="score-item-img"
              @click="clkItemStar(index, 'replayStarLevel')"
            />
          </template>
          <div class="desc">超赞</div>
        </div>
        <div class="score-item bottom-del">
          <div class="tile">时效效率</div>
          <template v-for="(item, index) in efficiencyStars">
            <img
              :key="index"
              :src="item.src"
              class="score-item-img"
              @click="clkItemStar(index, 'efficiencyStarLevel')"
            />
          </template>
          <div class="desc">超赞</div>
        </div>
      </template>
    </div>
    <div v-if="tipsFlag" class="tips">
      <div v-for="(item, index) in tips" :key="index" class="item">
        {{ item }}
      </div>
    </div>

    <div v-if="remarkFlag" class="remark">
      <sp-field
        v-model="message"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请对规划师的服务进行评价~"
        show-word-limit
      />
    </div>
    <div v-if="uploadImgFlag" class="upload">
      <sp-uploader
        v-model="uploader"
        :max-count="3"
        multiple
        upload-icon="plus"
      ></sp-uploader>
    </div>
    <div class="placeholder"></div>
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-button
        type="primary"
        color="#4974F5"
        text="发布评价"
        @click="submit"
      />
    </sp-bottombar>
  </div>
</template>

<script>
import {
  Tab,
  Tabs,
  Icon,
  TopNavBar,
  Toast,
  Field,
  Uploader,
  Button,
  Bottombar,
  BottombarButton,
} from '@chipspc/vant-dgg'
import utils from '@/utils/changeBusinessData'

// mock data
const mockTipsData = ['标签表情', '标签表情', '标签表情']

export default {
  name: 'EvaluateStar',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
  },
  props: {
    score: {
      // 是否显示评分
      type: Boolean,
      default: () => {
        return true
      },
    },
    tip: {
      // 是否标签
      type: Boolean,
      default: () => {
        return true
      },
    },
    remark: {
      // 是否评论
      type: Boolean,
      default: () => {
        return true
      },
    },
    upload: {
      // 是否上传图片
      type: Boolean,
      default: () => {
        return true
      },
    },
  },
  data() {
    return {
      scoreFlag: this.score,
      tipsFlag: this.tip,
      remarkFlag: this.remark,
      uploadImgFlag: this.upload,
      subScoreFlag: false,
      imgs: ['vbad', 'bad', 'normal', 'happy', 'vhappy'],
      imglights: [
        'vbadlight',
        'badlight',
        'normallight',
        'happylight',
        'vhappylight',
      ],
      totalStarLevel: 0, // 总得分
      specialtyStarLevel: 0, // 专业分
      replayStarLevel: 0, // 回答分
      efficiencyStarLevel: 0, // 效率分
      totalStars: [
        // 总得分
        { flag: false },
        { flag: false },
        { flag: false },
        { flag: false },
        { flag: false },
      ],
      specialtyStars: [],
      replayStars: [],
      efficiencyStars: [],
      tips: mockTipsData,
      starValue: 0,
      message: '',
      uploader: [],
    }
  },
  watch: {
    totalStarLevel(val) {
      console.log(`output totalStarLevel: ${val}`)
      if (val !== 0) {
        this.subScoreFlag = true
      }
      if (val === 0) {
        this.specialtyStarLevel = 0
        this.replayStarLevel = 0
        this.efficiencyStarLevel = 0
      }
      if (val === 5) {
        this.specialtyStarLevel = 5
        this.replayStarLevel = 5
        this.efficiencyStarLevel = 5
      }
      this.setTotalStars()
    },
    specialtyStarLevel(val) {
      console.log(`output specialtyStarLevel: ${val}`)
      this.setItemStar('specialtyStars', 'specialtyStarLevel')
    },
    replayStarLevel(val) {
      console.log(`output replayStarLevel: ${val}`)
      this.setItemStar('replayStars', 'replayStarLevel')
    },
    efficiencyStarLevel(val) {
      console.log(`output efficiencyStarLevel: ${val}`)
      this.setItemStar('efficiencyStars', 'efficiencyStarLevel')
    },
  },
  created() {
    this.init()
    console.log(JSON.stringify(this.specialtyStars))
  },
  methods: {
    init() {
      const _this = this
      this.imgs.forEach((item) => {
        this.specialtyStars.push({
          src: _this.$ossImgSetV2(utils.getEvaluateLevelImg(item)),
        })
        this.replayStars.push({
          src: _this.$ossImgSetV2(utils.getEvaluateLevelImg(item)),
        })
        this.efficiencyStars.push({
          src: _this.$ossImgSetV2(utils.getEvaluateLevelImg(item)),
        })
      })
    },
    setTotalStars() {
      const _this = this
      this.totalStars.forEach((item, index) => {
        if (_this.totalStarLevel > index) {
          item.flag = true
        } else {
          item.flag = false
        }
      })
    },
    setItemStar(starFlag, levelFlag) {
      const _this = this
      this[starFlag].forEach((item, index) => {
        if (_this[levelFlag] > index) {
          item.src = _this.$ossImgSetV2(
            utils.getEvaluateLevelImg(_this.imglights[_this[levelFlag] - 1])
          )
        } else {
          item.src = _this.$ossImgSetV2(
            utils.getEvaluateLevelImg(_this.imgs[index])
          )
        }
      })
    },
    clkItemStar(i, val) {
      const tempI = i + 1
      if (this[val] === 0 && tempI === 1) {
        this[val] = 1
      } else if (this[val] === tempI) {
        this[val]--
      } else {
        this[val] = tempI
      }
    },
    submit() {
      console.log('submit')
    },
  },
}
</script>

<style lang="less" scoped>
.evaluateStar_container {
  .mixin-flex {
    display: flex;
  }
  .mixin-score-item {
    .mixin-flex();
    position: relative;
    margin-bottom: 32px;
    align-items: center;
  }
  .mixin-score-tile {
    font: 400 28px @fontf-pfsc-reg;
    color: #222222;
    margin-right: 62px;
  }
  .mixin-score-desc {
    font: 400 24px @fontf-pfsc-reg;
    color: #555555;
    position: absolute;
    right: 0;
  }

  .score {
    padding: 0 94px 0 40px;
    &-total {
      .mixin-score-item();
      width: 100%;
      .tile {
        font: bold 32px @fontf-pfsc-med;
        color: #222222;
        margin-right: 40px;
      }
      .desc {
        .mixin-score-desc();
      }
      &-icon {
        margin-right: 20px;
      }
    }
    &-item {
      .mixin-score-item();
      width: 100%;
      .tile {
        .mixin-score-tile();
      }
      .desc {
        .mixin-score-desc();
      }
      &-img {
        height: 44px;
        width: 44px;
        margin-right: 32px;
      }
      &.bottom-del {
        margin-bottom: 0;
      }
    }
  }

  .tips {
    .mixin-flex();
    flex-wrap: wrap;
    padding: 0 94px 0 40px;
    margin-top: 64px;
    .item {
      .mixin-text-oneoverflow();
      font: 400 24px @fontf-pfsc-reg;
      color: #222222;
      box-sizing: border-box;
      padding: 16px;
      background: #f8f8f8;
      border-radius: 4px;
      margin: 0 16px 16px 0;
      min-width: 128px;
      max-width: 176px;
      &.z-active {
        color: #4974f5;
        background: rgba(73, 116, 245, 0.1);
      }
    }
  }

  .remark {
    margin-top: 105px;
    padding: 0 40px;
    ::v-deep.sp-field {
      padding: 0;
      font: 400 28px/40px @fontf-pfsc-reg;
      color: #222222;
      .sp-field__body {
        textarea {
          min-height: 200px;
        }
      }
    }
  }

  .upload {
    margin-top: 65px;
    padding: 0 40px;
    ::v-deep.sp-uploader__wrapper {
      .sp-uploader__preview {
        margin: 0 32px 0 0;
        .sp-uploader__preview-image {
          width: 143px;
          height: 143px;
          background: #d8d8d8;
          border-radius: 8px;
        }
      }
      .sp-uploader__upload {
        width: 143px;
        height: 143px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #cdcdcd;
        margin: 0;
        .sp-icon-plus {
          font: 40px;
          color: #999999;
        }
      }
      .sp-uploader__preview-delete {
        width: 32px;
        height: 32px;
        top: -16px;
        right: -16px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        .sp-icon-cross {
          top: -8px;
          right: -8px;
        }
      }
    }
    ::v-deep.sp-uploader__preview-delete-icon {
      font-size: 48px;
    }
  }

  .placeholder {
    width: 100%;
    height: 140px;
  }

  ::v-deep .sp-bottombar {
    padding: 0 40px 24px;
    height: 88px;
    .sp-button {
      font: bold 32px/45px @fontf-pfsc-med;
      border-radius: 8px;
      color: #ffffff;
      width: 100%;
    }
  }
}
</style>
