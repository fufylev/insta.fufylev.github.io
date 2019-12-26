// basic vars
const path = require('path');

// additional plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PATHS = {
    app: path.resolve(__dirname, 'client', 'app'),
    build: path.resolve(__dirname, 'client', 'build'),
};

const plugins = [
    new HtmlWebpackPlugin({
        template: path.join(PATHS.app, 'index.html'),
        filename: 'index.html',
    }),
    new CopyPlugin([{ from: path.join(PATHS.app, 'public'), to: '' }]),
];

const rules = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-scoped-styles/script-loader', 'babel-loader'],
    },
];

module.exports = {
    context: PATHS.app,
    entry: {
        index: path.join(PATHS.app, 'index.js'),
    },
    output: {
        filename: path.join('assets', 'js', '[name].[hash].js'),
        path: PATHS.build,
        publicPath: '/',
    },
    externals: {
        PATHS,
    },
    resolve: {
        alias: {
            '~': PATHS.app,
        },
    },
    module: {
        rules,
    },
    plugins,
};
