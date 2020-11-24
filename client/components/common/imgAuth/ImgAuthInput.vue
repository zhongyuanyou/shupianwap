<!--
 * @Author: xiao pu
 * @Date: 2020-11-20 10:16:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-23 08:47:39
 * @Description: file content
 * @FilePath: /chips-wap/client/components/imgAuth/ImgAuthInput.vue
-->

<template>
  <div class="img-auth-input">
    <sp-cell-group>
      <sp-field v-model="text" clearable placeholder="看不清？点击图片换一张">
        <template #right-icon>
          <div class="icon-wrap">
            <sp-loading v-show="imageLoading"> </sp-loading>
            <img
              v-show="!imageLoading"
              :src="imgSrc"
              @click="handleChangeImage"
            />
          </div>
        </template>
      </sp-field>
    </sp-cell-group>
  </div>
</template>

<script>
import { Field, CellGroup, Loading } from '@chipspc/vant-dgg'

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
      imgSrc: 'https://img.yzcdn.cn/vant/apple-3.jpg',
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
  methods: {
    handleChangeImage() {
      console.log('触发了图片切换')
      this.imageLoading = true
      // TODO 请求图片
      setTimeout(() => {
        this.imageLoading = false
      }, 4000)
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
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
