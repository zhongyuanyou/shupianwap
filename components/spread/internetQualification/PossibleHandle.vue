<template>
  <div>
    <div class="my-component">
      <div class="title">你还可能需要办理</div>
      <div class="content">
        <a
          v-for="(item, index) in data"
          :key="index"
          v-sensorsTrack:webClick="{
            name: item.mdName,
            type: '售前',
          }"
          class="item"
          @click="$parent.jumpLink(item.url)"
        >
          <img :src="item.img" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PossibleHandle',
  data() {
    return {
      data: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/qjc6s7ybvuo000.png',
          name: '公司注册',
          mdName: '互联网资质_还需要办理_公司注册',
          url: '/spread/companyRegister',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ockwwyst600000.png',
          name: '工商注销',
          mdName: '互联网资质_还需要办理_工商注销',
          url: '/spread/businessCancellation',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9ufd0res32o0000.png',
          name: '工商变更',
          mdName: '互联网资质_还需要办理_工商变更',
          url: '/spread/businessChange',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1j8b68tdaydc000.png',
          name: '体系认证',
          mdName: '互联网资质_还需要办理_体系认证',
          url: '/spread/system',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/606rxjgzicc0000.png',
          name: '代理记账',
          mdName: '互联网资质_还需要办理_代理记账',
          url: '/spread/agency',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5d7waph6mao0000.png',
          name: '银行服务',
          mdName: '互联网资质_还需要办理_银行服务',
          url: '/spread/bankService',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.my-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    flex: none;
    width: calc(100% - 80px);
    font-size: 40px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 40px;
    margin-bottom: 25px;
  }

  .content {
    flex: none;
    width: calc(100% - 60px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 230px;
      height: 210px;
      img {
        display: flex;
        width: 230px;
        height: 210px;
      }
    }
  }
}
</style>
