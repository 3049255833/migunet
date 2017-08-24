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
    getSingleProductDetail:'product/getProductDetail'     //获取单品详情
};

for (let key in api) {
	api[key] = path + api[key];
}



export default api;