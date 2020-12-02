<template>
  <div class="trademark">
    <DetailTemplate :info="info">
      <div slot="basic" class="trademark_info">
        <div class="item">企业行业：<span>工程类</span></div>
        <div class="item">经营时间：<span>3年以上</span></div>
        <div class="item">注册资本：<span>1000万</span></div>
        <div class="item">企业类型：<span>有限责任公司</span></div>
        <div class="item">注册资本：<span>小规模纳税人</span></div>
      </div>
    </DetailTemplate>
  </div>
</template>

<script>
import DetailTemplate from '~/components/detail/DetailTemplate'
export default {
  name: 'Trademark',
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
            name: '郑凯元',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '郑凯元',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '郑凯元',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
        ],
        req: [
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
        ],
      },
    }
  },
}
</script>

<style lang="less" scoped>
.trademark {
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
}
</style>
