<template>
<div class="table-container">
    <div class="main-area">
    <table class="NewTable2">
      <thead>
      <tr>
        <td width="150">提交时间</td>
        <td>申请类型</td>
        <td>CP／TP ID</td>
        <td>审批结果</td>
        <td>审批失败原因</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items">
        <td>
          <div class="l-app-name">{{item.Name}}</div>
        </td>
        <td>{{item.ProductId}}</td><td>{{item.CpId}}</td>
        
        <td v-if="item.Fee==0" class="tb-fail">
        	不通过
        </td>
        <td v-else class="tb-success">
        	通过
        </td>
        <td><span>{{item.Status}}</span></td>
        <!-- <td class="option td-blue">详情<span class="td-detail td-blue" >详情</span>
        </td> -->
      </tr>
      </tbody>
    </table>
  </div>
  </div>
  

</template>

<script>
import Mock from 'mockjs'
import axios from 'axios'
var Random = Mock.Random
Random.extend({
    constellation: function(date) {
        var constellations = ['全职高手1', '全职高手2', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    }
})
Random.constellation();
// => "水瓶座"
var data1 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback',{    
  "ProductInfos|1-10":[
  {
"ProductId|988221-9009876988":0,
"Name":"@CONSTELLATION",
"Describe":"产品描述",
"Keys":"关键字1，关键字2",
"CpId|988221-9009876988":1,
"ProductLine":"归属产品线1",
"Status|1-7":1,
"ChargeType":1,
"PayType":1,
"PlatformType":1,
"BossId":"100001",
"ProductType":1,
"Fee|0-1":0,
"EnableTag":0,
"StartTime":"2017-07-13 19:21:00",
"EndTime":"2017-09-01 10:00:00",
},

]

});
var data2 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback?page=1&&pagesize=10',{    
  "ProductInfos|10":[
  {
"ProductId|988221-9009876988":0,
"Name":"@CONSTELLATION",
"Describe":"产品描述",
"Keys":"关键字1，关键字2",
"CpId|988221-9009876988":1,
"ProductLine":"归属产品线1",
"Status|1-7":1,
"ChargeType":1,
"PayType":1,
"PlatformType":1,
"BossId":"100001",
"ProductType":1,
"Fee|0-1":0,
"EnableTag":0,
"StartTime":"2017-07-13 19:21:00",
"EndTime":"2017-09-01 10:00:00",
},

]

});
var data3 = Mock.mock('http://address:port/productCenter/productDataDeclareCallback?id=100200300',{    
  "ProductInfos|10":[
  {
"ProductId|988221-9009876988":0,
"Name":"@CONSTELLATION",
"Describe":"产品描述",
"Keys":"关键字1，关键字2",
"CpId|988221-9009876988":1,
"ProductLine":"归属产品线1",
"Status|1-7":1,
"ChargeType":1,
"PayType":1,
"PlatformType":1,
"BossId":"100001",
"ProductType":1,
"Fee|0-1":0,
"EnableTag":0,
"StartTime":"2017-07-13 19:21:00",
"EndTime":"2017-09-01 10:00:00",
},

]

});
 // console.log(JSON.stringify(data, null, 4));



  export default {
    name: 'Table',
    components:{
      
    },
    data ()
  {
    return {
      items: [],
      totalPage:1
    }
  },
  computed:{
    showStatus:function(){
      // return this.items.filter(function(item){
      //   if(item.Status==1){
      //     item.Status='上线';
      //   }
      //   if(item.Status==2){
      //     item.Status='报备';
      //   }
      //   return item.Status;
      // });
    }

  },
  created(){
    axios.get('http://address:port/productCenter/productDataDeclareCallback').then((res)=>{
       var res = res.data;
       this.items=res.ProductInfos;
    })

  },
  methods:{
    
  }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.table-container{
  background: #ffffff;
}
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .NewTable2 {
    width: 100%;
    font-size: 14px;
    color: #333;    
    padding-top: 20px;
  }

  .NewTable2 thead {
    background: #f2f8ff;
  }

  legend, td, th {
    padding: 0;
  }

  .NewTable2 td, .dialog-ctn, .l-content-button, .nl-table, .tb-reset {
    text-align: center;
  }

  .NewTable2 td {
    padding: 8px;
    /*border-right: solid 1px #e1e1e1;*/
    border-bottom: solid 1px #e1e1e1;
  }
  .NewTable2 tbody tr:hover{
    background: #f7f7f7;
  }

  .btn, .l-app-name {
    white-space: nowrap;
  }

  .l-app-name {
    width: 143px;
    display: block;
    word-wrap: normal;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .td-detail, .td-edit {
    margin-right: 15px;
    cursor: default;
  }

  .l-go, .td-delete, .td-detail, .td-edit {
    display: inline-block;
  }

  .td-blue {
    color: #6dadef !important;
  }

  .td-red {
    color: #f16767 !important;
  }
  .option{
    text-align: left !important;
  }
  .tab-wrapper{
    background: #f4f4f4;
  }
  .tab-wrapper:after{
    content:'';
    display: block;
    clear: both;
  }
  .tab-item{
    float: left;
    line-height: 46px;
    margin-right: 10px;
    color:#1e1e1e;
    font-size:14px;
    background: #e5e6e8;
    padding: 0 10px;
    cursor: pointer;
  }
  .tab-item.active{
    background: #ffffff;
  }
  .tb-fail{
  	color:#ca3a28;
  }
  .tb-success{
  	color:#72af43;
  }
</style>
