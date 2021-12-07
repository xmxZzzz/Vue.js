var path = require('path');
//导入插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    },
    //配置加载器Loader
    //增加对.css文件的处理
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

// 相当于export default config;
// 但因为还未安装支持ES6的编译插件，所以不能直接使用ES6的语法
module.exports = config;