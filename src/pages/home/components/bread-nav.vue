<template>
    <div class="bread-nav" v-show="nav3">
        <span class="bread-link">{{nav1}}</span>
        >
        <span class="bread-link">{{nav2}}</span>
        >
        <span>{{nav3}}</span>
    </div>
</template>
<script>
    export default{
        name:'BreadNav',
        data(){
            return{
                
            }
        },
        computed:{
            navShow(){
                return true
            },
            nav1(){
                return '产品管理'
            },
            nav2(){
                if(this.$route.name=='SingleProduct'||this.$route.name=='SingleProductDetail'){
                    return '单品管理'
                }
                if(this.$route.name=='ContractProduct'||this.$route.name=='Step1'||this.$route.name=='Step2'||this.$route.name=='Step3'||this.$route.name=='ContractProductDetail'){
                    return '合约产品管理'
                }
            },
            nav3(){
                if(this.$route.name=='Step1'||this.$route.name=='Step2'||this.$route.name=='Step3'){
                    return '新增合约产品'
                }
                if(this.$route.name=='ContractProductDetail'||this.$route.name=='SingleProductDetail'){
                    return '产品详情'
                }
            }
        },
        mounted(){
            console.log(this.$route.name)
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .bread-nav{
        font-size: 12px;
        color:#666666;
        padding:16px 0 20px 16px;
        background: #ffffff;
    }
</style>