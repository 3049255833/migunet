<template>
    <div class="business-code-config-container">
        <v-table-operate-head title="业务代码管理"></v-table-operate-head>

        <v-business-code-table :businessCodeList="businessCodeList"></v-business-code-table>

        <v-paging></v-paging>
    </div>
</template>

<script type="es6">
    import Mock from 'mockjs'
    import VBusinessCodeTable from '@/pages/businessCodeConfig/components/business-code-table'
    import VTableOperateHead from '@/pages/businessCodeConfig/components/table-operate-head'
    import VPaging from '@/components/paging'

    export default{
        name: 'BusinessCodeConfig',
        components:{
            VBusinessCodeTable,
            VTableOperateHead,
            VPaging
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
                ]
            }
        },
        created() {
            this.getBossInfo();
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

                        console.log("businessCodeList: " + JSON.stringify(this.businessCodeList));

                    } else {

                        console.log("res: " + JSON.stringify(res));
                    }
                });
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

        .pageNum {
            margin: 0;
            padding: 25px 0;
        }
    }
</style>
