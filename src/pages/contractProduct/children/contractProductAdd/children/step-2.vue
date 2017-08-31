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
                <h3 class="required">批假策略类型</h3>
                <div class="type-list">
                    <article class="item" v-for="(item,index) in prmLists">
                        <div class="item-add-del-group">
                            <div>
                                <i class="icon icon-add-blue" @click="addItem(index)"></i>
                            </div>
                            <div v-if="!index=='0'">
                                <i class="icon icon-del-blue" @click="delItem(index)"></i>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="row-left font-12 required w-100">是否免费：</div>
                            <div class="row-right">
                                <div class="radio-wrap">
                                    <label class="radio-module w-70">
                                        <input value="0" v-model="item.pdRights.isFree" type="radio">
                                        <span></span>
                                        <span class="txt">收费</span>
                                    </label>
                                    <label class="radio-module w-70">
                                        <input value="1" v-model="item.pdRights.isFree" type="radio">
                                        <span></span>
                                        <span class="txt">免费</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-row" v-if="item.pdRights.isFree=='0'">
                            <div class="row-left font-12 required w-100">资费计划：</div>
                            <div class="row-right">
                                <!-- this.prmLists[index].pdRights.planCodeData-->
                                <div class="textarea-module" placeholder="请选择" @click="chosePlanCode(index)">
                                    <p v-if="item.pdRights.planCodeData.planCode&&item.pdRights.planCodeData.planCode.length>0">
                                        计划编码：{{item.pdRights.planCodeData.planCode}}</p>
                                    <p v-if="item.pdRights.planCodeData.planName&&item.pdRights.planCodeData.planName.length>0">
                                        计划名称：{{item.pdRights.planCodeData.planName}}</p>
                                    <p v-if="item.pdRights.planCodeData.planDesc&&item.pdRights.planCodeData.planDesc.length>0">
                                        计划说明：{{item.pdRights.planCodeData.planDesc}}</p>
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
                                            <input value="1" v-model="item.pdRights.contentLimit"  type="radio">
                                            <span></span>
                                            <span class="txt">内容限定</span>
                                        </label>
                                        <label class="radio-module w-115">
                                            <input value="2" v-model="item.pdRights.contentLimit" type="radio">
                                            <span></span>
                                            <span class="txt">产品限定</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="content-limit" v-if="item.pdRights.contentLimit=='1'">
                                    <div v-for="(subItem,subIndex) in item.pmLists" class="select-group-item">
                                        <div class="layout-inline-middle mr-10" v-if="!subIndex==0">
                                            <v-is-and-select-box w="60" :selectTitle="prmLists[index].pdRights.isAndText"
                                                                 :pmListIndex="{'index':index,'subIndex':subIndex}"
                                                                 :selectValue="prmLists[index].pdRights.isAnd"
                                                                 v-bind:options="[{'optionText':'并且','optionValue':'1'},{'optionText':'或者','optionValue':'0'}]"></v-is-and-select-box>
                                        </div>
                                        <div class="layout-inline-middle">
                                            <v-content-limit-select-box w="200"
                                                                        :defaultTitle="'请选择'"
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
                                    <div class="textarea-module" @click="choseProduct">
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
        <!--获取产品编码-->
        <modal name="productSelectModal"
               :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="productSelectTitle" :name="'productSelectModal'">
                <v-product-select-modal
                        :modal-name="'productSelectModal'"
                        :productType="'1'"></v-product-select-modal>
            </t-modal-sub-container>
    
        </modal>
    </div>
