<!--
 * @Author: xiao pu
 * @Date: 2020-11-25 15:28:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-05 16:33:16
 * @Description: file content
 * @FilePath: /chips-wap/pages/planner/detail.vue
-->

<template>
  <div class="detail">
    <div v-if="!hideHeader && !isApplets && titleStatus" class="head">
      <Header title="规划师">
        <template #left>
          <div v-if="urlData.isShare !== '1'">
            <sp-icon
              class-prefix="spiconfont"
              name="nav_ic_back"
              size="0.4rem"
              color="#1A1A1A"
              style="margin-left: 0.32rem"
              @click.native="onClickLeft"
            />
          </div>
          <div v-if="urlData.isShare === '1'">
            <sp-icon
              class-prefix="spiconfont"
              name="xiaochengxuzhuye"
              size="0.4rem"
              color="#1A1A1A"
              style="margin-left: 0.36rem"
              @click.native="gohome"
            />
          </div>
        </template>
        <template v-if="isInApp && showPlannerDetail" #right>
          <sp-icon
            class-prefix="spiconfont"
            class="head__icon-share"
            name="fenxiang"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-right: 0.4rem"
            @click.native="onClickRight"
          />
        </template>
      </Header>
    </div>
    <div v-if="showPlannerDetail" class="body">
      <div class="detail-content">
        <div
          class="detail-content__bg"
          :class="{ 'detail-content__bg-show-point': formatShowPoint }"
        >
          <div class="detail-content__wrap">
            <sp-skeleton
              title
              avatar
              avatar-size="1.2rem"
              :row="formatShowPoint ? 10 : 7"
              :loading="loading"
            >
              <div class="detail-content__wrap-head">
                <div class="flex-r-s flex-r-a-c">
                  <div class="detail-content__avatar">
                    <sp-image
                      round
                      width="1.2rem"
                      height="1.2rem"
                      fit="cover"
                      :src="$resizeImg(80,80,newDetailData.image || PlannerHeadList)"
                    />
                    <span
                      v-if="!!newDetailData.title"
                      class="detail-content__title"
                      >{{ newDetailData.title }}</span
                    >
                  </div>

                  <div>
                    <h4 class="detail-content__name">
                      {{ newDetailData.userName }}
                    </h4>
                    <p class="detail-content__discript">
                      {{ newDetailData.merchantName }}
                    </p>
                  </div>
                </div>
                <div class="detail-content__label">
                  <p>
                    <span v-for="tag of newDetailData.label" :key="tag">
                      {{ tag }}
                    </span>
                  </p>
                  <ul>
                    <li>
                      <div>
                        <img
                          src="https://cdn.shupian.cn/sp-pt/wap/images/co0535d3gfk0000.png"
                          alt=""
                        />
                        <span>{{ setPhone(newDetailData.phone) }}</span>
                      </div>
                      <div v-if="newDetailData.baseInfo.wechat">
                        <img
                          src="https://cdn.shupian.cn/sp-pt/wap/images/844q1xncy580000.png"
                          alt=""
                        />
                        <span>{{ newDetailData.baseInfo.wechat }}</span>
                      </div>
                    </li>
                    <li v-if="newDetailData.baseInfo.mailbox">
                      <div>
                        <img
                          src="https://cdn.shupian.cn/sp-pt/wap/images/569rb93on880000.png"
                          alt=""
                        />
                        <span>{{ newDetailData.baseInfo.mailbox }}</span>
                      </div>
                    </li>
                    <li v-if="newDetailData.officeAddress">
                      <div class="pullstyle" style="align-items: center">
                        <img
                          src="https://cdn.shupian.cn/sp-pt/wap/images/5huwcgk3ric0000.png"
                          alt=""
                        />
                        <span
                          style="
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                          "
                          >{{ newDetailData.officeAddress }}</span
                        >
                      </div>
                    </li>
                    <li v-if="newDetailData.baseInfo.lawyerIntro">
                      <div class="pullstyle">
                        <img
                          src="https://cdn.shupian.cn/sp-pt/wap/images/5mz72q9tl500000.png"
                          alt=""
                          style="margin: 0.05rem 0.24rem 0 0"
                        />
                        <span
                          :class="ownerInfo ? 'textshow' : 'textoverflow'"
                          >{{ newDetailData.baseInfo.lawyerIntro }}</span
                        >
                        <i
                          class="spiconfont pullImg"
                          :class="
                            ownerInfo
                              ? 'spiconfont-shangla'
                              : 'spiconfont-xiala'
                          "
                          style="font-size: 8px"
                          @click="ownerInfo = !ownerInfo"
                        ></i>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- <div class="detail-content__tag-list">
                  <sp-tag
                    v-for="tag of formatTagList"
                    :key="tag"
                    class="detail-content__tag-list-item"
                    >{{ tag }}</sp-tag
                  >

                </div> -->
              </div>
              <div class="detail-content__wrap-body">
                <div class="detail-content__section-title">个人信息</div>
                <ul class="detail-content__section-content">
                  <li>
                    <span class="label">服务经验：</span>
                    <span class="content">{{
                      newDetailData.baseData.serviceExperience
                    }}</span>
                  </li>
                  <li>
                    <span class="label">服务人数：</span>
                    <span class="content">{{
                      newDetailData.baseData.peopleServed
                        ? `${newDetailData.baseData.peopleServed}人`
                        : '--'
                    }}</span>
                  </li>
                  <li>
                    <span class="label">成交次数：</span>
                    <span class="content">{{
                      newDetailData.baseData.dealNumber
                        ? `${newDetailData.baseData.dealNumber}次`
                        : '--'
                    }}</span>
                  </li>
                  <li>
                    <span class="label">平均响应时长：</span>
                    <span class="content">{{
                      newDetailData.baseData.responseTime
                        ? `${formatSeconds(
                            newDetailData.baseData.responseTime
                          )} `
                        : '--'
                    }}</span>
                  </li>
                  <li>
                    <span class="label">好评率：</span>
                    <span class="content"
                      >{{
                        newDetailData.baseData.favComRate
                          ? `${newDetailData.baseData.favComRate}%`
                          : '--'
                      }}
                      <span v-if="newDetailData.baseData.Evaluator"
                        >({{
                          newDetailData.baseData.Evaluator
                        }}人参与了评价)</span
                      ></span
                    >
                  </li>
                </ul>
              </div>
              <div v-show="formatShowPoint" class="detail-content__wrap-footer">
                <div class="detail-content__section-title flex-r-sb flex-r-a-c">
                  <i class="horizontal-line"></i>
                  <span class="detail-content__section-title-text">薯片分</span>
                  <i class="horizontal-line"></i>
                </div>
                <div class="detail-content__sp-score">
                  {{ newDetailData.point || '--' }}
                </div>
                <div v-if="detailData.prop" class="detail-content__level">
                  打败{{ detailData.prop }}的规划师
                </div>
                <div class="detail-content__explain">
                  <span>
                    {{ newDetailData.pointLevelName }}
                    <my-icon
                      name="plan_ic_explain"
                      size="0.24rem"
                      color="#666666"
                      @click.native="handlePoint"
                    />
                    <!-- handlePoint -->
                    <span @click="goScoreDetail">查看详情</span>
                  </span>
                  <!-- 一期没有 详情页面只能影藏掉 -->
                  <!-- <sp-button
                  class="detail-content__explain-btn"
                  @click="handlePoint"
                  >查看详情</sp-button
                > -->
                </div>
              </div>
            </sp-skeleton>
          </div>
        </div>
      </div>
      <div
        v-if="newDetailData.live.id && isInApp"
        class="video-content"
        @click="seeVideo"
      >
        <div
          class="video"
          :style="{ 'background-image': `url(${newDetailData.live.coverUrl})` }"
        >
          <div class="video-title">
            <span v-show="newDetailData.live.createTime"
              >{{ s_to_ym(newDetailData.live.createTime) }}直播回放</span
            >
            <span v-show="newDetailData.live.viewCount"
              >{{ newDetailData.live.viewCount }}人看过</span
            >
          </div>
          <div class="video-player">
            <i class="spiconfont spiconfont-bofang" style=""></i>
          </div>
          <div class="video-footer">
            <span>{{ newDetailData.live.studioName }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="newDetailData.titleNavs"
        class="recommend"
        style="padding-bottom: 75px"
      >
        <div class="tabs">
          <ul>
            <li
              v-for="(item, index) in newDetailData.titleNavs"
              :key="index"
              :class="active === item ? 'tab_active' : ''"
              @click="tabsActive(item)"
            >
              <span>{{ item }}</span>
              <span v-if="active === item" class="tabs_line"></span>
            </li>
          </ul>
        </div>
        <!-- <sp-tabs v-model="active" sticky @scroll="stickyScroll" @click="tabsClick">
          <sp-tab v-for="(item,index) in newDetailData.titleNavs" :key="index" :title="item" :name="item" > -->
        <ul v-if="active === '我的问答'" class="list-data myQuestion">
          <li
            v-for="(data, dataIndex) in newDetailData.content.wenda"
            :key="dataIndex"
            @click="linkKnownDetailQuestion(data)"
          >
            <div>
              <!-- <i
                class="spiconfont spiconfont-huida_mian"
                style="color: #ff614e"
              ></i> -->
              <embed
                class="huida"
                src="https://cdn.shupian.cn/sp-pt/wap/images/df1rr3m6pzs0000.svg"
                type="image/svg+xml"
                pluginspage="https://cdn.shupian.cn/sp-pt/wap/images/df1rr3m6pzs0000.svg"
              />
              <span class="two_line">{{ data.title }}</span>
            </div>
            <div>
              <!-- <i
                class="spiconfont spiconfont-wenti_mian"
                style="color: #4974f5"
              ></i> -->
              <embed
                class="wenti"
                src="https://cdn.shupian.cn/sp-pt/wap/images/28hztm48mx8g000.svg"
                type="image/svg+xml"
                pluginspage="https://cdn.shupian.cn/sp-pt/wap/images/28hztm48mx8g000.svg"
              />
              <p>
                <span
                  :class="
                    data.contentImageUrl ? 'three_line_img' : 'three_line'
                  "
                  >{{ data.contentText }}</span
                >
                <img
                  v-if="data.contentImageUrl"
                  :src="data.contentImageUrl"
                  alt=""
                />
              </p>
            </div>
            <div>
              <span
                >{{ numUntil(data.applaudCount) }} 点赞 ·
                {{ numUntil(data.remarkCount) }} 评论</span
              >
            </div>
          </li>
        </ul>
        <ul v-if="active === '我的文章'" class="list-data myBook">
          <li
            v-for="(data, dataIndex) in newDetailData.content.article"
            :key="dataIndex"
            @click="linkKnownDetailArticle(data)"
          >
            <div>
              <p>
                <span
                  :class="data.contentImageUrl ? 'two_line_img' : 'two_line'"
                  >{{ data.title }}</span
                >
                <img
                  v-if="data.contentImageUrl"
                  :src="data.contentImageUrl"
                  alt=""
                />
              </p>
            </div>
            <div>
              <span
                >{{ numUntil(data.totalBrowseCount) }} 浏览 ·
                {{ numUntil(data.applaudCount) }} 点赞 ·
                {{ timerUntil(data.createTime) }}</span
              >
            </div>
          </li>
        </ul>
        <ul v-if="active === '热门资讯'" class="list-data see">
          <li
            v-for="(data, dataIndex) in newDetailData.content.hotNews"
            :key="dataIndex"
            @click="linkFoundDetail(data)"
          >
            <div>
              <p>
                <span :class="data.imageUrl ? 'two_line_img' : 'two_line'">{{
                  data.title
                }}</span>
                <img v-if="data.imageUrl" :src="data.imageUrl" alt="" />
              </p>
            </div>
            <div>
              <span>行业资讯 · {{ data.createTime }}</span>
            </div>
          </li>
        </ul>
        <!-- </sp-tab>
        </sp-tabs> -->
        <!-- <RecommendList :mch-detail-id="detailData.mchDetailId" /> -->
      </div>
    </div>
    <div
      v-if="showPlannerDetail"
      class="footer"
      style="padding-bottom: 0.12rem"
    >
      <sp-bottombar safe-area-inset-bottom>
        <div class="footer-body">
          <div
            v-md:p_plannerBoothClick
            class="phone"
            data-even_name="p_plannerBoothClick"
            :data-track_code="isInApp ? 'SPP001148' : 'SPW000147'"
            :data-recommend_number="newDetailData.dggPlannerRecomLog || ''"
            :data-planner_number="newDetailData.userNo"
            :data-planner_name="newDetailData.userName"
            :data-crisps_fraction="newDetailData.point"
            @click="goShop"
          >
            <i
              class="spiconfont spiconfont-xiaodian"
              style="font-size: 19px"
            ></i>
            <p>小店</p>
          </div>
          <div class="phone" @click="handleCall">
            <i
              class="spiconfont spiconfont-dianhua"
              style="font-size: 19px"
            ></i>
            <p>电话</p>
          </div>
          <!-- <sp-bottombar-button
            v-if="!hideIM"
            type="primary"
            text="电话联系"
            :disabled="!detailData.phone"
            @click="handleCall"
          /> -->
          <sp-bottombar-button
            v-if="!hideIM"
            v-md:p_IMClick
            data-im_type="售前"
            :data-planner_number="detailData.id"
            :data-planner_name="detailData.name"
            :data-crisps_fraction="detailData.point"
            :data-track_code="isInApp ? 'SPP000040' : 'SPW000036'"
            type="info"
            text="在线咨询"
            :disabled="!detailData.id"
            @click="handleIM"
          />
        </div>
      </sp-bottombar>
    </div>
    <div v-if="!showPlannerDetail" class="empty">
      <img src="https://cdn.shupian.cn/sp-pt/wap/images/32lnvdx3omo0000.png" />
      <p>抱歉,当前规划师名片未上架</p>
    </div>
    <sp-share-sheet
      v-model="showShare"
      title="分享"
      :options="shareOptions"
      @select="onSelect"
    />
    <sp-toast ref="spToast" class="detail-toast" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import {
  Icon,
  Button,
  Skeleton,
  Image,
  Tag,
  Bottombar,
  BottombarButton,
  ShareSheet,
  Toast,
} from '@chipspc/vant-dgg'
import { PlannerHeadList } from '~/config/constant'
import Header from '@/components/common/head/header'
import SpToast from '@/components/common/spToast/SpToast'
// import RecommendList from '@/components/planner/RecommendList'
import { formatDate } from '@/static/js/date'
import { planner } from '@/api'
import imHandle from '@/mixins/imHandle'
import { callPhone, copyToClipboard, setUrlParams } from '@/utils/common'
import { storeApi } from '@/api/store'
export default {
  name: 'PlannerDetail',
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Skeleton.name]: Skeleton,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [ShareSheet.name]: ShareSheet,
    Header,
    SpToast,
    // RecommendList,
  },

  mixins: [imHandle],
  async asyncData({ $axios, query, store }) {
    let newDetailData = {
      photo: [],
      baseInfo: {},
      baseData: {},
      content: {
        wenda: [],
        article: [],
        hotNews: [],
      },
      live: {},
    }
    let showPlannerDetail = false
    let detailData = {}
    let active = ''
    let loading = true
    try {
      const { mchUserId } = query
      if (mchUserId == null) {
        this.$xToast.show({
          message: '缺少规划师参数!',
          duration: 1000,
          forbidClick: false,
          icon: 'toast_ic_error',
        })
        return
      }
      const params = { id: mchUserId }
      const newData = await $axios.get(storeApi.plannerDetail, {
        params: {
          mchUserId,
          dataFlg: '1',
          cardType: 'plannerCode',
        },
      })
      if (newData.code === 200) {
        if (newData.data.status === 'BUSINESS_CARD_STATUS_ON_SHELF') {
          console.log(
            `***************************************************************`
          )
          showPlannerDetail = true
        }
        newDetailData = newData.data || {}
        active = newDetailData.titleNavs[0]
        newDetailData.label =
          newDetailData.label && newDetailData.label.split('|')
        if (newDetailData.label && newDetailData.label.length > 3) {
          newDetailData.label = newDetailData.label.splice(0, 2)
        }
        newDetailData.content.hotNews.forEach((item) => {
          if (item.createTime) {
            item.createTime = item.createTime.split(' ')[0] || ''
          }
        })
      } else {
        // $xToast.show({
        //   message: newData.message || '请求失败！',
        //   duration: 1000,
        //   forbidClick: false,
        //   icon: 'toast_ic_error',
        // })
      }

      const data = await planner.detail(params)
      detailData = data || {}
      loading = false
      return {
        newDetailData,
        active,
        loading,
        detailData,
        showPlannerDetail,
      }
    } catch (error) {
      // console.error('getDetail:', error)
      // this.$xToast.show({
      //   message: error.message || '请求失败！',
      //   duration: 1000,
      //   forbidClick: false,
      //   icon: 'toast_ic_error',
      // })
      return Promise.reject(error)
    }
  },
  data() {
    return {
      PlannerHeadList ,
      loading: true,
      urlData: this.$route.query,
      detailData: {},
      newDetailData: {
        photo: [],
        baseInfo: {},
        baseData: {},
        content: {
          wenda: [],
          article: [],
          hotNews: [],
        },
        live: {},
      },
      shareOptions: [],
      showShare: false,
      isShare: Number(this.$route.query.isShare) === 1, // 默认不是分享页面，从规划师列表进来就不是分享
      hideIM: this.$route.query.imUserId === this.$route.query.mchUserId, // 目前是 获取到imUserId与mchUserId相等，说明是自己与自己聊天，不显示IM
      hideHeader: !!this.$route.query.hideHeader || false,
      redirectType: this.$route.query.redirectType || 'wap', // 跳转的到 wap里面还是app里面去
      requireCode: this.$route.query.requireCode || '', // 隐号拨打需要
      requireName: this.$route.query.requireName || '', // 隐号拨打需要
      ownerInfo: false, // 个人信息展开
      titleStatus: true, // 粘性布局触发时去掉头部
      active: '', // tab状态
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      userInfo: (state) => state.user.userInfo,
      isApplets: (state) => state.app.isApplets,
    }),
    formatTagList() {
      const tagList = this.detailData.tagList
      if (!Array.isArray(tagList)) return []
      const formatData = tagList.slice(0, 5)
      return formatData
    },
    formatServeAgeText() {
      const serveAge = this.detailData.serveAge
      if (serveAge == null) {
        return '--'
      }
      if (serveAge < 1) {
        return '小于1年'
      }
      if (serveAge >= 1 && serveAge < 2) {
        return '1-2年'
      }
      if (serveAge >= 2 && serveAge < 3) {
        return '2-3年'
      }
      if (serveAge >= 3 && serveAge < 4) {
        return '3-4年'
      }
      if (serveAge >= 4 && serveAge < 5) {
        return '4-5年'
      }
      if (serveAge >= 5) {
        return '5年以上'
      }
      return ''
    },
    formatShowPoint() {
      const { show } = this.detailData || {}
      // 分享的页面需要 show:1 才展示薯片分
      if (this.isShare && show !== 1) {
        return false
      }
      return true
    },
    city() {
      return this.$store.state.city.currentCity
    },
  },

  created() {
    if (process && process.client) {
      // notice:
      // store中的用户信息默认来自cookie，会从cookie中获取；因为在wap中， userInfo中的token与userId等 保存在cookie中，
      // 但是在app中登录等，登录信息cookie中的没有更新，导致直接从store中获取到的信息无效
      // 所以在app中进入此页面，先清除userInfo,获取最新的userInfo
      this.isInApp && this.clearUserInfo()
      // this.getDetail().finally(() => {
      //   this.loading = false
      // })
    }
  },
  async mounted() {
    if (!this.city.code) {
      await this.POSITION_CITY({ type: 'init' })
    }
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    ...mapMutations({
      setUserInfo: 'user/SET_USER',
      clearUserInfo: 'user/CLEAR_USER',
    }),
    s_to_ym(s) {
      const oldTime = s.split(' ')[0]
      const time = oldTime.split('-')
      return `${time[1]}月${time[2]}日`
    },
    setPhone(phone) {
      if (phone.length === 11) {
        return phone.substring(0, 3) + '****' + phone.substring(7, 11)
      }
      return phone
    },
    formatSeconds(value) {
      if (!value) {
        return '--'
      }
      let theTime = parseInt(value) // 秒
      if (value < 60) {
        return value + 's'
      } else {
        let middle = 0 // 分
        let hour = 0 // 小时
        if (theTime > 60) {
          middle = parseInt(theTime / 60)
          theTime = parseInt(theTime % 60)
          if (middle > 60) {
            hour = parseInt(middle / 60)
            middle = parseInt(middle % 60)
          }
        }
        let result = '' + parseInt(theTime) + '秒'
        if (middle > 0) {
          result = '' + parseInt(middle) + '分' + result
        }
        if (hour > 0) {
          result = '' + parseInt(hour) + '小时' + result
        }
        return result
      }
    },
    goScoreDetail() {
      this.$router.push({
        path: '/store/spScoreDetail',
        query: {
          score: this.newDetailData.point,
        },
      })
    },
    // 定义视频
    errorBtnHandle() {
      // if (this.vId) {
      //   this.getVideoApi()
      // } else {
      //   this.$xToast.error('获取视频信息失败')
      // }
    },
    // 超过10000以万显示
    numUntil(num) {
      if (!num) return ''
      const res =
        Number(num) > 10000
          ? `${(Number(num) / 10000).toFixed(1)}万`
          : Number(num)
      return res
    },
    // 判定时间差值
    timerUntil(time) {
      let data = ''
      const today = new Date().getTime()
      // 变为秒
      const difference = (Number(today) - Number(time)) / 1000
      // 1分钟内发布
      if (difference < 60) {
        data = '刚刚'
      }
      // 一小时内发布的
      else if (difference >= 60 && difference < 3600) {
        data = `${Math.floor(difference / 60)}分钟前`
      }
      // 超过一小时小于24小时
      else if (difference >= 3600 && difference < 86400) {
        if (formatDate(new Date(time), 'dd') === formatDate(new Date(), 'dd')) {
          // 仍在当天
          data = `${Math.floor(difference / 3600)}小时前`
        } else {
          // 跨天
          data = `昨天${formatDate(new Date(time), 'hh:mm')}`
        }
      }
      // 超过24小时
      else if (difference >= 86400) {
        data = `${formatDate(new Date(time), 'yyyy-MM-dd')}`
      } else {
        data = '未知时间'
      }
      return data
    },
    // 当粘粘属性出发时
    stickyScroll(e) {
      if (e.isFixed) {
        this.titleStatus = false
      } else {
        this.titleStatus = true
      }
    },
    tabsClick(title, name) {
      console.log(this.active)
    },
    tabsActive(item) {
      this.active = item
    },
    onClickLeft() {
      console.log('nav onClickLeft')
      this.$back()
    },
    onClickRight() {
      console.log('nav onClickRight')
      this.uPShareOption()
    },
    goShop() {
      this.$router.push({
        path: '/store/plannerStore',
        query: {
          mchUserId: this.$route.query.mchUserId,
          isShare: '0',
        },
      })
    },
    handleCall() {
      // 如果当前页面在app中，则调用原生拨打电话的方法
      if (this.isInApp) {
        this.$appFn.dggBindHiddenPhone(
          {
            plannerId: this.detailData.id,
            requireCode: this.requireCode,
            requireName: this.requireName,

            customerId: this.$store.state.user.customerID || '',
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) this.$xToast.error('拨号失败！')
          }
        )
        return
      }
      this.bindhidden()
    },
    async bindhidden() {
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
          plannerId: this.detailData.id,
          customerPhone:
            this.$store.state.user.mainAccountFull ||
            this.$cookies.get('mainAccountFull', { path: '/' }),
          requireCode: this.requireCode,
          requireName: this.requireName,
          // id: mchUserId,
          // sensitiveInfoType: 'MCH_USER',
        })
        // 解密电话
        if (telData.status === 1) {
          this.uPCall(telData)
        } else if (telData.status === 0) {
          Toast({
            message: '当前人员已禁用，无法拨打电话',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
          return ''
        } else if (telData.status === 3) {
          Toast({
            message: '当前人员已离职，无法拨打电话',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
          return ''
        }
        // } else {
        //   Toast({
        //     message: '请先登录账号',
        //     iconPrefix: 'sp-iconfont',
        //     icon: 'popup_ic_fail',
        //   })
        // }
      } catch (err) {
        Toast({
          message: '未获取到划师联系方式',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
      }
    },
    handleIM() {
      // const isLogin = await this.judgeLoginMixin()
      // if (isLogin) {
      this.uPIM({
        mchUserId: this.detailData.id,
        userName: this.detailData.userName,
        type: this.detailData.mchClass,
      })
      // } else {
      //   Toast({
      //     message: '请先登录账号',
      //     iconPrefix: 'sp-iconfont',
      //     icon: 'popup_ic_fail',
      //   })
      // }
    },

    onSelect(option) {
      this.uPShare(option)
    },

    handlePoint() {
      this.$refs.spToast.show({
        message: '薯片分是对规划师的综合衡量，薯片分越高综合表现越好',
        duration: 1500,
        forbidClick: false,
        // icon: 'spiconfont-tab_ic_check',
      })
    },

    uPShare(option) {
      if (this.isInApp) {
        this.showShare = false
        return
      }
      const url = window && window.location.href
      const sharedUrl = setUrlParams(url, { isShare: 1 })
      console.log('sharedUrl:', sharedUrl)

      const isSuccess = copyToClipboard(sharedUrl)
      if (isSuccess) {
        this.$xToast.show({
          message: '复制成功',
          duration: 1500,
          icon: 'toast_ic_comp',
          forbidClick: true,
        })
      }
      this.showShare = false
    },

    // 分享
    uPShareOption() {
      if (this.isInApp) {
        const url = window && window.location.href
        const sharedUrl = setUrlParams(url, { isShare: 1 })
        console.log('sharedUrl:', sharedUrl)
        this.$appFn.dggShare(
          {
            image:
              'https://cdn.shupian.cn/sp-pt/wap/images/cwxnvvtntxc0000.png',
            title: '个人店铺',
            subTitle: `优选规划师 - ${this.newDetailData.userName}的名片`,
            url: sharedUrl,
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast.show({
                message: '分享失败！',
                duration: 1500,
                forbidClick: false,
                icon: 'toast_ic_remind',
              })
            }
          }
        )
        return
      }

      this.shareOptions = [{ name: '复制链接', icon: 'link' }]
      this.showShare = true
    },
    // 拨打电话号码
    uPCall(telNumber) {
      // 浏览器中调用的
      callPhone(telNumber.phone)
    },

    // 发起聊天
    async uPIM(data = {}) {
      const { mchUserId, userName, type } = data
      // 如果当前页面在app中，则调用原生IM的方法
      if (this.isInApp) {
        try {
          // 需要判断登陆没有，没有登录就是调用登录
          await this.getUserInfo()
          this.$appFn.dggOpenIM(
            {
              name: userName,
              userId: mchUserId,
              userType: type || 'MERCHANT_B',
              requireCode: this.requireCode || '',
              requireName: this.requireName || '',
            },
            (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `联系失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            }
          )
        } catch (error) {
          console.error('uPIM error:', error)
        }
      } else {
        const imUserType = type || 'MERCHANT_B' // 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户
        // const isLogin = await this.judgeLoginMixin()
        // if (isLogin) {
        this.creatImSessionMixin({
          imUserId: mchUserId,
          imUserType,
          requireCode: this.requireCode || '',
          requireName: this.requireName || '',
        })
        // }
      }
    },
    // app获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.userInfo.userId) {
          resolve(this.userInfo.userId)
          return
        }
        this.$appFn.dggGetUserInfo((res) => {
          const { code, data } = res || {}
          // 未登录需要登录
          if (code !== 200) {
            this.$appFn.dggLogin((loginRes) => {
              if (loginRes && loginRes.code === 200) {
                console.log('loginRes : ', loginRes)
                let loginResData = {}
                // 为了兼容 企大顺
                if (typeof loginRes.data === 'string') {
                  try {
                    loginResData = JSON.parse(loginRes.data)
                  } catch (error) {
                    console.error(error)
                  }
                } else {
                  loginResData = loginRes.data
                }
                if (loginResData && loginResData.userId && loginResData.token) {
                  this.setUserInfo(loginResData)
                  resolve(loginResData.userId)
                  return
                }
                reject(new Error('登录后userId或者token缺失'))
                return
              }
              reject(new Error('登录失败'))
            })
            return
          }
          let userInfo = {}
          if (typeof data === 'string') {
            try {
              userInfo = JSON.parse(data)
            } catch (error) {
              console.error(error)
            }
          } else {
            userInfo = data
          }
          if (userInfo && userInfo.userId && userInfo.token) {
            this.setUserInfo(userInfo)
            resolve(userInfo.userId)
            return
          }
          reject(new Error('用户信息中userId或者token缺失'))
        })
      })
    },
    // 跳转播放视频
    seeVideo() {
      if (this.isInApp) {
        const iOSRouterPath = {
          roomId: this.newDetailData.live.id,
          liveRoleType: '3',
        }

        const androidRouterPath = {
          path: '/live/PlayBackActivity',
          parameter: {
            id: this.newDetailData.live.id,
          },
        }
        const userAgent = window.navigator.userAgent
        const isAndroid =
          userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端
        const isIOS = userAgent.match(/iPhone|iPad|iPod/i) // ios终端
        // 安卓方法
        if (isAndroid) {
          this.$appFn.dggJumpRoute(
            {
              iOSRouter: JSON.stringify(iOSRouterPath),
              androidRouter: JSON.stringify(androidRouterPath),
            },
            (res) => {
              const { code } = res || {}
              if (code !== 200) {
                this.$xToast.show({
                  message: '打开视频失败！',
                  duration: 1500,
                  forbidClick: false,
                  icon: 'toast_ic_remind',
                })
              }
            }
          )
        }
        if (isIOS) {
          // ios方法
          this.$appFn.dggLiveOnline(iOSRouterPath, (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast.show({
                message: '打开视频失败！',
                duration: 1500,
                forbidClick: false,
                icon: 'toast_ic_remind',
              })
            }
          })
        }
      } else {
        this.$refs.spToast.show({
          message: '请在薯片APP中查看',
          duration: 1500,
          forbidClick: false,
          // icon: 'spiconfont-tab_ic_check',
        })
      }
    },
    // 获取详情数据
    async getDetail() {
      try {
        const { mchUserId } = this.$route.query
        if (mchUserId == null) {
          this.$xToast.show({
            message: '缺少规划师参数!',
            duration: 1000,
            forbidClick: false,
            icon: 'toast_ic_error',
          })
          return
        }
        const params = { id: mchUserId }
        const newData = await this.$axios.get(
          storeApi.plannerDetail,
          {
            params: {
              mchUserId,
              dataFlg: '1',
              cardType: 'plannerCode',
            },
          },
          {
            headers: {
              'x-cache-control': 'cache',
            },
          }
        )
        if (newData.code === 200) {
          this.newDetailData = newData.data || {}
          this.active = this.newDetailData.titleNavs[0]
          this.newDetailData.label =
            this.newDetailData.label && this.newDetailData.label.split('|')
          if (this.newDetailData.label && this.newDetailData.label.length > 3) {
            this.newDetailData.label = this.newDetailData.label.splice(0, 2)
          }
          this.newDetailData.content.hotNews.forEach((item) => {
            item.createTime &&
              (item.createTime = formatDate(
                new Date(item.createTime),
                'yyyy-MM-dd'
              ))
          })
        } else {
          this.$xToast.show({
            message: newData.message || '请求失败！',
            duration: 1000,
            forbidClick: false,
            icon: 'toast_ic_error',
          })
        }

        const data = await planner.detail(params)
        this.detailData = data || {}
        return data
      } catch (error) {
        console.error('getDetail:', error)
        this.$xToast.show({
          message: error.message || '请求失败！',
          duration: 1000,
          forbidClick: false,
          icon: 'toast_ic_error',
        })
        return Promise.reject(error)
      }
    },
    linkFoundDetail(item) {
      this.$router.push({
        path: `/found/detail/${item.id}`,
      })
    },
    linkKnownDetailQuestion(item) {
      this.$router.push({
        path: `/known/detail/question?id=${item.id}`,
      })
    },
    linkKnownDetailArticle(item) {
      this.$router.push({
        path: `/known/detail/article?id=${item.id}`,
      })
    },
    gohome() {
      this.$router.push('/')
    },
  },
  head() {
    return {
      title: '',
      meta: [
        {
          name: 'spptmd-track_code',
          content: this.isInApp ? 'SPP000019' : 'SPW000019',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.flex-r-s {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.flex-r-a-c {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.flex-r-sb {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.detail {
  height: 100%;
  background-color: #ffffff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  .body {
    .detail-content {
      &__section-title-text {
        font-size: 32px;
        font-weight: bold;
        color: #222222;
        text-align: center;
        line-height: 32px;
      }
      &__bg {
        padding: 40px 40px 0;
        position: relative;
        background: url(https://cdn.shupian.cn/sp-pt/wap/images/cfu3wwitnuw0000.png)
          top center/100% auto no-repeat;
        background-position-y: -286px;
      }
      &__bg-show-point {
        background-position-y: 0;
      }
      &__wrap {
        // height: 768px;
        background-image: linear-gradient(
          134deg,
          #f9f1e8 0%,
          #f9f1e8 50%,
          #e3d1c3 100%
        );
        border-radius: 8px;
        padding: 48px 40px;
        box-sizing: border-box;
        &-body {
          padding-top: 42px;
        }
        &-footer {
          margin-top: 14px;
        }
      }
      &__avatar {
        width: 120px;
        height: 120px;
        margin-right: 24px;
        position: relative;
      }
      &__label {
        font-size: 24px;
        p {
          height: 50px;
          overflow: hidden;
          margin: 23px 0 32px 0;
          span {
            display: inline-block;
            margin: 0 12px 0 0;
            padding: 0 16px;
            height: 50px;
            max-width: 100%;
            line-height: 50px;
            text-align: center;
            background: #eadacd;
            border-radius: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        ul {
          position: relative;
          box-sizing: border-box;
          opacity: 0.8;
          background: #eadacd;
          border-radius: 12px;
          padding: 29.2px 35.6px;
          .pullImg {
            position: absolute;
            right: 32px;
            bottom: 43px;
            &::before {
              display: block;
              width: 12px;
              height: 6.7px;
            }
          }
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 0 28px 0;
            &:last-of-type {
              margin: 0;
            }
            .flex {
            }
            div {
              img {
                width: 24px;
                height: 24px;
                margin: 0 14px 0 0;
                vertical-align: middle;
              }
              span {
                vertical-align: middle;
              }
            }
            .pullstyle {
              display: flex;
              justify-content: space-between;

              img {
                margin: 0 24px 0 0;
              }
              span {
                display: inline-block;
                transition: all 0.3s;
                width: 468px;
              }
              .textshow {
                max-height: 200px;
              }
              .textoverflow {
                max-height: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
      &__title {
        content: '';
        display: block;
        max-width: 150px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 28px;
        padding: 0 12px;
        background: linear-gradient(135deg, #ffeab9, #edcf98);
        border: 1px solid #dfb45a;
        border-radius: 14px;
        font-size: 18px;
        font-weight: bold;
        color: #9b6809;
        line-height: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &__name {
        font-size: 36px;
        font-weight: bold;
        color: #222222;
        line-height: 40px;
        .textOverflow(1);
      }
      &__discript {
        margin-top: 20px;
        font-size: 24px;
        line-height: 30px;
        font-weight: 400;
        color: #222222;
        .textOverflow(2);
      }
      &__tag-list {
        margin-top: 24px;
        line-height: 1em;
        font-size: 0;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        max-height: 60px;
        &-item {
          flex-shrink: 0;
          background-color: #eadacd;
          color: #222222;
          font-size: 24px;
          font-weight: 400;
          line-height: 50px;
          margin-left: 12px;
          margin-bottom: 12px;
          padding: 0 18px;
          border-radius: 4px;
          max-width: 280px;
          min-height: 50px;
          .textOverflow(1);
          &:first-child {
            margin-left: 0;
          }
        }
      }
      &__section-title {
        font-size: 28px;
        font-weight: bold;
        line-height: 32px;
        &-text {
          margin: 0 40px;
        }
      }
      &__section-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 38px;
        > li {
          flex: 50% 1 0;
          height: 23px;
          font-size: 24px;
          font-weight: 400;
          color: #222222;
          line-height: 28px;
          margin-bottom: 24px;
        }
      }
      &__sp-score {
        font-size: 58px;
        font-family: Bebas;
        font-weight: 400;
        color: #222222;
        line-height: 62px;
        text-align: center;
        margin-top: 20px;
      }
      &__level {
        font-size: 24px;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
        text-align: center;
        margin-top: 16px;
      }
      &__explain {
        font-size: 28px;
        line-height: 32px;
        font-weight: 400;
        color: #222222;
        margin-top: 22px;
        text-align: center;
      }
      &__explain-btn {
        height: 32px;
        background-color: transparent;
        border: none;
        &:active::before {
          opacity: 1;
          background-color: transparent;
        }
      }
      .horizontal-line {
        .horizontal-line(@width:208px; @bgColor:#DFD4CA; @skewX:0deg; @height:2px;);
        flex: 1;
        width: auto;
      }
    }
    .video-content {
      width: 100%;
      padding: 0 40px;
    }
    .video {
      height: 375.2px;
      background: #cccccc no-repeat;
      background-size: 100% 100%;
      border-radius: 12px;
      padding: 20px;
      margin: 0 0 90px 0;
      .video-title {
        display: flex;
        span {
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 22px;
          color: #ffffff;
          letter-spacing: 0;
          line-height: 40px;
          &:first-of-type {
            width: 209px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #4974f5;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          &:last-of-type {
            width: 145px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: rgba(0, 0, 0, 0.3);
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
        }
      }
      .video-player {
        position: relative;
        width: 96px;
        height: 96px;
        margin: 61px auto 36px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 50%;
        .spiconfont-bofang {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 27.4px;
          height: 33.7px;
          margin: auto;
          font-size: 30px;
          color: #ffffff;
        }
      }
      .video-footer {
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #ffffff;
        line-height: 48px;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
      }
    }
    .recommend {
      padding: 87px 0 0 0;
      .list-data {
        padding: 41px 40px 0;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        .three_line {
          max-width: 600px;
          max-height: 86px;
          .textOverflow(2);
        }
        .three_line_img {
          max-width: 600px;
          .textOverflow(3);
        }
        .two_line {
          max-height: 96px;
          .textOverflow(2);
        }
        .two_line_img {
          .textOverflow(3);
        }
      }
      .tabs {
        padding: 0 40px;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #999999;
        line-height: 30px;
        ul {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          li {
            position: relative;
            margin: 0 56px 0 0;
            .tabs_line {
              position: absolute;
              bottom: -22px;
              left: 0;
              right: 0;
              margin: 0 auto;
              display: block;
              width: 28px;
              height: 6px;
              background: #4974f5;
              border-radius: 3px;
            }
          }
          .tab_active {
            font-weight: bold;
            font-family: PingFangSC-Medium;
            font-size: 32px;
            color: #222222;
          }
        }
      }
      .myQuestion {
        li {
          padding: 40px 0;
          border-bottom: 1px solid #f4f4f4;
          &:last-of-type {
            border: none;
          }
          .huida {
            width: 32px;
            height: 32px;
            margin: 5px 16px 0 0;
            vertical-align: middle;
          }
          .wenti {
            width: 32px;
            height: 32px;
            margin: 5px 16px 0 0;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
          .spiconfont {
            font-size: 35px !important;
            margin: 0 16px 0 0;
            &-huida_mian {
              background-image: -webkit-linear-gradient(
                bottom,
                #fa5741,
                #fa6d5a
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            &-wenti_mian {
              background: linear-gradient(90deg, #4974f5 0%, #80acfb 100%);
            }
          }
          div {
            display: flex;
            justify-content: flex-start;
            align-items: normal;
            margin: 0 0 24px 0;
            > p {
              display: flex;
              justify-content: space-between;
              align-items: normal;
              width: 100%;

              img {
                flex-shrink: 0;
                width: 190px;
                height: 127px;
                margin: 0 0 0 40px;
                background: #f0f0f0;
                border-radius: 12px;
              }
            }
            &:first-of-type {
              font-size: 36px;
              color: #1a1a1a;
              font-weight: bold;
            }
            &:nth-of-type(2) {
              font-family: PingFangSC-Regular;
              font-size: 30px;
              color: #555555;
            }
            &:last-of-type {
              margin: 0 0 0 55px;
              font-family: PingFangSC-Regular;
              font-size: 24px;
              color: #999999;
              letter-spacing: 0;
            }
          }
        }
      }
      .myBook {
        li {
          padding: 32px 0;
          border-bottom: 1px solid #f4f4f4;
          .empty {
          }
          .spiconfont {
            margin: 0 16px 0 0;
          }
          div {
            display: flex;
            justify-content: flex-start;
            align-items: normal;
            margin: 0 0 24px 0;
            > p {
              display: flex;
              justify-content: space-between;
              align-items: normal;
              width: 100%;
              img {
                flex-shrink: 0;
                width: 190px;
                height: 127px;
                margin: 0 0 0 40px;
                background: #f0f0f0;
                border-radius: 12px;
              }
            }
            &:first-of-type {
              font-family: PingFangSC-Medium;
              font-size: 36px;
              color: #1a1a1a;
              font-weight: bold;
            }
            &:nth-of-type(2) {
              font-family: PingFangSC-Regular;
              font-size: 30px;
              color: #555555;
            }
            &:last-of-type {
              font-family: PingFangSC-Regular;
              font-size: 24px;
              color: #999999;
              letter-spacing: 0;
            }
          }
        }
      }
      .see {
        li {
          padding: 32px 0;
          border-bottom: 1px solid #f4f4f4;
          .empty {
          }
          .spiconfont {
            margin: 0 16px 0 0;
          }
          div {
            display: flex;
            justify-content: flex-start;
            align-items: normal;
            margin: 0 0 24px 0;
            .two_line {
              -webkit-line-clamp: 2 !important;
            }
            > p {
              display: flex;
              justify-content: space-between;
              align-items: normal;
              width: 100%;
              img {
                flex-shrink: 0;
                width: 190px;
                height: 127px;
                margin: 0 0 0 40px;
                background: #f0f0f0;
                border-radius: 12px;
              }
            }
            &:first-of-type {
              font-family: PingFangSC-Medium;
              font-size: 36px;
              color: #1a1a1a;
              font-weight: bold;
            }
            &:nth-of-type(2) {
              font-family: PingFangSC-Regular;
              font-size: 30px;
              color: #555555;
            }
            &:last-of-type {
              font-family: PingFangSC-Regular;
              font-size: 24px;
              color: #999999;
              letter-spacing: 0;
            }
          }
        }
      }
      ::v-deep .sp-sticky {
        background: #fff;
      }
      ::v-deep .sp-tabs__wrap {
        padding: 0 40px;
      }
      ::v-deep .sp-tab {
        justify-content: flex-start;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #999999;
      }
      ::v-deep .sp-tab--active {
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #222222;
      }
      ::v-deep .sp-tabs__line {
        width: 28px;
        height: 6px;
        background: #4974f5;
        border-radius: 3px;
      }
    }
  }
  .footer {
    &-body {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0 0 28px;
    }
    .phone {
      font-size: 24px;
      margin: 0 44px 0 0;
      text-align: center;
    }
    ::v-deep .sp-bottombar {
      height: auto;
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
      z-index: 100;
    }
    ::v-deep .sp-button--info {
      border: 1px solid #24ae68;
      background-color: #24ae68;
    }
  }
  .item-wrap {
    padding: 40px;
  }
  &-toast {
    ::v-deep.my-toast__content {
      transform: translateY(-100%);
    }
  }
  .empty {
    padding-top: 200px;
    text-align: center;
    font-size: 26px;
    color: #999;
    img {
      width: 340px;
      height: 340px;
      margin: 0 auto;
    }
  }
}
</style>
