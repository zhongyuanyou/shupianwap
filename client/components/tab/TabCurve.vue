<template>
  <!-- tab 切换组件     -->
  <div class="tab-curve">
    <ul class="tab-curve-list">
      <li
        :style="{ 'margin-right': right + 'rem' }"
        v-for="(item, index) in tabList"
        :key="index"
        @click="selectItem(item, index)"
      >
        <span :class="[index === curentItem ? 'tab-curve-active' : '']">{{
          item.label
        }}</span>
        <div class="svg-content">
          <svg
            t="1605860024129"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2014"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24"
            height="24"
          >
            <path
              d="M74.28352 307.456a77.1072 77.1072 0 0 0-34.048 7.936 69.4016 69.4016 0 0 0-32 95.744 569.9072 569.9072 0 0 0 1007.872 4.352 69.3504 69.3504 0 0 0-31.488-96 76.4672 76.4672 0 0 0-100.608 29.952 417.8944 417.8944 0 0 1-743.424-3.328 74.9312 74.9312 0 0 0-66.304-38.656"
              p-id="2015"
              fill="#4974F5"
            ></path>
          </svg>
          <svg
            t="1605860024129"
            class="icon svg-with"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2014"
            width="24"
            height="24"
          >
            <path
              d="M74.28352 307.456a77.1072 77.1072 0 0 0-34.048 7.936 69.4016 69.4016 0 0 0-32 95.744 569.9072 569.9072 0 0 0 1007.872 4.352 69.3504 69.3504 0 0 0-31.488-96 76.4672 76.4672 0 0 0-100.608 29.952 417.8944 417.8944 0 0 1-743.424-3.328 74.9312 74.9312 0 0 0-66.304-38.656"
              p-id="2015"
              fill="#fff"
            ></path>
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TabCurve',
  props: {
    // tab 列表
    tabList: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 每个TAB之间的间距
    right: {
      type: Number,
      default: 0.56,
    },
  },
  data() {
    return {
      curentItem: 0,
    }
  },
  methods: {
    selectItem(item, index) {
      this.curentItem = index
      this.$emit('selectTabHandle', item)
    },
  },
}
</script>

<style lang="less" scoped>
.tab-curve {
  width: 100%;
  &-list {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 104px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-top: 40px;
    padding-left: 40px;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      position: relative;
      white-space: nowrap;
      -webkit-tap-highlight-color: transparent;
      &:last-child {
        padding-right: 40px;
      }
      span {
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        font-size: 32px;
        line-height: 32px;
        background: #fff;
        position: relative;
        z-index: 4;
      }
      .tab-curve-active {
        display: block;
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #4974f5;
        margin-top: -2px;
        & + .svg-content {
          display: block !important;
        }
      }
    }
  }
}
.svg-content {
  display: none;
  overflow: hidden;
  z-index: 3;
  position: relative;
  width: 50px;
  height: 50px;
  margin: -6px auto 0;
  svg {
    position: absolute;
    left: 0;
    top: 0;
  }
  //   forwards infinite
  .svg-with {
    animation: action 0.2s linear forwards;
    background-color: #fff;
    transform-origin: center top;
  }
  @keyframes action {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(-180deg);
    }
  }
}
</style>
