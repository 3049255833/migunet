<template>
    <div class="contract-product-add">
        <div class="main-wrapper">
            <div class="add-main">
                <div class="table-wrapper">
                    <div class="add-title">
                        产品管理新增
                    </div>
                    <div class="step-wrapper">
                        <div class="step">
                            <div class="step-item">
                                <div class="step-circle " :class="{'active': step===1||step===2||step===3}"
                                     data-attr-step='1'></div>
                                <div class="step-text">基本信息填写</div>
                            </div>
                            <div class="step-item">
                                <div class="step-circle" :class="{'active': step===3||step===2}"
                                     data-attr-step='2'></div>
                                <div class="step-text">批价配置</div>
                            </div>
                            <div class="step-item">
                                <div class="step-circle" :class="{'active': step===3}" data-attr-step='3'></div>
                                <div class="step-text">资费信息配置</div>
                            </div>
                        </div>
                    </div>
                    <router-view>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /*   import Mock from 'mockjs'*/
    import PickDate from '@/components/PickDate/PickDate'
    export default {
        name: 'ContractProductAdd',
        components: {
            PickDate
        },
        data () {
            return {
                step: parseInt(this.$route.name.substr(this.$route.name.length-1,1))
            }
        },
        methods: {},
        mounted () {}
        
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
    .tb-reset {
        display: inline-block;
        font-size: 14px;
        color: #46bafe;
        width: 74px;
        height: 32px;
        background: #fff;
        line-height: 32px;
        border: 1px solid #46bafe;
        cursor: default;
        box-sizing: border-box;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }
    
    /*.tb-reset:hover{
      
    }*/
    .tb-search {
        background: #46bafe;
        color: #ffffff;
    }
    
    .l-content-w {
        margin-right: 20px;
    }
    
    .step-wrapper {
        padding: 20px 0;
        background: #f2f8ff;
    }
    
    .step {
        width: 483px;
        margin: 0 auto;
        position: relative;
    }
    
    .step:before {
        content: '';
        width: 420px;
        display: block;
        height: 1px;
        background: #d6e1e5;
        position: absolute;
        left: 30px;
        top: 23px;
    }
    
    .step:after {
        content: '';
        clear: both;
        display: block;
    }
    
    .step-item {
        float: left;
    }
    
    .step-item + .step-item {
        
        margin-left: 145px;
    }
    
    .step-text {
        text-align: center;
        color: #171717;
        font-size: 12px;
        margin-top: 8px;
    }
    
    .step-circle {
        width: 45px;
        height: 45px;
        border: solid 1px #d6e1e5;
        position: relative;
        border-radius: 50%;
        margin: 0 auto;
        background: #f2f8ff;
    }
    
    .step-circle:after {
        content: attr(data-attr-step);
        position: absolute;
        left: 50%;
        top: 50%;
        width: 24px;
        height: 24px;
        color: white;
        text-align: center;
        line-height: 24px;
        background: #d6e1e5;
        margin-left: -12px;
        margin-top: -12px;
        border-radius: 50%;
    }
    
    .step-circle.active:after {
        background: #46bafe;
    }
    
    .container {
        width: 100%;
    }
    
    .main-wrapper {
        background: #f4f4f4;
    }
    
    .nav-wrapper {
        float: left;
    }
    
    .table-wrapper {
        /*float: left;*/
        /*margin-left: 20px;*/
        /*width: 1050px;*/
        background: #ffffff;
        padding-bottom: 30px;
    }
    
    /*.main-wrapper:after{
      content: '';
      display: block;
      clear: both;
    }*/
    .main-wrapper:before,
    .main-wrapper:after {
        content: " ";
        display: table;
    }
    
    .main-wrapper:after {
        clear: both;
    }
    
    .date-wrapper {
        
    }
    
    .bread-link:hover {
        color: #46bafe;
        cursor: pointer;
    }
    
    .input-row + .input-row {
        margin-top: 18px;
    }
    
    .row-wrapper {
        display: inline-block;
        width: 200px;
        background: #ffffff;
    }
    
    .row-wrapper-ta {
        width: 340px;
        height: 80px;
    }
    
    .row-wrapper textarea {
        width: 340px;
        height: 80px;
        box-sizing: border-box;
    }
    
    .row-wrapper input {
        width: 200px;
        height: 32px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
    }
    
    .input-text {
        width: 165px;
        display: inline-block;
        line-height: 32px;
        margin-right: 70px;
        text-align: right;
        vertical-align: top;
    }
    
    .required {
        color: red;
    }
    
    #city-select {
        background: #ffffff;
        width: 200px;
        height: 32px;
        padding-left: 5px;
        box-sizing: border-box;
        border: solid 1px #d6e1e5;
        background: url("../../../../assets/def.png") no-repeat 97% 7px;
        border-radius: 0;
    }
    
    .row-wrapper-no {
        background: transparent;
        margin-top: 10px;
    }
    
    .add-title {
        font-size: 14px;
        color: #292c31;
        font-weight: bold;
        line-height: 50px;
        padding-left: 20px;
    }
    
    .add-main {
        background: #f4f4f4;
    }
    
    .input-area {
        margin-top: 30px;
        padding-left: 40px;
    }
</style>