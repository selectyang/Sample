var FullPage = (function(){
    function _FullPage(options){
        var defaultOptions = {
            element: '',
            duration: '1s'
        }
        this.currentIndex = 0
        this.animating = false
        this.options = $.extend({},defaultOptions,options)
        this.init().checkOptions().initHtml().bindEvents()
    }
    _FullPage.prototype.init = function() {
        this.$container = $(this.options.element)
        this.$section   = this.$container.find('.section')
        //console.log('element',this.options.element)
        return this
    }
    _FullPage.prototype.checkOptions = function() {
        if(!this.options.element){
            throw new Error('element is required')
        }
        //console.log('checkOptions',this)
        return this
    }
    _FullPage.prototype.initHtml = function(){
        var than = this
        this.$container.css("overflow","hidden")
        this.$section.each(function(index,section) {
            $(section).css("transition","transform" + " " + than.options.duration)
        })
        //console.log('initHtml',this)
        return this
    }
    _FullPage.prototype.bindEvents = function() {
        this.options.element.addEventListener('wheel',e => {
            //console.log('wheel')
            let targetIndex = this.currentIndex + (e.deltaY > 0 ? 1 : -1)
            //console.log('tar',targetIndex)
            this.goToSection(targetIndex).then(
                () => {
                    this.currentIndex = targetIndex;
                },
                () => {}
            )
        })
        this.onSwipe(this.options.element,(e,dir) => {
            var targetIndex
            if(dir === 'down') {
                targetIndex = this.currentIndex - 1
            }else if (dir === 'up') {
                targetIndex = this.currentIndex + 1
            }else {
                return
            }
            this.goToSection(targetIndex).then(
                () => {
                    this.currentIndex = targetIndex
                },
                () => {}
            )
        })
        return this
    }

    _FullPage.prototype.goToSection = function(targetIndex) {
        //console.log('legth',this.$section.length)
        return new Promise((resolve, reject) => {
            if(this.animating) {
                reject()
            }else if(targetIndex < 0) {
                reject()
            }else if(targetIndex >= this.options.element.children.length) {
                reject ()
            }else {
                this.animating =true;
                var that = this;
                this.options.element.children[0].addEventListener('transitionend',function callback() {
                    this.removeEventListener('transitionend',callback)
                    that.animating = false;
                    resolve()
                })
                this.$section.each(function(index,section) {
                    section.style.transform = "translateY"+ 100* targetIndex + "%"
                })
            }
        })
    }

    _FullPage.prototype.onSwipe = function(element, fn) {
        var  x0, y0
        element.addEventListener('touchstart', function(e) {
            x0 = e.touches[0].clientX
            y0 = e.touches[0].clientY
        })
        element.addEventListener('touchmove', function(e) {
            if (!x0 || !y0) {
                return
        }
        var xDiff = e.touches[0].clientX - x0
        var yDiff = e.touches[0].clientY - y0

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
            fn.call(element, e, 'right')
            } else {
            fn.call(element, e, 'left')
            }
        } else {
            if (yDiff > 0) {
            fn.call(element, e, 'down')
            } else {
            fn.call(element, e, 'up')
            }
        }
        x0 = undefined
        y0 = undefined
        })
  }    

    return {
        init: function(options){
            new _FullPage(options)
        }
    }


})()