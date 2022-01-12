const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "index.[contenthash].js",
        path: path.resolve(__dirname, "build"),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "./public/icon.svg",
            template: "./public/index.html"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build')
        }
    }
}