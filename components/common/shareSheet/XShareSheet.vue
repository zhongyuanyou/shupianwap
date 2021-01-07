<template>
  <sp-share-sheet
    v-model="showShare"
    :options="spOptions"
    @select="onSelect"
    class="x-share"
  />
</template>

<script>
import { ShareSheet } from '@chipspc/vant-dgg'
import chunkArr from '@/utils/chunkArr'
export default {
  name: 'XShareSheet',
  components: {
    [ShareSheet.name]: ShareSheet,
  },
  model: {
    props: 'value',
    event: 'showShareChangeHandle',
  },
  props: {
    value: {
      type: Boolean,
    },
    options: {
      type: Array,
      default() {
        return [
          {
            name: '微信',
            icon: this.$ossImgSet(200, 200, 'fi1vc2r0q2o0000.png'),
          },
          {
            name: '朋友圈',
            icon: this.$ossImgSet(200, 200, 'dugd28r002o000.png'),
          },
          {
            name: '微博',
            icon: this.$ossImgSet(200, 200, '4uw0p7p1n3i0000.png'),
          },
          {
            name: 'QQ',
            icon: this.$ossImgSet(200, 200, '30k9lc9y66a0000.png'),
          },
          {
            name: '短信',
            icon: this.$ossImgSet(200, 200, '72qpchjwyn80000.png'),
          },
          {
            name: '链接',
            icon: this.$ossImgSet(200, 200, '10e874ck3vcg000.png'),
          },
        ]
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    showShare: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('showShareChangeHandle', val)
      },
    },
    spOptions() {
      return chunkArr(this.options, 4)
    },
  },
  methods: {
    onSelect(option, index) {
      this.$emit('select', option, index)
    },
  },
}
</script>

<style lang="less">
.x-share {
  /deep/.sp-share-sheet__options {
    display: flex;
    padding: 61px 76px;
    &:nth-child(n + 2) {
      padding-top: 0;
    }
    .sp-share-sheet__option {
      margin-right: 72px;
      .sp-share-sheet__icon {
        margin: 0;
      }
      .sp-share-sheet__name {
        padding: 0;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999;
        margin-top: 20px;
      }
    }
  }
  .sp-share-sheet__options--border::before {
    display: none;
  }
  .sp-share-sheet__cancel {
    border-top: 1px solid #f4f4f4;
    line-height: 99px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    &::before {
      display: none;
    }
  }
}
</style>
