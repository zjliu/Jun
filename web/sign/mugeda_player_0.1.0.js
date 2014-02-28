/*!
 * [代码说明]
 *
 * Copyright 2010, Cleeki, Inc.
 * All rights reserved
 *
 * 版权所有 未经许可不得传播
 */

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// base.js
function G(s) {
    return document.getElementById(s)
}
function E(f, e, o) {
    if (!e) e = 'load';
    if (!o) o = window;
    if(o.attachEvent) {
        o.attachEvent('on' + e, f)
    } else {
        o.addEventListener(e, f, false)
    }
}
function json(s){
    try {
        return eval('('+s+')')
    }catch(e){
        return null
    }
}
function joinParam(o) {
    if (!o || typeof o == 'string') return o;
    var r = ''; for (var k in o) r += '&' + k + '=' + encodeURIComponent(o[k]);
    if (r) r = r.substr(1);
    return r;
}
// function ajax(o) {
    // var b = o.type == 'POST', f = o.success, p = joinParam(o.data || ''), t = o.dataType, url = o.url || location.href, fox = /Firefox/.test(navigator.userAgent),
    // x = window.XMLHttpRequest ? new XMLHttpRequest() : (new ActiveXObject('Msxml2.XMLHTTP') || new ActiveXObject('Microsoft.XMLHTTP')),
    // z = function (s) { if (x.readyState == 4) { if (x.status == 200) { s = (t == 'xml') ? x.responseXML : x.responseText; if (t == 'json') s = json(s); if(f) f(s) } else if (o.error) { o.error(x) } } };
    // if (!fox) x.onreadystatechange = z; x.open(b ? 'POST' : 'GET', url + (b ? '' : ((/\?/.test(url) ? '' : '?') + p)), o.async === false ? false : true);
    // if (b) x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // x.send(p); if (fox) z(x.responseText);
    // return x;
// }

function ajax(o) {	var b = /POST/i.test(o.type),	p = o.data || '',	t = o.dataType,	url = o.url || location.href,	q = /\?/.test(url) ? '&' : '?',	x = window.XMLHttpRequest ? new XMLHttpRequest() : (new ActiveXObject('Msxml2.XMLHTTP') || new ActiveXObject('Microsoft.XMLHTTP')),	z = function (s) {		if (x.readyState == 4) {			if (x.status == 200) {				s = x.responseText;				if (t == 'json')					s = json(s);				if (b = o.success)					b(s)			} else if (o.error) {				o.error(x.status, x)			}		}	};	x.onreadystatechange = z;	if (typeof p == 'object') {		var r = [];		for (var k in p)			r.push(encodeURIComponent(k) + '=' + encodeURIComponent(p[k]));		p = r.join('&')	}	x.open(b ? 'POST' : 'GET', url + (b ? '' : ((p ? q : '') + p + (o.cache ? '' : (((!p && q == '?') ? '?' : '&') + '_=' + new Date().getTime())))), o.async === false ? false : true);	if (b)		x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');	x.send(p);	return x;}

function isMobile(){
    var isMobile = navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i);
        
    return isMobile ? true : false;
}

function fo(o) {
    var x = 0;
    var y = 0;
    do {
        x += o.offsetLeft || 0;
        y += o.offsetTop || 0;
    } while ( o = o . offsetParent );
    return {
        x: x,
        y: y
    }
}
function fe(e) {
    e = e || event;
    return {
        x: e.pageX || e.x,
        y: e.pageY || e.y
    }
}
function fc(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        event.cancelBubble = true
    }
}

function getClass(a, b){
    var r=new RegExp('(^|\\s*)'+a+'(\\s*|$)'),e=b?document.getElementsByTagName(b):document.getElementsByTagName('*')||document.all,s=[];
    for(var i=0,l=e.length;i<l;i++)
    {
        if (r.test(e[i].className))
        {
            s.push(e[i]);
        }
    }
    return s;
}

function ptInRect(x, y, left, top, right, bottom, obj)
{
    if(obj)
    {
        var par = obj.getParam();
        var rotate = par.rotate;
        if(Math.abs(par.rotate) > 1.E-3)
        {
            // Has rotation
            var center = obj.getRotationCenter(false);
            var pt = rotatePoint(center.x, center.y, x, y, -rotate);
            x = pt.x;
            y = pt.y;
        }
    }
    
    var within = (x >= left && x < right && y >= top && y < bottom); 
    
    return within;
};

JSON.clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

function rotatePoint(x0, y0, x, y, angle)
{
	var distX = x - x0;
	var distY = y - y0; 
	var baseAngle = Math.atan2(-distY, distX);
	var radius = Math.sqrt(distX*distX+distY*distY); 
	
	var newAngle = baseAngle - angle;
	var deltaX = radius * Math.cos(newAngle); 
	var deltaY = radius * Math.sin(newAngle); 
	
	return {'x': x0+deltaX, 'y': y0-deltaY};
};

    
    
/**
  * find object in the array, then delele the first found obj
  * @ param {object} The obj to delete
  * @ return {boolean} ture if found, false if not
  **/
  
/*
Array.prototype.deleteFirst = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == obj) {
            this.splice(i, 1);
            return true;
        }
    }
    return false;
}
*/

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// defines.js
var g_aniObj = [];
function getAniObject(data)
{
    return g_aniObj[data.guid];
};

function getAniObjectById(guid)
{
    return g_aniObj[guid];
};

var g_alpha = 1.;
function getGlobalAlpha()
{
    return g_alpha;
};

function getPathObject(unit, mode)
{
    if(!unit || !unit.path)
        return null; 
        
    var data = {guid:unit.guidPath};
    var obj;
    
    if(mode == 1)
    {
        delete obj; 
        obj = null; 
    }
    else if(mode == 2)
    {
        obj = null;
        data.guid = guidGen();
    }
    else
        obj = getAniObject(data);
        
    if(!obj)
    {
        var dataRef = createAniParam();
        dataRef.guid = data.guid ? data.guid : null;
        obj = createNewObject(Hanimation.SHAPE_PATH, dataRef.guid ? dataRef : null);
        if(!data.guid)
            unit.guidPath = obj.dataRef.guid;
        var fillInfo = createFillInfo();
        fillInfo.fillColors = [createColorStop(0, 0, 0, 0, 0)];
        obj.dataRef.param.fillInfo=fillInfo;
        obj.dataRef.param.lineWidth=1;
        obj.setLayerFrame(unit.layerId, unit.frameStart);  
    }

    obj.dataRef.param.alpha = unit.pathMode > Hanimation.PATHMODE_DEFAULT ? 1. : 0.5;
    obj.dataRef.param.strokeColor = unit.pathMode > Hanimation.PATHMODE_DEFAULT ? "#FF00FF" : "#333333";

    return obj;
}
    
createTriPoint = function(x0, y0, x1, y1, x2, y2) {
    var triPoint = {
        nodeX: x0 ? x0: 0,
        nodeY: y0 ? y0: 0,
        forwardX: x1 ? x1: 0,
        forwardY: y1 ? y1: 0,
        backwardX: x2 ? x2: 0,
        backwardY: y2 ? y2: 0
    };

    return triPoint;
};

createPoint = function(x0, y0) {
    var point = {
        x: x0 ? x0: 0,
        y: y0 ? y0: 0
    };

    return point;
};


function getColor(info)
{
    if(!info) info = "#000000";
    var strValue = info.toLowerCase();
    var clr = "#000000";

    // rgba or rgb
    var pos = strValue.indexOf('rgb');
    if(pos == 0)
        clr = info;
    else
    {
        var objClr = new RGBColor(strValue);
        clr = objClr.toRGB();
    }

    return clr;
};

if (typeof Hanimation == 'undefined') {
    var Hanimation = {};
};

Hanimation.MRAID_READY = 1;
Hanimation.LoadURL = '../../myani/load';

Hanimation.SHAPE = 2000;

Hanimation.SHAPE_LINE = Hanimation.SHAPE + 1;
Hanimation.SHAPE_CURVE = Hanimation.SHAPE + 2;
Hanimation.SHAPE_RECTANGLE = Hanimation.SHAPE + 3;
Hanimation.SHAPE_ELLIPSE = Hanimation.SHAPE + 4;
Hanimation.SHAPE_PICTURE = Hanimation.SHAPE + 5;
Hanimation.SHAPE_POLYGON = Hanimation.SHAPE + 6;
Hanimation.SHAPE_SELECT = Hanimation.SHAPE + 7;
Hanimation.SHAPE_SCALE = Hanimation.SHAPE + 8;
Hanimation.SHAPE_ROUNDED = Hanimation.SHAPE + 9;
Hanimation.SHAPE_TEXT = Hanimation.SHAPE + 10;
Hanimation.SHAPE_BSHAPE = Hanimation.SHAPE + 11;
Hanimation.SHAPE_PROPERTY = Hanimation.SHAPE + 12;
Hanimation.SHAPE_NODE = Hanimation.SHAPE + 13;
Hanimation.SHAPE_GROUP = Hanimation.SHAPE + 14;
Hanimation.SHAPE_SPLINE = Hanimation.SHAPE + 15;
Hanimation.SHAPE_ZOOM = Hanimation.SHAPE + 16;
Hanimation.SHAPE_CAMERA = Hanimation.SHAPE + 17;
Hanimation.SHAPE_PATH = Hanimation.SHAPE + 18;
Hanimation.SHAPE_PENCIL = Hanimation.SHAPE + 19;
Hanimation.SHAPE_AUDIO = Hanimation.SHAPE + 20;
Hanimation.SHAPE_CLIP = Hanimation.SHAPE + 21;
Hanimation.SHAPE_VIDEO = Hanimation.SHAPE + 22;
Hanimation.SHAPE_SPRITE = Hanimation.SHAPE + 23;

Hanimation.AUDIO            = 4000;
Hanimation.AUDIO_START      = Hanimation.AUDIO + 1;
Hanimation.AUDIO_STOP       = Hanimation.AUDIO + 2;
Hanimation.AudioCallback    = null; 

Hanimation.MAX_VALUE = 99999999;
Hanimation.MIN_VALUE = -99999999;

Hanimation.HITTEST          = 3000;
Hanimation.HITTEST_LEFTTOP = Hanimation.HITTEST + 1;
Hanimation.HITTEST_TOP = Hanimation.HITTEST + 2;
Hanimation.HITTEST_RIGHTTOP = Hanimation.HITTEST + 3;
Hanimation.HITTEST_LEFT = Hanimation.HITTEST + 4;
Hanimation.HITTEST_PIVOT = Hanimation.HITTEST + 5;
Hanimation.HITTEST_RIGHT = Hanimation.HITTEST + 6;
Hanimation.HITTEST_LEFTBOTTOM = Hanimation.HITTEST + 7;
Hanimation.HITTEST_BOTTOM = Hanimation.HITTEST + 8;
Hanimation.HITTEST_RIGHTBOTTOM = Hanimation.HITTEST + 9;
Hanimation.HITTEST_WITHIN = Hanimation.HITTEST + 10;
Hanimation.HITTEST_ROTATE = Hanimation.HITTEST + 11;
Hanimation.HITTEST_NONE = Hanimation.HITTEST + 12;
Hanimation.HITTEST_CONTROL = Hanimation.HITTEST + 13;
Hanimation.HITTEST_FILLSTART = Hanimation.HITTEST + 14;
Hanimation.HITTEST_FILLEND = Hanimation.HITTEST + 15;

Hanimation.PATHMODE_DEFAULT = 0;
Hanimation.PATHMODE_CUSTOM = 1;
Hanimation.PATHMODE_UPDATE_PATH = 2;
Hanimation.PATHMODE_UPDATE_KEYFRAME = 3;


Hanimation.UNIT_MODE_PROGRESS = 1;

if(!Hanimation.Message)Hanimation.Message = {};
Hanimation.Message.ImageError = 'There are errors in loading image data. Your animation may not be rendered correctly.';
Hanimation.Message.CheckNull = 'Invalid field (empty)';
Hanimation.Message.CheckNumber = 'Invalid number';
Hanimation.Message.CheckEmail = 'Invalid email';
Hanimation.Message.CheckUrl = 'Invalid url';

// Hanimation.TrackAnchorsServer = 'https://stats.mugeda.com/stats/url.php';

// By default use no private tracking pixel (use Google Analytics instead
Hanimation.MugedaTrackAnchors = []; // 'https://stats.mugeda.com/stats/pixel.php'
Hanimation.MugedaActionTracker = []; // 'https://stats.mugeda.com/stats/action.php'

HaniData={
  zip:function(data){
    return this.unzip(data,true);
  },
  unzip:function(data,zip){
    var layers = data.layers;
    for(var i=layers.length-1;i>=0;i--){
      var layer=layers[i];
      var units=layer.units;
      for(var j=0;j<units.length;j++){
        var unit=units[j];
        var objs=unit.objects;
        for(var k=0;k<objs.length;k++){
          this.fobjs(objs[k],zip);
        }
      }
    }
    return data;  
  },
  fobjs:function(obj,zip){
    if(obj.items&&obj.items.length){
      for(var i=0;i<obj.items.length;i++){
        var o=obj.items[i];
        if(o.items&&o.items.length){
          this.fobjs(o,zip);
        }else{
          this.fobj(o,zip);
        }
      }
    }else{
      this.fobj(obj,zip);
    }
  },
  fobj:function(obj,zip){
    var points=obj.curve.points;
    var len=points.length;
    if(!len)return;
    var pt;
    var ret=[];
    var isString=typeof points=='string';
    var isBezier=obj.type!=Hanimation.SHAPE_SPLINE;
    if(zip){
      if(isString)return;
      for(var i=0;i<len;i++){
        pt=points[i];
        pt=isBezier?[pt.backwardX,pt.backwardY,pt.forwardX,pt.forwardY,pt.nodeX,pt.nodeY]:[pt.x,pt.y];
        ret.push(pt.join(','));
      }
      ret=ret.join(';');
    }else{
      if(!isString)return;
      points=points.split(';');
      for(var i=0;i<points.length;i++){
        pt=points[i].split(',');
        pt=isBezier?{
          backwardX:Number(pt[0]),
          backwardY:Number(pt[1]),
          forwardX:Number(pt[2]),
          forwardY:Number(pt[3]),
          nodeX:Number(pt[4]),
          nodeY:Number(pt[5])
        }:{
          x:Number(pt[0]),
          y:Number(pt[1])
        };
        ret.push(pt);
      }
    }
    obj.curve.points=ret;
  }
}

createColorStop = function(p, r, g, b, a) {
    return {
        // 颜色位置。取值从0.0到1.0。
        p: p,

        // r,g,b,a, 红、绿、蓝、透明度。取值从0到255
        r: r,
        g: g,
        b: b,
        a: a
    };
};

createFillInfo = function() {
    // 填充信息
    var fillInfo = {
        // 填充模式: 0(纯色), 1(线性渐变), 2(环形渐变), 3(图形填充), 4(透明)
        fillStyle: 0,

        // 当 fillStyle = 3, 此处为填充图形的地址
        fillImage: "",

        // 填充起始色块位置的坐标值，以物体局部坐标为准
        fillStartPos: {
            x: 32,
            y: 10
        },

        // 填充终止色块位置的坐标值，以物体局部坐标为准
        fillEndPos: {
            x: 80,
            y: 100
        },

        // fillColors是一个颜色值的数组。数组每一个元素的定义见colorStop变量
        fillColors: [createColorStop(0, 144, 200, 255, 1), createColorStop(0.8, 255, 144, 200, 1), createColorStop(1, 200, 255, 144, 1)]
    };

    return fillInfo;
};

var g_nId = 0; 
function getIncrementalId()
{
    return g_nId++;
};

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

var g_prevTime=0;
function guidGen() {
    var now = new Date().getTime();
    if(now <= g_prevTime)
        now = g_prevTime + 1;
    
    g_prevTime = now;
    var num = (now-new Date('2013/1/1').getTime())+''+Math.random().toString().substr(2,4);
    
    // 0123456789abcdefghijklmnopqrstuvwxyz
    return Number(num).toString(36);

    //return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

createParam = function() {
    var native_param = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,

        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,

        width: 0,
        height: 0,

        alpha: 1,
        rotate: 0,
        scaleX: 1.,
        scaleY: 1.,

        lineWidth: 1,
        strokeType: 0,
        strokeColor: "#0683ff",

        lineCap: 'round', // [butt,round,square]
        lineJoin: 'round', // [round,bevel,miter]
        fillInfo: createFillInfo()
    };

    return native_param;
};



createAniParam = function() {
    var native_param = createParam();

    var aniobject_param = {
        guid: guidGen(),
        id: 0,
        type: 0,
        name: "",

        param: {}
    };

    var curve_param = {
        closed: 1,

        points: []
    };   
    aniobject_param.curve = curve_param;      
    aniobject_param.param = native_param;

    return aniobject_param;
};


TimelineUnit = {
    // 华东：添加了lyrs参数以支持元件时间线。
    addObject: function(unit, object, force, lyrs, above) { 
        layers = window.aniLayers;
        if(typeof lyrs != "undefined")
            layers = lyrs;
            
        if(layers){
            for(var idx=layers.length-1;idx>=0;idx--){
              if(layers[idx].id==unit.layerId)break;
            }  

            if (idx < 0)
                return;

            var layer=layers[idx];
            if(!force && layer&&(layer.lock||layer.hide)){
                alert(Hanimation.Message.LockedLayer);
                return false;

            }
        }
        if (unit.animated && unit.objects.length > 0) {
            alert(Hanimation.Message.LockedUnit);
            return false;
        }

        if (object) {
            if(!above)
                unit.objects.push(object.dataRef);
            else
            {
                var len = unit.objects.length;
                for(var i=0;i<len;i++)
                {
                    var ins = unit.objects[i];
                    if(ins == above)
                    {
                        unit.objects.splice(i+1,0,object);
                        break;
                    }
                }
                unit.objects.push(object.dataRef);
            }
            
            object.setLayerFrame(unit.layerId, unit.frameStart);   

        }
        return true;
    },
    
	distributeProgress: function(unit, mode){
		if(!unit || unit.animated || !unit.pg)
			return; 
		
        function progressMode(obj){
            var mode = 0;
            switch(obj.type){
                case Hanimation.SHAPE_PENCIL:
                    mode = 1;
                    break;
                case Hanimation.SHAPE_CURVE:
                case Hanimation.SHAPE_RECTANGLE:
                case Hanimation.SHAPE_ELLIPSE:
                case Hanimation.SHAPE_POLYGON:
                case Hanimation.SHAPE_ROUNDED:
                case Hanimation.SHAPE_LINE:
                    mode = 2; 
                    break;
                case Hanimation.SHAPE_TEXT:
                    mode = 3; 
                    break;
                case Hanimation.SHAPE_PICTURE:
                case Hanimation.SHAPE_GROUP:
                    mode = 4; 
                    break;
            }
            
            return mode;  
        }
        
		var frameCount = unit.frameCount;		
		var totalNodes = 0;
		var objCount = unit.objects.length;
        var factor = 2; 
		var textShift = 0;
        var groupSec = 1;
        
        var fps = window.aniData.rate;
        // TODO: Setup node distribution only once for each unchanged data
		// if(!unit.totalNodes)
        {
			for (var j = 0; j < objCount; j++) 
			{
				var objData = unit.objects[j];
                var obj = getAniObject(objData);
                obj.progressMode = progressMode(objData);                
				if(obj.progressMode == 1){
					totalNodes += objData.curve.points.length;
				}
                else if(obj.progressMode == 2){
                    var ptLen = objData.curve.points.length + (objData.curve.closed ? 1 : 0);
					totalNodes += (ptLen << factor);
				}
				else if(obj.progressMode == 3){
                    var len = unescape(objData.param.textContent).length;
					totalNodes += (len << textShift);
				}
				else if(obj.progressMode == 4 || obj.progressMode == 5){ 
					totalNodes += fps * groupSec;
				}                
			} 	
			unit.totalNodes = totalNodes;

			var nodes = 0;
			for (j = 0; j < objCount; j++) 
			{
				var objData = unit.objects[j];
                var obj = getAniObject(objData);
				if(obj.progressMode){
					var obj = getAniObject(objData);
					obj.percentFrom = nodes / totalNodes;
					
                    var ptLen = objData.curve.points.length + (objData.curve.closed ? 1 : 0);
					if(obj.progressMode == 1)
						nodes += ptLen;
					else if(obj.progressMode == 2)
						nodes += (ptLen << factor);
					else if(obj.progressMode == 3){
                        var len = unescape(objData.param.textContent).length;
						nodes += (len << textShift);
                    }
                    else if(obj.progressMode == 4 || obj.progressMode == 5){ 
                        if(obj.anchorParam)
                            objData.param = JSON.clone(obj.anchorParam); 
                        else
                            obj.anchorParam = JSON.clone(objData.param);
                        nodes += fps * groupSec;
				}                
						
					obj.percentTo = nodes / totalNodes;
				}
			}
		}
		
        var frames = window.currentFrame - unit.frameStart + 1;
		for (var j = 0; j < objCount; j++) 
		{
			var objData = unit.objects[j];
            var obj = getAniObject(objData);      
			if(obj.progressMode){
				obj.framePercent = (mode == 1) ? 1 : frames / frameCount;
			}
		}	
	},
	
    setAnimated: function(unit, animated) {
        unit.pg = false; 
        
        if (unit.animated == animated) return;

        unit.animated = animated;

        if (!animated) {
            
            if (unit.objects.length && unit.objects[0].type == Hanimation.SHAPE_GROUP) {
                var len = unit.keyframes.length;
                for(var i=len-1;i>0;i--)
                {
                    var key = unit.keyframes[i];
                    if(key)
                    {
                        if(unit.hashKey["key_"+key.id])
                            delete unit.hashKey["key_"+key.id];
                        delete key;
                    }
                    unit.keyframes.splice(i, 1);
                }
                unit.keyframes.length=1;
                // this.aryObjects = this.aryObjects[0].aryObjects;
            }
        } else if (unit.objects.length) {
            
            if (unit.objects.length > 1 || unit.objects[0].type != Hanimation.SHAPE_GROUP) {
                var group = createNewObject(Hanimation.SHAPE_GROUP);
                group.addObjects(unit.objects);
                group.getRawBound();
                unit.objects = [];
                
                // unit.objects.push(group.dataRef);
                TimelineUnit.addObject(unit, group);                 
            }

            if (unit.keyframes.length == 1) this.addKeyframe(unit, unit.frameStart + unit.frameCount - 1);
        }
        else
        {
            alert(Hanimation.Message.NoObject);
            unit.animated = false;
        }
    },

    setProgress: function(unit, progress) {
        if(unit.animated)
        {
            alert(Hanimation.Message.NoProgress);        
            return; 
        }
        
        /*
        if(progress && unit.objects.length == 1 && unit.objects[0].type == Hanimation.SHAPE_GROUP)
        {
            alert(Hanimation.Message.ProgressGroup);
            return; 
        }
        */
            
        if (unit.pg == progress) return;

        unit.pg = progress;
    },
    
    addKeyframe: function(unit, frameid) {
        if(!isDefined(frameid))
            return null; 
            
        var len = unit.keyframes.length;
        var param;
        if (unit.animated == false || len == 0) param = null;
        else {
            param = createParam();
            var obj = getAniObject(unit.objects[0]);

            if (len == 1) {
                Param.exchange(param, unit.objects[0].param, false);
                Param.exchange(unit.keyframes[0].param, param, false);
            } else if(frameid>unit.keyframes[len-1].id) {
                Param.exchange(param, unit.keyframes[len - 1].param, false);
            } else {
                param = this.getTweenParam(unit, frameid);
            }
        }
        // TODO: Sort all keyframes. Important!!!
        var keyframe = createKeyframe(frameid, param);
        
        if(len==0){
            unit.keyframes.push(keyframe);
        }else{
            //insert by order
            for(var i=len-1;i>=0;i--){
                if(frameid>unit.keyframes[i].id){
                    unit.keyframes.splice(i+1,0,keyframe);
                    break;
                }
            }
        }

        unit.hashKey['key_' + frameid] = keyframe;
        return keyframe;
    },
    
    deleteKeyframe: function(unit, frameid) {},

    getKeyframe: function(unit, frameid) {
        var key = unit.hashKey['key_' + frameid];
        if (!key) key = null;

        return key;
    },

    repairKeyframe: function(tmUnit, frameid, delta) {
        for (var j = tmUnit.keyframes.length - 1;j>=0; j--) {
            var c=tmUnit.keyframes[j];
            if(c.id<frameid)break;
            var key='key_'+c.id;
            var temp=tmUnit.hashKey[key];
            delete(tmUnit.hashKey[key]);
            c.id=c.id+delta;
            tmUnit.hashKey['key_'+c.id]=temp;
        }
        
        var objCount = tmUnit.objects.length;
        for (var j = 0; j < objCount; j++) 
        {
            var objData = tmUnit.objects[j];
            var object = getAniObject(objData);
            if (object) {
                object.frameId = tmUnit.frameStart;
                object.layerId = tmUnit.layerId;
            }
        }        
    },
    
    findKeyframe: function(unit, keyid) {
        var len = unit.keyframes.length;
        var key = null;
        var param = null;
        var keyframe = null;
        for (var i = 0; i < len; i++) {
            key = unit.keyframes[i];
            if (key.id == keyid) {
                keyframe = key;
                break;}
            //else if (key.id > keyid && i > 0) keyframe = unit.keyframes[i - 1];
        }

        return keyframe;
    },
    
    getProgressParam: function(unit, obj, frameid, options) {
        if(!(unit && obj && obj.anchorParam))
            return obj ? obj.getParam() : null; 
            
        var tween = options.tween;
        var frmFrom = unit.frameStart + Math.floor(unit.frameCount * obj.percentFrom);
        var frmTo = unit.frameStart + Math.floor(unit.frameCount * obj.percentTo) - 1;
        var count = frmTo - frmFrom + 1; 
        var index = Math.min(frmTo, frameid - frmFrom);
        
        var paramEnd = obj.anchorParam;
        var paramStart =  JSON.clone(paramEnd);
        
        {
            var ratio = 0.5;
            paramStart.rotate = paramEnd.rotate - Math.PI * 0.25;	
            paramStart.scaleX = paramEnd.scaleX * ratio;
            paramStart.scaleY = paramEnd.scaleY * ratio;
            paramStart.alpha = index < 0 ? 0 : paramEnd.alpha * ratio;
            
            paramStart.startX = paramEnd.startX +  paramEnd.rotateCenterX * (1 - ratio);
            paramStart.startY = paramEnd.startY +  paramEnd.rotateCenterY * (1 - ratio);
            paramStart.width = paramEnd.width * ratio;
            paramStart.height = paramEnd.height * ratio;
            paramStart.endX = paramStart.startX +  paramStart.width;
            paramStart.endY = paramStart.startY + paramStart.height;
            
            paramStart.rotateCenterX = paramEnd.rotateCenterX * ratio;
            paramStart.rotateCenterY = paramEnd.rotateCenterY * ratio;
        
            paramStart.customPivot = true; 
            
            paramStart.left = paramStart.startX;
            paramStart.top = paramStart.startY;
            paramStart.right = paramStart.startX + paramStart.width;
            paramStart.bottom = paramStart.startY + paramStart.height;        
        }
        
        var factor = this.getTweenFactors(count, tween)[index < 0 ?  0 : index];
        var param = createParam();
        Param.tweenParam(param, paramStart, paramEnd, factor);

        return param;
    },    

    getTweenParam: function(unit, frameid, refParam) {
        var len = unit.keyframes.length;
        var key1 = unit.keyframes[0];
        var key2 = null;
        var param = null;
        var idx1 = 0;
        var idx2 = -1;
        
        if(len>1 && !unit.hashKey['key_'+frameid]){
            for (var i = 1; i < len; i++) {
                key2 = unit.keyframes[i];
                if (key2.id > frameid){
                    idx2 = i; 
                    break;
                }    
                key1=key2;
                idx1 = i;
                key2=null;
            }
            if (key2) {
                var count = Math.abs(key2.id - key1.id);
                var index = frameid - key1.id;
                //var factor = (frameid - key1.id) / count;
                var factor = this.getTweenFactors(count, key1.tween)[index];
                param = createParam();
                Param.tweenParam(param, key1.param, key2.param, factor);
                
                if(unit.pathMode > Hanimation.PATHMODE_DEFAULT && idx1 >= 0 && idx2 >= 0)
                {
                    var obj = getPathObject(unit);
                    var objParam = obj.getParam();
                    var points = unit.path;
                    var pt = bezierGetPoint(points[idx1], points[idx2], factor);
                    
                    pt.x = unit.pathLeft + pt.x - param.rotateCenterX;
                    pt.y = unit.pathTop + pt.y - param.rotateCenterY;
                    param.startX = pt.x;
                    param.startY = pt.y;
                    param.endX = param.startX + param.width;
                    param.endY = param.startY + param.height;
                    param.left = param.startX;
                    param.top = param.startY;
                    param.right = param.endX;
                    param.bottom = param.endY;                    
                }
            }
        }
        if(!param)param=key1.param;

        //param.left=param.startX;
        //param.top=param.startY;
        //param.right=param.left+param.width;
        //param.bottom=param.top+param.height;

        if(refParam)
        {
            // Work around for old content without such fields. 
            if(param.keepAspect == undefined)
                param.keepAspect = refParam.keepAspect;
            if(param.rawWidth == undefined || isNaN(param.rawWidth))
                param.rawWidth = refParam.rawWidth;
            if(param.rawHeight == undefined || isNaN(param.rawHeight))
                param.rawHeight = refParam.rawHeight; 
        }
        
        return param;
    },

    getTweenFactors: function(count, type) {

        // count 代表系数的数目，由帧数决定。每一帧对应一个系数
        
        // factors 是返回的系数的数组，取值由插值算法决定，一般在0~1，但也有可能比0小，比1大（例如振荡模型）
        var factors = [];
        
        // 初始位置，对应timelineUnit的第一帧(frameStart)
        var position = {x:0};
        
        // 生成tween对象
        var tween = new TWEEN.Tween(position);
        
        // 终止位置，对应timelineUnit的最后一帧
        tween.to({x: 1}, 1000);
        
        // 注册算法类型s
        // type需要在属性对话框中用droplist指定。当检测到当前层、当前unit包含动画时显示该属性参数。     
        // Linear.EaseNone (Linear)
        // 
        // Quartic.EaseIn (Fade In)
        // Quartic.EaseOut (Fade Out)
        // Quartic.EaseInOut (Fade In & Out)
        // 
        // Elastic.EaseIn (Elastic In)
        // Elastic.EaseOut (Elastic Out)
        // Elastic.EaseInOut (Elastic In & Out)
        // 
        // Bounce.EaseIn (Bounce In)
        // Bounce.EaseOut (Bounce Out)
        // Bounce.EaseInOut (Bounce In & Out)
        if(!type)type='Linear.EaseNone';//默认线性运动
        tween.easing(eval('TWEEN.Easing.'+type));
        
        // 获取每一帧对应的系数
        for(var i=0;i<count;i++)
            factors[i] = tween.getFactor(i/count); 
        
        // 返回系数
        return factors;
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!
    // Every timeline unit has at least one keyframe that is at this.frameStart
    // addKeyframe(unit, this.frameStart);
};

Param = {
    exchange:function(p1, p2, assign)
	{
        // TODO: Is there a better way? 
		var src;
		var des;
		if(assign)
		{
			src = p1;
			des = p2;
		}
		else
		{
			src = p2;
			des = p1;
		}		

		des.startX = src.startX;
		des.startY = src.startY;
		des.endX = src.endX;
		des.endY = src.endY;

		des.left = src.left;
		des.right = src.right;
		des.top = src.top;
		des.bottom = src.bottom;
		
		des.width = src.width;
		des.height = src.height;
		
		des.alpha = src.alpha;
		des.scaleX = src.scaleX;
		des.scaleY = src.scaleY;
		des.rotate = src.rotate;	
        
        // Workaround the issue where old contents may not have keepAspect, rawWidth, and rawHeight
        des.keepAspect = (src.keepAspect == undefined) ? des.keepAspect : src.keepAspect;
        des.rawWidth = (src.rawWidth == undefined) ? des.rawWidth : src.rawWidth;
        des.rawHeight = (src.rawHeight == undefined) ? des.rawHeight : src.rawHeight;

        des.rotateCenterX = src.rotateCenterX;
        des.rotateCenterY = src.rotateCenterY;
        des.customPivot = src.customPivot;
	},
	
	tweenParam: function(des, param1, param2, factor)
	{
		des.startX = param1.startX + factor*(param2.startX - param1.startX);
		des.startY = param1.startY + factor*(param2.startY - param1.startY);
		des.endX = param1.endX + factor*(param2.endX - param1.endX);
		des.endY = param1.endY + factor*(param2.endY - param1.endY);
		des.width = param1.width + factor*(param2.width - param1.width);
		des.height = param1.height + factor*(param2.height - param1.height);
		des.alpha = param1.alpha + factor*(param2.alpha - param1.alpha);
		des.scaleX = param1.scaleX  + factor*(param2.scaleX  - param1.scaleX );
		des.scaleY = param1.scaleY + factor*(param2.scaleY - param1.scaleY);
		des.rotate = param1.rotate + factor*(param2.rotate - param1.rotate);	
		des.rotateCenterX = param1.rotateCenterX + factor*(param2.rotateCenterX - param1.rotateCenterX);	
		des.rotateCenterY = param1.rotateCenterY + factor*(param2.rotateCenterY - param1.rotateCenterY);	
        des.customPivot = true; 
        
        // TODO: Double check: raw size should be tween insensitive. 
        des.rawWidth = param1.rawWidth  + factor*(param2.rawWidth  - param1.rawWidth );
        des.rawHeight = param1.rawHeight  + factor*(param2.rawHeight  - param1.rawHeight );
        
        if(param1.fillInfo && param1.fillInfo && (param1.fillInfo.fillStyle == 1 || param1.fillInfo.fillStyle == 2))
        {
            des.fillInfo.fillStartPos.x = param1.fillInfo.fillStartPos.x + factor * 
                (param2.fillInfo.fillStartPos.x - param1.fillInfo.fillStartPos.x); 
            des.fillInfo.fillStartPos.y = param1.fillInfo.fillStartPos.y + factor * 
                (param2.fillInfo.fillStartPos.y- param1.fillInfo.fillStartPos.y); 
                
            des.fillInfo.fillEndPos.x = param1.fillInfo.fillEndPos.x + factor * 
                (param2.fillInfo.fillEndPos.x - param1.fillInfo.fillEndPos.x); 
            des.fillInfo.fillEndPos.y = param1.fillInfo.fillEndPos.y + factor * 
                (param2.fillInfo.fillEndPos.y- param1.fillInfo.fillEndPos.y); 
        }
        
		des.left = des.startX;
		des.top = des.startY;
		des.right = des.startX + des.width;
		des.bottom = des.startY + des.height;
	}, 

    scale: function(par, scaleX, scaleY)
    {
		par.startX = par.startX * scaleX;
        par.startY = par.startY * scaleY;
        par.endX = par.endX * scaleX;
        par.endY = par.endY * scaleY;
        
        par.rotateCenterX = par.rotateCenterX * scaleX;
        par.rotateCenterY = par.rotateCenterY * scaleY;
        
        if(par.fillInfo && (par.fillInfo.fillStyle == 1 || par.fillInfo.fillStyle == 2))
        {
            par.fillInfo.fillStartPos.x = par.fillInfo.fillStartPos.x * scaleX;
            par.fillInfo.fillStartPos.y = par.fillInfo.fillStartPos.x * scaleY;
            par.fillInfo.fillEndPos.x = par.fillInfo.fillEndPos.x * scaleX;
            par.fillInfo.fillEndPos.y = par.fillInfo.fillEndPos.y * scaleY;
        }

        par.left = Math.min(par.startX, par.endX);
        par.right = Math.max(par.startX, par.endX);
        par.top = Math.min(par.startY, par.endY);
        par.bottom = Math.max(par.startY, par.endY);

        par.width = par.right - par.left;
        par.height = par.bottom - par.top;    
    },
    
    shift: function(par, deltaX, deltaY)
    {
		par.startX += deltaX;
        par.startY += deltaY;
        par.endX += deltaX;
        par.endY += deltaY;
 
        par.left = Math.min(par.startX, par.endX);
        par.right = Math.max(par.startX, par.endX);
        par.top = Math.min(par.startY, par.endY);
        par.bottom = Math.max(par.startY, par.endY);
    
        // Width, height should be untouched. 
    }
};  


/** 
 * Based on rgbcolor.js, A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 */
function RGBColor(color_string)
{
    this.ok = false;

    // strip any leading #
    if (color_string.charAt(0) == '#') { // remove # if any
        color_string = color_string.substr(1,6);
    }

    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred : 'cd5c5c',
        indigo : '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    for (var key in simple_colors) {
        if (color_string == key) {
            color_string = simple_colors[key];
        }
    }
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            this.ok = true;
        }

    }

    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }

    // help
    this.getHelpXML = function () {

        var examples = new Array();
        // add regexps
        for (var i = 0; i < color_defs.length; i++) {
            var example = color_defs[i].example;
            for (var j = 0; j < example.length; j++) {
                examples[examples.length] = example[j];
            }
        }
        // add type-in colors
        for (var sc in simple_colors) {
            examples[examples.length] = sc;
        }

        var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement('li');
                var list_color = new RGBColor(examples[i]);
                var example_div = document.createElement('div');
                example_div.style.cssText =
                        'margin: 3px; '
                        + 'border: 1px solid black; '
                        + 'background:' + list_color.toHex() + '; '
                        + 'color:' + list_color.toHex()
                ;
                example_div.appendChild(document.createTextNode('test'));
                var list_item_value = document.createTextNode(
                    ' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex()
                );
                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);
                xml.appendChild(list_item);

            } catch(e){}
        }
        return xml;

    }

}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// aniobject.js

inherit = function(descendant, parent) { 
	descendant.prototype = new parent(); 
	descendant.prototype.constructor = descendant;
};  


Hanimation.BufferParam = function(){
	this.direct = null; 
	this.aux = null; 
};



