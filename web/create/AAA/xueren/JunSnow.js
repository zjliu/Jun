var JunSnow=(function(){
	var requestAnimFrame = (function() {
		return  window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame   ||
		window.mozRequestAnimationFrame		 ||
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
	})();

	var particleCount = 300;
	var particleMax   = 1000;
	var sky;
	var canvas        = document.createElement('canvas');
	var ctx           = canvas.getContext('2d');
	var width		  = 0;
	var height		  = 0;
	var i             = 0;
	var active        = false;
	var snowflakes    = [];
	var snowflake;

	canvas.style.position = 'absolute';
	canvas.style.left = canvas.style.top = '0';

	var Snowflake = function () {
		this.x = 0;
		this.y = 0;
		this.vy = 0;
		this.vx = 0;
		this.r = 0;

		this.reset();
	}

	Snowflake.prototype.reset = function() {
		this.x = Math.random() * width;
		this.y = Math.random() * -height;
		this.vy = 1 + Math.random() * 3;
		this.vx = 0.5 - Math.random();
		this.r = 1 + Math.random() * 2;
		this.o = 0.5 + Math.random() * 0.5;
	}

	var Snow=function(skyEl,count){
		sky=skyEl || document.body;
		width=sky.clientWidth;
		height=sky.clientHeight;
		particleCount = count || particleCount;
	}

	Snow.prototype.generateSnowFlakes = function() {
		snowflakes = [];
		for (i = 0; i < particleMax; i++) {
			snowflake = new Snowflake();
			snowflake.reset();
			snowflakes.push(snowflake);
		}
	}

	Snow.prototype.update = function() {
		ctx.clearRect(0, 0, width, height);
		if (!active) {      
			return;
		}
		for (i = 0; i < particleCount; i++) {
			snowflake = snowflakes[i];
			snowflake.y += snowflake.vy;
			snowflake.x += snowflake.vx;

			ctx.globalAlpha = snowflake.o;
			ctx.beginPath();
			ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fill();

			if (snowflake.y > height) {
				snowflake.reset();
			}
		}

		var self=this;
		(function(self){
			requestAnimFrame(function(){
				self.update();	
			});
		})(self);
	}

	Snow.prototype.onResize=function(){
		width = sky.clientWidth;
		height = sky.clientHeight;
		canvas.width = width;
		canvas.height = height;
		ctx.fillStyle = '#FFF';

		var wasActive = active;
		active = width > 50;

		if (!wasActive && active) {
			var self=this;
			requestAnimFrame(function(){
				self.update();
			});
		}
	}

	Snow.prototype.start=function(){
		this.generateSnowFlakes();
		this.onResize();
		var self=this;
		window.addEventListener('resize', self.onResize, false);
		sky.appendChild(canvas);
	}

	return Snow;
})();
