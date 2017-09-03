/**
 * Created by Admin on 2017/6/5.
 */

window.onload=function(){
    var textLi = getLi("scroll_top_ul"),
            dotLi = getLi("navigation"),
            textUl=document.getElementsByClassName("scroll_top_ul")[0];
    var k=0,iTarget=0,timer=null;

    textUl.innerHTML+=textUl.innerHTML;

    nav_init()
    carouser_init()
    autoCarouser();

    function nav_init(){
        var iTarget=0;
        var nav=document.getElementsByClassName("nav")[0];
        var oDiv=document.getElementsByClassName("page");
        var navLi=getLi("nav_list_ul");

        for(var i=0;i<navLi.length;i++){
            navLi[i].index=i;
            navLi[i].onclick=function(){
                iTarget=oDiv[this.index].offsetTop-nav.offsetHeight;
                buffter(iTarget);
            };
        }
    }

    //导航缓冲运动
    function buffter(iTarget){
        var timer=null,speed=0,current=0;
        clearInterval(timer);
        timer=setInterval(function(){
            current=scroll().top;
            speed=(iTarget-current)/10;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            scrollTo(0,current+speed);
            if(!speed){
                clearInterval(timer);
            }
        },30)
    }

    function scroll(){
        if(document.body.scrollLeft||document.body.scrollTop){
            return {
                left:document.body.scrollLeft,
                top:document.body.scrollTop
            }
        }else{
            return{
                left:document.documentElement.scrollLeft,
                top:document.documentElement.scrollTop
            }
        }
    }

    function getLi(obj){
        return document.getElementsByClassName(obj)[0].children;
    }

    function carouser_init(){
        for(let i=0;i<dotLi.length;i++){
            dotLi[i].onmouseover=function(){
                return function(){
                    k=i;
                    iTarget = k*(-textLi[i].offsetHeight);
                    animate(textUl,{'margin-top':iTarget});
                    dotStyle();
                }
            }(i)
            dotLi[i].onmouseout=function(){
                autoCarouser();
            }(i)
        }        
    }    

    //样式
    function getStyle(that,attr){
        if(that.currentStyle){
            return that.currentStyle[attr];//ie浏览器
        }else{
            return window.getComputedStyle(that,null)[attr];//正常浏览器
        }
    }

    // 缓冲运动（多属性）
    function animate(that,json,fn){
        clearInterval(that.timer);
        that.timer=setInterval(function(){
            var off=true;
            for(var attr in json){
                var iTarget=json[attr];
                cur=parseInt(getStyle(that,attr));
                speed=(iTarget-cur)/10;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                if(attr=="opacity"){
                    that.style.opacity=json[attr]/100;
                    that.style.filter="alpha(opacity="+json[attr]+")";
                }else if(attr=="zIndex"){
                    that.style.zIndex=json[attr];
                }
                else{
                    that.style[attr]=cur+speed+"px";
                    if(cur!==json[attr]){
                        off=false;
                    }
                }
            }
            if(off){
                clearInterval(that.timer);
                if(fn){
                    fn();
                }
            }
        },30)
    }

    // 自动轮播
    function autoCarouser(){
        clearInterval(timer); 
        timer=setInterval(function(){
            k=++k;
            k=k>textLi.length?1:k;
            if(k>=textLi.length-1){
                k=1;
                textUl.style.marginTop=0;
            }
            iTarget = k*(-textLi[0].offsetHeight);
            animate(textUl,{'margin-top':iTarget});
            dotStyle();
        },3000);
        
    }

    // 小圆点样式
    function dotStyle(){
        for(let i=0;i<dotLi.length;i++){
            dotLi[i].className="";
        }
       dotLi[k%2].className="curr";
    }



        

}