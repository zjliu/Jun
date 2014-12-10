//公共弹出层
/*!
 * author:yanchengqu 等我修炼成魔
 * qq:751646896
 */
function showPoup(){//弹出层
	var winWidth = $(window).width();
	var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
	var htmlHeight = (document.documentElement.clientHeight == 0) ? document.body.clientHeight : document.documentElement.clientHeight;
	var winHeight = htmlHeight + scrollTop;
	$('#poupCont').css({
		'position':'absolute','z-index':'9998',
		'left':'0','top':'0',
		'background-color':'rgba(0,0,0,0.8)',
		'width':winWidth,
		'height':winHeight
		 });	
}
function loadingPos(idDom){//物体
	//说明zepto不支持outerWidth()属性,display:block用offsetWidth代替,隐藏的用一下js代替:getSize(idDom).width
	  var $idDom = $(idDom);
	  //console.log(getSize(idDom).width);
	  $idDom.css({
	  position:'absolute',
	  'z-index':'9999',
	  left: ($(window).width() - getSize(idDom).width)/2,
	  top: ($(window).height() - idDom.style.height)/4 + document.body.scrollTop
	 });
	}
function poupClick(idDom){//点击事件
	$('#poupCont').remove();//先清除一下弹出层
	var idDomHtml =idDom;
	var idDom = document.getElementById(idDom);
	var $idDom = $(idDom);
	
	//灰色背景弹出层
	var BgDiv = "<div id='poupCont' style='display:none' onClick='BgCloseWin("+ idDomHtml +")'></div>";
	$('body').append(BgDiv);
	//document.body.appendChild(BgDiv);
	showPoup();
	loadingPos(idDom)
	$('#poupCont').css('display','block');
	 $idDom.css('display','block');
}

function closePoupWin(closeWinId){//关闭按钮点击
	var closeWinId = document.getElementById(closeWinId);
	var $closeWinId = $(closeWinId);
	$('#poupCont').css('display','none');
	 $closeWinId.css('display','none');
	 
	 //关闭弹出窗口之后执行的动作,此函数可以隐藏
 	 //closeOverFunc();
}

function BgCloseWin(idDom){//弹出层灰色背景点击关闭窗户
	var $idDom = $(idDom);
	$('#poupCont').css('display','none');
	 $idDom.css('display','none');
}



//以下是原始js判断隐藏元素宽和高
 //判断对象类型
 function getType(o){
            var _t;
            return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
        }
        //获取元素样式
 function getStyle(el, styleName) {
            return el.style[styleName] ? el.style[styleName] : el.currentStyle ? el.currentStyle[styleName] : window.getComputedStyle(el, null)[styleName];
        }
 function getStyleNum(el, styleName) {
            return parseInt(getStyle(el, styleName).replace(/px|pt|em/ig,''));
        }
 function setStyle(el, obj){
  if (getType(obj) == "object") {
   for (s in obj) {
    var cssArrt = s.split("-");
    for (var i = 1; i < cssArrt.length; i++) {
     cssArrt[i] = cssArrt[i].replace(cssArrt[i].charAt(0), cssArrt[i].charAt(0).toUpperCase());
    }
    var cssArrtnew = cssArrt.join("");
    el.style[cssArrtnew] = obj[s];
   }
  }
  else 
   if (getType(obj) == "string") {
    el.style.cssText = obj;
   }
 }
 function getSize(el) {
        if (getStyle(el, "display") != "none") {
            return { width: el.offsetWidth || getStyleNum(el, "width"), height: el.offsetHeight || getStyleNum(el, "height") };
        }
        var _addCss = { display: "", position: "absolute", visibility: 'hidden' };
        var _oldCss = {};
        for (i in _addCss) {
            _oldCss[i] = getStyle(el, i);
        }
 setStyle(el, _addCss);
        var _width = el.clientWidth || getStyleNum(el, "width");
        var _height = el.clientHeight || getStyleNum(el, "height");
        for (i in _oldCss) {
            setStyle(el, _oldCss);
        }
        return { width: _width, height: _height };
} 
//var dd=document.getElementById("test_display_block");   
//alert(getSize(dd).height); 