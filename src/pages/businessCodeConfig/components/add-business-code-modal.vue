<template>
    <div class="add-business-code-container">
        <input type="text" placeholder="填写名称" class="form-input" id="name"/>

        <div class="btn-group btn-group-center">
            <div class="btn btn-primary btn-middle-100" @click="confirm">确定</div>
            <div class="btn btn-default btn-middle-100">取消</div>
        </div>
    </div>
</template>

<script>
    import Bus from './bus';

    export default {
        name: 'AddBusinessCode',
        methods: {
            confirm() {
                var name = document.getElementById("name").value;

                Bus.$emit('addCatalog', name);
            }
        }
    }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    .add-product-container {
        text-align: center;

        input {
            margin: 25px 0;
            width: 240px !important;
        }
    }
</style>
