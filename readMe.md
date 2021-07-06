* 配置eslint设置支持顶层await
  ``` javascript
  1. yarn add eslint eslint-loader -D
  2. ./node_modules/.bin/eslint --init
  3. 配置.eslintrc.js 新增
  parser: '@babel/eslint-parser',
  ```