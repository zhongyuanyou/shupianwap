# 项目中的 git 规范

## Git commit 日志基本规范

```
<type>(修复问题禅道的问题编号): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

例如：

fix(42689):修复 app 中切换站点，规划师查询区域未更新问题

**所有的 type 类型如下**

> type 代表某次提交的类型，比如是修复一个 bug 还是增加一个新的 feature。

- feat: 新增 feature
- fix: 修复 bug
- docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等
- style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
- refactor: 代码重构，没有加新功能或者修复 bug
- perf: 优化相关，比如提升性能、体验
- test: 测试用例，包括单元测试、集成测试等
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 回滚到上一个版本
- merge: 代码合并

> 参考： [如何规范你的 Git commit](https://zhuanlan.zhihu.com/p/182553920?utm_source=org.mozilla.firefox)

## Git 分支与版本发布规范

- 基本原则：master 为保护分支，不直接在 master 上进行代码修改和提交。
- 开发日常需求或者项目时，从 master 分支上 checkout 一个 feature 分支进行开发或者 bugfix 分支进行 bug 修复，功能测试完毕并且项目发布上线后，`将feature分支合并到主干master，并且打Tag发布，最后删除开发分支`。分支命名规范：
  - 分支版本命名规则：分支类型 _ 分支发布时间或开发人员的名字拼音首字母 _ 分支功能。比如：feat_20170401_fairyFlower, feat_pcd_plannerList 表示：功能分支，pucongde 建立的，功能
  - 分支类型包括：feat、 fix、refactor 三种类型，即新功能开发、bug 修复和代码重构
  - 时间使用年月日进行命名，不足 2 位补 0
  - 分支功能命名使用 lower camel case 命名法，即小驼峰命名。
- Tag 包括 3 位版本，前缀使用 v。比如 v1.2.31。Tag 命名规范：
  - 新功能开发使用第 2 位版本号，bug 修复使用第 3 位版本号
  - 核心基础库或者 Node 中间价可以在大版本发布请使用灰度版本号，在版本后面加上后缀，用中划线分隔。alpha 或者 belta 后面加上次数，即第几次 alpha：
    - v2.0.0-alpha.1
    - v2.0.0-belta.1
- 版本正式发布前需要生成 changelog 文档，然后再发布上线

## Git config 配置

git 提交姓名必须是中文的

可以通过下面方式配置

```bash

 git config --global user.name "your_name"
 git config --global user.email  "your_email"
 // 或者
 git config user.name "your_name"
 git config user.email "your_email"

```

例如：

```bash
 git config --global user.name "蒲聪德"
 git config --global user.email  "pucongde@dgg.cn"
```
