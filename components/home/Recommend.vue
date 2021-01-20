<template>
  <div class="recommend-moudle">
    <!-- S 推荐模块tab -->
    <TabCurve
      ref="tabCurveRef"
      v-model="curentItem"
      :offset-top="searchDomHeight"
      :tab-list="tabBtn"
      :need-fixed="true"
      :right="0.54"
      name-field="name"
      @selectTabHandle="selectTabHandle"
    ></TabCurve>
    <!-- E 推荐模块tab -->
    <sp-swipe
      ref="recomRef"
      class="my-swipe"
      :show-indicators="false"
      @change="onChange"
    >
      <sp-swipe-item v-for="(item, index) in tabBtn" :key="index">
        <div v-show="index === curentItem">
          <!-- S 推荐内容滚动区 -->
          <div
            v-if="item.adData.length"
            class="scroll-recom"
            @touchstart="preventTouch"
            @touchmove="preventTouch"
          >
            <ul>
              <li v-for="(key, v) in item.adData" :key="v">
                <a
                  v-if="key.materialList.length"
                  href="javascript:void(0)"
                  @click="adJumpHandleMixin(key.materialList[0])"
                >
                  <img
                    v-lazy="
                      key.materialList[0].materialUrl + $ossImgSet(262, 144)
                    "
                    class="recom-img"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>
          <!-- E 推荐内容滚动区 -->
          <!-- S 推荐商品列表 -->
          <div class="goods-list">
            <sp-skeleton
              v-for="val in tabBtn[index].limit"
              :key="val + 'a'"
              avatar-shape="square"
              avatar-size="2.4rem"
              title
              title-width="100%"
              avatar
              :row="3"
              :row-width="['80%', '70%', '50%']"
              :loading="
                item.goodsList.length > 0 ? false : true && !item.noData
              "
            >
            </sp-skeleton>
            <GoodsPro
              v-for="(goodsitem, sub) in item.goodsList"
              :key="sub"
              :goods-data="goodsitem"
            />
            <div v-if="item.noData" class="no-data">
              <img :src="$ossImgSet(340, 340, '3py8wghbsaq000.png')" alt="" />
              <p>暂无数据</p>
            </div>
          </div>
          <!-- E 推荐商品列表 -->
        </div>
      </sp-swipe-item>
    </sp-swipe>
    <Loading-down
      v-if="tabBtn.length"
      :bg-color="tabBtn[curentItem].noData ? '#ffffff' : '#f4f4f4'"
      :loading="loading && !tabBtn[curentItem].noMore"
      :no-data="tabBtn[curentItem].noMore"
    />
  </div>
</template>

