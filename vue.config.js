var webpack = require('webpack');

module.exports = {
	configureWebpack: {  
		plugins: [
			new webpack.DefinePlugin({
				'API_HOST' : JSON.stringify('https://api.mei-zhi.com/api/')
			}),
		],
	}
}