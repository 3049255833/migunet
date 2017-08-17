

import Vue from 'vue'
import Vuex from 'vuex'
// import Mock from 'mockjs'
import axios from 'axios'


Vue.use(Vuex)



const productDetail={

  state:{
  // 定义状态
    DetailData:''

},

  getters:{
  getDetailData(state){
    return state.DetailData;
  }
},

  mutations:{
  loadDetailData(state,DetailData){
    state.DetailData=DetailData;
  },
  
},

  actions :{
  
    loadDetailData(context){

    // axios.get('/productQuery/selectcontractproductall/1/10').then((res)=>{
    //    var res = res.data.data;
    //    context.commit("loadListData",res);
    //    console.log('table数据:',res);

    // })
    axios.get('/productQuery/getContractDetails/1000000000007').then((res)=>{
       var res = res.data.data;
       context.commit("loadDetailData",res);
       console.log('table数据:',res);
    })
  },
  
}


}




// var Random = Mock.Random
// Random.extend({
//     constellation: function(date) {
//         var constellations = ['全职高手1', '全职高手2', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
//         return this.pick(constellations)
//     }
// })
// Random.constellation();
// // => "水瓶座"

// var data = Mock.mock('http://www.migunet.com',{
//   "ProductInfos|1-10":[
//   {
// "ProductId":0,
// "Name":"@CONSTELLATION",
// "Describe":"产品描述",
// "Keys":"关键字1，关键字2",
// "CpId|988221-9009876988":1,
// "ProductLine":"归属产品线1",
// "Status|1-7":1,
// "ChargeType":1,
// "PayType":1,
// "PlatformType":1,
// "BossId":"100001",
// "ProductType":1,
// "Fee|0-100":100,
// "EnableTag":0,
// "StartTime":"2017-07-13 19:21:00",
// "EndTime":"2017-09-01 10:00:00",
// },

// ]

// });
// var data1 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback',{
//   "ProductInfos|1-10":[
//   {
// "ProductId":0,
// "Name":"@CONSTELLATION",
// "Describe":"产品描述",
// "Keys":"关键字1，关键字2",
// "CpId|988221-9009876988":1,
// "ProductLine":"归属产品线1",
// "Status|1-7":1,
// "ChargeType":1,
// "PayType":1,
// "PlatformType":1,
// "BossId":"100001",
// "ProductType":1,
// "Fee|0-100":100,
// "EnableTag":0,
// "StartTime":"2017-07-13 19:21:00",
// "EndTime":"2017-09-01 10:00:00",
// },

// ]

// });
// var data2 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback?page=1&&pagesize=10',{
//   "ProductInfos|10":[
//   {
// "ProductId":1,
// "Name":"@CONSTELLATION",
// "Describe":"产品描述",
// "Keys":"关键字1，关键字2",
// "CpId|988221-9009876988":1,
// "ProductLine":"归属产品线1",
// "Status|1-7":1,
// "ChargeType":1,
// "PayType":1,
// "PlatformType":1,
// "BossId":"100001",
// "ProductType":1,
// "Fee|0-100":100,
// "EnableTag":0,
// "StartTime":"2017-07-13 19:21:00",
// "EndTime":"2017-09-01 10:00:00",
// },

// ]

// });
// var data2 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback?page=2&&pagesize=10',{
//   "ProductInfos|10":[
//   {
// "ProductId":2,
// "Name":"@CONSTELLATION",
// "Describe":"产品描述",
// "Keys":"关键字1，关键字2",
// "CpId|988221-9009876988":1,
// "ProductLine":"归属产品线1",
// "Status|1-7":1,
// "ChargeType":1,
// "PayType":1,
// "PlatformType":1,
// "BossId":"100001",
// "ProductType":1,
// "Fee|0-100":100,
// "EnableTag":0,
// "StartTime":"2017-07-13 19:21:00",
// "EndTime":"2017-09-01 10:00:00",
// },

// ]

