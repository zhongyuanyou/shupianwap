<template>
  <div class="jy-list">
    <!--S搜索框-->
    <Search placeholder="请输入搜索内容">
      <div slot="left" class="nav-back">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
      <div slot="right" class="info">
        <sp-badge :content="5">
          <my-icon name="nav_ic_msg" size="0.40rem" color="#1a1a1a"></my-icon>
        </sp-badge>
      </div>
    </Search>
    <!--E搜索框-->
    <jy-goods
      :init-list-data="serveGoodsListData"
      :is-show-tabs="false"
      :type-code="typeCode"
    />
  </div>
</template>

<script>
import { WorkTabs, WorkTab, Badge } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import JyGoods from '@/components/list/JyGoods'

export default {
  name: 'JyList',
  components: {
    Search,
    [WorkTabs.name]: WorkTabs,
    [WorkTab.name]: WorkTab,
    JyGoods,
    [Badge.name]: Badge,
  },
  data() {
    return {
      serveGoodsListData: [], // 服务商品列表数据
      typeCode: '公司交易',
    }
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
