'use strict';
module.exports = _this => {
  const { ctx, service, app } = _this;
  // 定义参数校验规则
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
  // 参数校验未通过
  if (valiErrors) {
    ctx.helper.fail({ ctx, code: 422, res: valiErrors });
    return;
  }
};
