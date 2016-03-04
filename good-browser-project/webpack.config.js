var webpack = require('webpack');

module.exports = {
	entry: './src/main/app',
	output: {
		filename: 'dist/bundle.js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'ts-loader' }
		]
	}
};
