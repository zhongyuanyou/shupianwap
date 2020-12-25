<template>
  <div class="shiyong">
    <div class="title">实用工具</div>
    <div class="tools">
      <a
        v-for="item in list"
        :key="item.id"
        v-md-map
        class="tool"
        href="javascript:void(0);"
        @click="
          () => {
            $parent.jumpLink(item.url)
          }
        "
      >
        <img class="tool-img" :src="item.img" />
        <p class="tool-name">{{ item.name }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShiYong',
  data() {
    return {
      list: [
        {
          id: 1,
          name: '免费核名',
          img: require('~/assets/spreadImages/home/busi_img_gscsgj01.png'),
          imgWidth: 225,
          imgHeight: 348,
          url: '',
        },
        {
          id: 2,
          name: '注册公司标准',
          img: require('~/assets/spreadImages/home/busi_img_gscsgj02.png'),
          imgWidth: 225,
          imgHeight: 348,
          url: '',
        },
        {
          id: 3,
          name: '税筹方案',
          img: require('~/assets/spreadImages/home/busi_img_gscsgj03.png'),
          imgWidth: 225,
          imgHeight: 348,
          url: '',
        },
        {
          id: 4,
          name: '法律咨询',
          img: require('~/assets/spreadImages/home/busi_img_gscsgj04.png'),
          imgWidth: 225,
          imgHeight: 348,
          url: '',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.shiyong {
  width: calc(100% - 80px);
  margin: 0 auto;
  padding: 30px 0;
  font-family: PingFang SC;

  .title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 30px;
  }

  .tools {
    display: flex;
    justify-content: space-between;

    .tool {
      flex: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tool-img {
        width: 48px;
        height: 48px;
        margin-bottom: 12px;
      }
      .tool-name {
        font-size: 28px;
        font-weight: bold;
        color: #222222;
      }
    }
  }
}
</style>
