<template>
    <div class="business-area-chose">
        <div class="area-content">
            <div class="form-row clearfix no-pd" v-for="(itemRow,rowIndex) in areaList">
                <div class="area-code">{{itemRow.codeName}}</div>
                <ul class="area-list ">
                   <li v-for="(itemArea,colIndex) in itemRow.list" :class="{'active':itemArea.active}" @click="getArea(rowIndex,colIndex,itemArea.areaName,itemArea.areaCode,itemArea.areaId)">{{itemArea.areaName}}</li>
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
                { codeName:'ABCDEFG',list:[{areaName:'安徽省',areaCode:'551',areaId:'000',active:false},{areaName:'福建省',areaCode:'591',areaId:'000',active:false},{areaName:'甘肃省',areaCode:'931',areaId:'000',active:false},{areaName:'广东省',areaCode:'200',areaId:'000',active:false},{areaName:'广西省',areaCode:'771',areaId:'000',active:false},{areaName:'贵州省',areaCode:'851',areaId:'000',active:false}]},
                { codeName:'HIJKLMN',list:[{areaName:'海南省',areaCode:'898',areaId:'000',active:false},{areaName:'河北省',areaCode:'311',areaId:'000',active:false},{areaName:'河南省',areaCode:'371',areaId:'000',active:false},{areaName:'黑龙江省',areaCode:'451',areaId:'000',active:false},{areaName:'湖北省',areaCode:'270',areaId:'000',active:false},{areaName:'湖南省',areaCode:'731',areaId:'000',active:false},{areaName:'吉林省',areaCode:'431',areaId:'000',active:false}
                    ,{areaName:'江苏省',areaCode:'250',areaId:'000',active:false},{areaName:'江西省',areaCode:'791',areaId:'000',active:false},{areaName:'辽宁省',areaCode:'240',areaId:'000',active:false},{areaName:'内蒙古省',areaCode:'471',areaId:'000',active:false}
                ]},
                { codeName:'OPQRST',list:[{areaName:'青海省',areaCode:'971',areaId:'000',active:false},{areaName:'山东省',areaCode:'531',areaId:'000',active:false},{areaName:'山西省',areaCode:'351',areaId:'000',active:false},{areaName:'陕西省',areaCode:'290',areaId:'000',active:false},{areaName:'四川省',areaCode:'280',areaId:'000',active:false}]},
                { codeName:'UVWXYZ',list:[{areaName:'云南省',areaCode:'871',areaId:'000',active:false},{areaName:'浙江省',areaCode:'571',areaId:'000',active:false}]},
                { codeName:'全国',list:[{areaName:'全国',areaId:'000',active:false,areaCode:'000'}]}
            ]
            
        }
    },
    methods:{
        /**
         * 获取选中的归属地
         * */
        getArea(rowIndex,colIndex,areaName,areaCode,areaId){
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
                    areaCode:areaCode,
                    areaId:areaId
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