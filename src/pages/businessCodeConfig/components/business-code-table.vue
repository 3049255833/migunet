<template>
    <div>
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
                    <td>{{item.companyCode}}</td>
                    <td>{{item.serviceName}}</td>
                    <td>{{item.serviceDesc}}</td>

                    <td v-if="item.sharingType === '0'">分成</td>
                    <td v-else>买断</td>

                    <td>{{item.feeAmount}}</td>

                    <td v-if="item.isManager === 'Y'">是</td>
                    <td v-else>否</td>

                    <td class="operation">
                        <div class="edit icon icon-edit-gray"></div>

                        <div class="delete icon icon-del-gray" @click="deleteBtn(index)"></div>
                    </td>

                    <v-confirm-popover-modal
                        :operateType="'删除'"
                        :isHideConfim="true"
                        :index="index">
                    </v-confirm-popover-modal>
                </tr>
            </tbody>
        </table>

        <v-operate-success-modal
            :isHideOperateModal="isHideOperateModal">
        </v-operate-success-modal>
    </div>
</template>

<script>
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'
    import VConfirmPopoverModal from '@/components/confim-modal/confirm-popover-modal'
    import VOperateSuccessModal from '@/components/operate-modal/operate-success-modal'

    export default {
        name: 'businessCodeTable',
        props:{
            businessCodeList: Array,
        },
        data() {
            return {
                count: 0,
                isHideOperateModal: true
            }
        },
        components: {
            VSearch,
            VPaging,
            VConfirmPopoverModal,
            VOperateSuccessModal
        },
        methods: {
            deleteBtn(index) {

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
