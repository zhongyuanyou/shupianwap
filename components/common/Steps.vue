<template >
  <div class="steps">
    <div v-for="(item, index) of newList" :key="index" class="task_item">
      <div class="task_item_info" :class="{ top: index == 0 }">
        <div class="task_item_left">
          <slot name="left" :item="item"></slot>
        </div>

        <div v-if="index !== 0" class="task_item_info_round_top_line"></div>
        <div class="task_item_info_round" :style="roundStyle(item)"></div>
        <div
          v-if="index !== list.length - 1"
          class="task_item_info_round_bottom_line"
        ></div>

        <div
          class="task_item_info_title"
          :style="titleSty(item)"
          @click="item.expand = !item.expand"
        >
          {{ item.title }}
          <span v-if="item.nodes && item.nodes.length > 0">
            <my-icon
              v-if="!item.expand"
              name="xia"
              size="0.17rem"
              color="#BBBBBB"
            ></my-icon>
            <my-icon
              v-else-if="item.expand"
              name="shang"
              size="0.17rem"
              color="#BBBBBB"
            ></my-icon>
          </span>
        </div>
        <div v-if="item.expand" class="task_item_info_slot">
          <slot>
            <div
              v-for="(node, nodeIndex) of item.nodes"
              :key="nodeIndex"
              class="task_item_info_slot_item"
            >
              {{ node }}
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newList: [],
      round: {
        moreRound:
          'https://cdn.shupian.cn/sp-pt/wap/images/g8fxgcwbs7k0000.png',
        currentRound:
          'https://cdn.shupian.cn/sp-pt/wap/images/7swm4tb1obw0000.png',

        completeRound:
          'https://cdn.shupian.cn/sp-pt/wap/images/cglf70as0fs0000.png',
      },
    }
  },
  computed: {},
  watch: {
    list: {
      immediate: true,
      deep: true,
      handler(newVal) {
        const newList = JSON.parse(JSON.stringify(newVal))
        newList.map((item) => {
          // if (item.nodes && item.nodes.length > 0) {
          //   item.expand = false
          // }
          item.expand = false
        })
        this.newList = newList
      },
    },
  },
  methods: {
    roundStyle(item) {
      const sty = {}
      if (item.status === 'more') {
        sty.backgroundImage = `url(${this.round.moreRound})`
      } else if (item.status === 'current') {
        sty.backgroundImage = `url(${this.round.currentRound})`
      } else if (item.status === 'complete') {
        sty.backgroundImage = `url(${this.round.completeRound})`
      }

      return sty
    },
    titleSty(item) {
      const sty = {
        color: `#999999`,
      }
      if (item.status === 'more') {
        sty.color = `#555555`
      } else if (item.status === 'current') {
        sty.color = `#4E78F5`
      } else if (item.status === 'complete') {
        sty.color = `#999999`
      }
      return sty
    },
  },
}
</script>
<style lang="less" scoped>
.steps {
  padding: 46px 40px 0;
  overflow: auto;

  .task_item {
    // overflow: hidden;
    font-size: 0;

    .task_item_info {
      position: relative;

      flex: 1;
      margin-left: 96px;
      padding-left: 33px;
      padding-bottom: 34px;
      padding-top: 34px;
      // border-left: 1px solid #f0f0f0;

      .task_item_left {
        position: absolute;
        left: -96px;
        top: 50%;
        transform: translate(0, -50%);

        width: 72px;
        flex-shrink: 1;
      }

      .task_item_info_title {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #999999;
      }
      .task_item_info_slot {
        .task_item_info_slot_item {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #999999;
          line-height: 32px;
          margin-top: 12px;
        }
      }

      .task_item_info_round {
        position: absolute;
        left: -18px;
        top: 50%;
        z-index: 1;
        transform: translate(0, -50%);

        width: 36px;
        height: 36px;
        flex-shrink: 1;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .task_item_info_round_top_line {
        position: absolute;
        height: 50%;
        width: 1px;
        background: #f0f0f0;
        left: -0px;
        top: 0;
      }

      .task_item_info_round_bottom_line {
        position: absolute;

        width: 1px;
        background: #f0f0f0;
        left: -0px;
        top: 50%;
        bottom: 0;
      }
    }
    .task_item_info.top {
      padding-top: 0px;
      .task_item_left {
        top: 0;
        transform: translate(0, -25%);
      }
      .task_item_info_round {
        top: 18px;
      }
      .task_item_info_round_top_line {
        // top: 0;
        height: 0;
      }
      .task_item_info_round_bottom_line {
        top: 18px;
        bottom: 0;
      }
    }
  }
}
</style>
