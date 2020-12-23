<template>
  <div class="serviceIntroduced">
    <a
      v-for="(item, index) in servicelist"
      :key="index"
      href="javascript:;"
      :style="{
        backgroundImage: 'url(' + item.bgimage + ')',
      }"
    >
      <div class="total">
        <div>
          <span>{{ item.tatol[0].price }}</span>
          <span>在线咨询</span>
        </div>
        <div>
          <span>{{ item.tatol[1].price }}</span>
          <span>累计成交</span>
        </div>
        <div>
          <span>{{ item.tatol[2].price }}</span>
          <span>成功案例</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      servicelist: [
        {
          code: 1,
          tatol: [
            { price: '18万+', title: '在线质询' },
            { price: '17万+', title: '累计成交' },
            { price: '17万+', title: '成功注册' },
          ],
          price: '488',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw01.png'),
        },
        {
          code: 2,
          tatol: [
            { price: '15万+', title: '在线质询' },
            { price: '14万+', title: '累计成交' },
            { price: '14万+', title: '成功注册' },
          ],
          price: '488',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw02.png'),
        },
        {
          code: 3,
          tatol: [
            { price: '2万+', title: '在线质询' },
            { price: '2万+', title: '累计成交' },
            { price: '2万+', title: '成功注册' },
          ],
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw03.png'),
        },
        {
          code: 4,
          tatol: [
            { price: '1万+', title: '在线质询' },
            { price: '1万+', title: '累计成交' },
            { price: '1万+', title: '成功注册' },
          ],
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw04.png'),
        },
        {
          code: 5,
          tatol: [
            { price: '7千+', title: '在线质询' },
            { price: '6千+', title: '累计成交' },
            { price: '6千+', title: '成功注册' },
          ],
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw05.png'),
        },
        {
          code: 6,
          tatol: [
            { price: '6千+', title: '在线质询' },
            { price: '6千+', title: '累计成交' },
            { price: '6千+', title: '成功注册' },
          ],
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw06.png'),
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.serviceIntroduced {
  width: 100%;
  > a {
    display: block;
    height: 458px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    background-repeat: no-repeat;
    background-position: 0px -3px;
    background-size: 101% 100%;
    .total {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 32px;
      margin-top: 244px;
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        > span {
          display: block;
          &:first-child {
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 32px;
          }
          &:last-child {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 22px;
            margin-top: 11px;
          }
        }
      }
    }
  }
}
</style>
