const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, '../index.html');
    const publicPath = express.static(path.join(__dirname, '../assets/bundle.js'));
    const cssPath = express.static(path.join(__dirname, '../public/main.scss'));
    app.use('/bundle', publicPath);
    app.use('/public', cssPath);
    app.get('/', function (_, res) { res.sendFile(indexPath) });
    return app;
  }
}