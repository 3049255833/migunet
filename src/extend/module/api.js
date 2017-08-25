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
    getSingleProductList:'product/getProductList',        //获取单品列表
    getSingleProductDetail:'product/getProductDetail',    //获取单品详情
    getContractProductList:'product/getContractProductList', //获取合约列表
    getContractProductDetail:'product/contractProductDetail',       //获取合约产品详情
    getProductDist:'contractProduct/findProductCatalog',       //获取产品目录
};

for (let key in api) {
	api[key] = path + api[key];
}



export default api;
