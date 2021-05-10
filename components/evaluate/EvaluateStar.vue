<template>
  <div class="evaluateStar_container">
    <!--S 评分-->
    <div class="score">
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
      <div class="score-item">
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
    </div>
    <div class="server_evaluate">
      <div v-if="showEvaluate" class="evaluate_items">
        <div class="evaluate_item">
          <div class="evaluate_item_title">服务评价</div>
          <ul class="evaluate_ul_items">
            <li v-for="(item, index) in rateData" :key="index">
              <img :src="item.imgAdress" alt="" @click="getImageIndex(index)" />
            </li>
          </ul>
          <div class="star_span">超赞</div>
        </div>
      </div>
      <div v-if="tipsFlag" class="evaluate_label">
        <ul class="items">
          <li class="item" :class="'choose_active'">标签表情</li>
          <li class="item">标签表情</li>
          <li class="item">标签表情</li>
          <li class="item">标签表情</li>
          <li class="item">标签</li>
        </ul>
      </div>
      <div v-if="remarkFlag" class="input_box">
        <sp-field
          v-model="message"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请对规划师的服务进行评价"
          show-word-limit
        />
      </div>
      <div v-if="uploadImgFlag" class="upload">
        <sp-uploader v-model="fileList" multiple upload-icon="plus" />
      </div>
    </div>
    <!--E 评分-->
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
} from '@chipspc/vant-dgg'
import utils from '@/utils/changeBusinessData'

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
  },
  props: {
    remark: {
      // 是否评论
      type: Boolean,
      default: () => {
        return true
      },
    },
    tips: {
      // 是否标签
      type: Boolean,
      default: () => {
        return true
      },
    },
    upload: {
      // 是否上传图片
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {
      remarkFlag: this.remark,
      tipsFlag: this.tips,
      uploadImgFlag: this.upload,
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
      starValue: 0,
      message: '测试测试',
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: 'https://cloud-image', isImage: true },
      ],
      showEvaluate: false,
      rateData: [
        {
          imgAdress:
            'https://cdn.shupian.cn/sp-pt/wap/images/uihcfufviog000.png',
        },
        {
          imgAdress:
            'https://cdn.shupian.cn/sp-pt/wap/images/fqurczrer3c0000.png',
        },
        {
          imgAdress:
            'https://cdn.shupian.cn/sp-pt/wap/images/8vml2tl3zh00000.png',
        },
        {
          imgAdress:
            'https://cdn.shupian.cn/sp-pt/wap/images/u75yce9hmuo000.png',
        },
        {
          imgAdress:
            'https://cdn.shupian.cn/sp-pt/wap/images/4t6hb5mowc80000.png',
        },
      ],
      rateData1: [],
    }
  },
  watch: {
    totalStarLevel(val) {
      console.log(`output totalStarLevel: ${val}`)
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
    getImageIndex(index) {
      console.log('getImageIndex', index)
      // this.rateData1 =  this.
    },
  },
}
</script>

<style lang="less" scoped>
.evaluateStar_container {
  @font-regular: PingFangSC-Regular, PingFang SC;
  @font-medium: PingFangSC-Medium, PingFang SC;

  .mixin-score-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 32px;
  }
  .mixin-score-tile {
    font: 400 28px @font-regular;
    color: #222222;
    margin-right: 62px;
  }
  .mixin-score-desc {
    font: 400 24px @font-regular;
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
        font: bold 32px @font-medium;
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
    }
  }

  .server_evaluate {
    // padding: 0px 40px 0 40px;
    padding: 12px 40px 32px 40px;
    .evaluate_first {
      display: flex;
      align-items: center;
      padding-bottom: 16px;
      .ser_title {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 32px;
        margin-right: 40px;
      }
      ::v-deep .sp-rate__item {
        margin-right: 20px;
        padding: 0;
      }
      .star_span {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 24px;
        margin-left: 20px;
      }
    }
    .evaluate_label {
      padding: 48px 0 48px 0;
      border-bottom: 1px solid #f4f4f4;
      .items {
        display: flex;
        flex-wrap: wrap;
        .item {
          background: #f8f8f8;
          border-radius: 4px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 24px;
          padding: 16px;
          margin-right: 16px;
          margin-bottom: 16px;
        }
        .choose_active {
          color: #4974f5;
          background-color: #ecf1fe;
        }
      }
    }
    .input_box {
      padding-top: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #f4f4f4;
      ::v-deep .sp-field {
        padding: 0;
      }

      ::v-deep .sp-field__body {
        textarea {
          width: 100%;
          height: 200px !important;
          border: none;
          resize: none;
          cursor: pointer;
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #cccccc;
          line-height: 40px;
        }
      }
      ::v-deep .sp-field__word-limit {
        margin-top: 24px;
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #bbbbbb;
        line-height: 24px;
      }
    }
    .upload {
      margin-top: 40px;
      ::v-deep .sp-uploader__preview {
        margin: 0 0 16px 0;
      }
      ::v-deep .sp-uploader__preview-image {
        margin-right: 32px;
        width: 143px;
        height: 143px;
        background: #d8d8d8;
        border-radius: 8px;
      }
      ::v-deep .sp-uploader__preview-delete {
        position: absolute;
        top: -16px;
        right: 16px;
        width: 32px;
        height: 32px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
      }
      ::v-deep .sp-uploader__preview-delete-icon {
        top: 0;
        right: 0;
      }
      ::v-deep .sp-uploader__upload {
        width: 143px;
        height: 143px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #cdcdcd;
        margin: 0;
      }
      ::v-deep .sp-uploader__input {
        width: 143px;
        height: 143px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #cdcdcd;
        margin: 0 0 16px 0;
      }
    }
  }
  .evaluate_items {
    .evaluate_item {
      display: flex;
      align-items: center;
      padding: 16px 0;
      .evaluate_item_title {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
        margin-right: 62px;
      }
      .evaluate_ul_items {
        display: flex;
        li {
          width: 44px;
          height: 44px;
          margin-right: 32px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
      ::v-deep .sp-rate__item {
        margin-right: 32px;
      }
      .star_span {
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 24px;
        margin-left: 14px;
      }
    }
  }
}
</style>
