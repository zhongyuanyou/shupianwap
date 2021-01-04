<!--
 * @Author: xiao pu
 * @Date: 2020-11-20 10:16:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-26 14:46:05
 * @Description: file content
 * @FilePath: /chips-wap/client/components/common/imgAuth/ImgAuthInput.vue
-->

<template>
  <div class="img-auth-input">
    <sp-cell-group>
      <sp-field v-model="text" clearable placeholder="看不清？点击图片换一张">
        <template #right-icon>
          <div class="icon-wrap">
            <sp-loading v-show="imageLoading"> </sp-loading>
            <span
              v-show="!imageLoading"
              class="img"
              @click="handleChangeImage"
              v-html="imgSrc"
            >
            </span>
          </div>
        </template>
      </sp-field>
    </sp-cell-group>
  </div>
</template>

<script>
import { Field, CellGroup, Loading } from '@chipspc/vant-dgg'

import { auth } from '@/api'

export default {
  name: 'ImgAuthInput',
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Loading.name]: Loading,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      text: '',
      imgSrc: '',
      imageLoading: false,
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue === oldValue) return
      this.text = newValue
    },
    text(newValue, oldValue) {
      if (newValue === oldValue) return
      this.$emit('input', newValue)
    },
  },
  created() {
    if (process && process.client) {
      this.handleChangeImage()
    }
  },
  methods: {
    handleChangeImage() {
      this.imageLoading = true
      this.changeImg().then(() => {
        this.imageLoading = false
      })
    },

    async changeImg() {
      try {
        const data = await auth.imgCode()
        console.log('imgCode:', data)
        this.imgSrc = data
        return data
      } catch (error) {
        // TODO 错误的交互
        return Promise.reject(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.img-auth-input {
  /deep/.sp-cell-group {
    .sp-cell {
      padding: 8px;
      font-size: 22px;
    }
  }
  .icon-wrap {
    width: 170px;
    height: 64px;
    text-align: center;
    .img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
