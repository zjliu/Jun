/*!

 * [代码说明]

 *

 * Copyright 2010, Cleeki, Inc.

 * All rights reserved

 *

 * 版权所有 未经许可不得传播

 */
function E(f, e, o) {
    if (!e) e = 'load';
    if (!o) o = window;
    if(o.attachEvent) {
        o.attachEvent('on' + e, f)
    } else {
		o.addEventListener(e, f, false)
	}
} 

function fo(o) {
    var x = 0;
    var y = 0;
    do {
        x += o.offsetLeft || 0;
        y += o.offsetTop || 0;
    } while ( o = o . offsetParent );
    return {x: x,y: y}
} 

function fc(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
       event.cancelBubble = true;
	}
} 

ColorPicker = {

    rgba: 100,

    hsb: {

        h: 360,

        s: 100,

        b: 100

    },

    init: function() {

        var _ = this;
        var a;
        var o = document.createElement('div');

        document.body.appendChild(o);

        o.className = 'picker';

        o.innerHTML = '<div class="k0"><div></div></div><div class="k1"><dl><dd><div><a></a><b></b><u class="e_hsb"></u></div></dd></dl></div><div class="k2"><dl><dd><div class="e_hue"></div></dd></dl></div><div class="k3"><dl><dd><div><a></a><b></b><i title="'+"ToggleAlpha"+'"></i></div></dd></dl></div><div class="k4"><dl><dd><li>R:<input class="rgb_R"></li><li>G:<input class="rgb_G"></li><li>B:<input class="rgb_B"></li><li>A:<input class="rgb_A"></li></dd></dl></div><div class="k5"><input class="e_hex"></div>';

        _.o = o;

        a = o.childNodes;

        _.el = {};

        _.el.hue = a[0];

        _.el.hsb = a[1].getElementsByTagName('A')[0];

        _.el.bar = _.el.hsb.nextSibling;

        _.el.cur = a[3].getElementsByTagName('A')[0];

        _.el.old = _.el.cur.nextSibling;

        _.el.alp = _.el.old.nextSibling;

        c = a[4].getElementsByTagName('INPUT');

        _.el.R = c[0];

        _.el.G = c[1];

        _.el.B = c[2];

        _.el.A = c[3];

        _.el.hex = a[5].childNodes[0];

        _.bind();

        _.hide();

    },

    frgb: function() {

        var _ = this;

        _.hsb = _.RGBToHSB({

            r: _.el.R.value,

            g: _.el.G.value,

            b: _.el.B.value

        });

        _.change()

    },

    bind: function() {

        var _ = this;

        E(function(e) {

            fc(e);

        },

        'click', _.o);

        E(function(e) {

            _.down(e);

            fc(e);

        },

        'mousedown', _.o);

        E(function(e) {

            _.down(e);

            fc(e);

        },

        'touchstart', _.o);

        E(function(e) {

            _.move(e)

        },

        'mousemove', document);

        E(function(e) {

            _.move(e)

        },

        'touchmove', document);

        E(function(e) {

            _.up(e)

        },

        'mouseup', document);

        E(function(e) {

            _.up(e)

        },

        'touchend', document);

        E(function(e) {

            e = e || event;

            e = e.target || e.srcElement;

            if (e.tagName != 'INPUT') return;

            switch (e.className) {

            case 'e_hex':

                _.hsb = _.HexToHSB(e.value);

                _.change();

                break;

            case 'rgb_A':

                _.rgba = e.value;

                _.change();

                break;

            default:

                _.frgb();

                break;

            }

        },

        'change', _.o);

        E(function(e) {

            e = e || event;

            e = e.target || e.srcElement;

            if (e.tagName == 'INPUT' && !_.moving) {

                e.select()

            }

        },

        'mouseover', _.o);

        E(function() {

            _.fcolor(_.el.old.style.backgroundColor, _.el.old.style.opacity);

            _.change()

        },

        'click', _.el.old);

        E(function() {

            _.rgba = _.rgba ? 0 : 100;

            _.change()

        },

        'click', _.el.alp);

    },

    hide: function() {

        var _ = this;

        if (_.o) {

            _.o.style.display = 'none';

            _.isShow = 0;

        }

    },

    down: function(e) {

        e = e || event;

        var _ = this;

        var o = e.target || e.srcElement;

        if (!o || !o.className || o.className == 'e_hex') return;

        _.moving = o;

        _.offset = fo(o);

        o.ey = (e.pageY || e.clientY) - _.offset.y;

        if (e.preventDefault) e.preventDefault();

        _.move(e);

    },

    move: function(e) {

        var _ = this;
        var c;
        var t;
        var e = e || event;
        var o = _.moving;

        if (!o) return;

        t = o.className;

        e = {

            x: (e.pageX || e.clientX) - _.offset.x,

            y: (e.pageY || e.clientY) - _.offset.y

        };

        if (t == 'e_hue') {

            e.y = Math.floor(e.y * 360 / 150);

            if (e.y < 0) e.y = 0;

            if (e.y > 360) e.y = 360;

            _.hsb.h = 360 - e.y;

        }

        if (t == 'e_hsb') {

            e.x = Math.floor(e.x * 100 / 150);

            e.y = Math.floor(e.y * 100 / 150);

            if (e.x < 0) e.x = 0;

            if (e.x > 100) e.x = 100;

            if (e.y < 0) e.y = 0;

            if (e.y > 100) e.y = 100;

            _.hsb.s = e.x;

            _.hsb.b = 100 - e.y;

        }

        if (/^rgb_/.test(t)) {

            var m = 255,

            n = 3,

            b = /^rgb_A/.test(t);

            if (b) {

                m = 100;

                n = 1

            };

            c = parseFloat(o.value) + o.ey - e.y;

            if (c < 0) c = 0;

            if (c > m) c = m;

            if (b) _.rgba = c;

            o.value = c;

            o.ey = e.y;

            _.frgb();

        }

        _.change();

    },

    up: function() {

        this.moving = null;

    },

    show: function(c, f, o) {

        var _ = this;
        var p;
        var x;
        var y;
        var d = document.documentElement;
        var w = d.clientWidth;
        var h = d.clientHeight;

        _.o.style.display = '';

        p = fo(o);

        x = p.x;

        y = p.y + o.offsetHeight;

        if (x + _.o.offsetWidth > w) x = w - _.o.offsetWidth;

        if (y + _.o.offsetHeight > h) y = p.y - _.o.offsetHeight;

        _.o.style.left = x + 'px';

        _.o.style.top = y + 'px';

        _.fcolor(c);

        _.f = f;

        _.change();

        _.el.old.style.backgroundColor = 'rgba(' + _.rgb.r + ', ' + _.rgb.g + ', ' + _.rgb.b + ', 1)';

        _.el.old.style.opacity = _.rgba / 100;

        _.el.old.style.filter = 'alpha(opacity=' + (_.rgba / 100) + ')';

        _.isShow = 1;

    },

    change: function() {

        var _ = this;

        _.fixed();

        _.rgb = _.HSBToRGB(_.hsb);

        _.hex = _.RGBToHex(_.rgb);

        _.el.R.value = parseInt(_.rgb.r);

        _.el.G.value = parseInt(_.rgb.g);

        _.el.B.value = parseInt(_.rgb.b);

        _.el.A.value = parseInt(_.rgba);

        _.el.hex.value = '#' + _.hex;

        _.el.hsb.style.backgroundColor = '#' + _.RGBToHex(_.HSBToRGB({

            h: _.hsb.h,

            s: 100,

            b: 100

        }));

        _.el.hsb.style.opacity = _.rgba / 100;

        _.el.hsb.style.filter = 'alpha(opacity=' + _.rgba + ')';

        _.el.cur.style.backgroundColor = '#' + _.hex;

        _.el.cur.style.opacity = _.rgba / 100;

        _.el.cur.style.filter = 'alpha(opacity=' + _.rgba + ')';

        _.el.bar.style.left = parseInt((_.hsb.s) * 150 / 100) - 5 + 'px';

        _.el.bar.style.top = parseInt((100 - _.hsb.b) * 150 / 100) - 5 + 'px';

        _.el.hue.style.top = parseInt((360 - _.hsb.h) * 150 / 360) + 2 + 'px';

        if (_.f) _.f('rgba(' + _.rgb.r + ', ' + _.rgb.g + ', ' + _.rgb.b + ', ' + (_.rgba / 100) + ')', '#' + _.hex, _.rgba);

    },

    fixed: function() {

        var _ = this;

        var o = _.hsb;

        if (isNaN(o.h) || o.h < 0) o.h = 0;

        if (o.h > 360) o.h = 360;

        if (isNaN(o.s) || o.s < 0) o.s = 0;

        if (o.s > 100) o.s = 100;

        if (isNaN(o.b) || o.b < 0) o.b = 0;

        if (o.b > 100) o.b = 100;

        o = _.rgba;

        if (isNaN(o) || o < 0) _.rgba = 0;

        if (o > 100) _.rgba = 100;

    },

    fcolor: function(c, b) {

        var _ = this;

        var d;

        c = c.replace(/#|\s/g, '').toLowerCase();

        if (!c || c == 'transparent') c = 'rgba(0,0,0,0)';

        if (c.length == 3) {

            c = c.split('');

            c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2]

        };

        if (/rgb[a]?\((\d+),(\d+),(\d+)[\,]?([\d+\.]*)\)/.test(c)) {

            c = _.RGBToHex({

                r: parseInt(RegExp.$1),

                g: parseInt(RegExp.$2),

                b: parseInt(RegExp.$3)

            });

            d = RegExp.$4;

        } else b = 1;

        if (d == '') d = 1;

        if (b == undefined) b = d;

        _.rgba = parseInt(parseFloat(b || 0) * 100);

        _.hsb = _.RGBToHSB(_.HexToRGB(c));

    },

    HSBToRGB: function(hsb) {

        var rgb = {};

        var h = Math.round(hsb.h);

        var s = Math.round(hsb.s * 255 / 100);

        var v = Math.round(hsb.b * 255 / 100);

        if (s == 0) {

            rgb.r = v;

            rgb.g = v;

            rgb.b = v;

        } else {

            var t1 = v;

            var t2 = (255 - s) * v / 255;

            var t3 = (t1 - t2) * (h % 60) / 60;

            if (h == 360) h = 0;

            if (h < 60) {

                rgb.r = t1;

                rgb.b = t2;

                rgb.g = t2 + t3

            } else if (h < 120) {

                rgb.g = t1;

                rgb.b = t2;

                rgb.r = t1 - t3

            } else if (h < 180) {

                rgb.g = t1;

                rgb.r = t2;

                rgb.b = t2 + t3

            } else if (h < 240) {

                rgb.b = t1;

                rgb.r = t2;

                rgb.g = t1 - t3

            } else if (h < 300) {

                rgb.b = t1;

                rgb.g = t2;

                rgb.r = t2 + t3

            } else if (h < 360) {

                rgb.r = t1;

                rgb.g = t2;

                rgb.b = t1 - t3

            } else {

                rgb.r = 0;

                rgb.g = 0;

                rgb.b = 0

            }

        }

        return {

            r: Math.round(rgb.r),

            g: Math.round(rgb.g),

            b: Math.round(rgb.b)

        };

    },

    RGBToHex: function(rgb) {

        return [(rgb.r < 16 ? '0': '') + rgb.r.toString(16), (rgb.g < 16 ? '0': '') + rgb.g.toString(16), (rgb.b < 16 ? '0': '') + rgb.b.toString(16)].join('').toUpperCase();

    },

    HexToHSB: function(hex) {

        return this.RGBToHSB(this.HexToRGB(hex));

    },

    HexToRGB: function(hex) {

        hex = parseInt(hex.replace('#', ''), 16);

        return {

            r: hex >> 16,

            g: (hex & 0x00FF00) >> 8,

            b: (hex & 0x0000FF)

        };

    },

    RGBToHSB: function(rgb) {

        var hsb = {

            h: 0,

            s: 0,

            b: 0

        };

        var x = Math.min(rgb.r, rgb.g, rgb.b);

        var y = Math.max(rgb.r, rgb.g, rgb.b);

        var delta = y - x;

        hsb.b = y;

        hsb.s = y != 0 ? 255 * delta / y: 0;

        if (hsb.s != 0) {

            if (rgb.r == y) {

                hsb.h = (rgb.g - rgb.b) / delta;

            } else if (rgb.g == y) {

                hsb.h = 2 + (rgb.b - rgb.r) / delta;

            } else {

                hsb.h = 4 + (rgb.r - rgb.g) / delta;

            }

        } else {

            hsb.h = -1;

        }

        hsb.h *= 60;

        if (hsb.h < 0) {

            hsb.h += 360;

        }

        hsb.s *= 100 / 255;

        hsb.b *= 100 / 255;

        return hsb;

    }

}
