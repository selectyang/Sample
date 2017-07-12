import Vue from 'vue';
import AV from 'leancloud-storage';


var APP_ID = 'Vibv9y7ziKsBPqqHVFG2ydaC-gzGzoHsz'
var APP_KEY = 'St0WMj4asvAHeDQmdYicsC4Y'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
})

var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}


var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: [],
    currentUser: null,
    format_nowTime: '',
    logbackground: false,
    actionType: 'signUp',
    formData: {
      username: '',
      password: '',
      password_verif: ''
    },
  },
  created: function() {
    this.currentUser = this.getCurrentUser();
    this.fetchTodos()
    this.nowTime()
  },

  methods: {
    formatTime: function(time){
      // var time = new Date()
      var strArray=['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      var date = time.getDate()
      var month = strArray[time.getMonth()]
      var year = time.getFullYear()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return '' + year + '-' + month + '-' + (date <= 9 ? '0' + date : date) + ' '  + (hours<=9 ? '0'+ hours : hours) + ':' + (minutes<=9 ? '0' + minutes : minutes);
    },
    nowTime: function() {
      var _this = this
      this.format_nowTime = this.formatTime(new Date())
      setInterval(function(){
        let nowTime = new Date()
        _this.format_nowTime = _this.formatTime(nowTime)
      },60000)
    },
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
    toggleFinish: function(todo) {
      todo.isFinished = !todo.isFinished
      this.saveOrUpdateTodos()
    },
    saveOldList: function() {
      this.oldList = this.todoList
    },
    filterAll: function() {
      if(this.oldList === undefined){
        return
      }else {
        this.todoList = this.oldList
      }
      this.logbackground = false
    },
    filterTodo: function() {
      this.filterAll()
      this.saveOldList()
      let finList = []
      for(var i=0; i<this.todoList.length;i++){
        let result = this.todoList[i]
        if(result.isFinished === false){
          finList.push(result)
        }
      }
      this.todoList = finList
      this.logbackground = true
    },
    updateTodos: function(){
      //更新对象https://leancloud.cn/docs/leanstorage_guide-js.html
      let listString = JSON.stringify(this.todoList)
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
      let createTime = new Date()
      this.todoList.push({
        title: this.newTodo,
        createdAT: this.formatTime(createTime),
        isFinished: false
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
    signUp: function() {
      let username = this.formData.username
      let password = this.formData.password
      let password_verif = this.formData.password_verif
      let Myreg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!Myreg.test(this.formData.username)) {
        alert('请输入正确的邮箱地址！')
        return
      }
      let password_lengcheck = function(){
        if((password.length >= 6) && (password.length <= 16)){
          return true
        }else {
          alert('请输入正确长度密码!')
          return false
        }
      }
      if(password_lengcheck()) {
        if (password === password_verif) {
          let user = new AV.User()
          user.setUsername(username)
          user.setPassword(password)
          user.signUp().then((loginedUser) => {
            this.currentUser = this.getCurrentUser()
            this.loginUsername = this.currentUser.username
            //console.log('signUpcurrent',this.currentUser)
          }, function (error) {
            alert('注册失败')
          })
        } else {
          alert('密码不一致！')
        }
      }
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
      // this.formData.username = ''
      // this.formData.password = ''
      this.actionType = 'signUp'
      window.location.reload()
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