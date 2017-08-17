

import Vue from 'vue'
import Vuex from 'vuex'
// import Mock from 'mockjs'
import axios from 'axios'


Vue.use(Vuex)



const product={

  state:{
  // 定义状态
    page:1,
    keyWord:'我是谁',
    whichStatus:'上线',
    startTime:(new Date().getFullYear()+'-'+((new Date().getMonth()+1)>9?(new Date().getMonth()+1):('0'+(new Date().getMonth()+1)))+'-'+new Date().getDate()),
    endTime:(new Date().getFullYear()+'-'+((new Date().getMonth()+1)>9?(new Date().getMonth()+1):('0'+(new Date().getMonth()+1)))+'-'+new Date().getDate()),
    pageSize:'66条/页',
    pageSelected:'7',
    items:[],
    optionState:false,
    pageSizeState:false,
    pageOption:false,
    listData:[],//table数据

},

  getters:{
  getPage(state){
    return state.page;
  },
   getKeyWord(state){
    return state.keyWord;
   },
   getWhichStatus(state){
    return state.whichStatus;
   },
   getStartTime(state){
    return state.startTime;
   },
   getEndTime(state){
    return state.endTime;
   },
   getPageSize(state){
    return state.pageSize;
   },
    getPageSelected(state){
      return state.page;
    },
  getListData(state){
    return state.listData;
  },
  getRes(state){
    // axios.get('http://address:port/productCenter/productDataDeclareCallback?page='+state.page+'&&pagesize=10').then((res)=>{
  //      var res = res.data;
  //      state.items=res.ProductInfos;
  //      console.log(state.items);

  //   })
    return state.items;
  },
  getOptionState(state){
    return state.optionState;
  },
  getPageSizeState(state){
    return state.pageSizeState;
  }
},

  mutations:{
  changePage(state,page){
    state.page=page;
  },
  changeKeyWord(state,keyWord){
    state.keyWord=keyWord;
  },
  changeWhichStatus(state,whichStatus){
    state.whichStatus=whichStatus;
  },
  changeStartTime(state,startTime){
    state.startTime=startTime;
  },
  changeEndTime(state,endTime){
    state.endTime=endTime;
  },
  changePageSize(state,pageSize){
    state.pageSize=pageSize;
  },
    changePageSelected(state,pageSelected){
      state.page=pageSelected;
    },
    /*修改table数据*/
  loadListData(state,dataList){
    state.listData=dataList;
  },
  setOptionState(state,optionStatus){
    state.optionState=optionStatus;
  },
  shiftState(state){
    state.optionState=!state.optionState;
  },
    changePageOption(state){
      state.pageOption=!state.pageOption;
    }
},

  actions :{
  changePage(context,page){
    axios.get('http://address:port/productCenter/productDataDeclareCallback?page='+page+'&&pagesize=10').then((res)=>{
       var res = res.data;
       context.state.items=res.ProductInfos;
       console.log(context.state.items);

    })
    context.commit("changePage",page);
  },
  changeKeyWord(context,keyWord){
    context.commit('changeKeyWord',keyWord);
  },
  changeWhichStatus(context,whichStatus){
    context.commit('changeWhichStatus',whichStatus);
  },
  changeStartTime(context,startTime){
    context.commit('changeStartTime',startTime);
    console.log('改变开始时间'+'startTime:'+context.state.startTime);

  },
  changeEndTime(context,endTime){
    context.commit('changeEndTime',endTime);
  },
    changePageSize(context,pageSize){
      context.commit('changePageSize',pageSize);
    },
  // loadListData(context,pageNum){
  //   axios.get('http://address:port/productCenter/productDataDeclareCallback?page='+pageNum+'&&pagesize=10').then((res)=>{
  //      var res = res.data;
  //      context.state.items=res.ProductInfos;
  //      console.log(context.state.items);

  //   })
  //   context.commit("loadListData",pageNum);
  // },

     /*修改table数据*/
    changePageSelected(context,pageSelected){
      context.commit('changePageSelected',pageSelected);
    },

    loadListData(context,paramObject){
    console.log('请求参数'+'page:'+context.state.page);
    console.log('请求参数'+'startTime:'+context.state.startTime);

    // axios.get('/productQuery/selectcontractproductall/1/10').then((res)=>{
    //    var res = res.data.data;
    //    context.commit("loadListData",res);
    //    console.log('table数据:',res);

    // })
    axios.get('/productQuery/getContractDetails/1000000000007').then((res)=>{
       var res = res.data.data;
       context.commit("loadListData",res);
       console.log('table数据:',res);

    })
  },
  setOptionState(context,optionStatus){
    context.commit('setOptionState',optionStatus);
  },
  shiftState(context,whatStateFromParent){
    context.commit('shiftState');
  },
    changePageOption(context,pageOption){
      context.commit('changePageOption');
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
export default product
