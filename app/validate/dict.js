'use strict';
module.exports = {
  // 单条数据字典查询校验规则
  queryCmsCode(_this) {
    const { ctx, app } = _this;
    const rules = {
      code: { type: 'string', required: true },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
  // 多条数据字典查询校验规则
  queryCmsCodes(_this) {
    const { ctx, app } = _this;
    const rules = {
      codes: {
        type: 'string',
        required: true,
      },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
  // 查询数据字典深度查询校验规则
  queryCmsCodeTier(_this) {
    const { ctx, app } = _this;
    const rules = {
      code: {
        type: 'string',
        required: true,
      },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
};
