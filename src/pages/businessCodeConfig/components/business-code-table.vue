<template>
    <table class="table-module">
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
            <tr v-for="(item, index) in businessCodeList">
                <td>
                    <div class="l-app-name">{{item.id}}</div>
                </td>
                <td>{{item.enterPriseCode}}</td>
                <td>{{item.codeName}}</td>
                <td>{{item.codeDes}}</td>
                <td>{{item.type}}</td>
                <td>{{item.amount}}</td>
                <td v-if="item.isAdmin">是</td>
                <td v-else>否</td>

                <td class="operation">
                    <div class="edit icon icon-edit-gray"></div>

                    <div class="delete icon icon-del-gray" @click="deleteBtn(index)"></div>
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
        props:{
            businessCodeList: Array,
        },
        components: {
            VSearch,
            VPaging
        },
        methods: {
            deleteBtn(index) {
                this.items.splice(index, 1);
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    table {

        thead tr {
            text-align: left;
        }

        tbody {
            .edit {
                margin-right: 10px;
            }
        }
    }
</style>
