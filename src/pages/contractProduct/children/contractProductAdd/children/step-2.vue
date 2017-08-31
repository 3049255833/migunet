<template>
    <div class="add-step-2">
        <div class="step-layout">
            <div class="product-txt">
                <p>
                    <span class="left">产品ID：209000000920</span>
                    <span class="middle">|</span>
                    <span class="right">产品名称（中文）：动漫5元包</span>
                </p>
            </div>
            <div class="strategy-type-content">
                <h3><span class="required">*</span>批假策略类型</h3>
                <div class="type-list">
                    <article class="item" v-for="(item,index) in prmLists">
                        <div class="item-add-del-group">
                            <div>
                                <i class="icon icon-add-blue"></i>
                            </div>
                            <div>
                                <i class="icon icon-del-blue"></i>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="row-left font-12 required w-100">是否免费：</div>
                            <div class="row-right">
                                <div class="radio-wrap">
                                    <label class="radio-module w-70">
                                        <input value="0" v-model="item.isFree" type="radio">
                                        <span></span>
                                        <span class="txt">收费</span>
                                    </label>
                                    <label class="radio-module w-70">
                                        <input value="1" v-model="item.isFree" type="radio">
                                        <span></span>
                                        <span class="txt">免费</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-row" v-if="item.isFree=='0'">
                            <div class="row-left font-12 required w-100">资费计划：</div>
                            <div class="row-right">
                                <!-- this.prmLists[index].planCodeData-->
                                <div class="textarea-module" placeholder="请选择" @click="chosePlanCode(index)">
                                    <p v-if="item.planCodeData.planCode&&item.planCodeData.planCode.length>0">
                                        计划编码：{{item.planCodeData.planCode}}</p>
                                    <p v-if="item.planCodeData.planName&&item.planCodeData.planName.length>0">
                                        计划名称：{{item.planCodeData.planName}}</p>
                                    <p v-if="item.planCodeData.planDesc&&item.planCodeData.planDesc.length>0">
                                        计划说明：{{item.planCodeData.planDesc}}</p>
                                </div>
                                <i class="icon icon-select"></i>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="row-left font-12 required w-100">条件选择：</div>
                            <div class="row-right">
                                <div class="select-group-item">
                                    <div class="radio-wrap">
                                        <label class="radio-module  w-115">
                                            <input value="1" v-model="item.contentLimit" name="free" type="radio">
                                            <span></span>
                                            <span class="txt">内容限定</span>
                                        </label>
                                        <label class="radio-module w-115">
                                            <input value="2" v-model="item.contentLimit" name="free" type="radio">
                                            <span></span>
                                            <span class="txt">产品限定</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="content-limit" v-if="item.contentLimit=='1'">
                                    <div v-for="(subItem,subIndex) in item.pmLists" class="select-group-item">
                                        <div class="layout-inline-middle mr-10" v-if="!subIndex==0">
                                            <v-select-box w="60" selectTitle="并且" selectType="1"
                                                          v-bind:options="['并且','或者']"></v-select-box>
                                        </div>
                                        <div class="layout-inline-middle">
                                            <v-content-limit-select-box w="200"
                                                                        :defaultTitle="'请选择'"
                                                                        :selectTitle="initPdMatchFileDListsOption.fieldDesc"
                                                                        :pmListIndex="{'index':index,'subIndex':subIndex}"
                                                                        v-bind:options="pdMatchFiledLists"></v-content-limit-select-box>
                                        </div>
                                        <span class="row-text">等于</span>
                                        <div class="layout-inline-middle">
                                            <v-pd-content-select-box w="200" selectTitle=""
                                                                     defaultTitle="请选择"
                                                                     :pmListIndex="{'index':index,'subIndex':subIndex}"
                                                                     v-bind:options="subItem.pdContentList"></v-pd-content-select-box>
                                        </div>
                                        <div class="layout-inline-middle">
                                            <i class="icon icon-add-blue" @click="addSubItem(index,subIndex)"></i>
                                            <i class="icon icon-del-blue" @click="delSubItem(index,subIndex)"
                                               v-if="!subIndex==0"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-limit" v-else>
                                    <div class="textarea-module">
                                        <table class="table-module ">
                                            <thead>
                                            <tr>
                                                <td width="40%">产品编码</td>
                                                <td width="60%">产品名称</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>123456</td>
                                                <td>老司机计划</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span class="icon icon-select"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <div class="btn-group">
                        <div class="btn btn-primary btn-middle" @click="nextStep">下一步</div>
                        <div class="btn btn-default btn-middle">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <modal name="productCodeModal" :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="'产品选择'" :name="'productCodeModal'">
                <v-product-code-list></v-product-code-list>
            </t-modal-sub-container>
        </modal>
        <!--资费计划id modal-->
        <modal name="planCodeListModal" :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="'选择资费计划'" :name="'planCodeListModal'">
                <v-plan-code-list :modalName="'planCodeListModal'" :index="planCodeIndex"></v-plan-code-list>
            </t-modal-sub-container>
        </modal>
    </div>
