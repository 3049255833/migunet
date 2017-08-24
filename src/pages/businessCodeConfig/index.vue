<template>
    <div class="business-code-config-container">
        <v-table-operate-head title="业务代码管理"></v-table-operate-head>

        <business-code-table></business-code-table>

        <v-paging></v-paging>
    </div>
</template>

<script>
    import Mock from 'mockjs'
    import BusinessCodeTable from '@/pages/businessCodeConfig/components/business-code-table'
    import VTableOperateHead from '@/pages/businessCodeConfig/components/table-operate-head'
    import VPaging from '@/components/paging'

    export default{
        name: 'BusinessCodeConfig',
        components:{
            BusinessCodeTable,
            VTableOperateHead,
            VPaging
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