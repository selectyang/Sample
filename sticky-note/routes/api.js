/**
 * Created by qiangxl on 17/8/15.
 */
var express = require('express');
var router = express.Router();
var Note = require('../dataModel/note')

router.get('/notes',function(req,res,next){
  console.log('routes/api/notes...')
  var opts = {raw: true}
  // if(req.session && req.session.user){
  //   opts.where = {uid: req.session.user.id}
  // }
  Note.findAll(opts).then(function(notes){
    console.log('routes/api/notes : ',notes)
    res.send({status: 0,data: notes})
  }).catch(function(){
    res.send({status: 1,errorMsg: '数据库异常'})
  })
})

/*新增note*/
router.post('/notes/add', function(req, res, next){
  // if(!req.session || !req.session.user){
  //   return res.send({status: 1, errorMsg: '请先登录'})
  // }
  console.log('router/api/add: ',req.body)
  if (!req.body.note) {
    return res.send({status: 2, errorMsg: '内容不能为空'});
  }
  let note = req.body.note;
  // var uid = req.session.user.id;
  console.log({text: note})
  Note.create({text: note}).then(function(){
    console.log(arguments)
    res.send({status: 0})
  }).catch(function(){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

/*修改note*/
router.post('/notes/edit', function(req, res, next){
  // if(!req.session || !req.session.user){
  //   return res.send({status: 1, errorMsg: '请先登录'})
  // }
  var noteId = req.body.id;
  let note = req.body.note;
  // var uid = req.session.user.id;
  Note.update({text: note},{where:{id:noteId}}).then(function(lists){
    // if(lists[0] === 0){
    //   return res.send({ status: 1,errorMsg: '你没有权限'});
    // }
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

/*删除note*/
router.post('/notes/delete', function(req, res, next){
  // if(!req.session || !req.session.user){
  //   return res.send({status: 1, errorMsg: '请先登录'})
  // }
  let noteId = req.body.id
  // var uid = req.session.user.id;

  Note.destroy({where:{id:noteId}}).then(function(deleteLen){
    if(deleteLen === 0){
      return res.send({ status: 1,errorMsg: '你没有权限'});
    }
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

module.exports = router;