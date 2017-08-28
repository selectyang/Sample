/**
 * Created by qiangxl on 17/8/16.
 */
var Sequelize = require('sequelize')
var path = require('path')

const sequelize = new Sequelize(undefined, undefined, undefined,{
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: path.join(__dirname,'../database/database.sqlite')
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  }
});

Note.sync()

// Note.sync({force: true})
//  //force: true will drop the table if it already exists
//  Note.sync({force: true}).then(function () {
//    // Table created
//    return Note.create({
//      text: 'hello world'
//    });
// });

// Note.sync().then(function(){
//   Note.create({text: 'hello world'},{uid: 'selectyang'})
// }).then(function(){
//   Note.findAll().then(function(notes){
//     console.log(notes)
//   })
// })

module.exports = Note