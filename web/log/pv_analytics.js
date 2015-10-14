var MY_ANALYTICS_COOKIE_KEY = "hticket";
var MY_ANALYTICS_DOMAIN_KEY = "ehaier.com";
var MY_ANALYTICS_PATH_COOKIE_KEY = "/";
var USER_ID_COOKIE = "UserID";


function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
function getClientScreenResolution(){
	return window.screen.width + "*" + window.screen.height;
}
function getBrowser(){
	var clientBrowser;
	var ua = navigator.userAgent.toLowerCase();
	//(ua.match(/tencenttraveler ([\d.]+)/))?clientBrowser='TT'://暂时取消TT的识别，因安装完TT后连IE的识别码也一同变成TT的了，故取消之
	(ua.match(/baiduspider\/([\d.]+)/))?clientBrowser='Baiduspider':
	(ua.match(/360se([\d.]+)/))?clientBrowser='360':
	(ua.match(/maxthon\/([\d.]+)/))?clientBrowser='Maxthon':
	(ua.match(/msie 5([\d.]+)/)) ? clientBrowser = 'IE5' : 
	(ua.match(/msie 6([\d.]+)/)) ? clientBrowser = 'IE6' : 
	(ua.match(/msie 7([\d.]+)/)) ? clientBrowser = 'IE7' :
	(ua.match(/msie 8([\d.]+)/)) ? clientBrowser = 'IE8' :
	(ua.match(/msie 9([\d.]+)/)) ? clientBrowser = 'IE9' :
	(ua.match(/firefox\/([\d.]+)/)) ? clientBrowser = 'Firefox' : 
	(ua.match(/chrome\/([\d.]+)/)) ? clientBrowser = 'Chrome' : 
	(ua.match(/opera.([\d.]+)/)) ? clientBrowser = 'Opera' : 
	(ua.match(/version\/([\d.]+).*safari/)) ? clientBrowser = 'Safari' :  0;
	return clientBrowser
}
function getPageCharset(){  
    var charSet = "";  
    var oType = getBrowser();  
    switch(oType){  
        case "IE":  
            charSet = document.charset;  
            break;  
        case "Firefox":  
            charSet = document.characterSet;  
            break;  
        default:  
            charSet = document.characterSet;  
            break;  
    }  
    return charSet;  
}
function getBrowserLanguage(){
	var lang;
	var l;
	navigator.language ? (l= navigator.language) : (l = navigator.browserLanguage);
	   if (l.indexOf('zh') > -1){ lang = 'Chinese';}
	   else if (l.indexOf('en') > -1){ lang = 'English' ;}
	   else if (l.indexOf('fr') > -1){ lang = 'French';}
	   else if (l.indexOf('de') > -1){ lang = 'German';}
	   else if (l.indexOf('ja') > -1){ lang = 'Japanese';}
	   else if (l.indexOf('it') > -1){ lang = 'Italian';}
	   else if (l.indexOf('pt') > -1){ lang = 'Portuguese';}
	   else if (l.indexOf('es') > -1){ lang = 'Spanish';}
	   else if (l.indexOf('sv') > -1){ lang = 'Swedish';}
	   else if (l.indexOf('nl') > -1){ lang = 'Dutch';}
	   else
			lang = 'other' 
   return lang;
}
function detectOS() {  
    var sUserAgent = navigator.userAgent; 
	var isSymbian = (navigator.platform == "SymbianOS");
	if (isSymbian) return "Symbian";
	var isiPhone = (navigator.platform == "iPhone");
	if (isiPhone) return "iPhone";
	var isiPad = (navigator.platform == "iPad");
	if (isiPad) return "iPad";
	var isAndroid = (navigator.platform == "Linux") && sUserAgent.indexOf("Android") > -1;
	if (isAndroid) return "Android";

    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");  
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");  
    if (isMac) return "Mac";  
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;  
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);  
    if (isLinux) return "Linux";  
    if (isWin) {
		var isWin95 = sUserAgent.indexOf("Win95") > -1 || sUserAgent.indexOf("Windows 95") >-1;
		if (isWin95) return "Win95";  
		var isWin98 = sUserAgent.indexOf("Win98") > -1 || sUserAgent.indexOf("Windows 98") >-1;
		if (isWin98) return "Win98";  
		var isWinME = sUserAgent.indexOf("Win 9x 4.90") > -1 || sUserAgent.indexOf("Windows ME") >-1;
		if (isWinME) return "WinMe";  
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;  
        if (isWin2K) return "Win2000";  
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;  
        if (isWinXP) return "WinXP";  
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;  
        if (isWin2003) return "Win2003";  
        var isWin2003 = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;  
        if (isWin2003) return "WinVista";  
        var isWin2003 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;  
        if (isWin2003) return "Win7";
		
		//mobile
		var isWinCE = sUserAgent.indexOf("WindowsCE") > -1;  
        if (isWinCE) return "WindowsCE";
		var isWindowsMobile = sUserAgent.indexOf("WindowsMobile") > -1;  
        if (WindowsMobile) return "WindowsMobile"; 
    }
    return "other";  
}

