<template>
    <div class="table-wrap">
        <table class="table-module">
            <thead>
            <tr>
                <td>产品名称</td>
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
            <tr>
                <td>
                    产品名称
                </td>
                <td>2233</td>
                <td>22233</td>
                <td>450</td>
                <td>560</td>
                <td>上线报备</td>
                <td>上线报备失败</td>
                <td>
                    <div class="operate-list">
                        <span @click="showContractProductDetail" class="mr-30 cl-blue">详情</span><span class="mr-30 cl-blue">变更信息</span><span class="mr-30 cl-blue">更多</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    产品名称
                </td>
                <td>2233</td>
                <td>22233</td>
                <td>450</td>
                <td>560</td>
                <td>上线报备</td>
                <td>上线报备失败</td>
                <td>
                    <div class="operate-list">
                        <span class="mr-30 cl-blue">详情</span><span class="mr-30 cl-blue">变更信息</span><span class="mr-30 cl-blue">更多</span>
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
        components: {
            VSearch,
            VPaging

        },
        data ()
        {
            return {}
        },
        


    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .table-wrap {
        
    }
    
</style>
