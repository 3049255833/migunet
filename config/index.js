// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

var proxy_service_xhw = 'http://10.5.2.47:8080';
var proxy_service_ljy = 'http://10.5.2.119:8080';


/*switch (argv[0]) {
    case 'xhw':
        proxy_service = 'http://192.168.155.1';
        console.log('/!****************** 当前连接徐洪伟环境 参数dds *******************!/');
        break;
}*/

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',


        proxyTable: {
            '/product/getProductList': {  /*单品列表*/
                target: proxy_service_xhw,
                changeOrigin: true
            },
            '/product/getProductDetail': {   /*合约产品详情的IP*/
                target: proxy_service_xhw,
                changeOrigin: true
            },
            '/product/getContractProductList': {  /*单品列表*/
                target: proxy_service_ljy,
                changeOrigin: true
            },
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
