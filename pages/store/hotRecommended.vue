<template>
  <div class="merchantsShop">
    <div class="head">
      <Header title="商户店铺">
        <template #left>
          <sp-icon
            class-prefix="spiconfont"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-left: 0.32rem"
            @click.native="onClickLeft"
          />
          <sp-icon
            class-prefix="spiconfont"
            name="guanbi"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-left: 0.36rem"
            @click.native="onClickLeft"
          />
        </template>
        <template #right>
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
    <div id="group" class="bg-group-fixed">
        <div class="footer">
            <img
                :src="detailCodeData.MCH_LOGO"
                alt=""
            />
            <div class="footertext">
            <p>{{detailCodeData.MCH_NAME}}</p>
            <p>
                <img
                src="https://cdn.shupian.cn/sp-pt/wap/images/7mruoa3go2c0000.png"
                alt=""
                />
                <span>2级商户</span>
            </p>
            </div>
        </div>
        <div class="tabs">
            <sp-tabs v-model="headActive" @click="headTabsClick">
                <sp-tab v-for="(item,index) in headTabs" :key="index" :title="item.label" :name="item.value" >
                </sp-tab>
            </sp-tabs>
        </div>
    </div>
    <div class="body">
        <div class="body-content recommended">
            <sp-tabs v-model="active" @click="tabsClick">
                <sp-tab v-for="(item,index) in tabsData" :key="index" :title="item.name" :name="item.id" >
                    <ul class="list-data">
                        <li v-for="(data,dataIndex) in tabsListData" :key="dataIndex">
                            <img :src="data.img" alt="">
                            <div>
                                <p class="title">
                                    <span>{{data.name}}</span>
                                </p>
                                <p class="label">
                                    <span v-for="(ta,taindex) in data.tags" :key="taindex">{{ta}}</span>
                                </p>
                                <p class="type">
                                    <span v-for="(de,deindex) in data.desc && data.desc.split('|')" :key="deindex">{{de}}</span>
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
    data() {
        return {
            active: '', // tab状态
            headActive:"rememded",
            detailData:{},
            detailCodeData:{
                MCH_SERVICE_DATA:[],
                PLANNER_RECOMMEND:[],
                MCH_BASE_INFO:[],
                GOODS_RECOMMEND:[],
                SWIPER_IMAGE:[]
            },
            floatview:false, // 滚动置顶
            headTabs:[
                {
                    value:"index",
                    label:"主页" 
                },
                {
                    value:"rememded",
                    label:"热门推荐"
                }
            ],
            tabsData: [
            ],
            tabsListData: [
            ],
            // 规划师推荐
            recommendedByPlanner:[

            ],
            shareOptions: [],
            showShare: false,
        }
    },
    computed:{
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
            this.getDetail()
        }
    },
    async mounted() {
        window.addEventListener('scroll',this.handleScroll)
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
        handleScroll(){
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
            const group = document.getElementById('group');  // 要滚动到顶部吸附的元素的偏移量
            const height = group.offsetHeight
            if(scrollTop > height){
                this.floatview = true
            }else{
                this.floatview = false
            }
        },
        // 获取详情数据
        async getDetail() {
            try {
                // const { storeId } = this.$route.query
                // if (storeId == null) {
                //     this.$xToast.show({
                //         message: '缺少店铺参数!',
                //         duration: 1000,
                //         forbidClick: false,
                //         icon: 'toast_ic_error',
                //     })
                //     return
                // }
                const params = { storeId:"1118898391299179659" }
                const data  = await this.$axios.get(storeApi.mchStoreInfo, {params})
                if(data.code===200){
                    // MCH_SERVICE_DATA 商户服务数据
                    // PLANNER_RECOMMEND 规划师推荐
                    // MCH_BASE_INFO 商户基础信息
                    // GOODS_RECOMMEND 商品推荐
                    // SWIPER_IMAGE 轮播图
                    this.detailData = data.data || {}
                    const obj = {
                        SERVICE_CUSTOMER_NUM:"",
                        PERSON_NUM:"",
                        CALL_THROUGH_RATE:"",
                        CONSULT_RESPONSE:"",
                        MAINTENANCE_GOODS_NUM:"",
                        MCH_NAME:"",
                        MCH_LOGO:""
                    }
                    this.detailData.modules.forEach(item => {
                        switch(item.code){
                            case "MCH_SERVICE_DATA":
                                item.data.forEach(child=>{
                                    obj[child.code] = child.value
                                })
                            break;
                            case "MCH_BASE_INFO":
                                item.data.forEach(child=>{
                                    obj[child.code] = child.value
                                })
                            break;
                            case "GOODS_RECOMMEND":
                                this.tabsData = item.data
                                if(this.$route.query.active){
                                    this.active = this.$route.query.active
                                }else{
                                    this.active = this.tabsData[0].id
                                }
                                
                            break;
                            case "PLANNER_RECOMMEND":
                                this.recommendedByPlanner = item.data
                            break;
                            default:
                            break;
                        }
                    })
                    this.detailCodeData = obj
                    this.getList()
                }
                
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
              storeId:"1118898494378396293",
              typeId:"1118898494378396292",
              page:1,
              limit:10
            }
            const  data = await this.$axios.post(storeApi.recommendGoods, params, {
              headers: {
                'x-cache-control': 'cache',
              },
            })
            if(data.code===200){
                this.tabsListData = data.data.records || []
            }
            
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
        async bindhidden() {
            try {
                const isLogin = await this.judgeLoginMixin()
                if (isLogin) {
                const telData = await planner.newtel({
                    areaCode: this.city.code,
                    areaName: this.city.name,
                    customerUserId: this.$store.state.user.userId,
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
                    image: this.detailData.img,
                    title: '规划师',
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
        tabsClick(title,name){
            console.log(this.active)
        },
        headTabsClick(){
            if(this.headActive==='index'){
                this.onClickLeft()
            }
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
.merchantsShop {
    .bg-group {
        min-height:238px;
        padding: 60px 40px 84px;
        background: url('https://cdn.shupian.cn/sp-pt/wap/images/aicz8hyty0c0000.png')
        no-repeat;
        background-size: 100% 100%;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 28px;
        .footer {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        > img {
            width: 120px;
            height: 120px;
            border: 1px solid #FFFFFF;
            border-radius: 50%;
        }
        }
        .footertext {
            margin: 0 32px 0 20px;
            p {
                &:first-of-type {
                    max-width: 424px;
                    line-height: 45px;
                    margin: 0 0 20px 0;
                    font-family: PingFangSC-Regular;
                    font-size: 32px;
                    color: #ffffff;
                    font-weight: bold;
                    letter-spacing: 0;
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
    .bg-group-fixed{
        position: fixed;
        top: 48px;
        width: 100%;
        min-height:238px;
        padding: 60px 40px 0;
        background: #fff;
        background-size: 100% 100%;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #000;
        letter-spacing: 0;
        line-height: 28px;
        z-index: 2;
        .footer {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            > img {
                width: 120px;
                height: 120px;
                border: 1px solid #FFFFFF;
                border-radius: 50%;
            }
        }
        .footertext {
            margin: 0 32px 0 20px;
            p{
                &:first-of-type {
                    max-width: 424px;
                    line-height: 45px;
                    margin: 0 0 20px 0;
                    font-family: PingFangSC-Regular;
                    font-size: 32px;
                    color: #000;
                    font-weight: bold;
                    letter-spacing: 0;
                }
                &:last-of-type {
                    display: inline-block;
                    padding: 5px 8px;
                    background: rgba(73,116,245,0.1);
                    border-radius: 22px;
                    font-family: PingFangSC-Medium;
                    font-size: 22px;
                    color: #4974F5;
                    letter-spacing: 0;
                    text-align: center;
                    font-weight: bold;
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
        ::v-deep .sp-tab{
            color: #999999;
        }
        ::v-deep .sp-tab__text{
            font-family: PingFangSC-Regular;
            font-size: 32px;
            line-height: 32px;
        }
        ::v-deep .sp-tabs__wrap{
            margin: 0 0 0 -40px;
            width:40vw
        }
        ::v-deep .sp-tab--active{
            font-family: PingFangSC-Medium;
            font-size: 30px;
            color: #222222;
            font-weight: bold;
            line-height: 30px;
        }
        ::v-deep .sp-tabs__line{
            width: 24px;
            height: 6.1px;
            background: #4974F5;
            border-radius: 3px;
        }
    }
    .body {
        position: relative;
        margin: -24px 0 0 0;
        padding: 280px 40px 64px;
        background-color: #fff;
        border-top-right-radius: 24px;
        border-top-left-radius: 24px;
        z-index: 1;
        .sp-score {
            width: 100%;
            height: 314px;
            padding: 50px 40px;
            background: #ffffff;
            border: 1px solid #dddddd;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
            border-radius: 12px;
            &__score{
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-family: PingFangSC-Regular;
                font-size: 24px;
                color: #999999;
                letter-spacing: 0;
                
            }
            &__title{
                span{
                    margin-left: -3px;
                    &:first-of-type{
                        font-family: Bebas;
                        font-size: 56px;
                        color: #222222;
                        letter-spacing: 0;
                    }
                    &:last-of-type{
                        font-family: PingFangSC-Medium;
                        font-size: 24px;
                        color: #222222;
                        font-weight: bold;
                        letter-spacing: 0;
                    }
                }
            }
            &__satisfaction{
                >p{
                    font-family: PingFangSC-Medium;
                    font-size: 32px;
                    color: #222222;
                    letter-spacing: 0;
                    margin: 37px 0 15px 0;
                }
                .satisfactiontext{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-family: PingFangSC-Regular;
                    font-size: 28px;
                    color: #222222;
                    letter-spacing: 0;
                }
            }
        }
        .tabs{
            ::v-deep .sp-tabs__wrap{
                margin:0 !important;
                width:80vw
            }
        }
        .body-content{
            .title {
                margin:32px 0;
                font-family: PingFangSC-Medium;
                font-size: 40px;
                font-weight: bold;
                color: #222222;
            }
        }
        .recommended {
        
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
                        .recommendedtitle{
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
            button{
                width: 100%;
                height: 96px;
                line-height: 96px;
                font-family: PingFangSC-Medium;
                font-size: 32px;
                color: #4974F5;
                text-align: center;
                line-height: 32px;
                background: #F2F5FF;
                border-radius: 8px;
                border:none;
            }
            ::v-deep .sp-tabs__wrap{
                margin: 0 0 0 -40px;
                .sp-tabs__nav{
                    justify-content: space-between;
                }
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
        .recommendedPlanner{
            .planner{
                width: 100%;
                padding: 50px 40px;
                background: #ffffff;
                border: 1px solid #dddddd;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
                border-radius: 12px;
                ul{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    li{
                        text-align: center;
                        img{
                            width: 96px;
                            height: 96px;
                            border-radius: 50%;
                        }
                        .name{
                            margin:26px 0 8px 0;
                            font-family: PingFangSC-Medium;
                            font-size: 26px;
                            color: #222222;
                            text-align: center;
                        }
                        .line{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            span{
                                display: inline-block;
                                &:first-of-type{
                                    width: 72px;
                                    height: 2px;
                                    background-image: linear-gradient(270deg, #DDDDDD 0%, rgba(221,221,221,0.10) 100%);
                                    border-radius: 1px;
                                }
                                &:nth-of-type(2){
                                    width: 4px;
                                    height: 4px;
                                    background: #DDDDDD;
                                    border-radius: 50%;
                                }
                                &:last-of-type{
                                    width: 72px;
                                    height: 2px;
                                    background-image: linear-gradient(270deg, rgba(221,221,221,0.10) 0%, #DDDDDD 100%);
                                    border-radius: 1px;
                                }
                            }
                        }
                        .score{
                            margin:11px 0 7px 0;
                            font-family: PingFangSC-Medium;
                            font-size: 24px;
                            color: #222222;
                            text-align: center;
                        }
                        .job{
                            font-family: PingFangSC-Medium;
                            font-size: 24px;
                            color: #999999;
                            text-align: center;
                            span{
                                max-width: 168px;
                                display: inline-block;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                            }
                        }
                    }
                }
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