const path = require('path');
const fs = require('fs');
const EventHooksPlugin = require('event-hooks-webpack-plugin');

module.exports = {
  transpileDependencies: true,
  chainWebpack: (config) => {
   
      if (config.plugins.has("SystemJSPublicPathWebpackPlugin")) { 
        config.plugins.delete("SystemJSPublicPathWebpackPlugin");
      }
    config.devServer.headers({
      'Access-Control-Allow-Origin': '*',
    });
    config.devServer.set('allowedHosts', 'all');
    config.devServer.set('port', 8082);
    config.devServer.set('hot', true);

    config.output.filename('[name].js');
    config.output.publicPath('/');
    config.externals([
      'vue',
      'vue-router',
      'rxjs',
      /^@app\/.+$/
    ]);
  },
  lintOnSave: true,
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new EventHooksPlugin({
        done: () => {
          if (process.env.NODE_ENV !== 'development') {
            const buildDir = path.join(__dirname, '/dist');
            fs.unlinkSync(`${buildDir}/index.html`);
          }
        },
      }),
    ],
  },
};
