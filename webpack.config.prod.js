import path from 'path';
import webpack from 'webpack';
import {getPlugins, getEntryPoints, getOutputData} from './webpackHelper';
import ExtractTextPlugin from "extract-text-webpack-plugin";
const environment = "PROD";

let config = {
    devtool: 'source-map', // Source map settings - does not impact production as source maps are only downloaded when a user opens dev tools
    entry: getEntryPoints(environment),
    target: 'web', // You can use "node" or "electron" here
    output: getOutputData(environment),
    plugins: getPlugins(environment),
    // module: {
    //     rules: [{
    //         test: /\.js$/,
    //         exclude: /node_modules/,
    //         use: ['babel-loader']
    //     }]
    // }
};

export default config;
