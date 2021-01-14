<template>
  <div class="help-moudle">
    <div class="help-moudle-top">
      <div class="help-moudle-top-title">
        <strong>帮我找服务</strong>
      </div>
      <div class="help-moudle-top-describe">
        <div class="text-box">
          <strong>全城规划师为您线上服务</strong>
          <p>仅需3步/定制推荐/极速响应</p>
        </div>
        <img :src="$ossImgSet(85, 85, 'b61p961nyiw0000.png')" alt="" />
      </div>
      <a href="javascript:void(0);" @click="jumpPage">免费帮找</a>
    </div>
    <div v-if="helpBannerData.length" class="help-moudle-bottom">
      <a
        v-for="(item, index) in helpBannerData"
        v-show="index < 2"
        :key="index"
        href="javascript:void(0)"
        @click="adJumpHandleMixin(item.materialList[0])"
      >
        <img v-lazy="item.materialList[0].materialUrl" class="img" alt="" />
        <!-- <img
          src="http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp"
          alt=""
        />
        <span>
          <strong>
            <span>服务榜单服务榜单服务榜单</span>
            <my-icon
              class="my-icon"
              name="list_ic_next"
              size="0.2rem"
              color="#333333"
            ></my-icon>
          </strong>
          <p>跟榜选服务,更灵活更灵活更灵活更灵活</p>
        </span> -->
      </a>
    </div>
  </div>
</template>

<script>
import adJumpHandle from '~/mixins/adJumpHandle'
export default {
  mixins: [adJumpHandle],
  props: {
    helpBannerData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    jumpPage() {
      //   this.$router.push('/spread/myDemandCard/companyRegister')
      this.$router.push('/spread/myDemandCard')
    },
  },
}
</script>

<style scoped lang="less">
.help-moudle {
  width: 100%;
  padding: 0 40px 36px 40px;
  box-sizing: border-box;
  .help-moudle-top {
    position: relative;
    width: 100%;
    background: #ffffff;
    border: 1px solid #cdcdcd;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow: hidden;
    .help-moudle-top-title {
      width: 100%;
      height: 109px;
      padding: 47px 40px 0 40px;
      box-sizing: border-box;
      > strong {
        position: relative;
        display: block;
        width: 100%;
        font-size: 32px;
        line-height: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        padding-bottom: 31px;
        border-bottom: 1px solid #f0f0f0;
        &::after {
          content: '';
          width: 146px;
          height: 8px;
          background: #f4f4f4;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }
    .help-moudle-top-describe {
      position: relative;
      width: 100%;
      height: 171px;
      .text-box {
        padding: 47px 0 50px 57px;
        display: flex;
        flex-direction: column;
        > strong {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #1a1a1a;
          line-height: 32px;
        }
        > p {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 28px;
          margin-top: 14px;
        }
      }
      > img {
        position: absolute;
        right: 0;
        bottom: 4px;
        width: 170px;
        height: 170px;
      }
    }
    > a {
      display: block;
      width: 100%;
      height: 96px;
      line-height: 96px;
      text-align: center;
      border-top: 1px solid #f0f0f0;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #4974f5;
    }
  }
  .help-moudle-bottom {
    width: 100%;
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    > a {
      flex: 1;
      display: flex;
      align-items: center;
      //   padding: 32px 24px;
      height: 128px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
      }
      &:nth-child(1) {
        margin-right: 16px;
      }
      > img {
        width: 64px;
        height: 64px;
        margin-right: 14px;
      }
      > span {
        display: flex;
        flex-direction: column;
        strong {
          display: flex;
          align-items: center;
          span {
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 38px;
            .textOverflow(1);
          }
          .my-icon {
            margin-left: 10px;
          }
        }
        p {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 28px;
          margin-top: 4px;
          .textOverflow(1);
        }
      }
    }
  }
}
</style>
