// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

var proxy_service_xhw = 'http://10.5.2.47:8999';
var proxy_service_ljy = 'http://10.5.2.119:8080';
var proxy_service_xl = 'http://10.5.2.19:8080';
var proxy_service_e = 'http://10.5.2.52:8080';

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
        port: 8088,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        proxyTable: {
            '/product/getProductList': {
                /*单品列表*/
                target: proxy_service_xhw,
                changeOrigin: true
            },
            '/product/getProductDetail': {
                /*单品详情的IP*/
                target: proxy_service_xhw,
                changeOrigin: true
            },


            '/product/getContractProductList': {
                /*合约产品列表的IP*/
                target: proxy_service_e,
                changeOrigin: true
            },
            '/product/contractProductDetail': {
                /*合约产品详情的IP*/
                target: proxy_service_ljy,
                changeOrigin: true
            },
            '/contractProduct/findCharge': {
                /*获取业务代码详情*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/findPdMatchFiled':{
                /*获取匹配字段表*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/findPdContent':{
                /*匹配内容限定*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/findSmsTemplate': {
                /*获取短信模板列表*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/findPdAttribution': {
                /*获取区域选择列表*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/findChannel':{
                /*获取渠道Id*/
                target: proxy_service_xl,
                changeOrigin: true

            },

            '/contractProduct/findProductCatalog': {
                /*获取产品目录*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/findFeePlan': {
                /*获取产品目录*/
                target: proxy_service_xl,
                changeOrigin: true
            },

            '/contractProduct/saveContractProductOne':{
                /*保存第一步*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/findContractProductByStatus': {
                /*获取互斥和依赖产品列表*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/saveContractProductThree': {
                /*添加产品保存第三步*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/product/updateProductState': {
                /*删除注销产品*/
                target: proxy_service_e,
                changeOrigin: true
            }
        },
        cssSourceMap: false
    }
};

