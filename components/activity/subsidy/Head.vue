<template >
  <div class="search_container">
    <div class="search">
      <div class="left-back" @click="back">
        <my-icon
          name="nav_ic_back"
          class="back_icon"
          size="0.4rem"
          :color="'#fff'"
        ></my-icon>
      </div>
      <div
        class="search-box"
        :style="{ color: '#fff' }"
        @click="clickInputHandle"
      >
        <div>
          <my-icon
            class="search-icon"
            name="sear_ic_sear"
            size="0.28rem"
            :color="classState == 0 ? '#D8D8D8' : '#fff'"
            @click.native="search"
          ></my-icon>
          搜索商品
        </div>
      </div>

      <div
        v-if="hasCity || activityTypeOptions.length == 0"
        class="right"
        @click="swichCityHandle"
      >
        <my-icon
          class="search-icon"
          name="zuobiao_mian"
          size="0.24rem"
          :color="'#fff'"
        ></my-icon>
        <span class="city" :style="{ color: '#fff' }">{{ cityName }}</span>
        <my-icon
          class="search-icon"
          name="sear_ic_open"
          size="0.1rem"
          :color="'#fff'"
        ></my-icon>
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
    cityName: {
      type: String,
      default: '定位中',
    },
    activityTypeOptions: {
      type: Array,
      default: () => [],
    },
    clickInputHandle: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    swichCityHandle() {
      this.$router.push({
        path: '/city/choiceCity',
        query: {
          type: 1,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.search_container {
  .search {
    display: flex;
    align-items: center;
    padding: 34px 0 34px;

    .left-back {
      display: flex;
      align-items: center;
      margin: 0 32px;
      // min-width: 104px;
      text-align: center;

      .back_icon {
        width: 40px;
        height: 40px;
      }
    }

    .search-box {
      margin-right: 33px;
      height: 68px;

      display: flex;
      align-items: center;
      flex: 1;

      font-family: PingFang SC;
      font-weight: bold;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      background: rgba(255, 255, 255, 0.3);
      border-radius: 8px;

      div {
        display: flex;
        align-items: center;
        flex: 1;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #cccccc;
        .search-icon {
          margin: 0 16px 0 24px;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      min-width: 150px;
      margin-right: 33px;

      .city {
        height: 28px;

        font-weight: bold;
        font-size: 28px;

        letter-spacing: 0;
        text-align: right;
        line-height: 28px;
        margin: 0 12px;
      }
    }
  }
}
</style>
