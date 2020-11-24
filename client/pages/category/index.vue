<template>
  <div class="category">
    <!--S 头部-->
    <div class="category_header">
      <my-icon name="nav_ic_back" size="0.33rem" color="#1a1a1a" />
      <div class="category_header_con">
        <my-icon name="sear_ic_sear" size="0.28rem" color="#999" />
        <input
          v-model="keywords"
          type="text"
          placeholder="请输入搜索内容"
          @input="inputChange"
        />
      </div>
    </div>
    <!--E 头部-->
    <!--S 内容区-->
    <div class="category_con">
      <div ref="navList" class="category_con_lf">
        <div
          v-for="(item, index) in navList"
          :key="index"
          class="category_con_lf_item"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="category_con_rt">
        <div
          v-for="(item, index) in navList"
          :key="index"
          class="category_con_rt_item"
        >
          <p class="category_con_rt_item_title">{{ item.title }}</p>
          <div v-for="(cItem, cIndex) in item.child" :key="cIndex" class="">
            {{ cItem.title }}
          </div>
        </div>
      </div>
    </div>
    <!--E 内容区-->
  </div>
</template>

<script>
import Better from 'better-scroll'
export default {
  name: 'Index',
  data() {
    return {
      keywords: '',
      navList: [
        {
          title: '一级导航-1',
          children: [
            { title: '二级导航-1-1' },
            { title: '二级导航-1-2' },
            { title: '二级导航-1-3' },
          ],
        },
        {
          title: '一级导航-2',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-3',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-4',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-5',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-6',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-7',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-8',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-9',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-10',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-11',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-12',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-13',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-14',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
        {
          title: '一级导航-15',
          children: [
            { title: '二级导航-2-1' },
            { title: '二级导航-2-2' },
            { title: '二级导航-2-3' },
          ],
        },
      ], // 全局列表
      probeType: {
        type: Number,
        default: 1,
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    inputChange() {},
    initScroll() {
      if (!this.$refs.navList) return
      this.leftScroll = new Better(this.$refs.navList, {
        probeType: 1,
        click: true,
        scrollX: false,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.category {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &_header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 128px;
    background: #ffffff;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    z-index: 6;
    &_con {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      width: 606px;
      height: 96px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      padding: 0 24px;
      input {
        width: 100%;
        height: 92px;
        text-indent: 15px;
        border: none;
        font-size: 30px;
        color: #1a1a1a;
        font-weight: bold;
        &:focus {
          outline: none;
        }
        //去除点击时候的背景色
        -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
      }
    }
  }
  &_con {
    display: flex;
    position: absolute;
    top: 128px;
    width: 100%;
    overflow: hidden;
    &_lf {
      width: 200px;
      background-color: #f8f8f8;
      &_item {
        width: 100%;
        height: 124px;
        text-align: center;
        line-height: 124px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
      }
    }
    &_rt {
      flex: 1;
      background-color: #fff;
      padding: 0 32px;
      &_item {
        margin-top: 48px;
        &_title {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
        }
      }
    }
  }
}
</style>
