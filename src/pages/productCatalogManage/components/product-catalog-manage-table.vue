<template>
    <table>
        <thead>
            <tr>
                <th class="first">选择</th>
                <th class="sencod">目录列表</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td class="first">
                    <label class="checkbox-module">
                        <input type="checkbox">
                        <span></span>
                    </label>
                </td>

                <td class="sencod">漫画类型</td>

                <td class="operation">
                    <div class="edit icon icon-edit-gray"></div>

                    <div class="delete icon icon-del-gray"></div>
                </td>
            </tr>

            <tr>
                <td class="first">
                    <label class="checkbox-module">
                        <input type="checkbox">
                        <span></span>
                    </label>
                </td>

                <td class="sencod">漫画类型</td>

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
                padding: 22px 0;
                font-size: 14px;
                color: #4a4a4a;
                text-align: left;
            }

            .first {
                width: 19%;
                padding-left: 70px;
            }
        }

        tbody {

            tr {
                border-bottom: 1px solid #ddd;

                &:hover {
                    background-color: #f7f7f7;

                    .operation {
                        .edit, .delete {
                            visibility: visible;
                        }
                    }
                }

                td {
                    padding: 15px 0;
                }

                .first {
                    padding-left: 70px;
                }

                .operation {
                    .edit, .delete {
                        visibility: hidden;
                    }
                }
            }
        }
    }
</style>
