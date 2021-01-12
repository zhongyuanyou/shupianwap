<template>
  <div class="couple">
    <!--S 省导航-->
    <div v-if="coupleData.length" class="couple_province">
      <div
        v-for="(item, index) in coupleData"
        :key="index"
        class="couple_province_item"
        :style="{
          color: pIndex == index ? '#4974F5' : '#222',
          fontWeight: pIndex == index ? 'bold' : 'normal',
          backgroundColor: pIndex == index ? '#fff' : '#f0f0f0',
        }"
        @click="handleProvince(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
    <!--E 省导航-->
    <!--S 市导航-->
    <div :class="['couple_city', { flex_city: isLocation }]">
      <div
        v-if="coupleData && coupleData[pIndex] && coupleData[pIndex].children"
      >
        <div
          v-for="(item, index) in coupleData[pIndex].children"
          :key="index"
          class="couple_province_item flex_item"
          :style="{
            color: cIndex == index ? '#4974F5' : '#222',
            fontWeight: cIndex == index ? 'bold' : 'normal',
            backgroundColor: cIndex == index ? '#fff' : '#f8f8f8',
          }"
          @click="handleCity(item, index)"
        >
          <div>{{ item.name }}</div>
          <div v-show="isLocation && cIndex == index">
            <sp-icon name="success" color="#4974F5" size="0.2rem" />
          </div>
        </div>
      </div>
    </div>
    <!--E 市导航-->
    <!--S 区导航-->
    <div v-if="!isLocation" class="couple_region">
      <div
        v-if="
          coupleData &&
          coupleData[pIndex] &&
          coupleData[pIndex].children &&
          coupleData[pIndex].children[cIndex].children
        "
      >
        <div
          v-for="(item, index) in coupleData[pIndex].children[cIndex].children"
          :key="index"
          class="couple_region_item"
          :class="{ 'couple_region_item-radio': !multiple }"
          @click="handleRegion(item, index)"
        >
          <p
            :style="{
              color: hasRegion(item) ? '#4974F5' : '#222',
              fontWeight: hasRegion(item) ? 'bold' : 'normal',
            }"
          >
            {{ item.name }}
          </p>
          <div
            v-show="item.name !== '不限' && hasRegion(item) && pIndex != 0"
            class="check_con"
          >
            <sp-icon name="success" color="#4974F5" size="0.2rem" />
          </div>
          <div
            v-show="item.name !== '不限' && !hasRegion(item) && pIndex != 0"
            class="blur_con"
          ></div>
        </div>
      </div>
    </div>
    <!--E 区导航-->
    <div class="fix_shadow"></div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
