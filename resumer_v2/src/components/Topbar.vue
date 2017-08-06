<template>
    <div id="Topbar">
        <div class="logo">
            <h1>Resumer</h1>
        </div>
        <div v-if="logined" class="user">
            <span class="userAction">你好，{{user.username}}</span>
            <span @click="signOut">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                </svg><span>登出</span>
            </span>
        </div>
        <div v-else class="user">
            <li @click="signUpDialogVisible = true">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                </svg><span>登陆</span>
            </li>
        </div>
        <MyDialog :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
            <SignUpForm @success="signIn($event)"/>
        </MyDialog>
    </div>

</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
import AV from '../lib/leancloud'

export default {
  name: 'Topbar',
  data(){
    return {
        signUpDialogVisible: false
    }
  },
  components: {MyDialog,SignUpForm},
  computed: {
     user(){
        return this.$store.state.user
      },
     logined(){
       return this.user.id
     }
  },
  methods: {
    signOut(){
      AV.User.logOut()
      this.$store.commit('removeUser')
    },
    signIn(user){
      this.signUpDialogVisible = false
      console.log('user',user)
      this.$store.commit('setUser',user)
    }
  }
}
</script>

<style lang="scss">
    #Topbar {
        margin: 12px 0 ;
        position: relative;

        .logo{
            text-align: center;
        }
        .user {
            position: absolute;
            top: 10px;
            right: 20px;
            cursor: pointer;
            color: #FF4949;
            font-size: 24px;
            span {
                padding-left: 3px;
                font-size: 18px;
            }
            .userAction {
                color: #0F0E0D;
                font-size: 16px;
                padding-right: 20px;
            }
        }
    }

</style>