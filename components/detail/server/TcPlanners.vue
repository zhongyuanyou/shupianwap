<template>
  <div v-if="recommendPlanner.length" class="planners">
    <p class="planners_title">{{ tTitle }}</p>
    <!-- <sp-skeleton :row="6" :loading="recommendPlanner.length == 0"> -->
    <div
      v-for="(item, index) in recommendPlanner"
      :key="item.userCenterId"
      class="planners_item"
      :style="{ marginTop: index === 0 ? '0.42rem' : '0.66rem' }"
    >
      <div class="planners_item_lf">
        <div
          href="javascript:void(0);"
          class="planner_header"
          @click="plannerInfoUrlJump(item)"
        >
          <sp-image
            width="0.8rem"
            height="0.8rem"
            round
            fit="cover"
            lazy-load
            :src="$resizeImg(80, 80, item.portrait || PlannerHeadList)"
          />
        </div>
        <div class="info">
          <div class="info_tp">
            <a href="javascript:void(0);" @click="plannerInfoUrlJump(item)">
              <p class="name">{{ item.userName }}</p>
            </a>
            <i v-if="item.postName ? true : false" class="gold_icon">
              {{ item.postName }}
            </i>
          </div>
          <div class="info_bot">
            <span class="num">{{ Number(item.point) }}</span
            ><span class="txt">薯片分 | {{ Number(item.payNum) }}服务次数</span>
          </div>
          <div class="info_bot_last">
            <span
              v-for="(tagItem, tagIndex) in item.tagNameList"
              v-show="tagIndex < 3"
              :key="tagIndex"
            >
              {{ tagItem }}
            </span>
          </div>
        </div>
      </div>
      <div class="planners_item_rt">
        <sp-button
          v-md:p_IMClick
          data-even_name="p_IMClick"
          round
          class="contact-btn"
          data-im_type="售前"
          :data-recommend_number="item.dggPlannerRecomLog || ''"
          :data-planner_number="item.userCenterNo"
          :data-planner_name="item.userName"
          :data-crisps_fraction="item.point"
          data-track_code="SPW000157"
          @click="sendTemplateMsgWithImg(item.mchUserId, item.type, goodsInfo)"
          ><my-icon
            class=""
            name="notify_ic_chat"
            size="0.424rem"
            color="#4974F5"
        /></sp-button>
        <sp-button
          v-md:p_IMClick
          round
          class="contact-btn"
          data-even_name="p_IMClick"
          data-im_type="售前"
          :data-recommend_number="item.dggPlannerRecomLog || ''"
          :data-planner_number="item.userCenterNo"
          :data-planner_name="item.userName"
          :data-crisps_fraction="item.point"
          data-track_code="SPW000157"
          @click="handleTel(item.mchUserId)"
          ><my-icon
            class=""
            name="notify_ic_tel"
            size="0.423rem"
            color="#4974F5"
        /></sp-button>
      </div>
    </div>
    <!-- </sp-skeleton> -->
  </div>
</template>

<script>
import { Image, Button, Toast, Skeleton } from '@chipspc/vant-dgg'
import { parseTel } from '~/utils/common'
import { planner } from '~/api'
import imHandle from '~/mixins/imHandle'
import { PlannerHeadList } from '~/config/constant'
import { codeTranslate } from '~/utils/codeTranslate'

