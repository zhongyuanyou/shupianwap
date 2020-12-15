<template>
  <div class="query-phone">
    <h5>有疑问？千万企服专家为您免费解答</h5>
    <div>
      <span
        ><sp-image
          round
          width="14px"
          height="18px"
          :src="
            require('' +
              '~/assets/spreadImages/company_registry/busi_img_fwrx.png')
          "
      /></span>
      <span>服务热线：</span>
      <span>4000 - 535800</span>
      <button @click="QueryPhone">立即咨询</button>
    </div>
  </div>
</template>
<script>
import { Image, Toast } from '@chipspc/vant-dgg'
export default {
  name: 'Standard',
  components: {
    [Image.name]: Image,
    [Toast.name]: Toast,
  },
  data() {
    return {}
  },
  methods: {
    QueryPhone() {
      Toast('立即咨询')
    },
  },
}
</script>
<style lang="less" scoped>
.query-phone {
  h5 {
    font-size: 30px;
    font-weight: bold;
    color: #222222;
    padding: 32px 0;
  }
  > div {
    display: block;
    width: 670px;
    height: 80px;
    line-height: 80px;
    background: #ffffff;
    border: 2px solid #4974f5;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    .sp-image {
      margin: 22px 4px 22px 26px;
      height: 80px;
      line-height: 80px;
    }
    span:nth-child(2),
    span:nth-child(3) {
      font-size: 24px;
      line-height: 80px;
      font-weight: 400;
      color: #666666;
    }
    span:nth-child(3) {
      font-size: 40px;
      font-family: Impact;
      color: #4974f5;
    }
    > button {
      width: 204px;
      height: 78px;
      background: #4974f5;
      border-radius: 0px 6px 6px 0px;
      font-size: 28px;
      font-weight: bold;
      color: #ffffff;
      top: 0px;
      right: 0px;
    }
  }
}
</style>
