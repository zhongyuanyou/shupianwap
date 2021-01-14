<template>
  <div class="need">
    <div class="need_title">
      <h2>您可能还需要办理</h2>
    </div>
    <div class="need_content">
      <ul>
        <li v-for="(item, index) in imgList" :key="index">
          <a
            v-sensorsTrack:p_IMClick="{
              name: `许可证_还需要办理_${item.title}`,
              im_type: '售前',
            }"
            href="javascript:void(0);"
            @click="goToPage(index)"
            ><img :src="item.img" alt=""
          /></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      imgList: [
        {
          title: '体系认证',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/38rgy1dmhcm0000.png',
        },
        {
          title: '工商注销',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1sd3zeh3d9q8000.png',
        },
        {
          title: '工商变更',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ficcz0jmdfk0000.png',
        },
        {
          title: '互联网资质',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4wj1s23avw80000.png',
        },
        {
          title: '代理记账',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/55xajsk0xzw0000.png',
        },
        {
          title: '银行服务',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/98gk33nvdyo0000.png',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goToPage(index) {
      switch (index) {
        case 0:
          break
        case 1:
          this.$router.push('/spread/businessCancellation/')
          break
        case 2:
          this.$router.push('/spread/businessChange/')
          break
        case 3:
          break
        case 4:
          this.$router.push('/spread/agency/')
          break
        case 5:
          break
        default:
          break
      }
    },
  },
}
</script>
<style lang="less" scoped>
.need {
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  &_title {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 64px;
    > h2 {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
      padding-bottom: 5px;
    }
  }
  &_content {
    width: 100%;
    margin-top: 29px;
    > ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > li {
        background: linear-gradient(90deg, #ffffff 0%, #fffefa 100%);
        border: 1px solid rgba(205, 205, 205, 0.5);
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        margin-bottom: 15px;
        > a {
          > img {
            width: 210px;
            height: 153px;
            border-radius: 8px;
          }
        }
      }
    }
  }
}
</style>
