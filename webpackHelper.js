/**
 * The point of this file is to automate some of the repetitive webpack definitions, especially as it relates to prod vs dev
 */

import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import webpack from 'webpack';
import WebpackMd5Hash from "webpack-md5-hash";
import DojoWebpackPlugin from "dojo-webpack-plugin";

const pageList = [
    {
        template: "src/index.html", // What is the source for this
        chunks: ['cats'], // What bundle should be loaded here?
        filename: "index.html" // Where does the output go?
    }
];

/**
 * Return the entry points for webpack
 * @param {"DEV" | "PROD"} environment
 * @returns {Object}
 */
export function getEntryPoints(environment){
    return {
        cats: [
            "babel-polyfill",
            "whatwg-fetch",
            ppath('src/dojoContent/cats')
        ]
    };
}

/**
 * Return the output data for webpack
 * @param environment
 * @returns {{path: *|string, filename: string}}
 */
export function getOutputData(environment){
    const outputPath = (environment === "PROD") ? ppath('dist') : ppath('src');
    return {
        path: outputPath,
        filename: 'bundle.[name].js'
    }
}

/**
 * Is the app served at / or at /?
 * @param environment
 * @returns {string}
 */
export function getSubdirectory(environment){
    if(environment === "DEV"){
        return "";
    } else {
        return ""
    }
}

/**
 *
 * Return the array of CopyPlugin configurations used by webpack
 * @param {"DEV" | "PROD"} environment
 * @returns {Array}
 */
export function getCopyPlugins(environment){
    return [
        new CopyWebpackPlugin([
            // Put files here that need to be directly copied
            { from: 'src/dojoContent/templates/', to: 'templates/' },
        ])
    ]
}

/**
 * Get CSS related plugins
 * @param environment
 * @returns {*[]}
 */
export function getCSSPlugins(environment){
    return [
        new ExtractTextPlugin("[name].[contenthash].css")
    ]
}

/**
 * Return the array of HTMLWebpackPlugin configurations used by webpack
 * @param {"DEV" | "PROD"} environment
 * @returns {Array}
 */
export function getHTMLPlugins(environment){
    const prodParams = {
        inject: true,
        thisEnvironmentType: "PROD", // This is a custom property available in our html via ejs
        thisSubdirectory: getSubdirectory("PROD"),
        buildTimestamp: new Date(),
        minify: { // Lots of options for minifying here
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    };
    const devParams = {
        inject: true,
        thisSubdirectory: getSubdirectory("DEV"),
        thisEnvironmentType: "DEV", // This is a custom property available in our html via ejs
        buildTimestamp: new Date()
    };

    const baseParams = (environment === "PROD") ? prodParams: devParams;
    const pluginArray = [];

    pageList.forEach(page => {
        const pageConfig = Object.assign({}, page, baseParams); // Combine page data and baseParams
        if(Object.keys(pageConfig)){
            const plugin = new HtmlWebpackPlugin(pageConfig);
            pluginArray.push(plugin);
        }
    });

    return pluginArray;
}

/**
 * Return all the plugins for webpack
 * @param environment
 */
export function getPlugins(environment){
    const dojoConfig = require("./loaderConfig");
    const dojoPlugin = new DojoWebpackPlugin({
        loaderConfig: dojoConfig({
            dojoRoot: "node_modules"
        }),
        environment: {dojoRoot: "release"},	// used at run time for non-packed resources (e.g. blank.gif)
        buildEnvironment: {dojoRoot: "node_modules"}, // used at build time
        locales: ["en"],
        parseOnLoad: true
        // noConsole: true
    });

    const plugins =  [
        // Hash the files using MD5 so that their names change when the content changes
        new WebpackMd5Hash(),
        dojoPlugin,
        // Copy non-packed resources needed by the app to the release directory
        new CopyWebpackPlugin([{
            context: "node_modules",
            from: "dojo/resources/blank.gif",
            to: "dojo/resources"
        }]),

        // For plugins registered after the DojoAMDPlugin, data.request has been normalized and
        // resolved to an absMid and loader-config maps and aliases have been applied
        new webpack.NormalModuleReplacementPlugin(/^dojox\/gfx\/renderer!/, "dojox/gfx/canvas"),
        new webpack.NormalModuleReplacementPlugin(
            /^css!/, function(data) {
                data.request = data.request.replace(/^css!/, "!style-loader!css-loader!less-loader!")
            }
        ),
        ...getCopyPlugins(environment),
        ...getHTMLPlugins(environment),
        ...getCSSPlugins(environment),

    ];

    if(environment == "PROD"){
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
            // Change/Remove this if you want a production source map (Disabling this because it shows up globally as /Users/pano :( Figure out why TBD)
            // Look into devtoolModuleFilenameTemplate to resolve this issue
        }))
    }

    return plugins;
}

/**
 * Retrun the absolute path
 * @param location
 * @returns {*|string}
 */
function ppath(location) {
    return path.resolve(__dirname, location);
}
