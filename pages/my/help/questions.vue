<template>
  <div class="page-content">
    <Header title="问题解答" />
    <div class="title-box moudle">
      <my-icon
        name="command_img_questions"
        size="0.32rem"
        bg-color="linear-gradient(-45deg, #4974F5, #6093FB)"
      />
      <strong class="title-content">{{ title }}</strong>
    </div>
    <div class="content-box moudle">
      <my-icon
        name="command_img_answers"
        size="0.32rem"
        bg-color="linear-gradient(-45deg, #FF614E, #FA7769)"
      />
      <div class="text-content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { foundApi } from '~/api'
import Header from '@/components/common/head/header'
export default {
  layout: 'keepAlive',
  name: 'Questions',
  components: { Header },
  async asyncData({ $axios, query, redirect }) {
    let detailData = {}
    try {
      const res = await $axios.get(
        foundApi.infoDetail,
        {
          params: { id: query.id, includeField: 'id,title,content' },
        },
        {
          headers: {
            'x-cache-control': 'cache',
          },
        }
      )
      if (res.code === 200) {
        detailData = res.data
      } else {
        redirect('/404')
      }
    } catch (error) {}
    return detailData
  },
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
.page-content {
  font-size: 32px;
  padding-bottom: 40px;
  /deep/ a {
    color: #4974f5;
  }
  /deep/ img {
    max-width: 100% !important;
    height: auto;
  }
  .moudle {
    padding: 0 40px;
    display: flex;
    .title-content {
      margin-left: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 40px;
    }
    .text-content {
      margin-left: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 46px;
      margin-top: -4px;
    }
  }
  .title-box {
    margin: 44px 0 40px 0;
  }
}
</style>