function getReferrerURL(){
	var ref = '';
	if (document.referrer.length > 0) {
	   ref = document.referrer;
	}
	try {
	   if (ref.length == 0 && opener.location.href.length > 0) 
		ref = opener.location.href;
	} catch (e) {}
	return ref;
}
function getDonmain(url){
	if(!url) return '';
	if(url.split("/").length >= 3)
		return  url.split("/")[2];
	return url;
}
function enabledCookie(){
	return navigator.cookieEnabled;
}
function getCurrentPageURL(){
	return document.location.href;
}
function getCurrentPageTitle(){
	return document.title;
}
function setCookieByObj(obj){
	for(var key in obj) document.cookie=key+'='+obj[key];
}
function getCookie(cookieName) {
    var cookieValue = document.cookie;
	if(!cookieValue) return null;
	var items = cookieValue.split(';');
	for(var i=0,l=items.length;i<l;i++){
		var item = items[i],
			itemArr = item.split('='),
			key = itemArr[0].replace(/(^\s+)/g,'');
		if(key===cookieName) return itemArr[1];
	}
	return null;
}
function setCookie(name, value, expireDays, domain, path) {
	var obj = {};
	if(name) obj[name]=escape(value);
	if (expireDays > 0) {
		var date = new Date();
		date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000);
		obj['expires'] = escape(date.toGMTString());
	}
	if(domain) obj['domain']=domain;
	if(path) obj['path']=path;
	
	setCookieByObj(obj);
}
function deleteCookie(name) {
	document.cookie = escape(name) + "=;expires=" + new Date().toGMTString();
}
function initCookie() {
	var expireDays = 365;
	var cookieValue = getCookie(MY_ANALYTICS_COOKIE_KEY);
	if(cookieValue) return;
	var value = createUUID();
	setCookie(MY_ANALYTICS_COOKIE_KEY, value, expireDays, MY_ANALYTICS_DOMAIN_KEY, MY_ANALYTICS_PATH_COOKIE_KEY);
}
function getTimezone(){
    return Math.round(new Date().getTimezoneOffset() / -60).toString();
}
function getLocalTime(){
	var a = new Date().getTime();
	var b = this.getTimezone();
	return a + b * 3600 * 1000
}

function doGetData(args){
	var myChexunAnalysisUrl = "http://10.9.9.121/1.gif";
	var myChexunAnalysisUco = '';
	var userId = '' ;
	if(enabledCookie()){
		initCookie();
		myChexunAnalysisUco = getCookie(MY_ANALYTICS_COOKIE_KEY);
		userId = getCookie(USER_ID_COOKIE) ; 
	}
	var ucp = getCurrentPageURL() ;
	var uref = getReferrerURL() ;
	if(ucp != null){
		ucp = ucp.replace(/&/g,"+-") ;
	}
	if(uref != null){
		uref = uref.replace(/&/g,"+-") ;
	}
	myChexunAnalysisParatemers  ="?serviceid=" + escape('1')
		+ "&hcmd=" + escape('pv')
		+ "&hticket=" + myChexunAnalysisUco
		+ "&huid=" + escape('89237492746482')
		+ "&hsid=" + escape('5632413370f5qcpt15')
		+ "&ip=" + escape('10.200.200.100')
	    + "&hzone=" + escape(getTimezone())
        + "&logtime=" + escape(getLocalTime())
        + "&refurl=" + escape(uref)
        + "&locurl=" + escape(ucp)
		+ "&titleName=" + escape(getCurrentPageTitle()) 
		+ "&creenSize=" + escape(getClientScreenResolution()) 
		+ "&brower=" + escape(getBrowser()) 
		+ "&browserlan=" + escape(getBrowserLanguage()) 
		+ "&os=" + escape(detectOS());
	
	var logURl = myChexunAnalysisUrl + myChexunAnalysisParatemers;

	try{
		var img = new Image();
		img.src = logURl ;
		document.body.appendChild(img).style.display="none";

        var img = new Image(1, 1);
        img.src = logURl;

	} catch (e) {
		var img = new Image();
		img.src = logURl ;
		document.body.appendChild(img).style.display="none";
	}
}

(function() {
	try{
		if(typeof news_category != 'undefined'){
		  	doGetData(news_category) ;
		}else{
		 	doGetData(log_data) ;
		}
	}catch(e){
		doGetData() ;
	}
})();
