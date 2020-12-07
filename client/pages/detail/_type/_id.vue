<template>
  <div class="company">
    <DetailTemplate :info="info" :detail-type="$route.params.type" />
  </div>
</template>

<script>
import DetailTemplate from '~/components/detail/DetailTemplate'
export default {
  name: 'Id',
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
            name: '黄成',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '黄成',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '黄成',
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
  methods: {},
}
</script>

<style lang="less" scoped></style>
