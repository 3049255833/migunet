<template>
    <div id="app">
        <router-view></router-view>
        <v-loading v-if="$root.isLoaging"></v-loading>
        <v-toast v-if="$root.toast" :toast="$root.toast" :toastText="$root.toastText"></v-toast>
    </div>
</template>
<script>
    import VLoading from "@/components/loading";
    import VToast from "@/components/new-toast";
    export default {

        name: 'app',

        components: {
            VLoading,
            VToast
        },
        
        watch:{
        }

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    body {
        padding: 0;
        margin: 0;
    }
    .testHash{
        display: none;
    }
    #app {
        font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333333;
        min-width: 1000px;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
    }
    
    input, textarea {
        border: solid 1px #d6e1e5;
    }
    
    /*:-moz-placeholder {
       color: #d6e1e5;
   }
   
   ::-moz-placeholder {
       color: #d6e1e5;
   }
   
   input:-ms-input-placeholder{
       color: #d6e1e5;
   }
   
   input::-webkit-input-placeholder{
       color: #d6e1e5;
   }
   select {
     appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
   }*/
</style>
