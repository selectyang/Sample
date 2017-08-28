/**
 * Created by qiangxl on 17/8/8.
 */
require('scss/index.scss')

var NoteManager = require('../module/note-manager.js').NoteManager
var Event = require('../module/event.js')
var WaterFall = require('../module/waterfall.js')

NoteManager.load()

$('.add-note').on('click',function(){
  NoteManager.add()
})

Event.on('waterfall',function(){
  WaterFall.init($('#content'))
})

// var Toast= require('../module/toast.js').Toast
//
// Toast('Holle world my is note!')

