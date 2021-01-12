<template>
  <div class="jy-list">
    <!--S搜索框-->
    <Search
      v-model="currentInputText"
      placeholder="请输入搜索内容"
      :maxlength="50"
      @searchKeydownHandle="searchKeydownHandle"
    >
      <div slot="left" class="nav-back" @click="$router.go(-1)">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
      <div slot="right" class="info" @click="jumpImMixin">
        <my-icon name="nav_ic_msg" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
    </Search>
    <!--E搜索框-->
    <jy-goods
      v-if="jyTypesData.length"
      :is-show-tabs="false"
      :tab-items="jyTypesData"
      :type-code-index="typeCodeIndex"
      :req-type="reqType"
      :search-text="searchText"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { WorkTabs, WorkTab, Badge } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import JyGoods from '@/components/list/JyGoods'
import { dict } from '@/api/index'
import listJumpIm from '@/mixins/listJumpIm'

export default {
  name: 'JyList',
  components: {
    Search,
    [WorkTabs.name]: WorkTabs,
    [WorkTab.name]: WorkTab,
    JyGoods,
    [Badge.name]: Badge,
  },
  layout: 'keepAlive',
  mixins: [listJumpIm],
  data() {
    return {
      jyGoodsListData: {}, // 服务商品列表数据
      typeCodeIndex: 0,
      searchText: '',
      currentInputText: '',
      reqType: 'jy',
      jyTypesData: [], // 交易业态数据
      formData: {
        page: 1,
        limit: 10,
      },
    }
  },
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'JyList' })
    this.getJyType()
    document.body.addEventListener('focusout', () => {
      // 监听软键盘关闭事件
      // 解決ios端用微信打开页面，收起软键盘后，底部出现空白问题
      setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
      }, 100)
    })
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    searchKeydownHandle() {
      // 点击搜索按钮
      this.searchText = this.currentInputText
    },
    async getJyType() {
      // 交易的业态数据
      const jyTypeData = await dict
        .findCmsCode({ axios: this.$axios }, { code: 'CONDITION-JY' })
        .then((result) => result)
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
          }
        })
      if (jyTypeData) {
        this.jyTypesData = jyTypeData
        // 查找query的typeCode是第几个下标
        const index = this.jyTypesData.findIndex((item) => {
          const typeCode = this.$route.query.typeCode
            ? this.$route.query.typeCode
            : item.ext4
          return item.ext4 === typeCode
        })
        if (index === -1) {
          this.$router.replace('/500')
        }
        this.typeCodeIndex = index
      }
    },
  },
}
</script>

<style lang="less" scoped>
.jy-list {
  width: 100%;
  height: 100%;
  .search-content {
    padding: 16px 32px;
  }
  .nav-back {
    margin-right: 32px;
  }
  .info {
    margin-left: 41px;
  }
  /deep/.spiconfont-sear_ic_sear {
    margin-left: 24px !important;
  }
  /deep/.sp-work-tabs__nav .sp-work-tab {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    &.sp-work-tab--active {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #4974f5;
    }
  }
}
</style>