// 生成并返回填充元素
function createFillPattern(ctx, fillInfo, scaleX, scaleY)
{
	var fillPattern = "#93C9FF";
    var i; 
    var stopColor;
    
    var scaleX = scaleX || 1.;
    var scaleY = scaleY || 1.;

	// 按照fillInfo里面定义的填充属性生成并返回填充元素
	if(fillInfo.fillStyle == 0){
        var fillColor = fillInfo.fillColors[0];
		fillPattern = 'rgba('+fillColor.r+','+fillColor.g+','+fillColor.b+','+fillColor.a+')';  
	}else if(fillInfo.fillStyle == 1){  //线性渐变
        fillPattern = ctx.createLinearGradient(
            fillInfo.fillStartPos.x * scaleX,
            fillInfo.fillStartPos.y * scaleY,
            fillInfo.fillEndPos.x * scaleX,
            fillInfo.fillEndPos.y * scaleY);
            
        for(i = 0; i < fillInfo.fillColors.length; i++){
            stopColor = fillInfo.fillColors[i];
            fillPattern.addColorStop(stopColor.p, 'rgba('+stopColor.r+','+stopColor.g+','+stopColor.b+','+stopColor.a+')');
        }
    }else if(fillInfo.fillStyle == 2) {  //环形渐变
        var w = Math.abs(fillInfo.fillEndPos.x - fillInfo.fillStartPos.x) * scaleX, 
            h = Math.abs(fillInfo.fillEndPos.y - fillInfo.fillStartPos.y) * scaleY, 
            radius = Math.sqrt(w*w+h*h);
        fillPattern = ctx.createRadialGradient(
            fillInfo.fillStartPos.x * scaleX, 
            fillInfo.fillStartPos.y * scaleY, 0,
            fillInfo.fillStartPos.x * scaleX, 
            fillInfo.fillStartPos.y * scaleY, radius);
            
        for(i = 0; i < fillInfo.fillColors.length; i++){
            stopColor = fillInfo.fillColors[i];
            fillPattern.addColorStop(stopColor.p, 'rgba('+stopColor.r+','+stopColor.g+','+stopColor.b+','+stopColor.a+')');
        }
    }else if(fillInfo.fillStyle == 3){  //图形填充
        var img = new Image();
        img.src = fillInfo.fillImage;
        fillPattern = ctx.createPattern(img,'repeat');
    }else if(fillInfo.fillStyle == 4){  //透明
        fillPattern = 'rgba(255,255,255,0)';
    }
	// ##################################### 
	// TODO:这里需要添加其它填充选项的处理
	
	return fillPattern;
};


Point = {
    set:function(src, x0, y0){
		src.x = x0;
		src.y = y0; 
    },
    
    copy:function(src, des)
    {
		src.x = des.x;
		src.y = des.y;     
    },
    
    offset:function(src, x, y)
    {
		src.x = src.x + x;
		src.y = src.y + y; 
    }, 
    
    scale: function(src, scaleX, scaleY)
	{
		src.x = src.x * scaleX;
		src.y = src.y * scaleY; 
	},
    
    isEqual: function(src, des)
	{
		return (des.x == src.x && des.y == src.y);
	}
};


TriPoint = {
    set:function(src, x0, y0, x1, y1, x2, y2){
		src.nodeX = x0;
		src.nodeY = y0; 
		src.forwardX = x1; 
		src.forwardY = y1;
		src.backwardX = x2;
		src.backwardY = y2;	
    },
    
    copy:function(src, des)
    {
		src.nodeX = des.nodeX;
		src.nodeY = des.nodeY; 
		src.forwardX = des.forwardX; 
		src.forwardY = des.forwardY;
		src.backwardX = des.backwardX;
		src.backwardY = des.backwardY;	        
    },
    
    offset:function(src, x, y)
    {
		src.nodeX = src.nodeX + x;
		src.nodeY = src.nodeY + y; 
		src.forwardX = src.forwardX + x; 
		src.forwardY = src.forwardY + y;
		src.backwardX = src.backwardX + x;
		src.backwardY = src.backwardY + y;	    
    }, 
    
    scale: function(src, scaleX, scaleY)
	{
		src.nodeX = src.nodeX * scaleX;
		src.nodeY = src.nodeY * scaleY; 
		src.forwardX = src.forwardX * scaleX; 
		src.forwardY = src.forwardY * scaleY;
		src.backwardX = src.backwardX * scaleX;
		src.backwardY = src.backwardY * scaleY;		
	},
    
    isEqual: function(src, des, mode)
	{
		return (des.nodeX == src.nodeX && 
				des.nodeY == src.nodeY && 
				(mode == 0 ||
				des.forwardX == src.forwardX && 
				des.forwardY == src.forwardY && 
				des.backwardX == src.backwardX &&
				des.backwardY == src.backwardY));
	},
	
	setCounterPoint:function(src, useForward, override)
	{
		var len1, len2, w1, h1, w2, h2, x1, y1, x2, y2;
		if(useForward)
		{
			x1 = src.forwardX;
			y1 = src.forwardY; 
			x2 = src.backwardX;
			y2 = src.backwardY; 
		}
		else
		{
			x1 = src.backwardX;
			y1 = src.backwardY; 
			x2 = src.forwardX;
			y2 = src.forwardY; 
		}

		w1 = x1 - src.nodeX;
		h1 = y1 - src.nodeY; 
		
		if(override)
		{
			x2 = src.nodeX - w1; 
			y2 = src.nodeY - h1; 
		}
		else
		{
			len1 = Math.sqrt(w1*w1+h1*h1); 
			
			w2 = src.nodeX - x2;
			h2 = src.nodeY - y2; 
			len2 = Math.sqrt(w2*w2+h2*h2);
			
			if(len1 == 0 || len2 == 0)
			{
				x2 = src.nodeX;
				y2 = src.nodeY;
			}
			else
			{
				ratio = len2/len1; 
				x2 = src.nodeX - w1*ratio;
				y2 = src.nodeY - h1*ratio;
			}
		}

		if(useForward)
		{
			src.backwardX = x2;
			src.backwardY = y2; 
		}
		else
		{
			src.forwardX = x2;
			src.forwardY = y2; 
		}		
	}
};


Hanimation.AniObject = function(data){
	var isiPad =  navigator.userAgent.match(/iPad/i) != null;
	var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
		
	this.useTouch = isMobile(); // ('ontouchstart' in window);
	var useTouch = this.useTouch;
		
	this.anchorRadius = useTouch ? 12 : 4;
	this.fillCtrlSize = useTouch ? 16 : 4;
    
    this.forceAspectRatio = false;
    this.canRotate = true; 
    
    this.dataRef = null; 
    if(data){
        this.dataRef = data;
    }	
    
	this.auxParam = createParam(); 
	
	this.bufferParam = new Hanimation.BufferParam(); 
	this.bufferParam.direct = createParam(); 
	this.bufferParam.aux = createParam(); 	
	
	this.locked = false; 

	this.layerId = -1;
	this.frameId = -1; 
	
	this.editDeltaX = 0;
	this.editDeltaY = 0; 
	
	this.editStartX = 0; 
	this.editStartY = 0; 
	this.editEndX = 0; 
	this.editEndY = 0; 
	this.editLeft = 0;
	this.editTop = 0; 
	this.editRight = 0; 
	this.editBottom = 0; 
    
	this.editFillStartX = 0; 
	this.editFillStartY = 0; 
	this.editFillEndX = 0; 
	this.editFillEndY = 0; 
    
    this.editRotate = 0;
    this.editRotateBaseX = 0; 
    this.editRotateBaseY = 0;
    this.editUpdateRotate = false; 
    
    this.editOriginalStartX = 0; 
    this.editOriginalStartY = 0; 
    this.editOriginalEndX = 0; 
    this.editOriginalEndY = 0; 
	
	this.scaleBaseX = 0.;
	this.scaleBaseY = 0.; 

    this.prevRegion = null; 
    
	this.previewStrokeColor = "#ff0000";
	this.controlFillColor = "#ffff00";
	this.controlActiveFillColor = "#ff0000";
	this.controlStrokeColor = "#0000ff";
	this.editFillColor = "#ff0000";
	this.fillCtrlStrokeColor = "#ffffff";
	this.fillCtrlFillColor = "#000000";

    this.highlightStrokeColor = "#000088";
	this.aidStrokeColor = "#008800";
	this.aidFillColor = "#008800";
	
	this.focusMode = Hanimation.FM_EDIT;
	
	this.activeControl = -1; 
	this.aryActiveNodes = [];
	
	this.isCreating = false; 
	this.isEditing = false; 
	
    this.hasRotation = false; 
    
	this.drawMode = 1; 
    
    this.hitPos = Hanimation.HITTEST_NONE;
    
    this.minWidth = Hanimation.MIN_VALUE;	
    this.minHeight = Hanimation.MIN_VALUE;	
    this.maxWidth = Hanimation.MAX_VALUE;	
    this.maxHeight = Hanimation.MAX_VALUE;

    this.eventListeners = [];
};

Hanimation.AniObject.prototype.setAttribute = function(attribute, value)
{
    var par = this.getParam();
    switch (attribute)
    {
        case "fillColor":
            par.fillInfo.fillColors = [createColorStop(0, value.r | 0, value.g | 0, value.b | 0, value.a || 0)];
        case "strokeColor":
            var r =  (value.r | 0).toString(16);
            var g = (value.g | 0).toString(16);
            var b = (value.b | 0).toString(16);
            if(r.length == 1)
                r = "0"+r;
            if(g.length == 1)
                g = "0"+r;    
            if(b.length == 1)
                b = "0"+r;        
            par.strokeColor = "#"+r+g+b;
            break;
        default:
            par[attribute] = value;
    }
};

Hanimation.AniObject.prototype.getAttribute = function(attribute)
{
    if(attribute == "points")
    {
        if(this.dataRef && this.dataRef.curve && this.dataRef.curve.points)
            return this.dataRef.curve.points;
        else
            return [];
    }
    else if(attribute == "activeControl")
    {
        return this.activeControl;
    }
    else
    {
        var par = this.getParam();
        return par[attribute];
    }
};

Hanimation.AniObject.prototype.setPosition = function(x, y, isDelta)
{
    var par = this.getParam();
    if(!isDelta)
    {
        x = x - par.left;
        y = y - par.top;
    }

    par.startX += x;
    par.startY += y;
    par.endX += x;
    par.endY += y;

    par.left += x;
    par.top += y;
    par.right += x;
    par.bottom += y;
};

Hanimation.AniObject.prototype.getChildren = function(){
    var children = [];
	var len = this.dataRef.items ? this.dataRef.items.length : 0;
    for(var i=0;i<len;i++)
	{
        // object = this.aryObjects[i];
        var obj=this.dataRef.items[i];

        object = getAniObject(obj);
        
        children.push(object);
	}    
    
    return children;
};

Hanimation.AniObject.prototype.getParent = function(){
    // TODO: Get the parent item. 
    return null;
};
    
Hanimation.AniObject.prototype.offset = function(x, y)
{
    var points = this.dataRef.curve ? this.dataRef.curve.points : [];
    var len = points.length; 
    for(var i=0;i<len;i++)
    {
        point = points[i];	
        if(typeof point.x == "undefined")
            TriPoint.offset(point, x, y);   
        else
            Point.offset(point, x, y);   
    }
};

Hanimation.AniObject.prototype.processFlip = function(ctx, width, height, offsetLeft, offsetTop)
{
	var offsetLeft = offsetLeft ? offsetLeft : 0;
	var offsetTop = offsetTop ? offsetTop : 0;
	
    var par = this.getParam(); 

    if(par.vF || par.hF)
    {
        var offsetX = par.hF ? width + offsetLeft*2 : 0;
        var offsetY = par.vF ? height + offsetTop*2 : 0;
        var scaleX = par.hF? -1 : 1;
        var scaleY = par.vF? -1 : 1;    

        ctx.translate(offsetX, offsetY);
        ctx.scale(scaleX, scaleY);
    }
};
  
Hanimation.AniObject.prototype.updateTweenedParam = function(unit, frameid) { 
	
	var srcParam = this.getParam();
	if (unit.animated && unit.objects.length == 1) {
		var keyframe = TimelineUnit.getKeyframe(unit, frameid);
		if (keyframe) {
			var prevKey = keyframe;
			Param.exchange(keyframe.param, srcParam, true);
		} else {
			var param = TimelineUnit.getTweenParam(unit, frameid, srcParam);
			if (param) 
			{
				Param.exchange(param, srcParam, true);
			}
		}
	}
};
  
Hanimation.AniObject.prototype.hitTest = function(x, y, mode) { 
	var par = this.getParam();
	var anchorX = 0; 
	var anchorY = 0; 
	var stepX = par.width / 2; 
	var stepY = par.height / 2; 
    
	var threshold = this.anchorRadius; 
	var testPos = Hanimation.HITTEST_NONE;
	
	var bEditMode = (mode == 0 && this.focusMode == Hanimation.FM_EDIT); 
	var bWithin =  ptInRect(x, y, par.left, par.top,  par.left + par.width, par.top + par.height, this); 

	if(mode & 8)
		return bWithin ? Hanimation.HITTEST_WITHIN : Hanimation.HITTEST_NONE;
	
    // Filling position first
    if(par.fillInfo)
    {
        var startX = par.fillInfo.fillStartPos.x + par.left;
        var startY = par.fillInfo.fillStartPos.y + par.top;
        var endX = par.fillInfo.fillEndPos.x + par.left;
        var endY = par.fillInfo.fillEndPos.y + par.top;
        threshold = this.fillCtrlSize;
        
        if(ptInRect(x, y, startX - threshold, startY - threshold, startX + threshold, startY + threshold, this))
		{
			testPos = Hanimation.HITTEST_FILLSTART;
		}		
		else if(ptInRect(x, y, endX - threshold, endY - threshold, endX + threshold, endY + threshold, this))
		{
			testPos = Hanimation.HITTEST_FILLEND;
		}

        if(testPos !== Hanimation.HITTEST_NONE)
        {
            this.hitPos = testPos;
            return testPos; 
        }
    }
    
	var i;
	var j; 
	for(var k=0;k<9;k++)
	{
		i = Math.floor(k/3);
		j = k-i*3;
		anchorX = par.left + j*stepX;
		anchorY = par.top + i*stepY; 
        
        if(i == 1 && j == 1 && par.customPivot)
        {
            anchorX = par.left + par.rotateCenterX;
            anchorY = par.top + par.rotateCenterY; 
        }        
	
        if(this.forceAspectRatio && (k&1))
            // If forceAspectRatio, skip up/down/left/right;
            continue; 
        if(ptInRect(x, y, anchorX - threshold,  anchorY - threshold, anchorX + threshold, anchorY + threshold, this)) 
		{
			testPos = Hanimation.HITTEST + k + 1;
            
			break;
		}
	}
	
	var bEditValid = !bEditMode || (
			 testPos == Hanimation.HITTEST_LEFTTOP 		|| 
			 testPos == Hanimation.HITTEST_LEFTBOTTOM 	|| 
			 testPos == Hanimation.HITTEST_RIGHTTOP 	||
			 testPos == Hanimation.HITTEST_RIGHTBOTTOM	|| 
             testPos == Hanimation.HITTEST_WITHIN       ||
             testPos == Hanimation.HITTEST_PIVOT); // With ctrl key pressed
    
	if(this.useTouch && (
			 testPos == Hanimation.HITTEST_LEFT 		|| 
			 testPos == Hanimation.HITTEST_RIGHT 		|| 
			 testPos == Hanimation.HITTEST_TOP  		|| 
			 testPos == Hanimation.HITTEST_BOTTOM		|| 
			 testPos == Hanimation.HITTEST_RIGHTTOP 	||
			 testPos == Hanimation.HITTEST_LEFTBOTTOM 	||
             testPos == Hanimation.HITTEST_PIVOT)) // Simplifiying selection for touch devices. 
	{
		testPos = Hanimation.HITTEST_WITHIN;
	}
	
    if(testPos == Hanimation.HITTEST_PIVOT && !(mode & 2))
        testPos = Hanimation.HITTEST_WITHIN;
    else if(!bEditValid) //  || this.hasRotation)
	{
		if(bWithin)
			testPos = Hanimation.HITTEST_WITHIN;
		else 
			testPos = Hanimation.HITTEST_NONE;
	}
	else if(!bEditMode && testPos == Hanimation.HITTEST_NONE && bWithin)
		testPos = Hanimation.HITTEST_WITHIN;

	if(testPos == Hanimation.HITTEST_NONE && !bEditMode && this.canRotate)
	{
		var offset = this.anchorRadius * 2; 
		anchorX = par.left + par.width + offset;
		anchorY = par.top - offset;
		
        if(this.focusMode == Hanimation.FM_SCALE)
        {
            // Right-top corner
            if(ptInRect(x, y, anchorX - threshold, anchorY - threshold, anchorX + threshold, anchorY + threshold, this))
                testPos = Hanimation.HITTEST_ROTATE;
            
			if(!this.useTouch)
			{
				var th4 = threshold*4;
				// Left-top corner
				anchorX = par.left - offset;
				anchorY = par.top - offset;
				if(ptInRect(x, y, anchorX - th4, anchorY - th4, anchorX + threshold, anchorY + threshold, this))
					testPos = Hanimation.HITTEST_ROTATE;

				// Left-bottom corner
				anchorX = par.left - offset;
				anchorY = par.top + par.height +  offset;
				if(ptInRect(x, y, anchorX - th4, anchorY - threshold, anchorX + threshold, anchorY + th4, this))
					testPos = Hanimation.HITTEST_ROTATE;
		   
				// Left-bottom corner
				anchorX = par.left + par.width + offset;
				anchorY = par.top + par.height +  offset;
				if(ptInRect(x, y, anchorX - threshold, anchorY - threshold, anchorX + th4, anchorY + th4, this))
					testPos = Hanimation.HITTEST_ROTATE;
			}
        }
    }
            
    this.hitPos = testPos; 
    
	return testPos;
};


Hanimation.AniObject.prototype.setVisible = function(visible) {  
    var par = this.getParam(); 
    par.alpha = visible ? 1 : 0;
};

Hanimation.AniObject.prototype.setAlpha = function(alpha, overwrite) {  

    var overwrite = (typeof overwrite == "undefined") ? false : overwrite; 
    
    if(!overwrite)
    {
        this.auxParam.alpha = alpha;
    }
    else
    {
        var par = this.getParam(); 
        par.alpha = par.alpha * alpha; 
        this.auxParam.alpha = 1;
    }    

    return true;
};


Hanimation.AniObject.prototype.setRotationCenter = function(x, y) {
    var par = this.getParam();
    par.rotateCenterX = x;
    par.rotateCenterY = y;    
};

Hanimation.AniObject.prototype.getRotationCenter = function(isDelta)
{
	var par = this.getParam(); 

    // TODO: Use stored center, instead of default one
    var centerX = par.rotateCenterX; // (par.left + par.right)/2;
    var centerY = par.rotateCenterY; // (par.top+par.bottom)/2;  
    
    if(!isDelta)
    {
        centerX += par.left;
        centerY += par.top;
    }

    return {'x':centerX, 'y':centerY};
};

Hanimation.AniObject.prototype.getBoundRect = function(noRotateAdjust){
    var noRotateAdjust = (typeof noRotateAdjust == "undefined" ?  false : noRotateAdjust); 
    var par = this.getParam();	
    
    var outPar = {
		'left':par.left * par.scaleX * this.auxParam.scaleX, 
		'top':par.top * par.scaleY * this.auxParam.scaleY,
		'right': par.right * par.scaleX * this.auxParam.scaleX,
		'bottom': par.bottom * par.scaleY * this.auxParam.scaleY
    };
        
    if(Math.abs(par.rotate) > 1E-3 && noRotateAdjust == false)
    {    
        var center = this.getRotationCenter(false); 
        var centerX = center.x;
        var centerY = center.y; 
        
        var leftTop = rotatePoint(centerX, centerY, outPar.left, outPar.top, par.rotate);
        var rightBottom = rotatePoint(centerX, centerY, outPar.right, outPar.bottom, par.rotate);
        var rightTop = rotatePoint(centerX, centerY, outPar.right, outPar.top, par.rotate);
        var leftBottom = rotatePoint(centerX, centerY, outPar.left, outPar.bottom, par.rotate);
        
        outPar.left = Math.min(leftTop.x, Math.min(rightBottom.x, Math.min(rightTop.x, leftBottom.x)));
        outPar.right = Math.max(leftTop.x, Math.max(rightBottom.x, Math.max(rightTop.x, leftBottom.x)));
        outPar.top = Math.min(leftTop.y, Math.min(rightBottom.y, Math.min(rightTop.y, leftBottom.y)));
        outPar.bottom = Math.max(leftTop.y, Math.max(rightBottom.y, Math.max(rightTop.y, leftBottom.y)));
    }        
    
    outPar.width = outPar.right - outPar.left;
    outPar.height = outPar.bottom - outPar.top;
    
    return outPar;
}; 

Hanimation.AniObject.prototype.getLiveParams = function()
{
	// Return the parameter that can uniquely represent the object
	return {
		'direct': this.getParam(), 
		'aux': this.auxParam
	};		
};

Hanimation.AniObject.prototype.getLiveParam = function()
{
	var rePar = createParam();
	
	var nat = this.getParam();
	var aux = this.auxParam;
	if(this.isCreating)
	{
		rePar.startX = this.editStartX;
		rePar.startY = this.editStartY;
		rePar.endX = this.editEndX;
		rePar.endY = this.editEndY;	
		rePar.left = Math.min(rePar.startX, rePar.endX);
		rePar.right = Math.max(rePar.startX, rePar.endX);
		rePar.top = Math.min(rePar.startY, rePar.endY);
		rePar.bottom = Math.max(rePar.startY, rePar.endY);	
	}
	else
	{
		rePar.startX = nat.startX * aux.scaleX;
		rePar.startY = nat.startY * aux.scaleY; 
		rePar.endX = nat.endX * aux.scaleX;
		rePar.endY = nat.endY * aux.scaleY;
		rePar.left = nat.left * aux.scaleX;
		rePar.right = nat.right * aux.scaleX;
		rePar.top = nat.top * aux.scaleY;
		rePar.bottom = nat.bottom * aux.scaleY;	
        
        // rawSize reflects the true size and should not be scaled. 
        rePar.rawWidth = nat.rawWidth;
        rePar.rawHeight = nat.rawHeight;
        rePar.keepAspect = nat.keepAspect;
	}
		
	rePar.width = rePar.right - rePar.left;
	rePar.height = rePar.bottom - rePar.top;
	
	rePar.rotate = nat.rotate;
    
    rePar.strokeColor = nat.strokeColor;
    rePar.lineWidth = nat.lineWidth;
    
    // TODO: Do we need this? 
    // rePar.rotateCenterX = (rePar.left + rePar.right)/2;
    // rePar.rotateCenterY = (rePar.top + rePar.bottom)/2;    
	
	return rePar; // {'left':left, 'top':top, 'width':width, 'height':height};
};


Hanimation.AniObject.prototype.setScale = function(scaleX, scaleY, overwrite) {  

    var overwrite = (typeof overwrite == "undefined") ? false : overwrite; 
    
    var par = this.getParam();        
    
    if(!overwrite)
    {
        this.auxParam.scaleX = scaleX;
        this.auxParam.scaleY = scaleY; 
    }    
    else
    {
        this.auxParam.scaleX = 1.;
        this.auxParam.scaleY = 1.;
        
        if(this.dataRef.curve)
        {
            var len = this.dataRef.curve.points.length; 
            var point;	
            for(var i=0;i<len;i++)
            {
                point = this.dataRef.curve.points[i];
            
                if(typeof point.x != "undefined")
                {            
                    point.x = point.x * scaleX;
                    point.y = point.y * scaleY;
                }
                else
                {
                    point.nodeX = point.nodeX * scaleX;
                    point.nodeY = point.nodeY * scaleY;
                    
                    point.forwardX = point.forwardX * scaleX;
                    point.forwardY = point.forwardY * scaleY;
                    
                    point.backwardX = point.backwardX * scaleX;
                    point.backwardY = point.backwardY * scaleY;
                }
            }
        }

        len = (typeof this.dataRef.aryAnchors == "undefined") ? 0 : this.dataRef.aryAnchors.length; 
        for(i=0;i<len;i++)
        {
            point = this.dataRef.aryAnchors[i];
            point.x = point.x * scaleX;
            point.y = point.y * scaleY;		
        }  

		par.startX = par.startX * scaleX;
        par.startY = par.startY * scaleY;
        par.endX = par.endX * scaleX;
        par.endY = par.endY * scaleY;
        
        if(par.fillInfo && (par.fillInfo.fillStyle == 1 || par.fillInfo.fillStyle == 2))
        {
            par.fillInfo.fillStartPos.x = par.fillInfo.fillStartPos.x * scaleX;
            par.fillInfo.fillStartPos.y = par.fillInfo.fillStartPos.y * scaleY;
            par.fillInfo.fillEndPos.x = par.fillInfo.fillEndPos.x * scaleX;
            par.fillInfo.fillEndPos.y = par.fillInfo.fillEndPos.y * scaleY;
        }

        par.rotateCenterX = par.rotateCenterX * scaleX;
        par.rotateCenterY = par.rotateCenterY * scaleY;
        
        par.left = Math.min(par.startX, par.endX);
        par.right = Math.max(par.startX, par.endX);
        par.top = Math.min(par.startY, par.endY);
        par.bottom = Math.max(par.startY, par.endY);

        par.width = par.right - par.left;
        par.height = par.bottom - par.top;
    }    

    return true;
};


Hanimation.AniObject.prototype.getParameter = function(name) {
    return this.getParam();
};

Hanimation.AniObject.prototype.setName = function(name, sceneId) {
    // TODO: Investigate whether this will violate the name-id hashing
    var re = Mugeda.setIdName(this.dataRef, name, sceneId); 
    if(re == 0)
        this.getParam().name = name;
        
    return re; 
};

Hanimation.AniObject.prototype.setRotation = function(angle) {
    this.auxParam.rotate = angle * 0.01745329252; // Math.PI / 180;
};

Hanimation.AniObject.prototype.setScaleFactor = function(factorX, factorY) {  
	/*
	// TODO: Finish setting scale
    var par = this.getParam();        

	var offsetX = par.left * (factorX - 1);
	var offsetY = par.top * (factorY - 1);
	
	this.setScale(factorX, factorY, false);

	this.setPosition(-offsetX, -offsetY, true);
	*/
	this.setScale(factorX, factorY, false);
};

Hanimation.AniObject.prototype.prepareRotate = function(ctx)
{
	var par = this.getLiveParam();
	var nat = this.getParam();

  	var aux = this.auxParam;
 
    var rotate = par.rotate + aux.rotate;
	if(Math.abs(rotate) > 1.E-3 && !this.isCreating)
	{
        var rX, rY;
        if(nat.rotateCenterX == undefined || nat.rotateCenterY == undefined )
        {
            rX = nat.width/2;
            rY = nat.height/2;
        }
        else
        {
            rX = nat.rotateCenterX;
            rY = nat.rotateCenterY;
        }
        
		var centerX = (rX * aux.scaleX + par.left);
		var centerY = (rY * aux.scaleY + par.top);
		var centerR = Math.sqrt(centerX*centerX+centerY*centerY); 

		var alpha = rotate;
		var beta = Math.atan2(centerY, centerX); 
		
		var newCenterX = centerR * Math.cos(alpha+beta); 
		var newCenterY = centerR * Math.sin(alpha+beta); 
		
		var deltaX = centerX - newCenterX ;
		var deltaY = centerY - newCenterY ; 
        
		ctx.translate(deltaX, deltaY);
		ctx.rotate(rotate); 
	}
};


Hanimation.AniObject.prototype.setRotateBase = function(rotateBaseX, rotateBaseY)
{
    var par = this.dataRef.param;
    
    if(!par.customPivot)
    {
        par.rotateCenterX = rotateBaseX - par.left;
        par.rotateCenterY = rotateBaseY - par.top; 
    }
};

Hanimation.AniObject.prototype.updateBoundRect = function(){
	var par = this.getParam();
	
	par.left = Math.min(par.startX, par.endX);
	par.right = Math.max(par.startX, par.endX);
	par.top = Math.min(par.startY, par.endY);
	par.bottom = Math.max(par.startY, par.endY);	
		
	par.width = par.right - par.left;
	par.height = par.bottom - par.top;	
    
    if(!this.editUpdateRotate && !par.customPivot)
    {
        this.setRotateBase((par.left + par.right)/2, (par.top + par.bottom)/2); 
    }
};

Hanimation.AniObject.prototype.getParam = function(mode){

    var par = this.dataRef.param;
  
    return this.dataRef.param;
};

Hanimation.AniObject.prototype.setLayerFrame = function(layerId, frameId)
{
	this.layerId = layerId;
	this.frameId = frameId;
};

Hanimation.AniObject.prototype.getLayerFrame = function()
{
	return {'layer': this.layerId, 'frame': this.frameId};
};

Hanimation.AniObject.prototype.copyData = function(data)
{
        
    if(data)
    {
        if(this.dataRef == data)
            // Avoid cyclic copy
            return; 
            
        // this.dataRef.param = data.param;
        this.dataRef.param = JSON.clone(data.param);
        
        if(this.dataRef.curve)
        {
            this.dataRef.curve.closed = data.curve.closed;
            
            var len = data.curve.points.length;
            this.dataRef.curve.points = [];
            // this.dataRef.curve.points = data.curve.points.slice(0);
            for(var i=0;i<len;i++)
            {
                if(typeof data.curve.points[i].x != "undefined")
                {
                    var point = createPoint();
                    Point.copy(point, data.curve.points[i]);
                }
                else
                {
                    var point = createTriPoint();
                    TriPoint.copy(point, data.curve.points[i]);        
                }
                
                this.dataRef.curve.points[i] = point;                
            }
        }
    }
};

Hanimation.AniObject.prototype.draw = function(ctx, mode){
	if(typeof mode == 'undefined')
		mode = 1; 

	this.drawMode = mode; 
	
	var par = this.getLiveParam();
	var nat = this.getParam();
	ctx.save(); 

    ctx.globalAlpha = this.locked ? 0.3 : g_alpha * nat.alpha * this.auxParam.alpha;
	ctx.lineWidth = nat.lineWidth; 
    ctx.lineCap = nat.lineCap;
    ctx.lineJoin = nat.lineJoin;
	var clr; 

    this.prepareRotate(ctx);
	
	if(mode == 1) // Draft/preview
	{
        
		clr = new RGBColor(this.previewStrokeColor);
		ctx.strokeStyle = clr.toRGB();
		this.drawRaw(ctx, par, true); 
	}
	else
	{
		// clr = new RGBColor(par.fillColor); 
		// ctx.fillStyle = clr.toRGB();
        
        if(nat.fillInfo)
        {
            // TODO: update to reflect scale factor
            ctx.fillStyle = createFillPattern(ctx, nat.fillInfo); 
            this.drawRaw(ctx, par, false); 
        }

		clr = new RGBColor(par.strokeColor); 
		ctx.strokeStyle = clr.toRGB();
		this.drawRaw(ctx, par, true); 
	}
	
 
    if(mode == 1 && (this.hitPos == Hanimation.HITTEST_FILLSTART || this.hitPos == Hanimation.HITTEST_FILLEND)) // Draft/preview
    {
        this.drawFillControls(ctx, true, true); 
    }
    
    this.postDraw(ctx, mode);     
	ctx.restore(); 
};

Hanimation.AniObject.prototype.drawRaw = function(ctx, par, stroke){
};


Hanimation.AniObject.prototype.postDraw = function(ctx, mode)
{
    var par = this.getParam();
    
    if(mode != 1 || (typeof par.customPivot == "undefined") || par.customPivot == false)
        return; 
        
    var anchorX = this.editPivotX;
	var anchorY = this.editPivotY; 
           
	var clr = new RGBColor(this.previewStrokeColor);
	ctx.strokeStyle = clr.toRGB();
	
	ctx.beginPath();
	ctx.arc(anchorX, anchorY, this.anchorRadius, 0, Math.PI*2, false);
    ctx.stroke();    
};

Hanimation.AniObject.prototype.addEventListener = function (type, listener) {
    if (!this.eventListeners[type])
        this.eventListeners[type] = [];
    this.eventListeners[type].push(listener);
};

Hanimation.AniObject.prototype.removeEventListener = function (type, listener) {
    if (!this.eventListeners[type]) return;
    
    var listeners = this.eventListeners[type];
    var len = listeners.length;
    for (var i = 0; i < len; i++) {
        if (listeners[i] == listener) {
            listeners.splice(i, 1);
            break;
        }
    }
    
    // this.eventListeners[type].deleteFirst(listener);
    if (this.eventListeners[type].length == 0) 
        delete this.eventListeners[type];
};

Hanimation.AniObject.prototype.setButton = function(normal, press, up) {
    if (normal != null) {
        this.buttonEnabled = true;
        if (typeof (normal) == "number") normal = { "from": normal, "to": normal, "noLoop": true };
        this.setSegment("_Btn_normal_", normal);
        if (press != null) {
            if (typeof (press) == "number") press = { "from": press, "to": press, "noLoop": true };
            this.setSegment("_Btn_press_", press);
            this.addEventListener("mousedown", function (e) {
                if (!this.buttonEnabled) return;
                this.playSegment("_Btn_press_");
            });
        }       
        up = up || normal;
        if (typeof (up) == "number") up = { "from": up, "to": up, "noLoop": true };
        this.setSegment("_Btn_up_", up);
        var upEvent = function (e) {
            if (!this.buttonEnabled) return;
            this.playSegment("_Btn_up_");
        };
        this.addEventListener("mouseup", upEvent);
        this.addEventListener("mouseout", upEvent);
     
        this.playSegment("_Btn_normal_");
    }
};

/*********************************************************************
 * (Bezier) Curve 
 *********************************************************************/
 
Hanimation.Point = function(x, y){
	this.x = x;
	this.y = y; 
};
 
Hanimation.TriPoint = function(x0, y0, x1, y1, x2, y2){
	this.loadParams = function(value)	
	{
		var aryPts = value.split(',');
				
		// TODO: Validate data
		this.nodeX = parseInt(aryPts[0]);
		this.nodeY = parseInt(aryPts[1]);
		this.forwardX = parseInt(aryPts[2]);
		this.forwardY = parseInt(aryPts[3]);
		this.backwardX = parseInt(aryPts[4]);
		this.backwardY = parseInt(aryPts[5]);
	};
	
	this.saveParams = function(xmlWriter)
	{
		saveParam(xmlWriter, "tripoint", "array", 
			this.nodeX+','+this.nodeY+','+
			this.forwardX+','+this.forwardY+','+
			this.backwardX+','+this.backwardY); 
	};
};

Hanimation.Curve = function(data, points, closed) {
	Hanimation.AniObject.call(this, data); 
    
    if(data)
        data.type = Hanimation.SHAPE_CURVE;
	
    if(this.dataRef && !isDefined(this.dataRef.aryAnchors))
        this.dataRef.aryAnchors = []; 
     
	this.pending = false; 

	this.displayControl = true; 
	
	this.currentPoint = null; 
    
	this.aryBackupPoints = []; 	
	
	this.aryEditTriPoint = []; 
        
	this.aryBackupAnchors = []; 
	
	this.addPoints(points, closed);
};
inherit(Hanimation.Curve, Hanimation.AniObject); 

Hanimation.Curve.prototype.setDisplayControl = function(displayControl)
{
	this.displayControl = displayControl;
};

Hanimation.Curve.prototype.hitTest = function(x, y, mode) { 
	var parentHit = Hanimation.AniObject.prototype.hitTest.call(this, x, y, mode);
	
	if(mode == 3 && this.useTouch)
		return parentHit;

    var par = this.getParam();
	x = x - par.startX;
	y = y - par.startY; 
	
    if(mode & 8)
    {
        var bWithin = Bezier.isInPath(x, y, this.dataRef.curve.points);
        return bWithin ? Hanimation.HITTEST_WITHIN : Hanimation.HITTEST_NONE;
    }		
        
	var ctrlKey = mode & 2; 
    var nodeMode = mode & 32;
	var updateNodes = nodeMode; // mode & 4; 
		
	var testPos = Hanimation.HITTEST_NONE;

	var len = this.dataRef.curve.points.length; 
	var point;
	for(var i=0;i<len;i++)
	{
		point = this.dataRef.curve.points[i];
		if(x >= point.nodeX - this.anchorRadius && x < point.nodeX + this.anchorRadius && 
		   y >= point.nodeY - this.anchorRadius && y < point.nodeY + this.anchorRadius)
		{
			
			this.activeControl = 3*i; 
			testPos = Hanimation.HITTEST_CONTROL;
			
			if(updateNodes)
			{
				if(ctrlKey == 0)
					this.aryActiveNodes = []; 			
				
				this.aryActiveNodes[i] = (this.aryActiveNodes[i] == 1) ? 0 : 1;
			}
			
			break;
		}
		else if(x >= point.forwardX - this.anchorRadius && x < point.forwardX + this.anchorRadius && 
		   y >= point.forwardY - this.anchorRadius && y < point.forwardY + this.anchorRadius && 
           this.aryActiveNodes[i] == 1) // Only forward node for an active node can be allowed
		{
			this.activeControl = 3*i+1; 
			testPos = Hanimation.HITTEST_CONTROL;
			
			break;
		}
		else if(x >= point.backwardX - this.anchorRadius && x < point.backwardX + this.anchorRadius && 
		   y >= point.backwardY - this.anchorRadius && y < point.backwardY + this.anchorRadius && 
           this.aryActiveNodes[i] == 1) // Only forward node for an active node can be allowed
		{
			this.activeControl = 3*i+2; 
			testPos = Hanimation.HITTEST_CONTROL;
			
			break;
		}
	}	
	
	if(testPos != Hanimation.HITTEST_CONTROL)
	{
		this.activeControl = -1; 
		
		if(ctrlKey == 0 && updateNodes)
			this.aryActiveNodes = []; 					
		
		// The parent (AniObject) implementation uses their own coordinates.
        // var par = this.getParam();
		// var x2 = x + par.startX;
		// var y2 = y + par.startY;
		// testPos = Hanimation.AniObject.prototype.hitTest.call(this, x2, y2, mode);
		testPos = parentHit;
		if(testPos != Hanimation.HITTEST_ROTATE && testPos != Hanimation.HITTEST_FILLSTART && testPos != Hanimation.HITTEST_FILLEND)
		{
			var yes = Bezier.isInPath(x, y, this.dataRef.curve.points);
			testPos = yes ? Hanimation.HITTEST_WITHIN : Hanimation.HITTEST_NONE;		
		}
	}
    else if(parentHit == Hanimation.HITTEST_FILLSTART || parentHit == Hanimation.HITTEST_FILLEND)
        // Higher priority for filling controls. 
        testPos = parentHit;
    else if(this.focusMode == Hanimation.FM_EDIT && !nodeMode)
        testPos = Hanimation.HITTEST_WITHIN;
    
	this.hitPos = testPos; 
	return testPos;	
};

Hanimation.Curve.prototype.addPoints = function(points, closed, newId)	
{
	if(points && this.dataRef)
	{
        this.dataRef.curve.closed = closed; 
        var len = points.length;
		for(var i=0;i<len;i++)
		{
			var pt = points[i];
			var tripoint = createTriPoint(pt.nodeX, pt.nodeY, pt.forwardX, pt.forwardY, pt.backwardX, pt.backwardY);
            if(newId)
                tripoint.id  = getIncrementalId();
            else if(typeof pt.id != "undefined")
                tripoint.id = pt.id;
                
			this.dataRef.curve.points.push(tripoint);
		}
		
		if(closed)
			this.dataRef.curve.closed = true; 
			
		this.updateBoundRect();
	}
};

