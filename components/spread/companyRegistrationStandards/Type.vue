<template>
  <div class="type">
    <div class="type-box">
      <p class="type-box-title">选择您想注册的公司类型</p>
      <div class="type-select">
        <div class="type-select-title">
          {{ actions[key].name }}
          <a
            v-sensorsTrack:webClick="{
              eventName: 'wap元素点击',
              name: '公司注册标准_注册类型',
            }"
            class="a-clear"
          >
            <div @click="show = true">
              <my-icon
                name="input_ic_open"
                size="0.2rem"
                class="input_ic_open"
                color="#cccccc"
              ></my-icon>
            </div>
          </a>
        </div>
        <sp-action-sheet
          v-model="show"
          :actions="actions"
          description="注册公司类型"
          @select="onSelect"
        />
        <div class="standard">
          <p class="standard-type">注册标准：</p>
          <p
            v-for="(item, i) of data[key].rs"
            :key="'info2-' + i"
            class="content-info retract"
          >
            {{ item }}
          </p>
          <p class="standard-type">所需资料：</p>
          <p
            v-for="(value, index) of data[key].material"
            :key="index"
            class="content-info"
          >
            <img
              class="content-info-img"
              src="https://cdn.shupian.cn/sp-pt/wap/images/cfnylfj3tgw0000.png"
              alt=""
            />
            {{ value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ActionSheet } from '@chipspc/vant-dgg'
import MyIcon from '@/components/common/myIcon/MyIcon'
export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    MyIcon,
  },
  props: {
    data: {
      type: [Array],
      default: () => [],
    },
  },
  data() {
    return {
      key: 0,
      show: false,
      actions: [
        { name: '有限责任公司', color: '#5a79e8' },
        { name: '个体工商户', color: '#000' },
        { name: '股份有限公司', color: '#000' },
        { name: '分公司注册', color: '#000' },
        { name: '外资公司注册', color: '#000' },
        { name: '合伙企业注册', color: '#000' },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSelect(item, index) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      this.key = index
      // 循环actions数组将列表颜色重置为黑色
      this.actions.forEach((item) => {
        item.color = '#000'
      })
      // 改变选中的颜色
      item.color = '#5a79e8'
    },
  },
}
</script>
<style lang="less" scoped>
.a-clear{
  text-decoration: none;
 	color: inherit;
}
.type {
  width: 100%;
  padding: 0 40px;
  margin-bottom: 64px;
  // background: violet;
  /deep/.sp-popup {
    width: 750px;
    left: 50%;
    margin-left: -375px
    // transform: translate(-50%);
  }
  /deep/.sp-overlay{
    width: 750px;
    left: 50%;
    margin-left: -375px
  }
  /deep/.sp-action-sheet__description {
    font-size: 35px;
    font-weight: 700;
    color: #000;
  }
  .type-box {
    width: 100%;
    &-title {
      font-size: 40px;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 52px;
      padding-bottom: 31px;
    }
    .type-select {
      width: 100%;
      border: 1px solid rgba(205, 205, 205, 0.5);
      border-radius: 8px;
      &-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        border-top-left-radius: 0.05rem;
        border-top-right-radius: 0.05rem;
        color: #222222;
        font-size: 32px;
        background: #f8f8f8;
        padding: 31px 25px 31px 25px;
        height: 93px;
      }
      .standard {
        padding: 31px 46px 40px 33px;
        &-type {
          padding-bottom: 23px;
          color: #222222;
          font-size: 28px;
          font-weight: bold;
          line-height: 42px;
        }
        .retract {
          text-indent: -2.54em;
          margin-left: 1.8em;
        }
        .content-info {
          font-size: 26px;
          font-weight: 400;
          color: #555555;
          line-height: 38px;
          display: flex;
          // align-items: center;
          &:not(:last-child) {
            margin-bottom: 23px;
          }
          &-img {
            width: 8px;
            height: 8px;
            display: block;
            margin-right: 8px;
            margin-top: 16px;
          }
        }
      }
    }
  }
}
</style>