export default {
  name: 'CoupleSelect',
  components: {
    SpIcon: Icon,
  },
  props: {
    cityData: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: true,
    },
    // 回显数据
    backData: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 是否是具体定位城市的数据
    isLocation: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {
      coupleData: [], // 全部省市区数据
      pIndex: 0, // 省下标
      cIndex: 0, // 市下标
      rIndex: 0, // 区下标
      selectData: [], // 选中的数据
    }
  },
  computed: {
    hasRegion() {
      return function (item) {
        const status = this.selectData[2].regions.some((row) => {
          return row.name === item.name && row.code === item.code
        })
        return status
      }
    },
  },
  watch: {
    backData(newVal) {
      if (newVal.length) {
        this.selectData = newVal
        this.initData(newVal)
      } else {
        if (this.isLocation) {
          this.selectData = [
            { name: '全国', code: this.coupleData[0].code },
            { name: '不限', code: '' },
          ]
        } else {
          this.selectData = [
            { name: '全国', code: this.coupleData[0].code },
            { name: '不限', code: '' },
            { regions: new Array({ name: '不限', code: '' }) },
          ]
        }
        this.initData(this.selectData)
      }
    },
  },
  mounted() {
    this.$emit('initThis', this)
    const list = this.cityData
    if (!this.isLocation) {
      if (list[0].name === '全国') {
        list[0].children = [
          {
            name: '不限',
            code: '',
            children: [
              {
                name: '不限',
                code: '',
              },
            ],
          },
        ]
      } else {
        list.unshift({
          name: '全国',
          code: '',
          children: [
            {
              name: '不限',
              code: '',
              children: [
                {
                  name: '不限',
                  code: '',
                },
              ],
            },
          ],
        })
      }
    }
    this.coupleData = list
    if (this.backData.length) {
      this.selectData = this.backData
      this.coupleData.forEach((item, index) => {
        if (
          item.name === this.coupleData[0].name &&
          item.code === this.coupleData[0].code
        ) {
          this.pIndex = index
        }
      })
      this.coupleData[this.pIndex].children.forEach((item, index) => {
        if (
          item.name === this.backData[1].name &&
          item.code === this.backData[1].code
        ) {
          this.cIndex = index
        }
      })
      if (!this.isLocation) {
        this.coupleData[this.pIndex].children[this.cIndex].children.forEach(
          (item, index) => {
            if (
              item.name === this.backData[2].name &&
              item.code === this.backData[2].code
            ) {
              this.rIndex = index
            }
          }
        )
      }
      // 若用户有选择数据后，再进入组件时判断当前对应的省市区是否包含不限选项
      if (this.coupleData[this.pIndex].children[0].name !== '不限') {
        this.coupleData[this.pIndex].children.unshift({
          name: '不限',
          code: '',
        })
        this.cIndex += 1
      }
      if (!this.isLocation) {
        if (
          this.coupleData[this.pIndex].children[this.cIndex].children[0]
            .name !== '不限'
        ) {
          this.coupleData[this.pIndex].children[this.cIndex].children.unshift({
            name: '不限',
            code: '',
          })
        }
      }
    } else if (this.isLocation) {
      this.selectData = [
        { name: this.coupleData[0].name, code: this.coupleData[0].code || '' },
        { name: '不限', code: '' },
      ]
    } else {
      this.selectData = [
        { name: '全国', code: this.coupleData[0].code || '' },
        { name: '不限', code: '' },
        { regions: new Array({ name: '不限', code: '' }) },
      ]
    }
    if (this.coupleData[0].children[0].name !== '不限') {
      this.coupleData[0].children.unshift({
        name: '不限',
        code: '',
      })
    }
    if (!this.isLocation) {
      if (this.coupleData[0].children[0].children[0].name !== '不限') {
        this.coupleData[0].children[0].children.unshift({
          name: '不限',
          code: '',
        })
      }
    }
  },
  methods: {
    handleProvince(item, index) {
      // 点击省
      this.pIndex = index
      const arr = this.selectData
      // 赋值省数据
      const { name, code } = item
      if (!arr.length || (arr[0].name !== name && arr[0].code !== code)) {
        // 若初次选择省数据或者切换了省数据
        arr[0] = { name, code }
        if (index === 0) {
          arr[1] = { name: '不限', code: '' }
          arr[2] = { regions: [{ name: '不限', code: '' }] }
        } else {
          if (this.coupleData[index].children[0].name !== '不限') {
            this.coupleData[index].children.unshift({
              name: '不限',
              code: '',
              children: [{ name: '不限', code: '' }],
            })
          }
          const { name, code } = this.coupleData[this.pIndex].children[0]
          arr[1] = { name, code }
          arr[2] = { regions: [{ name: '不限', code: '' }] }
        }

        this.cIndex = 0
        this.rIndex = 0
        this.selectData = arr
      }
      this.$emit(
        'select',
        this.isLocation ? this.selectData.slice(0, 2) : this.selectData
      )
    },
    handleCity(item, index) {
      // 点击市
      this.cIndex = index
      const arr = this.selectData
      // 赋值省数据
      const { name, code } = item
      if (arr.length === 1 || (arr[1].name !== name && arr[1].code !== code)) {
        if (!this.isLocation) {
          if (
            this.coupleData[this.pIndex].children[index].children[0].name !==
            '不限'
          ) {
            this.coupleData[this.pIndex].children[index].children.unshift({
              name: '不限',
              code: '',
            })
          }
        }
        // 若初次选择市数据或者切换了市数据
        arr[1] = { name, code }
        arr[2] = { regions: [{ name: '不限', code: '' }] }
        this.rIndex = 0
        this.selectData = arr
      }
      this.$emit(
        'select',
        this.isLocation ? this.selectData.slice(0, 2) : this.selectData
      )
    },
    handleRegion(item, index) {
      // 点击区
      this.rIndex = index
      const arr = this.selectData[2]
      if (item.name === '不限') {
        arr.regions = [{ name: '不限', code: '' }]
      } else {
        if (arr.regions[0].name === '不限') {
          arr.regions.shift()
        }
        if (!arr.regions || !this.checkHas(arr.regions, item.name, item.code)) {
          // 单选
          if (!this.multiple) {
            arr.regions = [item]
          } else {
            arr.regions.push(item)
          }
        } else {
          // 单选
          if (!this.multiple) return
          let index = -1
          arr.regions.forEach((row, i) => {
            if (row.name === item.name && row.code === item.code) {
              index = i
            }
          })
          arr.regions.splice(index, 1)
          if (!arr.regions.length) {
            arr.regions = [{ name: '不限', code: '' }]
          }
        }
      }
      // this.selectData[2].regions = arr
      this.$set(this.selectData, 2, arr)
      this.$emit('select', this.selectData)
    },
    checkHas(arr, name, code) {
      const isHas = arr.some((item) => {
        return item.name === name && item.code === code
      })
      return isHas
    },
    clear() {
      this.selectData = this.selectData = [
        { name: '全国', code: '' },
        { name: '不限', code: '' },
        { regions: new Array({ name: '不限', code: '' }) },
      ]
      this.$emit('clear', this.selectData)
    },
    initData(newVal) {
      this.cityData.forEach((item, index) => {
        if (item.name === newVal[0].name && item.code === newVal[0].code) {
          this.pIndex = index
        }
      })
      this.cityData[this.pIndex].children.forEach((item, index) => {
        if (item.name === newVal[1].name && item.code === newVal[1].code) {
          this.cIndex = index
        }
      })
      if (!this.isLocation) {
        this.cityData[this.pIndex].children[this.cIndex].children.forEach(
          (item, index) => {
            if (item.name === newVal[2].name && item.code === newVal[2].code) {
              this.rIndex = index
            }
          }
        )
      }
    },
  },
}
</script>

