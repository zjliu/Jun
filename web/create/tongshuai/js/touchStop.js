(function(){
	var docMove=false;
	document.addEventListener('touchstart',function(e){
		docMove=true;
	},false);
	document.addEventListener('touchmove',function(e){
		if(docMove) e.preventDefault();
	},false);
	document.addEventListener('touchend',function(e){
		docMove=false;
	},false);
})();