Hanimation.Curve.prototype.updateBoundRect = function()
{
    if(this.isEditing)
        // Do NOT update points yet until editing is over
        return ;
        
	var par = this.getParam();
    
    var prevLeft = par.left;
    var prevTop = par.top; 
	
    var useDelta = this.isCreating ? false : true;
	var aryPts = [];
	aryPts.push(this.dataRef.curve.points);
	var bound = Bezier.getBoundary(aryPts);

	var deltaX = bound.left; 
	var deltaY = bound.top; 
		
	if(useDelta)
	{
		par.startX = par.startX + deltaX;
		par.startY = par.startY + deltaY;
	}
	else
	{
		par.startX = bound.left;
		par.startY = bound.top;
	}

	par.width = bound.right - bound.left;
	par.height = bound.bottom - bound.top;

	par.left = par.startX;
	par.top = par.startY;
	par.right = par.left + par.width;
	par.bottom = par.top + par.height;
    par.endX = par.right;
    par.endY = par.bottom; 
        
    // this.setRotateBase((par.left + par.right)/2, (par.top + par.bottom)/2);
        
    var len = this.dataRef.curve.points.length; 
	for(var i=0;i<len;i++)
	{
		point = this.dataRef.curve.points[i];	
        TriPoint.offset(point, -deltaX, -deltaY); 
	}	
	
	var len = this.dataRef.aryAnchors.length; 
	for(var i=0;i<len;i++)
	{
		point = this.dataRef.aryAnchors[i];		
		point.x = point.x - deltaX;
		point.y = point.y - deltaY;
	}	
	
	par.rotate = 0;     
    switch(this.hitPos)
    {
        case Hanimation.HITTEST_CONTROL:
            par.fillInfo.fillStartPos.x -= deltaX;
            par.fillInfo.fillStartPos.y -= deltaY;
            par.fillInfo.fillEndPos.x -= deltaX;
            par.fillInfo.fillEndPos.y -= deltaY;

            break;
        case Hanimation.HITTEST_LEFTTOP:
		case Hanimation.HITTEST_RIGHTBOTTOM:
		case Hanimation.HITTEST_RIGHTTOP:
		case Hanimation.HITTEST_LEFTBOTTOM:
		case Hanimation.HITTEST_TOP:
		case Hanimation.HITTEST_BOTTOM:
		case Hanimation.HITTEST_LEFT:
		case Hanimation.HITTEST_RIGHT:
            var scaleX = this.editFillStartX/(this.editRight - this.editLeft); 
            var scaleY = this.editFillStartY/(this.editBottom - this.editTop); 
            par.fillInfo.fillStartPos.x = (par.right - par.left) * scaleX;		
            par.fillInfo.fillStartPos.y = (par.bottom - par.top) * scaleY;		
            
            scaleX = this.editFillEndX/(this.editRight - this.editLeft); 
            scaleY = this.editFillEndY/(this.editBottom - this.editTop); 
            par.fillInfo.fillEndPos.x = (par.right - par.left) * scaleX;
            par.fillInfo.fillEndPos.y = (par.bottom - par.top) * scaleY;
            break;
    } 
};

Hanimation.Curve.prototype.draw = function(ctx, mode) {  
	if(typeof mode == 'undefined')
		mode = 1; 

	ctx.save(); 
	
	var aux = this.auxParam;
	var sX = aux.scaleX;
	var sY = aux.scaleY;
    var par = this.getParam();
    
    // Fix the (regression bug) where curve object is double rotated. 
    if(Math.abs(aux.rotate) > 1.E-3 )
        this.prepareRotate(ctx);
    
	if(!this.isCreating)
	{
		ctx.translate(par.startX * sX, 
					  par.startY * sY); 
	}
	ctx.lineWidth = par.lineWidth; 
    ctx.lineCap = par.lineCap;
    ctx.lineJoin = par.lineJoin;    
    ctx.globalAlpha = this.locked ? 0.3 : g_alpha * par.alpha * this.auxParam.alpha;
    
	var len = this.dataRef.curve.points.length; 
	var point = createTriPoint(); 
	
    var par = this.getParam();
    
	var activeMode = this.activeControl % 3; 
	var controlId = Math.floor(this.activeControl / 3); 		
	
	var option = 0; 
    
	var clr;
	if(mode == 1) // Draft/preview
	{

		clr = new RGBColor(this.previewStrokeColor);
		ctx.strokeStyle = clr.toRGB();
	}
	else
	{

		// var clr = new RGBColor(par.strokeColor); 
		// ctx.strokeStyle = clr.toRGB();
        ctx.strokeStyle = getColor(par.strokeColor); 
		
		// clr = new RGBColor(par.fillColor); 
		// ctx.fillStyle = clr.toRGB();
        ctx.fillStyle = createFillPattern(ctx, par.fillInfo, sX, sY); 
	}

    var drawLen = len;
    var ratio = 0;
    var progressFinished = true;
    if(this.framePercent === undefined || this.framePercent >= this.percentTo)
        drawLen = len; 
    else if(this.framePercent >= 0 && this.percentFrom <= this.framePercent && this.framePercent < this.percentTo)
    {
        var l = len;
        if(!this.dataRef.curve.closed)
            l--;
        var ratio = l * (this.framePercent - this.percentFrom) / (this.percentTo - this.percentFrom);
        drawLen = Math.floor(ratio);
       
        progressFinished = len - ratio < 1E-3;
        
        ratio = (ratio - drawLen);        
        drawLen = Math.min(len, drawLen + 1);        
    }
    else
        drawLen = 0; 
        
	var count = mode == 1 ? 1 : 2; 
    if(!progressFinished)
        count = 1; 
        
	for(var j=0;j<count;j++)
	{
		ctx.beginPath();
		for(var i=0;i<drawLen-1;i++)
		{
			point1 = this.dataRef.curve.points[i];
			point2 = this.dataRef.curve.points[i+1];
			
			if(i == 0)
				ctx.moveTo(point1.nodeX*sX, point1.nodeY*sY); 	
				
			ctx.bezierCurveTo(point1.forwardX*sX, point1.forwardY*sY, point2.backwardX*sX, point2.backwardY*sY, point2.nodeX*sX, point2.nodeY*sY);
			
			// this.updateBound(point1.nodeX, point1.nodeY); 
			// if(i == len - 2)
			// 	this.updateBound(point2.nodeX, point2.nodeY); 
		}
        
        if(this.progressMode > 0 && ratio > 1E-3)
        {
            if(i == 0)
            {
                point1 = this.dataRef.curve.points[0];
				ctx.moveTo(point1.nodeX*sX, point1.nodeY*sY); 	        
            }
            
            var from = -1;
            var to;
            if(drawLen < len)
            {
                from = drawLen - 1; 
                to = drawLen; 
            }
            else if(this.dataRef.curve.closed && drawLen == len)
            {
                from = drawLen - 1; 
                to = 0; 
            }
            
            if(from >= 0)
            {
                var pts = [];
                var pt = createTriPoint();
                TriPoint.copy(pt, this.dataRef.curve.points[from]);
                pts.push(pt);
                
                pt = createTriPoint();
                TriPoint.copy(pt, this.dataRef.curve.points[to]);
                pts.push(pt);
                
                Bezier.subDivision2(pts, 0, ratio);
                
                ctx.bezierCurveTo(pts[0].forwardX*sX, pts[0].forwardY*sY, pts[1].backwardX*sX, pts[1].backwardY*sY, pts[1].nodeX*sX, pts[1].nodeY*sY);
                
                var ptLen = pts.length;
                for(var k=0;k<ptLen;k++)
                    delete pts[k];
                delete pts; 
            }            
        }
		
		if(this.dataRef.curve.closed && len > 1 && drawLen == len && progressFinished)
		{
			point1 = this.dataRef.curve.points[len-1];
			point2 = this.dataRef.curve.points[0];
			
			if(TriPoint.isEqual(point1, point2, 0) == false)
			{
				// ctx.moveTo(point1.nodeX, point1.nodeY); 	
				ctx.bezierCurveTo(point1.forwardX*sX,point1.forwardY*sY, point2.backwardX*sX, point2.backwardY*sY, point2.nodeX*sX, point2.nodeY*sY);
			}
		}
		
		if(count > 1 && j == 0)
			ctx.fill(); 
		else	
			ctx.stroke(); 
	}
    
	if(mode == 1 && this.displayControl &&　!this.useTouch)
	{
        ctx.lineWidth = 1; 
        
		for(var i=0;i<len;i++)
		{
            TriPoint.copy(point, this.dataRef.curve.points[i]);
			TriPoint.scale(point, sX, sY);
			
			if(this.aryActiveNodes.length > 0 && this.isEditing)
			{
				option = 0; 
				if(controlId == i)
					option = 8+4;
				else
				{
					if(controlId > 0 && i == controlId - 1)
						option = option | 8 | 4 | 1; 
					if(controlId >= 0 && controlId < len-1 && i == controlId + 1)
						option = option | 8 | 4 | 2; 
				}
			}
			else
			{
				// First node
				option = (i == 0 ? 1 : 0);	
					
				// Last node
				if(len > 1 && i == len - 1)
					option = option | 2; 
					
				// if in preview mode, only draw the handles for for the last 2 nodes	
				if(len < 2 || i >= len - 2)
					option = option | 4; 
			}
						
			if(this.aryActiveNodes[i] == 1)
				option = option | 16; 
			this.drawTriPoint(ctx, point, option); 
		}
	}    
	
    if(mode == 1 && (this.hitPos == Hanimation.HITTEST_FILLSTART || this.hitPos == Hanimation.HITTEST_FILLEND)) // Draft/preview
    {
        this.drawFillControls(ctx, false, true); 
    }
    
    this.postDraw(ctx, mode);    
	ctx.restore(); 
};

/*********************************************************************
 * Path
 *********************************************************************/

Hanimation.Path = function(data, points, closed) {
	Hanimation.Curve.call(this, data, points, closed); 
    
    if(data)
        data.type = Hanimation.SHAPE_PATH;
};
inherit(Hanimation.Path, Hanimation.Curve); 

/*********************************************************************
 * Bezier Shape 
 *********************************************************************/
Hanimation.BShape = function(data) {
	Hanimation.Curve.call(this, data); 
	if(data)
        data.type = Hanimation.SHAPE_BSHAPE;
	
	this.aryControls = []; 
};
inherit(Hanimation.BShape, Hanimation.Curve); 

function createNewObject(type, dataref)
{
    var data = dataref ? dataref : createAniParam();
	var object = null; 		
	switch(type)
	{
		case Hanimation.SHAPE_LINE:
			object = new Hanimation.BLine(data);
			break;
		case Hanimation.SHAPE_RECTANGLE:
			object = new Hanimation.BRectangle(data);
			break;		
        case Hanimation.SHAPE_POLYGON:
			object = new Hanimation.Polygon(data);
			break;			
		case Hanimation.SHAPE_ROUNDED:
			object = new Hanimation.BRounded(data); 
			break;
		case Hanimation.SHAPE_CURVE:
			object = new Hanimation.Curve(data); 
			break;
		case Hanimation.SHAPE_SPLINE:
			object = new Hanimation.Spline(data); 
			break;
		case Hanimation.SHAPE_PENCIL:
			object = new Hanimation.Pencil(data); 
			break;
		case Hanimation.SHAPE_PICTURE:
			object = new Hanimation.Picture(data); 
			break;			
		case Hanimation.SHAPE_CAMERA:
			object = new Hanimation.Camera(data); 
			break;			
		case Hanimation.SHAPE_PATH:
			object = new Hanimation.Path(data); 
			break;			
		case Hanimation.SHAPE_TEXT:
			object = new Hanimation.Text(data); 
			break;			
		case Hanimation.SHAPE_ELLIPSE:
			object = new Hanimation.BEllipse(data); 
			break;
		case Hanimation.SHAPE_SELECT:
			object = new Hanimation.Select(data); 
			break;
		case Hanimation.SHAPE_GROUP:
			object = new Hanimation.Group(data); 
			break;
		case Hanimation.SHAPE_CLIP:
			object = new Hanimation.Clip(data); 
			break;
        case Hanimation.SHAPE_SPRITE:
			object = new Hanimation.Sprite(data); 
            break;
		case Hanimation.SHAPE_NODE:
		case Hanimation.SHAPE_SCALE:
        default:		
            break;
        
	}   

	if(object)
    {
        if(g_aniObj[data.guid])
            delete g_aniObj[data.guid];
		g_aniObj[data.guid] = object;
    }
		
    return object; 
};


/*********************************************************************
 * Bezier Rectangle 
 *********************************************************************/
Hanimation.BRectangle = function(data) {
	Hanimation.BShape.call(this, data); 
	if(data)
        data.type = Hanimation.SHAPE_RECTANGLE;
};
inherit(Hanimation.BRectangle, Hanimation.BShape); 

/*********************************************************************
 * Bezier Ellipse 
 *********************************************************************/
Hanimation.BEllipse = function(data) {
	Hanimation.BShape.call(this,data); 
	if(data)
        data.type = Hanimation.SHAPE_ELLIPSE;
};
inherit(Hanimation.BEllipse, Hanimation.BShape); 

/*********************************************************************
 * Bezier Line 
 *********************************************************************/
Hanimation.BLine = function(data) {
	Hanimation.BShape.call(this,data); 
	if(data)
        data.type = Hanimation.SHAPE_LINE;
};
inherit(Hanimation.BLine, Hanimation.BShape); 


Hanimation.BLine.prototype.hitTest = function(x, y, mode) { 
	var testPos = Hanimation.Curve.prototype.hitTest.call(this, x, y, mode);
	
	var ptStart = this.dataRef.curve.points[0];
    var ptEnd = this.dataRef.curve.points[1];
	
    var par = this.getParam();
    
    var inRect = ptInRect(x, y, par.left, par.top, par.right, par.bottom);
	x = x - par.startX;
	y = y - par.startY; 
    
    var maxDist = 4; 
	if(testPos != Hanimation.HITTEST_CONTROL)
	{
        var deltaX = ptEnd.nodeX - ptStart.nodeX;
        var deltaY = ptEnd.nodeY - ptStart.nodeY;
        var dist = Math.abs(deltaX*(ptStart.nodeY - y) - (ptStart.nodeX - x)*deltaY) / 
            Math.sqrt(deltaX*deltaX + deltaY*deltaY);

        if(dist < maxDist && inRect)
            testPos = Hanimation.HITTEST_WITHIN;
	}
        
	this.hitPos = testPos; 
	return testPos;	
};

/*********************************************************************
 * Bezier Rounded Rectangle 
 *********************************************************************/
Hanimation.BRounded = function(data) {
	Hanimation.BShape.call(this, data); 
	if(data)
        data.type = Hanimation.SHAPE_ROUNDED;

    if(!isDefined(data.cornerRadius))
        data.cornerRadius = new Array(16,16,16,16);
    
	this.setDisplayControl(false); 
};
inherit(Hanimation.BRounded, Hanimation.BShape); 


Hanimation.BRounded.prototype.hitTest = function(x, y, mode) { 
	var hit = Hanimation.Curve.prototype.hitTest.call(this, x, y, mode);
	
    if(mode & 8)
        return hit; 
        
	// TODO: When radius = 0, the control point can't be edited. 	
	if(hit == Hanimation.HITTEST_CONTROL)
	{
		var controlId = Math.floor(this.activeControl/3);
		if(!(controlId == 1 || controlId == 2 || controlId == 5 || controlId == 6))
		{
			hit = Hanimation.HITTEST_NONE;
			this.activeControl = 0; 
		}
	}
    
    this.hitPos = hit;
	
	return hit; 
};

Hanimation.BRounded.prototype.copyData = function(data)
{
    if(!data)
        return; 
        
    if(this.dataRef == data)
            // Avoid cyclic copy
        return; 
            
    Hanimation.BShape.prototype.copyData.call(this, data); 
    
    if(data.cornerRadius)
        this.dataRef.cornerRadius = data.cornerRadius.slice(0);
    
    if(data.curve && data.curve.points.length == 8)
    {
        this.clearControlPoints(); 
        this.addControlPoint(this.dataRef.curve.points[1].nodeX, this.dataRef.curve.points[1].nodeY); 	
        this.addControlPoint(this.dataRef.curve.points[2].nodeX, this.dataRef.curve.points[2].nodeY); 	
        
        this.addControlPoint(this.dataRef.curve.points[5].nodeX, this.dataRef.curve.points[5].nodeY); 	
        this.addControlPoint(this.dataRef.curve.points[6].nodeX, this.dataRef.curve.points[6].nodeY); 	
    }
    
    if(data.aryAnchors)
    {
    	this.clearAnchorPoints();
        this.dataRef.aryAnchors = data.aryAnchors.slice(0);
    }
};

Hanimation.BRounded.prototype.setScale = function(scaleX,scaleY, overwrite)	
{
    Hanimation.AniObject.prototype.setScale.call(this, scaleX,scaleY, overwrite); 
    if(overwrite)
    {
        var data = this.dataRef;
        data.cornerRadius[0] = data.cornerRadius[0] * scaleY;
        data.cornerRadius[1] = data.cornerRadius[1] * scaleY;
        data.cornerRadius[2] = data.cornerRadius[2] * scaleY;
        data.cornerRadius[3] = data.cornerRadius[3] * scaleY;
    }

    return true;
};

/*********************************************************************
 * Polygon
 *********************************************************************/
Hanimation.Polygon = function(data) {
	Hanimation.BShape.call(this, data);
	if(data)
        data.type = Hanimation.SHAPE_POLYGON;
    
    var param = this.dataRef.param;
    
    if(!isDefined (param.innerX))
    {
        param.innerX = 0;
        param.innerY = 0;
        param.outerX = 0; 
        param.outerY = 0; 
        param.centerX = 0;
        param.centerY = 0; 
        param.edges = 5;
        param.section = 5; 
		param.innerPercent = 1.;
    }

	this.previousEdges=param.edges;
	this.previousSection=param.section;
	
	this.leftBound=0;
	this.rightBound=0;
	this.topBound=0;
	this.bottomBound=0;
	
	this.previousInnerPercent=1;
    
    this.prevCenterX = 0;
    this.prevCenterY = 0;
    this.prevOuterX = 0;
    this.prevOuterY = 0;
    this.prevInnerX = 0; 
    this.prevInnerY = 0;    
};
inherit(Hanimation.Polygon, Hanimation.BShape); 

Hanimation.Polygon.prototype.hitTest = function(x, y, mode) { 

	var parentHit = Hanimation.AniObject.prototype.hitTest.call(this, x, y, mode);
    if(parentHit == Hanimation.HITTEST_FILLSTART || parentHit == Hanimation.HITTEST_FILLEND)
    {
        // Higher priority for filling controls. 
        this.hitPos = parentHit;
        return parentHit; 
    }
        
	var testPos=Hanimation.HITTEST_NONE;

  	var par = this.getParam();	
	
	if(x >= par.outerX-this.anchorRadius && x < par.outerX+this.anchorRadius &&
	   y >= par.outerY-this.anchorRadius && y < par.outerY+this.anchorRadius)
		{
			this.activeControl = 1; // adjust end point
			testPos = Hanimation.HITTEST_CONTROL;
		}
	else if (x >= this.leftBound/2+this.rightBound/2-this.anchorRadius && 
	          x <  this.leftBound/2+this.rightBound/2+this.anchorRadius &&
			  y >= this.topBound-this.anchorRadius && y < this.topBound+this.anchorRadius)
		{
			this.activeControl = 2; // adjust # edges
			testPos = Hanimation.HITTEST_CONTROL;
		}
	else if (x >= this.leftBound/2+this.rightBound/2-this.anchorRadius &&
              x <  this.leftBound/2+this.rightBound/2+this.anchorRadius &&
			  y >= this.bottomBound-this.anchorRadius && y < this.bottomBound+this.anchorRadius)
		{
			this.activeControl = 3; // adjust # arcs
			testPos = Hanimation.HITTEST_CONTROL;
		}
	else if (x >= par.innerX-this.anchorRadius && x < par.innerX+this.anchorRadius &&
			  y >= par.innerY-this.anchorRadius && y < par.innerY+this.anchorRadius)
		{
			this.activeControl = 4; // adjust inner radius
			testPos = Hanimation.HITTEST_CONTROL;
		}
			
	if(testPos != Hanimation.HITTEST_CONTROL)
    {
		testPos = Hanimation.Curve.prototype.hitTest.call(this, x, y, mode);
    }
    
    this.hitPos = testPos;
	return testPos;
	
};

Hanimation.Polygon.prototype.copyData = function(data)	
{
    if(!data)
        return; 
    
    if(this.dataRef == data)
        // Avoid cyclic copy
        return; 
            
    Hanimation.AniObject.prototype.copyData.call(this, data); 
    
	this.dataRef.param.symblId = data.param.symbolId;
    this.dataRef.param.offsetX = data.param.offsetX;
    this.dataRef.param.offsetY = data.param.offsetY; 
};

Hanimation.Polygon.prototype.setScale = function(scaleX,scaleY, overwrite)	
{
    Hanimation.AniObject.prototype.setScale.call(this, scaleX,scaleY, overwrite); 
    if(overwrite)
    {
        var param = this.getParam(); 
        param.innerX = param.innerX * scaleX;
        param.innerY = param.innerY * scaleY;
        param.outerX = param.outerX * scaleX; 
        param.outerY = param.outerY * scaleY; 
        param.centerX = param.centerX * scaleX;
        param.centerY = param.centerY * scaleY; 
    }

    return true;
};

/*********************************************************************
 * Pencil 
 *********************************************************************/
Hanimation.Pencil = function(data, points) {
	Hanimation.AniObject.call(this, data); 
    
    if(data)
        data.type = Hanimation.SHAPE_PENCIL;
        
    this.lastPoint = null; 
    this.dataRef.curve.closed = false; 
    this.dataRef.aryAnchors = []; 
    
    this.displayControl = false; 

    if(!isDefined(this.dataRef.param.smooth))
        this.dataRef.param.smooth = 3;      
};
inherit(Hanimation.Pencil, Hanimation.BShape); 


/*********************************************************************
 * Rectangle 
 *********************************************************************/
Hanimation.Rectangle = function(data) {
	Hanimation.AniObject.call(this, data); 
	if(data)
        data.type = Hanimation.SHAPE_RECTANGLE;
	
};
inherit(Hanimation.Rectangle, Hanimation.AniObject); 

Hanimation.Rectangle.prototype.drawRaw = function(ctx, par, stroke) {
	if(stroke)
		ctx.strokeRect(par.left, par.top, par.width, par.height); 
	else
		ctx.fillRect(par.left, par.top, par.width, par.height); 
};



/*********************************************************************
 * Camera 
 *********************************************************************/
Hanimation.Camera = function(data) {
	Hanimation.Rectangle.call(this, data); 
	if(data)
        data.type = Hanimation.SHAPE_CAMERA;
	this.imgCam = null;
    this.iconW = 32;
    this.iconH = 24;
    
    this.forceAspectRatio = true; 
    // this.canRotate = false; 
    
    var par = this.getParam();
    var fillInfo = createFillInfo();
    fillInfo.fillColors = [createColorStop(0, 128, 128, 128, 0.3)];
    par.fillInfo=fillInfo;
    par.strokeColor = "#600000";
    par.lineWidth = 1; 
        
};
inherit(Hanimation.Camera, Hanimation.Rectangle); 

/*********************************************************************
 * Picture 
 *********************************************************************/
Hanimation.Picture = function(data) {
	Hanimation.Rectangle.call(this, data); 
	if(data)
    {
        data.type = Hanimation.SHAPE_PICTURE;
        data.param.fillInfo = null; 
        // data.param.imageSrc = "res/macaw.png";
    }
    
    if(this.dataRef && this.dataRef.param && !isDefined(this.dataRef.param.imageSrc))
        this.dataRef.param.imageSrc = "";
    
	this.objImage = null; 
    
    this.prevWidth = 0;
    this.prevHeight = 0; 
    
};

inherit(Hanimation.Picture, Hanimation.Rectangle); 

Hanimation.Picture.prototype.drawRaw = function(ctx, par, stroke) {  
    ctx.save(); 
	if(this.drawMode == 1)
    {
		ctx.globalAlpha = 0.4;
        
		Hanimation.Rectangle.prototype.drawRaw.call(this, ctx, par, stroke); 
    }

    try{
        var left = Math.round(par.left);
        var top = Math.round(par.top);    
        
        var ext = /[^.]+$/.exec(this.dataRef.param.imageSrc)[0];
        var isSVG = (ext && ext.toLowerCase() == "svg");
        
        var guid = this.dataRef.guid;
        
        var forceRedraw = false; 
    
        if(this.drawMode == 0)
        {
            this.prevWidth = par.width;
            this.prevHeight = par.height;    
        } 
        
        ctx.translate(left, top);
        
        var adjustLeft = 0;
        var adjustTop = 0;
        var adjustWidth = par.width;
        var adjustHeight = par.height;
        if(par.keepAspect)
        {
            var srcAspect = par.rawWidth / par.rawHeight;
            var dstAspect = par.width / par.height;
            if(srcAspect > dstAspect)
            {
                adjustWidth = par.width;
                adjustHeight = Math.floor(adjustWidth / srcAspect);
                adjustTop = Math.floor((par.height - adjustHeight) / 2);
            }
            else if(srcAspect < dstAspect)
            {
                adjustHeight = par.height;
                adjustWidth = Math.floor(adjustHeight * srcAspect);
                adjustLeft = Math.floor((par.width - adjustWidth)/2);
            }
        }
                
        this.processFlip(ctx, par.width, par.height); 
        
		var imgSrc = this.dataRef.param.imageSrc;
        var img = null; 
		if(!forceRedraw)
		{
            img = ImageCache.getImage(imgSrc);
			if(!img)
                img = ImageCache.getImage(guid);
		}
		
        if(!img)
        {
            if(isSVG)
            {
                /*
                renderSVG(this.dataRef.param.imageSrc, function(objects, options) {
                    var shape = toShape(objects, options);                  
                    var cvsBuf = document.getElementById('canvasBuffer');
                    cvsBuf.width = shape.width || 600;
                    cvsBuf.height = shape.height || 600;
                    
                    cvs = window['_canvas_fabric'] = new fabric.Canvas('canvasBuffer', { selection: false });
                    
                    cvs.add(shape).centerObjectH(shape).centerObjectV(shape).renderAll(true); 
                    shape.setCoords();
                    cvs.calcOffset();
                     
                    ctx.drawImage(cvsBuf, 0, 0, par.width, par.height);
                    this.objImage = new Image();
                    var tmpImage = this.objImage;
                    tmpImage.src = cvsBuf.toDataURL("image/png");
                    tmpImage.onload = function(){
                        // Don't know why, but this is a workaround of the library. 
                        // It seems the callback will be called twice?
                        if(!ImageCache.getImage(guid))
                            ImageCache.updateImage(guid, tmpImage);                  
                    };
                    
                    delete cvs; 
                });
                */
            }        

            else // if(!this.objImage)
            {
                this.objImage = new Image();
                var tmpImage = this.objImage;
                
                tmpImage.src = this.dataRef.param.imageSrc; 
                tmpImage.objParam = this.dataRef.param;
                // if this.dataRef.type == 2023 then skip onload
                var _this = this;
                tmpImage.onload = function () {
                    if (_this.dataRef.type != 2023) {
                        this.objParam.rawWidth = this.width;
                        this.objParam.rawHeight = this.height;
                    }
                    
                    // Async use of ctx comes with unpredictable context. 
                    // Instead of call directly. Popup for (possibe) redraw.
                    // ctx.drawImage(tmpImage, left+Hanimation.PADDING, top+Hanimation.PADDING, par.width, par.height); 
                    ImageCache.updateImage(imgSrc, this);  
                    
                    if(Hanimation.ImageCacheCallback)
                        Hanimation.ImageCacheCallback({
                            image: this, 
                            id: guid,
                            source: this.src
                        });
                };
                tmpImage.onerror = function(){  
                    this.imageSrc = (this.imageSrc == "res/noimage.png") ? Mugeda.emptyImg : "res/noimage.png" ;
                };
            }
            // else
            //     ctx.drawImage(this.objImage, adjustLeft, adjustTop, adjustWidth, adjustHeight); 	
            
            if(!isSVG)
			{
                ImageCache.updateImage(guid, this.objImage);
				// if(imgSrc && imgSrc.length)
				// 	ImageCache.updateImage(imgSrc, this.objImage);
			}
        }
        else
		{
            var frameNum = this.dataRef.param.frameNum,
                fps = this.dataRef.param.fps,
                sguid = 'sprite-' + guid;

            if (frameNum && fps) {
                var frameImage = ImageCache.getImage(sguid);

                if (frameImage) {
                    ctx.drawImage(frameImage, adjustLeft, adjustTop, adjustWidth, adjustHeight); 	
                } else {
                    this.setFirstFrameImageUrl(function (firstFrameImageUrl) {
                        var firstFrameImage = new Image();

                        firstFrameImage.src = firstFrameImageUrl;
                        firstFrameImage.onload = function () {
                            ctx.drawImage(firstFrameImage, par.left + Hanimation.PADDING, par.top + Hanimation.PADDING, adjustWidth, adjustHeight); 	
                            ImageCache.updateImage(sguid, firstFrameImage);
                        }
                    });
                }
            } else {
                ctx.drawImage(img, adjustLeft, adjustTop, adjustWidth, adjustHeight); 	
			    if(typeof par.rawWidth == "undefined" || typeof par.rawHeight == "undefined")
			    {
			    	par.rawWidth = img.width;
			    	par.rawHeight = img.height;
			    }
            }
		}
            
    }catch(e)
    {
        var info = e.toString(); 
    }
    
    ctx.restore(); 
    
};

/*********************************************************************
 * Sprite 
 *********************************************************************/
Hanimation.Sprite = function(data) {
	Hanimation.Picture.call(this, data); 
    
    if (data)
        data.type = Hanimation.SHAPE_SPRITE;
}
inherit(Hanimation.Sprite, Hanimation.Picture); 

Hanimation.Sprite.prototype.setFirstFrameImageUrl = function (callback) {
    var par = this.getParam(),
        bufferCanvas = document.createElement('canvas'),
        bufferCtx = bufferCanvas.getContext('2d'),
        frameCount = this.dataRef.param.frameNum,
        image = new Image();

    image.src = par.imageSrc;
    image.onload = function () {
        bufferCanvas.width = image.width;
        bufferCanvas.height = image.height / frameCount;
        bufferCtx.drawImage(image, 0, 0, bufferCanvas.width, bufferCanvas.height, 0, 0, bufferCanvas.width, bufferCanvas.height);

        if (callback)
            callback(bufferCanvas.toDataURL());
    }
}

/*********************************************************************
 * Text
 *********************************************************************/
Hanimation.Text = function(data) {
	Hanimation.AniObject.call(this, data);
	if(data)
        data.type = Hanimation.SHAPE_TEXT;

    var param = this.dataRef.param;
    
    if(!isDefined(param.fontSize))
    {
        param.fontSize = "30";
        param.fontStyle = ""; 
        param.fontWeight = "";
        param.fontFamily = "Arial";
        param.textAlign = "left";
        param.textVAlign = "middle";
        param.textContent = "Text";
        param.textDecoration = "";
		param.strokeColor = "rgba(255,255,255,0)";
		param.fillInfo.fillColors[0].r = 0;
		param.fillInfo.fillColors[0].g = 0;
		param.fillInfo.fillColors[0].b = 0;
    }
    
    this.textWidth = 0;
    this.textHeight = 0;
};

inherit(Hanimation.Text, Hanimation.AniObject);


Hanimation.Text.prototype.draw = function(ctx, mode) {
    // context: 绘制上下文
    // text： 文本
    // x，y：绘制起始位置
    // width，height 范围，若width == null，单行；若height == null，高度自适应
    // options:
    //    {
    //        "align": "left, center, right",
    //        "valign": "top, middle, bottom", 
    //        "wrap": "true, false",
    //        "overflow": "display, hide"
    //        "lineHeight": 14
    //    }
    function drawText(context, text, x, y, width, height, options) {
        if(isNaN(width) || isNaN(height))
            return; 
            
        var draw = x != null && y != null && (width != null || height != null),
            align = options && options.align || "left",
            valign = options && options.valign || "top",
            wrap = options && options.wrap || true,
            overflow = options && options.overflow || "display",
            displayOverFlow = (overflow == "display"),
            lineHeight = options && options.lineHeight || context.measureText("口").width + 4,
            sections = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n").split("\n"),
            maxWidth = 0,
            currentLine = 0,
            sx = x,
            sy = y,
            buffer = null,
            singleMode = (width == null),
            directWrite = (overflow == "display"),
            preMode = (valign != "top");

        draw = !preMode || (options && options.totalHeight);

        if (preMode && draw) {
            if (options.totalHeight > height) {
                sy = y;
            }
            else {
                directWrite = true;
                if (valign == "middle") {
                    sy = y + (height - options.totalHeight) / 2;
                }
                else if (valign == "bottom") {
                    sy = y + (height - options.totalHeight);
                }
            }
        }

        if (height == null) {
            height = Hanimation.MAX_VALUE;
            directWrite = true;
        }

        if (!directWrite && draw) {
            buffer = document.getElementById("canvas_text_buffer");
            if (!buffer) {
                buffer = document.createElement("canvas");
                buffer.id = "canvas_text_buffer";
                buffer.style.display = "none";
                context.canvas.parentNode.appendChild(buffer);
            }
            buffer.width = context.canvas.width;
            buffer.height = context.canvas.height;
            var bctx = buffer.getContext('2d');
            bctx.fillStyle = context.fillStyle;
            bctx.strokeStyle = context.strokeStyle;
            bctx.shadowBlur = context.shadowBlur;
            bctx.shadowOffsetX = context.shadowOffsetX;
            bctx.shadowOffsetY = context.shadowOffsetY;
            bctx.shadowColor = context.shadowColor;  
            bctx.font = context.font;
        }

        var ctx = (!bctx || directWrite || !draw) ? context : bctx;
        ctx.textBaseline = "alphabetic";
        ctx.textAlign = align;

        if (align == "center") {
            sx += width / 2;
        }
        else if (align == "right") {
            sx += width;
        }
        else if (align != "left") {
            ctx.textAlign = left;
        }

        if (singleMode) {
            width = Hanimation.MAX_VALUE;
        }

        sy += (lineHeight / 7 * 6);

        var printNextLine = function (str) {
            if (draw && (displayOverFlow || lineHeight * currentLine < height)) {
                if(options.mode == "stroke")
                    ctx.strokeText(str, sx, sy + (lineHeight * currentLine));
                else
                    ctx.fillText(str, sx, sy + (lineHeight * currentLine));
            }

            currentLine++;
            wordWidth = ctx.measureText(str.replace(/\s*$/, '')).width;
            if (wordWidth > maxWidth) {
                maxWidth = wordWidth;
            }
        }

        var splitLine = function (str) {
            var ele = "",
                words = [];
            while (str.length) {
                var regre = ""
                regre = str.match(/^[$\(\[\{￡￥·‘“〈《「『【〔〖〝﹙﹛﹝＄（．［｛￡￥]*\d+(?:\.\d+)*[!%\),\.:;>\?\]\}￠¨°·ˇˉ―‖’”…‰′″?℃∶、。〃〉》」』】〕〗〞︶︺︾﹀﹄﹚﹜﹞！＂％＇），．：；？］｀｜｝～￠]*/);
                if (regre) {
                    words.push(regre[0]);
                    str = str.substring(regre[0].length);
                    continue;
                }
                regre = str.match(/^[$\(\[\{￡￥·‘“〈《「『【〔〖〝﹙﹛﹝＄（．［｛￡￥]*[a-zA-z]+[!%\),\.:;>\?\]\}￠¨°·ˇˉ―‖’”…‰′″?℃∶、。〃〉》」』】〕〗〞︶︺︾﹀﹄﹚﹜﹞！＂％＇），．：；？］｀｜｝～￠]*/);
                if (regre) {
                    words.push(regre[0]);
                    str = str.substring(regre[0].length);
                    continue;
                }
                regre = str.match(/^[$\(\[\{￡￥·‘“〈《「『【〔〖〝﹙﹛﹝＄（．［｛￡￥]*[\u4e00-\u9fa5][!%\),\.:;>\?\]\}￠¨°·ˇˉ―‖’”…‰′″?℃∶、。〃〉》」』】〕〗〞︶︺︾﹀﹄﹚﹜﹞！＂％＇），．：；？］｀｜｝～￠]*/);
                if (regre) {
                    words.push(regre[0]);
                    str = str.substring(regre[0].length);
                    continue;
                }
                regre = str.match(/^[$\(\[\{￡￥·‘“〈《「『【〔〖〝﹙﹛﹝＄（．［｛￡￥]+[!%\),\.:;>\?\]\}￠¨°·ˇˉ―‖’”…‰′″?℃∶、。〃〉》」』】〕〗〞︶︺︾﹀﹄﹚﹜﹞！＂％＇），．：；？］｀｜｝～￠]+/);
                if (regre) {
                    words.push(regre[0]);
                    str = str.substring(regre[0].length);
                    continue;
                }
                regre = str.match(/^\s+/);
                if (regre) {
                    words.push(regre[0]);
                    str = str.substring(regre[0].length);
                    continue;
                }
                words.push(str.charAt(0));
                str = str.substring(1);
            }
            return words;
        }

        for (var i = 0; i < sections.length; i++) {
            var words = splitLine(sections[i]),
                index = 1;

            if(!directWrite) ctx.drawImage(context.canvas, 0, 0);

            while (words.length && index <= words.length) {
                var str = words.slice(0, index).join(''),
                    wordWidth = ctx.measureText(str.replace(/\s*$/, '')).width;

                if (wordWidth > width) {
                    if (index == 1) {
                        str = words.slice(0, 1).join('');
                        words = words.splice(1);
                    }
                    else {
                        str = words.slice(0, index - 1).join('');
                        words = words.splice(index - 1);
                    }
                    printNextLine(str.replace(/\s*$/, ''));
                    index = 1;
                }
                else {
                    index++;
                }
            }

            if (index > 0) {
                printNextLine(words.join(''));
            }
        }

        if (!directWrite) {
            var swidth = width, sheight = height,
            allHeight = currentLine * lineHeight;
            if (singleMode) {
                x = 0;
                swidth = ctx.canvas.width;
            }
            //var imageData = ctx.getImageData(x, y, swidth, sheight);
            //content.putImageData(imageData, x, y);
            var imageData = ctx.getImageData(0, y, ctx.canvas.width, sheight);
            content.putImageData(imageData, 0, y);
        }
        
        if (preMode && !draw) {
            options = options || {};
            options.totalHeight = lineHeight * currentLine;
            drawText(context, text, x, y, width, height, options);
            }
            if (width > Hanimation.MAX_VALUE) {
                if (align == "right") x -= maxWidth;
                else if (align == "center") x -= (maxWidth / 2);
                width = maxWidth;
            }
            if (height > Hanimation.MAX_VALUE) {
                //y -= currentLine * lineHeight;
                height = currentLine * lineHeight;
            }
            return {
                x: x,
                y: y,
                w: width,
                h: height
            };
    }
        
	if(typeof mode == 'undefined')
		mode = 1;

    var par = this.getParam();
    
    if(!par.width || par.width == 0)
    {
        par.width = 142;
        par.height = parseInt(par.fontSize) + 8;
    }
    
	ctx.save();

     ctx.globalAlpha = this.locked ? 0.3 : g_alpha * par.alpha * this.auxParam.alpha;
    this.prepareRotate(ctx);
    
  	var aux = this.auxParam;
	var sX = aux.scaleX;
	var sY = aux.scaleY;
	if(!this.isCreating)
	{
		ctx.translate(par.startX * sX,
					  par.startY * sY);
	}
	ctx.lineWidth = par.lineWidth;
    ctx.lineCap = par.lineCap;
    ctx.lineJoin = par.lineJoin;

	var activeMode = 0;

	var clr;
	if(mode == 1) // Draft/preview
	{

		clr = new RGBColor(this.previewStrokeColor);
		ctx.strokeStyle = clr.toRGB();
        
        ctx.strokeRect(0, 0, par.width * sX, par.height * sY); 
	}
    else
	{

		// var clr = new RGBColor(par.strokeColor);
		// ctx.strokeStyle = clr.toRGB();
        ctx.strokeStyle = getColor(par.strokeColor);
		
		// clr = new RGBColor(par.fillColor);
		// ctx.fillStyle = clr.toRGB();
        ctx.fillStyle = createFillPattern(ctx, par.fillInfo, sX, sY);
	}

    var fontSize = ((this.dataRef.param.fontSize * Math.max(sX, sY)));
	ctx.alphabetic = "top";
	ctx.font = fontSize + "px " + this.dataRef.param.fontFamily;
    if(this.dataRef.param.fontWeight == "bold")
        ctx.font = "bold " + ctx.font;
    if(this.dataRef.param.fontStyle == "italic")
        ctx.font = "italic " + ctx.font;

    var text = unescape(par.textContent);

	if(this.progressMode == 3){
		if(this.framePercent < this.percentFrom)
			text = "";
		else if(this.framePercent >= 0 && this.percentFrom <= this.framePercent && this.framePercent < this.percentTo)
		{
			var l = text.length;
			var ratio = (this.framePercent - this.percentFrom) / (this.percentTo - this.percentFrom);
			var subLen = Math.ceil(l * ratio);
			text = text.substr(0, subLen); 
		}
	}
	
    // var dim = ctx.measureText(text);
    this.textWidth = par.width * sX; // dim.width;
    this.textHeight = par.height * sY; // parseInt(this.dataRef.param.fontSize);

    this.processFlip(ctx, this.textWidth, this.textHeight); 

    // ctx.strokeText(text, 0, 0);
    drawText(ctx, text, 0, 0, par.width * sX, par.height * sY, {align:par.textAlign, valign:par.textVAlign, mode:"fill", overflow:"display"});
    if(mode == 0)
        // ctx.fillText(text, 0, 0);
        drawText(ctx, text, 0, 0, par.width * sX, par.height * sY, {align:par.textAlign, valign:par.textVAlign, mode:"stroke", overflow:"display"});

    par.endX = par.startX + par.width;
    par.endY = par.startY + par.height; 
        
    this.updateBoundRect();      
    
    if(mode == 1 && (this.hitPos == Hanimation.HITTEST_FILLSTART || this.hitPos == Hanimation.HITTEST_FILLEND)) // Draft/preview
    {
        this.drawFillControls(ctx, false, true);
    }

    this.postDraw(ctx, mode); 
    
	ctx.restore();
};