<style lang="less" scoped>
.couple {
  width: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  max-height: 400px;
  min-height: 200px;
  .fix_shadow {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 84px;
    background: linear-gradient(0deg, #ffffff, rgba(255, 255, 255, 0));
    pointer-events: none;
  }
  &_province {
    display: block;
    width: 162px;
    background-color: #f0f0f0;
    overflow: hidden;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    &_item {
      height: 84px;
      text-align: center;
      line-height: 84px;
      font-size: 28px;
      max-width: 100%;
      padding: 0 10px;
      .textOverflow(1);
      &:first-child {
        margin-top: 28px;
      }
    }
  }
  &_province::-webkit-scrollbar {
    display: none;
  }
  &_city {
    width: 240px;
    background-color: #f8f8f8;
    overflow: hidden;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  &_city::-webkit-scrollbar {
    display: none;
  }
  .flex_city {
    display: flex;
    flex: 1;
    .flex_item {
      width: calc(100vw - 162px);
      text-align: left;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
  }
  &_region {
    display: flex;
    flex: 1;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    &_item {
      width: calc(100vw - 402px);
      height: 84px;
      text-align: center;
      line-height: 84px;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      p {
        font-size: 28px;
      }
      &:first-child {
        margin-top: 28px;
      }
    }
    &_item-radio {
      .check_con,
      .blur_con {
        border: none !important;
      }
    }
    .check_con {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      border: 2px solid #3072f6;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .blur_con {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      border: 2px solid #cdcdcd;
    }
  }
  &_region::-webkit-scrollbar {
    display: none;
  }
}
</style>
