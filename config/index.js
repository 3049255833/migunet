// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

var proxy_service_xhw = 'http://10.5.2.47:8080';
var proxy_service_ljy = 'http://10.5.2.69:8080';
var proxy_service_xl = 'http://10.5.2.38:8080';
var proxy_service_e = 'http://10.5.2.52:8080';
var proxy_service_wc = 'http://10.5.2.66:8080';
var proxy_service_cjk='http://10.5.2.212:8080';
var proxy_service_lfy='http://10.5.2.15:8080';
var proxy_service_yzx='http://10.5.2.14:8080';
var proxy_service='http://10.5.2.243:8082';


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
        productionSourceMap: false,
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
            '/product/getProductList': {
                /*单品列表*/
                target: proxy_service,
                changeOrigin: true
            },
            '/product/getProductDetail': {
                /*单品详情的IP*/
                target: proxy_service,
                changeOrigin: true
            },

            '/productCenter/getContractProductList': {
                /*合约产品列表的IP*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/productCenter/contractProductDetail': {
                /*合约产品详情的IP*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/product/queryCpDepend': {
                /*查询合约产品的依赖关系*/
                target: proxy_service_xl,
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
            '/contractProduct/findContentArea':{
              /*获取产品权益下面的地区限定*/
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
            '/contractProduct/findPdFeePlanByCondition':{
                /*通过关键字查询资费计划*/
                target: proxy_service_xl,
                changeOrigin: true
            },


            '/contractProduct/findProductCatalog': {
                /*获取产品目录*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/findFeePlan': {
                /*获取资费计划*/
                target: proxy_service_xl,
                changeOrigin: true
            },

            '/contractProduct/saveContractProductOne':{
                /*保存第一步*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/saveContractProductTwo':{
                /*保存第二步*/
                target: proxy_service_xl,
                changeOrigin: true
            },
            '/contractProduct/saveContractProduct':{
                /*整体保存*/
                target: proxy_service_xl,
                changeOrigin: true
            },

            '/contractProduct/findContractProductByStatus': {
                /*获取互斥和依赖产品列表*/
                target: proxy_service,
                changeOrigin: true
            },
            '/contractProduct/findContractBySearch':{
                /*第二步获取产品列表*/
                target: proxy_service,
                changeOrigin: true
            },
            '/contractProduct/findSmsByCondition':{
                /*短信模板*/
                target: proxy_service,
                changeOrigin: true
            },
            '/contractProduct/findContractByCondition':{
                /*产品互斥新接口*/
                target: proxy_service,
                changeOrigin: true
            },

            '/contractProduct/saveContractProductThree': {
                /*添加产品保存第三步*/
                target: proxy_service,
                changeOrigin: true
            },


            '/product/updateProductState': {
                /*删除,下线产品*/
                target: proxy_service_cjk,
                changeOrigin: true
            },

            '/productCenter/getBossInfo': {
                /*获取业务状态列表*/
                target: proxy_service_ljy,
                changeOrigin: true
            },
            '/productCenter/deleteBossInfo': {
                /*删除业务代码*/
                target: proxy_service_ljy,
                changeOrigin: true
            },
            '/productCenter/addBossInfo': {
                /*添加业务代码*/
                target: proxy_service_ljy,
                changeOrigin: true
            },
            '/productCenter/updateBossInfo': {
                /*编辑业务代码*/
                target: proxy_service,
                changeOrigin: true
            },
            '/productCenter/batchAddBossInfo': {
                /*批量导入业务代码*/
                target: proxy_service_ljy,
                changeOrigin: true
            },


            /*审批*/
            '/productAudit/getAuditList': {
                /*获取审批列表*/
                target:  proxy_service,
                changeOrigin: true
            },
            '/productAudit/getAuditContractProduct': {
                /*获取审批详情*/
                target:  proxy_service,
                changeOrigin: true
            },
            '/productAudit/updateAuditStatusList': {
                /*审批*/
                target:  proxy_service,
                changeOrigin: true
            },
            '/productAudit/onekeyAudit': {
              /*审批的一键审批*/
              target:  proxy_service,
              changeOrigin: true
            },

            /*短信模板*/
            '/smsTemplate/deleteSmsTemplate': {
                /*删除短信模板*/
                target: proxy_service,
                changeOrigin: true
            },
            '/smsTemplate/findSmsTemplate': {
                /*获取短信模板列表*/
                target: proxy_service,
                changeOrigin: true
            },
            '/smsTemplate/addSmsTemplate': {
              /*添加短信模板*/
              target: proxy_service,
              changeOrigin: true
            },
            '/smsTemplate/updateSmsTemplate': {
              /*更新短信模板*/
              target: proxy_service,
              changeOrigin: true
            },
            '/smsTemplate/getSmsTemplate': {
              /*查询一条短信模板*/
              target: proxy_service,
              changeOrigin: true
            },
            '/smsTemplate/uploadSmsTemplate': {
                /*批量导入短信模板*/
                target: proxy_service,
                changeOrigin: true
            },
            '/contractProduct/findPdCp': {
              /*批量导入短信模板*/
              target: proxy_service,
              changeOrigin: true
            },
            '/smsTemplate/judgeSmsTemplate': {
              /*查询短信模版关联关系*/
              target: proxy_service,
              changeOrigin: true
            },
            '/contractProduct/findDictionaryType': {
              /*获取合约产品发送平台*/
              target: proxy_service,
              changeOrigin: true
            },
            '/smsTemplate/downloadSmsTemplate': {
              /*下载短信模板*/
              target: proxy_service,
              changeOrigin: true
            },
            '/contractProduct/checkContractCode': {
              /*合约产品新增验证产品编码是否重复*/
              target: proxy_service,
              changeOrigin: true
            }
        },
        cssSourceMap: false
    }
};

