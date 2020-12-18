<template>
  <div class="nav-content">
    <nav>
      <!-- S 固定导航 -->
      <ul v-if="navList && navList.length <= num" class="fixed-nav">
        <li v-for="(item, index) in navList" :key="index">
          <a href="javascript:void(0);">
            <img :src="item.icon" alt="" />
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
      <!-- E 固定导航 -->
      <!-- S 可滚动导航 -->
      <div ref="refScroll" class="scroll-centent" @scroll="scrollHandle">
        <ul v-if="navList && navList.length > num" class="scroll-nav">
          <li v-for="(item, index) in navList" :key="index" class="nav-item">
            <a href="javascript:void(0);">
              <img :src="item.icon" alt="" />
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- E 可滚动导航 -->
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    navList: {
      type: Array,
      default: () => {
        return [
          {
            icon: require('~/assets/temporary/home/home_ic_busi_x1.5.png'),
            name: '工商注册',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_ac_x1.5.png'),
            name: '工商变更',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_ip_x1.5.png'),
            name: '代理记账',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_web_x1.5.png'),
            name: '刻制印章',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_law_x1.5.png'),
            name: '许可证办理',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_web_x1.5.png'),
            name: '互联网资质',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_law_x1.5.png'),
            name: '税收筹划',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_web_x1.5.png'),
            name: '银行服务',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_law_x1.5.png'),
            name: '体系认证',
          },
          {
            icon: require('~/assets/temporary/home/home_ic_law_x1.5.png'),
            name: '工商注销',
          },
        ]
      },
    },
  },
  data() {
    return {
      canScrollWidth: 0,
      scroLeft: 0,
      num: 10,
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
  height: 314px;
  .fixed-nav {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 0 16px;
    flex-wrap: wrap;
    li {
      width: 20%;
      height: 157px;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 104px;
          height: 72px;
        }
        span {
          font-size: 24px;
          line-height: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          margin-top: 16px;
          .textOverflow(1);
        }
      }
    }
  }
  .scroll-centent {
    height: 314px;
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
      height: 100%;
      padding-right: 16px;
      li {
        height: 157px;
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
          justify-content: center;
          img {
            width: 104px;
            height: 72px;
          }
          span {
            font-size: 24px;
            line-height: 32px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            margin-top: 16px;
            white-space: nowrap;
            .textOverflow(1);
          }
        }
      }
    }
  }
}
</style>
