<template>
  <div class="content">
    <sp-popup
      v-model="showPullPop"
      closeable
      round
      position="bottom"
      close-icon-position="top-right"
      :style="{ width: '100%', height: '60%' }"
    >
      <div class="title">{{ title }}</div>
      <div class="bank-list">
        <ul v-if="list.length > 0" class="bank-ul">
          <li
            v-for="(item, index) in list"
            :key="index"
            class="bank-li"
            @click="selectItem(item.name, index)"
          >
            <p>{{ item.name }}</p>
            <sp-icon
              v-if="index === activeIndex"
              class-prefix="spiconfont"
              name="gou"
              size="0.30rem"
              color="#4974F5"
            ></sp-icon>
          </li>
        </ul>
      </div>
    </sp-popup>
  </div>
</template>
<script>
import { Popup, Icon } from '@chipspc/vant-dgg'
export default {
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    activeIndex: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      showPullPop: false,
    }
  },
  methods: {
    clickClosePop() {
      this.showPullPop = false
    },
    selectItem(name, index) {
      const itemData = {
        name,
        index,
      }
      this.$emit('selectItem', itemData)
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  ::v-deep.sp-popup__close-icon {
    top: 56px;
  }
  ::v-deep .title {
    font-family: PingFangSC-Medium;
    width: 100%;
    font-size: 40px;
    color: #1a1a1a;
    letter-spacing: 0;
    line-height: 136px;
    text-align: left;
    font-weight: bold;
    padding-left: 40px;
  }
  ::v-deep .sp-popup {
    .bank-list {
      max-height: 80%;
      overflow-y: auto;
      padding: 0 40px;
      .bank-ul {
        .bank-li {
          display: flex;
          align-items: center;
          height: 112px;
          justify-content: space-between;
          .spiconfont-gou {
            font-weight: bold;
          }
          .bank-logo {
            width: 48px;
            height: 48px;
            background: #000;
          }
          p {
            width: 552px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            height: 48px;
            font-family: PingFangSC-Regular;
            font-size: 32px;
            color: #222222;
          }
          span {
            margin-left: auto;
          }
        }
      }
      .bank-add {
        display: flex;
        align-items: center;
        height: 112px;
        .spiconfont-you {
          margin-left: auto !important;
        }
        p {
          margin-left: 20px;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #222222;
        }
        .right {
          width: 30px;
          margin-left: auto;
        }
      }
    }
  }
}
</style>
