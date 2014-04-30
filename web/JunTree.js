var JunTree = (function() {
	function createElement(html){
		var div = document.createElement("div");
		div.innerHTML = html;
		return div.firstChild;
	}
	var cssTest=""
		+".node_close{width: 0px; height: 0px; border-width: 4px 0px 4px 8px; border-style: solid; border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgb(0, 0, 0);}"
		+".node_open{width: 0px; height: 0px; border-width: 8px 4px 0px; border-style: solid; border-color: rgb(0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);}"
	var Tree = function(data){

	}
	Tree.prototype={
		createNode:function(id,status,text){
			var str = '<div class="node" node_id="1"><span class="node_close"></span><span class="node_text">JunTree</span><div>';
			var div = createElement("")
		}
	}
	return Tree;
})();

String.prototype.replaceAll=function(replaceStr,ignoreCase){

}

String.prototype.appendFormat=function(){
	for(var restr=this.toString(),i=0,l=arguments.length;i<l;i++){
		var value = arguments[i];
		if(typeof value === "string"){
			restr = restr.replace(new RegExp("\\{"+i+"\\}","g"),value);
		}
	}
	return restr;
}
