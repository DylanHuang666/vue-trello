module.exports = {
  devServer: {
    publicPath: '/',
    proxy: {
      '/api': {
        target: 'http://localhost:3336',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api/v1'
        }
      }
    }
  }
}