<!--
 * @Author: xiao pu
 * @Date: 2021-01-14 13:58:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-19 09:11:56
 * @Description: file content
 * @FilePath: /chips-wap/components/planner/RecommendList.vue
-->
<template>
  <div v-show="list.length" class="recommend-list">
    <p class="recommend-list__title">为您推荐</p>
    <sp-list
      v-model="loading"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      :error.sync="error"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="recommend-list__contianer">
        <div v-for="item in list" :key="item.id">
          <div class="recommend-list__item" @click="handleDetail(item)">
            <div class="recommend-list__item-img">
              <sp-image
                width="1.6rem"
                height="1.6rem"
                fit="cover"
                radius="0.04rem"
                :src="item.productImgArr[0]"
              />
            </div>
            <div class="recommend-list__item-rt">
              <p class="title">
                {{ item.name }}
              </p>
              <div class="label">
                <span>{{ item.operating ? item.operating.slogan : null }}</span>
              </div>
              <div class="tags">
                <div
                  v-for="tItem in tagsFilter(item.tags)"
                  :key="tItem.id"
                  class="tags__item"
                >
                  {{ tItem.name }}
                </div>
              </div>
              <p class="money">{{ item.referencePrice }}元</p>
            </div>
          </div>
        </div>
      </div>
    </sp-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import { List, Image } from '@chipspc/vant-dgg'

import { recommendApi } from '@/api'
import { request } from '@/utils/request'
import fingerprint from '@/utils/fingerprint'

const DEFAULT_PAGE = {
  limit: 10,
  page: 1,
  totalCount: 0,
}

