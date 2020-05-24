const path = require('path');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    writeToDisk: true,
    setup(app) {
      // const routes = [
      //   "/register",
      //   "/login",
      //   "/dashboard",
      //   "/transactions",
      //   "/transactions/send",
      //   "/transactions/request",
      // ];
      // app.get(routes, (req, res) => {
      //   res.sendFile(path.resolve(__dirname, "index.html"));
      // });
    },
  },
};
