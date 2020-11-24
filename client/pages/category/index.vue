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
      <!--S 左侧导航栏-->
      <div class="category_con_lf">
        <div class="category_con_lf_container">
          <ul ref="l_list">
            <li
              v-for="(item, index) in navList"
              :key="index"
              ref="l_item"
              :style="{ color: TabNavList === index ? '#008489' : '#222' }"
              class="category_con_lf_container_item"
              @click="selectNav(index, index)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>
      <!--E 左侧导航栏-->
      <!--S 右侧内容区-->
      <div ref="rightMenu" class="category_con_rt">
        <div class="category_con_rt_container">
          <ul ref="r_list">
            <li
              v-for="(item, index) in navList"
              ref="good"
              :key="index"
              class="right_item proList"
            >
              <p class="title">{{ item.title }}</p>
              <div class="item_con">
                <div
                  v-for="(cItem, cIndex) in item.children"
                  :key="cIndex"
                  class="child"
                >
                  {{ cItem.title }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--S 右侧内容区-->
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
          title: '热门推荐',
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
      req: [
        'https://img.yzcdn.cn/vant/cat.jpeg',
        'https://img.yzcdn.cn/vant/cat.jpeg',
      ],
      arr: [0],
      scrollY: 0, // 定义的Y滚动轴及初始值
      TabNavList: 0, // 左右联动取值
      isScroll: false,
      flag: true,
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this._initScroll()
      // this._getHeight()
    })
  },
  methods: {
    inputChange() {},
    selectNav(item, index) {
      // this.flag = false
      // this.TabNavList = index // 左右联动取值
      // this.rgt.scrollToElement(this.$refs.good[index], 100, 0, 0)
      // setTimeout(() => {
      //   this.flag = true
      // }, 100)
    },
    _initScroll() {
      this.left = new Better(this.$refs.l_list, {
        click: true,
        probeType: 3,
      })
      this.rgt = new Better(this.$refs.r_list, {
        probeType: 3,
        click: true,
      })
      this.rgt.on('scroll', (res) => {
        if (this.flag) {
          this.scrollY = Math.abs(res.y) + 16 // 页面内有一个16像素的顶部状态栏
          for (let i = 0; i < this.arr.length; i++) {
            if (this.scrollY > this.arr[i] && this.scrollY < this.arr[i + 1]) {
              this.TabNavList = i - 1 // 左右联动取值
              // console.log(this.navList[this.TabNavList].gcName) // 取出元素的gcName
              this.isScroll = true
              // document.getElementById(this.TabNavList).scrollIntoView()
              this.left.scrollToElement(
                this.$refs.l_list,
                100,
                0,
                this.TabNavList * 60
              )
            }
          }
        }
      })
      this.left.on('scroll', (res) => {
        if (this.flag) {
          this.scrollY = Math.abs(res.y) + 16
          this.left.scrollToElement(
            this.$refs.l_list[this.TabNavList],
            100,
            0,
            0
          )
        }
      })
    },
    _getHeight() {
      const rightItems = this.$refs.r_list.getElementsByClassName('proList')
      setTimeout(() => {
        // 根据betterScroll定义滚动
        if (rightItems && rightItems.length > 0) {
          let height = 0
          this.arr.push(height)
          for (let i = 0; i < rightItems.length; i++) {
            const item = rightItems[i]
            height += item.clientHeight
            this.arr.push(height)
          }
        }
      }, 600)
    },
  },
}
</script>

<style lang="less" scoped>
.category {
  margin: 0 auto;
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
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
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
    margin: 128px 0 0 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    &_lf {
      width: 200px;
      flex: 0 0 200px;
      background-color: #f8f8f8;
      overflow-y: scroll;
      &_container {
        &_item {
          width: 100%;
          height: 124px;
          background: #f8f8f8;
          border-radius: 0 8px 0 0;
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 124px;
          text-align: center;
        }
      }
    }
    &_rt {
      flex: 1;
      padding: 0 32px;
      overflow-y: scroll;
      &_container {
        .right_item {
          margin-top: 49px;
          .title {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
          }
          .item_con {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: row;
            flex-wrap: wrap;
            .child {
              padding: 0 21px;
              height: 60px;
              background: #ffffff;
              border: 1px solid #cdcdcd;
              border-radius: 4px;
              margin: 32px 32px 0 0;
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #555555;
              line-height: 60px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
