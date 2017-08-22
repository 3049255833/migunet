<template>
    <div class="business-code-config-container">
        <v-search hideBtn="true" title="单品管理"></v-search>

        <business-code-table></business-code-table>

        <v-paging></v-paging>
    </div>
</template>

<script>
    import Mock from 'mockjs'
    import BusinessCodeTable from '@/pages/businessCodeConfig/components/business-code-table.vue'
    import VSearch from '@/components/search'
    import VPaging from '@/components/paging'

    export default{
        name: 'BusinessCodeConfig',
        components:{
            BusinessCodeTable,
            VSearch,
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
</style>