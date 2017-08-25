<template>
    <div class="business-area-chose">
        <div class="area-content">
            <div class="form-row clearfix no-pd" v-for="(itemRow,rowIndex) in areaList">
                <div class="area-code">{{itemRow.code}}</div>
                <ul class="area-list ">
                   <li v-for="(itemArea,colIndex) in itemRow.list" :class="{'active':itemArea.active}" @click="getArea(rowIndex,colIndex,itemArea.area,itemArea.code)">{{itemArea.area}}</li>
                </ul>
            </div>
            <div class="btn-group btn-group-center">
                <div class="btn btn-primary btn-middle-100" :class="{'unable':businessArea.length<1}" @click="saveArea()">确定</div>
                <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:'BusinessAreaChose',
    props: {
        modalName: String
    },
    data(){
        return{
            areaNum:0,
            businessArea:'',
            areaSelectList:[],
            areaList:[
                { code:'ABCDEFG',list:[{area:'安徽省',code:'551',active:false},{area:'福建省',code:'591',active:false},{area:'甘肃省',code:'931',active:false},{area:'广东省',code:'200',active:false},{area:'广西省',code:'771',active:false},{area:'贵州省',code:'851',active:false}]},
                { code:'HIJKLMN',list:[{area:'海南省',code:'898',active:false},{area:'河北省',code:'311',active:false},{area:'河南省',code:'371',active:false},{area:'黑龙江省',code:'451',active:false},{area:'湖北省',code:'270',active:false},{area:'湖南省',code:'731',active:false},{area:'吉林省',code:'431',active:false}
                    ,{area:'江苏省',code:'250',active:false},{area:'江西省',code:'791',active:false},{area:'辽宁省',code:'240',active:false},{area:'内蒙古省',code:'471',active:false}
                ]},
                { code:'OPQRST',list:[{area:'青海省',code:'971',active:false},{area:'山东省',code:'531',active:false},{area:'山西省',code:'351',active:false},{area:'陕西省',code:'290',active:false},{area:'四川省',code:'280',active:false}]},
                { code:'UVWXYZ',list:[{area:'云南省',code:'871',active:false},{area:'浙江省',code:'571',active:false}]},
                { code:'全国',list:[{area:'全国',active:false,code:'000'}]}
            ]
            
        }
    },
    methods:{
        /**
         * 获取选中的归属地
         * */
        getArea(rowIndex,colIndex,areaName,areaCode){
            //单选下才执行
            /*this.areaList.forEach(function(item){
               item.list.forEach(function(area){
                   area.active=false;
               })
            });*/
            this.areaList[rowIndex].list[colIndex].active=!this.areaList[rowIndex].list[colIndex].active;
            this.businessArea=areaName;
            
            //点击push或移除某一项
            if(this.areaList[rowIndex].list[colIndex].active){
                this.areaSelectList.push({
                    areaName:areaName,
                    areaCode:areaCode
                });
            }else{
                //获取当前数组所在的位置
                this.areaSelectList.forEach(function(item,index){
                    if(item.areaCode==areaCode){
                        this.areaSelectList.splice(index,1);
                        return
                    }
                })
              
            }
        },
        /**
         * 取消选择归属地
         * */
        cancel(){
            this.$modal.hide(this.modalName);
        },
        /**
         * 保存归属地
         * */
        saveArea(){
            this.bus.$emit('areaChoseBus',this.areaSelectList);
            this.$modal.hide(this.modalName);
        }
    }
}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    .area-content{
        padding: 22px 39px 28px 25px;
        .form-row{
        }
        .area-code{
            float: left;
            width: 85px;
            margin-right: 20px;
            color: #6d7684;
            font-size: 14px;
            line-height: 32px;
        }
        ul{
            width: 600px;
            float: left;
        }
        li{
            float: left;
            width: 76px;
            height: 32px;
            margin-bottom: 20px;
            line-height: 32px;
            color: #40b6fa;
            text-align: center;
            cursor: pointer;
            font-size: 14px;
            box-sizing: border-box;
            border: 1px solid transparent;
            &.active{
                border: 1px solid #40b6fa;
                border-radius: 2px;
            }
        }
        .btn-group{
            text-align: center;
            .btn:nth-child(1){
                margin-right: 20px;
            }
        }
    }
</style>