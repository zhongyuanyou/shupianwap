<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">dgg-platform-nuxt-wap</h1>
      <h2 class="subtitle">My badass Nuxt.js project</h2>
      <!-- 自定义事件 -->
      <div v-md:p_search data-keyword="测试搜索" class="test">
        <span>自定义事件</span>
      </div>
      <!-- 热力图点击事件 -->
      <div v-md-map class="test">
        <span>热力图点击事件</span>
      </div>
      <!-- 自定义事件 和 热力图点击事件 -->
      <div v-md:p_search v-md-map data-keyword="测试搜索" class="test">
        <span>自定义事件 和 热力图点击事件</span>
      </div>
      <div class="test">
        <ul>
          <li v-for="(item, index) in ServerData" :key="index">
            {{ `我叫${item.username},我出生日期是${item.accessTime}！` }}
          </li>
        </ul>
      </div>
      <sp-button type="primary" @click="handlerGetPageData()"
        >GET获取数据Demo</sp-button
      >
      <sp-button type="primary" @click="handlerPostPageData()"
        >POST提交数据Demo</sp-button
      >
    </div>
  </div>
</template>
<script>
import { Button } from '@chipspc/vant-dgg'
import Logo from '~/components/Logo.vue'
import Demo from '~/api/demo'
export default {
  name: 'Index',
  components: {
    [Button.name]: Button,
    Logo,
  },
  async asyncData({ $axios }) {
    try {
      const res = await Demo.queryDemoList(
        { $axios },
        {
          id: '1212',
          pageNumber: 1,
          pageSize: 10,
        },
        'cache'
      )
      if (res.code === 200) {
        return { ServerData: res.data.userList }
      }
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      ServerData: [],
    }
  },
  methods: {
    async handlerGetPageData() {
      const res = await Demo.queryDemoList(this, {
        id: '1212',
        pageNumber: 1,
        pageSize: 10,
      })
      if (res.code === 200) {
        this.ServerData = res.data.userList
      }
    },
    async handlerPostPageData() {
      const res = await Demo.addDemoData(this, {
        id: '1212',
      })
      if (res.code === 200) {
        this.ServerData = res.data.userList
      }
    },
  },
}
</script>
<style lang="less" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 21px;
  word-spacing: 5px;
  padding-bottom: 7px;
  transform: scale(0.5);
}

.links {
  padding-top: 7px;
}

.test {
  font-size: 16px;
  margin-bottom: 16px;
}
</style>
