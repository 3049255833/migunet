<template>
    <div class="contract-product-add">
        <div class="main-wrapper">
            <div class="add-main">
                <div class="table-wrapper">
                    <div class="add-title">
                        合约产品新增
                    </div>
                    <div class="step-wrapper">
                        <div class="step">
                            <div class="step-item">
                                <div class="step-circle " :class="{'active': step===1||step===2||step===3}"
                                     data-attr-step='1'></div>
                                <div class="step-text">基本信息填写</div>
                            </div>
                            <div class="step-item">
                                <div class="step-circle" :class="{'active': step===3||step===2}"
                                     data-attr-step='2'></div>
                                <div class="step-text">批价配置</div>
                            </div>
                            <div class="step-item">
                                <div class="step-circle" :class="{'active': step===3}" data-attr-step='3'></div>
                                <div class="step-text">资费信息配置</div>
                            </div>
                        </div>
                    </div>
                    <router-view :productDistList="initData.productDistList"
                                 :periodUnitList="initData.experiencePeriodUnitList"
                                 :experiencePeriodUnitList="initData.experiencePeriodUnitList">
                    </router-view>
                </div>
            </div>
        </div>
    
        <!-- 操作结果modal start -->
        <modal name="addResultMsg" :adaptive="true" :draggable="true" :width="200" :height="80">
            <v-toast :name="'addResultMsg'">{{addResultMsg}}</v-toast>
        </modal>
        
    </div>
