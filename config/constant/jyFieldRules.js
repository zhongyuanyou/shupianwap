module.exports = {
  RULES: {
    // 公司
    'FL20201207080003': [
      'company_industry',
      'taxpayer_type',
      'registered_capital',
      'registration_time'
    ], // 行业、纳税类型、注册资本、注册时间
    // 专利
    'FL20201202065055': [
      'patent_type',
      'patent_industry',
      'patent_status'
    ], //  专利类型、专利行业 状态
    // 商标
    'FL20201202065056': [
      'trademark_type',
      'patent_industry',
      'patent_status'
    ], //商标分类、组合类型
    // 资质
    'FL20201202065054': [
      'qualification_registration_area',
      'qualification_expire_date',
      'safety_production_license',
      'qualification_registered_capital'
    ], // 区域、到期时间、安许证  注册资本
  }
}
