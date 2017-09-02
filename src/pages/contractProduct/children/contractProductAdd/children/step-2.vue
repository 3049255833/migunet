<template>
    <div class="add-step-2">
        <div class="step-layout">
            <div class="product-txt">
                <p>
                   <!-- <span class="left">产品ID：209000000920</span>
                    <span class="middle">|</span>-->
                    <span class="right">产品名称（中文）：{{$parent.productName}}</span>
                </p>
            </div>
            <div class="strategy-type-content">
                <h3 class="required">批价策略类型</h3>
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
                                    <div class="textarea-module" @click="choseProduct(index)">
                                        <table class="table-module " v-if="item.pmLists[0].matchValues.length>0">
                                            <thead>
                                            <tr>
                                                <td width="40%">产品编码</td>
                                                <td width="60%">产品名称</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="product in item.pmLists[0].productData">
                                                <td>{{product.productCode}}</td>
                                                <td>{{product.content}}</td>
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
                        <div class="btn btn-primary btn-middle" v-if="canSave" @click="nextStep">下一步</div>
                        <div class="btn btn-primary btn-middle unable" v-else >下一步</div>
                        <div class="btn btn-default btn-middle" @click="cancel">取消</div>
                    </div>
                </div>
            </div>
        </div>
     <!--   <modal name="productCodeModal" :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="'产品选择'" :name="'productCodeModal'">
                <v-product-code-list></v-product-code-list>
            </t-modal-sub-container>
        </modal>-->
        <!--资费计划id modal-->
        <modal name="planCodeListModal" :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="'选择资费计划'" :name="'planCodeListModal'">
                <v-plan-code-list :modalName="'planCodeListModal'" :type="'radio'" :index="planCodeIndex" v-on:planCodeBus="getPlanCode"></v-plan-code-list>
            </t-modal-sub-container>
        </modal>
        <!--获取产品编码-->
        <modal name="productSelectModal"
               :width="870" :height="570" @before-close="beforeClose">
            <t-modal-sub-container :title="'产品选择'" :name="'productSelectModal'">
                <v-product-select-step-2
                        :index="productIndex"
                        :modal-name="'productSelectModal'"
                        :productType="'1'"></v-product-select-step-2>
            </t-modal-sub-container>
    
        </modal>
    </div>
</template>
<script type="es6">
    import VSelectBox from '@/components/select-box';
    import VContentLimitSelectBox from '@/pages/contractProduct/children/contractProductAdd/components/content-limit-select-box.vue'
    import VPdContentSelectBox from '@/pages/contractProduct/children/contractProductAdd/components/pd-content-select-box.vue'
    import VIsAndSelectBox from '@/pages/contractProduct/children/contractProductAdd/components/is-and-select-box.vue'
    import VProductCodeList from '../components/product-code-list.vue';
    import TModalSubContainer from "@/components/modal-sub-container";
    import VPlanCodeList from  '@/pages/contractProduct/children/contractProductAdd/components/plan-code-list.vue'
    import VProductSelectStep2 from '../components/product-select-step-2'
    

    export default{
        data(){
            return {
                productNameFromStep1:'',
                
                planCodeIndex: 0,

                pmListIndex: {
                    index: 0,
                    subIndex: 0
                },
                
                productIndex:0,

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
                                pdContentList:[],      //匹配内容下拉框
                                productData:[]
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
            VProductSelectStep2
        },
        methods: {
            nextStep(){
                this.save();
         
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
             * 获取资费计划
             * */
            getPlanCode(res){
                //有数据传过来
                let index = res.index;
                if (res) {
                    this.prmLists[index].pdRights.planCodeData = res.planCodeData[0];
                    this.prmLists[index].pdRights.planCode= res.planCodeData[0].planCode;
                }
            },
            /**
             * 展开产品列表弹框
             * */
            choseProduct(index){
                this.productIndex=index;
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
                            pdContentList:[],      //匹配内容下拉框
                            productData:[]
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
                    pdContentList:[],
                    productData:[]
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
                
                //todo:根据所选型号删除数据，避免后台报错
                this.prmLists.forEach(function(item,index){
                    //选择免费  清除资费计划  0 收费  1 免费
                    if(item.pdRights.isFree=='1'){
                        delete item.pdRights.planCode;
                    }
                    //选择内容限定,清除产品相关东西
                    if(item.pdRights.contentLimit=='1'){
                        //todo:
                    }else{
                        
                    }
                });
                
                
                this.postData.prmLists=this.prmLists;
                
                /*this.$http.post(this.api.saveContractProductTwo, this.postData).then(
                    response => {
                        let res = response.body;
                    }
                );*/
                /**
                 * 发送第二步数据到主页
                 * */
                this.bus.$emit('step2Bus',{
                    step:3,
                    data:this.postData
                })
            },

            /**
             * 取消
             * */
            cancel(){
                this.$router.push({'name': 'ContractProduct'})
            },
        },
        
        computed:{
            canSave(){
                let flag = true;
                this.prmLists.forEach(function(item,index){
                    //获取每个大项
                    //判断每个大项是否免费  收费为0
                    //如果为收费
                    if(item.pdRights.isFree=='0'){
                       
                        //得判断资费计划是否为空
                        if(!item.pdRights.planCode){
                            //如果为空，则报错
                         
                            return flag=false;
                        }
                    }
                    
                    //判断每个大项是内容限定还是产品限定
                    //如果为内容限定
                    if(item.pdRights.contentLimit=='1'){
                        item.pmLists.forEach(function(subItem,subIndex){
                            //检查每个子项的tableName判断是否选择了
                            if(!subItem.tableName){
                                return flag=false;
                            }
                            //检查每个子项的matchValue是否选择
                            if(!subItem.matchValues){
                                return flag=false;
                            }
                        })
                    }
                    //如果为产品限定
                    if(item.pdRights.contentLimit=='2'){
                        item.pmLists.forEach(function(subItem,subIndex){
                            //检查每个子项的matchValues判断是否选择了
                            if(!subItem.matchValues){
                                return flag=false;
                            }
                        })
                    }
                    
                });
                
                return flag
            }
        },
        
        watch: {
            'prmLists'(a, b){

            }
        },

        created(){
            let that = this;


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
                }
            })

            /**
             * 选中产品弹框
             * */
            this.bus.$on('productSelectStep2Bus', res => {
                if (res) {
                    let index = res.index;
                    let selectOtion=res.data;
                    let codeArr=[];
                    let data=res.data;
                    if(data.length>0){
                        data.forEach(function(item,index){
                            codeArr.push(item.productCode);
                        })
                    }
                    this.prmLists[index].pmLists[0].matchValues=codeArr.join(',');
                    this.prmLists[index].pmLists[0].tableName='pd_contract';
                    this.prmLists[index].pmLists[0].fieldName='productCode';
                    this.prmLists[index].pmLists[0].valueType='2';
                    this.prmLists[index].pmLists[0].operator='';
                    this.prmLists[index].pmLists[0].productData=data;
                    /*    console.log(this.prmLists[index].pmLists[0].productData)*/

                }
            })

          /*  /!**
             * 获取产品名
             * *!/
            this.bus.$on('sendProductNameBus', res => {
                console.log('step2Name',res);
                this.productNameFromStep1=res;
            })*/
        },
        
        destroyed(){
            this.bus.$off('productSelectStep2Bus');
            this.bus.$off('pdContentSelectBoxBus');
            this.bus.$off('contentLimitSelectBoxBus');
            this.bus.$off('isAndSelectBoxBus');
            this.bus.$off('step2Bus');
            
            
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
