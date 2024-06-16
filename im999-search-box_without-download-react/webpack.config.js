module.exports = {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
  
        //im999 for import .css files
        ,
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }
      ]
    }
  };