import path from 'path';
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import webpackMD5Hash from 'webpack-md5-hash';
import extractTextPlugin from 'extract-text-webpack-plugin';

export default {
	debug: true,
	devtool: 'source-map',
	noInfo: false,
	entry: {
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index')
	},
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js'
	},
	plugins: [
		//Generate an external css file with a hash in the filename.
		new extractTextPlugin('[name].[contenthash].css'),
		//Hash the files using MD5 so that their names change when the content changes.
		new webpackMD5Hash(),
		// Use CommonsChunkPlugin to create a separate bundle
		// of vendor libraries so that they're cached separately.
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		//Create HTML file that includes reference to bundled JS
		new htmlWebpackPlugin({
			template: 'src/index.html',
			minify: {
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
			},
			inject: true,

			//Properties you define here are available in index.html
			//using htmlWebpackPlugin.options.varName
			trackJSToken: '71dc3348c9b549f286b37a5676831c60'
		}),
		//Eliminate duplicate packages when generating bundle
		new webpack.optimize.DedupePlugin(),
		//Minify JS
		new webpack.optimize.UglifyJsPlugin(),

	],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
			{test: /\.css$/, loader: extractTextPlugin.extract('css?sourceMap')}
		]
	}
}
