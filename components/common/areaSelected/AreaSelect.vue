<template>
  <sp-popup
    v-model="visible"
    position="bottom"
    class="popup"
    :close-on-popstate="true"
    @close="closePopup"
  >
    <!-- S 头部 -->
    <Header @closePopup="closePopup" />
    <!-- E 头部 -->
    <div v-if="selectList.length" class="select">
      <div
        v-for="(item, index) in selectList.slice(0, 2)"
        :key="item.name"
        :style="{
          color:
            selectList.length === 1
              ? '#4974f5'
              : step == index
              ? '#4974f5'
              : '#222',
        }"
        class="select_item"
        @click="changeCity(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- S 内容 -->
    <div
      class="popup_con"
      :style="{
        height: selectList.length ? '8.61rem' : '9.35rem',
        marginTop: selectList.length ? '2.06rem' : '1.32rem',
      }"
    >
      <!--被选中的省市显示区域-->
      <sp-index-bar
        :index-list="indexList"
        highlight-color="#4974F5"
        :sticky="false"
        class="popup_con_bar"
      >
        <div v-for="item in city" :key="item.name">
          <!-- S 索引标题 -->
          <sp-index-anchor :index="item.code" :class="['title_con']">{{
            item.code
          }}</sp-index-anchor>
          <!-- E 索引标题 -->
          <!-- S 热门城市 -->
          <div v-if="item.code != '热'">
            <div
              v-for="(cItem, index) in item.children"
              :key="cItem.name"
              class="cell"
              @click="select(cItem, index)"
            >
              <p
                class="title"
                :style="{
                  color: selectList.length
                    ? step == 0
                      ? selectList[0] &&
                        selectList[0].name &&
                        cItem.name.indexOf(selectList[0].name) > -1
                        ? '#4974F5'
                        : '#222'
                      : selectList[1] &&
                        selectList[1].name &&
                        cItem.name.indexOf(selectList[1].name) > -1
                      ? '#4974F5'
                      : '#222'
                    : '#222',
                  fontWeight: selectList.length
                    ? step == 0
                      ? selectList[0] &&
                        selectList[0].name &&
                        cItem.name.indexOf(selectList[0].name) > -1
                        ? 'bold'
                        : 'normal'
                      : selectList[1] &&
                        selectList[1].name &&
                        cItem.name.indexOf(selectList[1].name) > -1
                      ? 'bold'
                      : 'normal'
                    : 'normal',
                }"
              >
                {{ cItem.name }}
              </p>
              <div>
                <sp-icon
                  v-show="
                    selectList.length &&
                    ((step == 0 &&
                      selectList[0] &&
                      selectList[0].name &&
                      cItem.name.indexOf(selectList[0].name) > -1) ||
                      (step == 1 &&
                        selectList[1] &&
                        selectList[1].name &&
                        cItem.name.indexOf(selectList[1].name) > -1))
                  "
                  name="success"
                  color="#4974F5"
                  size="0.3rem"
                />
              </div>
            </div>
          </div>
          <!-- E 热门城市 -->
          <!-- S 城市 -->
          <div v-else class="popup_con_hot">
            <div
              v-for="(cItem, index) in item.info.children"
              :key="cItem.name"
              class="popup_con_hot_item"
              @click="select(cItem, index)"
            >
              {{ cItem.name }}
            </div>
          </div>
          <!-- E 城市 -->
        </div>
      </sp-index-bar>
    </div>
    <!-- E 内容 -->
    <LoadingCenter v-show="loading" />
  </sp-popup>
</template>

