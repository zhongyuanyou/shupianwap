<template>
  <div class="found">
    <!--S tab-->
    <div v-if="information_class && information_class.length">
      <sp-work-tabs
        v-model="activeTab"
        title-inactive-color="#222"
        title-active-color="#1a1a1a"
        line-width="0.32rem"
        line-height="0.06rem"
        :mask="true"
        :is-nav-tab="true"
        :need-content="false"
        :sticky="true"
        @click="onClick"
      >
        <sp-work-tab
          v-for="item in information_class"
          :key="item.code"
          :title="item.name"
        >
          <Con
            :banner="information_banner"
            :list="information_list"
            :category-code="categoryCode"
          />
        </sp-work-tab>
      </sp-work-tabs>
    </div>
    <!--E tab-->
  </div>
</template>

<script>
import { WorkTab, WorkTabs } from '@chipspc/vant-dgg'
import Con from '~/components/found/found/Cons'
import { foundApi } from '@/api'
export default {
  layout: 'nav',
  name: 'Index',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    Con,
  },
  async asyncData({ $axios }) {
    try {
      let homeData = {}
      const params = {}
      const res = await $axios.get(foundApi.initRequest, params)
      if (res.code === 200) {
        homeData = res.data
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
    this.information_class = this.homeData.information_class
    this.categoryCode = this.information_class.length
      ? this.information_class[0].code
      : ''
    this.information_banner = this.homeData.information_banner
    this.information_list = this.homeData.information_list
  },
  methods: {
    async onClick(index, title) {
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
  },
}
</script>

<style lang="less" scoped>
.found {
}
</style>
