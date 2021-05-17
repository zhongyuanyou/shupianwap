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
          <my-icon
            name="popup_ic_closeb"
            size="0.2rem"
            color="rgba(66, 66, 66, 0.2)"
          ></my-icon>
        </span>
        <sp-image
          :src="item"
          :preview-src-list="imgList"
          :z-index="index"
          alt=""
          srcset=""
        />
      </div>
      <div v-if="imgList.length < imgNum" class="img-item choose-btn">
        <my-icon
          name="popup_ic_add"
          size="2rem"
          color="rgba(66, 66, 66, 0.2)"
        ></my-icon>
        <input
          ref="fileInput"
          type="file"
          accept=".jpg,.jpeg,.png"
          class="file-input"
          @change="uploadPhoto"
        />
      </div>
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
      FilterDegree: 80,
      FilterType: 24,
    }
  },
  methods: {
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
      this.$axios
        .post('http://127.0.0.1:10007/api/tenCentImg/v1/img_filter.do', {
          filename: this.filename,
          filesize: this.filesize,
          imgBase64: this.imgBase64,
          FilterDegree: this.FilterDegree,
          FilterType: this.FilterType,
        })
        .then((res) => {
          console.log('res', res)
          this.imgList.push(res.data.url)
        })
    },
    dltImg(index) {
      this.imgList.splice(index, 1)
    },
    addImg() {
      if (this.imgList.length === this.imgNum) {
        this.imgList.splice(0, 1)
      }
      this.imgList.push(this.inputUrl)
      this.$emit('setImgData', this.imgList)
    },
    drag(index) {
      this.startImgIndex = index
      const startImgData = this.imgList[this.startImgIndex]
      this.startImgData = startImgData
      // 存上当前节点的id和图片数据与目标组件的id对比
      this.$store.dispatch('dragImg/setStartData', {
        data: startImgData,
        id: this._uid,
      })
    },
    drop(index) {
      // 获取拖动时的组件id
      const startId = this.$store.state.dragImg.startImgId
      const endId = this._uid
      const endImgData = this.imgList[index]
      this.imgList.splice(index, 1, this.$store.state.dragImg.startImgData)
      const that = this
      if (startId === endId) {
        // 拖动起始组件和结束组件相同时替换拖动后的图片
        setTimeout(() => {
          that.imgList.splice(that.startImgIndex, 1, endImgData)
        }, 10)
      }
    },
    allowDrop(e) {
      e.preventDefault()
    },
    swapArr(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
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
  .btn-dlt {
    position: absolute;
    right: 0;
    top: 4px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 40px;
    z-index: 99;
    background: yellow;
    color: #acafa6;
  }
}
.el-image {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
