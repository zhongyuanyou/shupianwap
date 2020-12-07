'use strict';
module.exports = {
  getContentListValidate(_this) {
    const { ctx, app } = _this;
    const rules = {
      categoryCode: { type: 'string', required: false },
      categoryId: { type: 'string', required: false },
      keyword: { type: 'string', required: false },
      limit: { type: 'Number', required: false },
      page: { type: 'Number', required: false },
      platformCode: { type: 'string', required: false },
      terminalCode: { type: 'string', required: false },
      sortOrder: { type: 'string', required: false },
      type: { type: 'string', required: false },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
};
