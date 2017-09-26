/**
 * Created By xuzhaohui on 2017/8/18
 *
 * api统一处理
 *
 */

//window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');

let path = location.hostname === 'localhost'
			? window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '')+'/'
			: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '')+'/';

let api = {
    /**
     * 单品
     * */
    getSingleProductList:'product/getProductList',        //获取单品列表
    getSingleProductDetail:'product/getProductDetail',    //获取单品详情
    /**
     * 合约产品
     * */
    getContractProductList:'productCenter/getContractProductList',    //获取合约列表
    getContractProductDetail:'productCenter/contractProductDetail',       //获取合约产品详情
    getProductDist:'contractProduct/findProductCatalog',        //获取产品目录
    getServiceCodeList:'contractProduct/findCharge',           //获取业务代码
    findPdMatchFiled:'contractProduct/findPdMatchFiled',        //获取匹配字段表
    findPdContent:'contractProduct/findPdContent',               //根据匹配字段获取内容
    findPdFeePlanByCondition:'contractProduct/findPdFeePlanByCondition',           //通过关键字搜索资费计划

    findPdAttribution:'contractProduct/findPdAttribution',          //获取业务归属地
    findFeePlan:'contractProduct/findFeePlan',                         //获取资费计划
    findChannel:'contractProduct/findChannel',                        //获取渠道id
    saveContractProductOne:'contractProduct/saveContractProductOne', //保存第一步
    saveContractProductTwo:'contractProduct/saveContractProductTwo', //保存第一步

    saveContractProduct:'contractProduct/saveContractProduct', //保存第三步

    findContractProductByStatus:'contractProduct/findContractProductByStatus',

    getSmsTemplateList: 'contractProduct/findSmsTemplate',     //获取短信模板列表
    getContractProductByStatus: 'contractProduct/findContractProductByStatus', //产品编码

    updateProductState: 'product/updateProductState', //删除注销产品

    getBossInfo: 'productCenter/getBossInfo',  //获取业务状态列表
    deleteBossInfo: 'productCenter/deleteBossInfo',  //删除业务
    addBossInfo: 'productCenter/addBossInfo',  //添加业务代码
    updateBossInfo: 'productCenter/updateBossInfo',  //编辑业务代码
    batchAddBossInfo: 'productCenter/batchAddBossInfo',  //批量添加业务代码

    findContractBySearch:'contractProduct/findContractBySearch', //第二步获取产品
    findSmsByCondition:'contractProduct/findSmsByCondition',     //第二步获取短信模板
    findContractByCondition:'contractProduct/findContractByCondition',  //互斥产品新接口

    getContractAuditList:'productCenter/getContractAuditList', //获取审批列表
    getAuditContractProduct:'productCenter/auditContractProduct', //获取审批列表
    updateAuditStatusList:'productCenter/updateAuditStatusList',  //审批列表

    deleteSmsTemplate: 'smsTemplate/deleteSmsTemplate',           //删除短信模板
    findSmsTemplate: 'smsTemplate/findSmsTemplate',                  //获取短信模板列表
    addSmsTemplate: 'smsTemplate/addSmsTemplate',   //添加短信模板
    updateSmsTemplate: 'smsTemplate/updateSmsTemplate',  //更新短信模板
    getSmsTemplate: 'smsTemplate/getSmsTemplate',  //查询一条短信模板列表
    uploadSmsTemplate: 'smsTemplate/uploadSmsTemplate',  //批量导入短信模板

    queryCpDepend: 'product/queryCpDepend',  //查询合约产品的依赖关系
    findPdCp: 'contractProduct/findPdCp'     //获取cp/sp列表
};

for (let key in api) {
	api[key] = path + api[key];
}



export default api;
