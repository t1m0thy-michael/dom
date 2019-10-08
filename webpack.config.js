// const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		index: './src/index.ts'
	},
	output: {
		path: __dirname + '',
		publicPath: '/'
		// path: path.resolve('./'),
		//libraryTarget: 'commonjs2',
	},
	resolve: {
		extensions: ['.js', '.ts'],
		symlinks: false,
	},
	devtool: 'eval-source-map', //'cheap-module-eval-source-map'/* 'inline-source-map' */,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [ 
					{
						loader: 'eslint-loader',
						options: {
							emitError: true,
						},
					}
				]
			},
			{
				test: /\.tsx?$/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: false, // true == FAST build, false == slow, fail on TS errors
						experimentalWatchApi: false, // ???
					},
				},
				exclude: /node_modules/,
			}
		]
	},
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
	devServer: {
		port: 3000,
		contentBase: './build',
		historyApiFallback: {
			index: '/index.html'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/html/index.html',
			filename: 'index.html',
			title: 'timothymichael.co.uk',
			inject: true,
			hash: false,
			assets: {},
		}),
	]
}