// });
// var data2 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback?page=3&&pagesize=10',{
//   "ProductInfos|10":[
//   {
// "ProductId":3,
// "Name":"@CONSTELLATION",
// "Describe":"产品描述",
// "Keys":"关键字1，关键字2",
// "CpId|988221-9009876988":1,
// "ProductLine":"归属产品线1",
// "Status|1-7":1,
// "ChargeType":1,
// "PayType":1,
// "PlatformType":1,
// "BossId":"100001",
// "ProductType":1,
// "Fee|0-100":100,
// "EnableTag":0,
// "StartTime":"2017-07-13 19:21:00",
// "EndTime":"2017-09-01 10:00:00",
// },

// ]

// });
// var data2 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback?page=4&&pagesize=10',{
//   "ProductInfos|10":[
//   {
// "ProductId":4,
// "Name":"@CONSTELLATION",
// "Describe":"产品描述",
// "Keys":"关键字1，关键字2",
// "CpId|988221-9009876988":1,
// "ProductLine":"归属产品线1",
// "Status|1-7":1,
// "ChargeType":1,
// "PayType":1,
// "PlatformType":1,
// "BossId":"100001",
// "ProductType":1,
// "Fee|0-100":100,
// "EnableTag":0,
// "StartTime":"2017-07-13 19:21:00",
// "EndTime":"2017-09-01 10:00:00",
// },

// ]

// });
// var data2 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback?page=5&&pagesize=10',{
//   "ProductInfos|10":[
//   {
// "ProductId":5,
// "Name":"@CONSTELLATION",
// "Describe":"产品描述",
// "Keys":"关键字1，关键字2",
// "CpId|988221-9009876988":1,
// "ProductLine":"归属产品线1",
// "Status|1-7":1,
// "ChargeType":1,
// "PayType":1,
// "PlatformType":1,
// "BossId":"100001",
// "ProductType":1,
// "Fee|0-100":100,
// "EnableTag":0,
// "StartTime":"2017-07-13 19:21:00",
// "EndTime":"2017-09-01 10:00:00",
// },

// ]

// });
// var data2 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback?page=6&&pagesize=10',{
//   "ProductInfos|10":[
//   {
// "ProductId":6,
// "Name":"@CONSTELLATION",
// "Describe":"产品描述",
// "Keys":"关键字1，关键字2",
// "CpId|988221-9009876988":1,
// "ProductLine":"归属产品线1",
// "Status|1-7":1,
// "ChargeType":1,
// "PayType":1,
// "PlatformType":1,
// "BossId":"100001",
// "ProductType":1,
// "Fee|0-100":100,
// "EnableTag":0,
// "StartTime":"2017-07-13 19:21:00",
// "EndTime":"2017-09-01 10:00:00",
// },

// ]

// });
// var data2 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback?page=7&&pagesize=10',{
//   "ProductInfos|10":[
//   {
// "ProductId":7,
// "Name":"@CONSTELLATION",
// "Describe":"产品描述",
// "Keys":"关键字1，关键字2",
// "CpId|988221-9009876988":1,
// "ProductLine":"归属产品线1",
// "Status|1-7":1,
// "ChargeType":1,
// "PayType":1,
// "PlatformType":1,
// "BossId":"100001",
// "ProductType":1,
// "Fee|0-100":100,
// "EnableTag":0,
// "StartTime":"2017-07-13 19:21:00",
// "EndTime":"2017-09-01 10:00:00",
// },

// ]

// });
// var data3 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback?id=100200300',{
//   "ProductInfos|10":[
//   {
// "ProductId":0,
// "Name":"@CONSTELLATION",
// "Describe":"产品描述",
// "Keys":"关键字1，关键字2",
// "CpId|988221-9009876988":1,
// "ProductLine":"归属产品线1",
// "Status|1-7":1,
// "ChargeType":1,
// "PayType":1,
// "PlatformType":1,
// "BossId":"100001",
// "ProductType":1,
// "Fee|0-100":100,
// "EnableTag":0,
// "StartTime":"2017-07-13 19:21:00",
// "EndTime":"2017-09-01 10:00:00",
// },

// ]

