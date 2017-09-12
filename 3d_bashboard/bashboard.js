/*在html引入bashboard.css和bashboard.js文件
 new bashboard('element') 将bashboard的父元素传入
*/

function bashboard(element){
  if(element === undefined){
    this.el = 'body'
  }else{
    this.el = element 
  }
  this.init()
  this.ajax_get().then(this.render.bind(this), console.error)
  //此处调用render 需要重新绑定this
}

bashboard.prototype.init = function(){
  let bashboard_el = document.querySelector(this.el)
  this.pointer = bashboard_el.querySelector('.dashboard .pointer')
  this.input = bashboard_el.querySelector('.dashboard #speed-input')
  this.weather_img = bashboard_el.querySelector('.dashboard .weather-img')
}

bashboard.prototype.render = function(data){
  let deg,value,city;
  let codeImg = `https://weixin.jirengu.com/images/weather/code/${data.weather[0].now.code}.png`
  value = data.weather[0].now.temperature;
  city = data.weather[0.].city_name
  //计算温度对应的角度值
  if(value <= 0){
    deg = (value + 15) * 3
  }else if(value > 0 && value <= 20){
    deg = value * 4.5 + 45  
  }else if(value > 20){
    deg = (value -20) *3 + 135  
  }
  this.pointer.style.transform="rotate("+ deg +"deg)"
  this.weather_img.style.background = `url("${codeImg}") center center/100px no-repeat`
  this.input.value = city + ': ' + value + '℃';
}

//ajax 请求天气数据
bashboard.prototype.ajax_get = function(){
  let url = 'https://weixin.jirengu.com/weather'
  let result
  let xhr = new XMLHttpRequest()
  let p = new Promise(function(resolve, reject){
    xhr.onload = function(event){
      if(this.status === 200 || this.status === 304){
        result = JSON.parse(xhr.responseText)
        resolve(result)
      }
    }
    xhr.onerror = function(evnet){
      reject(evnet)
    }
    xhr.open('GET',url,true)
    xhr.send('')
  })
  return p
}

let app = new bashboard('body')

