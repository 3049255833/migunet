<template>
    <div class="business-area-chose">
        <div class="area-content">
            <div class="form-row clearfix no-pd" v-for="(itemRow,rowIndex) in areaList">
                <div class="area-code">{{itemRow.sort}}</div>
                <ul class="area-list ">
                    <li v-for="(itemArea,colIndex) in itemRow.list" :class="{'active':itemArea.active}"
                        @click="getArea(rowIndex,colIndex,itemArea.attributionName,itemArea. attributionCode,itemArea.id)">
                        {{itemArea.attributionName}}
                    </li>
                </ul>
            </div>
            <div class="btn-group btn-group-center">
                <div class="btn btn-primary btn-middle-100" :class="{'unable':businessArea.length<1}"
                     @click="saveArea()">确定
                </div>
                <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'BusinessAreaChose',
        props: {
            modalName: String
        },
        data(){
            return {
                areaNum: 0,
                businessArea: '',
                areaSelectList: [],
                areaList: [
                    {
                        sort: 'ABCDEFG',
                        list: [{attributionName: '安徽省', attributionCode: '551', id: '000', active: false}, {
                            attributionName: '福建省',
                            attributionCode: '591',
                            id: '000',
                            active: false
                        }, {attributionName: '甘肃省', attributionCode: '931', id: '000', active: false}, {
                            attributionName: '广东省',
                            attributionCode: '200',
                            id: '000',
                            active: false
                        }, {attributionName: '广西省', attributionCode: '771', id: '000', active: false}, {
                            attributionName: '贵州省',
                            attributionCode: '851',
                            id: '000',
                            active: false
                        }]
                    },
                    {
                        sort: 'HIJKLMN',
                        list: [{attributionName: '海南省', attributionCode: '898', id: '000', active: false}, {
                            attributionName: '河北省',
                            attributionCode: '311',
                            id: '000',
                            active: false
                        }, {attributionName: '河南省', attributionCode: '371', id: '000', active: false}, {
                            attributionName: '黑龙江省',
                            attributionCode: '451',
                            id: '000',
                            active: false
                        }, {attributionName: '湖北省', attributionCode: '270', id: '000', active: false}, {
                            attributionName: '湖南省',
                            attributionCode: '731',
                            id: '000',
                            active: false
                        }, {attributionName: '吉林省', attributionCode: '431', id: '000', active: false}
                            , {attributionName: '江苏省', attributionCode: '250', id: '000', active: false}, {
                                attributionName: '江西省',
                                attributionCode: '791',
                                id: '000',
                                active: false
                            }, {attributionName: '辽宁省', attributionCode: '240', id: '000', active: false}, {
                                attributionName: '内蒙古省',
                                attributionCode: '471',
                                id: '000',
                                active: false
                            }
                        ]
                    },
                    {
                        sort: 'OPQRST',
                        list: [{attributionName: '青海省', attributionCode: '971', id: '000', active: false}, {
                            attributionName: '山东省',
                            attributionCode: '531',
                            id: '000',
                            active: false
                        }, {attributionName: '山西省', attributionCode: '351', id: '000', active: false}, {
                            attributionName: '陕西省',
                            attributionCode: '290',
                            id: '000',
                            active: false
                        }, {attributionName: '四川省', attributionCode: '280', id: '000', active: false}]
                    },
                    {
                        sort: 'UVWXYZ',
                        list: [{attributionName: '云南省', attributionCode: '871', id: '000', active: false}, {
                            attributionName: '浙江省',
                            attributionCode: '571',
                            id: '000',
                            active: false
                        }]
                    },
                    {sort: '全国', list: [{attributionName: '全国', id: '000', active: false, attributionCode: '000'}]}
                ]

            }
        },
        methods: {
            /**
             * 获取选中的归属地
             * */
            getArea(rowIndex, colIndex, attributionName, attributionCode, id){
                //单选下才执行
                /*this.areaList.forEach(function(item){
                 item.list.forEach(function(area){
                 area.active=false;
                 })
                 });*/
                this.areaList[rowIndex].list[colIndex].active = !this.areaList[rowIndex].list[colIndex].active;
                this.businessArea = attributionName;

                //点击push或移除某一项
                if (this.areaList[rowIndex].list[colIndex].active) {
                    this.areaSelectList.push({
                        attributionName: attributionName,
                        attributionCode: attributionCode,
                        id: id
                    });
                } else {
                    //获取当前数组所在的位置
                    this.areaSelectList.forEach(function (item, index) {
                        if (item.attributionCode == attributionCode) {
                            this.areaSelectList.splice(index, 1);
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
                this.$emit('areaChoseBus', this.areaSelectList);
                this.$modal.hide(this.modalName);
            },

            /**
             * 获取业务归属地编码
             * */
            getPdAttribution(){
                this.$http.get(this.api.findPdAttribution).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        //todo:
                        this.areaList = res.data;
                    } else {

                    }
                })
            }
        },
        mounted(){
            this.getPdAttribution()
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .area-content {
        padding: 22px 39px 28px 25px;
        .form-row {
        }
        .area-code {
            float: left;
            width: 85px;
            margin-right: 20px;
            color: #6d7684;
            font-size: 14px;
            line-height: 32px;
        }
        ul {
            width: 600px;
            float: left;
        }
        li {
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