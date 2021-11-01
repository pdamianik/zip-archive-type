const path = require('path');
const webpack = require('webpack');

/** @typedef {import('webpack').Configuration} WebpackConfig */
/** @type WebpackConfig */

const webExtensionConfig = {
	mode: 'none',
	target: 'webworker',
	entry: {
		extension: './src/extension.ts',
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist/'),
		libraryTarget: 'commonjs',
	},
	resolve: {
		mainFields: ['browser', 'module', 'main'],
		extensions: ['.ts', '.js'],
		fallback: {
			"stream": require.resolve("stream-browserify"),
			"buffer": require.resolve("buffer"),
		}
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser'
		})
	],
	externals: {
		vscode: 'commonjs vscode'
	},
	performance: {
		hints: false
	},
	devtool: 'nosources-source-map'
};
module.exports = [webExtensionConfig];