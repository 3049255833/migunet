<template>
    <div class="table-container">
        <div class="main-area">
            <table class="NewTable2">
                <thead>
                <tr>
                    <td width="150">产品名称</td>
                    <td>产品ID</td>
                    <td>CP／TP ID</td>
                    <td>资费(分)</td>
                    <td>业务状态</td>
                    <td>审批状态</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div class="l-app-name">名称</div>
                    </td>
                    <td>123432</td>
                    <td>343</td>
                    <td>233</td>
                    <td>上线报备中</td>
                    <td>变更报备失败</td>
                    <td class="option td-blue">详情</td>
                </tr>
                <tr>
                    <td>
                        <div class="l-app-name">名称</div>
                    </td>
                    <td>123432</td>
                    <td>343</td>
                    <td>233</td>
                    <td>上线报备中</td>
                    <td>变更报备失败</td>
                    <td class="option td-blue">详情</td>
                </tr>
                <tr>
                    <td>
                        <div class="l-app-name">名称</div>
                    </td>
                    <td>123432</td>
                    <td>343</td>
                    <td>233</td>
                    <td>上线报备中</td>
                    <td>变更报备失败</td>
                    <td class="option td-blue">详情</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>


</template>
<script>
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'





    export default {
        name: 'Table',
        components:{
            VSearch,
            VPaging

        },
        data ()
        {
            return {
                // items: [],
                totalPage:1
            }
        },



    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .table-container{
        background: #ffffff;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    
    .NewTable2 {
        width: 100%;
        font-size: 14px;
        color: #333;
        border-top: solid 1px #e1e1e1;
        
        padding-top: 20px;
    }
    
    .NewTable2 thead {
        background: #f2f8ff;
    }
    
    legend, td, th {
        padding: 0;
    }
    
    .NewTable2 td, .dialog-ctn, .l-content-button, .nl-table, .tb-reset {
        text-align: center;
    }
    
    .NewTable2 td {
        padding: 20px 0;
        /*border-right: solid 1px #e1e1e1;*/
        border-bottom: solid 1px #e1e1e1;
    }
    .NewTable2 tbody tr:hover{
        background: #f7f7f7;
    }
    
    .btn, .l-app-name {
        white-space: nowrap;
    }
    
    .l-app-name {
        width: 143px;
        display: block;
        word-wrap: normal;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    
    .td-detail, .td-edit {
        margin-right: 15px;
        cursor: default;
    }
    
    .l-go, .td-delete, .td-detail, .td-edit {
        display: inline-block;
    }

    .td-blue {
        color: #46BAFE !important;
    }

    .td-red {
        color: #f16767 !important;
    }
    .option{
        cursor: pointer;
    }
    .tab-wrapper{
        background: #f4f4f4;
    }
    .tab-wrapper:after{
        content:'';
        display: block;
        clear: both;
    }
    .tab-item{
        float: left;
        line-height: 46px;
        margin-right: 10px;
        color:#1e1e1e;
        font-size:14px;
        background: #e5e6e8;
        padding: 0 10px;
        cursor: pointer;
    }
    .tab-item.active{
        background: #ffffff;
    }
    input{
        border-radius: 4px;
        &:focus{
            
        }
    }
</style>
