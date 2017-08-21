<template>
    <div class="header">
        <div class="logo-wrapper">
       <span class="logo">
        <img src="../../assets/logo.png" alt=""/>
       </span>
            <span class="space-line"></span>
            <span class="logo-text">
        migunet能力平台
       </span>
        </div>
        <div class="menu-item">
            产品中心
        </div>
        <div class="head-info">
            <div class="user">
                早上好,{{user}}
            </div>
            <!-- <div class="message-wrapper">
              <span class="message-icon">
                <img src="../../assets/u14.png" alt=""/>
                <span class="message-num">{{messageNum}}</span>
              </span>
              <span class="message-text">
                消息
              </span>
            </div> -->
            <div class="login-time">
                上次登录时间:2017/07/30
            </div>
            <div class="logout-wrapper">
        <span class="logout-icon">
          <img src="../../assets/logout.png" alt=""/>
        </span>
                <span class="logout-text">
          退出
        </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'header',
        data ()
        {
            return {
                user: '咪咕',
                messageNum:9
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
    .header {
        background: #292c31;
        line-height: 58px;
        color:#ffffff;
        font-size: 16px;
        padding: 0 20px;
        
    }
    .login-time{
        float: left;
        color: #999999;
        font-size: 12px;
    }
    .space-line{
        display: inline-block;
        width: 1px;
        height: 16px;
        margin:0 5px;
        background-color: #838487;
    }
    
    .logo {
        display: inline-block;
        vertical-align: middle;
    }
    
    .logo-text {
        display: inline-block;
        vertical-align: middle;
        font-weight: bold;
        color: white;
    }
    
    .logo-wrapper {
        float: left;
    }
    
    .head-info {
        float: right;
        
    }
    
    .menu-item {
        float: left;
        margin-left: 50px;
        position: relative;
        color: white;
    }
    .menu-item:after{
        content: '';
        display: block;
        width: 100%;
        height: 4px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #46bafe;
        
    }
    
    
    
    .user {
        float: left;
        color: #999999;
        font-size:12px;
    }
    .login-time{
        margin-left: 30px;
    }
    
    .message-wrapper {
        float: left;
        margin-right: 20px;
    }
    
    .logout-wrapper {
        float: left;
        margin-left: 30px;
    }
    .logout-icon{
        margin-top: 3px;
        margin-right: 5px;
        
    }
    .logout-wrapper span{
        display: block;
        float: left;
    }
    .logout-wrapper :after{
        content: '';
        display: block;
        clear: both;
    }
    .message-icon{
        position: relative;
    }
    .message-num{
        position: absolute;
        right: 0;
        top: -9px;
        background: red;
        border-radius:50%;
        width: 15px;
        height: 15px;
        font-size:12px;
        color: #ffffff;
        text-align: center;
        line-height: 15px;
    }
    .header:after{
        content: '';
        display: block;
        clear:both;
    }

</style>
