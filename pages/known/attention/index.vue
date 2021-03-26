<template>
  <div class="container">
    <div class="container_head">
      <Search :value="title" :icon-left="0.32"> </Search>
      <my-icon
        name="sear_ic_open"
        size="0.52rem"
        color="#4974F5"
        class="my_icon"
      ></my-icon>
    </div>
    <div class="attention">
      <Tabs />
    </div>
    <div class="visit_user">
      <VisitUser />
    </div>
    <div class="attention_user_list">
      <AttentionItem />
    </div>
  </div>
</template>
<script>
import { WorkTab } from '@chipspc/vant-dgg'
// import ItemCard from '@/components/mustKnown/recommend/ItemCard'
import Tabs from '@/components/mustKnown/recommend/tabs'
import Search from '@/components/mustKnown/recommend/search/Search'
import VisitUser from '@/components/mustKnown/recommend/VisitUser'
import AttentionItem from '@/components/mustKnown/recommend/AttentionItem'
export default {
  name: 'Attention',
  components: {
    Search,
    Tabs,
    VisitUser,
    AttentionItem,
  },
  data() {
    return {
      title: '考研复试体检包含什么项目',

      nowIndex: 2,
      infoList: [
        {
          item: 1,
        },
        {
          item: 1,
        },
      ],
    }
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.container {
  background: #f5f5f5;
  .container_head {
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    height: 88px;
    align-items: center;
    .my_icon {
      width: 52px;
      height: 52px;
      margin-left: 32px;
    }
  }
  .attention {
  }
  .attention_user_list {
  }
  .container_news_see {
    height: 136px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .news {
      width: 329px;
      height: 88px;
      background: #dbe4fd;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      .news_num {
        width: 48px;
        height: 48px;
        background: #ffffff;
        border-radius: 50%;
        font-size: 22px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #133aa3;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .news_span {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #133aa3;
        line-height: 28px;
        margin-left: 12px;
      }
    }
    .see {
      width: 329px;
      height: 88px;
      background: #d8cffa;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      .see_like {
        width: 48px;
        height: 48px;
        background: #ffffff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .see_span {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #564499;
        line-height: 28px;
        margin-left: 12px;
      }
    }
  }
  .container_middle {
    height: 88px;
    background: #ffffff;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .tabs-box {
      .tabs-box-items {
        display: flex;
        overflow: auto;
      }
    }
  }
  .container_body {
  }
}
</style>
