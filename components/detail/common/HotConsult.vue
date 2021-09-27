<template>
  <!-- 热门咨询组件 -->
  <div class="c-hot-consult">
    <div class="title">
      <div class="title__name">热门咨询</div>
      <div class="title__more" style="display: none">
        <span>换一换</span>
        <my-icon name="gongju_huan" size="0.26rem"></my-icon>
      </div>
    </div>
    <div class="content">
      <div
        v-for="(item, i) in tepmList"
        :key="i"
        class="content__item"
        @click="toIM(item)"
      >
        {{ item.content }}
      </div>
    </div>
    <div class="ask">
      <div class="ask__title">快速提问</div>
      <div class="ask__input">
        <input
          v-model="askVal"
          placeholder="您的疑问第一时间为您解答"
          maxlength="20"
        />
        <button @click="toIM(item)">提问</button>
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
  data() {
    return {
      askVal: '',
      tepmList: [
        { content: '可以提供定制可以提供定制可以提供定制' },
        { content: '可以提供定制可以提供定制可以提供定制' },
        { content: '可以提供定制可以提供定制可以提供定制' },
        { content: '可以提供定制可以提供定制可以提供定制' },
      ],
    }
  },
  computed: {
    recPlanner() {
      return this.$store.state.planner.recodBottomPlanner
    },
    sellingGoodsData() {
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
  },
  mounted() {
    this.productInformationContent()
  },
  methods: {
    toIM(item) {
      this.sendTextMessage(this.recPlanner.mchUserId)
    },
    async productInformationContent() {
      try {
        const key = this.sellingGoodsData.classCodeLevel.split(',')
        const params = {
          page: 1,
          limit: 4,
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
          this.tepmList = data
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
