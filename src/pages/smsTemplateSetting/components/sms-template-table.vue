<template>
    <div>
        <table class="table-module">
            <thead>
                <tr>
                    <th class="pl-30" v-if="smsTFlag">
                        <label class="checkbox-module checkbox-single">
                            <input type="checkbox" :value="1" v-model="ifSmsTAll">
                            <span></span>
                        </label>
                        全选
                    </th>
                    <th>短信模板ID</th>
                    <th>短信模板名称</th>
                    <th>模板类型</th>
                    <th>短信模板描述</th>
                    <th>短信模板内容</th>
                    <th>操作</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, index) in smsTemplateList">
                    <td v-if="smsTFlag" class="pl-30">
                        <label class="checkbox-module checkbox-single">
                            <input type="checkbox" :value="index" v-model="smsTCheckbox">
                            <span></span>
                        </label>
                    </td>

                    <td>
                        <div class="l-app-name limit-text-length id"
                             :title="item.serviceCode">{{item.id}}</div>
                    </td>

                    <td><div class="limit-text-length code"
                             :title="item.companyCode">{{item.smsName}}</div></td>

                    <td><div class="limit-text-length type"
                           :title="item.serviceCode">{{item.smsType}}</div>
                    </td>

                    <td><div class="limit-text-length des"
                             :title="item.serviceDesc">{{item.smsDesc}}</div></td>

                    <td><div class="limit-text-length content"
                             :title="item.serviceName">{{item.templateContent}}</div></td>

                    <td class="operation">
                        <div class="edit icon icon-edit-gray"
                             @click="editSmsTemplate(item)"></div>

                        <div class="delete icon icon-del-gray"
                             @click="deleteSignleSmsT(index, item.id, item.serviceCode)"></div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="smsTemplateList.length <= 0" class="no-asset-box">
            <v-nolist :text="'暂无数据'"></v-nolist>
        </div>
    </div>
</template>

<script>
    import VPaging from '@/components/paging'
    import VConfirmPopoverModal from '@/components/confim-modal/confirm-popover-modal'
    import VOperateSuccessModal from '@/components/operate-modal/operate-success-modal'
    import VNolist from '@/components/no-list'

    export default {
        name: 'smsTemplateTable',
        props:{
            smsTemplateList: Array,
            smsTFlag: Boolean
        },
        data() {
            return {
                count: 0,
                willDelete: {
                    id: '',
                    serviceCode: ''
                },
                smsTCheckbox: [],
                ifSmsTAll:[]
            }
        },
        components: {
            VPaging,
            VConfirmPopoverModal,
            VOperateSuccessModal,
            VNolist
        },
        methods: {
            deleteSignleSmsT(index, id, code) {
                this.willDelete.id = id;

                this.willDelete.serviceCode = code;

                this.$modal.show('confirmSingleDeleteSmsTModal');
            },
            editSmsTemplate(item) {

                this.bus.$emit('editSmsTemplateBus', item);

                //this.$modal.show('addBusinessCodeModal');
            }
        },
        watch:{
            //监听全选
            'ifSmsTAll'(a, b){
                console.log("a: " + a);
                console.log("b: " + b);
                if(a.length > 0){
                    let _length = this.smsTemplateList.length;

                    for(let i = 0; i < _length; i++){

                        this.smsTCheckbox.push(i);
                    }
                } else {

                    this.smsTCheckbox=[];
                }
            }
        },
        created() {
            /**
             * 接收来自删除单个短信模板确认modal框的信息
             * */
            this.bus.$on('singleDeleteSmsTemplateConfirmBus', res => {

                let that = this;

                this.$http.post(this.api.deleteSmsTemplate, this.willDelete).then(response => {
                    let res = response.body;

                    console.log("deleteSmsTemplate: " + JSON.stringify(res));

                    if(res.resultCode=='00000000'){

                        this.$root.toastText = '删除成功';
                        this.$root.toast = true;

                        that.bus.$emit('sendDeleteSingleSmsTemplateSuccessInfo');
                    } else {

                        this.$root.toastText = '删除失败';
                        this.$root.toast = true;
                    }
                }, (response) => {
                    this.$root.toastText = '服务器错误';
                    this.$root.toast = true;
                })
            });

            /**
             * 接收来自取消modal框的信息
             * */
            this.bus.$on('sendCancelInfo', res => {

            });
        },
        destroyed(){
            this.bus.$off('smsTemplateComfirmInfoBus');
            this.bus.$off('sendCancelInfo');
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
