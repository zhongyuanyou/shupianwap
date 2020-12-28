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
      options: [
        {
          text: '由顶呱呱作为居间担保，12年专业企服领域，大品牌，值得信赖',
          title: '1.担保交易',
        },
        {
          text: '为保障交易双方权益和交易产物安全，交易时需签署买卖交易合同',
          title: '2.签署合同',
        },
        {
          text:
            '交易时资金需暂时托管到薯片，待买方确认交易信息完全无误或买方签署合同并确认之后，打款到卖方，全程公平公正',
          title: '3.资金保障',
        },
        {
          text: '为保障交易双方权益和交易产物安全，交易时需签署买卖交易合同',
          title: '2.签署合同',
        },
        {
          text:
            '交易时资金需暂时托管到薯片，待买方确认交易信息完全无误或买方签署合同并确认之后，打款到卖方，全程公平公正',
          title: '3.资金保障',
        },
      ],
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
  padding-top: 47px;
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
    a {
      font-size: 26px;
      font-weight: 400;
      color: #999999;
    }
  }
  &-list {
    margin-top: 16px;
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
      }
      em {
        font-weight: 400;
        color: #222222;
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .open_app {
    padding: 32px 47px 40px 48px;
  }
  /deep/ .sp-popup {
    border-radius: 24px 24px 0px 0px;
    padding: 56px 40px 125px 40px !important;
    .sp-popup__close-icon {
      font-weight: bold;
    }
    .sp-safeguard__icon {
      display: none;
    }
  }
  /deep/ .sp-safeguard__list li {
    display: block;
  }
}
</style>
