import Vue from 'vue'

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  created: function() {
    window.onbeforeunload = () => {
      let listString = JSON.stringify(this.todoList)
      let itemString =  JSON.stringify(this.newTodo)
      window.localStorage.setItem('myTodoList',listString)
      window.localStorage.setItem('myTodo',itemString)
    }
    let oldlistString = window.localStorage.getItem('myTodoList')
    let olditemString = window.localStorage.getItem('myTodo')
    let oldlistData = JSON.parse(oldlistString)
    let olditemData = JSON.parse(olditemString)
    this.todoList = oldlistData || []
    this.newTodo = olditemData || []

    Date.prototype.format = function () {
      var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
    addTodo: function() {
      this.todoList.push({
        title: this.newTodo,
        createdAT: new Date().format(),
        done: false
      })
      this.newTodo = '' //变成空
      console.log(this.todoList)
    },
    removeTodo: function(todo) {
      let index = this.todoList.indexOf(todo) //Arran.prototype.indexOf ES 5 新API
      this.todoList.splice(index,1)
    }
  }
})