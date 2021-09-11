<template >
  <div class="search_container">
    <div class="search">
      <div class="left-back" @click="back">
        <my-icon
          name="nav_ic_back"
          class="back_icon"
          size="0.4rem"
          :color="classState == 0 ? '#1A1A1A' : '#fff'"
        ></my-icon>
      </div>
      <div
        class="search-box"
        :style="{ color: classState == 0 ? '#1A1A1A' : '#fff' }"
      >
        <div>
          <my-icon
            class="search-icon"
            name="sear_ic_sear"
            size="0.28rem"
            :color="classState == 0 ? '#1A1A1A' : '#fff'"
            @click.native="search"
          ></my-icon>
          <!-- {{ classState == 0 ? title : '' }} -->
        </div>
      </div>
      <div class="right">
        <my-icon
          class="search-icon"
          name="zuobiao_mian"
          size="0.24rem"
          :color="classState == 0 ? '#1A1A1A' : '#fff'"
          @click.native="search"
        ></my-icon>
        <span
          v-if="hasCity || activityTypeOptions.length == 0"
          class="rule"
          :style="{ color: classState == 0 ? '#1A1A1A' : '#fff' }"
          @click="$router.push('/login/protocol?categoryCode=' + code)"
          >规则</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    classState: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      default: '',
    },
    // code: {
    //   type: String,
    //   default: '',
    // },
    back: {
      type: Function,
      default: () => {},
    },
    search: {
      type: Function,
      default: () => {},
    },

    hasCity: {
      type: Boolean,
      default: false,
    },
    activityTypeOptions: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<style lang="less" scoped>
.search_container {
  .search {
    display: flex;
    align-items: center;
    padding: 16px 0;

    background-size: 100% auto;
    -moz-background-size: 100% auto;
    .left-back {
      // display: flex;

      // align-items: center;
      // margin: 0 32px;
      min-width: 104px;
      text-align: center;

      .back_icon {
        width: 40px;
        height: 40px;
      }
    }

    .search-box {
      margin-right: 40px;
      height: 88px;

      display: flex;
      align-items: center;
      flex: 1;

      // font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      // color: #1a1a1a;

      // max-width: 450px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      div {
        flex: 1;
      }
    }
    .right {
      display: flex;
      align-items: center;
      min-width: 150px;
      .rule {
        height: 28px;

        font-weight: bold;
        font-size: 28px;

        letter-spacing: 0;
        text-align: right;
        line-height: 28px;
        margin: 0 32px;
      }
    }
  }
}
</style>
