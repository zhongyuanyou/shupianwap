<template>
  <div>
    <sp-top-nav-bar special-layout :placeholder="true" fixed>
      <template #title>
        <sp-work-tabs
          v-model="activeTab"
          mask
          title-active-color="#222"
          @click="onClickTap"
        >
          <sp-work-tab
            v-for="item in information_class"
            :key="item.code"
            :title="item.name"
            :need-content="false"
          >
          </sp-work-tab>
        </sp-work-tabs>
      </template>
      <template #right>
        <sp-icon name="search" size="20" @click="onClickRight" />
      </template>
    </sp-top-nav-bar>
    <Con
      :banner="information_banner"
      :list="information_list"
      :category-code="categoryCode"
    />
  </div>
</template>

<script>
import { WorkTab, WorkTabs, Icon, TopNavBar, Toast } from '@chipspc/vant-dgg'
import Con from '~/components/found/found/Cons'
import { foundApi } from '@/api'
export default {
  layout: 'nav',
  name: 'Index',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Icon.name]: Icon,
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
    Con,
  },
  async asyncData({ $axios }) {
    try {
      let homeData = {}
      const params = {}
      const res = await $axios.get(foundApi.initRequest, params)
      if (res.code === 200) {
        homeData = res.data || {}
      }
      return {
        homeData,
      }
    } catch (err) {}
  },
  data() {
    return {
      activeTab: 0,
      information_class: [], // 产品分类
      information_banner: [], // 广告数据
      information_list: [], // 资讯列表
      categoryCode: '', // code码
    }
  },
  mounted() {
    this.information_class =
      this.homeData && this.homeData.information_class
        ? this.homeData.information_class
        : []
    this.categoryCode =
      this.information_class && this.information_class.length
        ? this.information_class[0].code
        : ''
    this.information_banner =
      this.homeData && this.homeData.information_banner
        ? this.homeData.information_banner
        : []
    this.information_list =
      this.homeData && this.homeData.information_list
        ? this.homeData.information_list
        : []
  },
  methods: {
    async onClickTap(index, title) {
      // 切换按钮回滚到顶部
      window.scrollTo(0, 0)
      // 点击tab标签
      this.categoryCode = this.information_class[index].code
      const params = {
        categoryCode: this.categoryCode,
      }
      const res = await this.$axios.get(foundApi.screenRequest, { params })
      if (res.code === 200) {
        this.information_banner = res.data.information_banner
        this.information_list = res.data.information_list
      }
    },
    onClickRight() {
      this.$router.push('/found/foundSearch')
    },
  },
}
</script>

<style lang="less" scoped>
.found {
}
</style>
