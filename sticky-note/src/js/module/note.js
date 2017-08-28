/**
 * Created by qiangxl on 17/8/13.
 */
require('scss/notes.scss')

var Event = require('module/event.js')
var Toast = require('./toast.js').Toast


function Note(opts){
  this.initOpts(opts)
  this.createNote()
  this.setStyle()
  this.bindEvent()
}

Note.prototype = {
  colors: [
    ['#ea9b35','#efb04e'], // headColor, containerColor
    ['#dd598b','#e672a2'],
    ['#eee34b','#f2eb67'],
    ['#c24226','#d15a39'],
    ['#c1c341','#d0d25c'],
    ['#3f78c3','#5591d2']
  ],
  rotates: ['rotate(-5deg)','rotate(-4deg)','rotate(-3deg)','rotate(-2deg)','rotate(-1deg)','rotate(5deg)','rotate(4deg)','rotate(3deg)','rotate(2deg)','rotate(1deg)'],
  defaultOpts: {
    id: '',  //Note 的 id
    $content: $('#content').length > 0 ? $('#content') : $('body'), //存放Note的容器
    context: 'input here'  //Note 的内容
  },
  initOpts: function(opts){
    this.opts = $.extend({},this.defaultOpts, opts || {})
    if(this.opts.id){
      this.id = this.opts.id
    }
  },
  createNote: function(){
    var template = '<div class="note"><div class="note-parent"><div class="note-child">'
                  +'<div class="note-head"><img src="http://ourpo1xzl.bkt.clouddn.com/17-8-19/41871625.jpg" alt=""/>'
                  + '<span class="delete">&times;</span></div>'
                  +'<div class="note-content" contenteditable = "true"></div>'
                  +'</div></div></div>'
    this.$note = $(template)
    this.$note.find('.note-content').html(this.opts.context)
    this.opts.$content.append(this.$note)
    //if(!this.id) this.$note.css('bottom','10px') //新增放到右边
  },

  setStyle: function(){
    var color = this.colors[Math.floor(Math.random()*6)]
    var rotate = this.rotates[Math.floor(Math.random()*10)]
    this.$note.find('.note-child').css('background-color',color[1])
    //this.$note.find('.note-head').css('background-color',color[0])
    this.$note.find('.note-parent').css('transform',rotate)
  },

  setLayout: function(){
    var self = this
    if(self.clock){
      clearTimeout(self.clock)
    }
    self.clock = setTimeout(function(){
      Event.fire('waterfall')
    },100)
  },

  bindEvent: function(){
    var self = this
    $note = this.$note
    $noteHead = $note.find('.note-head')
    $noteContent = $note.find('.note-content')
    $delete = $note.find('.delete')

    $delete.on('click',function(){
      self.delete()
    })
    //
    $noteContent.on('focus',function(){
      if($noteContent.html() == 'input here') {
        $noteContent.html('')
      };
      $noteContent.data('before',$noteContent.html());
    }).on('blur paste',function(){
      if($noteContent.data('before') != $noteContent.html()){
        $noteContent.data('before',$noteContent.html())
        self.setLayout();
        if(self.id){
          self.edit($noteContent.html())
        }else {
          self.add($noteContent.html())
        }
      }
    })

    //设置Note 的移动
    $noteHead.on('mousedown',function(e){
      var eventX = e.pageX - $note.offset().left ,//eventX 计算事件的触发点在dialog内部到dialog左边的距离
          eventY = e.pageY - $note.offset().top
      $note.addClass('draggable').data('evtPos',{x: eventX, y: eventY}) //把事件dialog边缘的距离保存下来
    }).on('mouseup',function(){
      $note.removeClass('draggable').removeData('pos')
    })

    $('body').on('mousemove',function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY - $('.draggable').data('evtPos').y,
        left: e.pageX - $('.draggable').data('evtPos').x
      })
    })
  },

  edit: function(msg){
    var self = this
    $.post('/api/notes/edit',{
      id: this.id,
      note: msg
    }).done(function(ret){
      if(ret.status === 0){
        Toast('update succss')
      }else{
        Toast(ret.errorMsg)
      }
    })
  },
  add: function(msg){
    var self = this
    $.post('/api/notes/add',{
      note: msg
    }).done(function(ret){
      if(ret.status === 0){
        Toast('add success')
      }else{
        self.$note.remove();
        Event.fire('waterfall')
        Toast(ret.errorMsg)
      }
    })
  },

  delete: function(){
    var self = this
    $.post('/api/notes/delete',{id: this.id})
      .done(function(ret) {
        if (ret.status === 0) {
          Toast('delete success')
          self.$note.remove()
          Event.fire('waterfall')
        }else{
          Toast(ret.errorMsg)
        }
      })
  }
}

module.exports.Note = Note