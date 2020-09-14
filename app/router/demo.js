'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/demo', controller.demo.list);
};
