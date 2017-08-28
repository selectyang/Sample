/**
 * Created by qiangxl on 17/8/14.
 */

var WaterFall = (function(){
  var $content
  var $items

  function render($c){
    $content = $c
    $items = $content.children()

    var nodeWidth = $items.outerWidth(true),
        colNum = parseInt($(window).width()/nodeWidth),
        colSumHeight = []

    for(var i=0; i<colNum; i++){
      colSumHeight.push(0)
    }

    $items.each(function(){
      var $cur = $(this)
      var index = 0,
        minSumHeight = colSumHeight[0]

      for(var i=0; i<colSumHeight.length; i++){
        if(colSumHeight[i] < minSumHeight){
          index = i;
          minSumHeight = colSumHeight[i]
        }
      }

      $cur.css({
        left: nodeWidth * index,
        top: minSumHeight
      })
      colSumHeight[index] = $cur.outerHeight(true) + colSumHeight[index]
    })
  }

  $(window).on('resize',function(){
    render($content)
  })
  return {
    init: render
  }
})()

module.exports = WaterFall