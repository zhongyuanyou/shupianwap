<template>
  <!-- 分类 -->
  <sp-dropdown-menu>
    <!-- 国际分类 -->
    <sp-dropdown-item
      v-model="value1"
      :title="title1"
      :options="option1"
      @change="change1($event)"
    />
    <!-- 当前状态 -->
    <sp-dropdown-item
      v-model="value2"
      :title="title2"
      :options="option2"
      @change="change2($event)"
    />
    <sp-dropdown-item ref="item" v-model="value3" :title="title3">
      <template>
        <div v-for="list in option3" :key="list.id">
          <div class="option-title">{{ list.title }}</div>
          <div class="custom">
            <div
              v-for="item in list.list"
              :key="item.id"
              :class="item.value === value3 ? 'active' : ''"
              @click="custom(item)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
        <div class="filter-footer">
          <div class="filter-footer-rest">
            <div class="filter-footer-rest-icon">
              <my-icon name="tab_ic_redu" color="#1A1A1A" size="0.4rem" />
            </div>
            <span class="filter-footer-rest-text">重置</span>
          </div>
          <div>确定</div>
        </div>
      </template>
    </sp-dropdown-item>
  </sp-dropdown-menu>
</template>

<script>
import { DropdownMenu, DropdownItem } from '@chipspc/vant-dgg'
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      title1: '全国',
      title2: '全部行业',
      title3: '更多筛选',
      option1: [
        { text: '默认排序', value: 1 },
        { text: '评分由高到低', value: 2 },
      ],
      option2: [
        { text: '全部', value: 0 },
        { text: '商标已注册', value: 1 },
        { text: '商标无效', value: 2 },
        { text: '等待实质审查', value: 3 },
        { text: '初审公告', value: 4 },
        { text: '商标申请中', value: 5 },
        { text: '其他', value: 6 },
        { text: '驳回复审中', value: 7 },
      ],
      option3: [
        {
          title: '成立年限',
          list: [
            { text: '全部', value: '0' },
            { text: '2021年', value: 1 },
            { text: '2021年', value: 2 },
            { text: '2021年', value: 3 },
            { text: '2021年', value: 4 },
          ],
        },
        {
          title: '注册资本',
          list: [
            { text: '全部', value: '0' },
            { text: '2021年', value: 1 },
            { text: '2021年', value: 2 },
            { text: '2021年', value: 3 },
            { text: '2021年', value: 4 },
          ],
        },
        {
          title: '人员规模',
          list: [
            { text: '全部', value: '0' },
            { text: '2021年', value: 1 },
            { text: '2021年', value: 2 },
            { text: '2021年', value: 3 },
            { text: '2021年', value: 4 },
          ],
        },
      ],
    }
  },
  methods: {
    custom(item) {
      this.title3 = item.text
      this.value3 = item.value
      this.$refs.item.toggle()
    },
    change1(val) {
      this.title1 = this.option1.find((item) => {
        return item.value === val
      }).text
    },
    change2(val) {
      this.title2 = this.option2.find((item) => {
        return item.value === val
      }).text
    },
  },
}
</script>

<style lang="less" scoped>
.option-title {
  padding: 55px 40px 32px;
  font-family: PingFangSC-Medium;
  font-size: 36px;
  color: #1a1a1a;
  line-height: 36px;
}
.custom {
  padding: 0px 40px 16px;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  div {
    text-align: center;
    background: #f8f8f8;
    border-radius: 4px;
    width: 206px;
    padding: 20px 0;
    margin-bottom: 24px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #222222;
  }
  .active {
    border-radius: 4px;
    width: 206px;
    padding: 20px 0;
    margin-bottom: 24px;
    font-size: 24px;
    background: #f2f5ff;
    border-radius: 4px;
    color: #4974f5;
    text-align: center;
  }
}
.filter-footer {
  display: flex;
  height: 159px;
  box-sizing: border-box;
  padding: 31px 40px 32px 0;
  font-size: 0px;

  & > div:nth-child(1) {
    font-family: PingFangSC-Medium;

    text-align: center;
    padding: 0px 44px;
    .filter-footer-rest-icon {
      padding: 10px 0;
    }
    .filter-footer-rest-text {
      color: #1a1a1a;
      letter-spacing: 0;
      font-size: 24px;
      line-height: 24px;
    }
  }
  & > div:nth-child(2) {
    flex: 1;
    background: #4974f5;
    border-radius: 8px;
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #ffffff;
    text-align: center;
    line-height: 96px;
    height: 96px;
    cursor: pointer;
  }
}

::v-deep .sp-cell::after {
  border: 0;
}

::v-deep .sp-dropdown-menu__bar {
  box-shadow: none;
}
</style>
