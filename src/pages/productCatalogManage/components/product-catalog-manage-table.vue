<template>
    <table>
        <thead>
            <tr>
                <th>业务代码ID</th>
                <th>企业代码</th>
                <th>业务代码名称</th>
                <th>业务代码描述</th>
                <th>分成类型</th>
                <th>消费金额（分）</th>
                <th>是否管理员</th>
                <th>操作</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>
                    <div class="l-app-name">10000293</div>
                </td>
                <td>200090</td>
                <td>动漫项目计费</td>
                <td>动漫业务包</td>
                <td>分成</td>
                <td>12,000</td>
                <td>是</td>
                <td class="operation">
                    <div class="edit icon icon-edit-gray"></div>

                    <div class="delete icon icon-del-gray"></div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'

    export default {
        name: 'Table',
        components: {
            VSearch,
            VPaging
        },
        data () {
            return {
                // items: [],
                totalPage:1
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    table {
        width: 100%;

        thead tr {
            background-color: #f2f8ff;

            th {
                padding: 20px 0;
                font-size: 14px;
                color: #4a4a4a;
            }
        }

        tbody {

            tr {
                text-align: center;
                border-bottom: 1px solid #ddd;

                td {
                    padding: 15px 0;
                }

                .operation {
                    /*.edit, .delete {
                        width: 16px;
                        height: 16px;
                    }

                    .delete {
                        @include bg('icon-del-blue.png');
                    }

                    .edit {
                        @include bg("icon-add-blue.png");
                    }*/
                }
            }
        }
    }
</style>
