<template>
  <div class="you-need">
    <my-title title="你可能还需办理" />
    <ul class="need-content">
      <li v-for="(item, i) of needData" :key="i" class="need-content-item">
        <nuxt-link
          v-sensorsTrack:webClick="{
            name: item.mdName,
          }"
          :to="item.url"
          class="a-clear"
        >
          <img :src="item.background" alt="" />
        </nuxt-link>
      </li>
    </ul>
    <div class="need-tel">
      <consult-tel
        title="还有疑问？企服专家为您免费解答"
        desc="电话咨询:"
        md-type="new"
        md-name="工商注销_还有疑问_立即咨询"
      />
    </div>
  </div>
</template>
<script>
import MyTitle from '@/components/spread/businessCancellation/MyTitle'
import ConsultTel from '@/components/spread/businessCancellation/ConsultTel'
export default {
  components: {
    MyTitle,
    ConsultTel,
  },
  props: {},
  data() {
    return {
      needData: [
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/3le2fgutr1q0000.png',
          url: '/spread/system',
          mdName: '工商注销_还需要办理_体系认证',
        },
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/dpsgk5q0c5c0000.png',
          url: '/spread/licence',
          mdName: '工商注销_还需要办理_许可证办理',
        },
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/3z1ra7t3h4u0000.png',
          url: '/spread/tax',
          mdName: '工商注销_还需要办理_财务税筹',
        },
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/2elyy3kkyg74000.png',
          url: '/',
          mdName: '工商注销_还需要办理_互联网资质',
        },
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/dkjzwaiiokg0000.png',
          url: '/spread/agency',
          mdName: '工商注销_还需要办理_代理记账',
        },
        {
          background: 'https://cdn.shupian.cn/sp-pt/wap/7yz1bmsxurk0000.png',
          url: '/spread/bankService',
          mdName: '工商注销_还需要办理_银行服务',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.you-need {
  padding: 32px 40px 0;
}
.need-content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  &-item {
    width: 215px;
    height: 153px;
    // border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 8px;
    margin-bottom: 12px;
    img {
      width: 215px;
      height: 153px;
    }
  }
}
.need-tel {
  margin-top: -12px;
  margin-left: -40px;
}
.a-clear {
  text-decoration: none;
  color: inherit;
}
</style>