export default {
  name: 'Need',
  components: {
    [List.name]: List,
    [Image.name]: Image,
  },
  props: {
    mchDetailId: {
      // 商户id
      type: String,
      require: true,
      default: '',
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      pageOption: DEFAULT_PAGE,
      config: { deviceCode: '', reqArea: '' }, // 不同平台的配置
    }
  },
  computed: {
    ...mapState({
      cityCode: (state) => state.city.currentCity.code,
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  watch: {
    mchDetailId(newVal, oldVal) {
      if (!newVal || newVal === oldVal) return
      this.onLoad()
    },
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    tagsFilter(tags) {
      let tagsarr = []
      if (!tags) return
      tagsarr = tags.filter((item) => {
        return (item.tagType = 'PRO_SALES_TAG')
      })
      return tagsarr
    },

    onLoad() {
      let currentPage = this.pageOption.page
      if (this.list.length && currentPage >= 1) {
        currentPage += 1
      } else {
        this.pageOption = DEFAULT_PAGE
        currentPage = 1
      }
      this.getList(currentPage)
        .then((data) => {
          this.loading = false
          const { limit, page } = this.pageOption
          if (this.list.length < limit * page) {
            this.finished = true
          }
        })
        .catch(() => {
          this.error = true
          this.loading = false
        })
    },

    handleDetail(item) {
      const { id } = item || {}
      this.uPGoDetail(id)
    },

    // 根据不同的平台差异，获取不同的参数
    async uPGetConfig() {
      if (this.config.deviceCode) return { ...this.config }
      let deviceCode = ''
      let reqArea = ''

      // 在app运行环境
      if (this.isInApp) {
        const devicePromise = this.getAppDeviceInfo()
        const regionPromise = this.getAppRegion()
        ;[deviceCode, reqArea] = await Promise.all([
          devicePromise,
          regionPromise,
        ])
      } else {
        if (!this.cityCode) {
          await this.POSITION_CITY({
            type: 'init',
          })
        }
        reqArea = this.cityCode
        deviceCode = await fingerprint()
      }
      const config = { deviceCode, reqArea }
      this.config = config
      return config
    },

    // 统一跳转详情
    uPGoDetail(productId) {
      if (!productId) {
        this.$xToast({
          message: '缺少productId',
          duration: 1000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
        return
      }

      if (this.isInApp) {
        console.log('appInfo:', this.appInfo)
        const { platformCode } = this.appInfo || {}
        let iOSRouter = {}
        let androidRouter = {}

        switch (platformCode) {
          case 'COMDIC_PLATFORM_QIDABAO': // 企大包
            break
          case 'COMDIC_PLATFORM_CRISPS': // 薯片
            iOSRouter = {
              path:
                'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
              parameter: {
                routerPath: 'cpsc/goods/details/service',
                parameter: { productId },
              },
            }
            androidRouter = {
              path: '/flutter/main',
              parameter: {
                routerPath: 'cpsc/goods/details/service',
                parameter: { productId },
              },
            }
            break
          case 'crisps-qds-app': // 企大顺
            iOSRouter = {
              type: 'Flutter', // 只有企大顺有
              path:
                'CPSPlanner:CPSPlanner/CPSFlutterRouterViewController///push/animation',
              parameter: {
                routerPath: 'cpsplanner/product/service_product_detail',
                parameter: { productId },
              },
            }
            androidRouter = {
              type: 'Flutter',
              path: '/flutter/main',
              parameter: {
                routerPath: 'cpsplanner/product/service_product_detail',
                parameter: { productId },
              },
            }
            break
        }

        const iOSRouterStr = JSON.stringify(iOSRouter)
        const androidRouterStr = JSON.stringify(androidRouter)
        this.$appFn.dggJumpRoute(
          {
            iOSRouter: iOSRouterStr,
            androidRouter: androidRouterStr,
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast({
                message: '跳转失败',
                duration: 1000,
                icon: 'toast_ic_error',
                forbidClick: true,
              })
            }
          }
        )
        return
      }
      // 在浏览器中
      this.$router.push({
        path: '/detail/serviceDetails',
        query: { productId },
      })
    },

    // 在app中获取Code
    getAppDeviceInfo() {
      return new Promise((resolve, reject) => {
        this.$appFn.dggDeviceInfo((res) => {
          console.log('dggDeviceInfo res:', res)
          const { code, data = {} } = res
          if (code === 200) {
            resolve(data['X-Device-Code'])
            return
          }
          reject(res)
        })
      })
    },

    // 获取app当前的站点
    getAppRegion() {
      return new Promise((resolve, reject) => {
        this.$appFn.dggCityCode((res) => {
          console.log('dggCityCode:', res)
          const { code, data } = res || {}
          if (code === 200) {
            const { adCode } = data
            resolve(adCode)
            return
          }
          reject(res)
        })
      })
    },

    async getList(current) {
      try {
        const config = await this.uPGetConfig()
        const { deviceCode, reqArea } = config
        const params = {
          deviceId: deviceCode,
          areaCode: reqArea,
          sceneId: 'app-ghszy-01',
          storeId: this.mchDetailId,
          platform: 'APP',
          searchType: 2,
          page: current,
          limit: this.pageOption.limit,
        }
        const data = await request({
          params,
          url: recommendApi.recommendProduct,
        })
        if (data) {
          const { currentPage, limit, records = [] } = data
          this.pageOption = { ...this.pageOption, limit, page: currentPage }
          if (Array.isArray(records)) {
            this.list.push(...records)
          }
        }
        return data
      } catch (error) {
        console.error('getList:', error)
        // this.$xToast.show({
        //   message: '获取sku失败',
        //   duration: 1000,
        //   forbidClick: false,
        //   icon: 'toast_ic_remind',
        // })
        return Promise.reject(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.recommend-list {
  background-color: #fff;
  padding: 48px 40px 0 40px;
  overflow: hidden;
  &__title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    margin-bottom: 24px;
  }
  &__item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    padding: 40px 0;
    border-bottom: 1px solid #f4f4f4;
    &:last-child {
      border-bottom: none;
    }
    &-img {
      width: 160px;
      height: 160px;
    }
    &-rt {
      width: 100%;
      margin-left: 32px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      .title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-top: -6px;
        line-height: 44px;
        .textOverflow(2);
      }
      .label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 2px;
        span {
          font-size: 22px;
          font-weight: 400;
          color: #222222;
          display: block;
          width: 478px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .tags {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 7px;
        flex-wrap: wrap;
        &__item {
          padding: 5px 10px;
          background: #f0f2f5;
          border-radius: 4px;
          margin-right: 12px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
          margin-bottom: 9px;
        }
      }
      .money {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ec5330;
      }
    }
  }
}
</style>
