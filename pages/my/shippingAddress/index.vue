<template>
  <div class="address">
    <!--S 头部-->
    <Header :title="addressList.length ? '我的收货地址' : '无收货地址'">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!--E 头部-->
    <!--S 内容-->
    <div class="address_con">
      <div v-if="!addressList.length" class="no_address">
        <img :src="$ossImgSet(170, 170, '21107zqqvf40000.png')" alt="" />
        <p class="prompt">未添加收货地址</p>
      </div>
      <div v-if="addressList.length" class="address_con_list">
        <sp-swipe-cell
          v-for="(item, index) in addressList"
          :key="index"
          :stop-propagation="true"
          :right-width="116"
        >
          <div class="address_con_list_item">
            <div class="address_con_list_item_lf">
              <div class="info">
                <div class="name">{{ item.contactName }}</div>
                <div class="tel">{{ item.phone }}</div>
                <div v-if="item.defaultAddress" class="default">默认</div>
              </div>
              <div class="address">{{ item.address }}</div>
            </div>
            <div @click="handleEdit(item)">
              <my-icon
                class="icon"
                name="per_ic_addeditor"
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
              @click="handleDefault(item, index)"
              ><span slot="default" class="default_txt"
                >设为<br />默认</span
              ></sp-button
            >
            <sp-button
              square
              text="删除"
              type="danger"
              class="handle_btn"
              @click="handleDel(item, index)"
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
      @confirm="confirm"
    />
    <!--E 弹框-->
    <!--S 弹框-->
    <sp-center-popup
      v-model="defaultStatus"
      :field="Field7"
      button-type="confirm"
      @confirm="defaulConfirm"
    />
    <!--E 弹框-->
    <sp-toast ref="spToast"></sp-toast>
    <Loading-center v-show="loading" />
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
  Toast,
  Sticky,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { userinfoApi } from '@/api'
import SpToast from '@/components/common/spToast/SpToast'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import Header from '@/components/common/head/header'
export default {
  name: 'Index',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Button.name]: Button,
    [SwipeCell.name]: SwipeCell,
    [CenterPopup.name]: CenterPopup,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Toast.name]: Toast,
    [Sticky.name]: Sticky,
    SpToast,
    LoadingCenter,
    Header,
  },
  data() {
    return {
      addressList: [], // 收货地址列表
      popupStatus: false,
      addressIndex: '', // 选中的收货地址下标
      Field6: {
        type: 'functional',
        title: '确定删除收货地址吗？',
      },
      Field7: {
        type: 'functional',
        title: '确定设为默认地址吗？',
      },
      addressId: '', // 被选中的收货地址id
      defaultStatus: false,
      loading: false, // 加载效果状态
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId || null,
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    if (this.isInApp) {
      // 设置app导航名称
      this.$appFn.dggSetTitle(
        {
          title: '我的收货地址',
        },
        (res) => {}
      )
    }
    this.getShippingAddressList()
  },
  methods: {
    onClickLeft() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      this.$router.back()
    },
    handleDel(item) {
      // 删除
      this.addressId = item.id
      this.popupStatus = true
    },
    handleDefault(item) {
      // 删除
      this.addressId = item.id
      this.defaultStatus = true
    },
    handleNew() {
      // 新建收货地址
      if (this.addressList.length < 10) {
        if (this.isInApp) {
          this.$appFn.dggSetTitle(
            {
              title: '新建收货地址',
            },
            (res) => {}
          )
        }
        this.$router.push('/my/shippingAddress/add/1')
      } else {
        this.$refs.spToast.show({
          message: '收货地址最多可以添加10个',
          duration: 1500,
          forbidClick: true,
        })
      }
    },
    handleEdit(item) {
      // 编辑收货地址
      if (this.isInApp) {
        this.$appFn.dggSetTitle(
          {
            title: '编辑收货地址',
          },
          (res) => {}
        )
      }
      this.$router.push(`/my/shippingAddress/edit/${item.id}`)
    },
    async getShippingAddressList() {
      // 获取收货地址列表
      this.loading = true
      try {
        const params = {
          // userId: this.userId,
          userId: this.userId,
        }
        const res = await this.$axios.get(userinfoApi.addressList, { params })
        this.loading = false
        if (res.code === 200) {
          this.addressList = res.data
        }
      } catch (err) {
        this.loading = false
      }
    },
    async confirm() {
      // 确认删除
      try {
        const params = {
          id: this.addressId,
        }
        await this.$axios.get(userinfoApi.delAddress, { params })
        await this.getShippingAddressList()
      } catch (err) {}
    },
    async defaulConfirm() {
      // 设为默认地址
      try {
        const params = {
          id: this.addressId,
          defaultAddress: 1,
        }
        await this.$axios.post(userinfoApi.updateAddress, params)
        await this.getShippingAddressList()
      } catch (err) {}
    },
    back() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.address {
  width: 100%;
  height: 100%;
  background-color: #fff;
  /deep/ .sp-bottombar-button {
    font-size: 32px;
    font-weight: bold;
  }
  .back_icon {
    margin-left: 40px;
  }
  &_con {
    display: flex;
    flex-direction: column;
    padding-bottom: 160px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .no_address {
      width: 100%;
      text-align: center;
      > img {
        width: 340px;
        height: 340px;
        margin-top: 176px;
      }
    }
    .prompt {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      margin-top: 24px;
    }
    .new_address {
      margin-top: 31px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #4974f5;
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
            font-size: 30px;
            margin-top: 30px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: row;
            .name {
              width: 130px;
              .textOverflow(1);
            }
            .tel {
              max-width: 220px;
              margin-left: 50px;
              .textOverflow(1);
            }
            .default {
              margin-left: 11px;
              background: #f1524e;
              border-radius: 4px;
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #fefefe;
              padding: 0 6px;
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
