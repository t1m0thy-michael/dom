const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(path.resolve('./build'))
module.exports = {
	entry: {
		sandbox: './src/sandbox.ts',
	},
	output: {
		path: path.resolve('./build'),
	},
	resolve: {
		extensions: ['.js', '.ts'],
		symlinks: false,
	},
	devtool: 'inline-source-map', //'cheap-module-eval-source-map'/* 'inline-source-map' */,
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: {
				loader: 'ts-loader',
				options: {
					transpileOnly: false, // true == FAST build, false == slow, fail on TS errors
					experimentalWatchApi: false, // ???
				},
			},
			exclude: /node_modules/,
		}]
	},
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
	devServer: {
		port: 3001,
		contentBase: './build',
		historyApiFallback: {
			index: '/sandbox.html'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/html/template.html',
			filename: 'sandbox.html',
			title: 'sandbox',
			inject: true,
			hash: false,
			assets: {},
		}),
	]
}
