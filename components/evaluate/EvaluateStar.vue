<template>
  <div class="evaluateStar_container">
    <div v-if="scoreFlag && !additional" class="score">
      <div class="score-total">
        <div class="tile">服务评分</div>
        <template v-for="(item, index) in totalStars">
          <my-icon
            :key="index"
            class="score-total-icon"
            :class="index === 4 ? 'z-last' : ''"
            name="dafen_mian"
            size="0.56rem"
            :color="item.flag ? '#FFB400' : '#F0F0F0'"
            @click.native="clkTotalStar(index, 'totalStarLevel')"
          ></my-icon>
        </template>
        <div class="desc">{{ totalStarLevel | fliterLevel }}</div>
      </div>
      <template v-if="subScoreFlag">
        <div
          v-for="(item, index) in evaluateDimensionList"
          :key="index"
          class="score-item"
        >
          <div class="tile">{{ item.name }}</div>
          <template v-for="(itemImg, indexImg) in item.imgs">
            <img
              :key="indexImg"
              :src="itemImg.src"
              class="score-item-img"
              :class="[indexImg === 4 ? 'z-last' : '']"
              @click="clkItemStar(indexImg, item)"
            />
          </template>
          <div class="desc">{{ item.fraction | fliterLevel }}</div>
        </div>
      </template>
    </div>
    <div v-if="tipsFlag && subScoreFlag && !additional" class="tips">
      <div
        v-for="(item, index) in tips"
        :key="index"
        class="item"
        :class="[item.flag ? 'z-active' : '']"
        @click="clkTip(item)"
      >
        {{ item.name }}
      </div>
    </div>

    <div v-if="subScoreFlag" class="line"></div>

    <div v-if="remarkFlag && subScoreFlag" class="remark">
      <sp-field
        v-model="evaluateContent"
        autosize
        type="textarea"
        :maxlength="maxLength"
        placeholder="请对服务进行评价~"
        show-word-limit
      >
        <template v-if="supportAnonymous && !additional" #button>
          <sp-checkbox v-model="anonymousFlag">匿名</sp-checkbox>
        </template>
      </sp-field>
    </div>

    <div class="line-upload"></div>

    <div v-if="uploadImgFlag && subScoreFlag" class="upload">
      <client-only>
        <spMobileUpload
          ref="SpUpLoad"
          upload-icon="plus"
          :file-id="evaluateFileId"
          :list-url="CONFIG.listUrl"
          :delete-url="CONFIG.deleteUrl"
          :call-back-url="CONFIG.callBackUrl"
          :max-count="5"
          :max-size="5 * 1024 * 1024"
          @onSuccess="success"
          @onDeleted="deleted"
          @oversize="onOversize"
        />
      </client-only>
    </div>
    <div class="placeholder"></div>
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-button
        :class="[submitFlag || additional ? '' : 'z-inactive']"
        type="primary"
        color="#4974F5"
        text="发布评价"
        @click="submit"
      />
    </sp-bottombar>
    <loading-center v-show="loading" />
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
  Checkbox,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import utils from '@/utils/changeBusinessData'