// });
// var jsonData2 = Mock.mock('http:www.migunet.com/productQuery?productID=1',{
//   "status": 200,
//   "error": "成功",
//   "message": "操作成功",
//   "data": {
//     "pageNum": 1,
//     "pageSize": 5,
//     "size": 4,
//     "startRow": 1,
//     "endRow": 4,
//     "total": 4,
//     "pages": 1,
//     "list": [
//       {
//         "productId": "1",
//         "productDirId": null,
//         "name": "1",
//         "contractProductDescribe": null,
//         "keyWords": null,
//         "cpid": null,
//         "productLine": null,
//         "status": "1",
//         "auditstatus": null,
//         "chargeType": null,
//         "payType": null,
//         "platformType": null,
//         "bossId": null,
//         "productType": null,
//         "productObjType": null,
//         "fee": null,
//         "feeType": null,
//         "testTag": null,
//         "testProductId": null,
//         "cycleUnit": null,
//         "cycleUnitNum": null,
//         "enableType": null,
//         "unsubscribeType": null,
//         "refillType": null,
//         "startTime": null,
//         "endTime": null,
//         "createTime": null,
//         "createUser": null,
//         "updateTime": null,
//         "discountStrategy": null
//       },
//       {
//         "productId": "2000000000000000000001",
//         "productDirId": null,
//         "name": null,
//         "contractProductDescribe": null,
//         "keyWords": null,
//         "cpid": null,
//         "productLine": null,
//         "status": "1",
//         "auditstatus": null,
//         "chargeType": null,
//         "payType": null,
//         "platformType": null,
//         "bossId": null,
//         "productType": null,
//         "productObjType": null,
//         "fee": null,
//         "feeType": null,
//         "testTag": null,
//         "testProductId": null,
//         "cycleUnit": null,
//         "cycleUnitNum": null,
//         "enableType": null,
//         "unsubscribeType": null,
//         "refillType": null,
//         "startTime": null,
//         "endTime": null,
//         "createTime": null,
//         "createUser": null,
//         "updateTime": null,
//         "discountStrategy": null
//       },
//       {
//         "productId": "2000000000000000000002",
//         "productDirId": null,
//         "name": "string",
//         "contractProductDescribe": null,
//         "keyWords": null,
//         "cpid": null,
//         "productLine": null,
//         "status": "1",
//         "auditstatus": null,
//         "chargeType": null,
//         "payType": null,
//         "platformType": null,
//         "bossId": null,
//         "productType": null,
//         "productObjType": null,
//         "fee": null,
//         "feeType": null,
//         "testTag": null,
//         "testProductId": null,
//         "cycleUnit": null,
//         "cycleUnitNum": null,
//         "enableType": null,
//         "unsubscribeType": null,
//         "refillType": null,
//         "startTime": null,
//         "endTime": null,
//         "createTime": null,
//         "createUser": null,
//         "updateTime": null,
//         "discountStrategy": null
//       },
//       {
//         "productId": "2000000000000000000003",
//         "productDirId": null,
//         "name": "string",
//         "contractProductDescribe": null,
//         "keyWords": null,
//         "cpid": null,
//         "productLine": null,
//         "status": "0",
//         "auditstatus": null,
//         "chargeType": null,
//         "payType": null,
//         "platformType": null,
//         "bossId": null,
//         "productType": null,
//         "productObjType": null,
//         "fee": 0,
//         "feeType": null,
//         "testTag": null,
//         "testProductId": null,
//         "cycleUnit": null,
//         "cycleUnitNum": null,
//         "enableType": null,
//         "unsubscribeType": null,
//         "refillType": null,
//         "startTime": null,
//         "endTime": null,
//         "createTime": null,
//         "createUser": null,
//         "updateTime": null,
//         "discountStrategy": null
//       }
//     ],
//     "prePage": 0,
//     "nextPage": 0,
//     "isFirstPage": true,
//     "isLastPage": true,
//     "hasPreviousPage": false,
//     "hasNextPage": false,
//     "navigatePages": 8,
//     "navigatepageNums": [
//       1
//     ],
//     "navigateFirstPage": 1,
//     "navigateLastPage": 1,
//     "lastPage": 1,
//     "firstPage": 1
//   }
// });
export default productDetail