<script>
import { Popup, IndexAnchor, IndexBar, Icon } from '@chipspc/vant-dgg'
import pyjs from 'js-pinyin'
import Header from '~/components/common/areaSelected/components/Header'
import { dict } from '~/api'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  name: 'CitySelect',
  components: {
    SpPopup: Popup,
    SpIndexAnchor: IndexAnchor,
    SpIndexBar: IndexBar,
    SpIcon: Icon,
    Header,
    LoadingCenter,
  },
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    cityData: {
      // 被选中的值
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      visible: false,
      pyCitys: [],
      indexList: [], // 所有有城市的索引集合
      cityArr: [],
      city: [], // 所有有数据的城市集合
      cityList: [],
      loading: false, // 加载状态
      FristPin: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z',
      ], // 所有字母
      hotCity: {
        name: '热门城市',
        code: '热',
        children: [
          {
            name: '成都',
            code: 'cd',
          },
          {
            name: '遂宁',
            code: 'sn',
          },
        ],
      },
      selectList: this.cityData || [], // 已选中的省市数据集合
      step: 0, // 操作步骤
      focusInfo: null, // 已经数据中当前聚焦的数据
    }
  },
  watch: {
    show: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.visible = this.show
        this.step = 0
        this.clear()
        this.initCity(this.cityList)
      },
      immediate: true,
    },
    cityData(newVal) {
      this.selectList = newVal
      if (newVal.length && this.cityList.length) {
        let tIndex = ''
        this.cityList.forEach((item, index) => {
          if (item.name.indexOf(this.selectList[0].name) > -1) {
            tIndex = index
            this.selectList[0] = item
          }
        })
        this.cityList[tIndex].children.forEach((item) => {
          if (item.name.indexOf(this.selectList[1].name) > -1) {
            this.selectList[1] = item
          }
        })
      }
    },
  },
  mounted() {
    this.getCityList()
  },
  methods: {
    initCity(cityList) {
      const { cityArr, FristPin } = this
      const cityjson = {}
      for (let i = 0; i < cityList.length; i++) {
        const firstName = pyjs.getCamelChars(cityList[i].name).substr(0, 1) // 拿到城市首字母，并保存
        cityList[i].first = firstName // 给原先城市键值对添加first属性
        cityArr.push(cityList[i])
      }
      for (let i = 0; i < FristPin.length; i++) {
        // 这里的FirstPin是一个写入了所有字母的数组,
        cityjson[FristPin[i]] = cityArr.filter(function (value) {
          return value.first === FristPin[i]
        })
      }
      // 所有有城市的集合
      const citys = []
      // 所有有城市的索引
      const indexs = []
      FristPin.forEach((item) => {
        if (cityjson[item].length) {
          indexs.push(item)
          citys.push({
            code: item,
            children: cityjson[item],
          })
        }
      })
      // 判断是否有热门城市数据，若有，则添加到对应的索引
      // if (this.hotCity) {
      //   indexs.unshift('热')
      //   citys.unshift({
      //     code: '热',
      //     info: this.hotCity,
      //   })
      // }
      this.indexList = indexs
      this.city = citys
    },
    closePopup() {
      //  关闭弹窗
      this.$emit('update:show', false)
      this.visible = false
    },
    clear() {
      // 清除数据
      this.city = []
      this.cityArr = []
      this.pyCitys = []
      this.indexList = []
    },
    select(item, index) {
      // 选择城市
      const spCitys = [
        '北京市',
        '澳门特别行政区',
        '台湾省',
        '天津市',
        '上海市',
        '香港特别行政区',
        '重庆市',
      ]
      const arr = this.selectList
      if (this.step === 0) {
        this.clear()
        if (!arr.length || item !== arr[0]) {
          arr[0] = item
          arr.length = 1
        }
        this.selectList = arr
        if (spCitys.includes(item.name)) {
          arr[1] = { name: '', code: '' }
          this.$emit('select', this.selectList)
          this.closePopup()
        }
        this.initCity(item.children)
        // 设置步骤
        this.step++
        return
      }
      // 重置步骤
      arr[1] = item
      // 赋值选中的数据
      this.selectList = arr
      this.step = 0
      this.$emit('select', this.selectList)
      this.closePopup()
    },
    changeCity(item, index) {
      this.$nextTick(() => {
        // 切换省市
        this.step = index
        this.clear()
        if (index === 0) {
          // 若点击到省
          this.initCity(this.cityList)
        } else {
          if (this.cityData.length) {
            let tIndex = ''
            this.cityList.forEach((item, index) => {
              if (item.name === this.selectList[0].name) {
                tIndex = index
                this.selectList[0] = item
              }
            })
            this.cityList[tIndex].children.forEach((item) => {
              if (item.name === this.selectList[1].name) {
                this.selectList[1] = item
              }
            })
          }
          this.initCity(this.selectList[0].children)
        }
      })
    },
    async getCityList() {
      this.loading = true
      try {
        const res = await dict.findCmsTier(
          { axios: this.$axios },
          { code: '2147483647' }
        )
        this.loading = false
        this.cityList = res
        this.initCity(this.cityList)
      } catch (err) {
        this.loading = false
        this.cityList = []
      }
    },
  },
}
</script>

<style lang="less" scoped>
.popup {
  height: 1067px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  .select {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    padding-left: 40px;
    height: 74px;
    background-color: #fff;
    position: absolute;
    top: 132px;
    left: 0;
    right: 0;
    z-index: 2;
    &_item {
      font-size: 28px;
      font-weight: bold;
      margin-right: 64px;
    }
  }
  &_con {
    //overflow-y: scroll;
    //overflow-x: hidden;
    //-webkit-overflow-scrolling: touch;
    padding: 0;
    /deep/ .popup_con_bar {
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    &_bar {
      padding: 0;
      .title_con {
        height: 69px;
        line-height: 74px;
        padding: 0;
        /deep/ .sp-index-anchor {
          padding-left: 40px;
        }
      }
      /deep/ .sp-index-bar__sidebar {
        position: absolute;
        transform: translateY(-45%);
        z-index: 999;
        span {
          font-size: 19px;
          margin-bottom: 15px;
        }
      }
    }
    .hot_title {
      color: #999;
      font-size: 28px;
    }
    .normal_title {
      color: #222;
      font-size: 26px;
      font-weight: bold;
    }
    .cell {
      height: 74px;
      line-height: 74px;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      .title {
        color: #222;
        font-size: 28px;
      }
      > div {
        height: 74px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    &_hot {
      padding: 0 54px 36px 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      &_item {
        height: 64px;
        width: 152px;
        background-color: #f8f8f8;
        line-height: 64px;
        text-align: center;
        margin-left: 16px;
        margin-top: 16px;
        border-radius: 4px;
        color: #555;
        font-size: 28px;
        &:nth-child(4n + 1) {
          margin-left: 0;
        }
      }
    }
  }
  &_con::-webkit-scrollbar {
    display: none;
  }
}
</style>
