<template>
    <div class="business-code-config-container">
        <v-table-operate-head
          title="业务代码配置"
          v-on:searchKeyWordBus="searchKeyWordBus">
        </v-table-operate-head>

        <v-business-code-table :businessCodeList="businessCodeList"></v-business-code-table>

        <v-paging :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>

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

    export default{
        name: 'BusinessCodeConfig',
        components:{
            VBusinessCodeTable,
            VTableOperateHead,
            VPaging,
            VAddBusinessCodeModal,
            TModalSubContainer,
            VToast
        },
        data () {
            return {
                businessCodeList: [],
                passModal: {},
                cmd: '',
                modalTitle: '新增业务代码',
                postData:{
                    keys:'',
                    pageSize:'8',
                    pageNo:'1'
                },
                totalItem:'',
                addResultMsg:''
            }
        },
        created() {
            this.getBossInfo();

            /*
            * 接收来自添加modal的title*/
            this.bus.$on('sendAddBusinessCodeTitle', res => {
                this.cmd = 'add';

                this.modalTitle = '添加业务代码';

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
             * 接收来自批量导入的信息
             * */
            this.bus.$on('sendBatchAddBossInfo', res => {
                this.getBossInfo();
            });
        },
        methods: {
            /**
             * 接收来自头部搜索
             * */
            searchKeyWordBus(res) {
                this.postData.keys = res.keys;

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

                        //console.log("res: " + JSON.stringify(res));

                        if(res.result.resultCode=='00000000'){

                            for(var i = 0; i < res.service.list.length; i++) {

                                res.service.list[i].isHideConfim = true;
                            }

                            this.businessCodeList = res.service.list;

                            this.totalItem = res.service.total;

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
                this.postData.pageNo = res.pagingValue;
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
            this.bus.$off('sendBatchAddBossInfo');
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
