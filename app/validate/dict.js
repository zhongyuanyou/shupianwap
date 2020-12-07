'use strict';
module.exports = {
  // 单条数据字典查询校验规则
  queryCmsCode: {
    code: { type: 'string', required: true },
  },
  // 多条数据字典查询校验规则
  queryCmsCodes: {
    codes: { type: 'string', required: true },
  },
};
