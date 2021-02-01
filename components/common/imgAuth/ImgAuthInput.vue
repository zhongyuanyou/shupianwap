<!--
 * @Author: xiao pu
 * @Date: 2020-11-20 10:16:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-06 17:01:36
 * @Description: file content
 * @FilePath: /chips-wap/components/common/imgAuth/ImgAuthInput.vue
-->

<template>
  <div class="img-auth-input">
    <sp-field
      v-model="text"
      clearable
      placeholder="看不清？点击图片换一张"
      class="img-auth-input__field"
      maxlength="4"
    >
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
  position: relative;
  // 1px 边框
  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    border: 1px solid #cdcdcd;
    border-radius: 16px;
    transform: scale(0.5);
    transform-origin: top left;
    pointer-events: none;
  }
  &__field {
    padding: 8px 8px 8px 16px;
    /deep/.sp-field__control {
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
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>
