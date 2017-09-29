<template>
    <div class="product-code">
        <div class="list-modal-head">
            <div class="search-wrap">
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
                        <div v-if="productType==='1'" class="checkbox-module single">
                            <input :value="index" v-model="productCheckbox" type="checkbox" @click="getProductList(index, item.pdContract.productUniCode,item.pdContract.productName,item.pdContract.id)">
                            <span></span>
                        </div>
                    </td>
                    <td>{{item.pdContract.productUniCode}}</td>
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
        props: ['productType', 'modalName', 'index', 'prmLists'],

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
                search: '',
                productListCurSelected: [],
                selectRelyProductItem: {},
                productListAllSelected: []  //所有已选的值
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
                let productListAllSelected = this.productListAllSelected;
                let _that = this;
                //获取所有已选值
                if (this.prmLists.length > 0) {
                    this.prmLists.forEach(function (item, index) {
                        let productData = item.pmLists[0].productData;
                        if (index != _that.index) {
                            productData.forEach(function (item) {
                                productListAllSelected.push(item);
                            });
                        }
                    })
                }

                if (e && e.target) {
                    e.target.blur();
                }
                this.$http.get(this.api.findContractBySearch,
                    {
                        params: {
                            search: this.search
                        },
                        showLoading: true
                    }).then(response => {

                    let res = response.body;


                    if (res.result.resultCode == '00000000') {

                        let that=this;

                        that.productCheckbox=[];   //一进页面要先清除checkbox

                        for (var i = 0; i < res.data.length; i++) {
                            res.data[i].active = false;
                        }

                        if (res.data) {
                            let data = res.data;
                            let that = this;
                            let _index = 0 ;            //前端开发人员自己校检index为所有已选的值的长度
                            /*   console.log(data.length);*/
                           /* console.log(that.productListAllSelected);*/   //打印所有已选


                            //去除所有已选的值
                            that.productListAllSelected.forEach(function (selectItem, selectIndex) {
                                data.forEach(function (item, index) {
                                    if (selectItem.productCode == item.pdContract.productCode) {
                                        console.log(1, ++_index);
                                        data.splice(index,1);
                                    }
                                });
                            });


                            //让当前框已选的值显示

                            data.forEach(function(item,index){
                                that.productListCurSelected.forEach(function(subItem,subIndex){

                                    if(item.pdContract.productCode==subItem.productCode){
                                        item.active=true;
                                        that.productCheckbox.push(index);
                                    }
                                })
                            })

                        }



                        this.productList = res.data;
                       /* console.log(this.productList)*/

                    } else {
                        this.productCheckbox = [];
                    }
                });
            },

            /**
             * 点击获取选项
             */

            getProductList(index, productCode, content,id){

                let that = this;

                this.productList[index].active=!this.productList[index].active;

                if(this.productList[index].active) {
                    this.productListCurSelected.push({
                        productCode:productCode,
                        content:content,
                        id:id
                    });
                /*    console.log(this.productListCurSelected)*/
                } else {
                    this.productListCurSelected.forEach(function(item, cIndex){

                        if(item.productCode == productCode){

                            that.productListCurSelected.splice(cIndex, 1);

                            return;
                        }
                    })


                }

            },

            /**
             * 点击确认
             * */
            confirm() {
                let that = this;

                this.bus.$emit('productSelectStep2Bus', {index: this.index, data:this.productListCurSelected});

                this.$modal.hide(this.modalName);
            },

            cancel() {
                this.$modal.hide(this.modalName);
            }

        },
        watch:{
          /*  'productCheckbox'(a,b){
                console.log('变化了',a)
            }*/
        },
        computed: {
            canSave(){
                return this.productListCurSelected.length > 0
            }
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .product-code {
        padding: 13px 30px 31px;

        .table-wrap {
            max-height: 350px;
            overflow-y: auto;
            input[type='checkbox']{
                width: 20px;
                height: 20px;
                top: 0;
                cursor: pointer;
            }
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
