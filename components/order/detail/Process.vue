<template >
  <div class="process">
    <div class="process_container">
      <div class="process_container_goods">
        <div class="goods_img">
          <sp-image src="" alt="" class="sp-image" srcset="" />
        </div>
        <div class="goods_info">
          <div class="goods_info_title">
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </div>
          <div class="goods_info_des">预计10天办理完成</div>
          <div class="goods_info_process">
            <div class="goods_info_process_line">
              <sp-progress
                color="#4974F5"
                stroke-width="0.08rem"
                :percentage="50"
                :show-pivot="false"
              />
            </div>
            <div class="goods_info_process_text">77%</div>
          </div>
        </div>
      </div>

      <div class="process_container_task"></div>
      <div class="process_container_close"></div>
    </div>
  </div>
</template>
<script>
import { Progress, Image } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
    [Progress.name]: Progress,
  },
}
</script>
<style  lang="less" scoped>
.process {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;

  .process_container {
    position: relative;
    width: 670px;
    height: 900px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 24px;
    padding: 40px 0;

    .process_container_goods {
      display: flex;
      overflow: hidden;
      padding: 0px 30px 40px 40px;

      border-bottom: 1px solid #f4f4f4;
      .goods_img {
        flex-shrink: 0;
        width: 120px;
        height: 120px;
        background: #e3e3e3;
        border-radius: 4px;
        overflow: hidden;
      }
      .goods_info {
        flex: 1;
        overflow: hidden;
        margin-left: 20px;
        font-size: 0;
        .goods_info_title {
          height: 50px;
          font-family: PingFangSC-Medium;
          font-size: 36px;
          color: #222222;
          margin-bottom: 8px;
          .mixin-text-oneoverflow();
        }
        .goods_info_des {
          display: inline-block;
          height: 32px;
          line-height: 32px;
          padding: 0 5px;
          background: #f2f5ff;
          border-radius: 4px;

          font-family: PingFangSC-Regular;
          font-size: 22px;
          color: #4974f5;

          transform-origin: left top;
          transform: scale(0.91);

          margin-bottom: 4px;
        }
        .goods_info_process {
          display: flex;
          align-items: center;
          .goods_info_process_line {
            flex: 1;
          }
          .goods_info_process_text {
            font-family: PingFangSC-Regular;
            font-size: 20px;
            color: #999999;
            letter-spacing: 0;
            text-align: right;
            margin-left: 22px;
            min-width: 50px;
            text-align: right;

            transform-origin: right center;
            transform: scale(0.83);
          }
        }
      }
    }
    .process_container_close {
      position: absolute;
      bottom: -124px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 64px;
      height: 64px;
      background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/9bb2036m4oo0000.png);
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>