<script>
import { Swipe, swipeItem, Skeleton } from '@chipspc/vant-dgg'
import getUserSign from '@/utils/fingerprint'
import { homeApi } from '@/api'
import TabCurve from '@/components/common/tab/TabCurve'
import GoodsPro from '@/components/common/goodsItem/GoodsPro'
import LoadingDown from '@/components/common/loading/LoadingDown'
import adJumpHandle from '~/mixins/adJumpHandle'
export default {
  components: {
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    [Skeleton.name]: Skeleton,
    TabCurve,
    GoodsPro,
    LoadingDown,
  },
  mixins: [adJumpHandle],
  data() {
    return {
      tabBtn: [],
      loading: false,
      curentItem: 0,
      searchDomHeight: 0,
      params: {
        dictionaryCode: 'C-SY-RMJY-GG', // 查询数据字典的code
        findType: 0, // 查询类型：0：初始查询广告+数据字典+推荐商品  1：查询广告+推荐商品 2：只查推荐商品
        userId: '', // 用户id
        deviceId: '', // 设备ID（用户唯一标识） 0022ef1a-f685-469a-93a8-5409892207a2
        areaCode: '', // 区域编码
        sceneId: 'app-mainye-01', // 场景ID
        maxsize: 100, // 要求推荐产品的数量
        platform: 'APP', // 平台（app,m,pc）
        formatId: '', // 产品类别
        limit: 10, // 分页条数
        page: 1, // 当前页
        locationCode: '', // 查询广告的位置code
      },
    }
  },
  computed: {
    cityCode() {
      return this.$store.state.city.currentCity.code
    },
    isSendReq() {
      const cityCode = this.$store.state.city.currentCity.code
      if (cityCode && this.tabBtn.length && !this.tabBtn[0].goodsList.length) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    // 监听城市定位成功，且字典数据请求完成够再获取字典第一个分类下的产品数据
    isSendReq(val) {
      if (val) {
        this.params.findType = 2
        this.findRecomList(0)
      }
    },
  },
  async created() {
    if (process.client) {
      this.findRecomList(this.curentItem)
      this.params.deviceId = await getUserSign() // 获取用户唯一标识
    }
  },
  mounted() {
    try {
      this.searchDomHeight =
        this.$parent.$refs.searchBannerRef.$refs.searchRef.$el.clientHeight - 1 // 获取吸顶头部搜索栏的高度
      window.addEventListener('scroll', this.handleScroll) // 监听滚动
    } catch (error) {
      console.log(error)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 滚动加载更多
    handleScroll() {
      if (
        this.tabBtn.length &&
        this.tabBtn[this.curentItem].goodsList.length &&
        !this.loading &&
        !this.tabBtn[this.curentItem].noMore
      ) {
        const pageScrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop // 滚动条距离顶部的位置
        const pageScrollHeight = document.body.scrollHeight // 页面文档的总高度
        const pageClientHeight = window.innerHeight // 窗口文档显示区域的高度
        // 监听页面是否滚动到底部加载更多数据
        if (Math.ceil(pageScrollTop + pageClientHeight) >= pageScrollHeight) {
          this.loading = true
          this.tabBtn[this.curentItem].page += 1
          this.params.findType = 2
          this.findRecomList(this.curentItem)
        }
      }
    },
    // 选项卡选择某项
    selectTabHandle({ index }) {
      this.$refs.recomRef.swipeTo(index)
    },
    // 切换轮播
    onChange(index) {
      this.switchHandle(index)
      if (this.$refs.tabCurveRef.isFixed) {
        this.$nextTick(() => {
          const tabCurveDomHeight = this.$refs.tabCurveRef.$el.clientHeight // 获取吸顶头部tab栏高度
          this.listOffsetTop =
            this.$refs.recomRef.$el.offsetTop -
            this.searchDomHeight -
            tabCurveDomHeight // 推荐列表距离顶部的距离 - 搜索栏高度 - tab栏高度 （用于切换tab重置列表滚动位置）
          document.documentElement.scrollTop = this.listOffsetTop + 1
          document.body.scrollTop = this.listOffsetTop + 1
        })
      }
      this.curentItem = index
    },
    switchHandle(index) {
      // 切换没有数据时加载数据
      if (
        !this.tabBtn[index].goodsList.length &&
        !this.tabBtn[index].adData.length
      ) {
        this.params.findType = 1
        this.findRecomList(index)
      }
    },
    preventTouch(e) {
      e.stopImmediatePropagation() // 阻止冒泡
    },
    // 查询推荐商品
    findRecomList(index) {
      const params = {}
      // 初始化查询字典+广告需要的参数
      if (this.params.findType === 0) {
        params.findType = this.params.findType
        params.dictionaryCode = this.params.dictionaryCode
        params.limit = this.params.limit
        params.page = this.params.page
      }

      // 查询推荐产品需要的参数
      if (this.params.findType !== 0) {
        params.findType = this.params.findType
        params.formatId = this.tabBtn[index].ext3
        params.limit = this.tabBtn[index].limit
        params.page = this.tabBtn[index].page
        params.areaCode = this.cityCode
        params.deviceId = this.params.deviceId
        params.sceneId = this.params.sceneId
        params.maxsize = this.params.maxsize
        params.platform = this.params.platform
      }

      // 广告位code
      if (this.params.findType === 1) {
        params.locationCode = this.tabBtn[index].ext4
      }

      this.$axios.post(homeApi.findRecomList, params).then((res) => {
        this.loading = false
        if (res.code === 200) {
          if (params.findType === 0) {
            res.data.dictData[0].adData = res.data.adData
            this.tabBtn = res.data.dictData
            return
          }
          if (params.findType === 1) {
            this.tabBtn[index].adData = res.data.adData
            this.tabBtn[index].goodsList = res.data.goodsList
            this.tabBtn[index].noData = res.data.goodsList.length === 0
            return
          }
          // 初始查询第一个分类产品无任何数据
          if (
            index === 0 &&
            params.page === 1 &&
            res.data.goodsList.length === 0
          ) {
            this.$set(this.tabBtn[index], 'noData', true)
            return
          }
          // 加载更多时无更多数据
          if (!res.data.goodsList.length) {
            this.tabBtn[index].noMore = true
            return
          }
          this.tabBtn[index].goodsList = this.tabBtn[index].goodsList.concat(
            res.data.goodsList
          )
        } else {
          this.$xToast.error(res.message)
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
@skeleton-row-margin-top: 0;
.scroll-recom {
  padding: 22px 0 32px 40px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    display: none;
  }
  ul {
    display: flex;
    li {
      margin-right: 12px;
      &:last-child {
        margin-right: 40px;
      }
      a {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 262px;
        height: 144px;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        overflow: hidden;
        // padding: 26px 32px 0 32px;
        // > strong {
        //   font-size: 28px;
        //   font-family: PingFang SC;
        //   font-weight: bold;
        //   color: #222222;
        //   line-height: 38px;
        //   .textOverflow(1);
        // }
        // > p {
        //   font-size: 24px;
        //   font-family: PingFang SC;
        //   font-weight: 400;
        //   color: #555555;
        //   line-height: 34px;
        //   margin-top: 4px;
        //   .textOverflow(1);
        // }
        // > img {
        //   width: 40px;
        //   height: 40px;
        //   position: absolute;
        //   right: 12px;
        //   bottom: 12px;
        // }
        .recom-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.goods-list {
  position: relative;
  width: 100%;
  padding: 0 40px 0 40px;
  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background: #f4f4f4;
  }
  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    img {
      width: 340px;
      height: 340px;
    }
    > p {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
.my-swipe {
  /deep/ .sp-skeleton {
    padding: 32px 0;
  }
  /deep/ .sp-skeleton__content {
    padding-top: 0;
  }
}
</style>