</template>
<script>
    import VSelectBox from '@/components/select-box';
    import VContentLimitSelectBox from '@/pages/contractProduct/children/contractProductAdd/components/content-limit-select-box.vue'
    import VPdContentSelectBox from '@/pages/contractProduct/children/contractProductAdd/components/pd-content-select-box.vue'
    import VIsAndSelectBox from '@/pages/contractProduct/children/contractProductAdd/components/is-and-select-box.vue'
    import VProductCodeList from '../components/product-code-list.vue';
    import TModalSubContainer from "@/components/modal-sub-container";
    import VPlanCodeList from  '@/pages/contractProduct/children/contractProductAdd/components/plan-code-list.vue'
    import VProductSelectModal from '../components/product-select-modal'
    

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
                        pdRights:{
                            isFree: '0',
                            planCodeData: {},
                            planCode:'',
                            isAnd:'1',   //or :0 and:1
                            isAndText:'并且',   //
                            contentLimit: '1',    
                        },
                        pmLists: [
                            {
                                tableName: '',      //表名
                                fieldName: '',       //字段名
                                operator: '=',        //操作符
                                valueType: '',        //数值类型
                                matchValues: '',      //匹配内容
                                
                                pdContentList:[]      //匹配内容下拉框
                            }
                        ],
                    }
                ],

                postData: {
                    prmLists: []
                },
                pdMatchFiledLists: [],
                initPdMatchFileDListsOption:{}


            }
        },
        components: {
            VSelectBox,
            VProductCodeList,
            TModalSubContainer,
            VPlanCodeList,
            VContentLimitSelectBox,
            VPdContentSelectBox,
            VIsAndSelectBox,
            VProductSelectModal
        },
        methods: {
            nextStep(){
                this.save();
           /*     this.bus.$emit('curStep', 3);
                this.$router.push({'name': 'Step3'});*/
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
             * 展开产品列表弹框
             * */
            choseProduct(){
                this.$modal.show('productSelectModal');
            },
            /**
             * 添加外层项目
             * 注意：这里添加新项目时，必须初始数据，这样对vue的监听有帮助
             * */
            addItem(index){
                this.prmLists.splice(index + 1, 0,   {
                    pdRights:{
                        isFree: '0',
                        planCodeData: {},
                        planCode:'',
                        contentLimit:'1',
                        isAnd:'1',
                        isAndText:'并且'
                    },
                    pmLists: [
                        {
                            tableName: '',      //表名
                            fieldName: '',       //字段名
                            operator: '=',        //操作符
                            valueType: '',        //数值类型
                            matchValues: '',      //匹配内容
                            pdContentList:[]      //匹配内容下拉框
                        }
                    ],
                });
            },
            /**
             * 删除子项目
             * */
            delItem(index){
                this.prmLists.splice(index, 1);
            },
            
            /**
             * 添加子项目
             * */
            addSubItem(index, subIndex){
                this.prmLists[index].pmLists.splice(subIndex + 1, 0, {
                    tableName: '',
                    fieldName: '',
                    operator: '=',
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
            },
            
            /**
             * 保存数据
             * */
            save(){
              
                //存数据postData里面
                this.postData.prmLists=this.prmLists;
                
                this.$http.post(this.api.saveContractProductTwo, this.postData).then(
                    response => {
                        let res = response.body;
                    }
                );
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
                    this.prmLists[index].pdRights.planCodeData = res.planCodeData[0];
                    this.prmLists[index].pdRights.planCode= res.planCodeData[0].planCode;
                }
            });

            /**
             * 获取匹配字段表
             * */
            this.findPdMatchFiled();


            /**
             * 选中匹配字段下拉框选项
             * */
            this.bus.$on('isAndSelectBoxBus', res => {
                if (res) {
                    let index = res.pmListIndex.index;
                    let subIndex = res.pmListIndex.subIndex;
                    
                    let selectOption = res.selectOption;
                    this.prmLists[index].pdRights.isAnd = selectOption.optionValue;    //isAnd的值
                    this.prmLists[index].pdRights.isAndText = selectOption.optionText;
                    
                }
            });
            
            /**
             * 选中并且或者下拉框
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
                    this.prmLists[index].pmLists[subIndex].tableName = selectOption.tableName;    //表名
                    this.prmLists[index].pmLists[subIndex].fieldName = selectOption.fieldName;    //字段名
                    this.prmLists[index].pmLists[subIndex].valueType = selectOption.valueType;    //数值类型


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
            });
            
            /**
             * 选中内容下拉框选项
             * */
            this.bus.$on('pdContentSelectBoxBus', res => {
                if (res) {
                    let index = res.pmListIndex.index;
                    let subIndex = res.pmListIndex.subIndex;
                    let selectOption = res.selectOption;
                    this.prmLists[index].pmLists[subIndex].matchValues = selectOption;
                    console.log(this.prmLists[index].pmLists[subIndex].matchValues)
                    
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
    
        .required{
            position: relative;
            padding-left: 12px;
            &:before{
                position: absolute;
                top: 0;
                left: 0;
                content: '*';
                color: #f95a46;
                font-weight: bold;
            }
        }
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
                &.required{
                    &:before{
                        position: absolute;
                        top: 0;
                        left: 0;
                        content: '*';
                        color: #f95a46;
                        font-weight: bold;
                    }
                }
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
