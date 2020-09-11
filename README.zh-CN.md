<div style="text-align:center">
	<img src="docs/assets/egg-banner.png" />
</div>

[![NPM version](https://img.shields.io/npm/v/egg.svg?style=flat-square)](https://npmjs.org/package/egg)
[![NPM quality](http://npm.packagequality.com/shield/egg.svg?style=flat-square)](http://packagequality.com/#?package=egg)
[![NPM download](https://img.shields.io/npm/dm/egg.svg?style=flat-square)](https://npmjs.org/package/egg)

[![Continuous Integration](https://github.com/eggjs/egg/workflows/Continuous%20integration/badge.svg)](https://github.com/eggjs/egg/actions?query=branch%3Amaster)
[![Test coverage](https://img.shields.io/codecov/c/github/eggjs/egg.svg?style=flat-square)](https://codecov.io/gh/eggjs/egg)
[![Known Vulnerabilities](https://snyk.io/test/npm/egg/badge.svg?style=flat-square)](https://snyk.io/test/npm/egg)
[![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/eggjs?style=flat-square)](https://opencollective.com/eggjs)

## 特性

- 内置多进程管理
- 高度可扩展的插件机制
- 深度框架定制
- 丰富的[插件](https://github.com/search?q=topic%3Aegg-plugin&type=Repositories)

> 支持 Node.js 8.x 及以上版本。

## 快速开始

<!-- add docs here for user -->

查看 [Egg 文档][egg] 更多细节.

### 运行测试环境

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 正式环境部署

```bash
$ npm start
$ npm stop
```

### npm scripts

- 使用 `npm run lint` 进行代码风格检查.
- 使用 `npm test` 进行单元测试.
- 使用 `npm run autod` 自动检测依赖项升级
                     
, 查看关于 [autod](https://www.npmjs.com/package/autod) 更多详情.


[egg]: https://eggjs.org