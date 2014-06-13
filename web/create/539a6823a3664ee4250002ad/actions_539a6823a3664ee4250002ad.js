Mugeda.script.push(function (mugeda) {
function getParam(name, murl) {
    var url = murl || decodeURIComponent(window.location.search);
    var reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i');
    var arr = url.match(reg);
    if (arr) return arr[2];
}

/* 测试
window.drawMoney = function (){
    alert("drawMoney");
}
window.sendToFriend = function (){
    alert("sendToFriend");
}
window.viewMyMoney = function (){
    alert("viewMyMoney");
}
window.getDefaultMoney = function(){
    return 199.99;
}
window.getAvailableCount=function(){
    return 2;
}
*/

var detect = function (ua) {
    var os = this.os = {}, browser = this.browser = {},
      webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
      android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
      osx = !!ua.match(/\(Macintosh\; Intel /),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook = ua.match(/PlayBook/),
      chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
      firefox = ua.match(/Firefox\/([\d.]+)/),
      ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
      webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
      safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) browser.version = webkit[1]

    if (android) os.android = true, os.version = android[2]
    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (bb10) os.bb10 = true, os.version = bb10[2]
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
    if (playbook) browser.playbook = true
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
    if (chrome) browser.chrome = true, browser.version = chrome[1]
    if (firefox) browser.firefox = true, browser.version = firefox[1]
    if (ie) browser.ie = true, browser.version = ie[1]
    if (safari && (osx || os.ios)) { browser.safari = true; if (osx) browser.version = safari[1] }
    if (webview) browser.webview = true

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
      (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
    os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
      (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
      (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
};

detect(navigator.userAgent);

var body = document.body,
    target = null;

var stageM = document.getElementById('stageParent');
var MugedaStage = document.getElementsByClassName('MugedaStage')[0];
stageM.appendChild(MugedaStage);

var findStage = function (event) {
    if (event.target.className.indexOf('MugedaStage') == -1) return;
    body.removeEventListener('DOMSubtreeModified', findStage);
    target = event.target;

    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0');

    processStage();
};

var processStage = function (e) {
    if (!window.Mugeda || !Mugeda.getWindowSize) return;
    var windowSize = Mugeda.getWindowSize()
    var pageWidth = windowSize.width, pageHeight = windowSize.height;
    var stageWidth = _mrmcp.width, stageHeight = _mrmcp.height;
    var scaleX = pageWidth / stageWidth, scaleY = pageHeight / stageHeight;
    var scale = cardScale = os.phone ? scaleX : Math.min(scaleX, scaleY);
    if (scale < 0.1) scale = 0.1;
    var marginLeft = Math.floor((pageWidth - stageWidth * scale) / 2);
    var marginTop = Math.floor((pageHeight - stageHeight * scale) / 2);
    var stageHeight = parseInt(scale * stageHeight);
    if (marginTop < 0) stageHeight += marginTop;

    if (!target) return;
	target.style.marginLeft = 0;
    target.style.cssText += (''
      + '-webkit-transform: scale(' + scale + ');'
      + 'transform: scale(' + scale + ');'
      + '-moz-transform: scale(' + scale + ');'
      + '-ms-transform: scale(' + scale + ');');
    target.parentNode.style.cssText += ('height: '
      + stageHeight + 'px;'
      + 'margin-left: ' + marginLeft + 'px;'
      + 'margin-top: ' + marginTop + 'px;');
}

window.addEventListener('resize', processStage)
body.addEventListener('DOMSubtreeModified', findStage);

var mugeda = Mugeda.getMugedaObject();
mugeda.addEventListener("imageReady",function(){
    var scene = mugeda.scene;
    
    //设置金额
    var defaultMoney = window.getDefaultMoney ? window.getDefaultMoney() : 0;
    var money = getParam('money') || defaultMoney;
    try{
        var moneyStr = parseFloat(money).toFixed(2) + '元';
        var moneyDom = scene.getObjectByName('number');
        moneyDom.text = moneyStr;
    }
    catch(e){
        console.log([money,window.getDefaultMoney,window.getDefaultMoney()]);
    }
    
    //设置 发送人
    var fromDom = scene.getObjectByName('from');
    if(fromDom){
        var from = getParam('from') ? decodeURIComponent(getParam('from')) : fromDom.text;
        fromDom.text = from;
    }
     
    //设置 所说的话
    var greetingDom = scene.getObjectByName('greetings');
    if(greetingDom){
        var greeting = getParam('greetings') ? decodeURIComponent(getParam('greetings')) : greetingDom.text;
        greetingDom.text = greeting;
    }
    
    var count = 0;
    if(window.getAvailableCount){
        count = window.getAvailableCount();
    }
    
    scene.addEventListener('enterframe', function (e) {
        if(~~scene.currentId==75){
            if(count<=0){
                scene.gotoAndPlay(93);
            }
        }
    });
    
    window.getMoney = function(){
        if(window.drawMoney)
           window.drawMoney(); 
    }
    window.sendMoney = function(){
        if(window.sendToFriend)
            window.sendToFriend();
    }
    window.viewMoney = function(){
        if(window.viewMyMoney)
            window.viewMyMoney();
    }
});
});
