<template>
    <div class="business-code-config-container">
        <v-table-operate-head
          title="业务代码配置"
          v-on:searchKeyWordBus="searchKeyWordBus">
        </v-table-operate-head>

        <v-business-code-table :businessCodeList="businessCodeList"></v-business-code-table>

        <v-paging ref="pagingModule" :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>

        <modal name="addBusinessCodeModal" :width="600" :height="580" @before-close="beforeClose">
            <t-modal-sub-container :title="modalTitle" :name="'addBusinessCodeModal'">
                <v-add-business-code-modal
                  :modal-name="'addBusinessCodeModal'"
                  :passModal="passModal"
                  v-on:sendSaveSuccess="sendSaveSuccess"
                  :cmd="cmd">
                </v-add-business-code-modal>
            </t-modal-sub-container>
        </modal>

        <!-- 操作结果modal start -->
        <modal name="addResultMsg" :adaptive="true" :draggable="true" :width="200" :height="80">
            <v-toast :name="'addResultMsg'">{{addResultMsg}}</v-toast>
        </modal>

        <!--确认删除modal-->
        <modal name="deleteBusinessCodeConfirmModal" :width="390" :height="280" @before-close="beforeClose">
            <t-modal-sub-container
                :title="'是否确认删除'"
                :name="'deleteBusinessCodeConfirmModal'">

                <v-confirm-delete-modal
                    :functionType="'deleteBusinessCodeConfirmInfo'"
                    :confirmInfo="'是否确认删除业务代码'">
                </v-confirm-delete-modal>
            </t-modal-sub-container>
        </modal>

        <!-- 批量导入失败或者重复数据modal-->
        <modal name="batchUploadFailList" :width="800" :height="500" @before-close="beforeClose">
            <v-batch-upload-fail-list
              :batchUploadfailData="batchUploadfailData">
            </v-batch-upload-fail-list>
        </modal>
    </div>
</template>

<script type="es6">
    import Mock from 'mockjs'
    import VBusinessCodeTable from '@/pages/businessCodeConfig/components/business-code-table'
    import VTableOperateHead from '@/pages/businessCodeConfig/components/table-operate-head'
    import VPaging from '@/components/paging'
    import VAddBusinessCodeModal from './components/add-business-code-modal'
    import TModalSubContainer from "@/components/modal-sub-container"
    import VToast from '@/components/toast'
    import VConfirmDeleteModal from '@/components/confirm-delete-modal/confirm-delete-modal'
    import VBatchUploadFailList from './components/batch-upload-fail-list.vue'

    export default{
        name: 'BusinessCodeConfig',
        components:{
            VBusinessCodeTable,
            VTableOperateHead,
            VPaging,
            VAddBusinessCodeModal,
            TModalSubContainer,
            VToast,
            VConfirmDeleteModal,
            VBatchUploadFailList
        },
        data () {
            return {
                businessCodeList: [],
                passModal: {},
                cmd: '',
                modalTitle: '新增业务代码',
                postData:{
                    value:'',
                    pageSize:'5',
                    pageNum:'1'
                },
                totalItem:'',
                addResultMsg:'',
                batchUploadfailData: {}
            }
        },
        created() {
            this.getBossInfo();

            /*
            * 接收来自添加modal的title*/
            this.bus.$on('sendAddBusinessCodeTitle', res => {
                this.cmd = 'add';

                this.modalTitle = '新增业务代码';

                this.$modal.show('addBusinessCodeModal');
            });

            /**
             * 接收来自编辑的信息
             * */
            this.bus.$on('editPassModal', res => {
                this.passModal = res;

                this.cmd = 'edit';

                this.modalTitle = '修改业务代码';

                this.$modal.show('addBusinessCodeModal');
            });

            /**
             * 接收来自删除的信息
             * */
            this.bus.$on('sendDeleteInfo', res => {
                this.getBossInfo();
            });

            /**
             * 接收来自添加和编辑，成功或者失败的信息
             * */
            this.bus.$on('sendAddAndEditInfo', res => {
                this.getBossInfo();
            });

            /** 接收批量导入成功的信息 */
            this.bus.$on('sendBatchUploadBusinessCodeSuccessBus', res => {
                this.getBossInfo();
            });

            /** 接收批量导入部分失败的数据 */
            this.bus.$on('sendUploadWrongInfoBus', res => {

                this.batchUploadfailData = res;

                this.$modal.show('batchUploadFailList');

                this.getBossInfo();
            });

            /** 接收批量导入部分重复的数据 */
            this.bus.$on('sendUploadRepeatInfoBus', res => {

                this.batchUploadfailData = res;

                this.$modal.show('batchUploadFailList');

                this.getBossInfo();
            });

            /** 接收批量导入部分失败和重复的数据 */
            this.bus.$on('sendUploadWrongRepeatInfoBus', res => {

                this.batchUploadfailData = res;

                console.log("batchUploadfailData 5: " + JSON.stringify(this.batchUploadfailData));

                this.$modal.show('batchUploadFailList');

                this.getBossInfo();
            });
        },
        methods: {
            /**
             * 接收来自头部搜索
             * */
            searchKeyWordBus(res) {
                this.postData.value = res.keys;

                this.postData.pageNum='1';
                this.$refs.pagingModule.current=1;

                console.log("postData search: " + JSON.stringify(this.postData));

                this.getBossInfo();
            },

            /**
             * 获取业务代码列表
             * */
            getBossInfo(){
                this.$http.post(this.api.getBossInfo, this.postData, {showLoading:true}).then(
                    response => {
                        let res = response.body;

                        console.log("res: " + JSON.stringify(res));

                        if(res.result.resultCode=='00000000'){

                            /*for(var i = 0; i < res.service.list.length; i++) {

                                res.service.list[i].isHideConfim = true;
                            }*/

                            this.businessCodeList = res.data;

                            this.totalItem = res.total;

                            //console.log("list2: " + JSON.stringify(res));
                        } else {

                            console.log("res: " + JSON.stringify(res));
                        }
                    }
                );
            },

            beforeClose() {},

            /**
             * 获取分页信息
             * */
            getPage(res){
                this.postData.pageNum = res.pagingValue;
                this.postData.pageSize = res.pagingSize;

                this.getBossInfo();
            },

            /**
             * 接收来自保存的信息
             * */
            sendSaveSuccess(res) {

                let that = this;

                this.addResultMsg = res;

                that.$modal.show('addResultMsg');

                setTimeout(function(){
                    that.getBossInfo();
                },2500);
            }
        },
        computed:{
            totalPage(){
                return this.totalItem;
            }
        },
        destroyed() {
            this.bus.$off('sendAddBusinessCodeTitle');
            this.bus.$off('editPassModal');
            this.bus.$off('sendDeleteInfo');
            this.bus.$off('sendAddAndEditInfo');

            this.bus.$off('sendUploadWrongRepeatInfoBus');
            this.bus.$off('sendUploadRepeatInfoBus');
            this.bus.$off('sendUploadWrongInfoBus');
            this.bus.$off('sendBatchUploadBusinessCodeSuccessBus');
        }
    }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    $image-base-path: '../../assets/';
    @mixin bg($URI, $w: null, $h: null, $x: top, $y: center, $repeat: no-repeat) {
        @if $w and $h {
            width: $w;
            height: $h;
        }
        background: url('#{$image-base-path}#{$URI}') $repeat $x $y;
        background-size: 100% 100%;
    }

    .business-code-config-container {
        background-color: #fff;
        position: relative;

        .pageNum {
            margin: 0;
            padding: 25px 0;
        }
    }
</style>
