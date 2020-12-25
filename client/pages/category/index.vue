<template>
  <div class="category">
    <!--S 头部-->
    <div class="category_header">
      <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a" />
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
      <!--S 侧边栏区域-->
      <aside ref="l_list" class="category_con_lf">
        <ul>
          <li
            v-for="(item, index) in categoryList"
            ref="l_item"
            :key="index"
            class="category_con_lf_item"
            :style="{
              backgroundColor: TabNavList == index ? '#fff' : '#f8f8f8',
            }"
            @click="handleClick(index)"
          >
            <div class="line" v-show="TabNavList == index"></div>
            {{ item.name }}
          </li>
        </ul>
      </aside>
      <!--S 侧边栏区域-->
      <!--S 二级分类区域-->
      <section ref="r_list" class="category_con_rt">
        <div>
          <div class="swiper">
            <div v-if="recommendData.length" class="proList swiper_con">
              <sp-swipe
                class="my-swipe"
                :autoplay="3000"
                indicator-color="white"
                :show-indicators="false"
              >
                <sp-swipe-item
                  v-for="(item, index) of recommendData"
                  :key="index"
                >
                  <sp-image
                    fit="cover"
                    class="swipe_img"
                    :src="item.materialList[0].materialUrl"
                  />
                </sp-swipe-item>
              </sp-swipe>
            </div>
          </div>
          <div
            v-for="(item, index) in categoryList"
            :key="index"
            ref="good"
            class="proList"
          >
            <div class="title">{{ item.name }}</div>
            <div class="item_con">
              <div
                v-for="(cItem, cIndex) in item.children"
                :key="cIndex"
                class="item_con_child"
                @click="handleItem(cItem)"
              >
                {{ cItem.name }}
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--E 二级分类区域-->
    </div>
    <!--E 内容区-->
  </div>
</template>

<script>
import Better from 'better-scroll'
import { Swipe, SwipeItem, Image } from '@chipspc/vant-dgg'
import { category } from '@/api'
export default {
  name: 'Index',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
  },
  data() {
    return {
      keywords: '',
      categoryList: [], // 产品分类
      recommendData: [], // 广告数据
      req: [
        'https://img.yzcdn.cn/vant/cat.jpeg',
        'https://img.yzcdn.cn/vant/cat.jpeg',
      ],
      arr: [0], // 高度集合
      scrollY: 0,
      TabNavList: 0, // 左右联动取值
      flag: true,
      categoryData: [], // 当前点击的分类相关数据
    }
  },
  // created() {
  //   this.getCategoryList()
  // },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    inputChange() {},
    _initScroll() {
      // 初始化滚动事件
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
          this.scrollY = Math.abs(res.y) + 64
          for (let i = 0; i < this.arr.length; i++) {
            if (this.scrollY > this.arr[i] && this.scrollY < this.arr[i + 1]) {
              this.TabNavList = i - 1 // 左右联动取值
              // document.getElementById(this.TabNavList).scrollIntoView()
              this.left.scrollToElement(
                this.$refs.l_list,
                100,
                0,
                this.TabNavList * 68
              )
            }
          }
        }
      })
    },
    _getHeight() {
      // 集合右侧内容模块高度
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
    handleClick(index) {
      this.flag = false
      this.TabNavList = index // 左右联动取值
      this.rgt.scrollToElement(this.$refs.good[index], 100, 0, 0)
      setTimeout(() => {
        this.flag = true
      }, 100)
    },
    async getCategoryList() {
      // 获取产品分类集合
      const params = {
        isRecommend: 0,
      }
      const data = await category.home({ axios: this.$axios }, params)
      this.categoryList = data.categoryList
      this.recommendData = data.recommendData
      this.$nextTick(() => {
        this._initScroll()
        this._getHeight()
      })
    },
    handleItem(item) {
      // 点击每一个二级分类
      sessionStorage.categoryData = JSON.stringify(item)
      this.$router.push('/list/serveList')
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
    margin: 0 auto;
    width: 100%;
    height: 100%;
    padding-top: 128px;
    overflow: hidden;
    position: relative;
    display: flex;
    &_lf {
      display: block;
      width: 200px;
      background: #f8f8f8;
      overflow: hidden;
      position: relative;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
      &_item {
        width: 200px;
        height: 124px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        text-align: center;
        line-height: 124px;
        position: relative;
        .textOverflow(1);
      }
      .line {
        width: 6px;
        height: 40px;
        background-color: #4974f5;
        border-radius: 0 3px 3px 0;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -20px;
      }
    }
    &_rt {
      display: block;
      overflow: hidden;
      background: #fff;
      position: relative;
      width: calc(100vw - 200px);
      padding: 0 32px;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      .swiper {
        height: 164px;
        width: 100%;
        overflow: hidden;
        border-radius: 8px;
        &_con {
          padding-top: 16px;
        }
      }
      .my-swipe .sp-swipe-item {
        color: #fff;
        text-align: center;
        background-color: #f8f8f8;
        .swipe_img {
          width: 100%;
          height: 100%;
        }
      }
      .proList {
        padding-top: 48px;
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
          &_child {
            height: 60px;
            background: #ffffff;
            border: 1px solid #cdcdcd;
            border-radius: 4px;
            line-height: 60px;
            margin: 32px 32px 0 0;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
            padding: 0 21px;
          }
        }
      }
    }
  }
}
</style>
