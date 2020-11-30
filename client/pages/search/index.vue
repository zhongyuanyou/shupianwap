<template>
  <div class="search-page">
    <sp-sticky>
      <Search ref="searchRef" :icon-left="0.24" placeholder="请输入搜索内容">
        <template v-slot:right>
          <a class="cloose-btn" href="javascript:void(0);" @click="clooseHandle"
            >取消</a
          >
        </template>
      </Search>
    </sp-sticky>
    <!-- S 搜索历史 -->
    <div class="search-moudle search-history">
      <div>
        <strong>搜索历史</strong>
        <my-icon
          name="search_ic_deleted"
          size="0.32rem"
          color="#CCCCCC"
        ></my-icon>
      </div>
      <ul>
        <li v-for="item in historyData" :key="item">
          <a href="javascript:void(0);">{{ item }}</a>
        </li>
      </ul>
    </div>
    <!-- E 搜索历史 -->
    <!-- S 猜您需要 -->
    <div class="search-moudle search-need">
      <div>
        <strong>猜您需要</strong>
        <my-icon name="search_ic_re" size="0.32rem" color="#CCCCCC"></my-icon>
      </div>
      <ul>
        <li v-for="item in searchTop" :key="item">
          <my-icon
            name="news_ic_heat"
            size="0.24rem"
            bgColor="linear-gradient(0deg, #FB5B44 0%, #FE8878 100%);"
          ></my-icon>
          <a href="javascript:void(0);">{{ item }}</a>
        </li>
        <li v-for="item in searchRec" :key="item">
          <a href="javascript:void(0);">{{ item }}</a>
        </li>
      </ul>
    </div>
    <!-- E 猜您需要 -->
    <!-- S 热搜词 -->
    <div class="search-moudle search-hot">
      <div>
        <strong>热搜词</strong>
      </div>
      <ul>
        <li v-for="(item, index) in searchHot" :key="index">
          <span>{{ index + 1 }}</span>
          <p>{{ item.keywords }}</p>
          <i>{{ item.count }}</i>
        </li>
      </ul>
    </div>
    <!-- E 热搜词 -->
  </div>
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
export default {
  name: 'SearchPage',
  components: {
    [Sticky.name]: Sticky,
    Search,
  },
  data() {
    return {
      historyData: [
        '猜您需要',
        '账目干净',
        '成立三年',
        '小规模记账',
        '纳税人代理记账',
      ],
      searchTop: ['预约上门服务', '找规划师', '成立三年'],
      searchRec: [
        '科技公司',
        '账目干净',
        '成立三年',
        '小规模记账',
        '纳税人代理记账',
      ],
      searchHot: [
        {
          keywords: '最新国家政策报告最新国家政策报告最新国家政策报告',
          count: 352561,
        },
        {
          keywords: '法律咨询收费标准',
          count: 252563,
        },
        {
          keywords: '社保代缴真的全免费吗',
          count: 232150,
        },
        {
          keywords: '企服双11优惠力度',
          count: 151286,
        },
        {
          keywords: '优惠力度折扣',
          count: 150530,
        },
        {
          keywords: '优惠力度折扣',
          count: 150530,
        },
        {
          keywords: '优惠力度折扣',
          count: 150530,
        },
        {
          keywords: '优惠力度折扣',
          count: 150530,
        },
        {
          keywords: '优惠力度折扣',
          count: 150530,
        },
        {
          keywords: '优惠力度折扣',
          count: 150530,
        },
      ],
    }
  },
  methods: {
    // 取消
    clooseHandle() {
      this.$router.back()
    },
    // 搜索框内容变化
    valChangeHandle(val) {
      console.log(val)
    },
  },
}
</script>

<style lang="less" scoped>
.search-page {
  font-size: 24px;
  .cloose-btn {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-left: 40px;
  }
  .search-moudle {
    display: flex;
    flex-direction: column;
    padding: 56px 24px 24px 40px;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-right: 16px;
      > strong {
        font-size: 38px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      > li {
        height: 70px;
        line-height: 70px;
        padding: 0 25px;
        margin: 16px 16px 0 0;
        background: #f9f9f9;
        text-align: center;
        > a {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
        }
      }
    }
  }

  .search-need {
    padding-top: 32px;
    padding-bottom: 0;
  }
  .search-hot {
    padding-top: 56px;
    padding-right: 40px;
    > ul {
      display: flex;
      flex-direction: column;
      > li {
        display: flex;
        align-items: center;
        width: 100%;
        height: 108px;
        background: #ffffff;
        border-bottom: 1px solid #f4f4f4;
        padding: 0;
        margin: 0;
        > span {
          width: 36px;
          height: 36px;
          background: #f8f8f8;
          border-radius: 4px;
          font-size: 22px;
          font-family: Bebas;
          font-weight: bold;
          font-weight: 400;
          color: #555555;
          margin-right: 24px;
          text-align: center;
          line-height: 36px;
        }
        > p {
          flex: 1;
          text-align: left;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
          .textOverflow(1);
        }
        > i {
          font-style: inherit;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          margin-left: 24px;
        }
        &:nth-child(1) > span {
          color: #ffffff;
          background: #fa5741;
        }
        &:nth-child(2) > span {
          color: #ffffff;
          background: #fa8f41;
        }
        &:nth-child(3) > span {
          color: #ffffff;
          background: #fac841;
        }
      }
    }
  }
}
</style>
