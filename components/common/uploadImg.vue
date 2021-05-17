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
      <div class="img-item choose-btn">
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
    <div v-show="showPre" class="mask" @click="showPre = false">
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
      default: 3,
    },
    imgList: {
      type: [Array, String],
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
      FilterDegree: 100,
      FilterType: 13,
      selectImg: '',
      showPre: false,
      loading: false,
    }
  },
  methods: {
    preImg(index) {
      this.showPre = true
      this.selectImg = this.imgList[index]
    },
    clickBtn() {
      console.log('fileInput', this.$refs.fileInput)
      this.$refs.fileInput.click()
    },
    uploadPhoto(e) {
      const that = this
      // 利用fileReader对象获取file
      const file = e.target.files[0]
      const filesize = file.size
      this.filename = file.name
      if (filesize > 2101440) {
        // 图片大于2MB
        this.$message({
          message: '图片过大，请使用其它方式上传！',
          type: 'fail',
        })
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        that.imgBase64 = e.target.result
        that.postData()
      }
    },
    postData() {
      this.loading = true
      this.$axios
        .post('http://127.0.0.1:10007/api/tenCentImg/v1/img_filter.do', {
          filename: this.filename,
          filesize: this.filesize,
          imgBase64: this.imgBase64,
          FilterDegree: this.FilterDegree,
          FilterType: this.FilterType,
        })
        .then((res) => {
          this.loading = false
          this.imgList.push(res.data.url)
        })
        .catch((err) => {
          console.log('err', err)
          this.loading = false
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
.mask {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  padding: 10px;
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
