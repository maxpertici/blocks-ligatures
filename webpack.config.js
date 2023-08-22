let externals = {
    wp: 'wp'
};

externals = {};

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    
    mode,

    entry : ['./app/app.js' ] ,
    
    output: {
        filename: './app.js',
        path: path.resolve(__dirname, 'build'),
    },

    externals,

    plugins: [
      new MiniCssExtractPlugin({
        insert : '',
        runtime : false,
        filename: "app.css"
      })
    ],
    
    module: {
      
      rules: [
      
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
              test: /\.scss$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: './',
                    emit : true,
                  },
                },
                'css-loader',
                'sass-loader'
              ]
            }
        ],
    },
};

