<template>
  <div class="m-known-share svlike">
    <div class="like">猜你喜欢</div>
    <div v-if="mVlist.length > 0" class="video-list">
      <div
        v-for="(item, index) in mVlist"
        :key="index"
        class="item"
        @click="myOpenApp(item)"
      >
        <sp-image
          class="image"
          width="3.72rem"
          height="6.61rem"
          fit="cover"
          :src="item.image"
        />
        <div class="content">
          <div class="count">{{ item.custTotalCount }}次观看</div>
          <div class="tile">{{ item.videoName }}</div>
        </div>
      </div>
    </div>
    <div class="placeholder"></div>
    <sp-center-popup
      v-model="showPop"
      button-type="confirm"
      :field="Field"
      @confirm="openAppConfirm"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
import openappV2 from '@/mixins/openappV2'
import knownApi from '@/api/known'
import { numChangeW, deepCopy } from '@/utils/common'

export default {
  name: 'KnownSmallVideoLike',
  components: {
    [Image.name]: Image,
  },
  mixins: [openappV2],
  props: {
    categoryId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      mVlist: [],
      apiLock: false,
      prefixPath: 'cpsccustomer://',
      iosPath: {
        path: 'CPSCustomer:CPSCustomer/CPSCVideoCommonDetailViewController///push/animation',
        parameter: {
          selectedIndex: 1,
          type: '7', // 小视频
          id: '',
        },
      },
      androdPath: {
        path: '/main/android/main',
        parameter: {
          selectedIndex: 1,
          isLogin: '0',
          secondLink: '/savvy/chips/small_video_details',
          id: '',
        },
      },
    }
  },
  watch: {
    categoryId() {
      this.getVideoApi()
    },
  },
  mounted() {
    if (this.categoryId !== '' && !this.apiLock) {
      this.getVideoApi()
    }
  },
  methods: {
    // 查询视频信息
    getVideoApi() {
      this.apiLock = true
      const params = {
        // categoryIds: [this.categoryId],
        originalVideoType: 2, // 小视频
      }
      this.$axios
        .post(knownApi.video.videoList, params)
        .then((res) => {
          if (res.code !== 200) {
            throw new Error('查询视频失败')
          }
          this.buildVLikeList(res.data)
        })

        .catch((e) => {
          this.$xToast.error(e.message)
        })
    },
    buildVLikeList(data) {
      if (data.rows.length > 0) {
        // 这里注意,按照需求取 <= 4条(总共4条)
        this.mVlist = data.rows.filter((item, index) => {
          return index < 4
        })
        // 重新处理观看数
        this.mVlist.forEach((item) => {
          item.custTotalCount = numChangeW(item.totalViewCount)
        })
      }
    },
    myOpenApp(item) {
      // 构建传参数
      const tempIos = deepCopy({}, this.iosPath)
      tempIos.parameter.id = item.id
      const iosPathFinally = this.prefixPath + JSON.stringify(tempIos)
      const tempAndrod = deepCopy({}, this.androdPath)
      tempAndrod.parameter.id = item.id
      const androdPathFinally = this.prefixPath + JSON.stringify(tempAndrod)
      this.confirm(iosPathFinally, androdPathFinally)
    },
  },
}
</script>

<style lang="less" scoped>
.m-known-share.svlike {
  .like {
    height: 128px;
    text-align: center;
    font: bold 32px/128px @fontf-pfsc-med;
    color: #fff;
  }
  .video-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      border: 1px #1a1a1a solid;
      width: 50%;
      height: 661px;
      ::v-deep .sp-image__img {
        border: none;
        border-radius: 4px;
      }
      .content {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        font-family: @fontf-pfsc-med;
        font-weight: bold;
        color: #fff;
        width: 100%;
        bottom: 16px;
        left: 0;
        right: 0;
        .count {
          font-size: 24px;
          opacity: 0.8;
          margin-bottom: 8px;
        }
        .tile {
          font-size: 36px;
          .textOverflow(2);
        }
      }
    }
  }
  .placeholder {
    height: 64px;
    width: 100%;
  }
}
</style>