</template>
<script type="es6">
    /*   import Mock from 'mockjs'*/
    import VDate from '@/components/date'
    import VToast from '@/components/toast'
    export default {
        name: 'ContractProductAdd',
        components: {
            VDate,
            VToast
        },
        data () {
            return {
                productName:'',
                addResultMsg:'',
                step: parseInt(this.$route.name.substr(this.$route.name.length - 1, 1)),
                initData: {
                    productDistList: [],    //产品目录列表
                    experiencePeriodUnitList: [
                        {
                            optionText: '天', optionValue: '0'
                        }, {
                            optionText: '周', optionValue: '1'
                        }, {
                            optionText: '月', optionValue: '2'
                        }, {
                            optionText: '年', optionValue: '3'
                        }
                    ]    //体验产品周期单位列表
                },
                step1PostData: {},
                step2PostData: {},
                step3PostData: {},
                step1Flag: false,
                step2Flag: false,
                step3Flag: false,
                postData: {}
            }
        },
        methods: {
            /**
             * 获取产品目录列表
             * */
            getProductDistList(){
                let vm = this;
                this.$http.get(this.api.getProductDist,
                    {params: {}}).then(response => {
                    let res = response.body;
                    if (res.result.resultCode == '00000000') {
                        //todo:
                        let _resData = res.data;
                        if (_resData) {
                            _resData.forEach(function (item, index) {
                                vm.initData.productDistList.push({
                                    optionText: item.catalogName,
                                    optionValue: item.id
                                })
                            });
                        }

                    } else {

                    }

                })
            },

         

            /**
             * 提交所有数据
             * */
            save(){
                let that=this;
                this.$http.post(this.api.saveContractProduct, this.postData).then(
                    response => {
                        let res = response.body;
                        if (res.result.resultCode == '00000000') {
                            this.addResultMsg = '新增成功';
                            this.$modal.show('addResultMsg');
                            setTimeout(function(){
                                that.$router.push({'name': 'ContractProduct'})
                            },2000);
                        } else if (res.result.resultCode='00000001'){
                            this.addResultMsg = res.result.resultMessage;
                            this.$modal.show('addResultMsg');
                        }
                    }
                );
            }
        },
        watch:{
            '$route.name'(a,b){
                if(a=='Step1'){
                    this.step=1
                }else if(a=='Step2'){
                    this.step=2
                }else{
                    this.step=3
                }
            }
        },
        created () {
            let that = this;
            /**
             * 初始化获取产品目录数据
             * */
            this.getProductDistList();

            
            /**
             * 获取步骤一的数据
             * */
            this.bus.$on('step1Bus', res => {
                let _step = parseInt(res.step);
                this.step = _step;
                this.step1PostData = res.data;
                this.$router.push({'name': 'Step2'})
                this.step1Flag = true;

                Object.keys(this.step1PostData).forEach(function (context) {
                    that.postData[context] = that.step1PostData[context];
                });
                
                console.log('step-1',this.postData);
            });
            /**
             * 获取步骤二的数据
             * */
            this.bus.$on('step2Bus', res => {
                let _step = parseInt(res.step);
                this.step = _step;
                this.step2PostData = res.data;
                this.$router.push({'name': 'Step3'})
                this.step2Flag = true;


                Object.keys(this.step2PostData).forEach(function (context) {
                    that.postData[context] = that.step2PostData[context];
                });

                console.log('step-2',this.postData);
            });
            /**
             * 获取步骤三的数据
             * */
            this.bus.$on('step3Bus', res => {
    
                this.step3PostData = res.data;
                Object.keys(this.step3PostData).forEach(function (context) {
                    that.postData[context] = that.step3PostData[context];
                });
                this.step3Flag = true;

                console.log('step-3',this.postData);
                if(this.step1Flag&&this.step2Flag&&this.step3Flag){
                    console.log('触发了保存')
                    this.save();
                }
            });
            /**
             * 获取产品名
             * */
            this.bus.$on('sendProductNameBus',res=>{
                this.productName=res;
            });
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .tb-reset {
        display: inline-block;
        font-size: 14px;
        color: #46bafe;
        width: 74px;
        height: 32px;
        background: #fff;
        line-height: 32px;
        border: 1px solid #46bafe;
        cursor: default;
        box-sizing: border-box;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }
    
    /*.tb-reset:hover{
      
    }*/
    .tb-search {
        background: #46bafe;
        color: #ffffff;
    }
    
    .l-content-w {
        margin-right: 20px;
    }
    
    .step-wrapper {
        padding: 15px 0;
        background: #f2f8ff;
    }
    
    .step {
        width: 500px;
        margin: 0 auto;
        position: relative;
    }
    
    .step:before {
        content: '';
        width: 420px;
        display: block;
        height: 1px;
        background: #d6e1e5;
        position: absolute;
        left: 30px;
        top: 23px;
    }
    
    .step:after {
        content: '';
        clear: both;
        display: block;
    }
    
    .step-item {
        float: left;
    }
    
    .step-item + .step-item {
        
        margin-left: 145px;
    }
    
    .step-text {
        text-align: center;
        color: #171717;
        font-size: 12px;
        margin-top: 8px;
    }
    
    .step-circle {
        position: relative;
        width: 40px;
        height: 40px;
        border: solid 1px #d6e1e5;
        border-radius: 50%;
        margin: 0 auto;
        background: #f2f8ff;
    }
    
    .step-circle:after {
        content: attr(data-attr-step);
        position: absolute;
        left: 50%;
        top: 50%;
        width: 23px;
        height: 23px;
        color: white;
        font-size: 12px;
        text-align: center;
        line-height: 23px;
        background: #d6e1e5;
        transform: translate(-50%, -50%);
        border-radius: 50%;
    }
    
    .step-circle.active:after {
        background: #46bafe;
    }
    
    .container {
        width: 100%;
    }
    
    .main-wrapper {
        background: #f4f4f4;
    }
    
    .nav-wrapper {
        float: left;
    }
    
    .table-wrapper {
        /*float: left;*/
        /*margin-left: 20px;*/
        /*width: 1050px;*/
        background: #ffffff;
        padding-bottom: 30px;
    }
    
    /*.main-wrapper:after{
      content: '';
      display: block;
      clear: both;
    }*/
    .main-wrapper:before,
    .main-wrapper:after {
        content: " ";
        display: table;
    }
    
    .main-wrapper:after {
        clear: both;
    }
    
    .date-wrapper {
        
    }
    
    .bread-link:hover {
        color: #46bafe;
        cursor: pointer;
    }
    
    .input-row + .input-row {
        margin-top: 18px;
    }
    
    .row-wrapper {
        display: inline-block;
        width: 200px;
        background: #ffffff;
    }
    
    .row-wrapper-ta {
        width: 340px;
        height: 80px;
    }
    
    .row-wrapper textarea {
        width: 340px;
        height: 80px;
        box-sizing: border-box;
    }
    
    .row-wrapper input {
        width: 200px;
        height: 32px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
    }
    
    .input-text {
        width: 165px;
        display: inline-block;
        line-height: 32px;
        margin-right: 70px;
        text-align: right;
        vertical-align: top;
    }
    
    .required {
        color: red;
    }
    
    #city-select {
        background: #ffffff;
        width: 200px;
        height: 32px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
        background: url("../../../../assets/def.png") no-repeat 97% 7px;
        border-radius: 0;
    }
    
    .row-wrapper-no {
        background: transparent;
        margin-top: 10px;
    }
    
    .add-title {
        font-size: 14px;
        color: #292c31;
        font-weight: bold;
        line-height: 50px;
        padding-left: 20px;
    }
    
    .add-main {
        background: #f4f4f4;
    }
    
    .input-area {
        margin-top: 30px;
        padding-left: 40px;
    }
</style>