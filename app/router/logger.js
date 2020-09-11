'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/logger', controller.logger.list);
};
