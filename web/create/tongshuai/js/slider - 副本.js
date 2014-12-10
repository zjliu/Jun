/*!
 * author:yanchengqu 等我修炼成魔
 * qq:751646896
 */
		//所有的数据
		var listArr = [{
			title:'isee  mini—私人影院1',
			disc:'我的世界，一球领先，私人影...',
			img: "img/page3/1.jpg"
		},
		{	
			title:'isee  mini—私人影院2',
			disc:'我的世界，一球领先，私人影...',
			img: "img/page3/1.jpg"
		},
		{	
			title:'isee  mini—私人影院3',
			disc:'我的世界，一球领先，私人影...',
			img: "img/page3/1.jpg"
		},
		{	
			title:'isee  mini—私人影院4',
			disc:'我的世界，一球领先，私人影...',
			img: "img/page3/1.jpg"
		},
		{	
			title:'isee  mini—私人影院5',
			disc:'我的世界，一球领先，私人影...',
			img: "img/page3/1.jpg"
		},
		{	
			title:'isee  mini—私人影院6',
			disc:'我的世界，一球领先，私人影...',
			img: "img/page3/1.jpg"
		},
		{	
			title:'isee  mini—私人影院7',
			disc:'我的世界，一球领先，私人影...',
			img: "img/page3/1.jpg"
		},
		{	
			title:'isee  mini—私人影院8',
			disc:'我的世界，一球领先，私人影...',
			img: "img/page3/1.jpg"
		},
		{	
			title:'isee  mini—私人影院9',
			disc:'我的世界，一球领先，私人影...',
			img: "img/page3/1.jpg"
		},
		{	
			title:'isee  mini—私人影院10',
			disc:'我的世界，一球领先，私人影...',
			img: "img/page3/1.jpg"
		}];

			
		//构造函数

		function Slider(opts){
			//构造函数需要的参数
			this.cardList = opts.dom;
			this.listArr = opts.listArr;
			//构造三步奏
			this.init();
			this.bindDOM();
			
		}
		Slider.prototype.renderDOM = function(){
			var selfRender = this,
			data = selfRender.listArr,
			len = data.length;
			
			for (var i = 0; i < len; i++) {
				
			var createLi = '<li class="card animation"><img src="'+ data[i].img +'" class="animation" style="opacity:0"></li>';
				$('.list .cardList').append(createLi);
			};
			$('.list .cardList li').eq(0).addClass('zindex').find('img').css('opacity','1');
			

		};
		Slider.prototype.init = function(){
			var selfInit = this,
			rotate = 0,
			zIndex = 1000;
			selfInit.renderDOM();//对list数据进行操作
			setTimeout(function() {
				$(".list .cardList .card").each(function() {
		            $(this).css({"-webkit-transform" : "rotate(" + rotate + "deg)" , "z-index" : + zIndex}),
		            rotate = rotate - 13,
		            zIndex = zIndex - 1;
	            });           
            },500);
			
		};
		

		Slider.prototype.bindDOM = function(){
			var self = this,
			cardList = self.cardList,
			count = 0,
			isMousedown = false;//检查是否按下
			
			//手指按下的处理事件
			var startHandler = function(evt){
				if(count == 0 || count == 1){
					isMousedown = true;
					count++;
					//记录手指按下的坐标
					self.startX = evt.touches[0].pageX;
					self.startY = evt.touches[0].pageY;

					//清除偏移量
					self.offsetX = 0;
					self.offsetY = 0;

					//事件对象
					var target = evt.target;
					self.target = target;
					
				}else{
					count = 0;
					return;
				}
				

			};
			var moveHandler = function(evt){
				//兼容chrome android，阻止浏览器默认行为
				evt.preventDefault();
            	evt.stopPropagation();
				if(isMousedown){
				//计算手指的偏移量
				self.offsetX = evt.targetTouches[0].pageX  -self.startX;
				self.offsetY = evt.targetTouches[0].pageY  -self.startY;

				}

			};
			var endHandler = function(evt){
				//兼容chrome android，阻止浏览器默认行为
				evt.preventDefault();
            	evt.stopPropagation();
            	console.log(count);
				if(isMousedown && count <= 1){
					var currentLi = $(self.target).closest('li');
					if (currentLi.hasClass('zindex') && (self.offsetX != 0 ||  self.offsetY !=0)) {
						var t = $(".list .cardList .card"),
						i = t.length,
					    a = 3 * currentLi.width(),
						o = Math.abs(self.offsetX) / Math.abs(self.offsetY),
	                    r = self.offsetX > 0 ? "+": "-",
	                    l = self.offsetY > 0 ? "+": "-",
	                    d = 0 == Math.abs(self.offsetY) ? a: a * o / Math.sqrt(o * o + 1),
	                    s = 0 == d ? a: d / o;
	                    currentLi.css("-webkit-transform", "translate3d(" + r + d + "px," + l + s + "px,0)");
	                    var p = t.index(currentLi);
	                    currentLi.find("img").css("opacity", "0"),
	                    setTimeout(function() {
			                    deg = -13 * i + 13,
			                    newIndex = currentLi.css("z-index") - i + 1;
			               		currentLi.css("z-index", newIndex).css({
			                        "-webkit-transform": "translate3d(0,0,0) rotate(" + deg + "deg)"
			                    }); 
			                    count = 0;
			                    isMousedown = false;
			            },500);
	                    p == i - 1 ? (t.eq(0).find("img").css("opacity", "1"),t.eq(0).addClass('zindex')) : (currentLi.next().find("img").css("opacity", "1"),currentLi.next().addClass('zindex').siblings('li').removeClass('zindex')),
	                    
	                    self.changeCard();
	                    t.index(currentLi) == i - 1 ? t.eq(0).addClass("zindex") : currentLi.next().addClass("zindex")
					}
				}
				
				
			};

			//绑定事件
			cardList.addEventListener('touchstart', startHandler);
			cardList.addEventListener('touchmove', moveHandler);
			cardList.addEventListener('touchend', endHandler);
		};
		Slider.prototype.changeCard = function(){
			$(".list .cardList .card").each(function() {
                    if ( - 1 != $(this).css("-webkit-transform").indexOf("rotate")) {
                        var e = $(this).css("-webkit-transform").match(/rotate\(([^\)]*)/)[1],
                         newzIndex = $(this).css("z-index");

                        e = parseInt(e, 10),
                        newzIndex = parseInt(newzIndex, 10),
                        e += 13,
                        newzIndex += 1,
                        $(this).css({"-webkit-transform" : "rotate(" + e + "deg)" , "z-index" : + newzIndex});
                        
                    }
	        });
	        
		};
		