<template>
  <div class="hot-moudle">
    <ul>
      <li
        v-for="(item, index) in labelBtn"
        :key="index"
        :class="{ active: index === currentItem }"
        @click="swichHandle(index)"
      >
        <a href="javascript:void(0);">{{ item.name }}</a>
      </li>
    </ul>
    <div class="hot-list">
      <a
        v-for="(item, index) in labelBtn[currentItem].data"
        :key="index"
        href="javascript:void(0);"
      >
        <span>{{ item.name }}</span>
        <strong>{{ item.title }}</strong>
        <p>{{ item.describe }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    labelBtn: {
      type: Array,
      default: () => {
        return [
          {
            name: '热门服务',
            code: '1',
            data: [
              {
                name: '老板必看1老板必看1老板必看1',
                title: '有限公司注册1老板必看1老板必看1',
                describe: '7天内可交付1老板必看1老板必看1',
              },
              {
                name: '老板必看',
                title: '有限公司注册',
                describe: '7天内可交付',
              },
              {
                name: '老板必看',
                title: '有限公司注册',
                describe: '7天内可交付',
              },
            ],
          },
          {
            name: '今日必看',
            code: '2',
            data: [
              {
                name: '老板必看2',
                title: '有限公司注册2',
                describe: '7天内可交付2',
              },
              {
                name: '老板必看',
                title: '有限公司注册',
                describe: '7天内可交付',
              },
              {
                name: '老板必看',
                title: '有限公司注册',
                describe: '7天内可交付',
              },
            ],
          },
          {
            name: '刚需捡漏',
            code: '3',
            data: [
              {
                name: '老板必看3',
                title: '有限公司注册3',
                describe: '7天内可交付3',
              },
              {
                name: '老板必看',
                title: '有限公司注册',
                describe: '7天内可交付',
              },
              {
                name: '老板必看',
                title: '有限公司注册',
                describe: '7天内可交付',
              },
            ],
          },
          {
            name: '限时特惠',
            code: '4',
            data: [
              {
                name: '老板必看4',
                title: '有限公司4',
                describe: '7天内可交付4',
              },
              {
                name: '老板必看',
                title: '有限公司注册',
                describe: '7天内可交付',
              },
              {
                name: '老板必看',
                title: '有限公司注册',
                describe: '7天内可交付',
              },
            ],
          },
        ]
      },
    },
  },
  data() {
    return {
      currentItem: 0,
      timer: null,
    }
  },
  mounted() {
    this.timer = setInterval(this.swiperHandle, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    swiperHandle() {
      if (this.currentItem + 1 < this.labelBtn.length) {
        this.currentItem += 1
      } else {
        this.currentItem = 0
      }
    },
    swichHandle(index) {
      clearInterval(this.timer)
      this.currentItem = index
      this.timer = setInterval(this.swiperHandle, 5000)
    },
  },
}
</script>

<style scoped lang="less">
.hot-moudle {
  width: 100%;
  padding: 32px 40px;
  ul {
    display: flex;
    li {
      width: 144px;
      height: 64px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      margin-right: 16px;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
      }
    }
    .active {
      position: relative;
      background-color: #e6624b;
      border-color: #e6624b;
      > a {
        color: #ffffff;
      }
      &::after {
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        width: 0;
        height: 0;
        border-width: 12px 16px 0 16px;
        border-style: solid;
        border-color: #e6624b transparent transparent transparent;
      }
    }
  }
  .hot-list {
    width: 100%;
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    > a {
      width: 32%;
      height: 144px;
      display: flex;
      flex-direction: column;
      padding: 19px 22px 20px 24px;
      background: #f8f8f8;
      border-radius: 8px;
      > span {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ad4935;
        line-height: 32px;
        .textOverflow(1);
      }
      > strong {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 38px;
        margin-top: 6px;
        .textOverflow(1);
      }
      > p {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 32px;
        margin-top: 3px;
        .textOverflow(1);
      }
    }
  }
}
</style>
