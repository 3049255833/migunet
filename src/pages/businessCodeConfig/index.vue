<template>
    <div class="business-code-config-container">
        <v-table-operate-head title="业务代码管理"></v-table-operate-head>

        <v-business-code-table :businessCodeList="businessCodeList"></v-business-code-table>

        <v-paging :totalItem="totalItem"></v-paging>

        <modal name="addBusinessCodeModal" :width="600" :height="600" @before-close="beforeClose">
            <t-modal-sub-container :title="'新增业务代码'" :name="'addBusinessCodeModal'">
                <v-add-business-code-modal
                  :modal-name="'addBusinessCodeModal'"
                  :passModal="passModal"
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
                    pageNumber:'1'
                },
                totalItem:''
            }
        },
        created() {
            this.getBossInfo();

            /**
             * 接收来自头部搜索
             * */
            this.bus.$on('searchKeyWordBus', res => {
                this.postData.keys = res.keys;

                console.log("postData: " + JSON.stringify(this.postData));

                this.getBossInfo();
            });

            /**
             * 接收分页信息
             * */
            this.bus.$on('pagingBus', res => {
                this.postData.pageNumber = res.pagingValue;
                this.postData.pageSize = res.pagingSize;

                console.log("postData: " + JSON.stringify(this.postData));

                this.getBossInfo();
            });

            /**
             * 接收来自编辑的信息
             * */
            this.bus.$on('editPassModal', res => {
                this.passModal = res;

                this.cmd = 'edit';

                this.$modal.show('addBusinessCodeModal');
            });
        },
        methods: {
            /**
             * 获取业务代码列表
             * */
            getBossInfo(){
                this.$http.get(this.api.getBossInfo,
                    {
                        params:{}
                    }).then(response => {

                    let res = response.body;

                    if(res.result.resultCode=='00000000'){

                        for(var i = 0; i < res.service.length; i++) {

                            res.service[i].isHideConfim = true;
                        }

                        this.businessCodeList = res.service;

                        this.totalItem = this.businessCodeList.length;

                        //console.log("businessCodeList: " + JSON.stringify(this.businessCodeList));

                    } else {

                        console.log("res: " + JSON.stringify(res));
                    }
                });
            },

            beforeClose() {}
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

        .pageNum {
            margin: 0;
            padding: 25px 0;
        }
    }
</style>
