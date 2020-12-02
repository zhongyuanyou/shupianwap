<template>
  <div :class="{ 'fixed-head': fixed }" :style="{ height: headHeight }">
    <div class="my-head" :style="{ height: headHeight }">
      <div class="slot-left">
        <slot name="left">
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="onLeftClick"
          ></my-icon>
        </slot>
      </div>
      <strong class="title">{{ title }}</strong>
      <div class="slot-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    // 头部标题
    title: {
      type: String,
      default: () => '帮助中心',
    },
    // 头部高度
    height: {
      required: false,
      type: [Number, String],
      default: () => '0.88rem',
    },
    // 是否吸顶
    fixed: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    headHeight() {
      if (typeof this.height === 'number') {
        return this.height + 'px'
      }
      return this.height
    },
  },
  mounted() {
    console.log(typeof this.height)
  },
  methods: {
    onLeftClick() {
      this.$router.back(-1)
    },
  },
}
</script>
<style lang="less" scoped>
.my-head {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  font-size: 24px;
  .slot-left {
    display: flex;
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
    .back-icon {
      margin-left: 40px;
    }
  }
  .title {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    flex: 1;
    text-align: center;
  }
  .slot-right {
    display: flex;
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
  }
}
.fixed-head {
  width: 100%;
  .my-head {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
}
</style>
