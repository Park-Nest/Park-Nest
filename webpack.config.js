const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './client/src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        },
        {
            test: /\.s?[ac]ss$/,
            use: [
             'style-loader', 'css-loader', 'sass-loader'
            ],
          },
          {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
              limit: 10000
            }
        },
        {
            test: /\.m?js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'index.html'
        })
    ],
    devServer: {
        static: {
            publicPath: '/build',
            directory: path.resolve(__dirname, 'build'),
       },
       proxy: {
        '/home/**': {
            target: 'http://localhost:3000/',
            secure: false,
        } 
       },
       historyApiFallback: true
    },
}