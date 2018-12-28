/**
 * The point of this file is to automate some of the repetitive webpack definitions, especially as it relates to prod vs dev
 */

import path from 'path';
import fs from 'fs';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const pageList = [
    {
        template: "src/index.html", // What is the source for this
        chunks: ['index'], // What bundle should be loaded here?
        filename: "index.html" // Where does the output go?
    }
];

/**
 * Return the entry points for webpack
 * Will read all files in src/cssBundles
 * @param {"DEV" | "PROD"} environment
 * @returns {Object}
 */
export function getEntryPoints(environment){
    const entryPoints = {};
    const bundleDirectory = "src/cssBundles";

    const bundleConfigFiles = fs.readdirSync(ppath(bundleDirectory));

    for (const file of bundleConfigFiles) {
        const basename = path.basename(file, path.extname(file));
        entryPoints[basename] = [ppath(bundleDirectory + "/" + file)]
    }

    return entryPoints;
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
        filename: 'js/bundle.[name].js'
    }
}

/**
 * Get CSS related plugins
 * @param environment
 * @returns {*[]}
 */
export function getCSSPlugins(environment){
    return [
        new ExtractTextPlugin("css/[name].css")
    ]
}


/**
 * Return all the plugins for webpack
 * @param environment
 */
export function getPlugins(environment){
    const plugins =  [
        ...getHTMLPlugins(environment),
        ...getCSSPlugins(environment)
    ];

    return plugins;
}

/**
 * Return the array of HTMLWebpackPlugin configurations used by webpack
 * @param {"DEV" | "PROD"} environment
 * @returns {Array}
 */
export function getHTMLPlugins(environment){
    const baseParams = {
        inject: true,
        thisEnvironmentType: "PROD", // This is a custom property available in our html via ejs
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
 * Retrun the absolute path
 * @param location
 * @returns {*|string}
 */
function ppath(location) {
    return path.resolve(__dirname, location);
}
