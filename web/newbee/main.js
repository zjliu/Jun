/*
 * Author  liuzhijun
 *
 */

(function(){
	function setCurrent($el){
		$el.addClass('current').siblings().removeClass('current');
	}
	window.onload=function(){
		/*
		 *导航栏
		 */
		var $menuUl = $("ul.menuList");
		$('li',$menuUl).mouseenter(function(){
			setCurrent($(this));
		});
		$menuUl.mouseleave(function(){
			var index = $(this).attr('currentPage');
			var $currentLi=$menuUl.find('li:eq('+index+')');
			setCurrent($currentLi);
		});

		/*
		 *New Bee 能为你做什么
		 */
		$('div.flowWrap').mouseenter(function(){
			setCurrent($(this));
		});
	}
})();
