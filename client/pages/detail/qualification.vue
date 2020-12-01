<template>
  <div class="qualification">
    <DetailTemplate :info="info">
      <div slot="basic" class="company_info">
        <div class="item">企业行业：<span>工程类</span></div>
        <div class="item">经营时间：<span>3年以上</span></div>
        <div class="item">注册资本：<span>1000万</span></div>
        <div class="item">企业类型：<span>有限责任公司</span></div>
        <div class="item">注册资本：<span>小规模纳税人</span></div>
      </div>
      <template #qualification>
        <div class="qualification_con">
          <p class="qualification_con_title">资质信息</p>
          <div class="qualification_con_table">
            <div class="qualification_con_table_header">
              <div class="header_item">资质分类</div>
              <div class="header_item">资质专业</div>
              <div class="header_item">资质等级</div>
            </div>
            <div
              v-for="(item, index) in info.qualification"
              :key="index"
              class="qualification_item"
            >
              <div class="item">{{ item.category }}</div>
              <div class="item">{{ item.professional }}</div>
              <div class="item">{{ item.level }}</div>
            </div>
          </div>
        </div>
      </template>
    </DetailTemplate>
  </div>
</template>

<script>
import DetailTemplate from '~/components/detail/DetailTemplate'
export default {
  name: 'Qualification',
  components: {
    DetailTemplate,
  },
  data() {
    return {
      info: {
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
        ],
        tags: ['公司干净', '无债权债务'],
        title: '深圳区块科技技术有限公司，优质老店2字商标名字',
        money: '25.00',
        planners: [
          {
            name: '资质',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '资质',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '资质',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
        ],
        req: [
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
        ],
        qualification: [
          {
            category: '施工总承包',
            professional: '建筑工程',
            level: '三级',
          },
          {
            category: '施工总承包',
            professional: '建筑工程',
            level: '三级',
          },
        ],
      },
    }
  },
}
</script>

<style lang="less" scoped>
.qualification {
  &_info {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 15px;
    .item {
      min-width: 50%;
      max-width: 100%;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin-top: 32px;
      span {
        color: #1a1a1a;
      }
    }
  }
  &_con {
    padding: 47px 40px 40px 40px;
    background-color: #fff;
    border-bottom: 24px solid #f8f8f8;
    &_title {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 52px;
    }
    &_table {
      margin-top: 47px;
      border: 1px solid #cdcdcd;
      &_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        .header_item {
          width: 33.3333%;
          height: 72px;
          background-color: rgba(248, 248, 248, 0.5);
          text-align: center;
          line-height: 72px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #1a1a1a;
          border-bottom: 1px solid rgba(205, 205, 205, 0.5);
          border-right: 1px solid rgba(205, 205, 205, 0.5);
          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-bottom: 1px solid rgba(205, 205, 205, 0.5);
    &:last-child {
      border-bottom: none;
    }
    .item {
      width: 33.3333%;
      min-height: 88px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      border-right: 1px solid rgba(205, 205, 205, 0.5);
      &:nth-child(3n) {
        border-right: none;
      }
    }
  }
}
</style>
