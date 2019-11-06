const path = require('path')

module.exports = {
	entry: {
		index: './src/index.js',
	},
	output: {
		path: path.resolve('./'),
		libraryTarget: 'commonjs2',
	},
	resolve: {
		extensions: ['.js'],
		symlinks: false,
	},
	devtool: false, //'cheap-module-eval-source-map'/* 'inline-source-map' */,
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'eslint-loader',
					options: {
						emitError: true,
					},
				}]
			},
		]
	},
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
	},
}
