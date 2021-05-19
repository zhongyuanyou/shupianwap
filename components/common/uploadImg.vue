<template>
  <div class="upload-area">
    <div class="img-area">
      <div
        v-for="(item, index) in imgList"
        :id="index"
        :key="index"
        class="img-item"
      >
        <span class="btn-dlt" @click="dltImg(index)">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/bizb563dqso0000.png"
            alt=""
            srcset=""
          />
        </span>
        <img :src="item" :z-index="index" alt="" @click="preImg(index)" />
      </div>
      <div v-if="imgNum > imgList.length" class="img-item choose-btn">
        <div v-show="!loading">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/3wy2rwklmh0000.png"
            alt=""
          />
          <input
            ref="fileInput"
            type="file"
            accept=".jpg,.jpeg,.png"
            class="file-input"
            @change="uploadPhoto"
          />
        </div>
        <div v-show="loading" class="loading-area">上传中...</div>
      </div>
    </div>
    <div v-show="showPre" class="mask-area" @click="showPre = false">
      <img :src="selectImg" :preview-src-list="imgList" alt="" />
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
  },
  props: {
    imgNum: {
      type: Number,
      default: 1,
    },
    filterType: {
      type: Number, // 滤镜类型 1.白茶；2 白皙；3.初夏；4.东京；5.告白；6.暖阳；7.蔷薇；8.清澄；9.清透； 10.甜薄荷；11.默认；12.心动；
      default: 13, // 13.哑灰；14.樱桃布丁；15.自然；16.清逸；17.黑白；18.水果；19.爱情；20.冬日；21.相片；22.夏日；23.香氛；24.魅惑；25.悸动；26.沙滩；27.街拍；28.甜美；29.初吻；30.午后。
    },
    filterDegree: {
      // 滤镜效果，取值[0,100]，0表示无效果，100表示满滤镜效果。
      type: Number,
      default: 100,
    },
    imgList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      imgUrls: [],
      inputUrl: '',
      startImgIndex: null,
      imgBase64: '',
      selectImg: '',
      showPre: false,
      loading: false,
      fileSize: '',
      fileName: '',
      isFilter: true,
    }
  },
  methods: {
    preImg(index) {
      this.showPre = true
      this.selectImg = this.imgList[index]
    },
    uploadPhoto(e) {
      const that = this
      // 利用fileReader对象获取file
      const file = e.target.files[0]
      if (!file) return
      const formData = new FormData()
      console.log('file', file)
      formData.append('file', file)
      formData.append('filterType', this.filterType)
      formData.append('filterDegree', this.filterDegree)
      formData.append('isFilter', this.isFilter)
      that.postData(formData)
      // this.fileSize = file.size
      // this.fileName = file.name
      // if (this.fileSize > 10000000) {
      //   this.$emit('beforeUpload', {
      //     code: 500,
      //     message: '图片体积过大',
      //     data: {
      //       fileSize: file.size,
      //       fileName: file.name,
      //     },
      //   })
      //   return
      // }
      // const reader = new FileReader()
      // reader.readAsDataURL(file)
      // reader.onload = function (e) {
      //   // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
      //   that.imgBase64 = e.target.result
      //   that.postData()
      // }
    },
    postData(formData) {
      this.loading = true
      this.$axios
        .post(
          'http://127.0.0.1:10007/api/tenCentImg/v1/img_filter.do',
          formData
        )
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.imgList.push(res.data.url)
            this.$emit('afterUpload', {
              code: 200,
              data: {
                currentImgUrl: res.data.url,
                imgList: this.imgList,
              },
              message: '处理成功',
            })
          } else {
            this.$emit('afterUpload', {
              code: 500,
              message: res.message || '处理失败',
            })
          }
        })
        .catch((err) => {
          this.loading = false
          this.$emit('afterUpload', {
            code: 500,
            message: err.message || '处理失败',
          })
        })
    },
    dltImg(index) {
      this.imgList.splice(index, 1)
    },
  },
}
</script>
<style scoped>
input[type='button'] {
  cursor: pointer !important;
}
input[type='file' i]::-webkit-file-upload-button {
  cursor: pointer !important;
  user-select: none;
  outline: none;
}
</style>
<style lang="less" scoped>
.mask-area {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 40px 0;
  background: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 999;
  img {
    max-height: 100%;
    max-width: 100%;
    display: block;
  }
}
.img-area {
  width: auto;
  overflow: hidden;
  clear: both;
  max-width: 100%;
}
.img-item {
  float: left;
  margin-right: 10px;
  width: 160px;
  height: 160px;
  border: 1px solid #dcdfe6;
  line-height: 160px;
  text-align: center;
  vertical-align: middle;
  position: relative;
  margin-bottom: 6px;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .btn-dlt {
    position: absolute;
    right: 0;
    top: 0px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 40px;
    z-index: 3;
    color: #acafa6;
  }
  img {
    max-height: 100%;
    max-width: 100%;
    display: block;
  }
}

.choose-btn {
  position: relative;
  line-height: 80px;
  text-align: center;
  overflow: hidden;
  color: #dcdfe6;
  font-size: 40px;
  .loading-area {
    font-size: 12px;
    text-align: center;
    line-height: 160px;
  }
}
.file-input {
  position: absolute;
  opacity: 0;
  cursor: pointer !important;
  width: auto;
  height: 120%;
  margin: 0;
  padding: 0;
  line-height: 0;
  left: -40px;
  top: 0px;
}
</style>
