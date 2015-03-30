//name 样式名 type(0,1,2) 
HTMLElement.prototype.getStyle = function(name, type) {
	var value = getComputedStyle(this)[name];
	if (value) {
		switch (type) {
			case 1:
				value = parseInt(value);
				break;
			case 2:
				value = parseFloat(value);
				break;
		}
		return value;
	}
}

HTMLElement.prototype.getClassObj=function(){
	var arr=this.className.trim().replace(/(?:\s{2,})/g,' ').split(' ');
	var obj={};
	for(var i=0,l=arr.length;i<l;i++){
		var value=arr[i];
		obj[value]=value;
	}
	return obj;
}

HTMLElement.prototype.hasClass=function(name){
	if(this.classList) {
		this.classList.contains(name);
		return this;
	}
	return !!this.getClassObj()[name];
}

HTMLElement.prototype.addClass=function(name){
	if(this.classList) {
		this.classList.add(name);
		return this;
	}
	var obj=this.getClassObj();
	obj[name]=name;
	var className='';
	for(var key in obj){
		className+=key+' ';
	}
	this.className=className;
	return this;
}

HTMLElement.prototype.removeClass=function(name){
	if(this.classList) {
		this.classList.remove(name);
		return this;
	}
	var obj=this.getClassObj();
	delete obj[name];
	var className='';
	for(var key in obj){
		className+=key+' ';
	}
	this.className=className;
	return this;
}

HTMLElement.prototype.toggleClass=function(name){
	if(this.classList) {
		this.classList.toggle(name);
		return this;
	}
	if(this.hasClass(name)){
		this.removeClass(name);
	}
	else{
		this.addClass(name);
	}
	return this;
}
