<template>
    <div class="business-area-chose">
        <div class="area-content">
            <div class="form-row clearfix" v-for="(itemRow,rowIndex) in areaList">
                <div class="area-code">{{itemRow.code}}</div>
                <ul class="area-list ">
                   <li v-for="(itemArea,colIndex) in itemRow.list" :class="{'active':itemArea.active}" @click="getArea(rowIndex,colIndex,itemArea.area)">{{itemArea.area}}</li>
                </ul>
            </div>
            <div class="btn-group">
                <div class="btn btn-primary btn-middle" :class="{'unable':businessArea.length<1}" @click="saveArea()">确定</div>
                <div class="btn btn-default btn-middle" @click="cancel">取消</div>
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
            businessArea:'',
            areaList:[
                { code:'ABCDEFG',list:[{area:'安徽省',active:false},{area:'福建省',active:false},{area:'甘肃省',active:false},{area:'广东省',active:false},{area:'广西省',active:false},{area:'贵州省',active:false}]},
                { code:'HIJKLMN',list:[{area:'海南省',active:false},{area:'河北省',active:false},{area:'河南省',active:false},{area:'黑龙江省',active:false},{area:'湖北省',active:false},{area:'湖南省',active:false},{area:'吉林省',active:false}
                    ,{area:'江苏省',active:false},{area:'江西省',active:false},{area:'辽宁省',active:false},{area:'内蒙古省',active:false}
                ]},
                { code:'OPQRST',list:[{area:'青海省',active:false},{area:'山东省',active:false},{area:'山西省',active:false},{area:'陕西省',active:false},{area:'四川省',active:false}]},
                { code:'UVWXYZ',list:[{area:'云南省',active:false},{area:'浙江省',active:false}]},
                { code:'全国',list:[{area:'全国',active:false}]}
            ]
            
        }
    },
    methods:{
        /**
         * 获取选中的归属地
         * */
        getArea(rowIndex,colIndex,areaName){
            this.areaList.forEach(function(item){
               item.list.forEach(function(area){
                   area.active=false;
               })
            });
            this.areaList[rowIndex].list[colIndex].active=!this.areaList[rowIndex].list[colIndex].active;
            this.businessArea=areaName;
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
            this.bus.$emit('getBusinessArea',this.businessArea);
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