/*!
 * author:yanchengqu 等我修炼成魔
 * qq:751646896
 */
!function() {
	var haier = {
		pageBox:$('#pageBox'),
		page:$('.page'),
		indexId:$('#index'),
		mainId:$('#main'),
		listId:$('#list')
	},
	clickEvent = "ontouchstart" in window ? "touchstart" : "click",
	indexHtml = haier.indexId.html(),
	mainHtml = haier.mainId.html(),
	listHtml = haier.listId.html();

	app = {
		init:function(){
			this.initFirst();
			this.loading();
		},
		loading:function(){

		},
		initFirst:function(){//显示首页
			haier.page.html(indexHtml).removeClass().addClass('page index');
			this.firstEvent();
		},
		firstEvent:function(){
			var self = this;
			haier.page.on(clickEvent,function(){
				var className = $(this).attr('class').toLowerCase(),
				isIndex = /index/i.test(className);

				if(isIndex){//首页
					$(this).addClass('page-opacity0');
					setTimeout(function(){
						haier.page.html(mainHtml).removeClass().addClass('page main');
						self.initSecond();
					}, 600);
				}
			});
		},
		initSecond:function(){
				var self = this;
				setTimeout(function(){//显示菜单页面
					$('.main .listBox li').addClass('init');
					$('.main .listBox li .conBox').addClass('transition1');
					$('.main .listBox li .icon').addClass('rubberBand');
					$('.main .listBox h3').addClass('active');
					$('.main .btnBox').addClass('active');
					$('.main .btnBox .share').on(clickEvent,function(){//分享按钮点击
						poupClick('poupGamePassOk');
						$('#poupGamePassOk').css({'top':'100px','left':'0'});
						return false;
					});
					$('.main .backBtn').on(clickEvent,function(){//返回首页
						haier.page.html(indexHtml).removeClass().addClass('page index');
						return false;
					});
					self.secondEvent();
				}, 1000);
		},
		secondEvent:function(){
			var self = this;
			$('.main .listBox').on(clickEvent,'li',function(){
				var indexLi = $(this).index();
				indexLi == 0 && self.initThird();
				indexLi == 1 && console.log('洗衣机');
				indexLi == 2 && console.log('彩电');
				indexLi == 3 && console.log('热水器');

			});
		},
		initThird:function(){
			var selfThird = this;
			haier.page.html(listHtml).removeClass().addClass('page list');
			//初始化List实例
			new Slider({
				dom :  $('.cardList').get(0),
				listArr : listArr//数组数据
			});
			$('.list .btnBox .share').on(clickEvent,function(){//分享按钮点击
						poupClick('poupGamePassOk');
						$('#poupGamePassOk').css({'top':'100px','left':'0'});
						return false;
						
			});
			$('.list .backBtn').on(clickEvent,function(){//返回首页
						haier.page.html(mainHtml).removeClass().addClass('page main');
						selfThird.initSecond();
						return false;
						
			});
		}
	}
	
}();


