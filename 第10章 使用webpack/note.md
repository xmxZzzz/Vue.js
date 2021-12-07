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
- 执行 `npm run dev`

- 当在*main.js*文件中添加语句`document.getElementById("app").innerHTML = "Hello webpack.";`后，浏览器自动刷新，即通过建立一个**WebSocket**连接来实时响应代码的修改。

**插件Plugins**

- 当项目很大样式就会很多，都放在JS里太占体积，还不能做缓存，因此需要用到**插件Plugins**。

- 使用**extract-text-webpack-plugin**插件将散落在各地的css提取出来，并生成main.css文件，最终在index.html中通过`<link>`的形式加载它。

  - `npm install extract-text-webpack-plugin@2.1.2 --save-dev`

  - 在webpack.config.js配置文件中导入插件，并改写loader的配置

    ```js
    //导入插件
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    
    var config = {
     	//...
        module: {
            rules: [
                {
                    test: /\.css/,
                    // use: [
                    //     'style-loader',
                    //     'css-loader'
                    // ]
                    //利用插件改写use
                    use: ExtractTextPlugin.extract({
                        use: 'css-loader',
                        fallback: 'style-loader'
                    })
                }
            ]
        },
        plugins: [
            //重命名提取后的css文件
            new ExtractTextPlugin('main.css')
        ]
    };
    
    module.exports = config;
    ```

  - 在index.html中通过`<link>`标签引入

    ```html
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>webpack app</title>
        <link rel="stylesheet" type="text/css" href="/dist/main.css">
    </head>
    ```

  - 结果：`<link>`引入的main.css文件替换`<style>`

  