<template>
  <div
    class="activity-bn"
    :style="{ height: fiexdBannerData.length ? '5.52rem' : '1.28rem' }"
  >
    <a
      v-if="fiexdBannerData.length"
      :href="fiexdBannerData[0].materialList[0].materialLink"
    >
      <img :src="fiexdBannerData[0].materialList[0].materialUrl" alt="" />
    </a>
    <sp-sticky @scroll="searchHandle">
      <Search
        ref="searchRef"
        :icon-left="0.24"
        :disabled="true"
        :opacity="opacity"
        placeholder="搜索您想找的服务"
        @clickInputHandle="clickInputHandle"
      >
        <template v-slot:center>
          <div class="city-box" @click="swichCityHandle">
            <span class="current-city">{{
              cityName ? cityName : '定位中'
            }}</span>
            <my-icon
              name="sear_ic_open"
              size="0.14rem"
              color="#1A1A1A"
            ></my-icon>
          </div>
        </template>
      </Search>
    </sp-sticky>
  </div>
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import { mapState, mapActions } from 'vuex'
import Search from '@/components/common/search/Search'
export default {
  components: {
    [Sticky.name]: Sticky,
    Search,
  },
  props: {
    fiexdBannerData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      scollPercentage: 120, // 滚动多少距离，搜索栏背景色渐变
      opacity: 0,
      cityList: [
        {
          code: 'COMPANY_ALL',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: -1,
          name: '全国',
          id: '7872989240263901184',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '',
        },
        {
          code: 'COMPANY_CD',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 0,
          name: '成都',
          id: '7832865662955618304',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '四川省/成都市',
        },
        {
          code: 'COMPANY_BJCY',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 1,
          name: '北京',
          id: '7837857825929887744',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '北京市',
        },
        {
          code: 'COMPANY_CQ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 2,
          name: '重庆',
          id: '7832865698741420032',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '重庆市',
        },
        {
          code: 'COMPANY_SH',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 5,
          name: '上海',
          id: '7832865910562160640',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '上海市/市辖区',
        },
        {
          code: 'COMPANY_ZZ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 6,
          name: '郑州',
          id: '7832866077881335808',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '河南省/郑州市',
        },
        {
          code: 'COMPANY_HZ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 7,
          name: '杭州',
          id: '7832866153567551488',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '浙江省/杭州市',
        },
        {
          code: 'COMPANY_GZ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 8,
          name: '广州',
          id: '7832866268457926656',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '广东省/广州市',
        },
        {
          code: 'COMPANY_FS',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 9,
          name: '佛山',
          id: '7832866333213786112',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '广东省/佛山市',
        },
        {
          code: 'COMPANY_YC',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 10,
          name: '宜昌',
          id: '7832866413467598848',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '湖北省/宜昌市',
        },
        {
          code: 'COMPANY_SZ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 11,
          name: '深圳',
          id: '7832866460208922624',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '广东省/深圳市',
        },
        {
          code: 'COMPANY_DG',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 12,
          name: '东莞',
          id: '7832866510234386432',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '广东省/东莞市',
        },
        {
          code: 'COMPANY_CS',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 13,
          name: '长沙',
          id: '7832866586507804672',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '湖南省/长沙市',
        },
        {
          code: 'COMPANY_SJZ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 14,
          name: '石家庄',
          id: '7832866898576605184',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '河北省/石家庄市',
        },
        {
          code: 'COMPANY_WH',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 15,
          name: '武汉',
          id: '7832867098456162304',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '湖北省/武汉市',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      cityName: (state) => state.city.currentCity.name,
    }),
  },
  created() {
    // 存在banner大图，设置搜索栏透明度
    if (!this.fiexdBannerData.length) {
      this.opacity = 1
    }
  },
  mounted() {
    // 定位
    if (!this.cityName) {
      this.POSITION_CITY({
        type: 'init',
        cityList: this.cityList,
      })
    }
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    // 滚动改变搜索栏透明度
    searchHandle({ scrollTop }) {
      if (this.fiexdBannerData.length) {
        this.opacity = scrollTop / this.scollPercentage
      }
    },
    // 选择城市
    swichCityHandle() {
      if (!this.cityName) {
        return
      }
      this.$router.push('/city/choiceCity')
    },
    // 搜索框点击
    clickInputHandle() {
      this.$router.push('/search')
    },
  },
}
</script>

<style scoped lang="less">
.activity-bn {
  font-size: 24px;
  position: relative;
  width: 100%;
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 552px;
  }
}
.city-box {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 32px;
  padding-right: 31px;
  &::after {
    content: '';
    width: 2px;
    height: 32px;
    background: #c5c5c5;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .current-city {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-right: 12px;
  }
}
</style>
