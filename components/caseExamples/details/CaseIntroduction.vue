<template>
  <div class="case_introduction">
    <div class="title">案例简介</div>
    <div class="des">
      尤其是有很多流浪都是有铁粉的，我理解铁粉不是应该一开始关注随着时间推长。
    </div>
    <div class="images">
      <div class="images_container">
        <sp-image class="image" src=""></sp-image>
        <sp-image class="image" src=""></sp-image>
        <sp-image class="image" src=""></sp-image>
        <sp-image class="image" src=""></sp-image>
        <sp-image class="image" src=""></sp-image>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'CaseIntroduction',
  components: {
    [Image.name]: Image,
    // SpIcon: Icon,
  },
  props: {
    comment: {
      type: String,
      default: '',
    },
    sellingGoodsData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    commentfn() {
      this.$emit('onComment')
    },
  },
}
</script>

<style lang="less" scoped>
.case_introduction {
  font-family: PingFangSC;
  padding: 48px 40px 40px;
  background: #ffffff;
  font-size: 0;
  .flex {
    display: flex;
    align-items: center;
    // align-items: flex-start;
  }
  .flex_1 {
    flex: 1;
  }

  .title {
    font-weight: bold;
    font-size: 40px;
    color: #000000;
    line-height: 40px;
  }
  .des {
    margin: 38px 0 28px;
    font-size: 30px;
    color: #555555;
    line-height: 46px;
  }
  .images {
    overflow: hidden;
    .images_container {
      margin: 0 -5px;
    }
    .image {
      margin: 0 5px 10px;
      width: 32%;
      width: calc(33% - 10px);
      max-width: 216px;
      height: 144px;
    }
  }
}
</style>
