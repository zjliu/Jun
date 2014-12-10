/*!
 * author:yanchengqu 等我修炼成魔
 * qq:751646896
 */
 // 需要分享的内容，请放到ready里
            WeixinApi.ready(function(Api) {

                // 微信分享的数据
                var wxData = {
                    "appId": "", // 服务号可以填写appId
                    "imgUrl" : 'http://www.yanchengqu.com/tongshuai/img/weixinShare.jpg',
                    "link" : 'http://www.yanchengqu.com/tongshuai/index.htm',
                    "desc": '海尔统帅',
                    "title": '海尔统帅'
                };

                // 分享的回调
                var wxCallbacks = {
                    // 分享操作开始之前
                    ready : function() {
                        // 你可以在这里对分享的数据进行重组
                        //alert("准备分享");
                    },
                    // 分享被用户自动取消
                    cancel : function(resp) {
                        // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                        //alert("分享被取消");
                    },
                    // 分享失败了
                    fail : function(resp) {
                        // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
                        //alert("分享失败");
                    },
                    // 分享成功
                    confirm : function(resp) {
                        
                        
                    },
                    // 整个分享过程结束
                    all : function(resp) {
                        // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                        //alert("分享结束");
                    }
                };

                 // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
        Api.shareToFriend(wxData, wxCallbacks);

        // 点击分享到朋友圈，会执行下面这个代码
        Api.shareToTimeline(wxData, wxCallbacks);
        //WeixinApi.hideToolbar();

            });