import { evaluateApi, userinfoApi } from '@/api'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import config from '@/config'

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
    [Checkbox.name]: Checkbox,
    LoadingCenter,
  },
  filters: {
    fliterLevel(val) {
      const txts = ['', '非常差', '差', '一般', '好', '非常好']
      return txts[val]
    },
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
    txtMaxLength: {
      type: String,
      default: '500',
    },
  },
  data() {
    return {
      infoId: '', // 评价id
      scoreFlag: this.score,
      tipsFlag: this.tip,
      remarkFlag: this.remark,
      uploadImgFlag: this.upload,
      maxLength: this.txtMaxLength,
      subScoreFlag: false,
      loading: false, // 加载效果状态
      imgs: ['vbad', 'bad', 'normal', 'happy', 'vhappy'],
      imglights: [
        'vbadlight',
        'badlight',
        'normallight',
        'happylight',
        'vhappylight',
      ],
      totalStarLevel: 0, // 总得分
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
      tips: [],
      evaluateContent: '',
      uploader: [],
      evaluateDimensionList: [], // 评价维度列表
      evaluateFileId: '',
      CONFIG: config,
      imgLength: 0, // 图片数量
      anonymousFlag: false, // 匿名标识
      supportAnonymous: 0, // 是否支持匿名评价
      /* start:  追评添加字段 */
      additional: 0, // 追评标识
      submitEvaluateId: '', // 追评id
      createrId: '', // 追评需要字段,创建id
      createrName: '', // 追评需要字段,创建名称
      /* end:  追评添加字段 */
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
    submitFlag() {
      // check 服务评分
      if (this.totalStarLevel === 0) {
        return false
      }
      // check 维度评分
      if (
        this.evaluateDimensionList.some((item) => {
          return item.fraction === 0
        })
      ) {
        return false
      }
      /*
      // check 评价内容
      if (this.evaluateContent.trim() === '') {
        return false
      }
      // check 图片
      if (this.uploadImgFlag && this.imgLength === 0) {
        return false
      }
      */
      return true
    },
  },
  watch: {
    totalStarLevel(val) {
      if (val !== 0) {
        this.subScoreFlag = true
      }
      if (val === 5) {
        this.evaluateDimensionList.forEach((item) => {
          item.fraction = 5
        })
      }
      this.setItemsStar()
      this.itemRender()
      this.setTotalStars()
    },
  },
  mounted() {
    if (this.$route.query.additional === '1') {
      // 追评逻辑
      this.additional = 1
      this.submitEvaluateId = this.$route.query.addEvaluateId
      this.createrId = this.$route.query.createrId
      this.createrName = this.$route.query.createrName
      this.subScoreFlag = true
      this.getFileIdApi()
    } else {
      // 首评逻辑
      this.infoId = this.$route.query.infoId
      this.getEvaluateDetailApi()
    }
  },
  methods: {
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
    setItemStar(item1) {
      const _this = this
      item1.imgs.forEach((item, index) => {
        if (item1.fraction > index) {
          item.src = _this.$ossImgSetV2(
            utils.getEvaluateLevelImg(_this.imglights[item1.fraction - 1])
          )
        } else {
          item.src = _this.$ossImgSetV2(
            utils.getEvaluateLevelImg(_this.imgs[index])
          )
        }
      })
    },
    setItemsStar() {
      const _this = this
      this.evaluateDimensionList.forEach((item1) => {
        item1.imgs.forEach((item, index) => {
          if (item1.fraction > index) {
            item.src = _this.$ossImgSetV2(
              utils.getEvaluateLevelImg(_this.imglights[item1.fraction - 1])
            )
          } else {
            item.src = _this.$ossImgSetV2(
              utils.getEvaluateLevelImg(_this.imgs[index])
            )
          }
        })
      })
    },
    clkTotalStar(i, val) {
      const tempI = i + 1
      if (this[val] === 0 && tempI === 1) {
        this[val] = 1
      } else if (this[val] === tempI) {
        this[val]--
      } else {
        this[val] = tempI
      }
    },
    clkItemStar(i, item) {
      const tempI = i + 1
      if (item.fraction === 0 && tempI === 1) {
        item.fraction = 1
      } else if (item.fraction === tempI) {
        item.fraction--
      } else {
        item.fraction = tempI
      }
      this.setItemStar(item)
      this.itemRender()
    },
    itemRender() {
      // 解决循环渲染问题
      this.evaluateDimensionList = this.evaluateDimensionList.slice()
    },
    initItemsStar() {
      // 初始化渲染 evaluateDimensionList 中图片
      const _this = this
      this.evaluateDimensionList.forEach((item) => {
        item.imgs = []
        item.fraction = 0
        this.imgs.forEach((itemImg) => {
          item.imgs.push({
            src: _this.$ossImgSetV2(utils.getEvaluateLevelImg(itemImg)),
          })
        })
      })
    },
    initTips() {
      this.tips.forEach((item) => {
        item.flag = false
      })
    },
    onOversize() {
      this.$xToast.error('文件大小不能超过5M')
    },
    checkSubmit() {
      // check 服务评分
      if (this.totalStarLevel === 0) {
        this.$xToast.error('请选择服务评分哦')
        return false
      }
      // check 维度评分
      if (
        this.evaluateDimensionList.some((item) => {
          return item.fraction === 0
        })
      ) {
        this.$xToast.error('维度评分不能为空哦')
        return false
      }
      /*
      // check 评价内容
      if (this.evaluateContent.trim() === '') {
        this.$xToast.error('评价内容不能为空')
        return false
      }
      // check 图片
      if (this.uploadImgFlag && this.imgLength === 0) {
        this.$xToast.error('请上传图片')
        return false
      }
      */
      return true
    },
    submit() {
      if (this.additional === 1) {
        // 追评提交逻辑
        const params = {
          id: this.userId,
        }
        this.$axios.get(userinfoApi.info, { params }).then((res) => {
          if (res.code === 200) {
            this.additionalEvaluateApi(res.data)
          }
        })
      } else {
        // 首评提交逻辑
        const checkResult = this.checkSubmit()
        if (checkResult) {
          this.addEvaluateApi()
        }
      }
    },
    async getFileIdApi() {
      try {
        const { data, code } = await this.$axios.post(evaluateApi.reviewFileId)
        if (code !== 200) {
          throw new Error('查询追评fileid出错')
        }
        this.evaluateFileId = data.reviewReplyFileId
      } catch (e) {
        this.$xToast.error('查询追评fileid出错')
      }
    },
    async getEvaluateDetailApi() {
      try {
        // 提交评价前 查询前置接口
        const params = {
          infoId: this.infoId,
        }
        const { code, data } = await this.$axios.get(evaluateApi.detail, {
          params,
        })
        if (code !== 200) {
          throw new Error('请求接口失败.')
        }
        // 对评分item和tag进行赋值
        this.evaluateDimensionList = data.evaluateDimensionList
        this.tips = data.evaluateTagList
        this.evaluateFileId = data.evaluateFileId || ''
        // 赋值是否匿名
        this.supportAnonymous = data.choiceSupportAnonymous
          ? data.choiceSupportAnonymous
          : 0
        this.initItemsStar()
        this.initTips()
      } catch (e) {
        const _this = this
        this.$xToast.error('查询信息失败')
        setTimeout(() => {
          _this.$router.replace({ path: '/my/evaluate' })
        }, 2000)
      }
    },
    async addEvaluateApi() {
      try {
        this.loading = true
        const params = {
          infoId: this.infoId,
          evaluateContent: this.evaluateContent,
          serverScore: this.totalStarLevel * 2 + '', // 分数传值需要*2
          evaluateDimensionList: this.buildEvaluateDimensionList(),
          evaluateTagList: this.buildTips(),
          sourceSyscode: this.CONFIG.SYS_CODE,
          choiceAnonymous: this.anonymousFlag ? 1 : 0, // 添加是否匿名
        }
        // 如果有图片,则添加图片参数
        if (this.uploadImgFlag) {
          params.evaluateFileId = this.evaluateFileId
        }
        const { code, data } = await this.$axios.post(evaluateApi.add, params)
        this.loading = false
        if (code !== 200) {
          this.$xToast.error(data.error || '评价失败')
          return
        }
        this.$router.replace({ path: '/my/evaluate/success' })
      } catch (e) {
        this.loading = false
        this.$xToast.error('评价失败')
      }
    },
    // 追评接口
    async additionalEvaluateApi(info) {
      try {
        this.loading = true
        const params = {
          submitEvaluateId: this.submitEvaluateId,
          reviewReplyContent: this.evaluateContent,
          sourceSyscode: this.CONFIG.SYS_CODE,
          reviewReplyType: 1, // 追评回复类型:1是追评;2:是回复
          userId: info.id, // 追评/回复人ID
          userCode: info.no, // 追评/回复人工号
          userName: info.fullName, // 追评/回复人名称
          createrId: this.createrId, // 创建人
          createrName: this.createrName, // 姓名/工号
        }
        // 如果有图片,则添加图片参数
        if (this.uploadImgFlag) {
          params.reviewReplyFileId = this.evaluateFileId
        }
        const { code, data } = await this.$axios.post(
          evaluateApi.addReview,
          params
        )
        this.loading = false
        if (code !== 200) {
          this.$xToast.error(data.error || '评价失败')
          return
        }
        this.$router.replace({ path: '/my/evaluate/success' })
      } catch (e) {
        this.loading = false
        this.$xToast.error('评价失败')
      }
    },
    buildEvaluateDimensionList() {
      // 这里通过map构建数据,不要改变之前数组结构
      return this.evaluateDimensionList.map((item) => {
        return {
          fraction: item.fraction * 2 + '', // 分数传值需要*2
          id: item.id,
          name: item.name,
        }
      })
    },
    buildTips() {
      if (this.tips.length === 0) {
        return []
      }
      const tips = this.tips.filter((item) => {
        return item.flag
      })
      if (tips.length === 0) {
        return []
      }
      tips.forEach((item) => {
        delete item.flag
      })
      return tips
    },
    clkTip(item) {
      item.flag = !item.flag
      this.tips = this.tips.slice()
    },
    success(list) {
      this.imgLength = this.$refs.SpUpLoad.getFilList.length
    },
    deleted(list) {
      this.imgLength = this.$refs.SpUpLoad.getFilList.length
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
  .mixin-score-desc {
    margin-left: 32px;
    font: 400 24px @fontf-pfsc-reg;
    color: #555555;
  }

  .score {
    padding: 0 0 0 40px;
    &-total {
      .mixin-score-item();
      width: 100%;
      .tile {
        width: 175px;
        margin-right: 32px;
        font: bold 32px @fontf-pfsc-med;
        color: #222222;
      }
      .desc {
        .mixin-score-desc();
      }
      &-icon {
        margin-right: 20px;
        &.z-last {
          margin-right: 0;
        }
      }
    }
    &-item {
      .mixin-score-item();
      width: 100%;
      .tile {
        font: 400 28px @fontf-pfsc-reg;
        color: #222222;
        width: 175px;
        margin-right: 32px;
        .mixin-text-oneoverflow();
      }
      .desc {
        .mixin-score-desc();
      }
      &-img {
        height: 56px;
        width: 56px;
        margin-right: 20px;
        &.z-last {
          margin-right: 0;
        }
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
    margin-top: 48px;
    .item {
      font: 400 24px @fontf-pfsc-reg;
      color: #222222;
      height: 56px;
      line-height: 56px;
      text-align: center;
      background: #f8f8f8;
      border-radius: 4px;
      margin-right: 16px;
      margin-top: 16px;
      padding: 0 16px;
      &.z-active {
        color: #4974f5;
        background: rgba(73, 116, 245, 0.1);
      }
    }
  }

  .line {
    border-bottom: 1px solid #f4f4f4;
    margin: 64px 40px 40px 40px;
  }

  .remark {
    padding: 0 40px;
    ::v-deep.sp-field {
      padding: 0;
      font: 400 28px/40px @fontf-pfsc-reg;
      color: #222222;
      position: relative;
      .sp-field__body {
        textarea {
          min-height: 200px;
        }
      }
      .sp-field__button {
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .sp-checkbox__label {
        margin-left: 8px;
        color: #222;
        font-size: 28px;
        line-height: 1;
      }
    }
  }

  .line-upload {
    border-bottom: 1px solid #f4f4f4;
    margin: 40px;
  }

  .upload {
    padding: 0 40px;

    ::v-deep.van-uploader__wrapper {
      .van-uploader__preview {
        margin: 0 32px 32px 0;
        .van-uploader__preview-image {
          width: 143px;
          height: 143px;
          background: #d8d8d8;
          border-radius: 8px;
        }
      }
      div:nth-child(4n + 0) {
        margin-right: 0;
      }
      .van-uploader__upload {
        width: 143px;
        height: 143px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #cdcdcd;
        margin: 0;
        .van-icon-plus {
          font: 40px;
          color: #999999;
        }
      }
      .van-uploader__preview-delete {
        width: 32px;
        height: 32px;
        top: -16px;
        right: -16px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        .van-icon-cross {
          top: -8px;
          right: -8px;
        }
      }
    }
    ::v-deep.van-uploader__preview-delete-icon {
      font-size: 48px;
    }
  }

  .placeholder {
    width: 100%;
    height: 150px;
  }

  ::v-deep .sp-bottombar {
    background: #fff;
    padding: 24px 40px;
    height: 88px;
    .sp-button {
      border: none;
      font: bold 32px/45px @fontf-pfsc-med;
      border-radius: 8px;
      color: #ffffff;
      width: 100%;
      &.z-inactive {
        background: rgba(73, 116, 245, 0.4) !important;
        border-color: rgba(73, 116, 245, 0.4) !important;
      }
    }
  }
}
</style>
