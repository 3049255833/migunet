<template>
    <div>
        <table class="table-module">
            <thead>
                <tr>
                    <th>短信模板ID</th>
                    <th>短信模板名称</th>
                    <th>短信模板描述</th>
                    <th>短信模板内容</th>
                    <th>操作</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, index) in smsTemplateList">
                    <td>
                        <div class="l-app-name limit-text-length id"
                             :title="item.serviceCode">{{item.serviceCode}}</div>
                    </td>

                    <td><div class="limit-text-length code"
                             :title="item.companyCode">{{item.companyCode}}</div></td>

                    <td><div class="limit-text-length name"
                             :title="item.serviceName">{{item.serviceName}}</div></td>

                    <td><div class="limit-text-length des"
                             :title="item.serviceDesc">{{item.serviceDesc}}</div></td>

                    <td class="operation">
                        <div class="edit icon icon-edit-gray"
                             @click="editBusinessCode(item)"></div>

                        <div class="delete icon icon-del-gray"
                             @click="deleteBtn(index, item.id, item.serviceCode)"></div>

                        <v-confirm-popover-modal
                          :confirmInfo="'是否确定删除'"
                          :isHideConfim="item.isHideConfim"
                          :index="index"
                          details="businessCodeAdmin">
                        </v-confirm-popover-modal>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="smsTemplateList.length <= 0" class="no-asset-box">
            <v-nolist :text="'暂无数据'"></v-nolist>
        </div>

        <v-operate-success-modal
            :isHideOperateModal="isHideOperateModal"
            :operateInfo="operateInfo">
        </v-operate-success-modal>
    </div>
</template>

<script>
    import VPaging from '@/components/paging'
    import VConfirmPopoverModal from '@/components/confim-modal/confirm-popover-modal'
    import VOperateSuccessModal from '@/components/operate-modal/operate-success-modal'
    import VNolist from '@/components/no-list'

    export default {
        name: 'smsTemplateList',
        props:{
            smsTemplateList: Array
        },
        data() {
            return {
                count: 0,
                isHideOperateModal: true,
                willDelete: {
                    id: '',
                    serviceCode: ''
                },
                operateInfo: ''
            }
        },
        components: {
            VPaging,
            VConfirmPopoverModal,
            VOperateSuccessModal,
            VNolist
        },
        methods: {
            deleteBtn(index, id, code) {
                this.smsTemplateList[index].isHideConfim = false;

                this.willDelete.id = id;

                this.willDelete.serviceCode = code;

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
                this.smsTemplateList[res].isHideConfim = true;

                let that = this;

                this.$http.post(this.api.deleteBossInfo, this.willDelete).then(
                    response => {
                        let res = response.body;

                        //console.log("businessCodeList: " + JSON.stringify(res));

                        if(res.resultCode=='00000000'){

                            this.operateInfo = '删除成功';

                            this.isHideOperateModal = false;

                            setTimeout(function () {
                                that.isHideOperateModal = true;

                                that.bus.$emit('sendDeleteInfo');
                            }, 2000);

                        } else {
                            this.operateInfo = '删除失败';

                            this.isHideOperateModal = false;

                            setTimeout(function () {
                                that.isHideOperateModal = true;
                            }, 2000);

                            console.log("res: " + JSON.stringify(res));
                        }
                    }
                );
            });

            /**
             * 接收来自取消modal框的信息
             * */
            this.bus.$on('sendCancelInfo', res => {
                this.smsTemplateList[res].isHideConfim = true;
            });
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .no-asset-box {
        text-align: center;
        margin-top: 85px;
    }

    table {

        thead tr {
            text-align: left;
        }

        tbody {
            .edit {
                margin-right: 10px;
            }

            .des, .name {
                max-width: 150px;
            }

            .id, .code {
                max-width: 100px;
            }

            .operation {
                position: relative;

                .confirm-modal-container {
                    &:before {
                        right: 33px;
                    }
                }
            }
        }
    }
</style>
