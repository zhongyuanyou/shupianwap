<template>
  <div class="benefit">
    <h3>体系认证的好处</h3>
    <div class="benefit-content">
      <div v-for="(item, index) of images" :key="index" class="package">
        <sp-image round :src="item.img" />
        <div class="benfit-content-details">
          <p v-text="item.content1"></p>
          <p v-text="item.content2"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon, Image, Toast } from '@chipspc/vant-dgg'
export default {
  name: 'Introduction',
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Toast.name]: Toast,
  },
  props: {
    listCount: {
      type: Array,
      default: () => {
        return []
      },
    },
    isMore: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {
      images: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/amu3yqb9urk0000.png',
          content1: '国际贸易',
          content2: '绿卡“通行证”',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/1un1z4v0fao0000.png',
          content1: '获取政策奖励',
          content2: '体现企业实力',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/ax0ziz0owcc0000.png',
          content1: '增强竞争优势',
          content2: '扩大市场份额',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/2spbyladz280000.png',
          content1: '提前预防风险点',
          content2: '规避法律事故',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/51jp0bqwujg0000.png',
          content1: '精简运营流程',
          content2: '节省经营成本',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/2431xitec74w000.png',
          content1: '吸引投资',
          content2: '支持企业更好发展',
        },
      ],
    }
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.benefit {
  h3 {
    margin: 32px 0 26px 42px;
    height: 40px;
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  /deep/&-content {
    padding: 0 62px 0 50px;
    display: flex;
    flex-wrap: wrap;
    > .package {
      height: 96px;
      line-height: 96px;
      width: 50%;
      display: flex;
      margin-bottom: 32px;
      .sp-image__img {
        width: 96px;
        height: 95px;
      }
      .benfit-content-details {
        margin-left: 25px;
        display: inline-block;
        font-size: 28px;
        font-weight: bold;
        color: red;
        display: flex;
        flex-direction: column;
        p {
          display: block;
          line-height: 48px;
          flex-basis: 50%;
          font-size: 28px;
          font-weight: bold;
          color: #333333;
        }
        p:last-child {
          font-size: 22px;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
}
</style>
