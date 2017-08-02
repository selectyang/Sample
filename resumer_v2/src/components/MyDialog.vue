<template>
    <div class="dialogwrapper">
        <div id="MyDialog" v-show="visible">
            <header>{{title}}
                <span class="close" @click="close">X</span>
            </header>
            <div class="signUp" v-if="actionType=='signUp'">
                <form @submit.prevent=signUp>
                    <div class="formRow">
                        <input type="text" placeholder="请输入邮箱">
                    </div>
                    <div class="formRow">
                        <input type="password" placeholder="请输入密码 (6~16位)">
                    </div>
                    <div class="formRow">
                        <input type="password" placeholder="请再次输入密码">
                    </div>
                    <div class="formActions">
                        <input type="submit" value="注册" class="signUp-button">
                    </div>
                </form>
            </div>
            <div class="login" v-if="actionType=='login'">
                <form @submit.prevent=login>
                    <div class="formRow">
                        <input type="text" placeholder="请输入用户名">
                    </div>
                    <div class="formRow">
                        <input type="password" placeholder="请输入密码">
                    </div>
                    <div class="formActions">
                        <input type="submit" value="登入" class="login-button">
                    </div>
                </form>
            </div>
            <div class="land-nav">
                <label :class="{active:actionType ==='signUp'}"><input type="radio" name="type" v-model="actionType" value="signUp">木有账号？马上注册一个</label>
                <label :class="{active:actionType ==='login'}"><input type="radio" name="type" v-model="actionType" value="login">以有账号？</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'MyDialog',
      props: ['title','visible'],
      data: function(){
        return {
          actionType: 'signUp',
        }
      }
    }
</script>

<style lang="scss">
.dialogWrapper {
    position: fixed;
    background: hsla(0, 0%, 0%, 0.85);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
#MyDialog {
    padding-top: 20px;
    width: 330px;
    margin: 0 auto;
    text-align: center;
    > header{
        padding-left: 280px;
        .close{
            cursor: pointer;
        }
    }
    .land-nav {
        padding-bottom: 24px;
        margin-top: 20px;
        color: #959595;
        font-size: 14px;
        label {
            cursor: pointer;
            padding: 10px;
        }
        .active{
            display: none;
        }
        input[type="radio"]{
            display: none;
        }
    }
    .formRow {
        margin: 10px;
        input{
            font-size: 16px;
            width: 300px;
            border-radius: 4px;
            border: 1px solid #787878;
            padding : 10px 5px;
            font-family: sans-serif;
        }
    }
    .formActions input {
        cursor: pointer;
        margin-top: 10px;
        padding: 6px;
        border: 1px solid #787878;
        border-radius: 4px;
    }
    .formActions .signUp-button {
        background-color: pink;
    }
    .formActions .login-button {
        background-color: green;
    }
    .formActions input[type="submit"] {
        width: 300px;
        font-size: 20px;
        color: #fff;
    }
}

</style>