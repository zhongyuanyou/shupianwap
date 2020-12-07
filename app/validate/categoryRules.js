'use strict';
module.exports = {
  getCategoryDetailValidate(_this) {
    const { ctx, app } = _this;
    const rules = {
      code: { type: 'string', required: false },
      id: { type: 'string', required: false },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors
  }
}