</template>
<script>
    import VSelectBox from '@/components/select-box';
    import VContentLimitSelectBox from '@/pages/contractProduct/children/contractProductAdd/components/content-limit-select-box.vue'
    import VPdContentSelectBox from '@/pages/contractProduct/children/contractProductAdd/components/pd-content-select-box.vue'
    import VProductCodeList from '../components/product-code-list.vue';
    import TModalSubContainer from "@/components/modal-sub-container";
    import VPlanCodeList from  '@/pages/contractProduct/children/contractProductAdd/components/plan-code-list.vue'
    

    export default{
        data(){
            return {
                planCodeIndex: 0,

                pmListIndex: {
                    index: 0,
                    subIndex: 0
                },

                formData: {},
                prmLists: [
                    {
                        isFree: '0',
                        planCodeData: {},
                        contentLimit: '1',
                        pmLists: [
                            {
                                tableName: this.initPdMatchFileDListsOption.tableName,
                                fieldName: this.initPdMatchFileDListsOption.fieldName,
                                operator: this.initPdMatchFileDListsOption.operator,
                                valueType: this.initPdMatchFileDListsOption.valueType,
                                matchValues: this.initPdMatchFileDListsOption.matchValues,
                                pdContentList:this.initPdMatchFileDListsOption.tableName.pdContentList
                            }
                        ],
                    }
                ],

                postData: {
                    prmLists: []
                },
                pdMatchFiledLists: [],
                initPdMatchFileDListsOption:{
                    tableName: '',
                    fieldName: '',
                    operator: '',
                    valueType: '',
                    matchValues:'',
                    pdContentList:[]
                }


            }
        },
        components: {
            VSelectBox,
            VProductCodeList,
            TModalSubContainer,
            VPlanCodeList,
            VContentLimitSelectBox,
            VPdContentSelectBox
        },
        methods: {
            nextStep(){
                this.bus.$emit('curStep', 3);
                this.$router.push({'name': 'Step3'});
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },
            showProductCodeModal(){
                this.$modal.show('productCodeModal');
            },
            beforeClose(){

            },
            /**
             * 获取匹配字段表
             * */
            findPdMatchFiled(){
                this.$http.get(this.api.findPdMatchFiled).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        this.pdMatchFiledLists = res.data;
                        if(this.pdMatchFiledLists.length>0){
                            this.initPdMatchFileDListsOption = this.pdMatchFiledLists[0];
                        }
                    } else {

                    }

                })
            },

            /**
             * 添加子项目
             * */
            addSubItem(index, subIndex){
                this.prmLists[index].pmLists.splice(subIndex + 1, 0, {
                    tableName: '',
                    fieldName: '',
                    operator: '',
                    valueType: '',
                    matchValues: '',
                    pdContentList:[]
                });
            },
            /**
             * 删除子项目
             * */
            delSubItem(index, subIndex){
                this.prmLists[index].pmLists.splice(subIndex, 1);
            },
            /**
             * 选择资费计划
             * */
            chosePlanCode(index){
                this.planCodeIndex = index;
                this.$modal.show('planCodeListModal');
            }
        },
        mounted(){
            let that = this;
            /**
             * 获取资费计划的值
             * */
            this.bus.$on('planCodeBus', res => {
                //有数据传过来
                let index = res.index;
                if (res) {
                    this.prmLists[index].planCodeData = res.planCodeData[0]
                }
            });

            /**
             * 获取匹配字段表
             * */
            this.findPdMatchFiled();


            /**
             * 选中匹配字段下拉框选项
             * */
            this.bus.$on('contentLimitSelectBoxBus', res => {
                if (res) {
                    let index = res.pmListIndex.index;
                    let subIndex = res.pmListIndex.subIndex;
                    let _postData = {
                        tableName: '',
                        fieldName: ''
                    };
                    let selectOption = res.selectOption;
                    this.prmLists[index].pmLists[subIndex].tableName = selectOption.tableName;
                    this.prmLists[index].pmLists[subIndex].fieldName = selectOption.fieldName;
                    this.prmLists[index].pmLists[subIndex].valueType = selectOption.valueType;
                    this.prmLists[index].pmLists[subIndex].operator = selectOption.operator;
                    this.prmLists[index].pmLists[subIndex].matchValues = selectOption.matchValues;

                    _postData.tableName = this.prmLists[index].pmLists[subIndex].tableName;
                    _postData.fieldName = this.prmLists[index].pmLists[subIndex].fieldName;

                    //请求接口
                    this.$http.get(this.api.findPdContent, {
                        params: _postData
                    }).then(
                        response => {
                            let res = response.body;
                            if (res.result.resultCode = '00000000') {
                                this.prmLists[index].pmLists[subIndex].pdContentList=res.data;
                            }
                        }
                    );

                }
            })
            
            /**
             * 选中内容下拉框选项
             * */
            this.bus.$on('pdContentSelectBoxBus', res => {
                if (res) {
                    let index = res.pmListIndex.index;
                    let subIndex = res.pmListIndex.subIndex;
                    let selectOption = res.selectOption;
                    
                }
            })
        },
        watch: {
            'prmLists'(a, b){

            }
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    $image-base-path: '../../../../../assets/';
    @mixin bg($URI, $w: null, $h: null, $x: top, $y: center, $repeat: no-repeat) {
        @if $w and $h {
            width: $w;
            height: $h;
        }
        background: url('#{$image-base-path}#{$URI}') $repeat $x $y;
        background-size: 100% 100%;
    }
    
    .add-step-2 {
        font-size: 14px;
        color: #333333;
        box-sizing: border-box;
        
        .step-layout {
            padding: 40px 87px 40px 70px;
            
        }
        
        .product-txt {
            height: 54px;
            line-height: 54px;
            padding-left: 18px;
            border: 1px dotted #d6e1e5;
            margin-bottom: 25px;
            p {
                font-size: 14px;
                color: #6d7684;
                span {
                    &.middle {
                        padding: 0 37px;
                    }
                }
            }
        }
        
        .strategy-type-content {
            h3 {
                margin-bottom: 8px;
                color: #333;
                font-size: 14px;
            }
            .type-list {
                .item {
                    position: relative;
                    height: auto;
                    padding: 29px 61px;
                    border: 1px solid #d6e1e5;
                    border-top: 4px solid #46BAFE;
                    border-radius: 6px;
                    font-size: 12px;
                    margin-bottom: 20px;
                }
                .select-group-item {
                    margin-bottom: 25px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
                .item-add-del-group {
                    position: absolute;
                    bottom: 2px;
                    right: -40px;
                    & > div {
                        width: 38px;
                        height: 38px;
                        border: 1px solid #D6E1E5;
                        border-left: none;
                        background-color: #F2F8FF;
                        text-align: center;
                        line-height: 38px;
                        &:nth-child(2) {
                            margin-top: 10px;
                        }
                    }
                }
                span {
                    &.row-text {
                        padding: 0 20px;
                    }
                }
                .textarea-module {
                    width: 465px;
                    min-height: 74px;
                    position: relative;
                    padding: 9px;
                    cursor: pointer;
                }
                input {
                    
                }
            }
        }
        
        .icon {
            &-select {
                position: absolute;
                right: 7px;
                top: 10px;
                display: inline-block;
                vertical-align: middle;
                width: 20px;
                height: 19px;
                background: url("#{$image-base-path}def.png");
                background-size: 100%;
                cursor: pointer;
            }
            &-close-round {
                position: absolute;
                right: 10px;
                top: 8px;
                display: inline-block;
                vertical-align: middle;
                width: 16px;
                height: 16px;
                background: url("#{$image-base-path}icon-close-round.png");
                background-size: 100%;
                cursor: pointer;
            }
            &-add-blue {
                margin: 0 10px;
            }
            cursor: pointer;
        }
        
        .btn-group {
            margin: 100px 0 50px;
            padding-left: 160px;
        }
    }
</style>