Hanimation.Text.prototype.setScale = function(scaleX,scaleY, overwrite)	
{
    Hanimation.AniObject.prototype.setScale.call(this, scaleX,scaleY, overwrite); 

    if(overwrite)
    {
        var par = this.getParam(); 
        par.fontSize = par.fontSize * Math.max(scaleX, scaleY);
    }
        
    if(overwrite)
        this.model = null; 

    return true;
};


/*********************************************************************
 * Group
 *********************************************************************/
Hanimation.Group = function(data, aryObjects){
	Hanimation.AniObject.call(this, data);
    
	if(data)
		data.type = Hanimation.SHAPE_GROUP;
	
    if(isDefined(this.dataRef) && this.dataRef && this.dataRef.param && 
       (!isDefined(this.dataRef.param.rawWidth) || !isDefined(this.dataRef.items)) )
    {
        this.dataRef.param.rawWidth=0;
        this.dataRef.param.rawHeight=0;
        this.dataRef.items = [];
    }
    
	this.editFillColor = "#0000ff";
};
inherit(Hanimation.Group, Hanimation.AniObject);


Hanimation.Group.prototype.addObject = function(object)
{
    var len = this.dataRef.items.length;
    var bAdd = true;
    for(var i=0;i<len;i++)
    {
        var data = this.dataRef.items[i];
        if(data.guid == object.dataRef.guid)
        {
            bAdd = false;
            break;
        }
    }
    if(bAdd)
        this.dataRef.items.push(object.dataRef);
};

Hanimation.Group.prototype.getNormPt = function(x, y) { 
    var par = this.getParam();	
    var bound = this.getLiveParam();
    
    var width = bound.right - bound.left;
    var height = bound.bottom - bound.top;	
    var scaleX = (width / par.rawWidth);
    var scaleY = (height / par.rawHeight);
    
	
	// this.auxParam.scaleX comes from parent group/clip, and 
	// scaleX belongs to child AniObject.
    gx = (x * this.auxParam.scaleX - bound.left);
    gy = (y * this.auxParam.scaleY - bound.top)
        
    if(Math.abs(par.rotate) > 1E-3)
    {
        var center = this.getRotationCenter(true);
		center.x *= this.auxParam.scaleX;
		center.y *= this.auxParam.scaleY;
        var rt = rotatePoint(center.x, center.y, gx, gy, -par.rotate);
        gx = rt.x;
        gy = rt.y;
    }
    
    gx = gx / scaleX;
    gy = gy / scaleY; 
    
    if(par.hF)
        gx = par.rawWidth - gx;
             
    if(par.vF)
        gy = par.rawHeight - gy;
		
	return {x: gx, y:gy};
};

Hanimation.Group.prototype.hitTest = function(x, y, mode) { 
	var liveMode = (mode & 16) && (mode & 8);
	
    var parentHit = liveMode ? Hanimation.HITTEST_NONE : Hanimation.AniObject.prototype.hitTest.call(this, x, y, mode);
    
    if(liveMode) //  (parentHit == Hanimation.HITTEST_WITHIN) && 
    {
		var pt = this.getNormPt(x, y);

        // Search nested hit objects
        var len = this.dataRef.items.length;
        var hit;
			
        this.nestedHitObject = null;
        
        for(var i=len-1;i>=0;i--)
        {
            var data = this.dataRef.items[i];
            var obj = getAniObject(data);
            hit =  obj ? obj.hitTest(pt.x, pt.y, mode) : Hanimation.HITTEST_NONE;
            if(hit != Hanimation.HITTEST_NONE)
            {
                this.nestedHitObject = obj;
                break;
            }
        }
		parentHit = this.nestedHitObject ? Hanimation.HITTEST_WITHIN : Hanimation.HITTEST_NONE;
    }
        
    return parentHit;
}

Hanimation.Group.prototype.draw = function(ctx, mode, cache){
	// var len = this.aryObjects.length;
	var len = this.dataRef.items.length;

	var object;
	var bound;

    var par = this.getParam();
    var bound = this.getLiveParam();
	
	ctx.save();

    // g_alpha is reflected by each individual object
    ctx.globalAlpha = this.locked ? 0.3 : g_alpha * par.alpha * this.auxParam.alpha;
    this.prepareRotate(ctx);
    
    var width = bound.endX - bound.startX;
	var height = bound.endY - bound.startY;	
	var scaleX = (width / par.rawWidth);
	var scaleY = (height / par.rawHeight);
	
	ctx.translate(bound.startX, bound.startY);
	
    this.processFlip(ctx, width, height); 
    
	if(cache){
		var img=cache.img;
		var offset=cache.offset;
		ctx.drawImage(img, 0, 0, img.width, img.height, -offset, -offset, width+offset*2, height+offset*2);
	}else{
		for(var i=0;i<len;i++)
		{
			// object = this.aryObjects[i];
		  var obj=this.dataRef.items[i];
		  
		  // why?
		  // obj.param.alpha=this.dataRef.param.alpha;
		  object = getAniObject(obj);
		  object.setScale(scaleX, scaleY);
		  object.setAlpha(ctx.globalAlpha, false);
		  
		  object.draw(ctx, mode);
		}

		this.postDraw(ctx, mode); 
	}
    
    ctx.restore();
};


/*********************************************************************
 * Clip 
 *********************************************************************/
 
Hanimation.Clip = function(data) {
	Hanimation.Group.call(this, data); 
	if(data)
		data.type = Hanimation.SHAPE_CLIP;
    else
	{
		this.dataRef.param.symbolId = "";
		
		this.dataRef.param.offsetX = 0;
		this.dataRef.param.offsetY = 0;     
    }
	
    this.counter = 0;
    
    this.realtime = true;
    this.bound = null;
	this.frameLen = 0;
    this.activeSeg = null; 
    
    this.dataRef.param.segments = [];

    //[msm]记录frameEvent
    this.dataRef.param.frameListeners = {};
};
inherit(Hanimation.Clip, Hanimation.Group); 

Hanimation.Clip.prototype.setSegment = function(name, options)
{
    if(name && name.length > 0 && options)
    {
        var seg = {
            "name": name, 
            "options": JSON.clone(options)
            };
        this.dataRef.param.segments[name] = seg; 
    }
};

Hanimation.Clip.prototype.playSegment = function(name)
{
    if(name && name.length > 0)
    {
        this.activeSeg = this.dataRef.param.segments[name]; 
        if(this.activeSeg && this.activeSeg.options)
        {
            this.counter = this.activeSeg.options.from;
        }
    }
    else 
        this.activeSeg = null;    
};

Hanimation.Clip.prototype.setSymbol = function(symbolId) {  
   this.dataRef.param.symbolId = symbolId;
};

Hanimation.Clip.prototype.setSync = function(sync) {  
   this.dataRef.param.sync = sync;
};

Hanimation.Clip.prototype.setRealtime = function(realtime) {  
   this.realtime = realtime;
};

Hanimation.Clip.prototype.setBound = function(bound) {  
   this.bound = JSON.clone(bound); 
};

Hanimation.Clip.prototype.copyData = function(data)	
{
    if(!data)
        return; 
    
    if(this.dataRef == data)
        // Avoid cyclic copy
        return; 
            
    Hanimation.AniObject.prototype.copyData.call(this, data); 
    
	// this.dataRef.param.symblId = data.param.symbolId;
    // this.dataRef.param.offsetX = data.param.offsetX;
    // this.dataRef.param.offsetY = data.param.offsetY; 
};

Hanimation.Clip.prototype.hitTest = function(x, y, mode) { 

	var liveMode = (mode & 16) && (mode & 8);
	
	this.nestedHitObject = null;
	
	// For clip, no parentHit is checked. Because parent boundary does
	// not reflect the real boundary of clip layers. 
    var parentHit = liveMode ? Hanimation.HITTEST_NONE : Hanimation.AniObject.prototype.hitTest.call(this, x, y, mode);
    
    if(liveMode) // && (parentHit == Hanimation.HITTEST_WITHIN) )
    {
        var par = this.getParam();
        var symbol = Symbol.getSymbolById(par.symbolId);
        if(symbol)
        {
			if(!symbol.unzipped)
			{	
				HaniData.unzip(symbol); 
				symbol.unzipped = true;
			}
			
			// 这里计算元件的原始（不是实例，而是元件本身）边界尺寸。主要用在IDE里面绘制元件的缩略图
			var bound = Symbol.getBound(symbol, true); 
			
            var layers = symbol.layers;
            var len = layers.length;
            var unitCount;
			var foundObj;
            
            var frameid = this.getCurrentFrame(symbol, true);
            
            for (var i = 0; i < len; i++) {
                layer = layers[i];
                // if(layerid >= 0 && layerid!=layer.id)continue;
                
                unitCount = layer.units.length;
                for (var j = 0; j < unitCount; j++) {
                    var tmUnit = layer.units[j];
					var objCount = tmUnit.objects.length;
                    if(!(frameid>=tmUnit.frameStart && frameid<tmUnit.frameStart+tmUnit.frameCount))continue;
                    
					for(var k=objCount-1;k>=0;k--)
					{
						var obj = getAniObject(tmUnit.objects[k]);
						obj.updateTweenedParam(tmUnit, frameid);
						var pt = this.getNormPt(x, y);
						
						// getNormPt will set the point to the value corresponding to scale = 1. 
						// So there is no need to scale up the object. 
						// aniObj.setScale(auxParam.scaleX, auxParam.scaleY);
						
						{      
							var offLeft = bound.left;
							var offTop = bound.top;
							
							pt.x += offLeft;
							pt.y += offTop;
							
							hitRe = obj ? obj.hitTest(pt.x, pt.y, mode) : Hanimation.HITTEST_NONE;
							if (hitRe != Hanimation.HITTEST_NONE) {
								this.nestedHitObject = obj;
								foundObj = true;
								break;
							}
						}
					}
                }
                
                // The following comments came from Mugeda.hitTest, but it looks weird: why don't we search from the top to the bottom?
                // -=-------------
                // Even though we may have found a hit object. We still need to keep searching to get the topmost hit object. 
                // ---------------
                
                if(foundObj)
                    break;
            }
        }
		
		parentHit = this.nestedHitObject ? Hanimation.HITTEST_WITHIN : Hanimation.HITTEST_NONE;
    }
		
    return parentHit;
}

Hanimation.Clip.prototype.getOffset = function(symbol) {  
    return {
        'left':left,
        'top': top
    };
}

Hanimation.Clip.prototype.getCurrentFrame = function(symbol, peak) {  
    var param = this.getParam();
    var realtime = !window.previewRender;
    var frameId = 0;
    
    // realtime表明动画内容实在运行，而不是在IDE里面进行编辑。
    if(realtime)
    {
        var frameLen = Mugeda.getFrameLength(symbol.layers);  

        // syncc参数表明是否让元件的时间轴和舞台时间轴一一同步。例如，如果舞台只有1帧，如若sync=true，则元件也只播放第一帧。
        // 如果sync=false，那么元件会正常播放自己时间线中所有的帧。
        if(param.sync)
			frameId = (window.currentFrame - this.frameId) % frameLen;
		else
        {
            // 是否定义了元件播放区间，如果是则按照定义的区间确定播放边界（from->to)
            if(this.activeSeg)
            {
                var options = this.activeSeg.options;
                
                from = parseInt(options.from); 
                if(isNaN(from))
                    from = 0; 
                from = Math.max(0, from); 
                
                var to = parseInt(options.to);
                if(isNaN(to))
                    to = frameLen - 1; 
                to = Math.min(frameLen-1, to); 
                
                if(from > to)
                    from = to; 
                    
                if(this.counter < from)
                    this.counter = from;
                else if(this.counter > to)  
                {
                    if(options.noLoop)
                        this.counter = to;
                    else
                        this.counter = from;
                }
                
                frameId = this.counter;
				if(!peak)
					this.counter++;
            }
            else 
			{
                frameId = (this.counter) % frameLen;
				if(!peak)
					this.counter++;
			}
		}
    }
    
    return frameId;
}

// 每一个元件实例均会调用该函数来进行绘制。
Hanimation.Clip.prototype.draw = function(ctx, mode) {  
	
    var clip = this;
 	//绘制缓冲区内容
	function drawLayers(ctx, lyrs, frameId, auxParam){
		var boundary = {};
		var obj;
		var canvas = ctx.canvas;

		var p = {};
		
		// if(Mugeda.preview)
			p.layers = lyrs;
		// else
		// 	p.layers=buildLayers(lyrs);    
		
		// 如果p中不包含对象数组，则根据layers遍历重建所有需要绘制的对象。
		if(!p.objects){
			for (var i = p.layers.length - 1; i >= 0; i--) {
				var layer = p.layers[i];
				layer.objs=[];
				var unitCount = layer.units.length;
				for (var j = 0; j < unitCount; j++) {
					var tmUnit = layer.units[j];
					var objCount = tmUnit.objects.length;
					if (tmUnit && frameId >= tmUnit.frameStart && frameId < tmUnit.frameStart + tmUnit.frameCount) {
						if(tmUnit.audio || tmUnit.audioId){
							//播放/停止声音
							if(frameId == tmUnit.frameStart){
								var audio=AudioCache.getAudio(tmUnit.id);
								if(audio){
									if(audio.currentTime)
										audio.currentTime=0;
									try{audio.play();}catch(e){};
								}
							}else if(frameId == tmUnit.frameStart + tmUnit.frameCount - 1){
								var audio=AudioCache.getAudio(tmUnit.id);
								if(audio){
									try{audio.pause();}catch(e){};
								}
							}
						}
						if (objCount) {
							for (var k = 0; k < objCount; k++) {
								var aniObj = getAniObject(tmUnit.objects[k]);
                                if(!aniObj){
                                    console.log('Error! Object not found!');
                                    continue;
                                }
                                aniObj.locked = clip.locked;
								aniObj.updateTweenedParam(tmUnit, frameId);
								
								// 需要绘制的对象添加到layer.objs数组中。注意对象添加到了layer中而不是p中。
								// 这样处理主要是为了进行遮罩绘制。
								layer.objs.push(tmUnit.objects[k]);
								
								var aniObj = getAniObject(tmUnit.objects[k]);
								aniObj.setScale(auxParam.scaleX, auxParam.scaleY);
								aniObj.setAlpha(auxParam.alpha, false);
							}
						}
					}
				}
			}
		}
		ctx.save();
		
		if(p.objects){
			for (var i = 0; i< p.objects.length; i++) {
				obj = p.objects[i];
				obj = getAniObject(obj);
				obj.draw(ctx, 0);
			}
		}else{
			// p.objects中如果不包含对象，则交由HaniMask进行绘制。HaniMask会对对象按照遮罩规则进行绘制。
			HaniMask.drawLayer(ctx, p.layers);
		}
		
		ctx.restore();
		
		return boundary;
	};

	ctx.save();

    this.drawMode = mode;
    
    // 获取元件参数
    var par = this.getParam();
    
    // 元件实例的参数中包含元件的id,通过该id可以获取元件的参数，包括层等。
    var symbol = Symbol.getSymbolById(par.symbolId);
    if(!symbol)return;
    HaniData.unzip(symbol); 

    var param = par;
    // 这里计算元件的原始（不是实例，而是元件本身）边界尺寸。主要用在IDE里面绘制元件的缩略图
    var bound = Symbol.getBound(symbol, true); 
	
    if(bound.width == 0 || bound.height == 0)
    {
        bound.left = par.left;
        bound.top = par.top;
        bound.right = par.left + 16;
        bound.bottom = par.top + 16;
        bound.width = 16;
        bound.height = 16;
    }
    
    var changed = (JSON.stringify(bound) != JSON.stringify(this.bound)); 
    
    var realtime = !window.previewRender;
    
    if(!this.bound)
        this.setBound(bound); 
    
    // 如果元件的边界尺寸改变了（例如元件被编辑了），则更新元件的原始尺寸。
    if(changed)
    {
        var sX = param.startX - param.offsetX;
        var sY = param.startY - param.offsetY;
        
        var prevScaleX = 1.;
        var prevScaleY = 1.;
        if(par.rawWidth > 0 && par.rawHeight > 0)
        {
            prevScaleX = (param.width / par.rawWidth);
            prevScaleY = (param.height / par.rawHeight);
        }
        
        param.offsetX = bound.left - symbol.cw / 2;
        param.offsetY = bound.top - symbol.ch / 2;
    
        this.setBound(bound);
        
        param.startX = sX + param.offsetX;
        param.startY = sY + param.offsetY;
        param.left = param.startX;
        param.top = param.startY;
        
        param.endX = param.startX + bound.width * prevScaleX;
        param.endY = param.startY + bound.height * prevScaleY;
        param.right = param.endX;
        param.bottom = param.endY;
        
        param.width = bound.width * prevScaleX;
        param.height = bound.height * prevScaleY;
        
        param.rawWidth = bound.width;
        param.rawHeight = bound.height;
    }
    
	if(this.drawMode == 1)
        g_alpha  = 0.8; 
    else
        g_alpha = 1.;
        
    // g_alpha is reflected by each individual object
    ctx.globalAlpha = g_alpha * par.alpha * this.auxParam.alpha;
    this.prepareRotate(ctx);
    
    var width = param.width * this.auxParam.scaleX; 
	var height = param.height * this.auxParam.scaleY; 
	var scaleX = (width / par.rawWidth);
	var scaleY = (height / par.rawHeight);

	var offLeft = bound.left*scaleX;
	var offTop = bound.top*scaleY;
    ctx.translate(param.startX-offLeft, param.startY-offTop); 
	
	ctx.save();
	
    // 处理元件左右、上下翻转
    this.processFlip(ctx, par.width, par.height, offLeft, offTop); 
	
    var frameId = this.getCurrentFrame(symbol);
    if(frameId >= 0)
    {
        //[msm]
        if (this.eventListeners && this.eventListeners.enterframe) {
            for (var i = 0; i < this.eventListeners.enterframe.length; i++){
                this.eventListeners.enterframe[i].call(this, frameId);
                if (!this.eventListeners.enterframe) break;
            }
        }
        var auxParam = { 'alpha': ctx.globalAlpha, 'scaleX': scaleX, 'scaleY': scaleY };
        drawLayers(ctx, symbol.layers, frameId, auxParam);
    }
	
	ctx.restore();
	
    // Draw the clip center
    if(!realtime && !Mugeda.cleanRender)
    {
        var halfW = (window.aniData.width)*scaleX/2;
        var halfH = (window.aniData.height)*scaleY/2;
        var radius = 4; 
        
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(halfW-radius, halfH);
        ctx.arc(halfW, halfH, radius, 0, Math.PI*2, false);
        ctx.stroke();

        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(halfW, halfH-radius);
        ctx.lineTo(halfW, halfH+radius);
        ctx.stroke();
    }
    
    this.postDraw(ctx, mode); 
    
    ctx.restore();
    
};

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// objhelper.js
function duplicateObject(objdata, layerId, frameId, keepGuid, nameMode, sceneId)
{
    var obj = createNewObject(objdata.type, keepGuid ? objdata : null);
        
    if(objdata.items&&objdata.items.length)
    {
        for (var z = 0; z < objdata.items.length; z++) 
        {
            var curObj = objdata.items[z];
            var objNew = null;
            if(curObj.items && curObj.items.length)
                // recursive duplication
                objNew = duplicateObject(curObj, layerId, frameId, keepGuid, nameMode, sceneId);
            else 
            {
                objNew= createNewObject(curObj.type, keepGuid ? curObj : null);

                objNew.copyData(curObj);
                objNew.setLayerFrame(layerId, frameId);
				Mugeda.setIdName(objNew.dataRef, objNew.dataRef.param.name, nameMode, sceneId); 
				
				if(!keepGuid && curObj.type == Hanimation.SHAPE_PICTURE)
				{
					var img = ImageCache.getImage(curObj.guid)
					if(img)
						ImageCache.updateImage(objNew.dataRef.guid, img);
				}
           }
           obj.addObject(objNew);
         }    
        // obj.dataRef.param = objdata.param;
        obj.dataRef.param = JSON.clone(objdata.param);    
		Mugeda.setIdName(obj.dataRef, obj.dataRef.param.name, nameMode, sceneId); 
    }else{
        obj.copyData(objdata);
        obj.setLayerFrame(layerId, frameId);
		Mugeda.setIdName(obj.dataRef, obj.dataRef.param.name, nameMode, sceneId); 
		
		if(!keepGuid && objdata.type == Hanimation.SHAPE_PICTURE)
		{
			var img = ImageCache.getImage(objdata.guid)
			if(img)
				ImageCache.updateImage(obj.dataRef.guid, img);
		}		
    }
    
    return obj;
}
    

//获取选中对象的定界框
function getClearSpace(objs){
  var c;
  var p;
  var arr1=[];//left or right
  var arr2=[];//top or bottom
  var arr3=[];//lineWidth
  for(var i=0;i<objs.length;i++){
    c=objs[i].param;
    arr1.push(c.left);
    arr1.push(c.right);
    arr2.push(c.top);
    arr2.push(c.bottom);
    arr3.push(c.lineWidth/2);
  };
  p={
    left:Math.min.apply(Math,arr1),
    right:Math.max.apply(Math,arr1),
    top:Math.min.apply(Math,arr2),
    bottom:Math.max.apply(Math,arr2),
    off:Math.max.apply(Math,arr3)+4
  };
  p.width=p.right-p.left;
  p.height=p.bottom-p.top;
  return p;
};


   

//获取选中对象的缩略图
function getThumbnail(objs,callback){
    var p;
    var cvs;
    var img;
    p=getClearSpace(objs);
    p.width+=p.off*2;
    p.height+=p.off*2;
    cvs=G('canvasBuffer');

    if(cvs)
    {
        cvs.width=p.width;
        cvs.height=p.height;
        cvs.style.width=p.width+'px';
        cvs.style.height=p.height+'px';
        redrawCanvas({canvas:cvs,objects:objs,preview:true,offset:{x:p.left-p.off,y:p.top-p.off}});
        
        img=new Image();
        img.src=cvs.toDataURL("image/png");
        img.onload=function(){
          if(callback)callback(this);
        }
        img.onerror=function(){
          this.src = (this.src == "res/noimage.png") ? Mugeda.emptyImg : "res/noimage.png";
         if(callback)callback(this);
        }
        cvs.getContext('2d').clearRect(0, 0, cvs.offsetWidth, cvs.offsetHeight);
    }
    else
    {
        if(callback) callback(this);
    }
};

//将图片等比缩放后绘制到指定画布上
function drawCanvasThumbnail(img,cvs){
  var ctx=cvs.getContext('2d');
  var p={w:img.width,h:img.height};
  var q={w:cvs.width,h:cvs.height}; 
  var w,h,t,l;
  if(p.w/p.h>q.w/q.h){
    w=img.width;
    h=q.h*w/q.w;
    l=0;
    t=(h-img.height)/2;
  }else{
    h=img.height;
    w=q.w*h/q.h;
    t=0;
    l=(w-img.width)/2;
  }
  //console.log(p,q,w,h,t,l)
  
  cvs.width=w;
  cvs.height=h;
            
  ctx.clearRect(0,0,w,h);
  ctx.drawImage(img,0,0,img.width,img.height,l,t,img.width,img.height);
  
  cvs.style.width=q.w+'px';
  cvs.style.height=q.h+'px';
};



/**
Tween Lib
* @author sole / http://soledadpenades.com
* @author mr.doob / http://mrdoob.com
* @author Robert Eisele / http://www.xarg.org
* @author Philippe / http://philippe.elsass.me
* @author Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
*/
var TWEEN = TWEEN || ( function () {
	var i, tl, interval, time, tweens = [];
	return {
		start: function ( fps ) {
			interval = setInterval( this.update, 1000 / ( fps || 60 ) );
		},
		stop: function () {
			clearInterval( interval );
		},
		add: function ( tween ) {
			tweens.push( tween );
		},
		getAll: function() {
			return tweens;
		},
		removeAll: function() {
			tweens = [];
		},
		remove: function ( tween ) {
			i = tweens.indexOf( tween );
			if ( i !== -1 ) {
				tweens.splice( i, 1 );
			}
		},
		update: function () {
			i = 0; tl = tweens.length;
			time = new Date().getTime();
			while ( i < tl ) {
				if ( tweens[ i ].update( time ) ) {
					i++;
				} else {
					tweens.splice( i, 1 );
					tl--;
				}
			}
		}
	};
} )();
TWEEN.Tween = function ( object ) {
	var _object = object,
	_valuesStart = {},
	_valuesDelta = {},
	_valuesEnd = {},
	_duration = 1000,
	_delayTime = 0,
	_startTime = null,
	_easingFunction = TWEEN.Easing.Linear.EaseNone,
	_chainedTween = null,
	_onUpdateCallback = null,
	_onCompleteCallback = null;
	this.to = function ( properties, duration ) {
		if( duration !== null ) {
			_duration = duration;
		}
		for ( var property in properties ) {
			// This prevents the engine from interpolating null values
			if ( _object[ property ] === null ) {
				continue;
			}
			// The current values are read when the tween starts;
			// here we only store the final desired values
			_valuesEnd[ property ] = properties[ property ];
		}
		return this;
	};
	this.start = function () {
		TWEEN.add( this );
		_startTime = new Date().getTime() + _delayTime;
		for ( var property in _valuesEnd ) {
			// Again, prevent dealing with null values
			if ( _object[ property ] === null ) {
				continue;
			}
			_valuesStart[ property ] = _object[ property ];
			_valuesDelta[ property ] = _valuesEnd[ property ] - _object[ property ];
		}
		return this;
	};
	this.stop = function () {
		TWEEN.remove( this );
		return this;
	};
	this.delay = function ( amount ) {
		_delayTime = amount;
		return this;
	};
	this.easing = function ( easing ) {
		_easingFunction = easing;
		return this;
	};
	this.chain = function ( chainedTween ) {
		_chainedTween = chainedTween;
	};
	this.onUpdate = function ( onUpdateCallback ) {
		_onUpdateCallback = onUpdateCallback;
		return this;
	};
	this.onComplete = function ( onCompleteCallback ) {
		_onCompleteCallback = onCompleteCallback;
		return this;
	};
this.getFactor = function(ratio){
		var property, elapsed, value;
elapsed = Math.min(1., Math.max(0., ratio));
		value = _easingFunction( elapsed );
return value;
};
	this.update = function ( time ) {
		var property, elapsed, value;
		if ( time < _startTime ) {
			return true;
		}
		elapsed = ( time - _startTime ) / _duration;
		elapsed = elapsed > 1 ? 1 : elapsed;
		value = _easingFunction( elapsed );
		for ( property in _valuesDelta ) {
			_object[ property ] = _valuesStart[ property ] + _valuesDelta[ property ] * value;
		}
		if ( _onUpdateCallback !== null ) {
			_onUpdateCallback.call( _object, value );
		}
		if ( elapsed == 1 ) {
			if ( _onCompleteCallback !== null ) {
				_onCompleteCallback.call( _object );
			}
			if ( _chainedTween !== null ) {
				_chainedTween.start();
			}
			return false;
		}
		return true;
	};
	/*
	this.destroy = function () {
		TWEEN.remove( this );
	};
	*/
}
TWEEN.Easing = { Linear: {}, Step: {}, Quadratic: {}, Cubic: {}, Quartic: {}, Quintic: {}, Sinusoidal: {}, Exponential: {}, Circular: {}, Elastic: {}, Back: {}, Bounce: {} };
TWEEN.Easing.Linear.EaseNone = function ( k ) {
	return k;
};

TWEEN.Easing.Step.EaseIn = function ( k ) {
	return 1;
};
TWEEN.Easing.Step.EaseOut = function ( k ) {
	return  0;
};
//
TWEEN.Easing.Quartic.EaseIn = function ( k ) {
	return k * k * k * k;
};
TWEEN.Easing.Quartic.EaseOut = function ( k ) {
	 return - ( --k * k * k * k - 1 );
}
TWEEN.Easing.Quartic.EaseInOut = function ( k ) {
	if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
	return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );
};

/*
//
TWEEN.Easing.Cubic.EaseIn = function ( k ) {
	return k * k * k;
};
TWEEN.Easing.Cubic.EaseOut = function ( k ) {
	return --k * k * k + 1;
};
TWEEN.Easing.Cubic.EaseInOut = function ( k ) {
	if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
	return 0.5 * ( ( k -= 2 ) * k * k + 2 );
};

//
TWEEN.Easing.Quadratic.EaseIn = function ( k ) {
	return k * k;
};
TWEEN.Easing.Quadratic.EaseOut = function ( k ) {
	return - k * ( k - 2 );
};
TWEEN.Easing.Quadratic.EaseInOut = function ( k ) {
	if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
	return - 0.5 * ( --k * ( k - 2 ) - 1 );
};

// 
TWEEN.Easing.Sinusoidal.EaseIn = function ( k ) {
	return - Math.cos( k * Math.PI / 2 ) + 1;
};
TWEEN.Easing.Sinusoidal.EaseOut = function ( k ) {
	return Math.sin( k * Math.PI / 2 );
};
TWEEN.Easing.Sinusoidal.EaseInOut = function ( k ) {
	return - 0.5 * ( Math.cos( Math.PI * k ) - 1 );
};
//
TWEEN.Easing.Exponential.EaseIn = function ( k ) {
	return k == 0 ? 0 : Math.pow( 2, 10 * ( k - 1 ) );
};
TWEEN.Easing.Exponential.EaseOut = function ( k ) {
	return k == 1 ? 1 : - Math.pow( 2, - 10 * k ) + 1;
};
TWEEN.Easing.Exponential.EaseInOut = function ( k ) {
	if ( k == 0 ) return 0;
if ( k == 1 ) return 1;
if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 2, 10 * ( k - 1 ) );
return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );
};
// 
TWEEN.Easing.Circular.EaseIn = function ( k ) {
	return - ( Math.sqrt( 1 - k * k ) - 1);
};
TWEEN.Easing.Circular.EaseOut = function ( k ) {
	return Math.sqrt( 1 - --k * k );
};
TWEEN.Easing.Circular.EaseInOut = function ( k ) {
	if ( ( k /= 0.5 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
	return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);
};
*/
//
TWEEN.Easing.Elastic.EaseIn = function( k ) {
	var s, a = 0.1, p = 0.25;
	if ( k == 0 ) return 0; if ( k == 1 ) return 1; if ( !p ) p = 0.3;
	if ( !a || a < 1 ) { a = 1; s = p / 4; }
	else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
	return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
};
TWEEN.Easing.Elastic.EaseOut = function( k ) {
	var s,a = 0.1, p = 0.25;
	if ( k == 0 ) return 0; if ( k == 1 ) return 1; if ( !p ) p = 0.3;
	if ( !a || a < 1 ) { a = 1; s = p / 4; }
	else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
	return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );
};
TWEEN.Easing.Elastic.EaseInOut = function( k ) {
	var s, a = 0.1, p = 0.25;
	if ( k == 0 ) return 0; if ( k == 1 ) return 1; if ( !p ) p = 0.3;
if ( !a || a < 1 ) { a = 1; s = p / 4; }
else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;
};
//
TWEEN.Easing.Back.EaseIn = function( k ) {
	var s = 1.70158;
	return k * k * ( ( s + 1 ) * k - s );
};
TWEEN.Easing.Back.EaseOut = function( k ) {
	var s = 1.70158;
	return ( k = k - 1 ) * k * ( ( s + 1 ) * k + s ) + 1;
};
TWEEN.Easing.Back.EaseInOut = function( k ) {
	var s = 1.70158 * 1.525;
	if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
	return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );
};
// 
TWEEN.Easing.Bounce.EaseIn = function( k ) {
	return 1 - TWEEN.Easing.Bounce.EaseOut( 1 - k );
};
TWEEN.Easing.Bounce.EaseOut = function( k ) {
	if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
		return 7.5625 * k * k;
	} else if ( k < ( 2 / 2.75 ) ) {
		return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
	} else if ( k < ( 2.5 / 2.75 ) ) {
		return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
	} else {
		return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
	}
};
TWEEN.Easing.Bounce.EaseInOut = function( k ) {
	if ( k < 0.5 ) return TWEEN.Easing.Bounce.EaseIn( k * 2 ) * 0.5;
	return TWEEN.Easing.Bounce.EaseOut( k * 2 - 1 ) * 0.5 + 0.5;
};



function getTweenFactors(count, type)
{
    // count 代表系数的数目，由帧数决定。每一帧对应一个系数
    
    // factors 是返回的系数的数组，取值由插值算法决定，一般在0~1，但也有可能比0小，比1大（例如振荡模型）
    var factors = [];
    
    // 初始位置，对应timelineUnit的第一帧(frameStart)
    var position = {x:0};
    
    // 生成tween对象
    var tween = new TWEEN.Tween(position);
    
    // 终止位置，对应timelineUnit的最后一帧
    tween.to({x: 1}, 1000);
    
    // 注册算法类型(Quartic.EaseOut)。参见03_graphs.html
    // type需要在属性对话框中用droplist指定。当检测到当前层、当前unit包含动画时显示该属性参数。
    // 我们不需要所有的类型。建议用如下几种：
    // 
    // 代码取值 (界面显示)
    // 
    // Linear.EaseNone (Linear)
    // 
    // Quartic.EaseIn (Fade In)
    // Quartic.EaseOut (Fade Out)
    // Quartic.EaseInOut (Fade In & Out)
    // 
    // Elastic.EaseIn (Elastic In)
    // Elastic.EaseOut (Elastic Out)
    // Elastic.EaseInOut (Elastic In & Out)
    // 
    // Bounce.EaseIn (Bounce In)
    // Bounce.EaseOut (Bounce Out)
    // Bounce.EaseInOut (Bounce In & Out)
    
    if(!type)type='Quartic.EaseOut';
    tween.easing(eval('TWEEN.Easing.'+type));
    
    /*
    switch(type)
    {
        case 0: 
        default:
            tween.easing(TWEEN.Easing.Quartic.EaseOut);
            break;
    }
    */
    
    // 获取每一帧对应的系数
    for(var i=0;i<count;i++)
        factors[i] = tween.getFactor(i/count); 
    
    // 返回系数
    return factors;
}

/*********************************************************************
 * Zoom
 *********************************************************************/
