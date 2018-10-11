# vue-cli-framework

> A Vue.js  project

> 本项目基于vue-cli，以webpack为构建工具，过程中参考了一些平时遇到的比较好的设计思想，当然也会不断完善。

> 开发中基本涉及的技术点：vue（基本MVVM框架）、vue-router（路由管理）、vuex（复杂状态管理）、sass（css样式）、axios（ajax），其他模块和库陆续更新....

> 深入构建方面技术点：node、express、webpack系列

> 项目中充分贯彻了组件化开发思想，以组件为基本的开发单位，资源的组织围绕组件进行。


## Start

``` bash
# 安装依赖
npm install

# 测试服务器运行在 localhost:8080，支持热更新
npm run dev

# 打包产品版本，打包后的主要文件在dist目录。最终部署时，package.json和dist目录中的内容是必须的。此处可以根据需要进一步优化部署方式
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 构建并运行产品版本
npm start
```

## Folder

- build  --对vue-cli下的目录进行一定的修改

- config --vue-cli构建的目录
- dist --build构建目录，上线时，可以直接部署该目录资源
    - resources --构建好的前端资源
        - css
        - data --对于某些组件的配置json文件，可以把组件的一些配置设置到相应的json文件里，易于在线上进行直接修改，而无需重新打包发布
        - img
        - js
    - index.html --整个单页应用的入口html
- src --开发目录
    - assets --项目中使用的一些公共js，css样式，图片等的定义目录，推荐使用sass（scss）进行开发，资源引用时，以模块化方式引用。
    - components
    --组件目录
        - ImageBox --示例目录，对于包含复杂的逻辑或样式的，包含独有图片、视频、字体资源的，建议使用目录的形式来组织控件
            - Index.vue
            - 1.jpg
        - NavBar.vue --示例组件，简单组件直接写.vue文件即可
    - plugins --自定义插件和npm包插件的引入项目的位置
        - index.js 用于统一引入所有插件，可以导入npm包或本目录中自定义的插件
        - functions.js 对Vue prototype进行扩展方法的定义
        - mixins.js
        对vue进行全局混合的定义，当前定义了一个用于组件自动读取/static/data/*.json通过config属性指定的json文件来自动填充config数据配置
        - router --路由组织
        - static --无需webpack处理的静态资源的组织目录，构建时会拷贝到dist/resources中，项目代码中必须通通过'/resources/.../...'来访问
        - views --路由视图级别的组件，其中组件的组织方法跟components中基本一致