<template>
    <div>
        <table class="table-module">
            <thead>
                <tr>
                    <th>业务代码</th>
                    <th>企业代码</th>
                    <th>业务代码名称</th>
                    <th>分成类型</th>
                    <th>资费金额（分）</th>
                    <th>业务代码描述</th>
                    <th>是否管理员专用</th>
                    <th>是否需要二次确认</th>
                    <th>操作</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, index) in businessCodeList">
                    <td>
                        <div class="l-app-name limit-text-length id"
                             :title="item.serviceCode">{{item.serviceCode}}</div>
                    </td>

                    <td><div class="limit-text-length code"
                             :title="item.companyCode">{{item.companyCode}}</div></td>

                    <td><div class="limit-text-length name"
                             :title="item.serviceName">{{item.serviceName}}</div></td>

                    <td v-if="item.sharingType == '0'">分成</td>
                    <td v-else>买断</td>

                    <td>{{item.feeAmount}}</td>

                    <td><div class="limit-text-length des"
                             :title="item.serviceDesc">{{item.serviceDesc}}</div></td>

                    <td v-if="item.isManager == '1'">是</td>
                    <td v-else>否</td>

                    <td v-if="item.secondConfirm == '1'">是</td>
                    <td v-else>否</td>

                    <td class="operation">
                        <div class="edit icon icon-edit-gray"
                             @click="editBusinessCode(item)"></div>

                        <div class="delete icon icon-del-gray"
                             @click="deleteBtn(item.id,item.serviceCode)"></div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="businessCodeList.length <= 0" class="no-asset-box">
            <!--<img src="../../../assets/no-asset-show.png">-->
            <v-nolist :text="'暂无数据'"></v-nolist>
        </div>

        <v-operate-success-modal
            :isHideOperateModal="isHideOperateModal"
            :operateInfo="operateInfo">
        </v-operate-success-modal>
    </div>
</template>

<script>
    /*import VSearch from '@/components/search'*/
    import VPaging from '@/components/paging'
    import VConfirmPopoverModal from '@/components/confim-modal/confirm-popover-modal'
    import VOperateSuccessModal from '@/components/operate-modal/operate-success-modal'
    import VNolist from '@/components/no-list'

    export default {
        name: 'businessCodeTable',
        props:{
            businessCodeList: Array
        },
        data() {
            return {
                count: 0,
                isHideOperateModal: true,
                postData: [
                    {
                        id: '',
                        serviceCode: ''
                    }
                ],
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
            deleteBtn(id, serviceCode) {

                this.postData[0].id = id;

                this.postData[0].serviceCode = serviceCode;

                this.$modal.show('deleteBusinessCodeConfirmModal');

                console.log("Delete postData: " + this.postData[0].id);
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
            this.bus.$on('deleteBusinessCodeConfirmInfoBUs', res => {
                let that = this;

                this.$http.post(this.api.deleteBossInfo, this.postData).then(
                    response => {
                        let res = response.body;

                        //console.log("businessCodeList: " + JSON.stringify(res));

                        if(res.result.resultCode=='00000000'){

                            that.$root.toastText = '删除成功';

                            setTimeout(function () {
                                that.bus.$emit('sendDeleteInfo', that.businessCodeList.length);
                            }, 2000);

                        } else {
                            that.$root.toastText = '删除失败';
                            //console.log("res: " + JSON.stringify(res));
                        }

                        that.$modal.hide('deleteBusinessCodeConfirmModal');

                        that.$root.toast = true;
                    }
                );
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
                max-width: 100px;
            }

            .id, .code {
                max-width: 72px;
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
