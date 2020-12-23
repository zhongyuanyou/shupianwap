<template>
  <div class="nav-content">
    <nav>
      <!-- S 固定导航 -->
      <ul v-if="fiexdNav && fiexdNav.length" class="fixed-nav">
        <li v-for="(item, index) in fiexdNav" :key="index">
          <a v-if="item.navigationWay === 2" :href="jumpHandle(item)">
            <img :src="item.navigationImageUrl" alt="" />
            <span>{{ item.name }}</span>
          </a>
          <nuxt-link v-else :to="jumpHandle(item)">
            <img :src="item.navigationImageUrl" alt="" />
            <span>{{ item.name }}</span>
          </nuxt-link>
        </li>
      </ul>
      <!-- E 固定导航 -->
      <!-- S 可滚动导航 -->
      <div ref="refScroll" class="scroll-centent" @scroll="scrollHandle">
        <ul v-if="rollNav && rollNav.length" class="scroll-nav">
          <li v-for="(item, index) in rollNav" :key="index">
            <a v-if="item.navigationWay === 2" :href="jumpHandle(item)">
              <img :src="item.navigationImageUrl" alt="" />
              <span>{{ item.name }}</span>
            </a>
            <nuxt-link v-else :to="jumpHandle(item)">
              <img :src="item.navigationImageUrl" alt="" />
              <span>{{ item.name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- E 可滚动导航 -->
      <!-- S 自定义滚动条 -->
      <div v-if="rollNav.length > 10" class="scroll-box">
        <span><i :style="{ left: scroLeft + '%' }"></i></span>
      </div>
      <!-- E 自定义滚动条 -->
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    // 固定导航
    fiexdNav: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 滚动导航
    rollNav: {
      type: Array,
      default: () => {
        return []
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
    jumpHandle(item) {
      let url = ''
      switch (item.navigationWay) {
        // 跳转内链
        case 1:
          url = item.wapRoute
          break
        // 跳转外链
        case 2:
          url = item.url
          break
        // 跳转图片链接
        case 3:
          url = {
            name: 'img',
            params: {
              url: item.imageUrl,
            },
          }
          break
        default:
          url = item.url
          break
      }
      return url
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
