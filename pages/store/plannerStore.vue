<template>
  <div class="plannerShop">
    <div v-if="titleStatus" class="head">
      <Header title="规划师店铺">
        <template #left>
          <sp-icon
            class-prefix="spiconfont"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-left: 0.32rem"
            @click.native="onClickLeft"
          />
          <!-- <sp-icon
            class-prefix="spiconfont"
            name="guanbi"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-left: 0.36rem"
            @click.native="onClickLeft"
          /> -->
        </template>
        <template v-if="isInApp" #right>
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
    <div class="bg-group">
      <div class="bg-group__head">
        <img
          :src="detailData.personal.headPortrait || 'https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png'"
          alt=""
        />
        <div class="bg-group__headtext">
          <p>
            <span class="title">{{detailData.personal.name}}</span>
            <span v-if="detailData.mchStoreId" class="label" @click="goGroup">我的团队></span>
          </p>
          <p>服务年限：{{formatServeAgeText}}</p>
        </div>
      </div>
      <div class="bg-group__label">
        <span v-for="(item,index) in detailData.personal.categories" :key="index">{{item}}</span>
      </div>
      <div v-if="detailData.mchStoreId" class="bg-group__footer" @click="goShop">
        <img
          :src="detailData.mchLogo"
          alt=""
        />
        <div class="bg-group__footertext">
          <p>{{detailData.mchName}}</p>
          <p>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/7mruoa3go2c0000.png"
              alt=""
            />
            <span>2级商户</span>
          </p>
        </div>
        <i class="spiconfont spiconfont-you"></i>
      </div>
    </div>
    <div class="body">
      <div class="sp-score">
        <p class="sp-score__title">
          <span></span>
          <span>薯片分</span>
          <span></span>
        </p>
        <p class="sp-score__score">
          <span>{{detailData.personal.point}}</span>
        </p>
        <p class="sp-score__statistical">
          <span>打败{{detailData.personal.beatProp}}的规划师</span>
        </p>
        <p class="sp-score__detail">
          <span>什么是薯片分</span>
          <i class="spiconfont spiconfont-plan_ic_explain" @click="handlePoint"></i>
          <span @click="goScoreDetail">查看详情</span>
        </p>
      </div>
      <div v-if="detailData.modules.length>0 && detailData.modules.data.some(item=>item.id)" class="recommended" :class="titleStatus?'':'tabs'">
        <p class="title">为您推荐</p>
        <sp-tabs v-model="active" sticky @scroll="stickyScroll" @click="tabsClick">
          <sp-tab v-for="(item,index) in detailData.modules.data" :key="index" :title="item.name" :name="item.id" >
            <ul class="list-data">
              <li v-for="(data,dataIndex) in detailData.goods" :key="dataIndex">
                <img :src="data.img" alt="">
                <div>
                    <p class="title">
                        <span>{{data.name}}</span>
                    </p>
                    <p class="label">
                        <span v-for="(ta,taindex) in data.tags" :key="taindex">{{ta}}</span>
                    </p>
                    <p class="type">
                        <span v-for="(de,deindex) in data.desc.split('|')" :key="deindex">{{de}}</span>
                    </p>
                    <p class="moneysee">
                        <span>{{data.price}}</span>
                        <span>元</span>
                    </p>
                </div>
              </li>
            </ul>
          </sp-tab>
        </sp-tabs>
      </div>
    </div>
    <div class="footer">
      <sp-bottombar safe-area-inset-bottom>
        <sp-bottombar-button
          
          v-md:p_IMClick
          data-im_type="售前"
          :data-planner_number="IMDetailData.id"
          :data-planner_name="IMDetailData.name"
          :data-crisps_fraction="IMDetailData.point"
          :data-track_code="isInApp ? 'SPP000040' : 'SPW000036'"
          type="primary"
          text="电话联系"
          :disabled="!IMDetailData.id"
          @click="handleCall"
        />
        <sp-bottombar-button
          v-md:p_IMClick
          data-im_type="售前"
          :data-planner_number="IMDetailData.id"
          :data-planner_name="IMDetailData.name"
          :data-crisps_fraction="IMDetailData.point"
          :data-track_code="isInApp ? 'SPP000040' : 'SPW000036'"
          type="info"
          text="在线联系"
          :disabled="!IMDetailData.id"
          @click="handleIM"
        />

      </sp-bottombar>
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
    Bottombar,
    BottombarButton,
    ShareSheet,
    Icon,
    Tabs,
    Toast,
    Tab 
} from '@chipspc/vant-dgg'
import { planner } from '@/api'
import { storeApi } from '@/api/store'
import Header from '@/components/common/head/header'
import SpToast from '@/components/common/spToast/SpToast'
import { callPhone, copyToClipboard, setUrlParams } from '@/utils/common'
import imHandle from '@/mixins/imHandle'


