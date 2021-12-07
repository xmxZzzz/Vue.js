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
                test: /\.vue/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: '/\.js/',
                loader: 'babel-loader',
                exclude: /node-modules/
            },
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
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024' //如果文件小于1kb,则不会生成一个文件
            }
        ]
    },
    plugins: [
        //重命名提取后的css文件
        new ExtractTextPlugin('main.css'),
    ]
};

// 相当于export default config;
// 但因为还未安装支持ES6的编译插件，所以不能直接使用ES6的语法
module.exports = config;