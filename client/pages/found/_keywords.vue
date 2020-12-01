<template>
  <div class="keyword">
    <!--S 搜索-->
    <FoundHeader
      :left="true"
      :keywords="this.$route.params.keywords"
      @inputChange="inputChange"
    />
    <!--E 搜索-->
    <!--S 内容-->
    <div class="keyword_con">
      <div class="keyword_con_title">相关新闻</div>
      <div v-for="(item, index) in list" :key="index">
        <Item :info="item" />
      </div>
    </div>
    <!--E 内容-->
  </div>
</template>

<script>
import FoundHeader from '~/components/found/common/FoundHeader'
import Item from '~/components/found/search/Item'
export default {
  name: 'Keywords',
  components: {
    FoundHeader,
    Item,
  },
  data() {
    return {
      keywords: '',
      list: [
        {
          title:
            '天津小学何时招生？这个区暂缓随迁 子女入学登记家长速看这个区暂缓随迁 子女入学登记家长速看',
          content:
            '你觉得在一个战斗中，究竟聪明人和疯子谁会赢你觉得在一个战斗中，究竟聪明人和疯子谁会赢？',
          name: '成都薯片',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          time: '1天前',
        },
        {
          title: '天津小学何时招生？这个区暂缓随迁 子女入学登记家长速看',
          content: '你觉得在一个战斗中，究竟聪明人和疯子谁会 赢？',
          name: '成都薯片',
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          time: '1天前',
        },
      ],
    }
  },
  methods: {
    inputChange() {},
  },
}
</script>

<style lang="less" scoped>
.keyword {
  padding: 0 40px;
  &_con {
    margin-top: 128px;
    padding-top: 33px;
    &_title {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
</style>
