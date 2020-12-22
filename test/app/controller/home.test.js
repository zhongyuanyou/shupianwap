'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('example/app/controller/home.example.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      // .expect('hi, egg') 因为加入了Nuxt.js,所以响应内容不再是'hi, egg'
      .expect(200);
  });
});
