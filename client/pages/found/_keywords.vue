<template>
  <div class="keyword">
    <!--S 搜索-->
    <FoundHeader :left="true" :keywords="keywords" @inputChange="inputChange" />
    <!--E 搜索-->
    <!--S 内容-->
    <div class="keyword_con">
      <div class="keyword_con_title">相关新闻</div>
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index">
          <Item :info="item" />
        </div>
      </sp-list>
    </div>
    <!--E 内容-->
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import FoundHeader from '~/components/found/common/FoundHeader'
import Item from '~/components/found/search/Item'
import { foundApi } from '@/api'
export default {
  name: 'Keywords',
  components: {
    FoundHeader,
    Item,
    [List.name]: List,
  },
  data() {
    return {
      keywords: this.$route.params.keywords, // 资讯搜索关键字
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
      ], // 通过关键字查询的资讯列表
      limit: 10, // 每页显示条数
      page: 1, // 当前页
      loading: false,
      finished: false,
    }
  },
  mounted() {
    // this.getInfoList()
  },
  methods: {
    inputChange() {
      this.getInfoList()
    },
    async getInfoList() {
      // 获取资讯列表
      const params = {
        keyword: this.keywords,
        limit: this.limit,
        page: this.page,
      }
      const res = await this.$axios.get(foundApi.infoList, { params })
      if (res.code === 200) {
        this.list = res.data.information_list
      }
    },
    async onLoad() {
      const page = this.page++
      const params = {
        keyword: this.keywords,
        limit: this.limit,
        page,
      }
      const res = await this.$axios.get(foundApi.infoList, { params })
      if (res.code === 200) {
        if (res.data.information_list.length) {
          this.loading = false
          this.list = this.list.concat(res.data.information_list)
        } else {
          this.finished = true
        }
      }
    },
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
