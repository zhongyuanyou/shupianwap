<template>
  <div class="information-moudle">
    <div class="titel-btn">
      <strong>资讯精选</strong>
      <a @click="updateInfo">
        <my-icon
          class="my-icon"
          name="home_ic_change"
          size="0.24rem"
          color="#4974F5"
        ></my-icon
        >换一换</a
      >
    </div>
    <div class="information-content">
      <div
        v-for="(item, index) in infoList"
        v-show="index < infoParams.limit"
        :key="index"
        class="information-item"
        @click="jumpPage(item)"
      >
        <div class="text-box">
          <p v-if="index !== 0">{{ item.description }}</p>
          <h6>{{ item.title }}</h6>
        </div>
        <div class="img-label">
          <!-- <strong>{{ item.label }}</strong> -->
          <img
            v-lazy="
              item.imageUrl +
              $ossImgSet(index == 0 ? 228 : 140, index == 0 ? 228 : 106)
            "
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CHIPS_PLATFORM_CODE, WAP_TERMINAL_CODE } from '@/config/constant'
import { homeApi } from '@/api'
export default {
  props: {
    infoData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      infoParams: {
        limit: 3, // 每页条数
        page: 1, // 当前页
        platformCode: CHIPS_PLATFORM_CODE, // 查询资讯的平台code
        terminalCode: WAP_TERMINAL_CODE, // 查询资讯的终端code
        categoryCode: '', // 查询资讯的分类code
      },
    }
  },
  computed: {
    infoList: {
      get() {
        return this.infoData
      },
      set(newVal) {
        newVal.forEach((item, index) => {
          this.$set(this.infoData, index, item)
        })
      },
    },
  },
  methods: {
    // 跳转资讯详情
    jumpPage(data) {
      // linkType跳转链接类型 1、跳转文章详情,2、跳转内链,3、跳转外链,4、跳转图片链接
      switch (data.linkType) {
        // 跳转文章详情
        case 1:
          this.$router.push({
            path: `/found/detail/${data.id}`,
          })
          break
        // 跳转内链
        case 2:
          this.$router.push({
            path: `${data.wapRoute}`,
          })
          break
        // 跳转外链
        case 3:
          window.location.href = data.link
          break
        // 跳转图片链接
        case 4:
          this.$router.push({
            name: 'img',
            params: {
              url: data.jumpImageUrl,
            },
          })
          break
        default:
          this.$router.push({
            path: `/found/detail/${data.id}`,
          })
          break
      }
    },
    // 换一换
    updateInfo() {
      this.infoParams.page += 1
      this.infoParams.categoryCode = this.$parent.asyncReqParams.categoryCode
      this.$axios
        .get(homeApi.findInfo, {
          params: this.infoParams,
        })
        .then((res) => {
          if (res.code === 200) {
            if (!res.data.infoList.length && this.infoParams.page > 1) {
              this.infoParams.page = 0
              this.updateInfo()
              return
            }
            this.infoList = res.data.infoList
          }
        })
    },
  },
}
</script>

<style scoped lang="less">
.information-moudle {
  font-size: 24px;
  width: 100%;
  padding: 32px 40px 32px 40px;
  box-sizing: border-box;
  overflow: hidden;
  .titel-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    strong {
      font-size: 40px;
      line-height: 44px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
    a {
      display: flex;
      font-size: 24px;
      line-height: 27px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #4974f5;
      .my-icon {
        margin-right: 11px;
      }
    }
  }
  .information-content {
    width: 100%;
    height: 228px;
    margin-top: 29px;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    .information-item {
      border-radius: 8px;
      overflow: hidden;
      &:nth-child(1) {
        position: relative;
        width: 34%;
        height: 228px;
        margin-right: 16px;
        border-radius: 0px 8px 8px 8px;
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.1), #000000);
        }
        h6 {
          position: absolute;
          left: 0;
          bottom: 24px;
          z-index: 2;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          padding: 0 24px 0 24px;
          .textOverflow(4);
        }
        > .img-label {
          position: relative;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      &:not(:first-child) {
        display: flex;
        width: 63.7%;
        height: 106px;
        overflow: hidden;
        background: #f8f8f8;
        > .text-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          padding: 16px 19px 16px 19px;
          > p {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
            line-height: 32px;
            .textOverflow(1);
          }
          > h6 {
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 38px;
            .textOverflow(1);
          }
        }
        > .img-label {
          position: relative;
          width: 140px;
          height: 100%;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      strong {
        display: flex;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        height: 40px;
        padding: 0 8px;
        background: #a06d42;
      }
      &:nth-child(2) strong {
        background: #718981;
      }
      &:nth-child(3) strong {
        background: #b5a17e;
      }
    }
  }
}
</style>
