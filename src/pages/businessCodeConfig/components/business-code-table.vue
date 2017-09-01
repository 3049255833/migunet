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
                        <div class="l-app-name">{{item.serviceCode}}</div>
                    </td>
                    <td>{{item.companyCode}}</td>
                    <td>{{item.serviceName}}</td>
                    <td>{{item.serviceDesc}}</td>

                    <td v-if="item.sharingType == '0'">分成</td>
                    <td v-else>买断</td>

                    <td>{{item.feeAmount}}</td>

                    <td v-if="item.isManager == '1'">是</td>
                    <td v-else>否</td>

                    <td class="operation">
                        <div class="edit icon icon-edit-gray"
                             @click="editBusinessCode(item)"></div>

                        <div class="delete icon icon-del-gray"
                             @click="deleteBtn(index, item.id)"></div>

                        <v-confirm-popover-modal
                          :operateType="'删除'"
                          :isHideConfim="item.isHideConfim"
                          :index="index"
                          details="businessCodeAdmin">
                        </v-confirm-popover-modal>
                    </td>
                </tr>
            </tbody>
        </table>

        <v-operate-success-modal
            :isHideOperateModal="isHideOperateModal"
            :deleteStatus="deleteStatus"
            :type="'删除'">
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
                isHideOperateModal: true,
                willDelete: {
                    id: ''
                },
                deleteStatus: ''
            }
        },
        components: {
            VSearch,
            VPaging,
            VConfirmPopoverModal,
            VOperateSuccessModal
        },
        methods: {
            deleteBtn(index, id) {
                this.businessCodeList[index].isHideConfim = false;

                this.willDelete.id = id;

                //console.log("willDeleteId: " + this.willDelete.id);
            },
            editBusinessCode(item) {

                this.bus.$emit('editPassModal', item);

                //this.$modal.show('addBusinessCodeModal');
            }
        },
        created() {
            /**
             * 接收来自确认modal框的信息
             * */
            this.bus.$on('sendBusinessCodeAdminConfirmInfo', res => {
                this.businessCodeList[res].isHideConfim = true;

                let that = this;

                this.$http.post(this.api.deleteBossInfo, this.willDelete).then(
                    response => {
                        let res = response.body;

                        console.log("businessCodeList: " + JSON.stringify(res));

                        if(res.resultCode=='00000000'){

                            this.deleteStatus = '成功';

                            this.isHideOperateModal = false;

                            setTimeout(function () {
                              that.isHideOperateModal = true;
                            }, 3000);

                        } else {
                            this.deleteStatus = '失败';

                            this.isHideOperateModal = false;

                            setTimeout(function () {
                              that.isHideOperateModal = true;
                            }, 3000);

                            console.log("res: " + JSON.stringify(res));
                        }
                    }
                );
            });

            /**
             * 接收来自取消modal框的信息
             * */
            this.bus.$on('sendCancelInfo', res => {
                this.businessCodeList[res].isHideConfim = true;
            });
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

            .operation {
                position: relative;

                .confirm-modal-container {
                    &:before {
                        right: 43px;
                    }
                }
            }
        }
    }
</style>
