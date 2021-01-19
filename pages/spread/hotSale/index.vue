<template>
  <div class="hotSale">
    <!--  banner  -->
    <banner :banner-data="bannerData"></banner>
    <!--  banner  -->
    <!--  选项卡  -->
    <serve :serve-data="serveData" :current="selected"></serve>
    <!--  选项卡  -->
    <!--  加载样式  -->
    <div v-if="loaded" class="hotSale-load">已加载完毕</div>
    <sp-loading v-else size="24px" vertical>加载中...</sp-loading>
    <!--  加载样式  -->
  </div>
</template>

<script>
import { Loading } from '@chipspc/vant-dgg'
import Banner from '@/components/spread/common/TopBanner'
import Serve from '@/components/spread/common//Serve'
import { bangDanApi } from '@/api/bangDan'
export default {
  name: 'Index',
  components: {
    Banner,
    Serve,
    [Loading.name]: Loading,
  },
  async asyncData({ $axios }) {
    const limit = 10
    const page = 1
    const pcode = 'CRISPS-C-BIIIBOARD-FW'
    try {
      const res = await $axios.get(bangDanApi.list, {
        params: {
          limit,
          page,
          pcode,
        },
      })
      if (res.code === 200) {
        const productList = {}
        const tabs = []
        const infos = []
        for (let i = 0; i < res.data.length; i++) {
          const result = await $axios.get(bangDanApi.sublist, {
            params: {
              limit,
              page,
              pcode,
              code: res.data[i].code,
            },
          })
          if (result.data === 200) {
            productList[res.data[i].name] = result.data.records
          }
          tabs.push(res.data[i].name)
          const info = {
            name: res.data[i].name,
            code: res.data[i].code,
            currentPage: 1,
          }
          infos.push(info)
        }
        return { tabs, productList, infos }
      }
    } catch (error) {
      console.log('error', error)
    }
  },
  data() {
    return {
      bannerData: {
        tabs: ['会计财税', '知识产权', '工商代办'],
        title: ['服务', '热卖榜'],
      },
      serveData: {
        productList: [],
        type: 'hot',
      },
      selected: '会计财税',
      reqInfos: [],
      loaded: true,
    }
  },
  watch: {
    selected(newval) {
      if (this.tabs !== undefined && this.productList !== undefined) {
        this.serveData.productList = this.productList[newval]
      }
    },
  },
  created() {
    if (this.codes !== undefined) {
      this.reqInfos = this.codes
    }
    if (this.tabs !== undefined && this.productList !== undefined) {
      // 处理tab数据
      this.bannerData.tabs = this.tabs
      // 处理产品数据
      this.serveData.productList =
        this.productList['会计财税'] || this.productList['公司榜']
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight
      if (
        scrollHeight > clientHeight &&
        scrollTop + clientHeight >= scrollHeight
      ) {
        this.loadmore()
      }
    })
  },
  methods: {
    async loadmore() {
      this.loaded = false
      let currentPage
      let code
      this.reqInfos.forEach((item, index) => {
        if (item.name === this.selected) {
          this.reqInfos[index].currentPage += 1
          code = item.code
          currentPage = this.reqInfos[index].currentPage
        }
      })
      try {
        const result = await this.$axios.get(bangDanApi.sublist, {
          params: {
            limit: 10,
            currentPage,
            pcode: 'CRISPS-C-BIIIBOARD-FW',
            code,
          },
        })
        if (result.code === 200) {
          this.serveData.productList.push(result.data.records)
          this.loaded = true
        }
      } catch (err) {
        console.log('err', err)
      }
    },
  },
  head() {
    return {
      title: '服务热卖榜单',
    }
  },
}
</script>

<style scoped lang="less">
.hotSale {
  width: @spread-page-width;
  margin: 0 auto;
  &-load {
    font-size: 24px;
    font-weight: 400;
    color: #cccccc;
    line-height: 24px;
    margin-top: -8px;
    padding-bottom: 85px;
    text-align: center;
  }
}
</style>
