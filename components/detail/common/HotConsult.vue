<template>
  <!-- 热门咨询组件 -->
  <div v-if="questList.length" class="c-hot-consult">
    <div class="title">
      <div class="title__name">热门咨询</div>
      <div v-show="queChangeFlag" class="title__more" @click="changeQue">
        <span>换一换</span>
        <my-icon name="gongju_huan" size="0.26rem"></my-icon>
      </div>
    </div>
    <div class="content">
      <template v-if="initData">
        <div
          v-for="(item, i) in questList"
          :key="i"
          class="content__item"
          @click="toIM(item)"
        >
          {{ item.content }}
        </div>
      </template>
      <template v-else>
        <div
          v-for="(item, i) in tempList"
          :key="i"
          class="content__item"
          @click="toIM(item)"
        >
          {{ item.content }}
        </div>
      </template>
    </div>
    <div class="ask">
      <div class="ask__title">快速提问</div>
      <div class="ask__input">
        <input
          v-model="askVal"
          placeholder="您的疑问第一时间为您解答"
          maxlength="20"
        />
        <button @click="questIm">提问</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Button } from '@chipspc/vant-dgg'
import imHandle from '~/mixins/imHandle'
import { productDetailsApi } from '~/api'

export default {
  name: 'GoodDetailHotConsult',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
  },
  mixins: [imHandle],
  props: {
    // 多个钻展规划师
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    changeFlag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: 2,
      limit: 4,
      changeFinished: false, // 换一换结束
      initData: true, // 是否加载初始化数据
      askVal: '',
      tempList: [],
    }
  },
  computed: {
    recPlanner() {
      return this.$store.state.planner.recodBottomPlanner
    },
    sellingGoodsData() {
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
    questList() {
      return this.list
    },
    queChangeFlag() {
      return this.changeFlag
    },
  },
  mounted() {},
  methods: {
    toIM(item) {
      this.sendTextMessageV2(this.recPlanner.mchUserId, item.content)
    },
    questIm() {
      if (this.askVal.trim() === '') {
        this.$xToast.warning('提问内容不能为空')
        return
      }
      this.sendTextMessageV2(this.recPlanner.mchUserId, this.askVal.trim())
    },
    changeQue() {
      if (this.changeFinished) {
        this.$xToast.warning('已经没有多余问题啦')
        return
      }
      this.productInformationContent()
    },
    async productInformationContent() {
      try {
        const key = this.sellingGoodsData.classCodeLevel.split(',')
        const params = {
          page: this.page,
          limit: this.limit,
          twoLevelCategoryCode: key[1],
          contentType: 1,
        }
        const { data, code, message } = await this.$axios.get(
          productDetailsApi.productInformationContent,
          { params }
        )
        if (code !== 200) {
          throw new Error(message)
        }
        if (data.rows.length) {
          this.tempList = data.rows
          this.initData = false
          this.changeFinished = data.totalPage === this.page
          this.page++
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '~@css/pages/detail/var.less';
.c-hot-consult {
  .c-space-mixin();
  padding: @c-padding;
  background: @c-bg;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__name {
      .c-title-font-mixin();
    }
    &__more {
      font-size: 26px;
      line-height: 36px;
      color: #999999;
    }
  }
  .content {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &__item {
      background: #f2f5ff;
      padding: 18px 20px;
      width: 320px;
      height: 72px;
      font-size: 26px;
      line-height: 36px;
      color: #222;
      text-align: center;
      border-radius: 4px;
      margin-bottom: 20px;
      .mixin-text-oneoverflow();
    }
  }
  .ask {
    margin-top: 61px;
    &__title {
      font-size: 36px;
      line-height: 50px;
      color: #1a1a1a;
      font-weight: bold;
    }
    &__input {
      margin-top: 33px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      padding: 20px 24px;
      padding-right: 0px;
      width: 100%;
      border: 1px solid #4974f5;
      border-radius: 4px;
      input {
        font-size: 28px;
        line-height: 40px;
        color: #222;
        border: none;
        &::-webkit-search-cancel-button {
          -webkit-appearance: none; //此处去掉默认的小×
        }
        &[disabled='disabled'] {
          background-color: #fff;
        }
        &::placeholder {
          color: #999999;
        }
      }
      button {
        flex-shrink: 0;
        height: 80px;
        width: 144px;
        background: #4974f5;
        color: #fff;
        font-size: 28px;
        line-height: 28px;
      }
    }
  }
}
</style>
