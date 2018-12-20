/**
 * The point of this file is to automate some of the repetitive webpack definitions, especially as it relates to prod vs dev
 */

import path from 'path';
import fs from 'fs';
import ExtractTextPlugin from "extract-text-webpack-plugin";

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
        ...getCSSPlugins(environment)
    ];

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
