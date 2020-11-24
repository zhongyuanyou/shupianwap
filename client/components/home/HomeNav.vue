<template>
  <div class="nav-content">
    <nav>
      <!-- S 固定导航 -->
      <ul v-if="fixedNavList && fixedNavList.length" class="fixed-nav">
        <li v-for="(item, index) in fixedNavList" :key="index">
          <a href="javascript:void(0);">
            <img :src="item.icon" alt="" />
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
      <!-- E 固定导航 -->
      <!-- S 可滚动导航 -->
      <div ref="refScroll" class="scroll-centent" @scroll="scrollHandle">
        <ul v-if="scrollNavList && scrollNavList.length" class="scroll-nav">
          <li v-for="(item, index) in scrollNavList" :key="index">
            <a href="javascript:void(0);">
              <img :src="item.icon" alt="" />
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- E 可滚动导航 -->
      <div class="scroll-box">
        <span><i :style="{ left: scroLeft + '%' }"></i></span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    // 固定导航
    fixedNavList: {
      type: Array,
      default: () => {
        return [
          {
            icon: require('~/assets/temporary/home/home_ic_busi_x1.5.png'),
            name: '工商平台',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_ac_x1.5.png'),
            name: '会计财税',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_ip_x1.5.png'),
            name: '知识产权',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_web_x1.5.png'),
            name: 'IT软件',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_law_x1.5.png'),
            name: '法律平台',
          },
        ]
      },
    },
    // 滚动导航
    scrollNavList: {
      type: Array,
      default: () => {
        return [
          {
            icon:
              'http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp',
            name: '工商平台',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png.webp',
            name: '会计财税',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png.webp',
            name: '知识产权',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf344Ebec23ae8/59712d986b10bb0a.png.webp',
            name: '知识产权',
          },
          {
            icon:
              'http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp',
            name: '工商平台',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png.webp',
            name: '会计财税',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png.webp',
            name: '知识产权',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf344Ebec23ae8/59712d986b10bb0a.png.webp',
            name: '知识产权',
          },
          {
            icon:
              'http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp',
            name: '工商平台',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png.webp',
            name: '会计财税',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png.webp',
            name: '知识产权',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf344Ebec23ae8/59712d986b10bb0a.png.webp',
            name: '知识产权',
          },
          {
            icon:
              'http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp',
            name: '工商平台',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png.webp',
            name: '会计财税',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png.webp',
            name: '知识产权',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf344Ebec23ae8/59712d986b10bb0a.png.webp',
            name: '知识产权',
          },
          {
            icon:
              'http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp',
            name: '工商平台',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png.webp',
            name: '会计财税',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png.webp',
            name: '知识产权',
          },
          {
            icon:
              '//m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf344Ebec23ae8/59712d986b10bb0a.png.webp',
            name: '知识产权',
          },
        ]
      },
    },
  },
  data() {
    return {
      canScrollWidth: 0,
      scroLeft: 0,
    }
  },
  mounted() {
    const scrollWidth = this.$refs.refScroll.scrollWidth // 容器文档总宽
    const clientWidth = this.$refs.refScroll.clientWidth // 容器可视宽度
    this.canScrollWidth = scrollWidth - clientWidth // 容器可滚动宽度
  },
  methods: {
    scrollHandle() {
      const scrollLeft = this.$refs.refScroll.scrollLeft // 容器滚动距离
      const scroLeft = Math.floor((scrollLeft / this.canScrollWidth) * 100) // 计算导航容器滚动百分比
      this.scroLeft = scroLeft / 2
    },
  },
}
</script>

<style scoped lang="less">
.nav-content {
  font-size: 24px;
  box-sizing: border-box;
  .fixed-nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 28px 16px 20px 16px;
    li {
      width: 20%;
      a {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 104px;
          height: 72px;
        }
        span {
          font-size: 24px;
          line-height: 24px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          margin-top: 20px;
        }
      }
    }
  }
  .scroll-centent {
    overflow-x: auto;
    overflow-y: hidden;
    padding-left: 16px;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      display: none;
    }
    .scroll-nav {
      display: flex;
      flex-flow: column wrap;
      align-content: flex-start;
      height: 264px;
      padding-right: 16px;
      li {
        height: 92px;
        margin: 20px 0;
        width: 20%;
        &:last-child {
          position: relative;
          &::before {
            position: absolute;
            right: -16px;
            top: 0;
            content: '';
            width: 16px;
            height: 16px;
          }
        }
        a {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          align-content: space-between;
          img {
            width: 48px;
            height: 48px;
          }
          span {
            font-size: 24px;
            line-height: 24px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            margin-top: 20px;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .scroll-box {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 49px;
    padding-top: 3px;
    span {
      position: relative;
      display: flex;
      content: '';
      width: 80px;
      height: 6px;
      background-color: rgba(73, 116, 245, 0.1);
      border-radius: 3px;
      i {
        position: absolute;
        top: 0;
        width: 40px;
        height: 6px;
        background: #4974f5;
        border-radius: 3px;
      }
    }
  }
}
</style>
