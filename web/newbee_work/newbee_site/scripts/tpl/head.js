/*TMODJS:{"version":7,"md5":"53e20a58e9d8a64bbdabb8cc5891b34d"}*/
define(function(require) {
    return require("./template")("head", function($data) {
        "use strict";
        var $utils = this, $string = ($utils.$helpers, $utils.$string), page = $data.page, $out = "";
        return $out += '<!-- 头部区域 -->\n<div class="headerWrapper">\n	<div class="headerWrap">\n	  <div class="header clearfix">\n		  <div class="logoWrap clearfix">\n			  <img class="fl" src="images/logo.png" width="70" height="64" />\n			  <div class="logoTitle">\n				<p class="chineTitle">新蜜蜂</p>\n				<p>New Bee</p>\n			  </div>\n		  </div>\n		  <div class="menuWrap">\n			<ul currentPage="', 
        $out += $string(page), $out += '" class="menuList clearfix">\n				<li><a href="javascript:void(0);">首页</a></li>\n				<li><a href="case.html">案例</a></li>\n				<li><a href="service.html">服务</a></li>\n				<li><a href="contract.html">动态</a></li>\n				<li><a href="company.html">关于</a></li>\n				<li><a href="contactUs.html">联系</a></li>\n			</ul>\n			<div class="menuTarget"></div>\n		  </div>\n	  </div>\n	</div>\n	<div class="secMenuWrapper">\n		<div class="secMenuWrap">\n		  <ul class="secMenuList clearfix">\n			  <li class="current"><a href="javascript:void(0);">我的案例</a>|</li>\n			  <li><a href="javascript:void(0);">世纪佳明</a></li>\n		  </ul>\n		</div>\n	</div>\n</div>\n<!-- 头部区域END -->\n\n', 
        new String($out);
    });
});