var webpack = require('webpack');

module.exports = {
	entry: './src/main/org.kevoree',
	output: {
		filename: 'dist/MyModel.js',
		library: 'MyModel',
		libraryTarget: 'umd'
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
