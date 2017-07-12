import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'Vibv9y7ziKsBPqqHVFG2ydaC-gzGzoHsz'
var APP_KEY = 'St0WMj4asvAHeDQmdYicsC4Y'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
})

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: [],
    loginUsername: '',
    currentUser: null,
    actionType: 'signUp',
    formData: {
      username: '',
      password: ''
    },
  },
  created: function() {

    this.currentUser = this.getCurrentUser();
    this.fetchTodos()
    if(this.currentUser){
        this.loginUsername = this.currentUser.username
        //console.log('user_name', this.currentUser.username)
    }
    Date.prototype.format = function () {
      var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul ', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var date = this.getDate()
      var month = strArray[this.getMonth()]
      var year = this.getFullYear()
      var hours = this.getHours()
      var minutes = this.getMinutes()
      var seconds = this.getSeconds()
      return '' + (date <= 9 ? '0' + date : date) + '-' + month + '-' + year + ' ' + (hours<=9 ? '0'+ hours : hours) + ':' + (minutes<=9 ? '0' + minutes : minutes);
    }
  },
  methods: {
    fetchTodos: function(){
      if(this.currentUser) {
        var query = new AV.Query('AllTodos');
        query.find()
          .then((todos) => {
              let avAllTodos = todos[0]
              let id = avAllTodos.id
              this.todoList = JSON.parse(avAllTodos.attributes.content)
              this.todoList.id = id
          }, function(error){
            console.error(error)
          })
      }
    },

    updateTodos: function(){
      //更新对象https://leancloud.cn/docs/leanstorage_guide-js.html
      let listString = JSON.stringify(this.todoList)
        console.log('listString_id',listString)
      let avTodos = AV.Object.createWithoutData('AllTodos',this.todoList.id)
      avTodos.set('content',listString)
      avTodos.save().then(()=>{
        console.log('更新成功')
      })
    },

    saveTodos: function() {
      let listString = JSON.stringify(this.todoList);
      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();
      var acl = new AV.ACL()
      acl.setReadAccess(AV.User.current(),true)
      acl.setWriteAccess(AV.User.current(),true)
      
      avTodos.set('content', listString)
      avTodos.setACL(acl)
      avTodos.save().then((todo) => {
          this.todoList.id = todo.id
          console.log('保存成功');
        }, function (error) {
          console.error('保存失败');
        })
    },

    saveOrUpdateTodos: function() {
      if(this.todoList.id) {
        this.updateTodos()
      }else {
        this.saveTodos()
      }
    },

    addTodo: function() {
      this.todoList.push({
        title: this.newTodo,
        createdAT: new Date().format(),
        done: false
      })
      this.newTodo = '' //变成空
      //console.log(this.todoList)
      //this.saveTodos()
      this.saveOrUpdateTodos()
    },
    removeTodo: function(todo) {
      let index = this.todoList.indexOf(todo) //Arran.prototype.indexOf ES 5 新API
      this.todoList.splice(index,1)
      //this.saveTodos()
      this.saveOrUpdateTodos()
    },
    signUp: function(){
      let user = new AV.User()
      user.setUsername(this.formData.username)
      user.setPassword(this.formData.password)
      user.signUp().then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
        this.loginUsername = this.currentUser.username
        //console.log('signUpcurrent',this.currentUser)
      },function (error){
        alert('注册失败')
      })
    },
    login: function() {
      AV.User.logIn(this.formData.username,this.formData.password).then((loginedUser) => {
        this.currentUser =  this.getCurrentUser()
        this.fetchTodos()
        this.loginUsername = this.currentUser.username
        //console.log('loginCurrent',this.currentUser.username)
      },function(error){
        alert('登陆失败')
      })
    },
    logOut: function() {
      AV.User.logOut()
      this.currentUser = null
      this.formData.username = ''
      this.formData.password = ''
      this.actionType = 'signUp'
      window.location.reload()
      //console.log(this.currentUser)
    },
    getCurrentUser: function() {
      let current = AV.User.current()
      if(current){
        let {id, createdAt, attributes: {username}} = current
        //console.log('AV.user.current',AV.User.current())
        //console.log('object',JSON.stringify(this.todoList))
        return {id,createdAt,username}
      }else {
        return null
      }
    }
  }
})