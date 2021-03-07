;(function($){
    $.fn.slider=function(options){
        var defaults={
            autoScroll:true, //是否滚动
            speed:2000,  //速度值
            numControl:false,  //数字
            arrowControl:false //是否有箭头
        }
        var seetings = $.extend({},defaults,options),
            slider = $(this),
            ul = slider.find('ul'),
            li = ul.find('li'),
            img = li.find('img'),
            width = slider.width(),
            height = slider.height(),
            timer = null,
            index=0
            
        
        // 设置图片宽高
        img.add(li).css({
            'width':width,
            'height':height
        })
        ul.width(li.length*width)

        // 开始滚动
        if(seetings.autoScroll){
            timer = setInterval(fn,seetings.speed)
        }

        // 如果有数字
        if(seetings.numControl){
            slider.append('<div id="num"></div>')
            for(var i=0;i<li.length;i++){
                $('#num').append('<span>'+(i+1)+'</span>')
            }
            $('#num span').first().addClass('active')

            slider.find('#num span').on('mouseover',function(){
                $(this).addClass('active').siblings().removeClass('active')

                index = $(this).index()
                showPic(index)
            })
        }

        // 如果有左右按钮箭头
        if(seetings.arrowControl){
            slider.append('<span class="left"></span> <span class="right"></span>')
            var prev = slider.find('.right')
            var next = slider.find('.left')
            prev.on('click',function(){
                index-=1
                if(index==-1)index=li.length-1
                showPic(index)
            })
            next.on('click',function(){
                index+=1
                if(index==li.length)index=0;
                showPic(index)
            })
        }
       
        function fn(){
            index++
            if(index==li.length)index=0;
            showPic(index)
        }
        function showPic(index){
            ul.animate({
                left:-index*width
            })
            slider.find('#num span').eq(index).addClass('active').siblings().removeClass('active')
        }

        // 鼠标移入停止滚动
        slider.on('mouseover',function(){
            clearInterval(timer)
        })
        slider.on('mouseout',function(){
            if(seetings.autoScroll){
                timer = setInterval(fn,seetings.speed)
            }
        })
         


        

        return this
    }
})(jQuery);