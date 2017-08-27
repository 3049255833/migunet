<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
                <tr>
                    <th class="td-pl-68">产品名称</th>
                    <th>产品ID</th>
                    <th>CP／TP ID</th>
                    <th>产品状态</th>
                    <th>资费(分)</th>
                    <th>业务状态</th>
                    <th>审批状态</th>
                    <th>操作</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(cProduct, index) in contractProductList">
                    <td> {{cProduct.contractName}} </td>
                    <td> {{cProduct.contractCode}} </td>
                    <td> {{cProduct.cpCode}} </td>
                    <td> <!--{{cProduct.childProductType}}--> 动漫包业务</td>
                    <td> {{cProduct.fee}} </td>

                    <td v-if="cProduct.onlineStatus == 0">
                        草稿
                    </td>
                    <td v-else-if="cProduct.onlineStatus == 1">
                        上线
                    </td>
                    <td v-else-if="cProduct.onlineStatus == 2">
                        隐藏
                    </td>
                    <td v-else-if="cProduct.onlineStatus == 3">
                        下线
                    </td>
                    <td v-else-if="cProduct.onlineStatus == 4">
                        注销
                    </td>
                    <td v-else-if="cProduct.onlineStatus == 5">
                        删除
                    </td>

                    <td v-if="cProduct.detailStatus == 1">
                        上线审批中
                    </td>
                    <td v-else-if="cProduct.detailStatus == 2">
                        上线审批驳回
                    </td>
                    <td v-else-if="cProduct.detailStatus == 3">
                        新增报备中
                    </td>
                    <td v-else-if="cProduct.detailStatus == 4">
                        新增报备失败
                    </td>
                    <td v-else-if="cProduct.detailStatus == 5">
                        变更审批中
                    </td>
                    <td v-else-if="cProduct.detailStatus == 6">
                        变更审批驳回
                    </td>
                    <td v-else-if="cProduct.detailStatus == 7">
                        变更报备中
                    </td>
                    <td v-else-if="cProduct.detailStatus == 8">
                        变更报备失败
                    </td>

                    <td>
                        <div class="operate-list clearfix">
                            <div @click="showContractProductDetail(cProduct.contractCode)" class="mr-30 pointer cl-blue">详情</div>

                            <div class="mr-30 pointer cl-blue">变更信息</div>

                            <div class="pointer mr-30 cl-blue"
                                 :class="{'active': cProduct.isShow}"
                                 @click.stop="showSelect(index)">
                                更多
                                <i class="icon icon-arrow-down-blue"></i>
                            </div>
                        </div>

                        <div class="option-mask" :class="{opMask: cProduct.isShow}">
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
            contractProductList: Array
        },
        components: {
            VSearch,
            VPaging
        },
        computed: {
            /*optionWhatStatus(){
                return this.isShow;
            }*/
        },
        methods:{
            showContractProductDetail(contractCode){
                this.$router.push({'name': 'ContractProductDetail',params:{'productCode':contractCode}});
            },
            showSelect(index){
                this.contractProductList[index].isShow = !this.contractProductList[index].isShow;
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
