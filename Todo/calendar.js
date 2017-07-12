/**
 * Created by qiangxl on 17/7/9.
 */
import $ from 'jquery'

export default function Calendar(target) {
  function Calendar(target) {
    this.input = $(target);
    this.initDate();
    this.bindEvents();
  }

  Calendar.prototype = {
    initDate: function () {
      this.currentDate = new Date();//存储修改后的日历数据
      this.date = new Date();//生成日历当前日期时间
      var message = this.newCalendar(this.date);
      this.render();
      this.setNavDate(message);
      this.setDate(message);
      this.setTime(message);
    },

    newCalendar: function (date) {//生成日历所需的数据
      var month = date.getMonth(),
          year = date.getFullYear(),
          day = date.getDate(),
          hours = date.getHours(),
          minutes = date.getMinutes(),
          whichMonthDay = new Date(year, month, 1),
          monthFirstDay = whichMonthDay.getDay(),// 一号是周几
          monthFirstDate = new Date(year, month, -monthFirstDay); //当月日历页面第一天是从那天开始（+1）
      var message = {
          month: month,
          year: year,
          date: day,
          hours: hours,
          minutes: minutes,
          whicMonthDay: whichMonthDay,
          monthFirstDay: monthFirstDay,
          monthFirstDate: monthFirstDate,
          hourString: (hours <= 9 ? '0' + hours : hours) + ':' + (minutes <= 9 ? '0' + minutes : minutes),
          dateString: year + '/' + (month + 1) + '/' + day
      }
      return message;
    },

    render: function () {//渲染日历nva部分
      var tempHtml = '<div class="calendar" style="display:none">'
        + '<div class="header"><span class="pre caret-left"></span>'
        + '<span class="current year">2017</span><span class="current">年</span>'
        + '<span class="current month">5</span><span class="current">月</span>'
        + '<span class="next caret-right"></span></div>'
        + '<table class="panel"><thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>'
        + '</table><table class="footer"><input type="text" value=""><button class="ok">确认</button></table></div>';
      this.$tempHtml = $(tempHtml);
      this.$tempHtml.insertAfter(this.input).css({
        'position': 'absolute',
        'left': this.input.offset().left-170,
        'top': this.input.offset().top + this.input.height(true)
      });
    },

    setNavDate: function (options) {//设置日历nav部分显示的数据
      var year = options.year,
          month = options.month,
          date = options.date;
      this.$tempHtml.find('.year').text(year);
      this.$tempHtml.find('.month').text(month + 1);
      this.currentDate.setFullYear(year);
      this.currentDate.setMonth(month);
      this.currentDate.setDate(date);
    },

    setDate: function (options) {//渲染日历日期部分
      var firstDate = options.monthFirstDate;
      var date = firstDate.getDate();
      var tableHtml = '';
      this.$tempHtml.find('tbody').remove();
      for (var i = 0; i < 6; i++) {
        tableHtml += '<tr">';
        for (var j = 0; j < 7; j++) {
          firstDate.setDate(++date);
          date = firstDate.getDate();
          if ((i == 0 && date > 8) || (i >= 4 && date < 12)) {
            tableHtml += '<td class="pre-month">' + date + '</td>';
          } else {
            tableHtml += '<td class="cur-month">' + date + '</td>';
          }
        }
        tableHtml += '</tr>';
      }
      this.$tempHtml.find('.panel').append(tableHtml);
      this.$tempHtml.find('.cur-month').eq(this.currentDate.getDate() - 1).addClass('cur-date');
      //对选中的日期添加样式
    },

    setTime: function(options){//渲染日历上的时间
      //console.log('setTime',options.hourString)
      this.$tempHtml.find('input').val(options.hourString)
    },

    bindEvents: function () {//事件监听
      var _this = this;
      //对月份的增减事件监听
      this.$tempHtml.find('.pre').on('click', function () {
        if (_this.currentDate.getMonth() === 0) {
          _this.currentDate.setFullYear(_this.currentDate.getFullYear() - 1);
          _this.currentDate.setMonth(11);
        } else {
          _this.currentDate.setMonth(_this.currentDate.getMonth() - 1);
        }
        var message = _this.newCalendar(_this.currentDate);
        _this.setNavDate(message);
        _this.setDate(message);
      });
      this.$tempHtml.find('.next').on('click', function () {
        if (_this.currentDate.getMonth() === 12) {
          _this.currentDate.setFullYear(_this.currentDate.getFullYear() + 1);
          _this.currentDate.setMonth(0);
        } else {
          _this.currentDate.setMonth(_this.currentDate.getMonth() + 1);
        }
        var message = _this.newCalendar(_this.currentDate);
        _this.setNavDate(message);
        _this.setDate(message);
      });
      //事件代理，监听单个日期上的点击事件
      this.$tempHtml.find('.panel').on('click', '.cur-month', function (e) {
        var target = e.target;
        if (target.tagName === "TD" && $(target).html()) {
          _this.currentDate.setDate(parseInt(($(target).text()), 10))//将dom上的日期保存到currdentDate中间变量中
          var message = _this.newCalendar(_this.currentDate);//将中间变量中的日期信息更新给渲染时间数据中
          _this.input.val(message.dateString +' ' + message.hourString)//输入框中显示设置后的时间
          _this.setDate(message);//重新渲染日历上日期
        }
      })
      //事件监听，监听时间设置上的点击事件
      this.$tempHtml.find('.ok').on('click',function(e){
        var target = e.target
        var firsTime = _this.$tempHtml.find('input').val().split(':')
        var h = parseInt((firsTime[0]),10),
            m = parseInt((firsTime[1]),10)
        if(h>23 || m>59 || firsTime == ''){
          alert('时间输入错误，请重新输入！')
          return
        }
        _this.currentDate.setHours(parseInt(firsTime[0], 10))
        _this.currentDate.setMinutes(parseInt(firsTime[1], 10))
        //
        var message = _this.newCalendar(_this.currentDate)
        _this.setTime(message)
        _this.input.val(message.dateString + ' ' + message.hourString)
        _this.$tempHtml.remove();
        $('.calendar').remove();
      })
      //input触发显示日历
      this.input.on('click', function (e) {
        e.stopPropagation();
        _this.$tempHtml.show();
      })
    }
  }
  var xxx = new Calendar(target)
}


