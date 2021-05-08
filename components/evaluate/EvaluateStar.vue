<template>
  <div class="evaluateStar_container">
    <!--S 评分-->
    <div class="server_evaluate">
      <div class="evaluate_first">
        <div class="ser_title">服务评分</div>
        <sp-rate
          v-model="starValue"
          :size="28"
          color="#FFB400"
          void-icon="star"
          void-color="#F0F0F0"
          @change="onChange"
        />
        <div v-if="showEvaluate" class="star_span">超赞</div>
      </div>
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
      <div v-if="showEvaluate" class="evaluate_label">
        <ul class="items">
          <li class="item" :class="'choose_active'">标签表情</li>
          <li class="item">标签表情</li>
          <li class="item">标签表情</li>
          <li class="item">标签表情</li>
          <li class="item">标签</li>
        </ul>
      </div>
      <div v-if="showEvaluate" class="input_box">
        <sp-field
          v-model="message"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请对规划师的服务进行评价"
          show-word-limit
        />
      </div>
      <div v-if="showEvaluate" class="upload">
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
  Rate,
  Field,
  Uploader,
} from '@chipspc/vant-dgg'

export default {
  layout: 'keepAlive',
  name: 'EvaluateStar',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
    [Rate.name]: Rate,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
  },
  props: {
    // images: {
    //   type: Array,
    //   default: () => [],
    // },
    isShowRemarkArea: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    // keywords: {
    //   type: String,
    //   default: '',
    // },
  },
  data() {
    return {
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
  computed: {},
  mounted() {
    this.rateData1 = JSON.parse(JSON.stringify(this.rateData))
    // 这里去请求评价接口数据，如果没有数据则说明是默认页面，未做任何操作，进行初始化
    this.init()
  },
  methods: {
    init() {
      this.showEvaluate = false
    },
    back() {
      console.log('back')
    },
    onChange() {
      const value = this.starValue
      if (value) {
        console.log('back')
        this.showEvaluate = true
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
.not_evaluate {
  position: absolute;
  bottom: 24px;
  height: 88px;
  background: #4974f5;
  border-radius: 8px;
  width: 100%;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  line-height: 88px;
  margin-top: 63px;
  opacity: 0.4;
}
.evaluateStar_container {
  position: relative;
  // height: 100%;
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
