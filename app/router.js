'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const { EggShell } = require('egg-shell-decorators');
const API_PREFIX = '/service';
module.exports = app => {
  app.router.prefix(API_PREFIX);
  EggShell(app);
};
