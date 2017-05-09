const path = require('path');
const env = require('yargs').argv.mode;
const webpack = require('webpack');

const projectRoot = path.resolve(__dirname, '/');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const libraryName = 'lars';

const plugins = [];
let outputFile;

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({
        minimize: true
    }));
    outputFile = `${libraryName}.min.js`;
} else {
    outputFile = `${libraryName}.js`;
}

const config = {
    entry: `${__dirname}/src/index.js`,
    devtool: 'source-map',
    output: {
        path: `${__dirname}`,
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        /*preLoaders: [{
            test: /(\.jsx|\.js)$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /(node_modules|bower_components)/
        }],*/
        loaders: [{
            test: /(\.jsx|\.js)$/,
            loader: 'babel-loader',
            include: projectRoot
                /*exclude: /(node_modules|bower_components)/*/
        }]
    },
    resolve: {
        alias: {
            //'wavesurfer': path.resolve(__dirname, './node_modules/wavesurfer.js/dist/wavesurfer.js'),
            //'wavesurfer-regions': path.resolve(__dirname, './node_modules/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'),
            //'wavesurfer-timeline': path.resolve(__dirname, './node_modules/wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js'),
            //'wavesurfer-timeline': path.resolve(__dirname, './src/wavesurfer.timeline.js'),
            //'wavesurfer-minimap': path.resolve(__dirname, './node_modules/wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js'),
            //'wavesurfer-elan': path.resolve(__dirname, './node_modules/wavesurfer.js/dist/plugin/wavesurfer.elan.min.js'),
            //'wavesurfer-elan-wave-segment': path.resolve(__dirname, './src/wavesurfer.elan-wave-segment.js'),
            'waves-basic-controllers': path.resolve(__dirname, './node_modules/waves-audio/examples/assets/waves-basic-controllers.umd.js')
        },
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    plugins
};

module.exports = config;