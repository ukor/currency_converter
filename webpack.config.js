const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlExcludePlugin = require("html-webpack-exclude-assets-plugin");


module.exports = {
	entry: {
		app: "./src/index.js",
		sw: "./src/service_worker/sw.js"},
	output: {
		path: path.join(__dirname, "/build"),
		filename: '[name].bundle.js',
		globalObject: 'this'
	},
	module:
	{
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" }
				  ]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			excludeAssets: [/sw.*.js/] // exclude injecting service worker script
		}),
		new HtmlExcludePlugin()
	]
}