export default {
  name: 'TcPlanners',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Skeleton.name]: Skeleton,
  },
  mixins: [imHandle],
  props: {
    tTitle: {
      type: String,
      default: '推荐规划师',
    },
    recommendPlanner: {
      type: Array,
      default: () => [
        {
          dggPlannerRecomLog: '22',
          isAdmin: 0,
          mchDetailId: '607997736314103030',
          mchNo: 'PBU2031003',
          mchUserId: '1118746589975071711',
          officeAddressId: '607997736314106032',
          payNum: 0,
          phone:
            '8E0AAED6CBC517BFAC3D8B65C2B4CD14*DGGJGZX*ca348ymOYo94+YZbc443636VCIwWrXtc228NCA==',
          point: '5',
          portrait:
            'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          profilePhotoId: '',
          recentCompany: '企大顺测试一公司',
          registerTime: '2021-05-18 17:15:05',
          serveNum: 0,
          status: 1,
          statusName: '启用',
          tagNameList: ['工商变更', '公司注册', '工商注册'],
          type: 'MERCHANT_B',
          userCenterAuthStatus: 'AUTHENTICATION_SUCCESS',
          userCenterId: '767839377378277605',
          userCenterNo: 'U2120180102',
          userCenterStatus: 1,
          userCenterStatusName: '正常',
          userName: '谢欢',
        },
        {
          dggPlannerRecomLog: '22',
          isAdmin: 0,
          mchDetailId: '607997736314103030',
          mchNo: 'PBU2031003',
          mchUserId: '1118746589975071711',
          officeAddressId: '607997736314106032',
          payNum: 0,
          phone:
            '8E0AAED6CBC517BFAC3D8B65C2B4CD14*DGGJGZX*ca348ymOYo94+YZbc443636VCIwWrXtc228NCA==',
          point: '5',
          portrait:
            'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          profilePhotoId: '',
          recentCompany: '企大顺测试一公司',
          registerTime: '2021-05-18 17:15:05',
          serveNum: 0,
          status: 1,
          statusName: '启用',
          tagNameList: ['工商变更', '公司注册', '工商注册'],
          type: 'MERCHANT_B',
          userCenterAuthStatus: 'AUTHENTICATION_SUCCESS',
          userCenterId: '767839377378277605',
          userCenterNo: 'U2120180102',
          userCenterStatus: 1,
          userCenterStatusName: '正常',
          userName: '谢欢',
        },
        {
          dggPlannerRecomLog: '22',
          isAdmin: 0,
          mchDetailId: '607997736314103030',
          mchNo: 'PBU2031003',
          mchUserId: '1118746589975071711',
          officeAddressId: '607997736314106032',
          payNum: 0,
          phone:
            '8E0AAED6CBC517BFAC3D8B65C2B4CD14*DGGJGZX*ca348ymOYo94+YZbc443636VCIwWrXtc228NCA==',
          point: '5',
          portrait:
            'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          profilePhotoId: '',
          recentCompany: '企大顺测试一公司',
          registerTime: '2021-05-18 17:15:05',
          serveNum: 0,
          status: 1,
          statusName: '启用',
          tagNameList: [
            '工商变更',
            '公司注册',
            '工商注册',
            '工商注册',
            '工商注册',
          ],
          type: 'MERCHANT_B',
          userCenterAuthStatus: 'AUTHENTICATION_SUCCESS',
          userCenterId: '767839377378277605',
          userCenterNo: 'U2120180102',
          userCenterStatus: 1,
          userCenterStatusName: '正常',
          userName: '谢欢',
        },
      ],
    },
    imJumpQuery: {
      type: Object,
      default: () => {
        return {}
      },
    },
    operatingData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      PlannerHeadList,
    }
  },
  computed: {
    city() {
      return this.$store.state.city.currentCity
    },
    goodsInfo() {
      if (this.$route.path.match('detail/transactionDetails')) {
        // 交易商品详情
        return this.$store.state.tcProductDetail.detailData
      }
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
  },
  methods: {
    // 规划师详情跳转
    plannerInfoUrlJump(item) {
      // 处理埋点
      window.spptMd.spptTrackRow('p_plannerBoothClick', {
        track_code: 'SPW000158',
        planner_number: item.userCenterNo,
        planner_name: item.userName,
        crisps_fraction: item.point,
        recommend_number: item.dggPlannerRecomLog || '',
      })
      this.$router.push({
        path: '/planner/detail',
        query: {
          mchUserId: item.mchUserId,
          requireCode: this.goodsInfo.classCodeLevelList[0],
        },
      })
    },
    async handleTel(mchUserId) {
      try {
        // const isLogin = await this.judgeLoginMixin()
        // if (isLogin) {
        this.$xToast.show({
          message: '为了持续为您提供服务，规划师可能会主动联系您',
          duration: 2000,
          forbidClick: true,
        })
        await planner.awaitTip()
        const telData = await planner.newtel({
          areaCode: this.city.code,
          areaName: this.city.name,
          customerUserId: this.$store.state.user.userId,
          customerId: this.$store.state.user.customerID || '',
          plannerId: mchUserId,
          customerPhone:
            this.$store.state.user.mainAccountFull ||
            this.$cookies.get('mainAccountFull', { path: '/' }) ||
            '',
          requireCode: this.goodsInfo.classCodeLevel.split(',')[0],
          requireName: '',
          // id: mchUserId,
          // sensitiveInfoType: 'MCH_USER',
        })
        // 解密电话
        if (telData.status === 1) {
          const tel = telData.phone
          window.location.href = `tel://${tel}`
        } else if (telData.status === 0) {
          Toast({
            message: '当前人员已禁用，无法拨打电话',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
        } else if (telData.status === 3) {
          Toast({
            message: '当前人员已离职，无法拨打电话',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
        }
        // } else {
        //   Toast({
        //     message: '请先登录账号',
        //     iconPrefix: 'sp-iconfont',
        //     icon: 'popup_ic_fail',
        //   })
        // }
      } catch (err) {
        console.log(err)
        Toast({
          message: '未获取到划师联系方式',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.planners {
  // border-top: 24px solid #f8f8f8;
  padding: 41px 40px 56px 40px;
  background-color: #fff;
  border-radius: 24px;
  margin-bottom: 24px;
  ::v-deep.sp-skeleton {
    margin-top: 48px;
  }
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .gold_icon {
    min-width: 146px;
    max-width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 34px;
    line-height: 32px;
    border: 1px solid #e0a963;
    margin-left: 12px;
    border-radius: 16px;
    font-size: 20px;
    font-weight: 400;
    color: #e0a963;
    padding-left: 38px;
    padding-right: 7px;
    text-align: center;
    position: relative;
    font-style: normal;
    &::before {
      content: '';
      display: block;
      width: 34px;
      height: 34px;
      background: url(https://cdn.shupian.cn/sp-pt/wap/images/7cwzjbxvkhs0000.png)
        no-repeat;
      background-size: 34px 34px;
      position: absolute;
      left: -1px;
      top: -1px;
    }
  }
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
  }
  .planners_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 120px;
    .planners_item_lf {
      display: flex;
      justify-content: flex-start;
      // align-items: center;
      flex-direction: row;
      flex: 1;
      overflow: hidden;
      padding-right: 40px;
      .planner_header {
        width: 80px;
        padding: 0;
        .sp-image {
          float: left;
        }
      }
      .info {
        height: 120px;
        margin-left: 24px;
        .info_tp {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: row;
          height: 32px;
          .name {
            max-width: 150px;
            font-size: 32px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-weight: bold;
            color: #1a1a1a;
            line-height: 32px;
          }
        }
        .info_bot {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          height: 30px;
          line-height: 30px;
          margin: 10px 0;
          .num {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ec5330;
          }
        }
        .info_bot_last {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 40px;
          span {
            font-size: 20px;
            color: #5c7499;
            letter-spacing: 0;
            background: #f0f2f5;
            border-radius: 4px;
            padding: 4px 8px;
            margin-right: 8px;
            float: left;
            margin-bottom: 20px;
          }
        }
      }
    }
    .planners_item_rt {
      width: 180px;
      height: 120px;
      display: flex;
      float: right;
      justify-content: flex-end;
      flex-direction: row;
      justify-content: space-between;
      ::v-deep .sp-button {
        border: none;
      }
      .contact-btn {
        width: 80px;
        height: 80px;
        background: rgba(235, 243, 255, 0.8);
        margin-right: 40px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
