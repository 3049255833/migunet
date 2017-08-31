/**
 * Created By xuzhaohui on 2017/8/18
 *
 * api统一处理
 *
 */

let path = location.hostname === 'localhost'
			? location.origin+'/'
			: location.origin+'/';


let api = {
    /**
     * 单品
     * */
    getSingleProductList:'product/getProductList',        //获取单品列表
    getSingleProductDetail:'product/getProductDetail',    //获取单品详情
    /**
     * 合约产品
     * */
    getContractProductList:'product/getContractProductList',    //获取合约列表
    getContractProductDetail:'product/contractProductDetail',       //获取合约产品详情
    getProductDist:'contractProduct/findProductCatalog',        //获取产品目录
    getServiceCodeList:'contractProduct/findCharge',           //获取业务代码
    findPdMatchFiled:'contractProduct/findPdMatchFiled',        //获取匹配字段表

    findPdAttribution:'contractProduct/findPdAttribution',          //获取业务归属地
    findFeePlan:'contractProduct/findFeePlan',                         //获取资费计划
    findChannel:'contractProduct/findChannel',                        //获取渠道id
    saveContractProductOne:'contractProduct/saveContractProductOne', //保存第一步

    saveContractProductThree:'contractProduct/saveContractProductThree', //保存第三步

    getSmsTemplateList: 'contractProduct/findSmsTemplate',     //获取短信模板列表
    getContractProductByStatus: 'contractProduct/findContractProductByStatus', //获取短信模板列表

    updateProductState: 'product/updateProductState', //删除注销产品

    getBossInfo: 'productCenter/getBossInfo'  //获取业务状态列表
};

for (let key in api) {
	api[key] = path + api[key];
}



export default api;
