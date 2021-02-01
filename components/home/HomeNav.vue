<template>
  <div class="nav-content">
    <nav>
      <!-- S 固定导航 -->
      <ul v-if="fiexdNav && fiexdNav.length" class="fixed-nav">
        <li v-for="(item, index) in fiexdNav" :key="index">
          <a v-if="item.navigationWay === 2" :href="jumpHandle(item)">
            <img
              v-lazy="item.navigationImageUrl + $ossImgSet(104, 72)"
              alt=""
            />
            <span>{{ item.name }}</span>
          </a>
          <nuxt-link v-else :to="jumpHandle(item)">
            <img
              v-lazy="item.navigationImageUrl + $ossImgSet(104, 72)"
              alt=""
            />
            <span>{{ item.name }}</span>
          </nuxt-link>
        </li>
      </ul>
      <!-- E 固定导航 -->
      <!-- S 可滚动导航 -->
      <div
        ref="refScroll"
        :class="rollNavHandle.length > 10 ? 'up-and-down' : 'left-and-right'"
        @scroll="scrollHandle"
      >
        <ul v-if="rollNavHandle && rollNavHandle.length" class="scroll-nav">
          <li v-for="(item, index) in rollNavHandle" :key="index">
            <a v-if="item.navigationWay === 2" :href="jumpHandle(item)">
              <img
                v-lazy="item.navigationImageUrl + $ossImgSet(48, 48)"
                alt=""
              />
              <span>{{ item.name }}</span>
            </a>
            <nuxt-link v-else :to="jumpHandle(item)">
              <img
                v-lazy="item.navigationImageUrl + $ossImgSet(48, 48)"
                alt=""
              />
              <span>{{ item.name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- E 可滚动导航 -->
      <!-- S 自定义滚动条 -->
      <div v-if="rollNavHandle.length > 10" class="scroll-box">
        <span><i :style="{ left: scroLeft + '%' }"></i></span>
      </div>
      <div
        v-else-if="rollNavHandle.length && rollNavHandle.length <= 10"
        class="scroll-box"
      ></div>
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
  computed: {
    // 滚共导航数处理；个数小于等于10，横向排列；个数大于10，前10个横向排列，后面上下排列
    rollNavHandle() {
      const { rollNav } = this
      if (rollNav.length <= 10) {
        return rollNav
      }
      // 超过10个，改变前10个的排列顺序
      const newRollNav = JSON.parse(JSON.stringify(rollNav))
      // 取前10个中的奇数项
      const oddNavArr = rollNav.filter((item, index) => {
        return (index + 1) % 2 !== 0 && index < 10
      })
      // 取前10个的偶数项
      const evenNavArr = rollNav.filter((item, index) => {
        return (index + 1) % 2 === 0 && index < 10
      })
      newRollNav.splice(0, 10, ...oddNavArr.concat(evenNavArr))
      return newRollNav
    },
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
    padding: 28px 16px 0 16px;
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
  .left-and-right {
    overflow: hidden;
    padding: 20px 16px 0;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
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
  .up-and-down {
    overflow-x: auto;
    overflow-y: hidden;
    padding-top: 20px;
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
