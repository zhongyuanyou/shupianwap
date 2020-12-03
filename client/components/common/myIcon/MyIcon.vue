<template>
  <i :class="classes" :style="styles">{{ iconCode }}</i>
</template>

<script>
const isColor = (value) => {
  const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/
  const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/
  const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/
  return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value)
}

const classPrefix = 'spiconfont'

export default {
  name: 'MyIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
      validator(value) {
        if (!value) return true
        return isColor(value)
      },
    },
    bgColor: {
      type: String,
      default: '',
    },
    size: {
      validator(value) {
        return /^(\.|\d+\.)?\d+(px|rem)$/.test(value)
      },
      default: '.6rem',
    },
    iconCode: {
      type: String,
      default: '',
    },
  },
  computed: {
    classes() {
      return `${classPrefix} ${classPrefix}-${this.name}`
    },
    styles() {
      const style = {}
      const size = !!this.size
      const color = !!this.color
      const bgColor = !!this.bgColor
      if (size) {
        style.fontSize = this.size
      }
      if (color) {
        style.color = this.color
      }
      if (bgColor) {
        style.backgroundImage = this.bgColor
        style['-webkit-background-clip'] = 'text'
        style.color = 'transparent'
      }
      return style
    },
  },
}
</script>
<style lang="less" scoped>
// @import '../../../assets/icons/iconfont.css';
.spiconfont {
  font-size: 24px;
}
</style>
