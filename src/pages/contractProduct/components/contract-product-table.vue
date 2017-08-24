<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
                <tr>
                    <td class="td-pl-68">产品名称</td>
                    <td>产品ID</td>
                    <td>CP／TP ID</td>
                    <td>子产品类型</td>
                    <td>资费(分)</td>
                    <td>业务状态</td>
                    <td>审批状态</td>
                    <td>操作</td>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(cProduct, index) in contractProductList">
                    <td> {{cProduct.contractName}} </td>
                    <td> {{cProduct.contractCode}} </td>
                    <td> {{cProduct.cpCode}} </td>
                    <td> {{cProduct.childProductType}} </td>
                    <td> {{cProduct.fee}} </td>
                    <td> {{cProduct.status}} </td>
                    <td> {{cProduct.approveStatus}} </td>
                    <td>
                        <div class="operate-list clearfix">
                            <div @click="showContractProductDetail(cProduct.contractCode)" class="mr-30 pointer cl-blue">详情</div>

                            <div class="mr-30 pointer cl-blue">变更信息</div>

                            <div class="pointer mr-30 cl-blue">
                                更多
                                <i class="icon icon-arrow-down-blue" :class="{'active':isShow}" @click.stop="showSelect"></i>
                            </div>
                        </div>

                        <div class="option-mask" :class="{opMask:optionWhatStatus}">
                            <div class="option-item">下线</div>

                            <div class="option-item">隐藏</div>

                            <div class="option-item">注销</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'
    import axios from 'axios'

    export default {
        name: 'ContractProductTable',
        props:{
            contractProductList: Array,
        },
        components: {
            VSearch,
            VPaging
        },
        data()
        {
            return {
                isShow: false
            }
        },
        computed: {
            optionWhatStatus(){
                return this.isShow;
            }
        },
        methods:{
            showContractProductDetail(contractCode){
                this.$router.push({'name': 'ContractProductDetail',params:{'contractCode':contractCode}});
            },
            showSelect(){
                this.isShow = !this.isShow;
            },
            hideSelect(){
                this.isShow = false;
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .table-wrap {
        td:nth-child(1){
            padding-left: 68px!important;
        }
        th:nth-child(1){
            padding-left: 68px!important;
        }
    }

    .pointer {
        float: left;
    }

    .option-mask {
        box-sizing: border-box;
        position: absolute;
        border: solid 1px #d6e1e5;
        margin-top: 12px;
        border-radius: 3px;
        display: none;
        z-index: 88;
        background: #ffffff;
        width: 80px;
        margin-left: 125px;

        &.opMask {
            display: block;
        }

        &:before {
            position: absolute;
            right: 30px;
            top: -11px;
            content: "";
            border: 5px solid rgba(0, 0, 0, 0);
            border-bottom-color: #d6e1e5;
        }

        &:after {
            position: absolute;
            right: 30px;
            top: -10px;
            content: "";
            border: 5px solid rgba(0, 0, 0, 0);
            border-bottom-color: #fff;
        }

        .option-item {
            font-size: 12px;
            padding-left: 10px;
            color: #0c0a0b;
            line-height: 34px;
            cursor: pointer;
            padding-right: 10px;
            text-align: center;

            &:hover {
                color: #ffffff;
                background: #46bafe;
            }
        }
    }
</style>
