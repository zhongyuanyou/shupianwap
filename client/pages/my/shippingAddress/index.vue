<template>
  <div class="address">
    <!--S 头部-->
    <sp-top-nav-bar
      :title="'我的收货地址'"
      left-arrow
      ellipsis
      :fixed="true"
      @on-click-left="onClickLeft"
    />
    <!--E 头部-->
    <!--S 内容-->
    <div class="address_con">
      <p v-if="!addressList.length" class="prompt">您还没有添加收货地址额～</p>
      <div v-else class="address_con_list">
        <sp-swipe-cell
          v-for="(item, index) in addressList"
          :key="index"
          :stop-propagation="true"
          :right-width="116"
        >
          <div class="address_con_list_item">
            <div class="address_con_list_item_lf">
              <div class="info">
                {{ item.name }}<span class="tel">{{ item.tel }}</span
                ><span v-if="index === 0" class="default">默认</span>
              </div>
              <div class="address">{{ item.address }}</div>
            </div>
            <div @click="handleEdit(item)">
              <my-icon
                class="icon"
                name="per_ic_edit"
                size="0.24rem"
                color="#222"
              />
            </div>
          </div>
          <template #right>
            <sp-button
              square
              text="默认"
              type="default"
              color="#f8f8f8"
              class="handle_btn"
              ><span slot="default" class="default_txt"
                >设为<br />默认</span
              ></sp-button
            >
            <sp-button
              square
              text="删除"
              type="danger"
              class="handle_btn"
              @click="handleDel(item)"
            />
          </template>
        </sp-swipe-cell>
      </div>
    </div>
    <!--E 内容-->
    <!--S 底部-->
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-button
        type="primary"
        icon="plus"
        :text="'新建收货地址'"
        @click="handleNew()"
      />
    </sp-bottombar>
    <!--E 底部-->
    <!--S 弹框-->
    <sp-center-popup
      v-model="popupStatus"
      :field="Field6"
      button-type="confirm"
    />
    <!--E 弹框-->
  </div>
</template>

<script>
import {
  TopNavBar,
  Button,
  SwipeCell,
  CenterPopup,
  Bottombar,
  BottombarButton,
} from '@chipspc/vant-dgg'
export default {
  name: 'Index',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Button.name]: Button,
    [SwipeCell.name]: SwipeCell,
    [CenterPopup.name]: CenterPopup,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
  },
  data() {
    return {
      addressList: [
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
        {
          name: '莉莉',
          tel: '18183238323',
          address:
            '四川省成都市武侯区科华北路1号顶呱呱政企服务中心1楼四川省成都市武侯区',
        },
      ],
      popupStatus: false,
      Field6: {
        type: 'functional',
        title: '确定删除收货地址吗？',
      },
    }
  },
  methods: {
    onClickLeft() {},
    handleDel(item) {
      // 删除
      this.popupStatus = true
    },
    handleNew() {
      // 新建收货地址
      this.$router.push('/my/shippingAddress/add/1')
    },
    handleEdit(item) {
      this.$router.push('/my/shippingAddress/edit/1')
    },
  },
}
</script>

<style lang="less" scoped>
.address {
  width: 100%;
  height: 100%;
  background-color: #fff;
  /deep/ .sp-top-nav-bar {
    height: 88px;
  }
  &_con {
    padding-top: 88px;
    display: flex;
    flex-direction: column;
    padding-bottom: 160px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .prompt {
      font-size: 34px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      margin-top: 429px;
    }
    &_list {
      width: 100%;
      .handle_btn {
        height: 100%;
        .default_txt {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
        }
      }
      ///deep/ .sp-swipe-cell__wrapper {
      //  transform: translate3d(116px, 0, 0);
      //}
      /deep/ .sp-swipe-cell__right {
        display: flex;
      }
      /deep/ .sp-button {
        margin: 0;
      }
      /deep/ .sp-button__text {
        color: #fff;
      }
      &_item {
        padding-bottom: 30px;
        margin-left: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        border-bottom: 1px solid #f4f4f4;
        &_lf {
          width: 564px;
          .info {
            font-family: PingFang SC;
            font-weight: bold;
            color: #1a1a1a;
            line-height: 44px;
            font-size: 30px;
            margin-top: 30px;
            .tel {
              margin-left: 93px;
            }
            .default {
              margin-left: 11px;
              background: #f1524e;
              border-radius: 4px;
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #fefefe;
              padding: 4px 6px;
              vertical-align: bottom;
            }
          }
          .address {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 34px;
            margin-top: 22px;
          }
        }
        .icon {
          margin-right: 40px;
        }
      }
    }
  }
  &_bot {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 0 40px;
    /deep/ .sp-button {
      width: 100%;
    }
  }
}
</style>