export default {
    components: {
        [Icon.name]: Icon,
        [Bottombar.name]: Bottombar,
        [BottombarButton.name]: BottombarButton,
        [ShareSheet.name]: ShareSheet,
        Header,
        SpToast,
        SpTabs:Tabs,
        SpTab:Tab,
    },
    mixins: [imHandle],
    data() {
        return {
            hideIM: this.$route.query.imUserId === this.$route.query.mchUserId,
            titleStatus: true, // 粘性布局触发时去掉头部
            active: '', // tab状态
            detailData:{
              personal:{
                name:"--",
                headPortrait:""
              },
              modules:[],
              goods:[]
            },
            IMDetailData:{},
            shareOptions: [],
            showShare: false,
            shlist:{
              appId:"1231323",
              timestamp:"12313",
              nonceStr:"123123",
              signature:"asdasda"
            }
        }
    },
    computed:{
        ...mapState({
            isInApp: (state) => state.app.isInApp,
            userInfo: (state) => state.user.userInfo,
            isApplets: (state) => state.app.isApplets,
        }),
        formatTagList() {
            const tagList = this.IMDetailData.tagList
            if (!Array.isArray(tagList)) return []
            const formatData = tagList.slice(0, 5)
            return formatData
        },
        formatServeAgeText() {
            const serveAge = this.detailData.personal.serveAge
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
            const { show } = this.IMDetailData || {}
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
        this.getDetail()
        
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
        goScoreDetail(){
          this.$router.push({
            path:"/store/spScoreDetail"
          })
        },
        handlePoint() {
          this.$refs.spToast.show({
            message: '薯片分是对规划师的综合衡量，薯片分越高综合表现越好',
            duration: 1500,
            forbidClick: false,
            // icon: 'spiconfont-tab_ic_check',
          })
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
                // 详解接口请求数据
                const params = { mchUserId }
                // 详情接口
                const { data,code,message } = await this.$axios.get(storeApi.plannerStoreInfo, {params}, {
                  headers: {
                    'x-cache-control': 'cache',
                  },
                })
                // IM接口请求数据
                const IMParams = { id: mchUserId }
                // IM数据
                const IMData = await planner.detail(IMParams)
                this.IMDetailData = IMData || {}
                if(code!==200){
                  throw new Error(message)
                }
                this.active = (data.modules.length>0 && data.modules[0].id) || ""
                this.detailData = data || {}
                this.getList()
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
        // 获取列表数据
        async getList(){
          try {
            const params = { 
              storeId:this.detailData.id,
              typeId:this.active,
              page:1,
              limit:10
            }
            const { data,code,message } = await this.$axios.post(storeApi.recommendGoods, params, {
              headers: {
                'x-cache-control': 'cache',
              },
            })
            if (code !== 200) {
              throw new Error(message)
            }
            this.detailData.goods = data.records || [] 
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
        handleCall() {
            // 如果当前页面在app中，则调用原生拨打电话的方法
            if (this.isInApp) {
                this.$appFn.dggBindHiddenPhone(
                {
                    plannerId: this.detailData.id,
                    requireCode: this.requireCode,
                    requireName: this.requireName,
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
        // 跳转团队
        goGroup(){
          this.$router.push({
            path:"/store/groupStore",
            query:{
              storeId:this.detailData.mchStoreId
            }
          })
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
        handleIM() {
            // const isLogin = await this.judgeLoginMixin()
            // if (isLogin) {
            this.uPIM({
                mchUserId: this.IMDetailData.id,
                userName: this.IMDetailData.userName,
                type: this.IMDetailData.mchClass,
            })
            // } else {
            //   Toast({
            //     message: '请先登录账号',
            //     iconPrefix: 'sp-iconfont',
            //     icon: 'popup_ic_fail',
            //   })
            // }
        },
        async bindhidden() {
            try {
                const isLogin = await this.judgeLoginMixin()
                if (isLogin) {
                const telData = await planner.newtel({
                    areaCode: this.city.code,
                    areaName: this.city.name,
                    customerUserId: this.$store.state.user.userId,
                    plannerId: this.IMDetailData.id,
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
                } else {
                    Toast({
                        message: '请先登录账号',
                        iconPrefix: 'sp-iconfont',
                        icon: 'popup_ic_fail',
                    })
                }
            } catch (err) {
                Toast({
                    message: '未获取到划师联系方式',
                    iconPrefix: 'sp-iconfont',
                    icon: 'popup_ic_fail',
                })
            }
        },
        async goShop(){
            try {
                const isLogin = await this.judgeLoginMixin()
                if (isLogin) {
                    this.$router.push({
                        path:"/store/merchantsStore",
                        query:{
                          storeId:this.detailData.mchStoreId,
                          isShare:"0"
                        }
                    })
                } else {
                    Toast({
                        message: '请先登录账号',
                        iconPrefix: 'sp-iconfont',
                        icon: 'popup_ic_fail',
                    })
                }
            } catch (err) {
                Toast({
                    message: '未获取到划师联系方式',
                    iconPrefix: 'sp-iconfont',
                    icon: 'popup_ic_fail',
                })
            }
        },
        // 拨打电话号码
        uPCall(telNumber) {
        // 浏览器中调用的
            callPhone(telNumber.phone)
        },
        onClickLeft() {
            this.$router.back(-1)
        },
        onClickRight() {
            console.log('nav onClickRight')
            this.uPShareOption()
        },
        onSelect(option) {
            this.uPShare(option)
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
                    image: this.IMDetailData.img,
                    title: '规划师店铺',
                    subTitle: '',
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

            this.shareOptions = [
                { name: '复制链接', icon: 'link' }
            ]
            this.showShare = true
        },
        stickyScroll(e){
            if(e.isFixed){
                this.titleStatus = false
            }else{
                this.titleStatus = true
            }
        },
        tabsClick(title,name){
          console.log(this.active)
        },
    },
    head() {
        return {
            title: '规划师店铺',
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
.plannerShop {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom) ;
  .bg-group {
    padding: 60px 40px 24px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/images/g0qq9j24x200000.png')
      no-repeat;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 28px;
    &__head {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 120px;
        height: 120px;
        opacity: 0.5;
        border: 1px solid #ffffff;
        border-radius: 50%;
      }
    }
    &__headtext {
      margin: 0 0 0 24px;
      p {
        &:first-of-type {
          margin: 0 0 24px 0;
        }
        &:last-of-type {
          font-family: PingFangSC-Regular;
          opacity: 0.8;
          font-size: 28px;
          color: #ffffff;
          letter-spacing: 0;
          line-height: 28px;
        }
      }
      .title {
        margin: 0 20px 0 0;
        font-family: PingFangSC-Medium;
        font-size: 48px;
        color: #ffffff;
        line-height: 48px;
        vertical-align: middle;
      }
      .label {
        display: inline-block;
        width: 152px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: rgba(234, 218, 205, 0.22);
        border-radius: 24px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #ffe7d2;
        vertical-align: middle;
      }
    }
    &__label {
      margin: 32px 0 60px 0;
      span {
        box-sizing: border-box;
        display: inline-block;
        min-width: 176px;
        max-width: 200px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        margin: 0 12px 0 0;
        padding: 0 16px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #eadacd;
        letter-spacing: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 1px solid #eadacd;
        border-radius: 4px;
      }
    }
    &__footer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 154px;
      padding: 32px;
      background-image: linear-gradient(179deg, #dde9fb 50%, #bcc7d7 100%);
      background-image: linear-gradient(180deg, #494845 0%, #2d2c29 100%);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
      border-radius: 12px;
      > img {
        width: 90px;
        height: 90px;

        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
      }
      > i {
        font-size: 35px;
        opacity: 0.5;
      }
    }
    &__footertext {
      margin: 0 32px 0 20px;
      p {
        &:first-of-type {
          width: 424px;
          line-height: 45px;
          margin: 0 0 9px 0;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #ffffff;
          letter-spacing: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:last-of-type {
          display: inline-block;
          padding: 5px 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 22px;
          font-family: PingFangSC-Medium;
          font-size: 22px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          img {
            width: 31px;
            height: 34px;
            box-shadow: 0 3px 5px 0 rgba(73, 116, 245, 0.16);
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
      }
    }
  }
  .body {
    position: relative;
    margin: -24px 0 0 0;
    padding: 64px 40px;
    
    background-color: #fff;
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
    z-index: 1;
    .sp-score {
      width: 100%;
      height: 314px;
      padding: 42px 40px;
      background: #ffffff;
      border: 1px solid #dddddd;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      &__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #222222;
        text-align: center;
        span {
          display: inline-block;
          &:first-of-type {
            width: 207px;
            height: 2px;
            background: #f4f4f4;
          }
          &:last-of-type {
            width: 207px;
            height: 2px;
            background: #f4f4f4;
          }
        }
      }
      &__score {
        font-family: Bebas;
        font-size: 58px;
        color: #222222;
        letter-spacing: 0;
        text-align: center;
      }
      &__statistical {
        margin: 7px 0 17px 0;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #222222;
        letter-spacing: 0;
        text-align: center;
      }
      &__detail {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #222222;
        letter-spacing: 0;
        text-align: center;
        i {
          font-size: 24px;
          color: rgb(102, 102, 102);
        }
      }
    }
    .tabs{
        ::v-deep .sp-tabs__wrap{
            margin:0 !important;
            width:80vw
        }
    }
    .recommended {
      padding: 56px 0;
      .title {
        font-family: PingFangSC-Medium;
        font-size: 40px;
        color: #222222;
      }
      .list-data{
        li{
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            padding:32px 0;
            img{
                width: 160px;
                height: 160px;
                margin:0 36px 0 0 ;
                border-radius: 5px;
            }
            div{
                .title{
                    font-family: PingFangSC-Medium;
                    font-size: 32px;
                    color: #222222;
                    line-height: 42px;
                }
                .label{
                    margin:12px 0 16px 0;
                    font-family: PingFangSC-Regular;
                    font-size: 22px;
                    color: #5C7499;
                    line-height: 22px;
                    span{
                        display: inline-block;
                        margin:0 12px 0 0;
                        padding:5px 8px;
                        background: #F0F2F5;
                        border-radius: 4px;
                    }
                }
                .type{
                    margin: 0 0 20px 0;
                    font-family: PingFangSC-Regular;
                    font-size: 22px;
                    color: #1A1A1A;
                    letter-spacing: 0;
                    line-height: 22px;
                    span{
                        display: inline-block;
                        padding:0 8px 0 0;
                        border-right: 1px solid #1A1A1A;
                        &:last-child{
                            border:none
                        }
                    }
                }
                .moneysee{
                    font-size: 36px;
                    span{
                        display: inline-block;
                        &:first-of-type{
                            font-family: PingFangSC-Medium;
                            font-size: 36px;
                            color: #EC5330;
                            line-height: 36px;
                        }
                        &:last-of-type{
                            font-family: PingFangSC-Regular;
                            font-size: 22px;
                            color: #EC5330;
                            letter-spacing: 0;
                            line-height: 22px;
                        }
                    }
                }
            }
        }
        
      }

      ::v-deep .sp-sticky{
        background: #fff;
      }
      ::v-deep .sp-tabs__wrap{
        margin: 0 0 0 -40px;
        width:80vw
      }
      ::v-deep .sp-tab{
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #999999;
      }
      ::v-deep .sp-tab--active{
        font-family: PingFangSC-Medium;
        font-size: 32px;
        font-weight: bold;
        color: #222222;
      }
      ::v-deep .sp-tabs__line{
        width: 28px;
        height: 6px;
        background: #4974F5;
        border-radius: 3px;
      }
    }
  }
  .footer {
    .phone{
      font-size: 24px;
      margin:0 44px 0 0;
    }
    ::v-deep .sp-bottombar {
      z-index: 100;
    }
    ::v-deep .sp-button--info {
        background-color: #24ae68;
        border: 1px solid #24ae68;
    }

  }
}
</style>