<template>
    <div class="business-code-config-container">
        <v-table-operate-head
          title="业务代码配置"
          v-on:searchKeyWordBus="searchKeyWordBus">
        </v-table-operate-head>

        <v-business-code-table :businessCodeList="businessCodeList"></v-business-code-table>

        <v-paging :totalItem="totalItem" v-on:pagingBus="getPage"></v-paging>

        <modal name="addBusinessCodeModal" :width="600" :height="580" @before-close="beforeClose">
            <t-modal-sub-container :title="'新增业务代码'" :name="'addBusinessCodeModal'">
                <v-add-business-code-modal
                  :modal-name="'addBusinessCodeModal'"
                  :passModal="passModal"
                  v-on:sendSaveSuccess="sendSaveSuccess"
                  :cmd="cmd">
                </v-add-business-code-modal>
            </t-modal-sub-container>
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

    export default{
        name: 'BusinessCodeConfig',
        components:{
            VBusinessCodeTable,
            VTableOperateHead,
            VPaging,
            VAddBusinessCodeModal,
            TModalSubContainer
        },
        data () {
            return {
                businessCodeList: [
                    /*{
                        id: 1001,
                        enterPriseCode: 2009,
                        codeName: '动漫计费功能',
                        codeDes: '动漫业务包',
                        type: '分成',
                        amount: '12.00',
                        isAdmin: true
                    },
                    {
                        id: 1002,
                        enterPriseCode: 2009,
                        codeName: '动漫计费功能',
                        codeDes: '动漫业务包',
                        type: '分成',
                        amount: '12.00',
                        isAdmin: false
                    },
                    {
                        id: 1003,
                        enterPriseCode: 2009,
                        codeName: '动漫计费功能',
                        codeDes: '动漫业务包',
                        type: '分成',
                        amount: '12.00',
                        isAdmin: false
                    }*/
                ],
                passModal: {},
                cmd: '',
                postData:{
                    keys:'',
                    pageSize:'8',
                    pageNo:'1'
                },
                totalItem:''
            }
        },
        created() {
            this.getBossInfo();

            /**
             * 接收来自编辑的信息
             * */
            this.bus.$on('editPassModal', res => {
                this.passModal = res;

                this.cmd = 'edit';

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
            sendSaveSuccess() {
                this.getBossInfo();
            }
        },
        computed:{
            totalPage(){
                return this.totalItem;
            }
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
