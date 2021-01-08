<template>
  <div class="header">
    <div class="content" :style="{ backgroundImage: 'url(' + imgSrc + ')' }">
      <a href="javascript:;" @click="chooseCity()">
        <span>{{ currentCity || '成都市' }}</span>
        <my-icon
          name="sear_ic_open"
          color="#ffffff"
          size="0.14rem"
          class="icon"
        >
        </my-icon>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import MyIcon from '../../../common/myIcon/MyIcon.vue'
export default {
  components: {
    MyIcon,
  },
  data() {
    return {
      title: '轻松找服务',
      imgSrc: 'https://cdn.shupian.cn/sp-pt/wap/images/13zjhce6649s000.jpg',
    }
  },
  computed: {
    ...mapState({
      currentCity(state) {
        this.$emit('onCity', state.city.currentCity)
        return state.city.currentCity.name
      }, // 当前选择的城市
    }),
  },

  methods: {
    chooseCity() {
      this.$router.push('/city/choiceCity')
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  position: relative;
  .content {
    height: 320px;
    background-size: 100% 100%;
    position: relative;
    z-index: 2;
    a {
      position: absolute;
      z-index: 3;
      bottom: 58px;
      display: block;
      height: 44px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 48px;
      margin-top: 39px;
      padding: 10px 20px;
      > span {
        display: block;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
      .icon {
        margin-left: 12px;
      }
    }
  }
}
</style>
