/*
 * Author  liuzhijun
 *
 */

//public function
function getParam(name,murl) {
	var url = murl || window.location.search;
	var reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i');
	var arr = url.match(reg);
	if (arr) return arr[2];
}

(function(){
	function setCurrent($el){
		$el.addClass('current').siblings().removeClass('current');
	}
	window.onload=function(){
		/*
		 *导航栏
		 */
		var $menuUl = $("ul.menuList");
		var leftBase = 200;
		var $menuTarget = $('div.menuTarget');

		init();

		function setMenuTarget(index){
			var tl = leftBase + index * 60;
			$menuTarget.stop().animate({
				'left': tl
			},500);
		}

		function init(){
			$('div.logoWrap').click(function(){
				window.location.href='index.html';
			});
			addEvent();
		}

		function addEvent(){
			$('li',$menuUl).mouseenter(function(){
				var $this = $(this);
				setCurrent($this);
				var index = $this.index();
				if(index>3) index--;
				setMenuTarget(index);
			});
			$menuUl.mouseleave(function(){
				var index = parseInt($(this).attr('currentPage'));
				if(index>3) index--;
				var $currentLi=$menuUl.find('li:eq('+index+')');
				setCurrent($currentLi);
				setMenuTarget(index);
			});
			/*
			 *New Bee 能为你做什么
			 */
			$('div.flowWrap').mouseenter(function(){
				setCurrent($(this));
			});

			$('.footer.clearfix').hide();
			$('.footerWrapper hr').hide();
		}
	}
})();
