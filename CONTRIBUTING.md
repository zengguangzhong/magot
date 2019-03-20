# 贡献代码

想要给 Magot 贡献自己的一份力量？

我们写了一份贡献指南来帮助你开始。

## 环境要求

- [Node.js](https://nodejs.org/en/) >= v10.0.0
- [Yarn](https://yarnpkg.com/en/) >= v1.2.0
- [Git](https://git-scm.com/) >= v1.7.0

## 技能要求

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Less](http://lesscss.org/)
- [Webpack](https://webpack.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Jest](https://jestjs.io/)
- [Git](https://git-scm.com/)

## 分支管理

我们长期维护两个分支： `master` 和 `feature`。如果你要修一个 bug，那么请发 pull request 到 master；如果你要提一个增加新功能的 pull request，那么请基于 feature 分支来做。

## Pull Request

**在你发送 Pull Request 之前**，请确认你是按照下面的步骤来做的：

- clone 了 [Magot](https://github.com/billjs/magot) 仓库。
- 在项目根目录运行了 `yarn install`。
- 修复 bug 或者新增功能，请确保写了相应的单元测试用例，这很重要。
- 确认所有单元测试用例都是跑通 `yarn test` 了的。
- 运行 `yarn test -u` 来更新 `jest snapshot`，并且把这些更新也提交上来（如果有的话）。
- 确保你的代码通过了 `yarn lint` 检查。 此步会在你 `git commit` 的时候自动运行。
- 编写`docz`文档。

## 开发流程

在你 clone 了 Magot 的代码之后，并且使用 `yarn install` 安装完依赖后，你还可以运行下面几个常用的命令：

- `yarn start` 在本地启动开发环境，将会自动打开浏览器，[http://localhost:36500/](http://localhost:36500/)。
- `yarn lint` 检查代码风格，包括脚本和样式代码。
- `yarn test` 执行单元测试用例。
- `yarn fix` 自动修复有风格问题的代码。
- `yarn compile` 编译 TypeScript 代码到 `lib` 和 `es` 目录。
- `yarn build` 构建`es` `lib`和`release`包。
- `yarn docz:dev` 生成本地`docz`文档，开发时查看。
- `yarn docz:build` 生成可部署生产环境的`docz`文档。
- `yarn create:component` 创建一个新的组件，形如：`yarn create:component Button`。
- `yearn create:test` 创建一个新的单元测试用例，形如：`yarn create:test Button`。

## 代码风格

我们使用 [Prettier](https://prettier.io/) 来格式化代码，保证统一的代码风格，这一点很重要。

你可以运行 `yarn lint:prettier` 来检查代码风格是否一致，若有不一致的问题，可以运行`yarn fix:prettier`自动修复。
