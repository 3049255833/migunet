<template>
    <div class="business-area-chose">
        <div class="area-content">
            <div class="area-list">
                <div class="area-item"
                    v-for="(item,index) in areaList"
                    :class="{'active':areaList[index].active}"
                    @click="getArea(index,item.key)"
                    v-if="item.key != null">
                    {{item.key}}
                </div>
            </div>

            <div class="btn-group btn-group-center">
                <div class="btn btn-primary btn-middle-100"
                     :class="{'unable':productAreaName.length<1}"
                     @click="saveArea()">确定
                </div>

                <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'productAreaChoose',
        props: {
            modalName: String,
            areaList: Array,
            index: Number,
            subIndex: Number
        },
        data(){
            return {
                areaNum: 0,
                productAreaName: '',
                areaSelectList: []
            }
        },
        methods: {
            /**
             * 获取选中的归属地
             * */
            getArea(index, areaName){

                let that = this;

                this.areaList[index].active = !this.areaList[index].active;

                this.productAreaName = areaName;

                //点击push或移除某一项
                if (this.areaList[index].active) {
                    this.areaSelectList.push({
                        areaName: areaName
                    });

                    console.log("areaSelectList: " + JSON.stringify(this.areaSelectList));
                } else {
                    //获取当前数组所在的位置
                    this.areaSelectList.forEach(function (item, index) {

                        console.log("item: " + JSON.stringify(item));

                        console.log("index: " + index);

                        if (item.areaName == areaName) {
                            that.areaSelectList.splice(index, 1);

                            return false;
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
                this.$emit('areaChoseBus', {index:this.index,subIndex:this.subIndex,data:this.areaSelectList});
                this.$modal.hide(this.modalName);
            },

            /**
             * 获取业务归属地编码
             * */
            /*getPdAttribution(){
                this.$http.get(this.api.findPdAttribution).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        //todo:
                        this.areaList = res.data;
                    } else {

                    }
                })
            }*/
        },
        mounted(){
            //this.getPdAttribution()
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .area-content {
        padding: 22px 39px 28px 25px;

        .area-list {
            max-height: 200px;
            overflow-y: auto;
            min-height: 200px;
        }

        .area-item {
            float: left;
            width: 76px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            height: 32px;
            margin-bottom: 20px;
            line-height: 32px;
            color: #40b6fa;
            text-align: center;
            cursor: pointer;
            font-size: 14px;
            box-sizing: border-box;
            border: 1px solid transparent;

            &.active {
                border: 1px solid #40b6fa;
                border-radius: 2px;
            }
        }

        .btn-group {
            text-align: center;

            .btn:nth-child(1) {
                margin-right: 20px;
            }
        }
    }
</style>
