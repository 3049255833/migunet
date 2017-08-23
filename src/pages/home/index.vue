<template>
    <div class="product-center">

        <v-header></v-header>

        <div class="product-center-content clearfix">

            <v-side-bar></v-side-bar>

            <div class="product-center-right">
                <!--<bread-nav></bread-nav>-->

                <div class="right-content">

                    <router-view></router-view>

                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import VHeader from "@/components/header";
    import VSideBar from "@/pages/home/children/sidebar";
    import BreadNav from '@/pages/home/components/bread-nav';


    export default {

        name: 'ProductCenter',

        components: {
            VHeader,
            VSideBar,
            BreadNav
            
        },

        data () {
            return {
                id: this.$route.params.id,
                current: 1,
                ztreeItems: []
            };
        },

        methods: {},

        mounted () {
            
        },

        watch: {}
    };
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    html, body {
        width: 100%;
        height: 100%;
    }
    
    #app {
        width: 100%;
        height: 100%;
        background: #f4f4f4;
    }
    .product-center-content{
        position: relative;
        background: #f4f4f4;
        min-height: 700px;

        .product-center-right {
            margin: 0 auto 0 170px ;

            .right-content{
                padding: 20px 20px 50px 20px;
                background:#f4f4f4;
                box-sizing: border-box;
            }
        }
    }
</style>
<style lang="scss" scoped rel="stylesheet/scss">
</style>