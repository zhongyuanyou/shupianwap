<template>
  <div>
    <!-- <div class="content">
      <h2>文本区域111</h2>
    </div> -->
    <!-- <div class="page-btn">
      <sp-field type="text" placeholder="请输入1" />
    </div> -->
    <div>下单协议</div>
    <p>网络类型{{ networkType }}</p>
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
import { auth, ossApi, evaluateApi } from '@/api'
import { getNetworkType } from '@/utils/getNetworkType'
export default {
  components: {
    [Field.name]: Field,
  },
  data() {
    return {
      images: [],
      networkType: '',
    }
  },
  mounted() {
    // 获取协议
    this.getProtocol('protocol100008')
    // 数据加密
    this.jiami()
    this.networkType = getNetworkType()
    console.log('this.getServerPrice()', this.getServerPrice('9.000'))
    // this.getServerPrice('90.00')
  },
  methods: {
    getServerPrice(price) {
      let newPrice = ''
      if (typeof price === 'string' && price.match('.')) {
        const arr = price.split('.')
        if (Number(arr[1]) > 0) {
          newPrice = price
        } else {
          newPrice = arr[0]
        }
      }
      return newPrice
    },
    onOversize() {
      this.$xToast.error('文件大小不能超过5M')
    },
    OSS() {
      this.$axios.post('https://pspapi.shupian.cn/api/oss/v1/upload')
    },
    afterRead(file) {
      const imgs = this.images
      const formData = new FormData()
      formData.append(this.evaluateFileId, 'sp-pt/wap/images')
      formData.append('file', file.file)
      this.loading = true
      try {
        this.$axios.post(ossApi.add, formData).then((res) => {
          if (res.code !== 200) {
            throw new Error('图片上传失败')
          }
          imgs.push(res.data.url)
          this.images = imgs
          this.loading = false
          this.$xToast.success('图片上传成功!')
        })
      } catch (err) {
        this.loading = false
        this.$xToast.error('图片上传失败!')
      }
    },
    beforeDelete(file, detail) {
      // 重置uploader 和 images 数组
      this.images.splice(detail.index, 1)
      this.uploader.splice(detail.index, 1)
      this.$xToast.success('图片删除成功!')
    },
    // 下单协议
    async getProtocol(categoryCode) {
      if (!categoryCode) {
        this.$xToast.warn('请传入需要获取的协议!')
        return
      }
      const params = {
        categoryCode,
        includeField: 'content,title',
      }
      try {
        this.loading = true
        const data = await auth.protocol(params)
        console.log('data:', data)
        const { rows = [] } = data || {}
        this.article = rows[0] || {}
        this.loading = false
        return rows[0] || {}
      } catch (error) {
        this.$xToast.error(error.message || '请求失败')
        return Promise.reject(error)
      }
    },
    jiami() {
      this.$axios
        .get(
          'http://dspmicrouag.shupian.cn/crisps-c-middle-service-api/nk/encryptAndDecrypt/encryption_data.do',
          {
            params: {
              stayEncryptData: 134567890112,
            },
          }
        )
        .then((res) => {
          console.log('res', res)
        })
    },
  },
}
</script>

<style lang="less">
.content {
  height: 40vh;
}
.page-btn {
  position: fixed;
  height: 100px;
  width: 100%;
  padding: 10px;
  left: 0;
  bottom: 0;
  background: yellow;
}
</style>
