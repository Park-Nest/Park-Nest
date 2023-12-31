const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const Dotenv = require('dotenv');

const env = Dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((acc, cv) => {
    acc[`process.env.${cv}`] = JSON.stringify(env[cv]);
    return acc;
}, {})

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
        }),
        new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
        static: {
            publicPath: '/build',
            directory: path.resolve(__dirname, 'build'),
        },
        proxy: {
            '/home': {
                target: 'http://localhost:3000',
                secure: false,
            }
        },
        historyApiFallback: true
    },
}