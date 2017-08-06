<template>
    <div>
        <div class="signUp" v-if="actionType=='signUp'">
            <form @submit.prevent="signUp">
                <div class="formRow">
                    <input type="text" v-model="formData.username" placeholder="请输入用户名" required>
                </div>
                <div class="formRow">
                    <input type="password" v-model="formData.password" placeholder="请输入密码 (6~16位)" required>
                </div>
                <!--<div class="formRow">-->
                    <!--<input type="password" v-model="formData.password_verif" placeholder="请再次输入密码">-->
                <!--</div>-->
                <div class="formActions">
                    <input type="submit" value="注册" class="signUp-button">
                    <span class="errorMessage">{{errorMessage}}</span>
                </div>
            </form>
        </div>
        <div class="login" v-if="actionType=='signIn'">
            <form @submit.prevent="signIn">
                <div class="formRow">
                    <input type="text" v-model="formData.username" placeholder="请输入用户名" required>
                </div>
                <div class="formRow">
                    <input type="password" v-model="formData.password" placeholder="请输入密码" required>
                </div>
                <div class="formActions">
                    <input type="submit" value="登入" class="login-button">
                    <span class="errorMessage">{{errorMessage}}</span>
                </div>
            </form>
        </div>
        <div class="land-nav">
            <label :class="{active:actionType ==='signUp'}"><input type="radio" name="type" v-model="actionType"
                                                                   value="signUp">木有账号？马上注册一个</label>
            <label :class="{active:actionType ==='signIn'}"><input type="radio" name="type" v-model="actionType"
                                                                  value="signIn">以有账号？</label>
        </div>
    </div>
</template>

<script>
import AV from '../lib/leancloud'
import getErrorMessage from '../lib/getErrorMessage'
import getAVUser from '../lib/getAVUser'

export default {
  data () {
    return {
      actionType: 'signIn',
      formData: {
        username: '',
        password: '',
        password_verif: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    signUp(){
      let {username, password} = this.formData
      var user = new AV.User()
      user.setUsername(username)
      user.setPassword(password)
      user.signUp().then(() => {
        this.$emit('success', getAVUser())
      }, (error) => {
        this.errorMessage = getErrorMessage(error)
      })
    },
    signIn(){
      let {username,password} = this.formData
      AV.User.logIn(username,password).then(() => {
        this.$emit('success',getAVUser())
      },(error) => {
        this.errorMessage = getErrorMessage(error)
      })
    }
  }
}
</script>

<style lang="scss">
    .land-nav {
        padding-bottom: 24px;
        margin-top: 20px;
        color: #333;
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
    .errorMessage {
        display: block;
        padding-top: 5px;
        color: #e58c7c;
    }
</style>