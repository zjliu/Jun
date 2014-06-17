define(function(require,exports,module){
	var $ = require('jquery-debug');
	var head = require('tpl/head')({'page':2});
	var index = require('tpl/index')();
	var foot = require('tpl/foot')();
	
	function init(){
		$('body').append(head);
		$('body').append(index);
		$('body').append(foot);
	}

	exports.init=init;
});
