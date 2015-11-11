var minScale=.3;
var maxScale=1;
var minSpeed=.01;
var maxSpeed=.08;
var wind=3;
var numFlakes=500;
var context;
var snowflakeImage= new Image();
var snowflakes=[];
window.onload = function () {
	context = document.getElementById("canvas").getContext("2d");
	/*
	snowflakeImage.src="https://dl.dropboxusercontent.com/u/1256960/ Research/JS/Snowman/snowflake.png";
	snowflakeImage.onload=start;
	*/
	onResize();
	window.onresize=onResize;
	TweenMax.to("#head",1.5,{startAt:{rotation:-10},rotation:10,yoyo:true,transformOrigin:"50% 50%",repeat:-1,ease:Sine.easeInOut});
	TweenMax.to("#nose",1.5,{startAt:{rotation:-10},rotation:10,scaleX:.8,yoyo:true,transformOrigin:"5% 95%",repeat:-1,ease:Sine.easeInOut});
	TweenMax.to("#scarf",1.5,{startAt:{rotation:20},rotation:-20,yoyo:true,transformOrigin:"50% 10%",repeat:-1,ease:Sine.easeInOut});
	TweenMax.to("#shadow",1.5,{startAt:{x:-5},x:0,yoyo:true,repeat:-1,ease:Sine.easeInOut});
	TweenMax.to("#snowman",1.5,{startAt:{rotation:-5},rotation:7,yoyo:true,transformOrigin:"50% 90%",repeat:-1,ease:Sine.easeInOut});
	TweenMax.to("#snowman",.3,{scaleX:.95,scaleY:1.05,yoyo:true,transformOrigin:"50% 95%",repeat:-1,ease:Sine.easeInOut});
	blink();
	document.getElementById("snowman").addEventListener("click",knockHimDown);
	start();
}
function knockHimDown(){
	TweenMax.to("#snowman",.5,{rotation:-50,ease:Sine.easeOut});
	TweenMax.to("#snowman",1.2,{delay:1.2,rotation:0,ease:Sine.easeInOut});
	TweenMax.set("#mouth",{scaleY:-1,transformOrigin:"50% 80%"});
	TweenMax.to("#snowman",1.5,{delay:3,rotation:7,yoyo:true,transformOrigin:"50% 90%",repeat:-1,ease:Sine.easeInOut});
	TweenMax.to("#shadow",.5,{ x:-15,ease:Sine.easeOut});
	TweenMax.to("#shadow",1.2,{ delay:1.2,x:-5,ease:Sine.easeInOut});
	TweenMax.to("#shadow",1.5,{delay:3, x:0,yoyo:true,repeat:-1,ease:Sine.easeInOut});
}
function blink(){
	TweenMax.to(["#eye1,#eye2"],.1,{delay:5*Math.random(),scaleY:.2,yoyo:true,repeat:1,transformOrigin:"50% 50%",onComplete:blink});
}
function onResize(e){
	context.canvas.width=window.innerWidth;
	context.canvas.height=window.innerHeight;
}
function start(){
	for (var i=0;i<numFlakes;i++){
		var snowflake= {initX:((window.innerWidth+800)*Math.random())-800,initY:-(600*Math.random())-16,scale:Math.random(),speed:minSpeed,angle:Math.random()*Math.PI*2,x:0,y:0,offsetX:0};
		snowflake.x=window.innerWidth*Math.random();
		snowflake.y=((window.innerHeight+400)*Math.random())-400;
		snowflake.speed=(snowflake.scale*(maxSpeed-minSpeed))+minSpeed;
		snowflake.scale=(snowflake.scale*(maxScale-minScale))+minScale;
		snowflakes.push(snowflake);
	}
	animate();
}
function animate(){
	context.clearRect(0,0,window.innerWidth,window.innerHeight);
	for (var i=0;i<numFlakes;i++){
		var snowflake= snowflakes[i];
		snowflake.x=(Math.cos(snowflake.angle)*20)+snowflake.initX+snowflake.offsetX;
		snowflake.y+=(snowflake.speed*60);
		snowflake.offsetX+=wind;
		snowflake.angle+=snowflake.speed;
		if(snowflake.y>window.innerHeight||snowflake.x>window.innerWidth){
			snowflake.y=snowflake.initY;
			snowflake.x=snowflake.initX;
			snowflake.offsetX=0;
		}
		context.drawImage(snowflakeImage,snowflake.x,snowflake.y,16*snowflake.scale,16*snowflake.scale);
	}			
	requestAnimFrame(animate);
}
window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function(/* function */ callback, /* DOMElement */ element){
		window.setTimeout(callback, 1000 / 60);
		};
		})();
