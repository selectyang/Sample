/**
 * Created by qiangxl on 17/8/9.
 */
require('scss/toast.scss')
require('jquery')

function toast(msg,time){
  this.msg = msg;
  this.dismissTime = time || 1000 //1ms
  this.createToast()
  this.showToast();
}
toast.prototype = {
  createToast: function(){
    var tempHtml = '<div class="toast">'+ this.msg + "</div>"
    this.$toast = $(tempHtml)
    $('body').append(this.$toast)
  },
  showToast: function(){
    var self = this
    this.$toast.fadeIn(300,function(){
      setTimeout(function(){
        self.$toast.fadeOut(300,function(){
          self.$toast.remove()
        })
      },self.dismissTime)
    })
  }
}

function Toast(msg,time){
  return new toast(msg,time)
}

module.exports.Toast = Toast