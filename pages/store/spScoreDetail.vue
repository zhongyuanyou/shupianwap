<template>
    <div class="spScoreDetail">
        <div class="head">
            <Header title="薯片分">
                <template #left>
                    <sp-icon
                        class-prefix="spiconfont"
                        name="nav_ic_back"
                        size="0.4rem"
                        color="#fff"
                        style="margin-left: 0.32rem"
                        @click.native="onClickLeft"
                    />
                    <sp-icon
                        class-prefix="spiconfont"
                        name="guanbi"
                        size="0.4rem"
                        color="#fff"
                        style="margin-left: 0.36rem"
                        @click.native="onClickLeft"
                    />
                </template>
                <template #right>
                    <sp-icon
                        class-prefix="spiconfont"
                        class="head__icon-share"
                        name="fenxiang"
                        size="0.4rem"
                        color="#fff"
                        style="margin-right: 0.4rem"
                        @click.native="onClickRight"
                    />
                </template>
            </Header>
        </div>
        <div class="bgImg"></div>
        <div class="body">
            <div class="title">
                <p>700</p>
                <span>超过90%规划师</span>
            </div>
            <div class="echart">
                <div id="main"></div>
                <p>
                    <i class="spiconfont spiconfont-tixing"></i>
                    <span>各项指标对比同行</span>
                </p>
            </div>
            <div class="instructions">
                <p>薯片分说明</p>
                <p>薯片分是对规划师的综合衡量，薯片分越高综合表现越好。</p>
            </div>
            <div class="indicators">
                <p>指标说明</p>
                <ul>
                    <li>
                        <img src="https://cdn.shupian.cn/sp-pt/wap/images/7cplhsqg1q00000.png" alt="">
                        <div>
                            <p>平台合作</p>
                            <p>这是合作描述,文字20个字以内，简洁说明</p>
                        </div>
                    </li>
                    <li>
                        <img src="https://cdn.shupian.cn/sp-pt/wap/images/222y62jq9lk0000.png" alt="">
                        <div>
                            <p>平台合作</p>
                            <p>这是合作描述,文字20个字以内，简洁说明</p>
                        </div>
                    </li>
                    <li>
                        <img src="https://cdn.shupian.cn/sp-pt/wap/images/9aminwo3dw40000.png" alt="">
                        <div>
                            <p>平台合作</p>
                            <p>这是合作描述,文字20个字以内，简洁说明</p>
                        </div>
                    </li>
                    <li>
                        <img src="https://cdn.shupian.cn/sp-pt/wap/images/ftslpczzdxc0000.png" alt="">
                        <div>
                            <p>平台合作</p>
                            <p>这是合作描述,文字20个字以内，简洁说明</p>
                        </div>
                    </li>
                    <li>
                        <img src="https://cdn.shupian.cn/sp-pt/wap/images/8g8haqpyceg0000.png" alt="">
                        <div>
                            <p>平台合作</p>
                            <p>这是合作描述,文字20个字以内，简洁说明</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {
    RadarChart
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    TitleComponent,
    LegendComponent
} from 'echarts/components';
 // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
    CanvasRenderer
} from 'echarts/renderers';
import { 
    Bottombar,
    BottombarButton,
    Icon,
} from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
    components: {
        [Icon.name]: Icon,
        [Bottombar.name]: Bottombar,
        [BottombarButton.name]: BottombarButton,
        Header,
    },
    data(){
        return{
            EchartOptions:{
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                        offset: 0, color: 'rgba(73, 116, 245, 0.65)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(73, 116, 245, 0.65)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                toolbox:{
                    feature:{
                        dataView:{
                            backgroundColor:"#000"
                        }
                    }
                },
                textStyle:{
                    fontFamily: "PingFangSC-Medium",
                    fontSize: "14px",
                    color: "#222222",
                    fontWeight:"bold"
                },
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: '基础素质', max: 100},
                        { name: '行业影响', max: 100},
                        { name: '平台参与度', max: 100},
                        { name: '质量评价', max: 100},
                        { name: '平台合作', max: 100}
                    ],
                    
                },
                series: [
                    {
                        name: '薯片分',
                        type: 'radar',
                        data: [
                            {
                                value: [50, 60, 70, 80, 90, 100],
                                name: '薯片分',
                                areaStyle: {
                                    color: new echarts.graphic.RadialGradient(0.1, 0.9, 1, [
                                        {
                                            color: 'rgba(73, 116, 245, 1)',
                                            offset: 0
                                        },
                                        {
                                            color: 'rgba(73, 116, 245, 1)',
                                            offset: 0.5
                                        },
                                        {
                                            color: 'rgba(148, 173, 247, 1)',
                                            offset: 1
                                        }
                                    ])
                                },
                                lineStyle: {
                                    width:2,
                                    type: 'solid'
                                },
                                label: {
                                    position: "top",
                                }
                            }
                        ]
                    }
                ]
            }
        }
    },
    mounted(){
        this.EchartInit()
    },
    methods:{
        EchartInit(){
             // 注册必须的组件
            echarts.use(
                [TitleComponent, LegendComponent, RadarChart, CanvasRenderer]
            );
            // 接下来的使用就跟之前一样，初始化图表，设置配置项
            const main = document.getElementById('main')
            
            const myChart = echarts.init(main);
            myChart.setOption(this.EchartOptions);
        }
    },
    

}
</script>
<style lang="less" scoped>
.spScoreDetail{
    background:#F8F8F8;
    .head{
        ::v-deep .my-head{
            background:url('https://cdn.shupian.cn/sp-pt/wap/images/5wdaynyoovs0000.png') no-repeat;
            color:#fff;
            .title{
              color:#fff;  
            }
        }
    }
    .bgImg{
        position: relative;
        width: 100%;
        height: 621px;
        background:url('https://cdn.shupian.cn/sp-pt/wap/images/5wdaynyoovs0000.png') no-repeat;
        background-size: 100% 100%;
        z-index: 1;
    }
    .body{
        position: relative;
        margin:-560px 0 0 0;
        padding:0 20px;
        z-index:2;
        >div{
            margin:0 0 20px 0
        }
        .title{
            margin:0 0 66px 0;
            text-align: center;
            p{
                font-family: Bebas;
                font-size: 74px;
                color: #FFFFFF;
                letter-spacing: 2px;
                line-height: 80px;
                text-shadow: 0 2px 12px rgba(35,76,202,0.40);
            }
            span{
                position: relative;
                display: inline-block;
                width: 320px;
                height: 65px;
                line-height:65px;
                background: rgba(255,255,255,0.2);
                border-radius: 50px;
                font-family: PingFangSC-Regular;
                font-size: 28px;
                color: #FFFFFF;
                letter-spacing: 1px;
                &::before{
                    content: '';
                    width: 0;
                    height: 0;
                    border: 10px solid;
                    position: absolute;
                    top: -20px;
                    left: 140px;
                    border-color: transparent  transparent  rgba(255,255,255,0.2) transparent;
                }
            }
        }
        .echart{
            position: relative;
            width: 100%;
            height: 525px;
            background: #FFFFFF;
            border-radius: 24px;
            font-family: PingFangSC-Regular;
            font-size: 22px;
            color: #999999;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
            #main{
                position: absolute;
                top:47px;
                left:0;
                right:0;
                margin:0 auto;
                width: 100%;
                height: 400px;
            }
            p{
                position: absolute;
                left:0;
                right:0;
                bottom: 48px;
                margin:0 auto;
            }
        }
        .instructions{
            width: 100%;
            padding:32px;
            background: #FFFFFF;
            border-radius: 24px;
            font-family: PingFangSC-Regular;
            font-size: 22px;
            p{
                &:first-of-type{
                    margin:0 0 18px 0;
                    font-family: PingFangSC-Medium;
                    font-size: 32px;
                    color: #222222;
                    line-height: 32px;
                    font-weight: bold;
                }
                &:last-of-type{
                    font-family: PingFangSC-Regular;
                    font-size: 28px;
                    color: #555555;
                    letter-spacing: 0;
                    line-height: 40px;
                }
            }
        }
        .indicators{
            width: 100%;
            padding:32px;
            background: #FFFFFF;
            border-radius: 24px;
            font-family: PingFangSC-Regular;
            font-size: 22px;
            >p{
                margin:0 0 12px 0;
                font-family: PingFangSC-Medium;
                font-size: 32px;
                color: #222222;
                line-height: 32px;
                font-weight: bold;  
            }
            ul{
                li{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding:24px 0;
                    border-bottom: 1px solid #f2f2f2;
                    img{
                        width: 80px;
                        height: 80px;
                        margin:0 32px 0 0;
                        background: #F2F5FF;
                        border-radius: 8px;
                    }
                    p{
                        &:first-of-type{
                            margin:0 0 6px 0;
                            font-family: PingFangSC-Medium;
                            font-weight: bold;
                            font-size: 30px;
                            color: #222222;
                            line-height: 38px;
                        }
                        &:last-of-type{
                            font-family: PingFangSC-Regular;
                            font-size: 24px;
                            color: #999999;
                            letter-spacing: 0;
                            line-height: 36px;
                        }
                    }
                }
            }
        }
    }
}
</style>