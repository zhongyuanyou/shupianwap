'use strict';
// 产品详情数据 推广页1期模拟数据
const res = {
  code: 200,
  message: '操作成功',
  data: [
    {
      id: 'extendBankServer1',
      name: '基本开户',
      referencePrice: 600, // 参考价格（元）
      operating: {
        showName: '基本开户', // 前端展示名称
        slogan: '', // 广告语
        productDescribe: '企事业单位进行日常转账结算和现金收付的主板账户', // 产品说明
        actualViews: 1402, // 实际浏览量、在线咨询
        defaultSales: 992, // 基础销量、累计成交
        actualSales: 992, // 实际销量、成功案例
      },
    },
    {
      id: 'extendBankServer2',
      name: '一般户开户',
      referencePrice: 600, // 参考价格（元）
      operating: {
        showName: '一般户开户', // 前端展示名称
        slogan: '', // 广告语
        productDescribe: '只能办理转账结算和现金存缴，不能支取现金', // 产品说明
        defaultSales: 632, // 基础销量
        actualSales: 421, // 实际销量
        actualViews: 416, // 实际浏览量
      },
    },
    {
      id: 'extendBankServer3',
      name: '银行销户',
      referencePrice: 800, // 参考价格（元）
      operating: {
        showName: '一般户开户', // 前端展示名称
        slogan: '', // 广告语
        productDescribe: '不再使用银行提供的服务，对账户信息进行删除销毁处理', // 产品说明
        defaultSales: 152, // 基础销量
        actualSales: 108, // 实际销量
        actualViews: 108, // 实际浏览量
      },
    },
    {
      id: 'extendBussineWithdraw1', // 工商注销服务
      name: '公司注销',
      referencePrice: 2500, // 参考价格（元）
      operating: {
        showName: '公司注销', // 前端展示名称
        slogan: '当公司不经营时申请注销，终止公司法人资格。', // 广告语
        productDescribe: '当公司不经营时申请注销，终止公司法人资格。', // 产品说明
        actualViews: 484, // 实际浏览量、在线咨询
        defaultSales: 302, // 基础销量
        actualSales: 293, // 实际销量
      },
    },
    {
      id: 'extendBussineWithdraw2', // 工商注销服务
      name: '工商注销',
      referencePrice: 1000, // 参考价格（元）
      operating: {
        showName: '工商注销', // 前端展示名称
        slogan: '企业税务或税务已清税的情况下的营业执照注销。', // 广告语
        productDescribe: '企业税务或税务已清税的情况下的营业执照注销。', // 产品说明
        actualViews: 370, // 实际浏览量
        defaultSales: 296, // 基础销量
        actualSales: 290, // 实际销量
      },
    },
    {
      id: 'extendBussineWithdraw3', // 工商注销服务
      name: '简易注销',
      referencePrice: 998, // 参考价格（元）
      operating: {
        showName: '简易注销', // 前端展示名称
        slogan: '企业无经营活动，无债权债务的企业注销。', // 广告语
        productDescribe: '企业无经营活动，无债权债务的企业注销。', // 产品说明
        actualViews: 135, // 实际浏览量
        defaultSales: 107, // 基础销量
        actualSales: 102, // 实际销量
      },
    },
    {
      id: 'extendBussineWithdraw4', // 工商注销服务
      name: '个体注销',
      referencePrice: 2000, // 参考价格（元）
      operating: {
        showName: '简易注销', // 前端展示名称
        slogan: '企业无经营活动，无债权债务的企业注销。', // 广告语
        productDescribe: '企业无经营活动，无债权债务的企业注销。', // 产品说明
        actualViews: 135, // 实际浏览量
        defaultSales: 107, // 基础销量
        actualSales: 102, // 实际销量
      },
    },
    {
      id: 'extendSealEngraving1', // 印章
      name: '公章',
      referencePrice: 230, // 参考价格（元）
      operating: {
        showName: '公章', // 前端展示名称
        slogan: '公司对外事务时需要加盖', // 广告语
        productDescribe: '公司对外事务时需要加盖', // 产品说明
        actualViews: 1802, // 实际浏览量
        defaultSales: 1454, // 基础销量
        actualSales: 1450, // 实际销量
      },
    },
    {
      id: 'extendSealEngraving2', // 印章
      name: '法人章',
      referencePrice: 120,
      operating: {
        showName: '法人章',
        slogan: '一般用于银行预留印鉴或者代替法人签名',
        productDescribe: '一般用于银行预留印鉴或者代替法人签名',
        actualViews: 1783,
        defaultSales: 1302,
        actualSales: 1298,
      },
    },
    {
      id: 'extendSealEngraving3',
      name: '',
      referencePrice: 230,
      operating: {
        showName: '财务章',
        slogan: '一般用于银行预留印鉴或者代替法人签名',
        productDescribe: '一般用于银行预留印鉴或者代替法人签名',
        actualViews: 1783,
        defaultSales: 1302,
        actualSales: 1298,
      },
    },
    {
      id: 'extendSealEngraving4',
      name: '',
      referencePrice: 230,
      operating: {
        showName: '发票章',
        slogan: '购买和开具发票时须加盖此章',
        productDescribe: '购买和开具发票时须加盖此章',
        actualViews: 1783,
        defaultSales: 1302,
        actualSales: 1298,
      },
    },
    {
      id: 'extendSealEngraving5',
      name: '',
      referencePrice: 230,
      operating: {
        showName: '合同章',
        slogan: '单位对外签订合同时使用',
        productDescribe: '',
        actualViews: 1583,
        defaultSales: 1142,
        actualSales: 1140,
      },
    },
    {
      id: 'extendSealEngraving6',
      name: '',
      referencePrice: 230,
      operating: {
        showName: '遗失补办印章',
        slogan: '印章遗失后进行补办',
        productDescribe: '',
        actualViews: 789,
        defaultSales: 780,
        actualSales: 780,
      },
    },
    {
      id: 'extendTaxPlanning1', // 税务筹划
      name: '增值税筹划',
      referencePrice: 500,
      operating: {
        showName: '增值税筹划',
        slogan: '增值税即征即退',
        productDescribe: '增值税即征即退',
        actualViews: 2720,
        defaultSales: 2042,
        actualSales: 2039,
      },
    },
    {
      id: 'extendTaxPlanning2',
      name: '企业所得税筹划',
      referencePrice: 500,
      operating: {
        showName: '企业所得税筹划',
        slogan: '计算全年应纳税所得额和应纳所得税，确定应补、退税额',
        productDescribe: '计算全年应纳税所得额和应纳所得税，确定应补、退税额',
        actualViews: 1241,
        defaultSales: 847,
        actualSales: 847,
      },
    },
    {
      id: 'extendTaxPlanning3',
      name: '个人所得税筹划',
      referencePrice: 500,
      operating: {
        showName: '个人所得税筹划',
        slogan: '计算全年应纳税所得额和应纳所得税，确定应补、退税额',
        productDescribe: '计算全年应纳税所得额和应纳所得税，确定应补、退税额',
        actualViews: 257,
        defaultSales: 182,
        actualSales: 180,
      },
    },
    {
      id: 'extendSysAuth1', // 体系认证
      name: 'ISO9001质量管理体系',
      referencePrice: 8000,
      operating: {
        showName: 'ISO9001质量管理体系',
        slogan: '证明管理系统整合上已达到了国际标准',
        productDescribe: '证明管理系统整合上已达到了国际标准',
        actualViews: 299,
        defaultSales: 136,
        actualSales: 130,
      },
    },
    {
      id: 'extendSysAuth2',
      name: 'ISO14001 环境管理体系',
      referencePrice: 8000,
      operating: {
        showName: 'ISO14001 环境管理体系',
        slogan: '制定实施环境方针，并管理其环境因素',
        productDescribe: '制定实施环境方针，并管理其环境因素',
        actualViews: 138,
        defaultSales: 76,
        actualSales: 70,
      },
    },
    {
      id: 'extendSysAuth3',
      name: 'ISO50430 工程建设施工管理体系',
      referencePrice: 12000,
      operating: {
        showName: 'ISO50430 工程建设施工管理体系',
        slogan: '证明建筑施工企业质量管理水平',
        productDescribe: '证明建筑施工企业质量管理水平',
        actualViews: 147,
        defaultSales: 99,
        actualSales: 96,
      },
    },
    {
      id: 'extendSysAuth4',
      name: '',
      referencePrice: 23000,
      operating: {
        showName: 'ISO27001 信息安全管理体系',
        slogan: '基于业务风险方法，建立、实施企业信息安全',
        productDescribe: '基于业务风险方法，建立、实施企业信息安全',
        actualViews: 147,
        defaultSales: 99,
        actualSales: 96,
      },
    },
    {
      id: 'extendSysAuth5',
      name: '',
      referencePrice: 8000,
      operating: {
        showName: 'ISO45001 职业健康安全管理体系',
        slogan: '供国家组织采用的职业安全卫生管理',
        productDescribe: '供国家组织采用的职业安全卫生管理',
        actualViews: 147,
        defaultSales: 99,
        actualSales: 96,
      },
    },
    {
      id: 'extendSysAuth6',
      name: '',
      referencePrice: 7000,
      operating: {
        showName: 'ISO13485 医疗器械质量管理体系',
        slogan: '以ISO9001:2000为基础的独立标准',
        productDescribe: '以ISO9001:2000为基础的独立标准',
        actualViews: 147,
        defaultSales: 99,
        actualSales: 96,
      },
    },
    {
      id: 'extendBussineReg1', // 工商注册
      name: '',
      referencePrice: 888,
      operating: {
        showName: '有限责任公司',
        slogan: '',
        productDescribe: '',
        actualViews: 6439,
        defaultSales: 4932,
        actualSales: 4930,
      },
    },
    {
      id: 'extendBussineReg2',
      name: '个体注册',
      referencePrice: 688,
      operating: {
        showName: '个体注册',
        slogan: '',
        productDescribe: '',
        actualViews: 3291,
        defaultSales: 1837,
        actualSales: 1832,
      },
    },
    {
      id: 'extendBussineReg3',
      name: '',
      referencePrice: 888,
      operating: {
        showName: '分公司注册',
        slogan: '',
        productDescribe: '',
        actualViews: 541,
        defaultSales: 393,
        actualSales: 387,
      },
    },
    {
      id: 'extendBussineReg4',
      name: '',
      referencePrice: 3000,
      operating: {
        showName: '外资企业注册',
        slogan: '',
        productDescribe: '',
        actualViews: 121,
        defaultSales: 92,
        actualSales: 84,
      },
    },
    {
      id: 'extendLicence1', // 许可证
      name: '',
      referencePrice: 1800,
      operating: {
        showName: '食品经营许可证',
        slogan: '从事食品销售和餐饮服务活动的都需要依法取得',
        productDescribe: '从事食品销售和餐饮服务活动的都需要依法取得',
        actualViews: 299,
        defaultSales: 256,
        actualSales: 249,
      },
    },
    {
      id: 'extendLicence2',
      name: '',
      referencePrice: 1800,
      operating: {
        showName: '食品生产许可证',
        slogan: '从事食品加工业务需要办理',
        productDescribe: '从事食品加工业务需要办理',
        actualViews: 167,
        defaultSales: 126,
        actualSales: 125,
      },
    },
    {
      id: 'extendLicence3',
      name: '',
      referencePrice: 25000,
      operating: {
        showName: '人力资源服务许可证',
        slogan: '经营性人力资源机构的需要办理',
        productDescribe: '经营性人力资源机构的需要办理',
        actualViews: 43,
        defaultSales: 36,
        actualSales: 36,
      },
    },
    {
      id: 'extendLicence4',
      name: '',
      referencePrice: 25000,
      operating: {
        showName: '劳务派遣许可证',
        slogan: '经营劳务派遣的公司需要办理',
        productDescribe: '经营劳务派遣的公司需要办理',
        actualViews: 39,
        defaultSales: 22,
        actualSales: 22,
      },
    },
    {
      id: 'extendLicence5',
      name: '',
      referencePrice: 28000,
      operating: {
        showName: '医疗器械经营许可证',
        slogan: '售卖医用电子设备等需要办理',
        productDescribe: '售卖医用电子设备等需要办理',
        actualViews: 83,
        defaultSales: 65,
        actualSales: 65,
      },
    },
    {
      id: 'extendLicence6',
      name: '',
      referencePrice: 12000,
      operating: {
        showName: '互联网药品信息服务许可证',
        slogan: '通过互联网提供药品信息等服务需要办理',
        productDescribe: '通过互联网提供药品信息等服务需要办理',
        actualViews: 26,
        defaultSales: 12,
        actualSales: 12,
      },
    },
    {
      id: 'extendBussineChange1', // 工商变更
      name: '',
      referencePrice: 488,
      operating: {
        showName: '公司名称变更',
        slogan: '因公司经营变化、业务拓展等原因需要变更公司名称',
        productDescribe: '因公司经营变化、业务拓展等原因需要变更公司名称',
        actualViews: 293,
        defaultSales: 203,
        actualSales: 203,
      },
    },
    {
      id: 'extendBussineChange2',
      name: '',
      referencePrice: 488,
      operating: {
        showName: '经营范围变更',
        slogan: '新增、变更营业执照经营范围',
        productDescribe: '新增、变更营业执照经营范围',
        actualViews: 284,
        defaultSales: 209,
        actualSales: 202,
      },
    },
    {
      id: 'extendBussineChange3',
      name: '',
      referencePrice: 488,
      operating: {
        showName: '股东变更',
        slogan: '因公司发展或策略调整，公司股东要更换',
        productDescribe: '因公司发展或策略调整，公司股东要更换',
        actualViews: 96,
        defaultSales: 66,
        actualSales: 63,
      },
    },
    {
      id: 'extendBussineChange4',
      name: '',
      referencePrice: 488,
      operating: {
        showName: '股权变更',
        slogan: '公司股东投资比例，股权结构变更',
        productDescribe: '公司股东投资比例，股权结构变更',
        actualViews: 53,
        defaultSales: 38,
        actualSales: 36,
      },
    },
    {
      id: 'extendBussineChange5',
      name: '',
      referencePrice: 488,
      operating: {
        showName: '认缴年限变更',
        slogan: '公司注册资金增加，公司规模扩大',
        productDescribe: '公司注册资金增加，公司规模扩大',
        actualViews: 173,
        defaultSales: 139,
        actualSales: 136,
      },
    },
    {
      id: 'extendBussineChange6',
      name: '',
      referencePrice: 488,
      operating: {
        showName: '同区地址变更',
        slogan: '同一城市同一区域内注册地址变更，不跨工商管理局',
        productDescribe: '同一城市同一区域内注册地址变更，不跨工商管理局',
        actualViews: 92,
        defaultSales: 61,
        actualSales: 61,
      },
    },
    {
      id: 'extendNetWorkQualifications1', // 互联网资质
      name: '',
      referencePrice: 10000,
      operating: {
        showName: 'ICP许可证',
        slogan: '线上交易网站需办',
        productDescribe: '线上交易网站需办',
        actualViews: 129,
        defaultSales: 86,
        actualSales: 82,
      },
    },
    {
      id: 'extendNetWorkQualifications2', // 互联网资质
      name: '',
      referencePrice: 10000,
      operating: {
        showName: '互联网交易处理...',
        slogan: '线上交易网站需办',
        productDescribe: '线上交易网站需办',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendNetWorkQualifications3', // 互联网资质
      name: '',
      referencePrice: 10000,
      operating: {
        showName: 'IDC许可证',
        slogan: '开展数据中心业...',
        productDescribe: '开展数据中心业...',
        actualViews: 129,
        defaultSales: 86,
        actualSales: 82,
      },
    },
    {
      id: 'extendNetWorkQualifications4', // 互联网资质
      name: '',
      referencePrice: 15000,
      operating: {
        showName: 'ISP许可证',
        slogan: '互联网信息服务...',
        productDescribe: '互联网信息服务...',
        actualViews: 216,
        defaultSales: 152,
        actualSales: 147,
      },
    },
    {
      id: 'extendNetWorkQualifications5', // 互联网资质
      name: '',
      referencePrice: 12000,
      operating: {
        showName: 'SP许可证',
        slogan: '互联网信息服务...',
        productDescribe: '互联网信息服务...',
        actualViews: 62,
        defaultSales: 38,
        actualSales: 32,
      },
    },
    {
      id: 'extendNetWorkQualifications6', // 互联网资质
      name: '',
      referencePrice: 14000,
      operating: {
        showName: '网络文化经营许可证',
        slogan: '互联网信息服务...',
        productDescribe: '互联网信息服务...',
        actualViews: 93,
        defaultSales: 61,
        actualSales: 56,
      },
    },
    {
      id: 'extendNetWorkQualifications7', // 互联网资质
      name: '',
      referencePrice: 15000,
      operating: {
        showName: '增值电信业务经营许可证（ICP）',
        slogan: '线上交易网站需办',
        productDescribe: '线上交易网站需办',
        actualViews: 249,
        defaultSales: 203,
        actualSales: 197,
      },
    },
    {
      id: 'extendBussineHomeHot1', // 工商首页 热销专区
      name: '',
      referencePrice: 1800,
      operating: {
        showName: '食品经营许可证',
        slogan: '食品行业所需资质官方保障',
        productDescribe: '食品行业所需资质官方保障',
        actualViews: 299,
        defaultSales: 256,
        actualSales: 249,
      },
    },
    {
      id: 'extendBussineHomeHot2', // 工商首页 热销专区
      name: '',
      referencePrice: 488,
      operating: {
        showName: '经营范围变更',
        slogan: '资深团队 一步到位',
        productDescribe: '资深团队 一步到位',
        actualViews: 284,
        defaultSales: 209,
        actualSales: 202,
      },
    },
    {
      id: 'extendBussineHomeHot3', // 工商首页 热销专区
      name: '',
      referencePrice: 600,
      operating: {
        showName: '银行变更',
        slogan: '专业团队 省时高效',
        productDescribe: '专业团队 省时高效',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeHot4', // 工商首页 热销专区
      name: '',
      referencePrice: 1500,
      operating: {
        showName: '个体户代理记账',
        slogan: '全程监理 极速办理',
        productDescribe: '全程监理 极速办理',
        actualViews: 983,
        defaultSales: 642,
        actualSales: 642,
      },
    },
    {
      id: 'extendBussineHomeHot5', // 工商首页 热销专区
      name: '',
      referencePrice: null,
      operating: {
        showName: '企业核名',
        slogan: '极速办理 一步到位',
        productDescribe: '极速办理 一步到位',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeStart1', // 工商首页 初创必备
      name: '',
      referencePrice: 888,
      operating: {
        showName: '有限公司注册',
        slogan: '新手创业必备，专业平台，省心 更省钱',
        productDescribe: '新手创业必备，专业平台，省心 更省钱',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeStart2', // 工商首页 初创必备
      name: '',
      referencePrice: 580,
      operating: {
        showName: '印章服务',
        slogan: '极速出章，享终生免费售后',
        productDescribe: '极速出章，享终生免费售后',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeStart3', // 工商首页 初创必备
      name: '',
      referencePrice: 600,
      operating: {
        showName: '银行开户',
        slogan: '安全高效，服务快 捷无忧',
        productDescribe: '极速出章，享终生免费售后',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeStart4', // 工商首页 初创必备
      name: '',
      referencePrice: 688,
      operating: {
        showName: '无地址注册',
        slogan: '一站式服务，轻松 拿证',
        productDescribe: '一站式服务，轻松 拿证',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeStart5', // 工商首页 初创必备
      name: '',
      referencePrice: 0,
      operating: {
        showName: '定制代账方案',
        slogan: '资深会计服务，安 全放心',
        productDescribe: '资深会计服务，安 全放心',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeManage1', // 工商首页 经营必备
      name: '',
      referencePrice: 2000,
      operating: {
        showName: '合伙企业注册',
        slogan: '专业办理 安全高效',
        productDescribe: '专业办理 安全高效',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeManage2', // 工商首页 经营必备
      name: '',
      referencePrice: 3488,
      operating: {
        showName: '代理记账',
        slogan: '极速办理 官方保障',
        productDescribe: '极速办理 官方保障',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeManage3', // 工商首页 经营必备
      name: '',
      referencePrice: 3488,
      operating: {
        showName: '互联网资质',
        slogan: '专业 过审有保障',
        productDescribe: '专业 过审有保障',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeManage4', // 工商首页 经营必备
      name: '',
      referencePrice: 888,
      operating: {
        showName: '分公司注册',
        slogan: '官方直营 平台担保',
        productDescribe: '官方直营 平台担保',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeManage5', // 工商首页 经营必备
      name: '',
      referencePrice: 300,
      operating: {
        showName: '一般纳税人代理记账',
        slogan: '会计做账 口碑推荐',
        productDescribe: '会计做账 口碑推荐',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendBussineHomeManage6', // 工商首页 经营必备
      name: '',
      referencePrice: 200,
      operating: {
        showName: '年报公示',
        slogan: '性价比高 数据安全',
        productDescribe: '性价比高 数据安全',
        actualViews: 0,
        defaultSales: 0,
        actualSales: 0,
      },
    },
    {
      id: 'extendAccount1', // 代理记账
      name: '',
      referencePrice: 2288,
      operating: {
        showName: '小规模纳税人代理记账',
        slogan: '连续12个月应征增值税销售额未超过500万元',
        productDescribe: '连续12个月应征增值税销售额未超过500万元',
        actualViews: 7295,
        defaultSales: 5173,
        actualSales: 5173,
      },
    },
    {
      id: 'extendAccount2', // 代理记账
      name: '',
      referencePrice: 1500,
      operating: {
        showName: '个体户代理记账',
        slogan: '经营修理服务、加工、个体运输业、饮食业等的个体户',
        productDescribe: '经营修理服务、加工、个体运输业、饮食业等的个体户',
        actualViews: 983,
        defaultSales: 642,
        actualSales: 642,
      },
    },
    {
      id: 'extendAccount3', // 代理记账
      name: '',
      referencePrice: 5388,
      operating: {
        showName: '一般纳税人代理记账',
        slogan: '应税服务年销售额大于500万元',
        productDescribe: '应税服务年销售额大于500万元',
        actualViews: 1275,
        defaultSales: 937,
        actualSales: 937,
      },
    },
  ],
};
module.exports = res;
