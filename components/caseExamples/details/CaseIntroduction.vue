<template>
  <div class="case_introduction">
    <div v-if="title" class="title">{{ title }}</div>
    <div v-if="text" class="des">
      <TwoLine fontsize="0.3rem" :text="text"></TwoLine>
    </div>
    <div v-if="images.length > 0" class="images">
      <div class="images_container">
        <sp-image
          v-for="(item, index) in images"
          :key="index"
          fit="cover"
          class="image"
          :src="item"
        ></sp-image>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'
import TwoLine from '@/components/caseExamples/details/TwoLine.vue'
export default {
  name: 'CaseIntroduction',
  components: {
    [Image.name]: Image,
    TwoLine,
    // SpIcon: Icon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default: () => [],
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
  border-bottom: 0.24rem solid #f8f8f8;
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
    margin: 38px 0 0;
    font-size: 30px;
    color: #555555;
    line-height: 46px;
  }
  .images {
    overflow: hidden;
    margin-top: 28px;
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
