<template>
    <div class="product-code">
        <div class="list-modal-head">
            <div class="search-wrap" >
                <input class="form-input vt-middle  w-150 radius-2 mr-6" type="text" v-model.trim="search"
                       @keyup.enter="findContractBySearch" placeholder="关键信息搜索">
                <div @click="findContractBySearch" class="pointer search vt-middle">
                    <i class="icon icon-search"></i>
                </div>
            </div>
        </div>
        <div class="table-wrap">
            <table class="table-module">
                <thead>
                <tr>
                    <td>选择</td>
                    <td>产品编码</td>
                    <td>产品名称</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in productList">
                    <td>
                        <label v-if="productType==='1'"
                               class="checkbox-module single">
                            <input :value="index" v-model="productCheckbox" type="checkbox">
                            <span></span>
                        </label>
                    </td>
                    <td>{{item.pdContract.productCode}}</td>
                    <td>{{item.pdContract.productName}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100" v-if="canSave" @click="confirm">确定</div>
            <div class="btn btn-primary btn-middle-100 unable" v-else>确定</div>
            <div class="btn btn-default btn-middle-100" @click="cancel">取消</div>
        </div>
    </div>
</template>
<script type="es6">
    export default{
        name: 'ProductSelectModal',
        props: ['productType', 'modalName', 'index','prmLists'],

        data(){
            return {
                productCheckbox: [],
                productRadio: '',
                productList: [
                    /*{
                     productId: '1001',
                     productName: '2017最热漫画合集',
                     active: false
                     },
                     {
                     productId: '1002',
                     productName: '2018最热漫画合集',
                     active: false
                     }*/
                ],
                search:'',
                selectMutexProductList: [],
                selectRelyProductItem: {},
                productDataSelected:[]  //所有已选的值
            }
        },
        mounted () {
            /**
             * 获取互斥和依赖产品列表
             * */
            this.findContractBySearch();
        },
        methods: {
            /**
             * 获取互斥和依赖产品列表
             * */
            findContractBySearch(e) {
                let productDataSelected=this.productDataSelected;
                let _that=this;
                //筛选已选额值
                if(this.prmLists.length>0){
                    this.prmLists.forEach(function(item,index){
                        let productData=item.pmLists[0].productData;
                        if(index!=_that.index){
                            console.log(productData)
                            productData.forEach(function(item){
                                
                            })
                            productDataSelected.concat(productData)
                        }
                    })
                }
                console.log( productDataSelected)
                
                //筛选已选的值
                if (e && e.target) {
                    e.target.blur();
                }
                this.$http.get(this.api.findContractBySearch,
                    {
                        params: {
                            search:this.search
                        },
                        showLoading:true
                    }).then(response => {

                    let res = response.body;


                    if (res.result.resultCode == '00000000') {

                        for (var i = 0; i < res.data.length; i++) {
                            res.data[i].active = false;
                        }

                        this.productList = res.data;
                        this.productCheckbox=[];

                    } else {
                        this.productCheckbox=[];
                    }
                });
            },

            confirm() {
                let that = this;

                let _data = [];

                this.productCheckbox.forEach(function (item) {
                    _data.push({
                        productCode: that.productList[item].pdContract.productCode,
                        content: that.productList[item].pdContract.productName
                    })
                });

                this.bus.$emit('productSelectStep2Bus', {index: this.index, data: _data});

                this.$modal.hide(this.modalName);
            },

            cancel() {
                this.$modal.hide(this.modalName);
            }
            
        },
        computed: {
            canSave(){
                return this.productCheckbox.length > 0
            }
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .product-code {
        padding:13px 30px 31px;
        
        .table-wrap {
            max-height: 350px;
            overflow-y: auto;
        }
        
        .sub-title {
            position: relative;
            color: #333333;
            font-size: 14px;
            padding-bottom: 23px;
            padding-left: 5px;
            
            .search-wrap {
                margin-left: 140px;
                position: absolute;
                top: -8px;
                right: 0;
            }
            
            .search {
                display: inline-block;
                width: 34px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                border-radius: 3px;
                background: #46BAFE;
            }
        }
        
        .btn-group {
            margin-top: 33px;
            .btn:nth-child(1) {
                margin-right: 20px;
            }
        }
    
        .list-modal-head {
            padding-bottom: 13px;
        
            .search {
                display: inline-block;
                width: 34px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                border-radius: 3px;
                background: #46BAFE;
            }
        }
    }
</style>
