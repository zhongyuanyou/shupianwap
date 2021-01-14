<template>
  <div class="serviceItems">
    <h2 class="serviceItems-title">
      <span>服务项目</span>
      <a href="javascript:void(0)" @click="showRoundCorner = true">
        查看更多
        <my-icon name="list_ic_next" size="0.26rem" />
      </a>
    </h2>
    <ul class="serviceItems-list">
      <li v-for="item in normalItemList" :key="item.id">
        <span>{{ item.name }}</span>
        <em>{{ item.description }}</em>
      </li>
    </ul>
    <div class="open_app">
      <Open />
    </div>
    <sp-popup
      v-model="showRoundCorner"
      title="服务项目"
      round
      closeable
      padding
      position="bottom"
      :style="{ padding: '25px 20px' }"
    >
      <sp-safeguard
        :options="normalItemOptions"
        success
        ellipsis
      ></sp-safeguard>
    </sp-popup>
  </div>
</template>

<script>
import { Safeguard, Popup } from '@chipspc/vant-dgg'
import MyIcon from '~/components/common/myIcon/MyIcon'
import Open from '~/components/common/openApp/Open'
export default {
  name: 'ServiceItems',
  components: {
    [Safeguard.name]: Safeguard,
    [Popup.name]: Popup,
    MyIcon,
    Open,
  },
  props: {
    normalItemListData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      showRoundCorner: false,
      iconPrefix: 'sp-iconfont',
    }
  },
  computed: {
    normalItemList() {
      const normalItemArr = this.normalItemListData
        ? [...this.normalItemListData].slice(0, 2)
        : []
      return normalItemArr
    },
    normalItemOptions() {
      const normalItem = []
      let normalItemArr = []
      if (this.normalItemListData) normalItemArr = this.normalItemListData
      normalItemArr.forEach((item) => {
        normalItem.push({
          title: item.name,
          text: item.description,
        })
      })
      return normalItem
    },
  },
}
</script>

<style lang="less" scoped>
.serviceItems {
  padding-top: 41px;
  background-color: #fff;
  margin-top: 24px;
  &-title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    display: flex;
    justify-content: space-between;
    padding: 0px 41px;
    span {
      font-size: 40px;
    }
    a {
      font-size: 26px;
      font-weight: 400;
      color: #999999;
      i {
        margin-left: 3px;
      }
    }
  }
  &-list {
    margin-top: 10px;
    li {
      height: 88px;
      line-height: 88px;
      font-size: 26px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f4f4f4;
      padding: 0px 41px;
      span {
        font-weight: 400;
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      em {
        font-weight: 400;
        color: #222222;
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        padding-left: 20px;
        text-align: right;
      }
    }
  }
  .open_app {
    padding: 32px 47px 40px 48px;
  }
  /deep/ .sp-popup {
    border-radius: 24px 24px 0px 0px;
    padding: 58px 40px 125px 40px !important;
    .sp-popup__close-icon {
      font-weight: bold;
    }
    .sp-safeguard__icon {
      display: none;
    }
    /deep/ .sp-popup__title {
      padding: 0px 0 6px 0;
      font-size: 40px;
      color: #1a1a1a;
    }
  }
  /deep/ .sp-safeguard__list li {
    display: block;
    padding-top: 47px;
    padding-bottom: 0px;
  }
  /deep/ .sp-popup__close-icon--top-right {
    top: 40px;
    right: 40px;
  }
  /deep/ .sp-safeguard__title {
    font-size: 32px;
    color: #222222;
  }
}
</style>