Zoom = {
    setZoomInfo: function(aniData, frameId, zoomInfo)
    {
        if(!zoomInfo)
            return; 
        
        var idx = 0;
        // if(aniData.useCamera)
            // Frame based zoom info indexed from 1, instead of 0. 
            idx = frameId + 1;
        
        aniData.zoomInfo[idx] = JSON.clone(zoomInfo);
    },

    updateLayersAfterZoom: function(layers, zoomFactor)
    {
        // Adjust objects
        var aryLayers=layers;
        var layerLen = aryLayers.length;
        for (var i = 0; i < layerLen; i++) {
            var layer = aryLayers[i];            
            var units = aryLayers[i].units;
            var unitLen = units.length;
            
            for (var j = 0; j < unitLen; j++) {
                var objUnit = units[j];
                var objects = objUnit.objects;
                var objLen = objects.length;
                
                for (var k = 0; k < objLen; k++) {
                    var objdata = objects[k];
                    var object = getAniObject(objdata);
                    if(object)
                    {
                        object.setScale(zoomFactor, zoomFactor, true);    ////////////////////////////////[msm]                         
                        // object.setPosition(oldLeft-zoomInfo.offsetLeft, oldTop-zoomInfo.offsetTop, true);
                    }
                    
                    var keys = objUnit.keyframes;
                    var keyLen = keys.length;
                    for(var keyIdx=0;keyIdx<keyLen;keyIdx++)
                    {
                        var key = keys[keyIdx];
                        Param.scale(key.param, zoomFactor, zoomFactor); ///////////////////////////////[msm]
                    }                        
                }
                
                // Scale 
                if(objUnit.animated && objUnit.path)
                {
                    var data = {guid:objUnit.guidPath};
                    var objPath = getAniObject(data);
                    if(objPath)
                    {
                        objPath.setScale(zoomFactor, zoomFactor, true); /////////////////////////////[msm]
                        syncAnimationPath(objUnit, objPath);
                    }
                }
            }
        }
    },    
    
    updateDataAfterZoom: function(aniData, zoomFactor)
    {
        this.updateLayersAfterZoom(aniData.layers, zoomFactor);
    }, 
    
    objectInScene: function(object, scene, width, height)
    {
        var param = object.getParam();
		var offsetX = (typeof param.offsetX != "undefined") ? -param.offsetX : 0;
		var offsetY = (typeof param.offsetY != "undefined") ? -param.offsetY : 0;

        var not = (param.right + offsetX < scene.offsetLeft - Hanimation.PADDING || 
                    param.left + offsetX > scene.offsetLeft + width +  Hanimation.PADDING ||
                    param.bottom + offsetY < scene.offsetTop -  Hanimation.PADDING || 
                    param.top + offsetY > scene.offsetTop + height +  Hanimation.PADDING );
                    
        return !not;        
    },
    
    removeZoomInfo: function(aniData, frameId)
    {
        // if(!aniData.useCamera)
        //     return false;
        
        var aryZoomInfo = aniData.zoomInfo;
        
        var found = false;
        // Frame based zoom info indexed from 1, instead of 0. 
        frameId++;
        
        for(index in aryZoomInfo)
        {
            // var id = parseInt(index);
            if(index == frameId)
            {
                delete aryZoomInfo[index];
                found = true;
                break;
            }
        }
       
        return found;
    },
    
    getZoomInfo: function(aniData, frameId, mode)
    {
        var zoomInfo =  null;
        // if(!aniData.useCamera)
        if(frameId == -1)
        {
            zoomInfo = JSON.clone(aniData.zoomInfo[0]);
            zoomInfo.type = 0; 
            return zoomInfo; 
            
        }
        var aryZoomInfo = aniData.zoomInfo;
        
        // Frame based zoom info indexed from 1, instead of 0. 
        frameId++;
        
        var idFrom = -1;
        var idTo = -1;
        for(index in aryZoomInfo)
        {
            if(!aryZoomInfo[index])
                continue; 
                
            if(index == frameId)
            {
                zoomInfo = aryZoomInfo[index];
                zoomInfo.type = 1; 
                break;
            }
            if(index < frameId)
                // Keep searching
                idFrom = index;
            else if(index > frameId)
            {
                // Search no more. This should be the first index (frame) larger than frameId
                idTo = index;
                break;
            }
        }
        
        if(!zoomInfo)
        {
            var fromVal = parseInt(idFrom);
            var toVal = parseInt(idTo);
            
            var tween = "None";
            if(idFrom >= 0)
                tween = aryZoomInfo[idFrom].tween || "None";
                
            if(mode == 1)
            {
                // Match the most recent key camera
                zoomInfo = fromVal >= 0 ? JSON.clone(aryZoomInfo[idFrom]) : null;
                zoomInfo.type = 2;
            }
            else if(mode == 2)
            {    // Match only the key camera
                if(fromVal == frameId || fromVal == 0 && frameId == 1)
                {
                    zoomInfo = JSON.clone(aryZoomInfo[idFrom]);
                    zoomInfo.type = 3; 
                }
            }
            else if(fromVal >= 0  && (toVal < 0 || tween == "None"))
            {
                zoomInfo = JSON.clone(aryZoomInfo[idFrom]);
                zoomInfo.type = 4; 
            }
            else if(fromVal >= 0 && toVal > fromVal && tween != "None")
            {
                zoomInfo = {zoomLevel: 1., offsetLeft: 0, offsetTop: 0, tween: tween, rotation: 0};
                var zoomFrom = aryZoomInfo[idFrom];
                var zoomTo = aryZoomInfo[idTo];
                
                if(fromVal == 0)
                    fromVal = 1;
                    
                var count = toVal  - fromVal;
                var index = frameId - fromVal;
                
                // Get factor based on tween algorithm of zoomFrom
                var factor = getTweenFactors(count, zoomInfo.tween)[index];

                var scaleFrom = 1./zoomFrom.zoomLevel;
                var scaleTo = 1./zoomTo.zoomLevel;
                var newScale = scaleFrom + factor * (scaleTo - scaleFrom);
                var newFactor = 1./newScale;
                zoomInfo.zoomLevel = newFactor;
                zoomInfo.offsetLeft = zoomFrom.offsetLeft + factor * (zoomTo.offsetLeft - zoomFrom.offsetLeft);
                zoomInfo.offsetTop = zoomFrom.offsetTop + factor * (zoomTo.offsetTop - zoomFrom.offsetTop);
                zoomInfo.rotation = zoomFrom.rotation + factor * (zoomTo.rotation - zoomFrom.rotation);
                zoomInfo.type = 5; 
            }
        }
        
        if(zoomInfo && zoomInfo.rotation == undefined)
            zoomInfo.rotation = 0.;
            
        return zoomInfo;
    }
};

function prepareCanvasRotation(ctx, zoomInfo, aniData)
{
	var rotation = -zoomInfo.rotation;
  	var aux = {'scaleX': zoomInfo.zoomLevel, 'scaleY': zoomInfo.zoomLevel};
    
	if(rotation != 0)
	{
        var centerR = Math.sqrt(aniData.width*aniData.width+aniData.height*aniData.height)/2; 

		var alpha = rotation;
		var beta = Math.atan2(aniData.height, aniData.width); 
		
		var newCenterX = centerR * Math.cos(alpha+beta); 
		var newCenterY = centerR * Math.sin(alpha+beta); 
		
		var deltaX = aniData.width/2 - newCenterX ;
		var deltaY = aniData.height/2 - newCenterY ; 
        
		ctx.translate(deltaX, deltaY);
		ctx.rotate(rotation); 
	}
}

