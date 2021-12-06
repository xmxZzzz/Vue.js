# JavaScript应用程序的模块打包工具webpack
------------------------------------------
## 10.1 前端工程化与webpack
### 前端自动化（半自动化）工程主要解决以下问题
- JavaScript、CSS代码的合并和压缩
- CSS预处理：Less、Sass、Stylus的编译
- 生成雪碧图(CSS Sprite)
- ES6 转 ES5
-  模块化
- ...
### export和import
- 用来导出和导入模块。
- 一个模块就是一个js文件，它拥有独立的作用域，里面定义的变量外部是无法获取的。
### export default
- 当用户不想去了解名称是什么，指示把模块的功能拿来使用，或者想自定义名称，可以使用`export default`来输出默认的模块
### 使用**npm**安装的库，在webpack中可以直接导入
```js
import Vue from 'vue';
import $ from 'jquery';
```
------------------------------------------
## 10.2 webpack基础配置
## 安装webpack与wabpack-dev-server
### 步骤
- 新建目录demo

- npm init 
    执行包含一系列选项，最终获得一个package.json文件

- 本地局部安装webpack

    `npm install webpack --save-dev`

- 本地局部安装webpack-dev-server

    `npm install webpack-dev-server --save-dev`

### 配置

- 新建**webpack.config.js**文件

```js
var config = {

};

// 相当于export default config;
// 但因为还未安装支持ES6的编译插件，所以不能直接使用ES6的语法
module.exports = config;
```

- 在package.json文件中配置快速启动webpack-dev-server服务的脚本

```js
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --host 172.172.172.1 ---port 8888 --open --config webpack.config.js"
    },
```

其中，

- `--config`：指向*webpack-dev-server*读取的配置文件路径，即*webpack.config.js*的路径
- `--open`：在执行命令时自动在浏览器打开页面，默认地址是 **127.0.0.1:8080**。
- `--host`：配置IP
- `--port`：配置端口

### **入口（Entry）和出口（Output）**

- 入口：告诉webpack从哪里开始寻找依赖，并且编译
- 出口：用来配置编译后的文件存储位置和文件名

```js
var path = require('path');

var config = {
    //入口
    entry: {
        main: './main.js'
    },
    //出口
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    }
};

// 相当于export default config;
// 但因为还未安装支持ES6的编译插件，所以不能直接使用ES6的语法
module.exports = config;
```

    