/*!
 * author:yanchengqu 等我修炼成魔
 * qq:751646896
 */

function Snow(opts){
	this.ClassName = opts.ClassName;
	this.maxWidth = opts.maxWidth;
	this.transitionTime = opts.transitionTime;
	this.init();

};

Snow.prototype.randomWidth = function(D, B) { //生成随机数
	var C = B - D,
		E = Math.random();
	return (D + Math.round(E * C))
};
Snow.prototype.action = function(box,X,Y,time,alpha) {
	box.className = this.ClassName;
	box.style.left = X + 'px';
	box.style.webkitTransition = '-webkit-transform '+ time +'ms ease-in-out';
	box.style.webkitTransform = 'translateY(-20px)';
	box.style.opacity=alpha;

	document.body.appendChild(box);
	box.addEventListener("webkitTransitionEnd", function(){
			box.style.opacity = 0;
			document.body.removeChild(box);
			time = null;
			}, false);

	var rX=this.randomWidth(-50,50);
	if(X+rX<0 || X+rX+this.maxWidth>window.innerWidth) rX=0;
	(function(I, H ,rX) {
	 setTimeout(function() {
		 box.style.webkitTransform = 'translate('+rX+'px,'+ Y +'px)';
		 },
		 H * 0.01);
	 })(box, time, rX)
};
Snow.prototype.init = function() {
	var	self = this,
		width = window.innerWidth, //屏幕宽度
		height = window.innerHeight, //屏幕高度
		randomX = 0, //随机x位置
		transitionTime = self.transitionTime, //动画时间
		successTime = 0, //随机运行时间
		randomAlpha = 0.5 + Math.random()*0.5,
		snowDiv = document.createElement('div');

	randomX = self.randomWidth(0,width - self.maxWidth); 
	successTime = transitionTime[self.randomWidth(0,transitionTime.length - 1)]; 
	self.action(snowDiv,randomX,height,successTime,randomAlpha); //执行动画
};