//绘制缓冲区内容
var built = false;
function redrawCanvas(p){
    if(!p)p={};
    var ctx;
    var obj;
    var frameId = window.currentFrame;
    var canvas = p.canvas;
    
    if(p.aniData){
        window.aniData=p.aniData;
        if(!p.color)p.color=window.aniData.color;
        if(!p.layers)p.layers=window.aniData.layers;
        if(p.frameId!=undefined)frameId=p.frameId;
    }
    
    if(canvas.width != canvas.offsetWidth || canvas.height != canvas.offsetHeight)
    {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
    if(p.color) //  && canvas.bkColor != p.color)
	{
        // ctx.fillStyle = p.color;
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
		canvas.bkColor =p.color;
		canvas.style.backgroundColor = p.color;
    }
    if(p.clear)return;
    if(p.repair && !built)
    {
        built = true;
        p.layers=buildLayers(p.layers, (window.isEditSymbol ? window.aniSymbol.id : ""));
    }

    if(!p.objects){
        for (var i = p.layers.length - 1; i >= 0; i--) {
            var layer = p.layers[i];
            layer.objs=[];
            var unitCount = layer.units.length;
            for (var j = 0; j < unitCount; j++) {
                var tmUnit = layer.units[j];
                var objCount = tmUnit.objects.length;
                if (tmUnit && frameId >= tmUnit.frameStart && frameId < tmUnit.frameStart + tmUnit.frameCount) {
                    layer.unit = tmUnit;//记录该层当前对应单元
                    if((tmUnit.audio || tmUnit.audioId) && !p.silent){
                    
                        var audioHash = 'l'+i+'u'+j;
                        //播放/停止声音
                        if(frameId == tmUnit.frameStart){
                            var audio=AudioCache.getAudio(tmUnit.id);
                            if(audio){
                                if(audio.currentTime)
                                    audio.currentTime=0;
                                    
                                try{audio.play();}catch(e){};
                            }
                            if(Hanimation.AudioCallback)
                                Hanimation.AudioCallback(audioHash, tmUnit.audio, frameId, Hanimation.AUDIO_START);
                        }else if(frameId == tmUnit.frameStart + tmUnit.frameCount - 1){
                            var audio=AudioCache.getAudio(tmUnit.id);
                            if(audio){
                                try{audio.pause();}catch(e){};
                            }
                            if(Hanimation.AudioCallback)
                                Hanimation.AudioCallback(audioHash, tmUnit.audio, frameId, Hanimation.AUDIO_STOP);
                        }
                    }
                    if (objCount) {
						for (var k = 0; k < objCount; k++) {
                            objData = tmUnit.objects[k];
                            obj = getAniObject(objData);
							
							Mugeda.processObjectBehavior(obj, "appear");
							
							if (tmUnit.animated && objCount == 1) {
								var keyframe = TimelineUnit.getKeyframe(tmUnit, frameId);
                                var srcParam = tmUnit.objects[k].param;
								if (keyframe) {
									var prevKey = keyframe;
									Param.exchange(keyframe.param, objData.param, true);
								} else {
									var param = TimelineUnit.getTweenParam(tmUnit, frameId, srcParam);
                                    if (param) 
                                    {
                                        Param.exchange(param, srcParam, true);
                                    }
									if (param) Param.exchange(param, objData.param, true);
								}
							}
                            else if(tmUnit.pg && (obj.progressMode == 4 || obj.progressMode == 5)){
                                var param = TimelineUnit.getProgressParam(tmUnit, obj, frameId, {tween:'Elastic.EaseOut'});
                                if (param){
                                    Param.exchange(param, objData.param, true);
                                }                                
                            }
                            else if(!tmUnit.animated)
                                TimelineUnit.distributeProgress(tmUnit);
                            
							layer.objs.push(tmUnit.objects[k]);
                            
						}
					}
				}
			}
		}
    }
    ctx.save();
    
    var zoomInfo = null;
    var prevZoom = this.prevZoomInfo;
    if(!prevZoom)
        prevZoom = Zoom.getZoomInfo(window.aniData, -1);    
    
    var zoomLen = window.aniData.zoomInfo.length;
    if(p.preview)
        zoomInfo = Zoom.getZoomInfo(window.aniData, -1);
    else if(frameId == 0 || zoomLen == 1)
    {
        zoomInfo = window.aniData.zoomInfo[1];
        if(!zoomInfo)
        {
            // Force the first frame to be zoomleve of 1
            zoomInfo = {zoomLevel: 1., offsetLeft: 0, offsetTop: 0, rotation: 0};
            if(zoomLen > 1)
                window.aniData.zoomInfo[1] = zoomInfo;
        }
    }
    else
        zoomInfo = Zoom.getZoomInfo(window.aniData, frameId);

    if(prevZoom)
    {
        var factor = zoomInfo.zoomLevel / prevZoom.zoomLevel;
        if(prevZoom.offsetLeft != zoomInfo.offsetLeft || 
            prevZoom.offsetTop != zoomInfo.offsetTop || 
            Math.abs(factor - 1) > 1.E-3)
            // Zoom info has been changed. 
            // Zoom.updateDataAfterZoom(window.aniData, factor);
            Zoom.updateLayersAfterZoom(window.aniLayers || window.aniData.layers, factor);
    }
    
    this.prevZoomInfo = JSON.clone(zoomInfo);  
    
    prepareCanvasRotation(ctx, zoomInfo, window.aniData);
    
    ctx.translate(-zoomInfo.offsetLeft * zoomInfo.zoomLevel, -zoomInfo.offsetTop * zoomInfo.zoomLevel);
    // Prepare rotation
    
    if(p.offset)ctx.translate(-p.offset.x, -p.offset.y);
    
    if(p.objects){
        for (var i = 0; i< p.objects.length; i++) {
            obj = p.objects[i];
            obj = getAniObject(obj);
            obj.draw(ctx, 0);
        }
    }else{
        HaniMask.drawLayer(ctx, p.layers, zoomInfo);
    }
    ctx.restore();
};

//遮罩
HaniMask={
    zoomInfo: null, 
    drawLayer:function(ctx,layers,zmInfo,mode){
    
        function detectObjInstance(obj){
            var found = false;
            if(obj.items && obj.items.length)
            {
                for(var i=0;i<obj.items.length;i++){
                    found = detectObjInstance(obj.items[i]);
                    
                    if(found)
                        break;
                }
            }                
            else if(obj.type == Hanimation.SHAPE_CLIP || obj.type == Hanimation.SHAPE_TEXT){
                found = true;
            }
            
            return found;
        }
        
        function detectUnitInstance(unit){
            if(!unit || !unit.objects)
                return false; 
                
            var hasInstance = false;
            var objCount = unit.objects.length;
            		
            for (var j = 0; j < objCount; j++) 
            {
                var objData = unit.objects[j];
                if(detectObjInstance(objData)){
                    hasInstance = true;
                    break;
                }
            }
            
            return hasInstance;
        }
        
        var obj;
        var objs;
        var prev;
        var layer;
        var mode = (mode == undefined) ? 0 : mode;
        var editMode = mode & 1;
        var zoomMode = mode & 2; 
        zoomInfo = zmInfo;

        var canvasWidth=ctx.canvas.width;
        var canvasHeight=ctx.canvas.height;        
        if(zoomInfo)
        {
            zoomInfo.left = Math.round(zoomInfo.offsetLeft * (zoomMode ? 1. : zoomInfo.zoomLevel));
            zoomInfo.top = Math.round(zoomInfo.offsetTop * (zoomMode ? 1. : zoomInfo.zoomLevel));
        }
        else    
        {
            zoomInfo = {};
            zoomInfo.left = 0;
            zoomInfo.top = 0;
        }
        zoomInfo.width = canvasWidth;
        zoomInfo.height = canvasHeight;        
        
        for (var i = layers.length - 1; i >= 0; i--) {
            layer=layers[i];
            if(layer.hide && editMode)continue;
            objs=layer.objs;
            if(!layer.maskMode){
				//normal layer
				unit=layer.unit||{};
				
				// TODO: Handling zooming information
                var hasInstance = detectUnitInstance(unit); 
				var noCache = hasInstance || unit.pg || (Math.abs(zoomInfo.zoomLevel - 1) > 1.E-2);
				cache=noCache ? null : ObjectCache.getCache(unit.id||'');
 				if(cache){
					if(unit.animated){
						obj = unit.objects;
						if(obj.length){
							obj = getAniObject(obj[0]);
							obj.draw(ctx, 0, cache);
						}
					}else{
						var img=cache.img;
						var bound=cache.bound;
						ctx.drawImage(img, bound.left, bound.top);
					}
					
				/*
					var offx=0;
					var offy=0;
					var img=cache.img;
					var bound=cache.bound;
					if(unit.animated){
						var param1=unit.keyframes[0].param;
						var param2=unit.objects[0].param;
						var offx=param2.left-param1.left;
						var offy=param2.top-param1.top;
						ctx.globalAlpha=param2.alpha;
						//console.log(param1.left,param2.left);
					}
					
					//G('msg').innerHTML=bound.left;
					//console.log([bound.left+offx,bound.top+offy,param1.width,bound.height])
					
					ctx.drawImage(img,bound.left+offx,bound.top+offy);
					
					if(unit.animated){
						ctx.globalAlpha=1;
					}
					
				*/
				}else{
					for (var j = 0; j < objs.length; j++) {
						obj = objs[j];
						obj = getAniObject(obj);
						obj.draw(ctx, 0);
					}
				}
				delete(layer.unit);
            }else{
                //mask layer
                if(layer.maskMode==2){
                    while(prev=layers[i-1]){
                        if(prev.maskMode==2){
                            objs=objs.concat(prev.objs);
                            delete(prev.objs);
                            i--;
                        }else if(prev.maskMode==1){
                            HaniMask.draw(ctx,objs,prev.objs);
                            delete(prev.objs);
                            i--;
                            break;
                        }else{
                            break;
                        }
                    }
                }
            }
            delete(layer.objs);
        }
    },
    draw:function(ctx,maskedObjs,maskObjs){
        var ctxs=this.getContext(ctx);
        var maskBound=this.getBoundary(ctxs.mask,maskObjs);
        var maskedBound=this.getBoundary(ctxs.masked,maskedObjs);
        var crossBox=maskedBound;
        if(crossBox.left<maskBound.left)crossBox.left=maskBound.left;
        if(crossBox.top<maskBound.top)crossBox.top=maskBound.top;
        if(crossBox.right>maskBound.right)crossBox.right=maskBound.right;
        if(crossBox.bottom>maskBound.bottom)crossBox.bottom=maskBound.bottom;
        crossBox.left=parseInt(crossBox.left);
        crossBox.top=parseInt(crossBox.top);
        crossBox.right=parseInt(crossBox.right);
        crossBox.bottom=parseInt(crossBox.bottom);
        crossBox.width=crossBox.right-crossBox.left;
        crossBox.height=crossBox.bottom-crossBox.top;

        if(crossBox.width == 0 || crossBox.height == 0)
            return; 
            
        var maskImageData =ctxs.mask.getImageData(crossBox.left-zoomInfo.left, crossBox.top-zoomInfo.top, crossBox.width, crossBox.height);
        var maskedImageData =ctxs.masked.getImageData(crossBox.left-zoomInfo.left, crossBox.top-zoomInfo.top, crossBox.width, crossBox.height);
        var maskData =maskImageData.data;
        var maskedData =maskedImageData.data;
        var dividor = 1./255;
        for (var i = 0; i < maskData.length; i+=4) {
            maskedData[i+3]=maskData[i+3]*maskedData[i+3]*dividor;
        }
        var canvas=ctxs.mask.canvas;
        canvas.width=crossBox.width;
        canvas.height=crossBox.height;
        ctxs.mask.putImageData(maskedImageData, 0, 0);
        ctx.drawImage(canvas, crossBox.left, crossBox.top);
    },
    getContext:function(ctx){
        var obj=ctx.canvas;
        var width=obj.width;
        var height=obj.height;
        var maskPannel = G('maskPannel');
        if(!maskPannel){
            maskPannel = document.createElement('div');
            maskPannel.id='maskPannel';
            maskPannel.style.display='none';
            maskPannel.innerHTML='<canvas></canvas><canvas></canvas>';
            document.body.appendChild(maskPannel);
        }
        var maskCanvas=maskPannel.childNodes[0];
        var maskedCanvas=maskPannel.childNodes[1];
        maskCanvas.width=maskedCanvas.width=width;
        maskCanvas.height=maskedCanvas.height=height;
        return{
            mask:maskCanvas.getContext('2d'),
            masked:maskedCanvas.getContext('2d')
        };
    },
    getBoundary:function(ctx,objs){
        var obj=ctx.canvas;
        var width=obj.width;
        var height=obj.height;
        var box;
        var param;
        var weight;
        var space=4;
        
        var minX = zoomInfo.left;
        var minY = zoomInfo.top;
        var maxX = zoomInfo.left + zoomInfo.width;
        var maxY = zoomInfo.top + zoomInfo.height;
        var bound={left:maxX,top:maxY,right:minX,bottom:minY};

        var objRect;
        for (var i = 0; i < objs.length; i++) {
            obj = objs[i];
            param=obj.param;
            
            aniobj = getAniObject(obj);
            objRect = aniobj.getBoundRect();

            weight=param.lineWidth||1;
            box={left:objRect.left-weight,top:objRect.top-weight,right:objRect.right+weight,bottom:objRect.bottom+weight};
            if(box.left<bound.left)bound.left=box.left;
            if(box.right>bound.right)bound.right=box.right;
            if(box.top<bound.top)bound.top=box.top;
            if(box.bottom>bound.bottom)bound.bottom=box.bottom;
            
            obj = getAniObject(obj);
            
            ctx.save();
            ctx.translate(-zoomInfo.left, -zoomInfo.top);
            obj.draw(ctx, 0);
            ctx.restore();
        }
        bound.left-=space;
        bound.top-=space;
        bound.right+=space;
        bound.bottom+=space;
        
        if(bound.left > bound.right)
            bound.left = bound.right;
        if(bound.top > bound.bottom)
            bound.top = bound.bottom;
            
        if(bound.left<minX)bound.left=minX;
        if(bound.top<minY)bound.top=minY;
        if(bound.right>maxX)bound.right=maxX;
        if(bound.bottom>maxY)bound.bottom=maxY;
        
        return bound;
    }
}


//对象缓存
var ObjectCache={
    hash:{},
    count:0,
    counter:0, 
    cacheAmount:0,
    onCached:null,
    
    init:function(anidata,callback){
		if(!anidata.cM)
        {
			callback(); 
			return; 
        }
		
		this.initCanvas(anidata);
		if(!window.built){
			built = true;
			anidata.layers=buildLayers(anidata.layers);
            
            for(var k=0;k<anidata.symbols.length;k++)
            {
                anidata.symbols[k].layers = buildLayers(anidata.symbols[k].layers, anidata.symbols[k].id);
            }
		}
        
        var layers=anidata.layers;
        for (var i = layers.length - 1; i >= 0; i--) {
            var units = layers[i].units;
            for (var j = 0; j < units.length; j++) {
                if(units[j].objects.length)
                {
                    this.cacheUnit(units[j]);
                    this.cacheAmount++;
                }
            }
        }
        
        var symbols=anidata.symbols;
        for(var k=0;k<symbols.length;k++)
        {
            layers = symbols[k].layers;
            for (var i = layers.length - 1; i >= 0; i--) {
                var units = layers[i].units;
                for (var j = 0; j < units.length; j++) {
                    if(units[j].objects.length)
                    {
                        this.cacheUnit(units[j]);
                        this.cacheAmount++;
                    }
                }
            }        
        }
        
        onCached = callback;
    },
    
    initCanvas:function(anidata){
		this.width=anidata.width||600;
		this.height=anidata.height||400;
		var canvas=document.createElement('canvas');
		document.body.appendChild(canvas);
		canvas.width=this.width;
		canvas.height=this.height;
		canvas.style.position='absolute';
		canvas.style.left='50px';
		canvas.style.top='50px';
		canvas.style.display='none';
		this.ctx=canvas.getContext('2d');
		var canvasmin=canvas.cloneNode(true);
		document.body.appendChild(canvasmin);
		this.ctxmin=canvasmin.getContext('2d');
    },
    getMaxSize:function(unit){
		var ret={width:0,height:0};
		var keyframes=unit.keyframes;
		for(var i=0;i<keyframes.length;i++){
			var param=keyframes[i].param;
			if(param.width>ret.width)ret.width=param.width;
			if(param.height>ret.height)ret.height=param.height;
		}
		return ret;
    },
    getMaxLineWidth:function(object){
		var ret=0;
		if(ret<object.param.lineWidth)ret=object.param.lineWidth;
		var items=object.items||[];
		if(items.length){
			for(var k in items){
				var obj=items[k];
				var width=this.getMaxLineWidth(obj);
				if(ret<width)ret=width;
			}
		}
		return ret;
    },
    getUnitGuid:function(unit){
		var guid = ''+(unit.id||'');
		if(guid.length<5){
			guid+='_'+unit.layerId;
		}
		return guid;
    },
    cacheUnit:function(unit){
		var guid = this.getUnitGuid(unit);
		if(!guid||this.hash[guid])return;
		this.ctx.clearRect(0,0,this.width,this.height);
		var bound={left:Hanimation.MAX_VALUE,top:Hanimation.MAX_VALUE,right:-Hanimation.MAX_VALUE,bottom:-Hanimation.MAX_VALUE};		
		var objects = unit.objects;
		var offset = 0;
        
        this.ctx.save();
        
        // pre loop: check whether (at least) a symbol, a text, or an image is present. 
        // For such unit, objects may need cahced seperately. 
        var needCacheObject = false;
        for(var i = 0; i < objects.length; i++) {
			var object = objects[i];
			if(object.type == Hanimation.SHAPE_CLIP || object.type == Hanimation.SHAPE_TEXT || object.type == Hanimation.SHAPE_PICTURE){
                needCacheObject = true;
            }
		}
        
        // 1st loop: calculate the bounding box
		for (var i = 0; i < objects.length; i++) {
			var object = objects[i];
			if(unit.animated){
				var p=this.getMaxSize(unit);
				object.param.width = p.width;
				object.param.right = object.param.left+object.param.width;
				object.param.endX = object.param.right;
				object.param.height = p.height;
				object.param.bottom = object.param.top+object.param.height;
				object.param.endY = object.param.bottom;
				p=this.getMaxLineWidth(object);
				object.param.lineWidth=p;
				object.param.alpha = 1;
				object.param.rotate = 0;
			}
			var obj = getAniObject(object);
			var objRect = obj.getBoundRect();
			offset=Math.ceil(1+(object.param.lineWidth||1)/2);
			var left=objRect.left-offset;
			var top=objRect.top-offset;
			var right=objRect.right+offset;
			var bottom=objRect.bottom+offset;
			if(bound.left>left)bound.left=left;
			if(bound.top>top)bound.top=top;
			if(bound.right<right)bound.right=right;
			if(bound.bottom<bottom)bound.bottom=bottom;
			
            // Leave it to the second loop
            // obj.draw(this.ctx, 0);
		}
		bound.left=Math.floor(bound.left);
		bound.top=Math.floor(bound.top);
		bound.right=Math.ceil(bound.right);
		bound.bottom=Math.ceil(bound.bottom);
        
        // These two clips should not be here. 
        if(!unit.animated){
            if(bound.left<0)bound.left=0;
            if(bound.top<0)bound.top=0;
            if(bound.right>this.width)bound.right=this.width;
            if(bound.bottom>this.height)bound.bottom=this.height;
        }
		bound.width=bound.right-bound.left;
		bound.height=bound.bottom-bound.top;
        
        var canvas=this.ctx.canvas;
        canvas.width=bound.width;
        canvas.height=bound.height;
		
		var zeroImage = (canvas.height == 0 || canvas.width == 0);
		
        this.ctx.translate(-bound.left, -bound.top);
		
        // 2nd loop: Real rendering to the buffer
		for (var i = 0; i < objects.length; i++) {
			var object = objects[i];
			var obj = getAniObject(object);
			obj.draw(this.ctx, 0);
		}
        
        this.ctx.restore(); 

        /*
		var ctx=this.ctxmin;
		var canvas=ctx.canvas;
		canvas.width=bound.width;
		canvas.height=bound.height;
        // ctx.drawImage(this.ctx.canvas,bound.left,bound.top,bound.width,bound.height,0,0,bound.width,bound.height);
        ctx.drawImage(this.ctx.canvas,0,0,bound.width,bound.height,0,0,bound.width,bound.height);
        */
        
		var img=new Image();
		// img.src=canvas.toDataURL("image/png");
		if(zeroImage)
			img.src = Mugeda.emptyImg;
		else
			img.src=this.ctx.canvas.toDataURL("image/png");
			
		img.onload=function(){
			ObjectCache.hash[guid]={
				img:this,
				bound:bound,
				offset:offset
			};
            // Object caching: 80~100%
            ObjectCache.counter++;
            
            if(ObjectCache.cacheAmount == ObjectCache.counter && (typeof onCached != "undefined" && onCached != null))
                setTimeout(onCached);                
            
            if(typeof LoadingProcess != "undefined")
                LoadingProcess.updateTo(100+Math.floor(0*ObjectCache.counter/ObjectCache.cacheAmount),'Loading...');

		}
        
        if(needCacheObject)
        {
            for(var i = 0; i < objects.length; i++) {
                var object = objects[i];
                if(!(object.type == Hanimation.SHAPE_CLIP || object.type == Hanimation.SHAPE_TEXT || object.type == Hanimation.SHAPE_PICTURE)){
                    this.cacheObject(object);
                }
            }    
        }
        
    },
    cacheObject:function(object){
		var guid = object.guid;
		if(!guid||this.hash[guid])return;
		var obj = getAniObject(object);
		this.ctx.clearRect(0,0,this.width,this.height);
		obj.draw(this.ctx, 0);
		var objRect = obj.getBoundRect();
		var offset=1+(object.param.lineWidth||1)/2;
		var bound={left:objRect.left-offset,top:objRect.top-offset,right:objRect.right+offset,bottom:objRect.bottom+offset};
		if(bound.left<0)bound.left=0;
		if(bound.top<0)bound.top=0;
		if(bound.right>this.width)bound.right=this.width;
		if(bound.bottom>this.height)bound.bottom=this.height;
		bound.width=bound.right-bound.left;
		bound.height=bound.bottom-bound.top;
		
		var ctx=this.ctxmin;
		var canvas=ctx.canvas;
		canvas.width=bound.width;
		canvas.height=bound.height;
		ctx.drawImage(this.ctx.canvas,bound.left,bound.top,bound.width,bound.height,0,0,bound.width,bound.height);
		var img=new Image();
		img.src=canvas.toDataURL("image/png");
		img.onload=function(){
			ObjectCache.hash[guid]={
				img:this,
				bound:bound,
				offset:offset
			}
		}
    },
    getCache:function(guid){
		return this.hash[guid];
    }
}

/*********************************************************************
 * Symbol
 *********************************************************************/
Symbol={
  imageCache:{},
  symbolCache:{},
  paramCache:{}, 
  //重建元件
  build:function(symbols,callback){
    var now=0;//当前加载成功元件数
    var len=0;//元件总数
    var fun=function(){
      now++;
      if(now>=len&&callback){//当计数器达到总数时触发回调函数
        callback();
      }
    };
    // len=this.builds(symbols||[],fun);
    
    len=this.builds(symbols||[]);    
    callback();
  },
  builds:function(symbols,callback){
    var symbol;
    var len=0;
    var slen=symbols.length;
    if(!slen){
      if(callback)callback();
      return 0;
    }
    for(var i=0;i<slen;i++){
        symbol=symbols[i];
        symbol.layers = buildLayers(symbol.layers||[], symbol.id);
        
        // Do not update symbol image any more. 
        // Symbol may be a complete animation (with its complete layers) with animations. 
        // So it is meaningless to cache symbol image. 
        // this.updateImage(symbol,callback);
        len++;
      }
    return slen;
  },
  updateImage:function(symbol,callback){
    var _=this;
    if(!symbol||!symbol.layers||!symbol.layers.length)return;
    var objs=this.getLayersObjects(symbol.layers);
    getThumbnail(objs,function(img){
      // _.imageCache[symbol.name]=img;
      if(callback)callback(img);
    });
  },
  
  getSymbolsByName:function(name){
    var out = [];
    var symbols=window.aniData.symbols||[];
    for(var i=0;i<symbols.length;i++){
        if(symbols[i].name==name)out.push(symbols[i]);
    }
    return out;
  },
  
  getSymbolById:function(id){
      var symbols=window.aniData.symbols||[];
      for(var i=0;i<symbols.length;i++){
      if(symbols[i].id==id)return symbols[i];
    }
    return null;
  },
  getLayersObjects:function(layers){
    var ret=[];
    if(layers){
      for (var i = layers.length - 1; i >= 0; i--) {
        var units = layers[i].units;
        for (var j = 0; j < units.length; j++) {
          var tmUnit = units[j];
          var objs = tmUnit.objects;
          for (var k = 0; k < objs.length; k++) {
            ret.push(objs[k]);
        }
      }
      }
    }
    return ret;
  },
  getBound:function(symbol, noClip){ 
    var bound = this.paramCache[symbol.id];
    if(!bound || symbol.dirtyFlag)
    {
        var objs=this.getLayersObjects(symbol.layers);
        bound =this.getBoundary(objs, noClip);
	    this.paramCache[symbol.id] = bound;
        
		symbol.dirtyFlag = false;
    }
    
    return bound;
  }, 
  getBoundary:function(objs, noClip){
    var width=Hanimation.MAX_VALUE;
    var height=Hanimation.MAX_VALUE;
    
    if(objs.length == 0)
        return {left:0,top:0,right:0,bottom:0,width:0,height:0};
        
    var bound={left:width,top:height,right:0,bottom:0};
    for (var i = 0; i < objs.length; i++) {
        var obj = objs[i];
        var param=obj.param;
        var aniobj = getAniObject(obj);
        if(!aniobj)
            continue;
            
        var box = aniobj.getBoundRect();
        if(box.left<bound.left)bound.left=box.left;
        if(box.right>bound.right)bound.right=box.right;
        if(box.top<bound.top)bound.top=box.top;
        if(box.bottom>bound.bottom)bound.bottom=box.bottom;
    }
    
    if(!noClip)
    {
        if(bound.left<0)bound.left=0;
        if(bound.top<0)bound.top=0;
        if(bound.right>width)bound.right=width;
        if(bound.bottom>height)bound.bottom=height;
    }

    bound.width=bound.right-bound.left;
    bound.height=bound.bottom-bound.top;

    return bound;
  }
};

/*********************************************************************
 * ImageCache
 *********************************************************************/
function loadObjectImage(object, callback, errorFunc)
{
    var count = 0; 
    if(!object)
        return 0; 
    
    if(object.items && object.items.length)
    {
        for(var i=0;i<object.items.length;i++)
            count += loadObjectImage(object.items[i], callback, errorFunc);
    }
    else if(object.type==Hanimation.SHAPE_PICTURE && object.param.imageSrc.length > 0){
        count++;
        var img=new Image();
        img.src=object.param.imageSrc;
        img.object=object;
        img.guid = object.guid;
        img.onload= callback; // function(){callback(img, object);};
        img.onerror = errorFunc;
    } 

    return count;
}
 
ImageCache={
  images:{},//缓存字典
  init:function(anidata,callback){
      var now=0;
      var num=0;
      var images=this.images;
      
      var errorCount = 0; 
      
      function imageReady(){
        if(this.guid)
        {
            var par = this.object.param;
            par.rawWidth = this.width;
            par.rawHeight = this.height;
            images[this.guid]=this;
        }
        now++;
        
        // Image caching: 65~80%
        var amount = 35;
        if(typeof LoadingProcess != "undefined")
            LoadingProcess.updateTo(65+Math.floor(amount*now/num),'Loading...');
        
        if(now==num)
            callback(errorCount);//所有图片加载完毕，触发回调
      };
      
      function imageError(){
        if(this.guid)
            images[this.guid]=this;
        
        if(this.object)
        {
            var useEmpty = this.object.param.imageSrc == "res/noimage.png";
            this.object.param.imageSrc = useEmpty ? Mugeda.emptyImg : "res/noimage.png";
            this.src = this.object.param.imageSrc;
        }
        now++;
        errorCount++;
        
        // Image caching: 65~80%
        var amount = 35;
        if(typeof LoadingProcess != "undefined")
            LoadingProcess.updateTo(65+Math.floor(amount*now/num),'Loading...');
        
        if(now==num)
            callback(errorCount);//所有图片加载完毕，触发回调
      };      
      
      var layers=anidata.layers;
      for (var i = layers.length - 1; i >= 0; i--) {
          var units = layers[i].units;
          for (var j = 0; j < units.length; j++) {
              var objects = units[j].objects;
              for (var k = 0; k < objects.length; k++) {
                  var obj = objects[k];
                  num += loadObjectImage(obj, imageReady, imageError);
              }
          }
      }
      
      // Images in symbols also need to be cached. 
      var symbols = anidata.symbols;
      for(var s=0;s<symbols.length;s++){
          var layers=symbols[s].layers;
          for (var i = layers.length - 1; i >= 0; i--) {
              var units = layers[i].units;
              for (var j = 0; j < units.length; j++) {
                  var objects = units[j].objects;
                  for (var k = 0; k < objects.length; k++) {
                      var obj = objects[k];
                      num += loadObjectImage(obj, imageReady, imageError);
                  }
              }
          }
       }
       
      if(num==0)callback();//没有图片时，直接触发回调
  },
  updateImage:function(guid, img){
    this.images[guid]=img;
  },
  getImage:function(guid){
    return this.images[guid];
  }
}

//声音缓存
AudioCache={
    audios:{},//缓存字典
    init:function(anidata,callback){
    
        // var isiPad =  navigator.userAgent.match(/iPad/i) != null;
        // var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
        var isMobile = navigator.userAgent.match(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/i) != null;
        
        // TODO: Fixed the issue of audio playback on iOS.
        // var isiOS = isiPad || isiPhone; 
        
        var num=0;//总数
        var now=0;//加载数
        var layers=anidata.layers;
        var aryAudios = [];
        
        for (var i = layers.length - 1; i >= 0; i--) {
            var units = layers[i].units;
            for (var j = 0; j < units.length; j++) {
                var unit = units[j];
                if (unit.audio || unit.audioId) {
                    num++;
                    aryAudios.push(unit);
                }
            }
        }

        //初级界面中会为动画添加一个音频，而不是在时间单元上
        if (anidata.audio && anidata.uiType === 0){
            num ++;
            aryAudios.push({
                id: 'anidata-audio',
                audio: anidata.audio
            });
        }

        for(i = 0;i<num;i++){
            var unit = aryAudios[i];
            if(unit.audio || unit.audioId){
                var audio= new Audio(); // document.createElement('audio');
                audio.preload = true; 
                audio.src = unit.audioId ? Symbol.getSymbolById(unit.audioId).url : unit.audio;
		        if(isMobile){
                    now++;
                    if(now==num)callback();//所有声音加载完毕，触发回调
                }
                else{
                    audio.addEventListener('loadedmetadata',function(){
                        now++;
                        
                        // Image caching: 50~65%
                        if(typeof LoadingProcess != "undefined")
                            LoadingProcess.updateTo(50+Math.floor(15*now/num),'Loading...');
                        
                        if(now==num)callback();//所有声音加载完毕，触发回调
                    });
                    document.body.appendChild(audio);
                    
                }
                // TODO: What about iOS?
                this.audios[unit.id]=audio;
            }
        }
        
        if(num==0)callback();//没有声音时，直接触发回调
    },
    getAudio:function(guid){
        return this.audios[guid];
    },
    loopAudio:function (guid){
        var audio = this.audios[guid];

        if (!audio)
            return;

        audio.addEventListener('ended', function (){
            this.currentTime = 0;
            this.play();
        }, false);

        audio.play();
    },
    updateAudio:function(guid, audio){
        this.audios[guid]=audio;
    }
}

function isDefined(obj)
{
    return (typeof obj == "undefined" ? false : true); 
}

function updateAnimationPath(unit)
{
    if(!unit)
        return;
    
    var mode = (typeof unit.pathMode == "undefined") ? Hanimation.PATHMODE_DEFAULT : unit.pathMode;
    
    // Only auto update for non-custom path
    if(!unit.animated)
        return; 
        
    var points = [];
    var mapKeyNode = [];
    var keyLen = unit.keyframes.length;
    var param, cX, cY, fwdX, fwdY, bwdX, bwdY;
    var paramFwd, cXFwd, cYFwd;
    var paramBwd, cXBwd, cYBwd;        
    
    function getNodeById(points, id)
    {
        var node = null;
        var len = points.length;
        for(var i=0;i<len;i++)
        {
            pt = points[i];
            if(pt.id == id)
            {
                node = pt;
                break;
            }
        }
        
        return node;
    }
    
    function getKeyByNodeId(nodeId)
    {
        var len = points.length;
        var key = null;
        for(var i=0;i<keyLen;i++)
        {
            var keyNow = unit.keyframes[i];
            if(keyNow.nodeId == nodeId)
            {
                key = keyNow;
                break;
            }
        }
        
        return key;
    }
    
    var syncToObj = (mode != Hanimation.PATHMODE_UPDATE_KEYFRAME);
    
    for(var i=0;i<keyLen;i++)
    {
        var key = unit.keyframes[i];
        param = key.param;
        cX = param.left + param.rotateCenterX;
        cY = param.top + param.rotateCenterY;
        
        if(mode == 1)
        {
            if(i < keyLen - 1)
            {    
                var keyFwd = unit.keyframes[i+1];
                paramFwd = keyFwd.param;
                cXFwd = paramFwd.left + paramFwd.rotateCenterX;
                cYFwd = paramFwd.top + paramFwd.rotateCenterY;
            }
            else
            {
                var keyBwd = unit.keyframes[i-1];
                paramBwd = keyBwd.param;
                cXBwd = paramBwd.left + paramBwd.rotateCenterX;
                cYBwd = paramBwd.top + paramBwd.rotateCenterY;
                cXFwd = 2*cX - cXBwd;
                cYFwd = 2*cY - cYBwd;                    
            }
            
            if(i > 0)
            {    
                var keyBwd = unit.keyframes[i-1];
                paramBwd = keyBwd.param;
                cXBwd = paramBwd.left + paramBwd.rotateCenterX;
                cYBwd = paramBwd.top + paramBwd.rotateCenterY;
            }   
            else
            {
                var keyFwd = unit.keyframes[i+1];
                paramFwd = keyFwd.param;
                cXFwd = paramFwd.left + paramFwd.rotateCenterX;
                cYFwd = paramFwd.top + paramFwd.rotateCenterY;
                cXBwd = 2*cX - cXFwd;
                cYBwd = 2*cY - cYFwd;                    
            }                

            var factor = 0.2;
            fwdX = cX + factor * (cXFwd - cX);
            fwdY = cY + factor * (cYFwd - cY);
            bwdX = cX + factor * (cXBwd - cX);
            bwdY = cY + factor * (cYBwd - cY);            
        }
        else if(mode == 0)
        {
            fwdX = cX;
            fwdY = cY;
            bwdX = cX;
            bwdY = cY;
        }
        else if(mode == 2) // Keyframe edited
        {
            var obj = getPathObject(unit); 
            if(!obj)
                continue; 
                
            if(typeof key.nodeId == "undefined")
            {
                // This key should be a new created one. Generate a node for it. 
                var idxNext = i<keyLen-1 ? i+1 : i;
                var idxPrev = i>0 ? i-1 : 0;
                var keyNext = unit.keyframes[idxNext];
                var keyPrev = unit.keyframes[idxPrev];
                var count = Math.abs(keyNext.id - keyPrev.id);
                var index = key.id - keyPrev.id;
                var factor = index/count;
                
                points = obj.dataRef.curve.points;
                Bezier.subDivision2(points, idxPrev, factor);
                syncToObj = false; 
                
                pt = points[i]; 
                pt.id = getIncrementalId();
                key.nodeId = pt.id;
                
                mapKeyNode[key.nodeId] = key.id;
                
                syncAnimationPath(unit, obj);
                // unit.path = points.slice(0);
            }
            else
                mapKeyNode[key.nodeId] = key.id;                    

            var pt = getNodeById(unit.path, key.nodeId);
            if(!pt)
                continue; 
                
            var objParam = obj.getParam();                
            var deltaX = cX - pt.nodeX - objParam.left;
            var deltaY = cY - pt.nodeY - objParam.top;
            pt.nodeX += deltaX;
            pt.nodeY += deltaY;
            pt.forwardX += deltaX;
            pt.forwardY += deltaY;
            pt.backwardX += deltaX;
            pt.backwardY += deltaY;
            
            // Once we process one keyframe, skip the remaining ones. 
            // break;

        }
        else if(mode == 3) // Animation path edited
        {
            var obj = getPathObject(unit); 
            if(obj)
            {
                points = obj.dataRef.curve.points;
                var objParam = obj.getParam();
                
                var len = points.length;
                for(var j=len-1;j>=0;j--)
                {
                    var pt = points[j];
                    var keyNow = getKeyByNodeId(pt.id);
                    if(keyNow)
                    {
                        var par = keyNow.param;
                        Param.shift(par, objParam.left + pt.nodeX - par.rotateCenterX - par.left, 
                                         objParam.top + pt.nodeY - par.rotateCenterY - par.top);
                    }
                    else
                    {
                        // No matching keyframe. 
                        // No matching keyframe. The node should have been removed
                        points.splice(j, 1); 
                    }
                }
            }
        }
        
        if(mode < 2)
        {
            var pt = createTriPoint(cX, cY, fwdX, fwdY, bwdX, bwdY);
            pt.id = getIncrementalId();
            points.push(pt);
            key.nodeId = pt.id;                
        }
    }
    
    var useDelta = true;
    if(mode < 2)
    {
        if(unit.path)
            delete unit.path;
        
        unit.path = points.slice(0);
        useDelta = false; 
    }
    
    // if(mode > 0)
    {
        var obj = getPathObject(unit); 
        if(obj)
        {
            if(mode == 2)
            {
                var points = unit.path;
                var nodeLen = points.length;
                for(var j=nodeLen-1;j>=0;j--)
                {
                    if(mapKeyNode[points[j].id] == undefined)
                    {
                        // No matching keyframe. The node should have been removed
                        points.splice(j, 1); 
                    }
                }
            }                
            
            // TODO: Encapsulation vilation
            if(syncToObj)
            {
                var param = obj.getParam();
                if(!useDelta)
                {
                    param.left = 0;
                    param.top = 0; 
                    param.startX = 0;
                    param.startY = 0; 
                }
               
                obj.dataRef.curve.points=[];
                obj.addPoints(unit.path, false);     
            }

            
            // TODO: Do we really need to keep both unit.path and curve object?
            syncAnimationPath(unit, obj);
            
            // unit.path = obj.dataRef.curve.points.slice(0);
        }
    }
}
    
//扩充对象
function buildLayers(aryLayers, sceneId, newGuid) {
    // TODO: why do we need to clean it up here?
	// 
    // Mugeda.mapNameId = [];
    // Mugeda.mapIdName = [];
    
    var layers = [];
    if(!aryLayers)aryLayers=window.aniLayers;
    for (var i = 0; i < aryLayers.length; i++) {
    
        // 华东：clone会同时复制里面的units.   
        var layer = JSON.clone(aryLayers[i]);
        layer.units = [];
        
        var units = aryLayers[i].units;
        var hashId = [];

        var frameNow = 0;
        for (var j = 0; j < units.length; j++) {
            var objUnit = units[j]; 
            
            // A workaround of a previous bug where timelineUnits with the same range coexist. 
            if(objUnit.frameStart > frameNow)
            {
                continue;
            }
                       
            frameNow = objUnit.frameStart + objUnit.frameCount;
            
            // 华东：clone会同时复制里面的objects. 
            var timelineUnit = JSON.clone(objUnit);
            
			if(timelineUnit.id == undefined || newGuid)
				timelineUnit.id = guidGen();
				
            var id = timelineUnit.id.toString();
            // TODO: Version compatibility
            if(id.length < 4)
                timelineUnit.id = guidGen(); 
                
            if(hashId[timelineUnit.id])
            {
                var newId = timelineUnit.id+999;
                while(hashId[newId])
                    newId++;
                timelineUnit.id = newId;
            }
            hashId[timelineUnit.id] = timelineUnit.id;
                
            timelineUnit.objects=[];
            
            // 华东：需要在这里重建hash table            
            var keyLen = timelineUnit.keyframes.length;
            for(var keyIdx=0;keyIdx<keyLen;keyIdx++)
            {
                var keyObj = timelineUnit.keyframes[keyIdx];
                if(keyIdx == 0 && keyObj.id != objUnit.frameStart) 
                {
                    // A workaround of an unknown bug where the id of the first keyframe may be invalid. 
                    keyObj.id = objUnit.frameStart;
                }
                
                timelineUnit.hashKey['key_'+keyObj.id] = keyObj;
            }
            
            // Create path curve object
            if(timelineUnit.path && timelineUnit.animated)
            {
                var pathObj = getPathObject(timelineUnit, newGuid ? 2 : 1);
                if(pathObj)
                {
					if(newGuid)
						timelineUnit.guidPath = pathObj.dataRef.guid;
						
                    pathObj.dataRef.curve.points=[];
                    pathObj.addPoints(timelineUnit.path, false);   

                    var pathParam = pathObj.dataRef.param;
                    pathParam.left += timelineUnit.pathLeft;
                    pathParam.top += timelineUnit.pathTop;
                    pathParam.right += timelineUnit.pathLeft;
                    pathParam.bottom += timelineUnit.pathTop;                    
                    
                    pathParam.startX = pathParam.left;
                    pathParam.startY = pathParam.top;
                    pathParam.endX = pathParam.right;
                    pathParam.endY = pathParam.bottom;                    
                }
                
                // buildLayers builds data from scratch (instead of from editing). So 
                // force pathMode = 3 to update keyframe from path curve. 
                if(timelineUnit.pathMode == Hanimation.PATHMODE_UPDATE_PATH)
                    timelineUnit.pathMode = Hanimation.PATHMODE_UPDATE_KEYFRAME; 
                updateAnimationPath(timelineUnit);
            }
            
            var objects = objUnit.objects;
            for (var k = 0; k < objects.length; k++) {
                var objdata = objects[k];
                obj = duplicateObject(objdata, layer.id, objUnit.frameStart, newGuid ? false : true, 2, sceneId);
					
                TimelineUnit.addObject(timelineUnit, obj, true, aryLayers); 
                // timelineUnit.objects.push(obj.dataRef);
                // obj.setLayerFrame(layer.id, objUnit.frameStart);
            }
            layer.units.push(timelineUnit);
        }
        layers.push(layer);
    }
    
    // 华东:这个函数并没有更新window.aniLayers!!!
    aryLayers = layers;
    
    return aryLayers;
};

function syncAnimationPath(unit, object)
{
    if(unit && object)
    {
        var param = object.getParam();
        unit.path = object.dataRef.curve.points.slice(0);
        unit.pathLeft = param.left;
        unit.pathTop = param.top;
    }
};

function bezierInterpolate(t0, t1, p0, p1, p2, p3)
{
    var val = Math.pow(t1, 3) * p0 + 3 * Math.pow(t1, 2) * t0 * p1 + 
              3 * t1 * Math.pow(t0, 2) * p2 + Math.pow(t0, 3) * p3;
              
    return val;
};


function bezierGetPoint(p1, p2, r0)
{
    var r1 = 1-r0;
    var p0X = p1.nodeX;
    var p0Y = p1.nodeY;
    var p1X = p1.forwardX;
    var p1Y = p1.forwardY;
    var p2X = p2.backwardX;
    var p2Y = p2.backwardY;
    var p3X = p2.nodeX;
    var p3Y = p2.nodeY;
    
    var x = bezierInterpolate(r0, r1, p0X, p1X, p2X, p3X);
    var y = bezierInterpolate(r0, r1, p0Y, p1Y, p2Y, p3Y);        
    
    return {'x':x, 'y':y};
};

Bezier = {

    // this.Point定义了封闭曲线的每一个顶点数据。nodeX(Y)为顶点坐标，
    // forwardX(Y)和backwardX(Y)分别定义了前向曲线和后向曲线的控制点。
    Point: function(x0, y0, x1, y1, x2, y2) {
        this.nodeX = x0;
        this.nodeY = y0;
        this.forwardX = x1;
        this.forwardY = y1;
        this.backwardX = x2;
        this.backwardY = y2;
    },

    interpolate: function(t0, t1, p0, p1, p2, p3)
    {
        return bezierInterpolate(t0, t1, p0, p1, p2, p3);
    }, 
    
    getPoint: function(p1, p2, r0)
    {
        return bezierGetPoint(p1, p2, r0);
    }, 
    
    // 返回线段上指定比例处点的坐标[x,y]
    // 参数
    //   x1,y1,x2,y2: 线段的起始结束点
    //   p: 距离线段起点的百分比
    getLinePt: function(x1, y1, x2, y2, p) {
        var x = x2 - x1;
        var y = y1 - y2;
        return [x1 + x * p, y1 - y * p]
    },

    // 返回贝塞尔点对象(point)及前(后)贝塞尔点后(前)向曲线控制点坐标(backward,forward)
    // 参数
    //   p1,p2: 贝塞尔线段的起始结束点
    //   p: 距离贝塞尔线段起点的百分比
    // 说明
    //   假设A,B为贝塞尔线段上的两个点，a,b分别为A,B两点的控制点
    //   则r1,r2,r3分别为A-a,a-b,b-B线段上距离起点百分比为p的贝塞尔点
    //   r12,r23分别为r1-r2,r2-r3线段上距离起点百分比为p的贝塞尔点
    //   r123为r12-r23线段上距离起点百分比为p的贝塞尔点
    getBezierObj: function(p1, p2, p) {
        var r1 = this.getLinePt(p1.nodeX, p1.nodeY, p1.forwardX, p1.forwardY, p);
        var r2 = this.getLinePt(p1.forwardX, p1.forwardY, p2.backwardX, p2.backwardY, p);
        var r3 = this.getLinePt(p2.backwardX, p2.backwardY, p2.nodeX, p2.nodeY, p);
        var r12 = this.getLinePt(r1[0], r1[1], r2[0], r2[1], p);
        var r23 = this.getLinePt(r2[0], r2[1], r3[0], r3[1], p);
        var r123 = this.getLinePt(r12[0], r12[1], r23[0], r23[1], p);
        return {
            point: { // 贝塞尔点
                nodeX: r123[0],
                nodeY: r123[1],
                forwardX: r23[0],
                forwardY: r23[1],
                backwardX: r12[0],
                backwardY: r12[1]
            },
            forward: {
                x: r1[0],
                y: r1[1]
            },
            // 前贝塞尔点后控制点
            backward: {
                x: r3[0],
                y: r3[1]
            } // 后贝塞尔点前控制点
        };
    },

    // 返回两点间的距离
    // 参数
    //   a, b: 起止点
    getDistance: function(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    },

    // 拆分贝塞尔线段，返回细分点哈希表
    // 参数
    //   data: 贝塞尔路径点集合
    splitCurve: function(data, x) {
        var c;
        var k;
        var p1;
        var p2;
        var l;
        var h = {};
        var n = data.length;
        if (!x) x = 2;//纠偏系数
        for (var i = 0; i < n; i++) {
            p1 = data[i],
            p2 = data[(i + 1 == n) ? 0 : (i + 1)]; // 定义贝塞尔线段端点
            c = this.getBezierObj(p1, p2, 0.5).point;
            // 贝塞尔线段的切分精度，太低了会漏点，太高了可能会造成点与路径的交点重复
            l = Math.round(x * (Math.sqrt(Math.pow(p1.nodeX - c.nodeX, 2) + Math.pow(p1.nodeY - c.nodeY, 2)) + Math.sqrt(Math.pow(c.nodeX - p2.nodeX, 2) + Math.pow(c.nodeY - p2.nodeY, 2))));
            for (var j = 0; j < l; j++) {
                c = this.getBezierObj(p1, p2, j / l);
                k = Math.round(c.point.nodeX) + ',' + Math.round(c.point.nodeY); // 哈希键，如100,200
                if (h[k]) continue; // 跳过已经检测过的键
                c.index = i; // 所属贝塞尔线段索引
                c.ratio = j / l; // 貌似没用
                h[k] = c;
            }
        }
        return h;
    },

    // 删除贝塞尔曲线上指定索引点
    // 参数
    //   index: 顶点索引
    //   data: 为贝塞尔路径点集合
    removeVertex: function(index, data) {
        data.splice(index, 1);
    },

    subDivision2: function(data, index, factor)
    {
        function linearInter(x0, x1, ratio)
        {
            var x = x0 + ratio * (x1 - x0);
            
            return x; 
        }    
        
        points = data;
        var len = points.length;
        var idxPrev = index;
        var idxNext = index+1;
        if(idxNext == len)
            // Loop back
            idxNext = 0; 
        
        var pt = Bezier.getPoint(points[idxPrev], points[idxNext], factor);
        var forward={}, backward={}, sub={}, node={};
        forward.x = linearInter(points[idxPrev].nodeX, points[idxPrev].forwardX, factor);
        forward.y = linearInter(points[idxPrev].nodeY, points[idxPrev].forwardY, factor);
        backward.x =  linearInter(points[idxNext].backwardX, points[idxNext].nodeX, factor);
        backward.y = linearInter(points[idxNext].backwardY, points[idxNext].nodeY, factor);
        var midX = linearInter(points[idxPrev].forwardX, points[idxNext].backwardX, factor);
        var midY = linearInter(points[idxPrev].forwardY, points[idxNext].backwardY, factor);
        
        var node;
        node.backwardX = linearInter(forward.x, midX, factor);
        node.backwardY = linearInter(forward.y, midY, factor);
        node.forwardX = linearInter(midX, backward.x, factor);
        node.forwardY = linearInter(midY, backward.y, factor);
        node.nodeX = linearInter(node.backwardX, node.forwardX, factor);
        node.nodeY = linearInter(node.backwardY, node.forwardY, factor);

        data[idxPrev].forwardX = forward.x;
        data[idxPrev].forwardY = forward.y;
        data[idxNext].backwardX = backward.x;
        data[idxNext].backwardY = backward.y;        
        
        if(index == len - 1)
            points.push(node);
        else
            points.splice(idxNext, 0, node); 
    }, 
    
    // 细分贝塞尔曲线
    // 参数
    //   data: 为贝塞尔路径点集合
    //   vertices: 贝塞尔线段上指定比例点的坐标，控制手柄坐标，顶点控制手柄纠正坐标
    //   index: 顶点索引
    subDivision: function(data, vertices, index) {
        var a = vertices;
        var i = index;
        var n = i + 1;
        if (n == data.length) n = 0;
        data[i].forwardX = a.forward.x;
        data[i].forwardY = a.forward.y;
        data[n].backwardX = a.backward.x;
        data[n].backwardY = a.backward.y;
        a = a.point;
        a = new this.Point(a.nodeX, a.nodeY, a.forwardX, a.forwardY, a.backwardX, a.backwardY);
        data.splice(i + 1, 0, a); // 插入到指定位置
    },

    // 判断一个点是否在指定贝塞尔曲面上
    // 参数
    //   x,y: 要判断的点
    //   data: 贝塞尔路径点集合
    // 说明
    //   从点x,y发射一条射线，判断交点数目，奇数在曲面内，偶数在曲面外
    isInPath: function(x, y, cv) {
      var z=[0,0,0,0];
      var t=[0,0,0,0];
      var max=Hanimation.MAX_VALUE;
      var a={x:x,y:y};
      var b=[{x:0,y:max},{x:0,y:max*-1},{x:max,y:0},{x:max*-1,y:0}];
      var c;
      var d;
      var p;
      var q;
      cv=this.cut(cv);
      for(var i=0;i<cv.length;i++){
        p=cv[i];
        q=cv[(i==cv.length-1)?0:(i+1)];
        c={x:p.nodeX,y:p.nodeY};
        d={x:q.nodeX,y:q.nodeY};
        if(this.getcross(a,b[0],c,d))z[0]++;
        if(this.getcross(a,b[1],c,d))z[1]++;
        if(this.getcross(a,b[2],c,d))z[2]++;
        if(this.getcross(a,b[3],c,d))z[3]++;
      }
      
      //取交点数少的射线交点数，两条射线交点密集时可能会造成重复点。
      return Math.min(z[0], z[1], z[2], z[3]) % 2;
    },

    // 判断一个点是否在指定贝塞尔线段上
    // 如果在指定贝塞尔线段上返回对应点的贝塞尔对象
    // 参数
    //   x,y: 要判断的点，可接受浮点，一般为屏幕坐标整形值
    //   p1,p2: 贝塞尔线段的起始结束点
    isOnBezier: function(x, y, p1, p2) {
        var r;
        var p;
        var x = Math.round(x);
        var y = Math.round(y);
        // 贝塞尔线段的切分精度，暂时取两点间距离的2倍，太低了会漏点，太高了可能会造成点与路径的交点重复
        var l = Math.round(2 * Math.sqrt(Math.pow(p1.nodeX - p2.nodeX, 2) + Math.pow(p1.nodeY - p2.nodeY, 2)));
        for (var i = 0; i < l; i++) { // 循环切片
            p = i / l; // 当前点在贝塞尔线段上的比例
            r = this.getBezierObj(p1, p2, p); // 切片对应贝塞尔对象
            if (Math.round(r.point.nodeX) == x && Math.round(r.point.nodeY) == y) { // 吻合
                r.ratio = p; // 貌似没用
                return r;
            }
        }
    },

    // 判断点和曲线的关系
    // 参数
    //   x,y: 要判断的点
    //   data: 贝塞尔路径点集合
    // 返回值
    //   mode=0时: 不在顶点也不在边界上
    //   mode=1时: 在顶点上
    //     point: 顶点坐标
    //     index: 顶点索引
    //   mode=2时: 在边界上（不在顶点上）
    //     point: 边界坐标
    //     index: 顶点索引
    //     data: 控制点数据
    hitTest: function(x, y, data) {
        var b = this.isInPath(x, y, data);
        var c;
        var z = 4;
        var l = data.length;
        for (var i = 0; i < 2; i++) { // 判断2*z+1区域内四个角是否在曲面内外
            for (var j = 0; j < 2; j++) {
                c = this.isInPath(x + z * (i ? 1 : -1), y + z * (j ? 1 : -1), data);
                if (c != b) break;
            }
            if (c != b) break;
        }
        if (c == b) return {
            mode: 0
        };
        for (var i = 0; i < l; i++) { // 在顶点范围内
            c = data[i];
            c = {
                x: c.nodeX,
                y: c.nodeY
            };
            if (c.x >= x - z && c.x <= x + z && c.y >= y - z && c.y <= y + z) {
                return {
                    mode: 1,
                    point: c,
                    index: i,
                    curve: data
                }
            }
        }
        for (var i = -z; i <= z; i++) { // 在贝塞尔线段上
            for (var j = -z; j <= z; j++) {
                for (var k = 0; k < l; k++) {
                    if (c = this.isOnBezier(x + i, y + j, data[k], data[(k == l - 1) ? 0 : (k + 1)])) {
                        return {
                            mode: 2,
                            point: {
                                x: x + i,
                                y: y + j
                            },
                            index: k,
                            data: c,
                            curve: data
                        }
                    }
                }
            }
        }
        return {
            mode: 0
        };
    },

    // 获取贝塞尔路径集合的边界
    // 参数
    //   arr: 贝塞尔路径集合
    // 返回值
    //   r.top: 上边界
    //   r.right: 右边界
    //   r.bottom: 下边界
    //   r.left: 左边界
    getBoundary: function(arr) {
        var o;
        var a;
        var x;
        var y;
        var r;
        while (o = arr.pop()) {
            o = this.cut(o);
            for (var k in o) {
                a = o[k];
                x = a.nodeX;
                y = a.nodeY;
                if (!r) r = {
                    top: y,
                    right: x,
                    bottom: y,
                    left: x
                };
                if (y < r.top) r.top = y;
                if (y > r.bottom) r.bottom = y;
                if (x < r.left) r.left = x;
                if (x > r.right) r.right = x;
            }
        }
        return r;
    },

    // 叉积
    // 参数
    //   a,b,c: 叉积点
    multiply: function(a,b,c) {
      return((a.x-c.x)*(b.y-c.y)-(b.x-c.x)*(a.y-c.y));
    },

    // 两线段是否相交
    // 参数
    //   a 线段1起点坐标 b 线段1终点坐标 c 线段2起点坐标 d 线段2终点坐标
    iscross: function(a,b,c,d) {
      return (Math.max(a.x,b.x)>=Math.min(c.x,d.x))&&(Math.max(c.x,d.x)>=Math.min(a.x,b.x))
      &&(Math.max(a.y,b.y)>=Math.min(c.y,d.y))&&(Math.max(c.y,d.y)>=Math.min(a.y,b.y))
      &&(this.multiply(c,b,a)*this.multiply(b,d,a)>=0)&&(this.multiply(a,d,c)*this.multiply(d,b,c)>=0)
    },

    // 两线段是否相交，相交则返回交点{x,y}
    // 参数
    //   a 线段1起点坐标 b 线段1终点坐标 c 线段2起点坐标 d 线段2终点坐标
    getcross: function(a,b,c,d) {
      if(this.iscross(a,b,c,d)){
        return {
          x:((b.x-a.x)*(c.x-d.x)*(c.y-a.y)-c.x*(b.x-a.x)*(c.y-d.y)+a.x*(b.y-a.y)*(c.x-d.x))/((b.y-a.y)*(c.x-d.x)-(b.x-a.x)*(c.y-d.y)),
          y:((b.y-a.y)*(c.y-d.y)*(c.x-a.x)-c.y*(b.y-a.y)*(c.x-d.x)+a.y*(b.x-a.x)*(c.y-d.y))/((b.x-a.x)*(c.y-d.y)-(b.y-a.y)*(c.x-d.x))
        }
      }
      /*
      if((Math.abs(a.x-b.x)+Math.abs(a.y-b.y)==0)||(Math.abs(c.x-d.x)+Math.abs(c.y-d.y)==0))return;//共点
      if((b.y-a.y)*(c.x-d.x)-(b.x-a.x)*(c.y-d.y)==0)return;//平行
      var x=((b.x-a.x)*(c.x-d.x)*(c.y-a.y)-c.x*(b.x-a.x)*(c.y-d.y)+a.x*(b.y-a.y)*(c.x-d.x))/((b.y-a.y)*(c.x-d.x)-(b.x-a.x)*(c.y-d.y));
      var y=((b.y-a.y)*(c.y-d.y)*(c.x-a.x)-c.y*(b.y-a.y)*(c.x-d.x)+a.y*(b.x-a.x)*(c.y-d.y))/((b.x-a.x)*(c.y-d.y)-(b.y-a.y)*(c.x-d.x));
      if((x-a.x)*(x-b.x)<=0&&(x-c.x)*(x-d.x)<=0&&(y-a.y)*(y-b.y)<=0&&(y-c.y)*(y-d.y)<=0)return{x:x,y:y};//相交
      */
    },

    // 线段的斜率
    // 参数
    //   a 线段1起点坐标 b 线段1终点坐标
    slope: function(a,b) {
        var x=b.x-a.x;
        var y=b.y-a.y;
        var z=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        return (Math.asin(x/z)*180/Math.PI)||0;
    },

    // 两线段夹角
    // 参数
    //   a 线段1起点坐标 b 线段1终点坐标 c 线段2起点坐标 d 线段2终点坐标
    angle: function(a,b,c,d) {
      return Math.abs(this.slope(a,b)-this.slope(c,d));
    },

    // 两线段是否平行
    // 参数
    //   a 线段1起点坐标 b 线段1终点坐标 c 线段2起点坐标 d 线段2终点坐标
    isrep: function(a,b,c,d) {
      return (b.y-a.y)*(c.x-d.x)==(b.x-a.x)*(c.y-d.y);
    },
    
    // 两贝塞尔线段细分后的最近点
    // 参数
    //   up1,up2: 贝塞尔线段
    //   vp1,vp2: 贝塞尔线段
    nearest: function(up1,up2,vp1,vp2) {
      var a1=this.cuts(up1,up2,0.5);
      var a2=this.cuts(vp1,vp2,0.5);
      a1.unshift(up1);
      a2.unshift(vp1);
      a1.push(up2);
      a2.push(vp2);
      var min;
      var n;
      var p1;
      var p2;
      for(var i=0;i<a1.length;i++){
        for(var j=0;j<a2.length;j++){
          n=this.getDistance({x:a1[i].nodeX,y:a1[i].nodeY},{x:a2[j].nodeX,y:a2[j].nodeY});
          if(!min)min=n;
          if(n<min){
            min=n;
            p1=a1[i];
            p2=a2[j];
            p1.cross=p2;
            p2.cross=p1;
          }
        }
      }
      return [p1,p2];
    },

    // 求两贝塞尔点间离指定点最近的点
    // 参数
    //   p1,p2: 贝塞尔点
    //   pt: 指定点
    getnear:function(p1,p2,pt){
      var o;
      var p;
      var i=1;
      var center;
      var jump=0.5;
      var ratio=0.5;
      var start={x:p1.nodeX,y:p1.nodeY};
      while(true){
        if(++i>=1000)break;//防止死循环
        o=this.getBezierObj(p1,p2,ratio);
        p=o.point;
        center={x:p.nodeX,y:p.nodeY};
        if(this.getDistance(pt,center)<0.1){
          o=new this.Point(p.nodeX, p.nodeY, p.forwardX, p.forwardY, p.backwardX, p.backwardY);
          o.ratio=ratio;//更新游标值，以便根据游标计算子点相对主点的偏移
          o.index=p1.index;//更新索引值，以便查询是哪个主点上的子点
          return o;
        }
        jump=jump*0.5;
        ratio+=jump*((this.getDistance(pt,start)<=this.getDistance(center,start))?-1:1);
      }
    },
    
    // 扩展贝塞尔曲线，寻找交点
    // 参数
    //   cv1,cv2: 贝塞尔曲线
    extend: function(cv1,cv2) {
      var cvs=[this.cut(cv1),this.cut(cv2)];
      var len1=cvs[0].length;
      var len2=cvs[1].length;
      var index;
      var ratio;
      var cross1;
      var cross2;
      var a;
      var b;
      var c;
      var d;
      var p;
      var p1;
      var p2;
      var q1;
      var q2;
      var cv;
      var crs=[[],[]];
      for(var i=0;i<len1;i++){
        for(var j=0;j<len2;j++){
          p1=cvs[0][i];
          p2=cvs[0][(i==len1-1)?0:(i+1)];
          q1=cvs[1][j];
          q2=cvs[1][(j==len2-1)?0:(j+1)];
          a={x:p1.nodeX,y:p1.nodeY};
          b={x:p2.nodeX,y:p2.nodeY};
          c={x:q1.nodeX,y:q1.nodeY};
          d={x:q2.nodeX,y:q2.nodeY};
          if(p=this.iscross(a,b,c,d)){
            if(this.isrep(a,b,c,d)){//两线段重合
              
              d=this.getnear(p1,p2,d);
              a=this.getnear(q1,q2,a);

              a.nodeX=p1.nodeX;
              a.nodeY=p1.nodeY;
              d.nodeX=q2.nodeX;
              d.nodeY=q2.nodeY;
              
              cv1[i].cross=a;
              a.cross=cv1[i];
              cv2[(j==len2-1)?0:(j+1)].cross=d;
              d.cross=cv2[(j==len2-1)?0:(j+1)];
              crs[0].push(d);
              crs[1].push(a);
              crs[0].splice(1,2);
              crs[1].splice(1,2);
            }else{
              if(p=this.nearest(p1,p2,q1,q2)){
                for(var n=0;n<=1;n++){
                  c=crs[n];
                  b=0;
                  for(var k=0;k<c.length;k++){
                    if(c[k].index==p[n].index&&c[k].ratio>p[n].ratio){
                      c.splice(k,0,p[n]);
                      b=1;
                      break;
                    }
                  }
                  if(!b)crs[n].push(p[n]);
                }
              }
            }
          }
        }
      }

      for(var n=0;n<=1;n++){
        cv=n?cv2:cv1;
        index=0;
        for(var i=0;i<cv.length;i++){
          p1=cv[i];
          p2=cv[(i==cv.length-1)?0:(i+1)];
          for(var j=0;j<crs[n].length;j++){
            c=crs[n][j];
            if(this.getDistance({x:p1.nodeX,y:p1.nodeY},{x:c.nodeX,y:c.nodeY})<0.5){
              p1.cross=c.cross;
              c.cross.cross=p1;
              crs[n].splice(j,1);
              continue;
            }
            if(this.getDistance({x:p2.nodeX,y:p2.nodeY},{x:c.nodeX,y:c.nodeY})<0.5){
              p2.cross=c.cross;
              c.cross.cross=p2;
              crs[n].splice(j,1);
              continue;
            }
            if(c.index==index){
              p=this.getBezierObj(p1,p2,p1.ratio?((c.ratio-p1.ratio)/(1-p1.ratio)):c.ratio);
              p1.forwardX=p.forward.x;
              p1.forwardY=p.forward.y;
              p2.backwardX=p.backward.x;
              p2.backwardY=p.backward.y;
              p=p.point;
              c.forwardX=p.forwardX;
              c.forwardY=p.forwardY;
              c.backwardX=p.backwardX;
              c.backwardY=p.backwardY;
              cv.splice(i+1,0,c);
              crs[n].splice(j,1);
              index--;
            }
          }
          index++;
        }
      }
      for(var n=0;n<=1;n++){
        cv=n?cv2:cv1;
        for(var i=0;i<cv.length;i++){
          c=cv[i];
          c.next=cv[(i==cv.length-1)?0:(i+1)];
          c.prev=cv[(i||cv.length)-1];
          delete(c.index);
          delete(c.ratio);
        }
      }
      return [cv1,cv2];
    },

    // 线段法拆分贝塞尔曲线
    // 参数
    //   cv: 贝塞尔曲线
    cut: function(cv) {
      var n;
      var p;
      var p1;
      var p2;
      var a=[];
      var index=0;
      var l=cv.length;
      for(var i=0;i<l;i++){//复制
        p=cv[i];
        p = new this.Point(p.nodeX, p.nodeY, p.forwardX, p.forwardY, p.backwardX, p.backwardY);
        a.push(p);
      }
      for(var i=0;i<l;i++){
        n=i+1;
        if(n==l)n=0;
        p1=a[i];
        p2=a[n];
        p1.index=index++;
        p=this.cuts(p1,p2);//细分每一段曲线
        if(n=p.length){
          for(var j=0;j<n;j++){
            a.splice(i+j+1,0,p[j]);
          }
          l+=n;
          i+=n;
        }
      }
      return a;
    },

    // 细分两贝塞尔点
    // 参数
    //   p1,p2: 贝塞尔点
    //   min: 最小拆分距离
    cuts: function(p1,p2,min) {
      var n;
      var p;
      var a=[p1,p2];
      var l=2;
      for(var i=0;i<l-1;i++){
        p1=a[i];
        p2=a[i+1];
        if(p=this.put(p1,p2,min)){
          p1.forwardX = p.forward.x;//更新前后向点
          p1.forwardY = p.forward.y;
          p2.backwardX = p.backward.x;
          p2.backwardY = p.backward.y;
          p = p.point;
          p = new this.Point(p.nodeX, p.nodeY, p.forwardX, p.forwardY, p.backwardX, p.backwardY);
          p.ratio=((p1.ratio||0)+(p2.ratio||1))/2;//更新游标值，以便根据游标计算子点相对主点的偏移
          p.index=p1.index;//更新索引值，以便查询是哪个主点上的子点
          a.splice(i+1,0,p);
          l++;
          i--;
        }
      }
      a.pop();
      a.shift();
      return a;
    },

    // 二分两贝塞尔点
    // 参数
    //   p1,p2: 贝塞尔点
    //   min: 最小拆分距离
    put: function(p1, p2, min) {
      var b;
      var l=this.getDistance({x:p1.nodeX,y:p1.nodeY},{x:p2.nodeX,y:p2.nodeY});
      if(l<0.5)return;
      if(min&&l>min)b=1;//超过最小拆分距离
      if(!b){
        p={x:p1.nodeX,y:p1.nodeY};
        q={x:p2.nodeX,y:p2.nodeY};
        m={x:p1.forwardX,y:p1.forwardY};
        n={x:p2.backwardX,y:p2.backwardY};
        if(p.x==m.x&&p.y==m.y&&q.x==n.x&&q.y==n.y)return;//两贝塞尔点与控制点都重合
        if(this.getcross(p,q,m,n))b=1;//两贝塞尔点互斥
      }
      if(!b){
        if(this.angle(p,q,p,m)+this.angle(q,p,q,n)>10)b=1;//角度大于阙值
      }
      if(b)return this.getBezierObj(p1, p2, 0.5);//求二分点
    },

    // 返回两条贝塞尔曲线是否相交
    // 参数
    //   cv1,cv2: 贝塞尔曲线
    isCross: function(cv1, cv2) {
      var cvs=[this.cut(cv1),this.cut(cv2)];
      var len1=cvs[0].length;
      var len2=cvs[1].length;
      var a;
      var b;
      var c;
      var d;
      var p;
      var p1;
      var p2;
      var q1;
      var q2;
      for(var i=0;i<len1;i++){
        for(var j=0;j<len2;j++){
          p1=cvs[0][i];
          p2=cvs[0][(i==len1-1)?0:(i+1)];
          q1=cvs[1][j];
          q2=cvs[1][(j==len2-1)?0:(j+1)];
          a={x:p1.nodeX,y:p1.nodeY};
          b={x:p2.nodeX,y:p2.nodeY};
          c={x:q1.nodeX,y:q1.nodeY};
          d={x:q2.nodeX,y:q2.nodeY};
          if(this.getcross(a,b,c,d))return true;
        }
      }
    },
    // 返回两条贝塞尔曲线交点
    // 参数
    //   d1,d2: 贝塞尔曲线
    getCrossPoints: function(d1, d2) {
        var c;
        var r=[];
        var a=this.extend(d1, d2)[0];
        while(c=a.pop())if(c=c.cross)r.push(c);
        return r;
    },

    // 检测两条贝塞尔曲线是否重合
    // 参数
    //   d1,d2: 贝塞尔曲线
    isSame: function(d1,d2) {
      var a;
      var b;
      var len=d1.length;
      if(len==d2.length){
        for(var i=0;i<len;i++){
          a=d1[i];
          b=d2[i];
          if(a.nodeX==b.nodeX&&a.nodeY==b.nodeY
          &&a.forwardX==b.forwardX&&a.forwardX==b.forwardX
          &&a.backwardX==b.backwardX&&a.backwardX==b.backwardX
          )return true;
        }
      }
    },

    // 对矩形进行特殊处理，避免重合时出现的一些问题
    // 参数
    //   d1,d2: 贝塞尔曲线
    resetRect: function(d1,d2,type) {
      var a;
      var b=0.3;
      if(d1.length==4&&d2.length==4){
        for(var i=0;i<4;i++){
          a=d1[i];
          a.nodeX+=b;
          a.nodeY+=b;
          a.forwardX+=b;
          a.forwardY+=b;
          a.backwardX+=b;
          a.backwardY+=b;
        }
      };
    },

    // 合并多条贝塞尔曲线
    // 参数
    //   arr: 贝塞尔曲线集合
    //   type: 1.合并 2.相交 3.裁切
    mergeCurves: function(arr, type) {
        var r;
        var c;
        var d=[];
        var a = arr.pop();
        while (c = arr.pop()) {
            r = this.combineCurves(a, c, type);
            if (!arr.length) return r.concat(d);
            a = r.pop();
            d=d.concat(r);
        }
        return r.concat(d);
    },

    // 合并两条贝塞尔曲线
    // 参数
    //   d1,d2: 贝塞尔路径点集合
    //   type: 1.合并 2.相交 3.裁切
    combineCurves: function(d1, d2, type) {
        //if(this.isSame(d1, d2))
        //return (type==1)?[d2]:[];
        //this.resetRect(d1, d2, type);
        var arr=this.extend(d1, d2);
        d1=arr[0];
        d2=arr[1];
        if (!d1 || !d2 || d1.length < 2 || d2.length < 2) return;
        var b;
        var c;
        var r;
        var x;
        var y;
        var pt;
        var bx;
        var by;
        var i = 0;
        var ra = [];
        //返回
        var ca = [];
        //交点
        var startPt;
        //起点
        var isBack;
        // 反转标志
        var isMain;
        // 当前路径
        while (i < d1.length) {
            c = d1[i++];
            if (c.cross) ca.push(c);
        }; // 寻找交点
        if (!ca.length) { // 无交点返回
            x = this.isInPath(d2[0].nodeX, d2[0].nodeY, d1);
            y = this.isInPath(d1[0].nodeX, d1[0].nodeY, d2);
            switch (type) {
              case 3:
                  if (x || y) return [d1, d2]; // 裁切
              case 2:
                  if (x) return [d2];
                  if (y) return [d1]; // 相交
              case 1:
              default:
                  if (x) return [d1];
                  if (y) return [d2];
                  return [d1, d2]; // 合并
            }
            return [];
        }
        while (ca.length) { // 还有未合并交点
            r = [];
            pt = ca[0];
            startPt = ca[0]; // 起点
            while (true) { // 遍历节点
                if (r.length > 1 && (pt == startPt || pt == startPt.cross)) break; // 结束判断
                r.push(pt);
                for (var j = ca.length - 1; j >= 0; j--) {
                    c = isMain ? pt.cross: pt;
                    if (ca[j] == c) ca.splice(j, 1);
                }
                c = pt[isBack ? 'prev': 'next'];
                b = (Math.abs(Math.round(c.nodeX) - Math.round(pt.nodeX)) < 3 && Math.abs(Math.round(c.nodeY) - Math.round(pt.nodeY)) < 3) ? c: this.getBezierObj(isBack ? c: pt, isBack ? pt: c, 0.06).point;
                b = this.isInPath(b.nodeX, b.nodeY, isMain ? d1: d2); // 检测当前方向是否在另一路径中
                switch (type) {
                    case 1:
                        if (b) isBack = !isBack;
                        break; // 合并
                    case 2:
                        if (!b) isBack = !isBack;
                        break; // 相交
                    case 3:
                        if ((!isMain && b) || (isMain && !b)) isBack = !isBack;
                        break; // 裁切
                }
                if (isBack) { // 反向时修改前向控制点
                    pt.forwardX = bx || pt.backwardX;
                    pt.forwardY = by || pt.backwardY;
                }
                bx = 0;
                by = 0;
                while (pt = pt[isBack ? 'prev': 'next']) { // 遍历节点
                    if (c = pt.cross) { // 交点
                        isMain = !isMain; // 反转路径
                        bx = c.backwardX;
                        by = c.backwardY; // 缓存后向控制点
                        c.backwardX = pt[isBack ? 'forwardX': 'backwardX']; // 修改后向控制点
                        c.backwardY = pt[isBack ? 'forwardY': 'backwardY'];
                        pt = c;
                        break;
                    }
                    if (isBack) { // 反向时交换前后向控制点
                        x = pt.backwardX;
                        pt.backwardX = pt.forwardX;
                        pt.forwardX = x;
                        y = pt.backwardY;
                        pt.backwardY = pt.forwardY;
                        pt.forwardY = y;
                    }
                    r.push(pt);
                    if(r.length>300){alert(Hanimation.Message.BezierError);return [];}; // 交点太多，直接返回
                }
            }
            for (var i = 0; i < r.length; i++) delete(r[i].cross); // 清除交点引用
            ra.push(r);
        }
        return ra;
    }
};

Mugeda = {
    // frameLength: 1,
    frameCache: {},//帧缓存
    data: {},//动画数据缓存
    trackHash: {},//图片跟踪url缓存
    isSetTrack:false,
    frameId: 0, 
	preview: true,
    /// hitLink:null,
    useTouch:false,
	mapNameId:[], 
	mapIdName:[],
	frameLength:0,
	useManul:false,
	manualControl:false,
	prevPos: {},
    mraidState: null,
    aniData: null,
    cleanRender:false,
    emptyImg: "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    
    setViewport: function(w,h,mode)
    {
        viewport = document.querySelector("meta[name=viewport]");
        if(viewport)
            viewport.setAttribute('content', 'width='+w);
    },
    
	scanAniData: function(anidata)
	{
        var layers=anidata.layers;
        window.aniLayers = layers;
        this.aniLayers = layers;
        for (var i = layers.length - 1; i >= 0; i--) {
            var units = layers[i].units;
            for (var j = 0; j < units.length; j++) {
                var objects = units[j].objects;
                for (var k = 0; k < objects.length; k++) {
                    var obj = objects[k];
                    if(obj.param.action == "behavior" && obj.param.behavior)
                        Mugeda.manualControl = true;
                }
            }
        }
	},
	
	loadUrl: function(params){
		return MugedaMraid.loadUrl(params);
	},
	
    updateViewport: function(mode){
        var getWindowSize = (function() {
          var docEl = document.documentElement,
              IS_BODY_ACTING_ROOT = docEl && docEl.clientHeight === 0;

          // Used to feature test Opera returning wrong values 
          // for documentElement.clientHeight. 
          function isDocumentElementHeightOff () { 
              var d = document,
                  div = d.createElement('div');
              div.style.height = "2500px";
              d.body.insertBefore(div, d.body.firstChild);
              var r = d.documentElement.clientHeight > 2400;
              d.body.removeChild(div);
              return r;
          }

          if (typeof document.clientWidth == "number") {
             return function () {
               return { width: document.clientWidth, height: document.clientHeight };
             };
          } else if (IS_BODY_ACTING_ROOT || isDocumentElementHeightOff()) {
              var b = document.body;
              return function () {
                return { width: b.clientWidth, height: b.clientHeight };
              };
          } else {
              return function () {
                return { width: docEl.clientWidth, height: docEl.clientHeight };
              };
          }
        })();  

        var data = this.aniData;
        var sz = getWindowSize();
        var srcRatio = data.width/data.height;
        var desRatio = sz.width/sz.height;
        if(srcRatio > desRatio)
        {
            Mugeda.setViewport(data.width, data.height);
        }
        else
        {
            var w =  Math.floor(sz.width * data.height / sz.height);
            Mugeda.setViewport(w, sz.height);
        } 
    }, 
    
	removeIdName: function(id, name, sceneId){
		var nowName = Mugeda.mapIdName[id];
        var prefix = '';
        if(sceneId && sceneId.length)
            prefix = sceneId + "_";

		var nowId = Mugeda.mapNameId[prefix+name];
		
		if(nowId)
			delete Mugeda.mapNameId[prefix+name];
		if(nowName)
			delete Mugeda.mapIdName[id];
    }, 
	
	setIdName: function (obj, name, mode, sceneId){
        
		if(!(obj && typeof name == "string"))
			return; 
            
		var id=obj.guid;
		var re = 0;	
        var empty = name.length == 0;
		var nowName = this.mapIdName[id];
        
        var rawName = name;
        
        // TODO: Unify the way the naming routine for both CSS3 and canvas animations. 
        var prefix = '';
        if(sceneId && sceneId.length)
            prefix = sceneId + "_";
            
		var nowId = empty ? undefined : this.mapNameId[prefix+name];
		
        if(empty){
            // New name is empty, meaning we want to delete the name
            if(nowName)
                delete this.mapNameId[prefix+nowName];
                
            return 0;
        }
        else{
            if(nowId == undefined){
                if(rawName != nowName)
                {
                    this.mapNameId[prefix+name] = id;
                    this.mapIdName[id] = rawName;
                    if(nowName)
                        delete this.mapNameId[prefix+nowName];
                }
            }
            else if(mode == 1)
            {
                var items = rawName.split('_');
                var start =1;

                if(items.length > 1)
                {
                    var base = items[0];
                    var idx = parseInt(items[1]);
                    if(isNaN(idx) || idx<=0)
                        idx=1;
                        
                    start = idx;
                }	
                else
                    base = rawName;
                    
                while(this.mapNameId[prefix+base+'_'+start])start++;
                rawName = base +'_'+ start;
                this.mapNameId[prefix+name] = id;
                this.mapIdName[id] = rawName;
                obj.param.name = rawName;
            }
            else if(mode == 2)
            {
                if(rawName != nowName)
                {
                    this.mapNameId[prefix+name] = id;
                    this.mapIdName[id] = rawName;
                    if(nowName)
                        delete this.mapNameId[prefix+nowName];
                }			
            }
            else 
                re = 1;
        }
        
        return re;
    },
	
    setImageCacheCallback: function(callback){
        Hanimation.ImageCacheCallback = callback; 
    }, 
    
    setAudioCallback: function(callback){
        Hanimation.AudioCallback = callback; 
    },
    
    /*    
    trackAction: function(url, action) {
        MugedaTracker.fireEvent({
            category:"interaction", 
            action:action.action,
            label:action.label, 
            value:action.value
        });
        
        var divTrack = document.getElementById('divMugedaTrack');
        if(!divTrack)
        {
            divTrack=document.createElement('div');
            divTrack.id = 'divMugedaTrack';
            divTrack.style.display='none';
            document.body.appendChild(divTrack);
		}
        
		try{
            params = 'guid='+guidGen()+'&urid='+this.aniData.urid+'&crid='+this.aniData.crid;
            
            var first = true;
            for(item in action)
            {
                params += '&' + item +'='+ action[item];
            }
            
            var idx = url.indexOf('?');
            if(idx < 0)
            {
                url = url + ((idx < 0) ? "?" : "&") + params;
            }
			var img=new Image();
			img.src=url;
			divTrack.appendChild(img);
            
            img.onerror = function(){
                img.src=Mugeda.emptyImg;
            }	
		}catch(e){
            // alert(e.toString());
        }
    }, 
    */
    
    setTrackAnchors: function(data) {
        if(this.isSetTrack)return;
        this.isSetTrack=true;
		var urls=data.trackAnchors||[];
		var mugedaTracks=Hanimation.MugedaTrackAnchors||[];
        if(mugedaTracks.length){
            urls=urls.concat(mugedaTracks);
        }
		if(!urls.length)return;
		var div=document.createElement('div');
		div.style.display='none';
		document.body.appendChild(div);
		
        var guid = guidGen();
        
        var ucid = '&urid='+data.urid+'&crid='+data.crid;
		try{
			for(var k in urls){
				var url=urls[k];
                var hasParam = url.indexOf('?');
                if(hasParam < 0)
                    url += '?guid='+guid + ucid;
                else
                    url += '&guid='+guid + ucid;
                    
				if(url&&!this.trackHash[url]){
					var img=new Image();
					img.src=url;
					div.appendChild(img);
					this.trackHash[url]=true;
                    
                    img.onerror = function(){
                        img.src=Mugeda.emptyImg;
                    }
				}
			}
		}catch(e){
            // alert(e.toString());
        }
    }, 
    
    createclip:function(symbol,objs,x,y){
        var bound=Symbol.getBoundary(objs);
        var obj = createNewObject(Hanimation.SHAPE_CLIP);
        var param = obj.dataRef.param;
        param.symbolId = symbol.id;

        param.offsetX = bound.left - symbol.cw / 2;
        param.offsetY = bound.top - symbol.ch / 2;

        param.startX = (x || 0) + param.offsetX;
        param.startY = (y || 0) + param.offsetY;
        param.left = param.startX;
        param.top = param.startY;

        param.endX = param.startX + bound.width;
        param.endY = param.startY + bound.height;
        param.right = param.endX;
        param.bottom = param.endY;

        param.width = bound.width;
        param.height = bound.height;
        
        // Update object name hashing
        var len = objs.length;
        for(var i=0;i<len;i++){
            var o = objs[i];
            if(o.param.name)
                Mugeda.setIdName(o, o.param.name, 0, symbol.id); 
        }

        return obj;
    },
  
    createNewInstance: function(name, options){
        var options = options || {};
        
        var symbols = Symbol.getSymbolsByName(name);
        var instance = null;
        if(symbols && symbols.length)
        {
            var symbol = symbols[0];
            var layers=symbol.layers;
            var objs=Symbol.getLayersObjects(layers);

            var obj=Mugeda.createclip(symbol, objs, 0, 0);
            var param = obj.getParam();
            options.offsetX = param.offsetX;
            options.offsetY = param.offsetY;

            if(!options.above && !options.below)
            {
                var layerIdx = 0;
                var frameIdx = window.currentFrame;
                var layer = this.aniData.layers[layerIdx];
                len = layer.units.length;
                
                // Get the first qualified timeline unit to accomodate the object. 
                var frames = null;
                var tmUnit;
                var unit = null;
                for (var i = 0; i < len; i++) {
                    tmUnit = layer.units[i];
                    if (tmUnit && frameIdx >= tmUnit.frameStart && frameIdx < tmUnit.frameStart + tmUnit.frameCount) {
                        unit = tmUnit;
                        break;
                    }
                }
                
                if(!unit || unit.animated)
                {
                    var layer = createNewLayer(layerIdx, data.layers);
                    unit = layer.units[0];
                }
                
                TimelineUnit.addObject(unit, obj);
            }

            this.processObjectOptions(obj, options);
            instance = obj;
        }
        
        return instance;
    }, 
    
    getLayerObj: function(layers, layerid) {
        var layer = null;
        for(var i=layers.length-1;i>=0;i--){
          if(layers[i].id==layerid)
          {
            layer = layers[i];
            break;
          }
        }
        
        return layer;
    },
    
    getTimelineUnit: function(layers, layerid, frameid) {
        var object = null;
        var len = layers.length;
        //if (layerid < 0 || layerid >= len) return null;

        var layer = Mugeda.getLayerObj(layers, layerid);
        if(!layer || !layer.units)
            return null; 
            
        len = layer.units.length;
        var frames = null;
        var tmUnit;

        for (var i = 0; i < len; i++) {
            tmUnit = layer.units[i];
            if (tmUnit && frameid >= tmUnit.frameStart && frameid < tmUnit.frameStart + tmUnit.frameCount) {
                object = tmUnit;
                break;
            }
        }

        return object;
    }, 
    
    processObjectOptions: function(obj, options){
        if(!options)
            return; 
            
        if(options.above)
        {
            var above = options.above;
            var layerId = above.layerId;
            var frameId = above.frameId;
            var tmUnit = Mugeda.getTimelineUnit(this.aniData.layers, layerId, frameId);
            TimelineUnit.addObject(tmUnit, obj, false, null, above);
        }
        else if(options.below)
        {
            var above = options.above;
            var layerId = above.layerId;
            var frameId = above.frameId;
            var tmUnit = Mugeda.getTimelineUnit(this.aniData.layers, layerId, frameId);
            TimelineUnit.addObject(tmUnit, obj, false, null, above);
        }
        
        if(options.rotation != undefined)
            obj.setRotation(options.rotation);

        if(options.visible != undefined)
            obj.setVisible(options.visible);
            
        if(options.scaleX != undefined && options.scaleY != undefined)
            obj.setScaleFactor(options.scaleX, options.scaleY);
            
        if(options.left != undefined && options.top != undefined)
        {
            var mode = options.positionMode;
            var left = options.left;
            var top = options.top;
            if(mode == 1)
            {
                left += options.offsetX;
                top += options.offsetY;
            }   

            obj.setPosition(left, top);
        }
            
    },
    
    duplicateObjectByName: function(name, options){
        var obj = Mugeda.getObjectByName(name);
        var newObj = null;
        if(obj)
        {
            var layerId = obj.layerId;
            var frameId = obj.frameId;
            var tmUnit = Mugeda.getTimelineUnit(this.aniData.layers, layerId, frameId);

            var objdata = obj.dataRef;
            
            if(objdata)
            {
                newObj = duplicateObject(objdata, layerId, frameId, false, 1);
                
                if(options.above == undefined)
                {
                    TimelineUnit.addObject(tmUnit, newObj);
                }
                
                this.processObjectOptions(newObj, options);
            };
        }
        
        return newObj;
    }, 
    
    deleteObjectByName: function(name, options){
        var re = -1;
        options = options || {};
        var sceneId = options.sceneId;
        var obj = Mugeda.getObjectByName(name);
        if(obj)
        {
            var layerId = obj.layerId;
            var frameId = obj.frameId;
            var tmUnit = Mugeda.getTimelineUnit(this.aniData.layers, layerId, frameId);
            if(tmUnit)
            {
                var objCount = tmUnit.objects.length;
                for (var k = objCount-1; k >=0; k--) {
                    var objSeed = getAniObject(tmUnit.objects[k]);
                    if (objSeed == obj) {
                        Mugeda.removeIdName(tmUnit.objects[k].guid, tmUnit.objects[k].param.name, sceneId);
                        tmUnit.objects.splice(k, 1);
                        re = 0;
                        if(tmUnit.animated)
                        {
                            tmUnit.animated = false;
                            // TODO: resetAnimationPath
                        }
                        
                        break;
                    }
                }
            }
        }
        
        return re;
    },
    
    createUnit: function(layer, s, c) {
        var unit_param = {
            id: guidGen(),
            layerId: layer ? layer: 0,
            frameStart: s ? s: 0,
            frameCount: c ? c: 1,

            animated: false,
            visible: true,
            objects: [],

            keyframes: [],
            hashKey: []
        };

        return unit_param;
    },
    
    createLayer: function(layer) {
        
        var id = layer ? layer: 0;
        
        var layer_param = {
            id: id,
            name: Lang["LayerAttr"] + id,
            hide: false,
            lock: false,
            units: []
        };

        return layer_param;
    },
    
    createNewLayer: function(before, layers) {
        var layerid=-1;
        var before=before ? before : 0
        var layers = layers ? layers : window.aniLayers;
        var ids = [layerid];
		var maxFrame = Mugeda.getFrameLength(layers);
        
        for(var i=0;i<layers.length;i++){
          ids.push(layers[i].id);
        }
        layerid=Math.max.apply(Math,ids);
        layerid++;
        
        var layer = Mugeda.createLayer(layerid);
        var unit = Mugeda.createUnit(layerid);
		unit.frameCount = maxFrame;
        TimelineUnit.addKeyframe(unit, unit.frameStart);
        layer.units.push(unit);
        
        if(before){
            var lay = layers[before-1];
            if(lay.maskMode != undefined && lay.maskMode!=0){
                layer.maskMode=2;
            }
        }
        layers.splice(before,0,layer);
        
        return layer;
    },
    
    startAnimation: function(canvas, data) {
        var startTime = new Date();
        var prevFrame = -1;
        startTime = startTime.getTime();
        var tick = 0; 
        var canvas = canvas; 
        var aniData = data; 
        this.aniData = data;
        
        Mugeda.setTrackAnchors(data); 
        Mugeda.setupInput(data); 
        
        Mugeda.scanAniData(aniData);
        
        var hasScript = (aniData.script && aniData.script.length);
        var fpms = 0.001 * aniData.rate;
        window.currentFrame = 0; 
        var span = 1000/aniData.rate;
        var len=this.getFrameLength(aniData.layers);    

        var reqAnimFrame = 
            window.mozRequestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame     ||
            window.oRequestAnimationFrame      ||
            window.requestAnimationFrame;
        
        
        function _request(){

            if(window.isEnd)return;
            
            var currentFrame;
            var now = new Date();
            var diff = now.getTime() - startTime;
            
            // Force manual timing control for now. 
            // TODO: when do we need automatic (non manual) control? 
            var manual = true; // hasScript || Mugeda.manualControl;
            if(manual){
                currentFrame = window.currentFrame;
                tick++;
                var scheduledTime = span * tick;
				if(scheduledTime < diff)
				{
					var more = Math.floor((diff - scheduledTime)/span);
					tick += more;
					scheduledTime += (span*more);
				};
				
                var residual = scheduledTime - diff;
                setTimeout(_request, residual);
            }
            else{
                if(reqAnimFrame)
                    reqAnimFrame(_request);
                else
                    setTimeout(_request, span);                
                
                currentFrame = Math.round(diff * fpms);
            }
            
            if(manual || (prevFrame != currentFrame))
			{
				if(currentFrame >= len)
                {
                    currentFrame = len - 1;
				}
                
                window.currentFrame = currentFrame;
 
                redrawCanvas({'canvas':canvas,'aniData':aniData,'layers':aniData.layers});
                
                Mugeda.postRender();
                
                if(window.currentFrame>=len){                  
                  // TODO: Why should we reset the starting time? 
                  if(!manual)
                  {
                    tick = 0; 
                    startTime = (new Date()).getTime();
                  }
                  
                  if(aniData.loop!==true){
                    // window.isEnd=true;
                    window.isPause=true;
                    window.currentFrame=len-1;
                    var playObj = G('play_and_pause');
                    if(playObj)
                        playObj.className='c0';
                  }
                  else
                    window.currentFrame = 0;
                }
            }
            
            prevFrame = currentFrame;
        }        

        _request();
    },
    setEventScale: function (scaleX, scaleY) {
        window.eventScale = [scaleX, scaleY];
    },
    getEventPosition: function(data, event, object) {
    
        function getOffset(o){
            var r = {left: o.offsetLeft, top: o.offsetTop}
            for(; o = o.offsetParent; r.left += o.offsetLeft - o.scrollLeft, r.top += o.offsetTop - o.scrollTop);
            return r;
        }
        
        var curX;
        var curY;
        
        if (event.changedTouches) {
            var t = event.changedTouches[0];

            if (t == null) return null;
            
            curX = t.clientX;
            curY = t.clientY;
        } else {
            curX = event.clientX;
            curY = event.clientY;
        }

        var offset = object.offset ? object.offset() : getOffset(object);

        var rawX = curX - offset.left;
        var rawY = curY - offset.top;

		var x = rawX;
		var y = rawY;

		if (window.eventScale) {
		    var eventScaleX = (window.eventScale[0] || 1),
		        eventScaleY = (window.eventScale[1] || 1);

		    //var offset = getOffset(Mugeda.getCanvas())
		    var canvasWidth = Mugeda.getCanvas().width,
                canvasHeight = Mugeda.getCanvas().height;

		    var offsetX = -(canvasWidth / 2) + canvasWidth / 2 * eventScaleX,
                offsetY = -(canvasHeight / 2) + canvasHeight / 2 * eventScaleY;

		    x += offsetX;
		    y += offsetY;

		    x /= eventScaleX;
		    y /= eventScaleY;
		}

		if(data)
		{
			var zoomInfo = Zoom.getZoomInfo(data, this.preview ? window.currentFrame : -1);

			if(!this.preview)
			{
				x += zoomInfo.offsetLeft;
				y += zoomInfo.offsetTop;
			}
			else
			{
				x += zoomInfo.offsetLeft * zoomInfo.zoomLevel;
				y += zoomInfo.offsetTop * zoomInfo.zoomLevel;
			}			
		}
		//console.log(window.eventScale[0],x,y)
        return {
            'x': x,
            'y': y,
            'rawX': rawX,
            'rawY': rawY
        };
    },
    
	getCanvas: function(){
		var canvas = G('previewCanvas');
		return canvas;
	}, 
	
	getObjectByName: function(name, sceneId){
        if(sceneId && sceneId.length)
            name = sceneId + "_" + name;
            
		var guid = this.mapNameId[name];
		var obj = null;
		if(guid)
			obj = getAniObjectById(guid);
			
		return obj;
	}, 
	
    setupInput: function(data, options){
    
        if(data.inputHooked)
            return; 
            
        var isiPad =  navigator.userAgent.match(/iPad/i) != null;
        var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
            
        this.useTouch = isMobile(); // ('ontouchstart' in window);
    
        var canvas = G('previewCanvas');
        
        window.canvasLink = null;
        window.canvasForm = null;
        window.canvasBehavior = null;
        window.currentFrame = 0; 
            
		function updateHitObject(obj, event, mode){
            var position = Mugeda.getEventPosition(data, event, canvas);
			
            if(!position)
                return null; 
                
			var unchanged =  Mugeda.prevMode === mode && Mugeda.prevPos.x == position.x && Mugeda.prevPos.y == position.y;
			if(unchanged)
				return null; 
			
			Mugeda.prevPos.x = position.x;
			Mugeda.prevPos.y = position.y;
			
			var hit = Mugeda.hitStartObj ? Mugeda.hitStartObj : 
				Mugeda.hitTest(data.layers, -1, window.currentFrame, position.x, position.y, canvas);
            
            if(hit)
                hit.position = position;
            
            var csr = "default";
            // obj.hitLink = null;
            obj.hitForm = null;
            obj.behavior = null;
            
            function hasBehaviors(object){
                var yes = false; 
                while(object)
                {
                    var param = object.getParam();
                    yes = ((param.action=='link' || param.action==undefined) && param.url && param.url.length) ||
                          (param.action=='form' && param.form && param.form.length) || 
                          (param.action=='behavior' && param.behavior && param.behavior.length);
                    if(yes)
                        break;
                    else
                        object = object.nestedHitObject;
                }
                
                return yes;
            }
            
            if(hit.object){
                var object = hit.object;
                var aniObject = getAniObject(object);
                var hasBhrs = hasBehaviors(aniObject);
                
                if(hasBhrs)
                    csr = "pointer"; 
                else
                    csr = "default"; 
                    
                var mugedaObjectHit = window.mugedaObjectHit ||　window.objectHit;    
				if(mugedaObjectHit)
				{
                    
					hit.mode = mode;
					hit.event = event;
					hit.position = position;
					mugedaObjectHit(hit, 0);
				}
            }    
            else if(window.canvasLink || window.canvasForm)
                csr = "pointer"; 
            else
            {
                var mugedaObjectHit = window.mugedaObjectHit ||　window.objectHit;    
				if(mugedaObjectHit)
				{
					hit.mode = mode;
					hit.event = event;
					hit.position = position;
                    hit.isCanvas = true;
					mugedaObjectHit(hit, 0);
				}
            }
            
            canvas.style.cursor = csr; 
            
            return hit;
        }
		
		function onMugedaPressDown(event){
            Mugeda.touchMoved = false; 
            
			if(window.mugedaInputEvent)
            {
                var position = Mugeda.getEventPosition(data, event, canvas);
				window.mugedaInputEvent(0, event, position);
            }
            
            // event.preventDefault();            
		}
		
		function onMugedaPressMove(event){
            Mugeda.touchMoved = true;
            
			if(window.mugedaInputEvent)
            {
                var position = Mugeda.getEventPosition(data, event, canvas);
				window.mugedaInputEvent(1, event, position);
            }
            event.returnValue = false;
            if(event.preventDefault)event.preventDefault();
		}
		
		function onMugedaPressUp(event) {
            if(Mugeda.hitStartObj)
            {
				if(Mugeda.hitStartObj.instance)
					handleEvent.call(Mugeda.hitStartObj.instance, event);
                Mugeda.hitStartObj = null;
            }
            else
            {
                // [msm] 引发动画对象的onmouseup事件
                var hit = updateHitObject(this, event, 0);
                if (hit && hit.instance) 
                    handleEvent.call(hit.instance, event);
            }
            
		    if (window.mugedaInputEvent)
            {
                var position = Mugeda.getEventPosition(data, event, canvas);
				window.mugedaInputEvent(2, event, position);
            }
            
            if(Mugeda.touchMoved)
            {
                event.returnValue = false;
                if(event.preventDefault)event.preventDefault();
            }
		}
		
        function onCanvasMouseMove(event){
			// if(!Mugeda.useTouch)
			{
			    Mugeda.hitMoveObj = updateHitObject(this, event, 1);

			    // [msm]引发动画对象的onmousemove事件
			    if (Mugeda.hitMoveObj && Mugeda.hitMoveObj.instance) 
                    handleEvent.call(Mugeda.hitMoveObj.instance, event);
                    
			    // [msm] 引发动画对象的onmouseover与onmouseout事件
			    if (Mugeda.previousHitMoveObj == undefined || (Mugeda.hitMoveObj && Mugeda.hitMoveObj.instance != Mugeda.previousHitMoveObj.instance)) {
			        if (Mugeda.previousHitMoveObj && Mugeda.previousHitMoveObj.instance) {
			            var evt = document.createEvent("MouseEvents");
			            evt.initMouseEvent("mouseout", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			            handleEvent.call(Mugeda.previousHitMoveObj.instance, evt);
			        }
			        Mugeda.previousHitMoveObj = Mugeda.hitMoveObj;
			        if (Mugeda.hitMoveObj.instance) {
			            var evt = document.createEvent("MouseEvents");
			            evt.initMouseEvent("mouseover", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			            handleEvent.call(Mugeda.hitMoveObj.instance, evt);
			        }
			    }

			}	
        }
		
        function onCanvasMouseStart(event){
            
            // if(!Mugeda.useTouch)
			{
				Mugeda.hitStartObj = updateHitObject(this, event, 2);
				Mugeda.hitMoveObj = null;

			    // [msm]引发动画对象的onmousedown事件
				if (Mugeda.hitStartObj && Mugeda.hitStartObj.instance) 
                    handleEvent.call(Mugeda.hitStartObj.instance, event);
			}	
        }
        
        function onCanvasClick(event){
        
            // TODO: Investigate the impact
			// if(Mugeda.useTouch)
			{
				var hit = updateHitObject(this, event, 0);
                if( (!Mugeda.hitStartObj && Mugeda.hitMoveObj) ||
                    (Mugeda.hitStartObj && Mugeda.hitMoveObj && Mugeda.hitStartObj.object != Mugeda.hitMoveObj.object))
                    // Hit object has been changed. Do nothing. 
                    return;

                if (hit && hit.instance) 
                    handleEvent.call(hit.instance, event, "click");
			}

            /*
            var data = this.hitForm || window.canvasForm;
            var behavior = this.behavior || window.canvasBehavior;
            
            var id = '';
            if(hit && hit.object)
            {
                var name = hit.object.param.name;
                if(!name || name.length == 0)
                    id = hit.object.guid;
                else
                    id = name;
            }
            */
            
			var processed = false;
            if(hit && hit.instance) 
                processed = Mugeda.processObjectBehavior(hit.instance, "click");
            
			if(!processed)
				Mugeda.processObjectBehavior(null, "click");
        }

        //[msm]双击事件
        function onMugedaMouseDoubleClick(event) {
            var hit = updateHitObject(this, event, 0);
            if (hit && hit.instance) handleEvent.call(hit.instance, event);
        }

        //[msm]滚轮事件
        function onMugedaMouseWheel(event) {
            var hit = updateHitObject(this, event, 0);
            if (hit && hit.instance) handleEvent.call(hit.instance, event);
        }

        //[msm]处理事件
        function handleEvent(event, type){
            var type = type || event.type;
            if (type == "touchstart") type = "mousedown";
            else if (type == "touchmove") type = "mousemove";
            else if (type == "touchend") type = "mouseup";
            var listeners = this.eventListeners[type];
            
            var position = Mugeda.getEventPosition(data, event, canvas);
            
            if (listeners) {
                for (var i = 0; i < listeners.length; i++) {
                    var rev = listeners[i].call(this, event, position);
                    if (rev == false) {
                        event.stopPropagation();
                    }
                }
            }
        }
        
        if((data.action==undefined || data.action=='link') && data.url && data.url.length > 0)
        {
            window.canvasLink = data.url;
            window.canvasUrlTarget = data.urlTarget;
        }
        else if(data.action=='form' && data.form)
        {
            window.canvasForm = data.form;
        }
        else if(data.action=='behavior' && data.behavior)
        {
            window.canvasBehavior = data.behavior;
        }
        
        Mugeda.touchMoved = false; 
        
        // A quick and dirty workaround for Android 2.3.*, where 
        // window.open may not be triggered by ontouchend. 
        var isAndroid2_3 = window.navigator.userAgent.indexOf('Android 2.3') >= 0;
		if(Mugeda.useTouch)
		{        
			E(onCanvasMouseMove, 'touchmove', canvas);     
			E(onCanvasMouseStart, 'touchstart', canvas);        
			E(onCanvasClick, isAndroid2_3 ? 'click' : 'touchend', canvas);   

			E(onMugedaPressDown, 'touchstart', canvas);				
			E(onMugedaPressMove, 'touchmove', canvas);				
			E(onMugedaPressUp, 'touchend', canvas);	     
		}
		else
		{
			E(onCanvasMouseMove, 'mousemove', canvas); 
			E(onCanvasMouseStart, 'mousedown', canvas);        
			E(onCanvasClick, 'click', canvas); 
			
			E(onMugedaPressDown, 'mousedown', canvas);	
			E(onMugedaPressMove, 'mousemove', canvas);	
			E(onMugedaPressUp, 'mouseup', canvas);
            
		    // [msm]侦听双击事件和轮滚实践
			E(onMugedaMouseDoubleClick, 'dblclick', canvas);
			E(onMugedaMouseWheel, 'mousewheel', canvas);
		}
        
        data.inputHooked = true; 
    },
    
    hitTest: function(layers, layerid, frameid, x, y, mode) {
    
        var layerid = layerid < 0 ? -1 : layerid;
        var layer;
        var objCount = 0;
        var tmUnit;
        var hitObject = null;
		var hitInstance = null;
        var hitRe = Hanimation.HITTEST_NONE;
        var len = layers.length;
        var keyframe;
        var unitCount;
        var layerIdx = -1;
		
        for (var i = len - 1; i >= 0; i--) {
            layer = layers[i];
            if(layerid >= 0 && layerid!=layer.id)continue;
            
            unitCount = layer.units.length;
            for (var j = 0; j < unitCount; j++) {
                tmUnit = layer.units[j];
                if(!(frameid>=tmUnit.frameStart && frameid<tmUnit.frameStart+tmUnit.frameCount))continue;
                
                var objs =tmUnit.objects;
                objCount = objs.length;
                for (var k = objCount - 1; k >= 0; k--) {
					
					// If the object is invisible, skip it. 
					// if(Math.abs(objs[k].param.alpha) < 1E-3)
					// 	continue;
						
                    var obj = getAniObject(objs[k]);
                    hitRe = obj ? obj.hitTest(x, y, 8 + 16) : Hanimation.HITTEST_NONE;
                    if (hitRe != Hanimation.HITTEST_NONE) {
                        hitObject = objs[k];
						hitInstance = obj;
                        layerIdx = i;
                        break;
                    }
                }
				
				if(hitObject)
					break;
            }
			
			// Even though we may have found a hit object. We still need to keep searching to get the topmost hit object. 
        }

        return {
            'object': hitObject,
			'instance': hitInstance, 
            'mode': hitRe,
            'layer':layerIdx
        };
    },
    
    onRenderReady: function(data)
    {
        this.aniData = data;
        // Mugeda.setViewport(data.width, data.height);
        
        Mugeda.setViewport(data.width, data.height);
        // Leave this to developers/designers to add in their own code. 
        // Mugeda.updateViewport();
        
        // 
        MugedaMraid.createHTML5VideoTag();
        
        if(this.preview && window.onMugedaRenderReady)
            window.onMugedaRenderReady();
        else if(this.preview && window.onRenderReady)
            window.onRenderReady();
    },

    // [msm]
    setFrameout: function (callback, frames)
    {
        if (frames == 0) callback.call(this);
        this.frameOutList = this.frameOutList || [];
        var list = this.frameOutList,
            insertPosition = list.length
        if (insertPosition) {
            do {
                if (list[insertPosition - 1].frames <= frames) break;
            }while (insertPosition--)
        }
        if (list[insertPosition]) list[insertPosition].frames -= frames;
        if (insertPosition) frames -= list[insertPosition - 1].frames;
        list.splice(insertPosition, 0, { frames: frames, fun: callback });        
    },
    
    postRender: function()
    {
        var frameUpdated = false;
        
        //[msm]处理setFrameOut列表
        if (this.frameOutList) {
            while (this.frameOutList.length) {
                if (this.frameOutList[0].frames == 1) {
                    var fun = this.frameOutList[0].fun;
                    this.frameOutList.splice(0, 1);
                    fun.call(this);
                    if (this.frameOutList[0]) this.frameOutList[0].frames++;
                }
                else {
                    this.frameOutList[0].frames--;
                    break;
                }
            }
        }
        if(window.mugedaEnterFrame)
            frameUpdated = mugedaEnterFrame(window.currentFrame);
        else if(window.enterFrame)
            frameUpdated = enterFrame(window.currentFrame);
            
        if(!window.isPause && !frameUpdated) window.currentFrame++;    
    },
    
    getAnimationLength: function(name)
    {
        var aniData = Mugeda.getAnimation(name);
        if(!aniData)return 0;
     
        if(aniData.frameLength == undefined)
            aniData.frameLength = Mugeda.getFrameLength(aniData.layers);    
        
        return aniData.frameLength;
    },

    /*!
     * play是最简单最基本的接口。用来在container中播放指定名称的动画。
     *
     * 参数: 
     * name:        动画的名称。至于如何将用户指定的动画名称和数据映射起来，请自行决定。
     * container:   动画播放的位置，例如一个div。注意这个container不是画布canvas。在我
     *              们实现的接口里面，除非有必要，画布应该是对用户不可见的。如果没有提供
     *              container，则使用脚本的父元素(基本上就是js所在的位置)。
     * cacheMode:   缓存模式
     * 返回值      目前需要最基本的返回值。例如播放是否成功。没有成功返回预定义的错误码。
     * 说明:       这个函数主要用在直接播放动画，不对动画内容进行任何控制的场合。
     */
    play: function(name, container, cacheMode) {
    
        // if(window.mraidStatus == Hanimation.MRAID_READY)
        // {
            // Hide the view to prepare data
            // mraid.hide();
        // }
        
        // 该函数需要进行的操作：
        // 
        // 1. 在container里面根据数据定义的动画大小，生成一个指定宽度高度的画布canvas
        // 2. 按照name指定的动画名称找到动画数据。
        // 3. 播放动画。        
        var aniData = Mugeda.getAnimation(name);
        if(!aniData)return false;
        this.aniData = aniData;
        
        if(typeof container == 'string') container = G(container);
        container.innerHTML=''
          +'<div id="mugeda_outer" style="position:relative;min-width:0;width:'+aniData.width+'px; height:'+aniData.height+'px;">'
          +'<canvas id="previewCanvas">This text is displayed if your browser does not support HTML5 Canvas.</canvas>'
          +'<div style="width:0;height:0;overflow:hidden;"><canvas id="canvasBuffer"></canvas></div>'
          // +'<div id="divReplay" style="display:none;position:absolute;left:4px;bottom:4px;padding:0px;margin:0px;"><a style="text-decoration:none;color:white;font-size:12px;font-family:arial,calibri,Sans Serif;text-shadow:0px 0px 4px black;}" href="javascript:Mugeda.gotoAndPlay(1);">Replay</a></div>'
          +'</div>';
        window.currentFrame=0;

        Mugeda.setTrackAnchors(aniData);         
        Mugeda.setupInput(aniData);
        
        var width=aniData.width;
        var height=aniData.height;
        var canvas = G('previewCanvas');
        if(aniData.color)canvas.style.backgroundColor=aniData.color;//背景色
		if(aniData.image)
		{
			canvas.style.backgroundPosition='center';
			canvas.style.backgroundRepeat='no-repeat';
			canvas.style.backgroundSize="100% 100%";
			canvas.style.backgroundImage='url('+aniData.image+')';
		}
		
        if(aniData.width){//宽度
          canvas.width=width;
          canvas.style.width=container.style.width=width+'px';
        };
        if(aniData.height){//高度
          canvas.height=height;
          canvas.style.height=container.style.height=height+'px';
        };

        if(!aniData.zoomInfo || !aniData.zoomInfo[0])
            aniData.zoomInfo = [{zoomLevel: 1., offsetLeft: 0, offsetTop: 0, rotation: 0}];
            
        var len=this.getAnimationLength(name);
                    
        this.canvas=canvas;
        window.aniData=aniData;

        AudioCache.init(aniData, function(errorCount){
            //缓存图片
            ImageCache.init(aniData,function(errorCount){

                // if(errorCount > 0)
                //     alert(Hanimation.Message.ImageError); 
                    
                aniData.layers=buildLayers(aniData.layers);
                
                //缓存元件
                Symbol.build(aniData.symbols,function(){

                    //加载脚本
                    try{
                      eval((aniData.script||''));
                    }catch(e){
                       console && console.log((e.lineNumber || e.line) + ": " + e);
                    };

                    Mugeda.onRenderReady(aniData); 
                    
                    //加载播放控制面板
                    // Mugeda.attachPopup(container);

                    // if(window.mraidStatus == Hanimation.MRAID_READY)
                    // {
                        // show the view and ready to render
                        // mraid.show();
                    // }
            
                    
                    var ctx=canvas.getContext("2d");

                    if(false) // len<=1)
                    {
                        //绘制图形
                        redrawCanvas({canvas:canvas,aniData:aniData,layers:aniData.layers});
                    }else{
                    
                        //播放动画
                        gotoAndPlay = function(frameId)
                        {
                            currentFrame = Math.max(0, frameId-1);
                        };
                        
                        var timerSpan = 1000/(aniData.rate);
                        var mo=setInterval(function(){
                            if(window.isEnd)return;

                            try{
                                redrawCanvas({canvas:canvas,aniData:aniData,layers:aniData.layers});
                                /*
                                var img;
                                if(!cacheMode)img=Mugeda.getCacheFrame(name,currentFrame);
                                if(!img){
                            redrawCanvas({canvas:canvas,aniData:aniData,repair:true});
                                    img=new Image();
                                    img.src=canvas.toDataURL("image/png");
                                    //if(cacheMode!=1)Mugeda.setCacheFrame(name,currentFrame,img);
                                }else{
                                    ctx.clearRect(0, 0, width, height);
                                    ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
                                }
                                */
                            }catch(e){
                            }
                            
                            // if(window.enterFrame)enterFrame(currentFrame);
                            // if(!window.isPause)currentFrame++;
                            Mugeda.postRender();
                            
                            if(currentFrame>=len){
                              
                              if(aniData.loop!==true){
                                currentFrame=len-1;
                                // window.isEnd=true;
                                window.isPause=true;
                                
                                /*
                                var divReplay = G('divReplay');
                                if(divReplay)
                                {
                                    divReplay.style.display = "block";
                                    divReplay.onclick=function(){
                                        this.style.display="none";
                                    }
                                }  
                                */
                              }
                              else
                                currentFrame = 0;
                            }
                        },timerSpan);
                    }
                });
            });
        });
        
        return true;
    },

    /*!
     * getImage用来获取某一帧动画渲染后的图像。
     *
     * 参数: 
     * name:        动画的名称。至于如何将用户指定的动画名称和数据映射起来，请自行决定。
     * frame:       获取第几帧的图像。从1开始。
     * 返回值       获取的图像数据。注意这个图像数据应该是DOM中的<img>对象，也就是说可以直接
     *              添加到网页中显示的数据。
     * 说明:        这个函数可以用来在网页中按照用户自定义的方式嵌入渲染后的图像。例如一个根据
     *              心情显示不同图像的头像系统。
     */
    getImage: function(name, frame){
        // 该函数需要进行的操作:
        // 
        // 1. 在container里面根据数据定义的动画大小，生成一个指定宽度高度的画布canvas。注意
        //    该画布对用户需要不可见，因为是中间过程。
        // 2. 按照name指定的动画名称找到动画数据。
        // 3. 在canvas上绘制指定的帧。    
        // 4. 将canvas中的图像保存并返回。
        frame = frame||1;
        
        var frameLen = this.getAnimationLength(name);
        if(frame>frameLen)frame%=frameLen;
        
        window.currentFrame=frame-1;
        redrawCanvas({canvas:this.canvas,aniData:this.aniData,repair:true});
        var data=G('previewCanvas').toDataURL("image/png");
        var img = new Image();
        img.src=data;
        return img;
    },
    
    //输出图片(测试)
    exportImage: function(name, frame){
        var img=this.getImage(name, 10);
        window.open(img.src);
    },


    zipAniData: function(data){
        return compressAniData(data);
    },
    
    unzipAniData: function(data){
        return uncompressAniData(data);
    },
    
    /***********************************************************************/
    /*           注意下面的函数需要调用者提供Canvas的绘制上下文ctx。       */
    /***********************************************************************/
    

    /*!
     * getAnimation用于获取指定名称的动画数据
     *
     * 参数: 
     * name:        动画的名称。
     * 
     * 返回:        一个标示该动画的句柄。后续的动画操作均需要提供该句柄。至于
     *              如何将句柄和内部动画数据映射起来，请自行决定。
     */
    getAnimation: function(name){
        // 该函数需要进行的操作:
        // 
        // 1. 按照name指定的动画名称找到动画数据。
        // 2. 为该动画生成一个唯一的句柄对象并返回。

        var aniData = null;
        if(typeof name == 'string') aniData = Mugeda.data[name];
		
		if(aniData){
			if(aniData.vr && aniData.vr > 500)
			{
				aniData=uncompressAniData(aniData);
				Mugeda.data[name] = aniData;
			}
			else if(!aniData.isunzip && aniData.version && aniData.version < 510){
				HaniData.unzip(aniData);
				aniData.frameLength=Mugeda.getFrameLength(aniData.layers);
				aniData.isunzip=true;
			}
		}
		
        return aniData;
    },  
        
    /*!
     * getCacheFrame用于获取指定帧的缓存动画数据
     * setCacheFrame用于设置指定帧的缓存动画数据
     * 
     * 参数: 
     * name:        动画的名称。
     * frameid:     帧索引。
     * 
     * 返回:        指定帧的动画数据。
     *
     */
    getCacheFrame: function(name, frameid){
        return this.frameCache[name+'_'+frameid];
    },
    setCacheFrame: function(name, frameid, img){
        this.frameCache[name+'_'+frameid]=img;
    },
        
    /*!
     * cacheAnimation预缓存动画数据
     * 
     * 参数: 
     * name:        动画的名称。
     * callback:    回调函数(frameId, isEnd)。
     * 
     *
     */
    cacheAnimation: function(name, callback){
        var aniData = this.getAnimation(name);
        var timer = null;
        var options={
          buildCache: true, 
          frameCallback:function(aniData,frameId){
              if(callback){
                  //强行中止缓存
                  if(callback(frameId)==true){
                      clearInterval(timer);
                  }
              }
          },
          finishCallback:function(aniData,frameId){
              clearInterval(timer);
              if(callback)callback(frameId, true);
          }
        } 

        // The first step is to cache symbols and images
        ImageCache.init(aniData,function(){
            aniData.layers=buildLayers(aniData.layers);
            Symbol.build(aniData.symbols,function(){
                window.preload = true;
                timer=setInterval(function(){
                  Mugeda.playFrame(null, name, options);
                }, 1);            
            });
        });        

    },
    clearCache: function(name){
        var obj=this.frameCache||{};
        for(var k in obj){
            if(k.split('_')[0]==name){
                delete obj[k];
                obj[k]=null;
            }
        }
    },  

    /*!
     * playFrame用于在指定画布ctx的指定位置x,y绘制动画h
     *
     * 参数: 
     * ctx:         调用者提供的canvas绘制上下文句柄
     * h:           通过getAnimation获取的动画句柄
     * options:     播放行为。具体见函数体内注释。
     * 返回:        暂时返回成功失败(例如用try, catch捕获异常信息)
     * 说明:        playFrame是播放动画的基础api,可以衍生出很多播放行为。所以很重要。
     *              这个函数需要逐步完善。
     */
    playFrame: function(ctx, h, options){
        // 该函数需要进行的操作:
        // 
        // 1. 按照句柄h查找动画数据
        // 2. 在ctx上绘制动画。
        
        /* options是一个对象，里面定义了若干选项。需要支持的选项options有(可以逐步实现):
        
        // targetX(Y):      绘制到画布的什么地方。默认为0,0
        // sourceX(Y):      从动画的什么地方开始绘制。默认为0,0
        // sourceW(H):      绘制动画的尺寸范围。
        // next:            bool型。是否直接播放下一帧。如果有next,忽略frameFrom(To)
        // previous:        bool型。是否直接播放上一帧。如果有previous,忽略frameFrom(To)
        // frameNo:         播放动画的帧范围。默认为从头到尾。
        // loop:            是否重复播放。默认为遵循aniData里面定义的loop。
        // frameCallback:   每一帧播放结束后的回调函数。参数暂定为动画句柄和当前帧数。
        // finishCallback:  整个播放行为结束后的回调函数。参数暂定为动画句柄。
        // clearBack:       是否在绘制时清空背景。默认为false，就是直接画。由调用者负责清理画布。
        // flipHorizontal:  是否水平翻转。默认为false。 
        // flipVertical:    是否垂直翻转。默认为false。 
        // cacheMode:       0: 默认值。首先读取缓存内容，如果没有才重新绘制；
        //                  1: 忽略缓存内容，强制直接绘制；
        //                  2: 强制直接绘制，但绘制完了后将内容缓存起来。如果已经有缓存了，则更新缓存。
        */
        var aniData=this.getAnimation(h);

        if(!aniData.zoomInfo || !aniData.zoomInfo[0])
            aniData.zoomInfo = [{zoomLevel: 1., offsetLeft: 0, offsetTop: 0, rotation: 0}];
        
        if(!options)options={};
        var p=options;
        var cacheCanvas=aniData.cacheCanvas;
        if(!cacheCanvas){
          var o=document.createElement('div');
          o.innerHTML='<canvas></canvas>';
          o.style.overflow='hidden';
          o.style.width=0;
          o.style.height=0;
          document.body.appendChild(o);
          cacheCanvas=o.childNodes[0];
          cacheCanvas.width=aniData.width||600;
          cacheCanvas.height=aniData.height||400;
          aniData.color='transparent';
          aniData.cacheCanvas=cacheCanvas;
        }
        
        var layers=aniData.layers;
        if(aniData.frameLength == undefined)
            aniData.frameLength = Mugeda.getFrameLength(layers);
        
        var len=this.getAnimationLength(h);
        
        var previous=p.previous;
        if(p.loop!=undefined)aniData.loop=p.loop;
        
        if(p.frameNo == undefined)
        {
            if(p.frameId==undefined)
                p.frameId=0;  
            else    
                p.frameId = p.frameId+(previous?-1:1);    
        }
        else
            p.frameId = p.frameNo;
        
        if(p.frameId == len)
            p.frameId = 0; 
        else if(p.frameId == -1)
            p.frameId = len - 1; 
            
        var frameId = p.frameId;

        // window.currentFrame = frameId;
        
        var cacheMode=p.cacheMode||0;
        var isend=(frameId == len - 1);
        var clearBack=p.clearBack;
 
        function renderImage(ctx, img, options)
        {
            var p = options;
            var sx=p.sourceX||0;
            var sy=p.sourceY||0;
            var sw=p.sourceW||cacheCanvas.width;
            var sh=p.sourceH||cacheCanvas.height;
            var dx=p.targetX||0;
            var dy=p.targetY||0;
            var dw=p.targetW||sw;
            var dh=p.targetH||sh;
        
            var offsetX = p.flipHorizontal ? dw : 0;
            var offsetY = p.flipVertical ? dh : 0;
            var scaleX = p.flipHorizontal? -1 : 1;
            var scaleY = p.flipVertical? -1 : 1;    
            
            ctx.save();            
            if(options.clearBack)
                ctx.clearRect(dx, dy, dw, dh);
            
            ctx.translate(dx, dy);
            
            if(options.flipHorizontal || options.flipVertical)
            {
                ctx.translate(offsetX, offsetY);
                ctx.scale(scaleX, scaleY);
            }
            
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);

            ctx.restore();            
        };
        
        function renderFrame(buildCache)
        {
            try{
                var img;
                if(!cacheMode)img=Mugeda.getCacheFrame(h,frameId);
                if(!img){
                    redrawCanvas({canvas:cacheCanvas,aniData:aniData,repair:true,frameId:frameId, silent:true});

                    if(buildCache){
                        img=new Image();
                        img.src=cacheCanvas.toDataURL("image/png");
                        if(ctx){
                            img.onload=function(){
                                renderImage(ctx, this, options);
                            }
                        }
                        if(cacheMode!=1)Mugeda.setCacheFrame(h,frameId,img);
                    }
                    else
                        renderImage(ctx, cacheCanvas, options);
                }else{
                    if(ctx){
                        renderImage(ctx, img, options);
                    }
                }
            }
            catch(e){
                // Not working for local files due to cross-domain issue. 
            }
            
            if(p.frameCallback)p.frameCallback(aniData,frameId);
            if(isend&&p.finishCallback)p.finishCallback(aniData,frameId);
        }
        
        if(!window.preload)
        {    
            ImageCache.init(aniData,function(){
                aniData.layers=buildLayers(aniData.layers);
                Symbol.build(aniData.symbols,function(){
                    window.preload = true;
                    renderFrame(options.buildCache);
                });
            });
        }
        else
            renderFrame(options.buildCache);
    },
    
    //获取最大帧
    getFrameLength:function(layers){
        var frameLenth=1;
        for (var i = layers.length - 1; i >= 0; i--) {
            var layer = layers[i];
            var unitCount = layer.units.length;
            for (var j = 0; j < unitCount; j++) {
                var tmUnit = layer.units[j];
                var len = tmUnit.frameStart + tmUnit.frameCount;
                if(frameLenth<len)frameLenth=len;
            }
        }
        return frameLenth;
    },

    //加载声音文件
    loadAudio:function(src){
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', src);
        audioElement.load();
        return audioElement;
    },
   
	gotoAndPlay: function(id)
	{
		this.manualControl = true;
		window.currentFrame = Math.max(0, id-1);
		Mugeda.resume();
	},
	
	gotoAndStop: function(id){
		gotoAndPause(id);
	},
	gotoAndPause: function(id)
	{
		this.manualControl = true;
		window.currentFrame = Math.max(0, id-1);
		Mugeda.pause();
	},
	
	next: function()
	{
		this.manualControl = true;
		window.currentFrame++;
		Mugeda.pause();
	},	

	previous: function()
	{
		this.manualControl = true;
		window.currentFrame--;
		if(window.currentFrame < 0)
			window.currentFrame = 0; 
			
		Mugeda.pause();
	},
	
    //暂停
    pause:function(){
		this.manualControl = true;
		window.isEnd=false;
		window.isPause=true;
    },

    //继续
    resume:function(delta){
		var delta = (delta == undefined) ? 0 : delta;
		
		window.currentFrame += delta;
		if(window.currentFrame < 0)
			window.currentFrame = 0; 
			
		this.manualControl = true;
		window.isEnd=false;
		window.isPause=false;
    },
	
    //播放/暂停
    playAndPause:function(o){
      window.isEnd=false;
      window.isPause=!window.isPause;
	  
	  if(o)
		o.className=window.isPause?'c0':'c1';
    },
    
	processBehaviors: function (obj, behaviors, event){
		var len = behaviors.length;
		for(var i=0;i<len;i++){
			var bhr = behaviors[i];
			if(bhr.event == event){
                // Only track user initialized behavior. 
                bhr.object = obj;
				MugedaBehavior.processAction(bhr, event, event == "click" ? true : false);
			}
		}
	},
		
	processObjectBehavior: function(obj, mode)
	{
		var processed = false;
		if(obj && obj.nestedHitObject)
            processed = this.processObjectBehavior(obj.nestedHitObject, mode);
        
        {
            var url, target, form, behavior;
            if(obj)
            {
                var param = obj.getParam();
                if((param.action=='link' || param.action==undefined) && param.url && param.url.length)
                {
                    url =  param.url;
                    target = param.urlTarget;
                }
                else if(param.action=='form' && param.form && param.form.length)
                    form = param.form;
                else if(param.action=='behavior' && param.behavior && param.behavior.length)
                    behavior = param.behavior;
            }
            else
            {
                url = window.canvasLink;
                target = window.canvasUrlTarget;
                form = window.canvasForm;
                behavior = window.canvasBehavior;
            }
            
            if(obj && url && mode == "click"){
                MugedaMraid.openLink(url, target);
				processed = true;
            }
            else if(form && mode == "click"){
                form=JSON.parse(form);
                if(form){
                    MugedaBehavior.popupForm(form);
					processed = true;
                    
                    // Poping up a form does not mean a real action yet. Only when 
                    // the form is submitted can it be considered as action. 
                    // trackedAction.action = "form";
                    // TODO: Specify which form
                }
            } 
            else if(behavior){
                behaviors=JSON.parse(behavior);
                Mugeda.processBehaviors(obj, behaviors, mode);
				processed = true;
            } 
            if(!obj && url && mode == "click")
            {
				// Canvas link has the lowest priority
                MugedaMraid.openLink(window.canvasLink, window.canvasUrlTarget); 
				processed = true;
			}
        }
		
		return processed;
	},
	
    //播放控制面板
    attachPopup:function(target){
      var _=arguments.callee;
      var pop=_.pop;
      if(!pop){
        pop=document.createElement('div');
        pop.className='mugeda_pop';
        pop.innerHTML=''
          +'<style>'
          +'.mugeda_pop{position:absolute;bottom:0;width:100%;height:0;overflow:hidden;}'
          +'.mugeda_pop .x{display:block;position:absolute;right:5px;top:5px;width:23px;height:23px;background-image:url(res/player_close.png);}'
          +'.mugeda_pop ul,.mugeda_pop ul{margin:0;padding:0;list-style:none;}'
          +'.mugeda_pop ul{height:64px;background:rgba(0,0,0,0.6);margin:0 auto;}'
          +'.mugeda_pop ul li{float:left;width:64px;height:64px;overflow:hidden;}'
          +'.mugeda_pop ul li a{display:block;width:60px;height:60px;margin:2px;background-image:url(res/player.png);}'
          +'.mugeda_pop ul li a:hover{background-color:rgba(0,0,0,0.6);}'
          +'.mugeda_pop ul li a.c0{background-position:0 0;}'
          +'.mugeda_pop ul li a.c1{background-position:-60px 0;}'
          +'.mugeda_pop ul li a.c2{background-position:-120px 0;}'
          +'.mugeda_pop ul li a.c3{background-position:-180px 0;}'
          +'.mugeda_pop ul li a.c4{background-position:-240px 0;}'
          +'.mugeda_pop ul li a.c5{background-position:-300px 0;}'
          +'</style>'
          +'<ul>'
          +'<li><a class="c1" target="_blank" href="#" onclick="Mugeda.playAndPause(this);return false" id="play_and_pause"></a></li>'
          +'<li><a class="c2" target="_blank" href="http://www.facebook.com/" onclick="Mugeda.exportImage();return false"></a></li>'
          +'<li><a class="c3" target="_blank" href="http://www.twitter.com/"></a></li>'
          +'<li><a class="c4" target="_blank" href="http://www.google.com/"></a></li>'
          +'<li><a class="c5" target="_blank" href="http://www.mugeda.com/"></a></li>'
          +'</ul>'
          +'<a class="x" href="" onclick="Mugeda.attachPopup.toggle(true);return false"></a>'
        _.pop=pop;
        _.toggle=function(min){
          clearInterval(pop.mo);
          pop.mo=setInterval(function(){
              var n=pop.offsetHeight+(min?-4:4);
              var b=min?(n<0):(n>64);
              if(b){clearInterval(pop.mo);return}
              pop.style.height=n+'px';
          },10);
        }
        if(!target)target=document.body;
        if(target.tagName=='DIV')target.style.position='relative';
        target.appendChild(pop);
      }
      _.toggle();
    },
	
	//获取指定GUID的缓存图片
	getCachedImageData:function(guid){
		var cache=ObjectCache.getCache(guid);
		
        return cache; 
        // if(cache)return cache.img;
	}, 
    
    serialize:function (data) {
        if(!data||!data.length)return '';
        var ret='';
        for(var i=0;i<data.length;i++){
            var obj=data[i];
            if(obj&&obj.name)ret+='&'+obj.name+'='+encodeURIComponent(obj.value||'');
        }
        return ret.substr(1);
    }
};




/* 压缩AniData */
function compressAniData(uncompressed){
	// 压缩并返回压缩后的JSON数据。
	return MugedaCompress.zip(uncompressed);
}

/* 解压AniData */
function uncompressAniData(compressed){
	// 解压并返回解压后的JSON数据。
	var data = MugedaCompress.unzip(compressed);
	if(data.script && data.script.length)
		data.script = unescape(data.script)
	
	return data;
}


MugedaCompress = {
	keys: [
		'Ac', 'action',
		'fM', 'form',
		'tt', 'title',
		'wt', 'width',
		'ht', 'height',
		'cl', 'color',
		'sm', 'symbols',
		'ly', 'layers',
		'vr', 'version',
		'sC', 'scripts',
		'zI', 'zoomInfo',
		'pd', 'pid',
		'tp', 'type',
		'nm', 'name',
		'un', 'units',
		'lI', 'layerId',
		'fS', 'frameStart',
		'fC', 'frameCount',
		'ad', 'animated',
		'vb', 'visible',
		'ob', 'objects',
		'pm', 'param',
		'fI', 'fillInfo',
		'cv', 'curve',
		'kf', 'keyframes',
		'md', 'mode',
		'tw', 'tween',
		'hK', 'hashKey',
		'ix', 'index',
		'rW', 'rawWidth',
		'rH', 'rawHeight',
		'sI', 'symbolId',
		'oX', 'offsetX',
		'oY', 'offsetY',
		'rX', 'rotateCenterX',
		'rY', 'rotateCenterY',
		'it', 'items',
		'nI', 'nodeId',
		'gP', 'guidPath',
		'ph', 'path',
		'gi', 'guid',
		'sm', 'smooth',
		'iX', 'innerX',
		'iY', 'innerY',
		'uX', 'outerX',
		'uY', 'outerY',
		'cX', 'centerX',
		'cY', 'centerY',
		'ed', 'edges',
		'st', 'section',
		'fZ', 'fontSize',
		'fT', 'fontStyle',
		'fW', 'fontWeight',
		'fF', 'fontFamily',
		'tA', 'textAlign',
		'tC', 'textContent',
		'tD', 'textDecoration',
		'cR', 'cornerRadius',
		'iS', 'imageSrc',
		'lC', 'lineCap',
		'lJ', 'LineJoin',
		'fR', 'frameRate',
		'iP', 'innerPercent',
		'TA', 'trackAnchors',
		'MT', 'mugedaTrackAnchors'
	],
	zip: function (data) {
		if (!data) return;
		if (data.zip) return data;
		var ret = JSON.parse(JSON.stringify(data));
		ret.zip = 1;
		if (ret.rate == 12) delete (ret.rate);
		if (ret.width == 600) delete (ret.width);
		if (ret.height == 400) delete (ret.height);
		if (ret.guid == "") delete (ret.guid);
		if (ret.title == "") delete (ret.title);
		if (ret.script == "") delete (ret.script);
		if (ret.loop == true) delete (ret.loop);
		if (ret.useCamera == false) delete (ret.useCamera);
		if (ret.symbols.length == 0) delete (ret.symbols);
		else {
			var symbols = ret.symbols;
			for (var i = 0; i < symbols.length; i++) {
				var symbol = symbols[i];
				delete (symbol.runtime);
				delete (symbol.dirtyFlag);
				this.zipLayers(symbol.layers);
			}
		}
		this.zipZoomInfo(ret);
		this.zipLayers(ret.layers);
		ret = this.zipKey(ret);
		return ret;
	},
	unzip: function (data) {
		if (!data) return data;
		if (data.zip != 1) return HaniData.unzip(data);
		var ret = JSON.parse(JSON.stringify(data));
		ret = this.unzipKey(ret);
		delete (ret.zip);
		if (ret.rate == undefined) ret.rate = 12;
		if (ret.width == undefined) ret.width = 600;
		if (ret.height == undefined) ret.height = 400;
		if (ret.guid == undefined) ret.guid = "";
		if (ret.title == undefined) ret.title = "";
		if (ret.script == undefined) ret.script = "";
		if (ret.loop == undefined) ret.loop = true;
		if (ret.useCamera == undefined) ret.useCamera = false;
		if (ret.symbols == undefined) ret.symbols = [];
		if (ret.symbols.length) {
			var symbols = ret.symbols;
			for (var i = 0; i < symbols.length; i++) {
				var symbol = symbols[i];
				symbol.runtime = true;
				symbol.dirtyFlag = false;
				this.unzipLayers(symbol.layers);
			}
		}
		this.unzipZoomInfo(ret);
		this.unzipLayers(ret.layers);
		return ret;
	},
	zipKey: function (data) {
		var reg;
		data = JSON.stringify(data);
		for(var i=0;i<this.keys.length;i+=2){
			reg = eval('/"'+this.keys[i+1]+'"\:/g');
			data = data.replace(reg, '"'+this.keys[i]+'":');
		}
		return JSON.parse(data);
	},
	unzipKey: function (data) {
		var reg;
		data = JSON.stringify(data);
		for(var i=0;i<this.keys.length;i+=2){
			reg = eval('/"'+this.keys[i]+'"\:/g');
			data = data.replace(reg, '"'+this.keys[i+1]+'":');
		}
		return JSON.parse(data);
	},
	zipZoomInfo: function (data) {
		var ret = [];
		var zoomInfo = data.zoomInfo || [];
		for (var i = 0; i < zoomInfo.length; i++) {
			var o = zoomInfo[i];
            if(o)
                // Index
                ret.push('i'+i);
            else
                continue;
            
            if(o.tween)
                ret.push('t'+o.tween);
			ret.push(o.offsetLeft);
			ret.push(o.offsetTop);
			ret.push(o.rotation);
			ret.push(o.zoomLevel);
		}
		data.zoomInfo = ret.join(',');
	},
	unzipZoomInfo: function (data) {
		var zoomInfo = [];
		var a = data.zoomInfo.split(',') || [];
		for (var i = 0; i < a.length; i+=4) {
            var idx=a[i];
            if(idx.indexOf('i') == 0)
            {
                idx = idx.substr(1);
                i++;
                
                var tween = a[i];
                if(tween.indexOf('t') == 0)
                {
                    tween = tween.substr(1);
                    i++;
                }
                else
                    tween = null;
               
                zoomInfo[idx] = {
                    offsetLeft: Number(a[i]),
                    offsetTop: Number(a[i + 1]),
                    rotation: Number(a[i + 2]),
                    zoomLevel: Number(a[i + 3])};
                if(tween)
                    zoomInfo[idx].tween = tween;
            }
		}
		data.zoomInfo = zoomInfo;
	},
	zipLayers: function (layers) {
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			delete (layer.hide);
			delete (layer.lock);
			var units = layer.units;
			for (var j = 0; j < units.length; j++) {
				var unit = units[j];
				if (unit.animated) {
					this.zipPath(unit);
				} else {
					//delete (unit.hashKey);
				}
				var keyframes = unit.keyframes || [];
				for (var k = 0; k < keyframes.length; k++) {
					var param = keyframes[k].param;
					this.zipParam(param);
                    
                    // Remove the behavior for keyframe. Use object's behavior instead. 
                    if(param.behavior) delete param.behavior;
                    if(param.action) delete param.action;
				}
				if (unit.visible == true) delete (unit.visible);
				this.zipObjects(unit.objects);
			}
		}
	},
	unzipLayers: function (layers) {
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			layer.hide = false;
			layer.lock = false;
			var units = layer.units;
			for (var j = 0; j < units.length; j++) {
				var unit = units[j];
				if (unit.animated) {
					this.unzipPath(unit);
				} else {
				}
				var keyframes = unit.keyframes || [];
				for (var k = 0; k < keyframes.length; k++) {
					var param = keyframes[k].param;
                    if (param)
					    this.unzipParam(param);
				}
				if (unit.visible == undefined) unit.visible = true;
				this.unzipObjects(unit.objects);
			}
		}
	},
	zipPath: function (unit) {
		var ret=[];
		var path=unit.path||[];
		var pathLeft=unit.pathLeft||0;
		var pathTop=unit.pathTop||0;
		ret.push(pathLeft);
		ret.push(pathTop);
		for (var i = 0; i < path.length; i++) {
			var pt=path[i];
			ret.push(pt.id);
			ret.push(pt.backwardX);
			ret.push(pt.backwardY);
			ret.push(pt.forwardX);
			ret.push(pt.forwardY);
			ret.push(pt.nodeX);
			ret.push(pt.nodeY);
		}
		unit.path=ret.join(',');
		delete (unit.pathLeft);
		delete (unit.pathTop);
	},
	unzipPath: function (unit) {
		var a=unit.path.split(',');
		var path=[];
		var pathLeft=a.shift();
		var pathTop=a.shift();		
        for (var i = 0; i < a.length; i+=7) {
			path.push({
				id: Number(a[i]),
				backwardX: Number(a[i + 1]),
				backwardY: Number(a[i + 2]),
				forwardX: Number(a[i + 3]),
				forwardY: Number(a[i + 4]),
				nodeX: Number(a[i + 5]),
				nodeY: Number(a[i + 6])
			});
		}

		if(path.length){
			unit.pathLeft=Number(pathLeft);
			unit.pathTop=Number(pathTop);
			unit.path=path;
		}else{
			delete (unit.path);
			delete (unit.pathLeft);
			delete (unit.pathTop);
		}
	},
	zipObjects: function (objects) {
		for (var i = 0; i < objects.length; i++) {
			var object = objects[i];
			if (object.items && object.items.length) {
				this.zipObjects(object.items);
			} else {
				delete (object.id);
				delete (object.name);
				delete (object.items);
				delete (object.aryAnchors);
			}
			this.zipCurve(object);
			this.zipParam(object.param);
		}
	},
	unzipObjects: function (objects) {
		for (var i = 0; i < objects.length; i++) {
			var object = objects[i];
			if (object.items && object.items.length) {
				this.unzipObjects(object.items);
			} else {
				object.id = 0;
				object.name = "";
				object.items = [];
				object.aryAnchors=[];
			}
			this.unzipCurve(object);
			this.unzipParam(object.param);
		}
	},
	zipCurve: function (object) {
		var points = object.curve.points;
		if (typeof points == 'string'){
			var pts = points.split(';');
			points = [];
			for (var i = 0; i < pts.length; i ++) {
				var pt=pts[i].split(',');
				points.push({
					backwardX : Number(pt[0]),
					backwardY : Number(pt[1]),
					forwardX : Number(pt[2]),
					forwardY : Number(pt[3]),
					nodeX : Number(pt[4]),
					nodeY : Number(pt[5])
				});
			}
		}
		var ret = [];
		ret.push(object.curve.closed ? 1 : 0);
		for (var i = 0; i < points.length; i++) {
			var pt = points[i];
			ret.push(pt.backwardX);
			ret.push(pt.backwardY);
			ret.push(pt.forwardX);
			ret.push(pt.forwardY);
			ret.push(pt.nodeX);
			ret.push(pt.nodeY);
		}
		object.curve = ret.join(',');
	},
	unzipCurve: function (object) {
		var curve = object.curve;
		if (typeof curve != 'string') return;
		object.curve = {};
		var pts = curve.split(',');
		var closed = pts.shift() == 1;
		object.curve.closed = closed;
		var points = [];
		for (var i = 0; i < pts.length; i += 6) {
			points.push({
				backwardX : Number(pts[i]),
				backwardY : Number(pts[i + 1]),
				forwardX : Number(pts[i + 2]),
				forwardY : Number(pts[i + 3]),
				nodeX : Number(pts[i + 4]),
				nodeY : Number(pts[i + 5])
			});
		}
		object.curve.points = points;
	},
	zipParam: function (param) {
        var m =  [
            'L'+param.left, 
            'R'+param.right, 
            'T'+param.top, 
            'B'+param.bottom, 
            'X'+param.scaleX, 
            'Y'+param.scaleY, 
            'O'+param.rotate, 
            'W'+param.lineWidth, 
            'A'+param.alpha, 
            'C'+param.strokeColor
		];
        
        if( Math.abs(param.left - param.startX) > 1E-3)
            m.push('S'+param.startX);
        
        if( Math.abs(param.top - param.startY) > 1E-3)
            m.push('P'+param.startY);
            
        if( Math.abs(param.right - param.endX) > 1E-3)
            m.push('E'+param.endX); 
            
        if( Math.abs(param.bottom - param.endY) > 1E-3)
            m.push('N'+param.endY); 
            
        param.m = m.join(';');
        
		if (param.strokeType == 0) delete (param.strokeType);
		if (param.frameRate == 12) delete (param.frameRate);
		if (param.lineCap == 'round') delete (param.lineCap);
		if (param.lineJoin == 'round') delete (param.lineJoin);

		if (!param.customPivot) delete (param.customPivot);
		delete (param.startX);
		delete (param.startY);
		delete (param.endX);
		delete (param.endY);
		delete (param.width);
		delete (param.height);
		delete (param.left);
		delete (param.right);
		delete (param.top);
		delete (param.bottom);
		delete (param.scaleX);
		delete (param.scaleY);
		delete (param.rotate);
		delete (param.lineWidth);
		delete (param.alpha);
		delete (param.strokeColor);
		this.zipFillInfo(param);
	},
	unzipParam: function (param) {
		if (param.strokeType == undefined) param.strokeType = 0;
		if (param.frameRate == undefined) param.frameRate = 12;
		if (param.lineCap == undefined) param.lineCap = 'round';
		if (param.lineJoin == undefined) param.lineJoin = 'round';
        
		// if (param.customPivot == undefined) param.customPivot = true;
		var m = param.m.split(';');
		for(var i=0;i<m.length;i++){
			var key=m[i].substr(0,1);
			var value=m[i].substr(1);
			switch(key){
				case 'L': param.left = Number(value); break;
				case 'R': param.right = Number(value); break;
				case 'T': param.top = Number(value); break;
				case 'B': param.bottom = Number(value); break;

				case 'S': param.startX = Number(value); break;
				case 'P': param.startY = Number(value); break;
				case 'E': param.endX = Number(value); break;
				case 'N': param.endY = Number(value); break;
                
				case 'X': param.scaleX = Number(value); break;
				case 'Y': param.scaleY = Number(value); break;
				case 'O': param.rotate = Number(value); break;
				case 'W': param.lineWidth = Number(value); break;
				case 'A': param.alpha = Number(value); break;
				case 'C': param.strokeColor = value; break;
			}
		}
        if(param.startX == undefined) param.startX = param.left;
		if(param.startY == undefined) param.startY = param.top;
		if(param.endX == undefined) param.endX = param.right;
		if(param.endY == undefined) param.endY = param.bottom;
        
		param.width = param.right - param.left;
		param.height = param.bottom - param.top;
		delete(param.m);
		this.unzipFillInfo(param);
	},
	zipFillInfo: function (param) {
		var ret = [];
		var cols = [];
		var fi = param.fillInfo;
		if(!fi)return;
		var fs = fi.fillStyle;
		var fc = fi.fillColors;
		var fn = [fi.fillStartPos.x, fi.fillStartPos.y, fi.fillEndPos.x, fi.fillEndPos.y];
		var fm = fi.fillImage;
		if(fm!=''){
			fs=-1;
			fc.length=0;
			fn = [];
		}
		if(fs==0){
			fc.length=1;
			fn = [];
		}
		ret.push(fs);
		for (var i = 0; i < fc.length; i++) {
			var o = fc[i];
			cols.push(o.p);
			cols.push(o.r);
			cols.push(o.g);
			cols.push(o.b);
			cols.push(o.a);
		}
		ret.push(cols.join(','));
		ret.push(fn.join(','));
		ret.push(fm);
		param.fillInfo = ret.join(';');
	},
	unzipFillInfo: function (param) {
		if(!param.fillInfo)return;
		var a = param.fillInfo.split(';');
		var fillStyle = Number(a[0]);
		var cols = a[1].split(',');
		var fillImage = a[3];
		var fillColors = [];
		for (var i = 0; i < cols.length; i+=5) {
			fillColors.push({
				p: Number(cols[i]),
				r: Number(cols[i+1]),
				g: Number(cols[i+2]),
				b: Number(cols[i+3]),
				a: Number(cols[i+4])
			});
		}
		var fillInfo = {
			fillStyle : fillStyle,
			fillImage : fillImage,
			fillColors : fillColors
		};
		var pos = a[2].split(',');
		if(pos.length!=4)pos=[0,0,0,0];
		fillInfo.fillStartPos = {
			x: Number(pos[0]),
			y: Number(pos[1])
		}
		fillInfo.fillEndPos = {
			x: Number(pos[2]),
			y: Number(pos[3])
		}
		param.fillInfo = fillInfo;
	}
};
