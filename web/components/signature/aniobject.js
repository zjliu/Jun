function isCurveCrossing(e, t) {
    var n = e.length;
    var r = t.length;
    var i = [0, 0];
    var s;
    var o;
    for (var u = 0; u < n; u++) {
        s = e[u];
        fit = Bezier.isInPath(s.nodeX, s.nodeY, t);
        if (fit)
            i[0]++
    }
    for (var a = 0; a < r; a++) {
        s = t[a];
        fit = Bezier.isInPath(s.nodeX, s.nodeY, e);
        if (fit)
            i[1]++
    }
    if (i[0] == 0 && i[1] == 0)
        o = 0;
    else if (i[0] == n)
        o = 1;
    else if (i[1] == r)
        o = 2;
    else
        o = 3;
    return o
}
function saveParam(e, t, n, r) {
    e.BeginNode("Param");
    e.Attrib("name", t);
    e.Attrib("type", n);
    e.Attrib("value", r.toString());
    e.EndNode()
}
function interpolate(e, t, n) {
    var r = e.a[t] + e.b[t] * n + e.c[t] * n * n + e.d[t] * n * n * n;
    return r
}
function tridiagonal_matrix(e, t, n, r) {
    var i = e.length;
    n[0] = n[0] / t[0];
    r[0] = r[0] / t[0];
    for (var s = 1; s < i; s++) {
        var o = 1 / (t[s] - n[s - 1] * e[s]);
        n[s] = n[s] * o;
        r[s] = (r[s] - r[s - 1] * e[s]) * o
    }
    var u = [];
    u[i - 1] = r[i - 1];
    for (s = i - 2; s >= 0; s--) {
        u[s] = r[s] - n[s] * u[s + 1]
    }
    return u
}
function get_model(e) {
    var t = {x: {a: [],b: [],c: [],d: []},y: {a: [],b: [],c: [],d: []}};
    var n = e.length;
    var r = [];
    var i = [];
    var s = [];
    var o = [];
    for (var u = 0; u < n; u++) {
        s[u] = 1;
        r[u] = 1;
        i[u] = 4
    }
    i[0] = 2;
    i[n - 1] = 2;
    for (u = 1; u < n - 1; u++) {
        o[u] = 3 * (e[u + 1].y - e[u - 1].y)
    }
    o[0] = 3 * (e[1].y - e[0].y);
    o[n - 1] = 3 * (e[n - 1].y - e[n - 2].y);
    var a = tridiagonal_matrix(r, i, s, o);
    for (u = 0; u < n - 1; u++) {
        t.y.a[u] = e[u].y;
        t.y.b[u] = a[u];
        t.y.c[u] = 3 * (e[u + 1].y - e[u].y) - 2 * a[u] - a[u + 1];
        t.y.d[u] = 2 * (e[u].y - e[u + 1].y) + a[u] + a[u + 1]
    }
    for (u = 1; u < n - 1; u++) {
        o[u] = 3 * (e[u + 1].x - e[u - 1].x)
    }
    o[0] = 3 * (e[1].x - e[0].x);
    o[n - 1] = 3 * (e[n - 1].x - e[n - 2].x);
    a = tridiagonal_matrix(r, i, s, o);
    for (u = 0; u < n - 1; u++) {
        t.x.a[u] = e[u].x;
        t.x.b[u] = a[u];
        t.x.c[u] = 3 * (e[u + 1].x - e[u].x) - 2 * a[u] - a[u + 1];
        t.x.d[u] = 2 * (e[u].x - e[u + 1].x) + a[u] + a[u + 1]
    }
    return t
}
function scanLine(e, t, n) {
    var r = 0;
    var i = 0;
    var s;
    var o = t;
    for (var u = 0; u < n; u++) {
        var s = e[o + 3];
        o += 4;
        if (s == 0) {
            r++
        } else
            break
    }
    if (u < n) {
        o = t + (n - 1) * 4;
        for (var a = n - 1; a > u; a--) {
            var s = e[o + 3];
            o -= 4;
            if (s == 0) {
                i++
            } else
                break
        }
    }
    return {left: r,right: i}
}
Hanimation.RectCrossTest = function(e, t, n, r, i, s, o, u) {
    var a = (e > i && e < o || i > e && i < n) && (t > s && t < u || s > t && s < r);
    return a
};
Hanimation.AniObject.prototype.compress = function() {
    var e = this.dataRef;
    var t = {};
    t.gl = e.guid + "," + e.id + "," + e.type + "," + e.name;
    t.pm = compressParam(e.param);
    if (e.items && e.items.length) {
        t.it = [];
        var n = e.items;
        var r = n.length;
        for (var i = 0; i < n.length; i++) {
            var s = n[i];
            var o = getAniObject(s);
            if (o) {
                var u = o.compress();
                t.it.push(u)
            }
        }
    } else if (e.curve) {
        var a;
        if (e.curve.points && e.curve.points.length && typeof e.curve.points[0].nodeX != "undefined")
            a = 0;
        else
            a = 1;
        var f = compressCurve(e.curve, a);
        t.cv = f
    }
    return t
};
Hanimation.AniObject.prototype.getActiveNodes = function() {
    if (this.aryActiveNodes)
        return this.aryActiveNodes;
    else
        return []
};
Hanimation.AniObject.prototype.resetNodes = function() {
    if (!this.aryActiveNodes)
        return;
    var e = this.aryActiveNodes.length;
    var t = this.dataRef.curve.points;
    var n = t.length;
    var r = 16;
    for (var i = 0; i < n; i++) {
        if (this.aryActiveNodes[i] == 1) {
            var s = t[i];
            if (typeof s.nodeX != "undefined" && typeof s.nodeY != "undefined") {
                s.forwardX = s.nodeX;
                s.backwardX = s.nodeX;
                s.forwardY = s.nodeY + r;
                s.backwardY = s.nodeY - r
            }
        }
    }
    this.updateBoundRect()
};
Hanimation.AniObject.prototype.deleteNodes = function() {
    if (!this.aryActiveNodes || this.dataRef.type == Hanimation.SHAPE_PATH)
        return;
    var e = this.aryActiveNodes.length;
    var t = 0;
    for (s = 0; s < e; s++) {
        if (this.aryActiveNodes[s] == 1)
            t++
    }
    var n = this.dataRef.curve.points;
    var r = n.length;
    if (r - 2 < t) {
        alert(Hanimation.Message.ToMuchDeletion);
        return
    }
    var i = typeof n[0].nodeX != "undefined";
    for (var s = e - 1; s >= 0; s--) {
        if (this.aryActiveNodes[s] == 1) {
            n.splice(s, 1)
        }
    }
    if (!i)
        this.model = null;
    this.aryActiveNodes = [];
    this.updateBoundRect()
};
Hanimation.AniObject.prototype.addNodes = function() {
    if (!this.aryActiveNodes || this.dataRef.type == Hanimation.SHAPE_PATH)
        return;
    var e = this.aryActiveNodes.length;
    var t = this.dataRef.curve.points;
    var n = t.length;
    var r = 16;
    var i = typeof t[0].nodeX != "undefined";
    for (var s = n - 1; s >= 0; s--) {
        if (this.aryActiveNodes[s] == 1) {
            if (i)
                Bezier.subDivision2(t, s, .5);
            else if (typeof this.subdivision != "undefined")
                this.subdivision(s, .5)
        }
    }
    if (!i)
        this.model = null;
    this.aryActiveNodes = [];
    this.updateBoundRect()
};
Hanimation.AniObject.prototype.setAspectRatio = function(e) {
    this.forceAspectRatio = e
};
Hanimation.AniObject.prototype.enableRotation = function(e) {
    this.canRotate = e
};
Hanimation.AniObject.prototype.saveParam = function() {
    this.savedParam = JSON.clone(this.getParam())
};
Hanimation.AniObject.prototype.restoreParam = function() {
    if (this.savedParam) {
        this.dataRef.param = JSON.clone(this.savedParam)
    }
};
Hanimation.AniObject.prototype.decompress = function(e) {
    var t = this.dataRef;
    var n = e.gl.split(",");
    t.guid = n[0];
    t.id = n[1];
    t.type = n[2];
    t.name = n[3];
    t.param = decompressParam(e.pm);
    if (e.cv) {
        t.curve = decompressCurve(e.cv)
    } else if (e.it && e.it.length) {
        t.items = [];
        var r = e.it.length;
        for (var i = 0; i < r; i++) {
            var s = e.it[i];
            if (s && s.gl) {
                var o = s.gl.spit(",");
                if (o.length > 1) {
                    var u = o[1];
                    var a = createNewObject(u);
                    if (a) {
                        a.decompress(s);
                        t.items.push(a)
                    }
                }
            }
        }
    }
    return t
};
Hanimation.AniObject.prototype.offset = function(e, t) {
    var n = this.dataRef.curve ? this.dataRef.curve.points : [];
    var r = n.length;
    for (var i = 0; i < r; i++) {
        point = n[i];
        if (typeof point.x == "undefined")
            TriPoint.offset(point, e, t);
        else
            Point.offset(point, e, t)
    }
};
Hanimation.AniObject.prototype.supportPivot = function() {
    return false
};
Hanimation.AniObject.prototype.supportFreeTransform = function() {
    return true
};
Hanimation.AniObject.prototype.getProperties = function() {
    return this.dataRef
};
Hanimation.AniObject.prototype.setProperties = function(e) {
    var t = this.dataRef.param;
    if (e.strokeColor != undefined)
        t.strokeColor = e.strokeColor;
    if (e.lineWidth != undefined)
        t.lineWidth = e.lineWidth;
    if (e.left != undefined)
        t.left = e.left;
    if (e.top != undefined)
        t.top = e.top;
    if (e.width != undefined)
        t.width = e.width;
    if (e.height != undefined)
        t.height = e.height;
    if (e.alpha != undefined)
        t.alpha = e.alpha;
    if (e.fillInfo != undefined)
        t.fillInfo = e.fillInfo
};
Hanimation.AniObject.prototype.getRGB = function(e) {
    var t = new RGBColor(e);
    return t.toRGB()
};
Hanimation.AniObject.prototype.updateBound = function(e, t) {
    var n = this.getParam();
    if (n.left > e)
        n.left = e;
    if (n.right < e)
        n.right = e;
    if (n.top > t)
        n.top = t;
    if (n.bottom < t)
        n.bottom = t;
    n.width = n.right - n.left;
    n.height = n.bottom - n.top
};
Hanimation.AniObject.prototype.verticalFlip = function(e) {
    var t;
    var n;
    var r;
    var i = this.auxParam;
    var s = i.scaleX;
    var o = i.scaleY;
    e = e / o;
    var u = this.getParam();
    n = u.height;
    if (this.dataRef.curve && this.dataRef.curve.points && this.dataRef.curve.points.length) {
        var a = this.dataRef.curve.points.length;
        for (var f = 0; f < a; f++) {
            r = this.dataRef.curve.points[f];
            if (typeof r.nodeY != "undefined") {
                r.backwardY = n - r.backwardY;
                r.forwardY = n - r.forwardY;
                r.nodeY = n - r.nodeY
            } else if (typeof r.y != "undefined")
                r.y = n - r.y
        }
        u.top = e + e - u.bottom;
        u.bottom = u.top + u.height;
        u.startY = u.top;
        u.endY = u.bottom
    } else {
        if (typeof u.vF == "undefined")
            u.vF = 1;
        else
            u.vF = u.vF ? 0 : 1
    }
    if (u.fillInfo) {
        u.fillInfo.fillStartPos.y = n - u.fillInfo.fillStartPos.y;
        u.fillInfo.fillEndPos.y = n - u.fillInfo.fillEndPos.y
    }
};
Hanimation.AniObject.prototype.horizontalFlip = function(e) {
    var t;
    var n;
    var r;
    var i = this.auxParam;
    var s = i.scaleX;
    var o = i.scaleY;
    e = e / s;
    var u = this.getParam();
    n = u.width;
    if (this.dataRef.curve && this.dataRef.curve.points && this.dataRef.curve.points.length) {
        var a = this.dataRef.curve.points.length;
        for (var f = 0; f < a; f++) {
            r = this.dataRef.curve.points[f];
            if (typeof r.nodeX != "undefined") {
                r.backwardX = n - r.backwardX;
                r.forwardX = n - r.forwardX;
                r.nodeX = n - r.nodeX
            } else if (typeof r.x != "undefined")
                r.x = n - r.x
        }
        u.left = e + e - u.right;
        u.right = u.left + u.width;
        u.startX = u.left;
        u.endX = u.right
    } else {
        if (typeof u.hF == "undefined")
            u.hF = 1;
        else
            u.hF = u.hF ? 0 : 1
    }
    if (u.fillInfo) {
        u.fillInfo.fillStartPos.x = n - u.fillInfo.fillStartPos.x;
        u.fillInfo.fillEndPos.x = n - u.fillInfo.fillEndPos.x
    }
};
Hanimation.AniObject.prototype.setLocked = function(e, t) {
    this.locked = e
};
Hanimation.AniObject.prototype.needInvalidate = function(e) {
    return true
};
Hanimation.AniObject.prototype.setStartPoint = function(e, t, n) {
    this.editStartX = e;
    this.editStartY = t;
    this.isCreating = true
};
Hanimation.AniObject.prototype.adjustPosition = function(e, t, n, r) {
    if (typeof n == "undefined")
        n = 0;
    if (n & Hanimation.SHIFT_KEY) {
        var i = Math.abs(e - this.editStartX);
        var s = Math.abs(t - this.editStartY);
        if (r == 0) {
            if (i > s) {
                t = t > this.editStartY ? this.editStartY + i : this.editStartY - i
            } else {
                e = e > this.editStartX ? this.editStartX + s : this.editStartX - s
            }
        } else {
            var o = i / s
        }
    }
    return {x: e,y: t}
};
Hanimation.AniObject.prototype.setEndPoint = function(e, t, n) {
    var r = this.adjustPosition(e, t, n, 0);
    this.storeRegion(e, t, n);
    this.editEndX = r.x;
    this.editEndY = r.y
};
Hanimation.AniObject.prototype.setFinished = function(e, t) {
    var n = this.getParam();
    n.startX = this.editStartX;
    n.startY = this.editStartY;
    n.endX = this.editEndX;
    n.endY = this.editEndY;
    this.updateBoundRect();
    this.isCreating = false
};
Hanimation.AniObject.prototype.storeRegion = function(e, t, n) {
    if (this.prevRegion == null) {
        this.prevRegion = new Object;
        this.prevRegion.left = this.editStartX;
        this.prevRegion.top = this.editStartY;
        this.prevRegion.right = this.editStartX;
        this.prevRegion.bottom = this.editStartY
    } else {
        this.prevRegion.left = Math.min(this.editEndX, this.editStartX);
        this.prevRegion.top = Math.min(this.editEndY, this.editStartY);
        this.prevRegion.right = Math.max(this.editEndX, this.editStartX);
        this.prevRegion.bottom = Math.max(this.editEndY, this.editStartY)
    }
};
Hanimation.AniObject.prototype.setEditStartPoint = function(e, t, n, r) {
    this.isEditing = true;
    var i = this.getParam();
    this.editLeft = i.left;
    this.editTop = i.top;
    this.editRight = i.left + i.width;
    this.editBottom = i.top + i.height;
    this.editRotate = i.rotate;
    this.editRotateBaseX = i.rotateCenterX;
    this.editRotateBaseY = i.rotateCenterY;
    this.editOriginalStartX = e;
    this.editOriginalStartY = t;
    if (Math.abs(this.editRotate) > .001) {
        var s = rotatePoint(this.editRotateBaseX + this.editLeft, this.editRotateBaseY + this.editTop, e, t, -i.rotate);
        e = s.x;
        t = s.y
    }
    this.editStartX = e;
    this.editStartY = t;
    if (i.fillInfo) {
        this.editFillStartX = i.fillInfo.fillStartPos.x;
        this.editFillStartY = i.fillInfo.fillStartPos.y;
        this.editFillEndX = i.fillInfo.fillEndPos.x;
        this.editFillEndY = i.fillInfo.fillEndPos.y
    }
    var o = this.getLiveParams();
    this.setBufferParams(o);
    this.editScaleWithRotation = r & Hanimation.ALT_KEY;
    if (r & Hanimation.CTRL_KEY) {
        var u = this.editRotateBaseX + this.editLeft;
        var a = this.editRotateBaseY + this.editTop;
        switch (n) {
            case Hanimation.HITTEST_LEFTTOP:
                this.setScaleBase(u, a, this.editLeft, this.editTop);
                break;
            case Hanimation.HITTEST_RIGHTBOTTOM:
                this.setScaleBase(u, a, this.editRight, this.editBottom);
                break;
            case Hanimation.HITTEST_RIGHTTOP:
                this.setScaleBase(u, a, this.editRight, this.editTop);
                break;
            case Hanimation.HITTEST_LEFTBOTTOM:
                this.setScaleBase(u, a, this.editLeft, this.editBottom);
                break;
            case Hanimation.HITTEST_TOP:
                this.setScaleBase(u, a, this.editRight, this.editTop);
                break;
            case Hanimation.HITTEST_BOTTOM:
                this.setScaleBase(u, a, this.editRight, this.editBottom);
                break;
            case Hanimation.HITTEST_LEFT:
                this.setScaleBase(u, a, this.editLeft, this.editTop);
                break;
            case Hanimation.HITTEST_RIGHT:
                this.setScaleBase(u, a, this.editRight, this.editTop);
                break;
            case Hanimation.HITTEST_PIVOT:
                break;
            case Hanimation.HITTEST_WITHIN:
            case Hanimation.HITTEST_ROTATE:
            case Hanimation.HITTEST_NONE:
            case Hanimation.HITTEST_FILLSTART:
            case Hanimation.HITTEST_FILLEND:
            default:
                break
        }
    } else {
        switch (n) {
            case Hanimation.HITTEST_LEFTTOP:
                this.setScaleBase(this.editRight, this.editBottom, this.editLeft, this.editTop);
                break;
            case Hanimation.HITTEST_RIGHTBOTTOM:
                this.setScaleBase(this.editLeft, this.editTop, this.editRight, this.editBottom);
                break;
            case Hanimation.HITTEST_RIGHTTOP:
                this.setScaleBase(this.editLeft, this.editBottom, this.editRight, this.editTop);
                break;
            case Hanimation.HITTEST_LEFTBOTTOM:
                this.setScaleBase(this.editRight, this.editTop, this.editLeft, this.editBottom);
                break;
            case Hanimation.HITTEST_TOP:
                this.setScaleBase(this.editLeft, this.editBottom, this.editRight, this.editTop);
                break;
            case Hanimation.HITTEST_BOTTOM:
                this.setScaleBase(this.editLeft, this.editTop, this.editRight, this.editBottom);
                break;
            case Hanimation.HITTEST_LEFT:
                this.setScaleBase(this.editRight, this.editBottom, this.editLeft, this.editTop);
                break;
            case Hanimation.HITTEST_RIGHT:
                this.setScaleBase(this.editLeft, this.editBottom, this.editRight, this.editTop);
                break;
            case Hanimation.HITTEST_PIVOT:
                break;
            case Hanimation.HITTEST_WITHIN:
            case Hanimation.HITTEST_ROTATE:
            case Hanimation.HITTEST_NONE:
            case Hanimation.HITTEST_FILLSTART:
            case Hanimation.HITTEST_FILLEND:
            default:
                break
        }
    }
    this.editDeltaX = e - this.scaleBaseX;
    this.editDeltaY = t - this.scaleBaseY
};
Hanimation.AniObject.prototype.setSize = function(e, t) {
    var n = this.getParam();
    var r = e / n.width;
    var i = t / n.height;
    var s = new Object;
    s.direct = n;
    if (this.backupPoints)
        this.backupPoints();
    this.scale(s, n.left, n.top, r, i);
    this.updateBoundRect()
};
Hanimation.AniObject.prototype.needRotateUpdate = function() {
    return false
};
Hanimation.AniObject.prototype.setRotate = function(e, t, n) {
};
Hanimation.AniObject.prototype.setScaleBase = function(e, t, n, r) {
    this.scaleBaseX = e;
    this.scaleBaseY = t;
    this.scaleBaseWidth = Math.abs(e - n);
    this.scaleBaseHeight = Math.abs(t - r)
};
Hanimation.AniObject.prototype.keepAspectRatio = function(e, t, n) {
    var r = this.editRight - this.editLeft;
    var i = this.editBottom - this.editTop;
    var s = r / i;
    var o = Math.sqrt(r * r + i * i);
    var u = o;
    var a;
    var f;
    var l;
    switch (n) {
        case Hanimation.HITTEST_LEFTTOP:
        case Hanimation.HITTEST_LEFT:
            a = this.editRight - e;
            f = this.editBottom - t;
            u = Math.sqrt(a * a + f * f);
            l = u / o;
            e = this.editRight - l * r;
            t = this.editBottom - l * i;
            break;
        case Hanimation.HITTEST_RIGHTBOTTOM:
        case Hanimation.HITTEST_RIGHT:
            a = e - this.editLeft;
            f = t - this.editTop;
            u = Math.sqrt(a * a + f * f);
            l = u / o;
            e = this.editLeft + l * r;
            t = this.editTop + l * i;
            break;
        case Hanimation.HITTEST_RIGHTTOP:
        case Hanimation.HITTEST_TOP:
            a = e - this.editLeft;
            f = this.editBottom - t;
            u = Math.sqrt(a * a + f * f);
            l = u / o;
            e = this.editLeft + l * r;
            t = this.editBottom - l * i;
            break;
        case Hanimation.HITTEST_LEFTBOTTOM:
        case Hanimation.HITTEST_BUTTOM:
            a = this.editRight - e;
            f = t - this.editTop;
            u = Math.sqrt(a * a + f * f);
            l = u / o;
            e = this.editRight - l * r;
            t = this.editTop + l * i;
            break;
        default:
            break
    }
    return {x: e,y: t}
};
Hanimation.AniObject.prototype.setEditEndPoint = function(e, t, n, r) {
    function k(e, t, n, r, i, s) {
        var o = n - e;
        var u = r - t;
        var a = Math.atan2(u, o);
        o = i - e;
        u = s - t;
        var f = Math.atan2(u, o);
        x = f - a;
        return x
    }
    function L(e, t) {
        var n = e.scaleBaseX - t + e.editDeltaX + e.scaleBaseWidth;
        var r = n / e.scaleBaseWidth;
        return r
    }
    function A(e, t) {
        var n = t + (e.scaleBaseWidth - e.editDeltaX) - e.scaleBaseX;
        var r = n / e.scaleBaseWidth;
        return r
    }
    function O(e, t) {
        var n = e.scaleBaseY - t + e.editDeltaY + e.scaleBaseHeight;
        var r = n / e.scaleBaseHeight;
        return r
    }
    function M(e, t) {
        var n = t + (e.scaleBaseHeight - e.editDeltaY) - e.scaleBaseY;
        var r = n / e.scaleBaseHeight;
        return r
    }
    var i = this.getParam();
    this.editOriginalEndX = e;
    this.editOriginalEndY = t;
    var s = this.editOriginalEndX - this.editOriginalStartX;
    var o = this.editOriginalEndY - this.editOriginalStartY;
    if (Math.abs(this.editRotate) > .001) {
        var u = rotatePoint(this.editRotateBaseX + this.editLeft, this.editRotateBaseY + this.editTop, e, t, -i.rotate);
        e = u.x;
        t = u.y
    }
    if (!(r & Hanimation.MASTER_KEY) && (this.forceAspectRatio || r & Hanimation.SHIFT_KEY)) {
        var a = this.keepAspectRatio(e, t, n);
        e = a.x;
        t = a.y
    }
    var f;
    var l;
    var c = 1;
    var h = 1;
    var p = e - this.editStartX;
    var d = t - this.editStartY;
    var v = 0;
    var m = 0;
    var g = this.editRight - this.editLeft;
    var y = this.editBottom - this.editTop;
    var b = 1;
    var w = 1;
    var E;
    var S;
    var x;
    var T = this.getBufferParams();
    var N = this.editRotateBaseX;
    var C = this.editRotateBaseY;
    switch (n) {
        case Hanimation.HITTEST_FILLSTART:
            i.fillInfo.fillStartPos.x = this.editFillStartX + p;
            i.fillInfo.fillStartPos.y = this.editFillStartY + d;
            i.fillInfo.fillEndPos.x = this.editFillEndX + p;
            i.fillInfo.fillEndPos.y = this.editFillEndY + d;
            break;
        case Hanimation.HITTEST_FILLEND:
            i.fillInfo.fillEndPos.x = this.editFillEndX + p;
            i.fillInfo.fillEndPos.y = this.editFillEndY + d;
            break;
        case Hanimation.HITTEST_LEFTTOP:
            c = L(this, e);
            h = O(this, t);
            this.scale(T, this.scaleBaseX, this.scaleBaseY, c, h);
            break;
        case Hanimation.HITTEST_RIGHTBOTTOM:
            c = A(this, e);
            h = M(this, t);
            this.scale(T, this.scaleBaseX, this.scaleBaseY, c, h);
            break;
        case Hanimation.HITTEST_RIGHTTOP:
            c = A(this, e);
            h = O(this, t);
            this.scale(T, this.scaleBaseX, this.scaleBaseY, c, h);
            break;
        case Hanimation.HITTEST_LEFTBOTTOM:
            c = L(this, e);
            h = M(this, t);
            this.scale(T, this.scaleBaseX, this.scaleBaseY, c, h);
            break;
        case Hanimation.HITTEST_TOP:
            c = 1;
            h = O(this, t);
            this.scale(T, this.scaleBaseX, this.scaleBaseY, c, h);
            break;
        case Hanimation.HITTEST_BOTTOM:
            c = 1;
            h = M(this, t);
            this.scale(T, this.scaleBaseX, this.scaleBaseY, c, h);
            break;
        case Hanimation.HITTEST_LEFT:
            c = L(this, e);
            h = 1;
            this.scale(T, this.scaleBaseX, this.scaleBaseY, c, h);
            break;
        case Hanimation.HITTEST_RIGHT:
            c = A(this, e);
            sscaleYcaleY = 1;
            this.scale(T, this.scaleBaseX, this.scaleBaseY, c, h);
            break;
        case Hanimation.HITTEST_WITHIN:
            c = 1;
            h = 1;
            this.move(T, s, o, r);
            break;
        case Hanimation.HITTEST_CONTROL:
            this.editControl(this.activeControl, this.editStartX, this.editStartY, e, t, r);
            break;
        case Hanimation.HITTEST_ROTATE:
            x = k(N + i.left, C + i.top, this.editOriginalStartX, this.editOriginalStartY, this.editOriginalEndX, this.editOriginalEndY);
            if (typeof this.prevAngle == "undefined")
                this.prevAngle = x;
            else if (Math.abs(this.prevAngle - x) > Math.PI) {
            }
            this.rotate(T, x, r);
            break;
        case Hanimation.HITTEST_PIVOT:
            if (this.supportPivot() && r & Hanimation.CTRL_KEY) {
                i.customPivot = true;
                this.editPivotX = this.editRotateBaseX + p;
                this.editPivotY = this.editRotateBaseY + d
            } else {
                c = 1;
                h = 1;
                this.move(T, s, o, r)
            }
            break;
        case Hanimation.HITTEST_NONE:
        default:
            break
    }
    this.updateBoundRect();
    return {scaleX: c,scaleY: h,deltaX: p,deltaY: d,rotate: x}
};
Hanimation.AniObject.prototype.setEditFinished = function(e, t, n) {
    this.isEditing = false;
    var r = this.getParam();
    if (this.supportPivot() && r.customPivot) {
        if (n == Hanimation.HITTEST_PIVOT) {
            var i = rotatePoint(this.editRotateBaseX + this.editLeft, this.editRotateBaseY + this.editTop, this.editLeft, this.editTop, r.rotate);
            var s = rotatePoint(this.editRotateBaseX + this.editLeft, this.editRotateBaseY + this.editTop, this.editPivotX + this.editLeft, this.editPivotY + this.editTop, r.rotate);
            i = rotatePoint(s.x, s.y, i.x, i.y, -r.rotate);
            r.startX = i.x;
            r.startY = i.y;
            r.endX = i.x + r.width;
            r.endY = i.y + r.height
        }
        if (typeof this.editPivotX != "undefined" && typeof this.editPivotY != "undefined") {
            r.rotateCenterX = this.editPivotX;
            r.rotateCenterY = this.editPivotY;
            delete this.editPivotX;
            delete this.editPivotY
        }
    }
    this.updateBoundRect()
};
Hanimation.AniObject.prototype.editControl = function(e, t, n, r, i, s) {
};
Hanimation.AniObject.prototype.setBufferParams = function(e) {
    Param.exchange(this.bufferParam.direct, e.direct, false);
    Param.exchange(this.bufferParam.aux, e.aux, false)
};
Hanimation.AniObject.prototype.getBufferParams = function(e) {
    return this.bufferParam
};
Hanimation.AniObject.prototype.move = function(e, t, n, r) {
    var i = this.getParam();
    var s = e.direct;
    var o = e.aux;
    if (r & Hanimation.SHIFT_KEY) {
        var u = Math.abs(t / n);
        if (u > 2)
            n = 0;
        else if (u < .5)
            t = 0;
        else
            n = t * n > 0 ? t : -t
    }
    var a = s.endX - s.startX;
    var f = s.endY - s.startY;
    i.startX = s.startX + t;
    i.startY = s.startY + n;
    if (r & Hanimation.CTRL_KEY) {
        var u = Math.floor(i.startX / 10);
        i.startX = u * 10;
        u = Math.floor(i.startY / 10);
        i.startY = u * 10
    }
    i.endX = i.startX + a;
    i.endY = i.startY + f
};
Hanimation.AniObject.prototype.setSizeLimit = function(e, t, n, r) {
    this.minWidth = e;
    this.minHeight = t;
    this.maxWidth = n;
    this.maxHeight = r
};
Hanimation.AniObject.prototype.scale = function(e, t, n, r, i) {
    var s = this.getParam();
    var o = e.direct;
    r = Math.min(this.maxWidth / o.width, Math.max(this.minWidth / o.width, r));
    i = Math.min(this.maxHeight / o.height, Math.max(this.minHeight / o.height, i));
    s.startX = t + (o.startX - t) * r;
    s.endX = t + (o.endX - t) * r;
    s.startY = n + (o.startY - n) * i;
    s.endY = n + (o.endY - n) * i;
    var u = s.endX - s.startX;
    var a = s.endY - s.startY;
    s.rotateCenterX = this.editRotateBaseX * r;
    s.rotateCenterY = this.editRotateBaseY * i;
    this.editPivotX = s.rotateCenterX;
    this.editPivotY = s.rotateCenterY;
    if (Math.abs(this.editRotate) > .001 && this.isEditing) {
        var f = t - (t - this.editRotateBaseX - o.left) * r;
        var l = n - (n - this.editRotateBaseY - o.top) * i;
        var c = f - s.startX;
        var h = l - s.startY;
        var p = f - s.endX;
        var d = l - s.endY;
        var v = rotatePoint(this.editRotateBaseX + o.left, this.editRotateBaseY + o.top, f, l, s.rotate);
        s.startX = v.x - c;
        s.startY = v.y - h;
        s.endX = v.x - p;
        s.endY = v.y - d
    }
    this.updateBoundRect()
};
Hanimation.AniObject.prototype.convertRotate = function() {
    var e = this.getParam();
    var t;
    var n = this.getRotationCenter(false);
    var r = rotatePoint(n.x, n.y, e.left, e.top, e.rotate);
    var i = rotatePoint(n.x, n.y, e.right, e.top, e.rotate);
    var s = rotatePoint(n.x, n.y, e.right, e.bottom, e.rotate);
    var o = rotatePoint(n.x, n.y, e.left, e.bottom, e.rotate);
    e.left = Hanimation.MAX_VALUE;
    e.top = Hanimation.MAX_VALUE;
    e.right = Hanimation.MIN_VALUE;
    e.bottom = Hanimation.MIN_VALUE;
    this.updateBound(r.x, r.y);
    this.updateBound(i.x, i.y);
    this.updateBound(s.x, s.y);
    this.updateBound(o.x, o.y);
    e.startX = e.left;
    e.startY = e.top;
    e.endX = e.right;
    e.endY = e.bottom;
    e.rotate = 0
};
Hanimation.AniObject.prototype.rotate = function(e, t, n) {
    var r = this.getParam();
    var i = e.direct;
    var s = e.aux;
    r.rotate = i.rotate + t;
    if (n & Hanimation.SHIFT_KEY) {
        var o = Math.floor(r.rotate * 12 / Math.PI);
        r.rotate = o * Math.PI / 12
    }
};
Hanimation.AniObject.prototype.isValid = function() {
    var e = this.getParam();
    return e.width != 0 || e.height != 0
};
Hanimation.AniObject.prototype.drawFillControls = function(e, t, n) {
    var r = this.getParam();
    if (!r.fillInfo || r.fillInfo.fillStyle != 1 && r.fillInfo.fillStyle != 2)
        return;
    var t = typeof t == "undefined" ? true : t;
    var n = typeof n == "undefined" ? false : n;
    e.lineWidth = 1;
    e.strokeStyle = this.getRGB(this.fillCtrlFillColor);
    e.save();
    var i = 0;
    var s = 0;
    if (t) {
        i = r.left;
        s = r.top;
        e.translate(i, s)
    }
    var o = r.fillInfo.fillStartPos.x;
    var u = r.fillInfo.fillStartPos.y;
    var a = r.fillInfo.fillEndPos.x;
    var f = r.fillInfo.fillEndPos.y;
    e.beginPath();
    e.moveTo(o, u);
    e.lineTo(a, f);
    e.stroke();
    e.strokeStyle = this.getRGB(this.fillCtrlStrokeColor);
    e.fillStyle = this.getRGB(n ? this.editFillColor : this.fillCtrlFillColor);
    e.lineWidth = 2;
    e.beginPath();
    e.arc(o, u, this.fillCtrlSize, 0, Math.PI * 2, false);
    e.fill();
    e.beginPath();
    e.arc(o, u, this.fillCtrlSize, 0, Math.PI * 2, false);
    e.stroke();
    var l = this.fillCtrlSize;
    e.fillRect(a - l, f - l, l * 2, l * 2);
    e.beginPath();
    e.strokeRect(a - l, f - l, l * 2, l * 2);
    e.restore()
};
Hanimation.AniObject.prototype.isFinished = function(e, t) {
    return true
};
Hanimation.AniObject.prototype.drawControl = function(e, t, n, r) {
    switch (r) {
        case 0:
            e.strokeStyle = this.getRGB(this.controlStrokeColor);
            e.fillStyle = this.getRGB(this.editFillColor);
            break;
        case 1:
            e.strokeStyle = this.getRGB(this.controlStrokeColor);
            e.fillStyle = this.getRGB(this.controlFillColor);
            break;
        case 2:
            e.strokeStyle = this.getRGB(this.aidStrokeColor);
            e.fillStyle = this.getRGB(this.aidFillColor);
            break
    }
    e.lineWidth = 1;
    e.beginPath();
    e.arc(t, n, this.anchorRadius, 0, Math.PI * 2, false);
    e.fill();
    e.beginPath();
    e.arc(t, n, this.anchorRadius, 0, Math.PI * 2, false);
    e.stroke()
};
Hanimation.AniObject.prototype.drawControls = function(e) {
    var t = 0;
    var n = 0;
    var r = this.getLiveParam();
    e.save();
    this.prepareRotate(e);
    e.globalAlpha = .6;
    var i = 2;
    var s = 2;
    var o = r.width;
    var u = r.height;
    var a = 2 * this.anchorRadius;
    for (var f = 0; f < s; f++) {
        for (var l = 0; l < i; l++) {
            t = r.left + l * o;
            n = r.top + f * u;
            this.drawControl(e, t, n, 0)
        }
    }
    e.beginPath();
    e.moveTo(r.left, r.top);
    e.lineTo(r.right, r.top);
    e.lineTo(r.right, r.top + r.height);
    e.lineTo(r.left, r.top + r.height);
    e.lineTo(r.left, r.top);
    e.stroke();
    e.restore()
};
Hanimation.AniObject.prototype.drawHighlight = function(e) {
    function i(e, t, n, r, i, s) {
        var o = r - t;
        var u = i - n;
        var a = Math.sqrt(o * o + u * u);
        var f = Math.floor(a / s);
        var l = o / f;
        var c = u / f;
        var h = t;
        var p = n;
        for (var d = 0; d < f; d++) {
            if (d & 1)
                e.strokeStyle = "rgb(255, 255, 255)";
            else
                e.strokeStyle = "rgb(0, 0, 0)";
            e.beginPath();
            e.moveTo(h, p);
            h += l;
            p += c;
            e.lineTo(h, p);
            e.stroke()
        }
    }
    var t = 0;
    var n = 0;
    e.save();
    this.prepareRotate(e);
    var r = this.getBoundRect(true);
    if (Math.abs(r.left - r.right) > Hanimation.MAX_VALUE / 1e3 || Math.abs(r.top - r.bottom) > Hanimation.MAX_VALUE / 1e3)
        return;
    e.globalAlpha = 1;
    e.lineWidth = 1;
    i(e, r.left, r.top, r.right, r.top, 4);
    i(e, r.right, r.top, r.right, r.top + r.height, 4);
    i(e, r.left, r.top + r.height, r.right, r.top + r.height, 4);
    i(e, r.left, r.top + r.height, r.left, r.top, 4);
    e.restore()
};
Hanimation.AniObject.prototype.updateActiveNodes = function(e, t, n, r, i) {
};
Hanimation.AniObject.prototype.setFocusMode = function(e) {
    this.focusMode = e
};
Hanimation.Select = function(e) {
    Hanimation.AniObject.call(this, e);
    if (e)
        e.type = Hanimation.SHAPE_SELECT;
    this.aryObjects = []
};
inherit(Hanimation.Select, Hanimation.AniObject);
Hanimation.Select.prototype.getActiveObjectLength = function() {
    return this.aryObjects.length
};
Hanimation.Select.prototype.getObjectAt = function(e) {
    if (e >= 0 && e < this.aryObjects.length)
        return this.aryObjects[e];
    else
        return null
};
Hanimation.Select.prototype.addObject = function(e) {
    this.aryObjects.push(e)
};
Hanimation.Select.prototype.removeObjectAt = function(e) {
    this.aryObjects.splice(e, 1)
};
Hanimation.Select.prototype.clearSelection = function(e) {
    this.aryObjects = []
};
Hanimation.Select.prototype.updateRotationParams = function() {
    var e = this.aryObjects.length;
    var t = this.getParam();
    if (e == 1) {
        var n = this.aryObjects[0];
        var r = n.dataRef.param;
        t.rotate = r.rotate;
        {
            t.rotateCenterX = r.rotateCenterX;
            t.rotateCenterY = r.rotateCenterY
        }
        t.customPivot = false;
        if (r.customPivot) {
            centerX = r.left + r.rotateCenterX;
            centerY = r.top + r.rotateCenterY;
            t.customPivot = true
        }
    } else
        t.rotate = 0
};
Hanimation.Select.prototype.setBound = function(e, t, n, r) {
    this.setStartPoint(e, t, 0);
    this.setEndPoint(n, r, 0);
    this.setFinished(n, r)
};
Hanimation.Select.prototype.drawSelect = function(e, t) {
    e.save();
    e.globalAlpha = .6;
    var n = this.editEndX - this.editStartX;
    var r = this.editEndY - this.editStartY;
    e.lineWidth = 1;
    e.strokeStyle = "rgb(0, 128, 0)";
    e.beginPath();
    e.rect(this.editStartX, this.editStartY, n, r);
    e.stroke();
    e.globalAlpha = .1;
    e.fillStyle = "rgb(0, 255, 0)";
    e.beginPath();
    e.rect(this.editStartX, this.editStartY, n, r);
    e.fill();
    e.restore()
};
Hanimation.Select.prototype.drawRaw = function(e, t, n) {
    if (!n)
        return;
    var r = this.aryObjects.length;
    var t = this.getParam();
    var i = 0;
    var s = 0;
    var o = 0;
    var u = 0;
    var a = false;
    if (r == 1) {
        var f = this.aryObjects[0];
        var l = f.dataRef.param;
        o = l.left + l.rotateCenterX;
        u = l.top + l.rotateCenterY;
        if (f.supportPivot())
            a = true
    }
    if (this.isCreating) {
        this.drawSelect(e, 1);
        return
    }
    var c = this.focusMode == Hanimation.FM_EDIT;
    var t = this.getParam();
    if (!c) {
        e.lineWidth = t.lineWidth;
        e.strokeStyle = "rgb(0, 0, 0)";
        e.beginPath();
        e.rect(t.left, t.top, t.width, t.height);
        e.stroke()
    }
    e.strokeStyle = "rgb(255, 255, 255)";
    e.fillStyle = c ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)";
    e.save();
    e.globalAlpha = .6;
    var h = c ? 2 : 3;
    var p = c ? 2 : 3;
    var d = c ? t.width : t.width / 2;
    var v = c ? t.height : t.height / 2;
    var t = this.getParam();
    var m = this.anchorRadius;
    var g = 2 * m;
    var y = 0;
    for (var b = 0; b < p; b++) {
        for (var w = 0; w < h; w++) {
            i = t.left + w * d;
            s = t.top + b * v;
            if (b == 1 && w == 1 && !c) {
                if (t.customPivot) {
                    i = o;
                    s = u
                }
                e.save();
                e.globalAlpha = a ? 1 : .3;
                e.beginPath();
                e.arc(i, s, this.anchorRadius, 0, Math.PI * 2, false);
                e.fill();
                e.restore();
                e.beginPath();
                e.arc(i, s, this.anchorRadius, 0, Math.PI * 2, false);
                e.stroke()
            } else {
                if (this.useTouch && y != 8 && y != 0) {
                    y++;
                    continue
                }
                if (!(this.forceAspectRatio && !c && y & 1)) {
                    e.beginPath();
                    e.rect(i - m, s - m, g, g);
                    e.fill();
                    e.beginPath();
                    e.rect(i - m, s - m, g, g);
                    e.stroke()
                }
            }
            y++
        }
    }
    if (this.canRotate) {
        var E = this.anchorRadius * 2;
        e.strokeStyle = "rgb(0, 80, 0)";
        e.fillStyle = "rgb(0, 255, 0)";
        e.beginPath();
        e.arc(t.left + t.width + E, t.top - E, this.anchorRadius, 0, Math.PI * 2, false);
        e.fill();
        e.beginPath();
        e.arc(t.left + t.width + E, t.top - E, this.anchorRadius, 0, Math.PI * 2, false);
        e.stroke();
        e.beginPath();
        e.arc(t.left + t.width + E, t.top - E, this.anchorRadius + 3, Math.PI * 5 / 4, Math.PI / 4, false);
        e.stroke()
    }
    e.restore()
};
Hanimation.Select.prototype.hitTest = function(e, t, n) {
    var r = this.aryObjects.length;
    var i = this.focusMode == Hanimation.FM_EDIT || this.focusMode == Hanimation.FM_NODE;
    var s = Hanimation.HITTEST_NONE;
    if (!i) {
        s = Hanimation.AniObject.prototype.hitTest.call(this, e, t, n)
    } else {
        var o;
        for (var u = 0; u < r; u++) {
            o = this.aryObjects[u];
            o.setFocusMode(this.focusMode);
            s = o.hitTest(e, t, n);
            if (s != Hanimation.HITTEST_NONE)
                break
        }
    }
    this.hitPos = s;
    return s
};
Hanimation.Select.prototype.setEditStartPoint = function(e, t, n, r) {
    var i = this.getParam();
    var s = (i.left + i.right) / 2;
    var o = (i.top + i.bottom) / 2;
    var u = this.aryObjects.length;
    this.setRotateBase(s, o);
    Hanimation.AniObject.prototype.setEditStartPoint.call(this, e, t, n, r);
    var a;
    for (a = 0; a < u; a++) {
        this.aryObjects[a].setRotateBase(s, o);
        this.aryObjects[a].setEditStartPoint(e, t, n, r)
    }
    if (this.focusMode == Hanimation.FM_EDIT || n == Hanimation.HITTEST_WITHIN) {
        n = Hanimation.HITTEST_WITHIN
    } else {
        u = this.aryObjects.length;
        for (a = 0; a < u; a++) {
            this.aryObjects[a].setScaleBase(this.scaleBaseX, this.scaleBaseY, this.scaleBaseX + this.scaleBaseWidth, this.scaleBaseY + this.scaleBaseHeight);
            this.aryObjects[a].editDeltaX = this.editDeltaX;
            this.aryObjects[a].editDeltaY = this.editDeltaY
        }
    }
};
Hanimation.Select.prototype.setEditEndPoint = function(e, t, n, r) {
    if (this.forceAspectRatio || r & Hanimation.SHIFT_KEY) {
        var i = Math.abs(this.editRotate) > .001;
        if (i) {
            var s = rotatePoint(this.editRotateBaseX + this.editLeft, this.editRotateBaseY + this.editTop, e, t, -this.editRotate);
            e = s.x;
            t = s.y
        }
        var o = this.keepAspectRatio(e, t, n);
        if (i) {
            var u = e;
            var a = t;
            var s = rotatePoint(this.editRotateBaseX + this.editLeft, this.editRotateBaseY + this.editTop, o.x, o.y, this.editRotate);
            e = s.x;
            t = s.y
        } else {
            e = o.x;
            t = o.y
        }
        r |= Hanimation.MASTER_KEY
    }
    if (this.focusMode == Hanimation.FM_EDIT)
        n = Hanimation.HITTEST_WITHIN;
    var f;
    var l = this.aryObjects.length;
    var c = this.getParam();
    for (var h = 0; h < l; h++)
        this.aryObjects[h].setEditEndPoint(e, t, n, r);
    return {x: 1,y: 1}
};
Hanimation.Select.prototype.setEditFinished = function(e, t, n) {
    if (this.focusMode == Hanimation.FM_EDIT)
        n = Hanimation.HITTEST_WITHIN;
    var r = this.aryObjects.length;
    for (var i = 0; i < r; i++) {
        this.aryObjects[i].setEditFinished(e, t, n)
    }
};
Hanimation.Picture.prototype.setEditFinished = function(e, t, n) {
    Hanimation.AniObject.prototype.setEditFinished.call(this, e, t, n);
    var r = this.getParam();
    if (Math.abs(r.width - this.prevWidth) > .001 || Math.abs(r.height - this.prevHeight) > .001) {
        this.prevWidth = 0;
        this.prevHeight = 0;
        ImageCache.updateImage(this.dataRef.guid, null)
    }
};
Hanimation.Spline = function(e, t, n) {
    Hanimation.AniObject.call(this, e);
    if (e)
        e.type = Hanimation.SHAPE_SPLINE;
    this.pending = false;
    this.displayControl = true;
    this.aryBackupPoints = [];
    this.aryEditPoint = [];
    this.model = null;
    if (!isDefined(this.dataRef.param.smooth))
        this.dataRef.param.smooth = 4;
    this.addPoints(t, n)
};
inherit(Hanimation.Spline, Hanimation.AniObject);
Hanimation.Spline.prototype.createModel = function() {
    var e = this.dataRef.curve.points;
    var t = e.length;
    var n = this.isCreating ? Math.pow(2, this.dataRef.param.smooth) : 1;
    if (t <= 3)
        n = 1;
    more = t % n;
    var r = Math.floor(t / n);
    var i;
    for (var s = 1; s < r; s++) {
        i = s * n;
        e[s].x = e[i].x;
        e[s].y = e[i].y
    }
    if (more > 0) {
        e[r].x = e[t - 1].x;
        e[r].y = e[t - 1].y;
        r++
    }
    if (this.dataRef.curve.closed) {
        if (t <= r)
            e[r] = new Object;
        e[r].x = e[0].x;
        e[r].y = e[0].y;
        r++
    }
    t = r;
    e.length = t;
    if (t > 1) {
        this.model = get_model(e)
    }
    this.dataRef.param.smooth = 0
};
Hanimation.Spline.prototype.addPoints = function(e, t) {
    this.dataRef.curve.closed = t;
    if (e) {
        var n = e.length;
        for (var r = 0; r < n; r++) {
            var i = e[r];
            var s = createPoint(i.x, i.y);
            this.dataRef.curve.points.push(s)
        }
        this.updateBoundRect()
    }
};
Hanimation.Spline.prototype.copyData = function(e) {
    if (!e)
        return;
    if (this.dataRef == e)
        return;
    Hanimation.AniObject.prototype.copyData.call(this, e);
    this.dataRef.param.smooth = e.param.smooth
};
Hanimation.Spline.prototype.draw = function(e, t) {
    if (typeof t == "undefined")
        t = 1;
    e.save();
    var n = this.dataRef.curve.points;
    var r = n.length;
    if (!this.isCreating && (this.model == null || this.dataRef.param.smooth > 0)) {
        if (this.dataRef.param.smooth > 1)
            this.dataRef.param.smooth = 1;
        this.createModel()
    }
    var i = this.auxParam;
    var s = i.scaleX;
    var o = i.scaleY;
    var u = this.getParam();
    if (!this.isCreating) {
        e.translate(u.startX * s, u.startY * o)
    }
    e.lineWidth = u.lineWidth;
    e.lineCap = u.lineCap;
    e.lineJoin = u.lineJoin;
    e.globalAlpha = this.locked ? .3 : g_alpha * u.alpha * this.auxParam.alpha;
    var a = createPoint();
    var f = 0;
    var l = this.activeControl;
    var c = 0;
    var n = this.dataRef.curve.points;
    var h;
    if (t == 1) {
        h = new RGBColor(this.previewStrokeColor);
        e.strokeStyle = h.toRGB()
    } else {
        e.strokeStyle = getColor(u.strokeColor);
        e.fillStyle = createFillPattern(e, u.fillInfo, s, o)
    }
    e.lineCap = u.linecap;
    e.lineJoin = u.lineJoin;
    var p = t == 1 ? 1 : 2;
    for (var d = 0; d < p; d++) {
        e.beginPath();
        for (var v = 0; v < r - 1; v++) {
            var m = n[v];
            var g = n[v + 1];
            if (v == 0)
                e.moveTo(m.x * s, m.y * o);
            if (this.model == null) {
                e.lineTo(g.x * s, g.y * o)
            } else {
                var y = 0;
                var b = 20;
                var w = 1 / b;
                var E;
                var S;
                for (var x = 0; x < b; x++) {
                    E = interpolate(this.model.x, v, y);
                    S = interpolate(this.model.y, v, y);
                    y = y + w;
                    e.lineTo(E * s, S * o)
                }
            }
        }
        if (p > 1 && d == 0)
            e.fill();
        else
            e.stroke()
    }
    e.lineWidth = 1;
    if (t == 1 && this.displayControl) {
        for (var v = 0; v < r; v++) {
            if (this.aryActiveNodes[v] == 1) {
                a.x = n[v].x * s;
                a.y = n[v].y * o;
                c = c | 16;
                this.drawPoint(e, a, c)
            }
        }
    }
    if (t == 1 && (this.hitPos == Hanimation.HITTEST_FILLSTART || this.hitPos == Hanimation.HITTEST_FILLEND)) {
        this.drawFillControls(e, false, true)
    }
    this.postDraw(e, t);
    e.restore()
};
Hanimation.Spline.prototype.setScale = function(e, t, n) {
    Hanimation.AniObject.prototype.setScale.call(this, e, t, n);
    if (n)
        this.model = null;
    return true
};
Hanimation.Curve.prototype.clearPoints = function(e, t) {
    this.dataRef.curve.points = []
};
Hanimation.Curve.prototype.loadParams = function(e) {
    var t = e.childNodes;
    var n = t.length;
    this.dataRef.curve.points = [];
    for (var r = 0; r < n; r++) {
        var i = t[r];
        if (i.nodeName.toLowerCase() == "points") {
            var s = i.attributes.getNamedItem("closed").value;
            if (s.toLowerCase() == "yes")
                this.dataRef.curve.closed = true;
            else
                this.dataRef.curve.closed = false;
            var o = i.childNodes;
            var u = o.length;
            for (var a = 0; a < u; a++) {
                var f = o[a];
                if (f.nodeName.toLowerCase() == "param") {
                    var l = f.attributes.getNamedItem("name").value;
                    var c = f.attributes.getNamedItem("value").value;
                    if (l.toLowerCase() == "tripoint") {
                        var h = createTriPoint();
                        h.loadParams(c);
                        this.dataRef.curve.points.push(h)
                    }
                }
            }
        }
    }
    var p = this.getParam();
    p.startX = p.left;
    p.startY = p.top;
    p.right = p.left + p.width;
    p.bottom = p.top + p.height
};
Hanimation.Curve.prototype.saveParams = function(e) {
    var t = this.dataRef.curve.points.length;
    var n;
    e.BeginNode("points");
    e.Attrib("closed", this.dataRef.curve.closed ? "yes" : "no");
    for (var r = 0; r < t; r++) {
        n = this.dataRef.curve.points[r];
        n.saveParams(e)
    }
    e.EndNode()
};
Hanimation.Curve.prototype.drawTriPoint = function(e, t, n) {
    var r = this.anchorRadius * 2;
    var i = n & 8;
    e.save();
    if (i)
        e.globalAlpha = .4;
    e.strokeStyle = this.getRGB(i ? this.previewStrokeColor : this.aidStrokeColor);
    var s, o, u, a;
    e.beginPath();
    var f = n & 4;
    var l = true;
    var c = true;
    if (n & 1)
        c = false;
    if (n & 2)
        l = false;
    if (f) {
        if (c) {
            e.moveTo(t.backwardX, t.backwardY);
            e.lineTo(t.nodeX, t.nodeY)
        }
        if (l) {
            e.moveTo(t.nodeX, t.nodeY);
            e.lineTo(t.forwardX, t.forwardY)
        }
        e.stroke();
        e.fillStyle = this.getRGB(i ? this.previewStrokeColor : this.aidFillColor);
        if (l) {
            e.beginPath();
            e.arc(t.forwardX, t.forwardY, this.anchorRadius, 0, Math.PI * 2, false);
            e.fill()
        }
        if (c) {
            e.beginPath();
            e.arc(t.backwardX, t.backwardY, this.anchorRadius, 0, Math.PI * 2, false);
            e.fill()
        }
    }
    var h = this.controlFillColor;
    if (n & 16)
        h = this.controlActiveFillColor;
    e.fillStyle = this.getRGB(h);
    e.beginPath();
    e.arc(t.nodeX, t.nodeY, this.anchorRadius, 0, Math.PI * 2, false);
    e.fill();
    e.strokeStyle = this.getRGB(this.controlStrokeColor);
    e.beginPath();
    e.arc(t.nodeX, t.nodeY, this.anchorRadius, 0, Math.PI * 2, false);
    e.stroke();
    e.restore()
};
Hanimation.Curve.prototype.clearAnchorPoints = function() {
    this.dataRef.aryAnchors = []
};
Hanimation.Curve.prototype.addAnchorPoint = function(e, t) {
    this.dataRef.aryAnchors.push({x: e,y: t})
};
Hanimation.Curve.prototype.drawControls = function(e) {
    var t = this.getParam();
    e.save();
    e.translate(t.startX, t.startY);
    e.lineWidth = 1;
    var n = this.dataRef.curve.points.length;
    var r;
    var i = Math.floor(this.activeControl / 3);
    var s = 0;
    for (var o = 0; o < n; o++) {
        r = this.dataRef.curve.points[o];
        s = i == o ? 4 : 0;
        if (this.aryActiveNodes[o] == 1)
            s = s | 16;
        this.drawTriPoint(e, r, s)
    }
    e.restore()
};
Hanimation.Curve.prototype.updateActiveNodes = function(e, t, n, r, i) {
    var s = i & 2;
    var o = 0;
    var u = i & 8;
    if (u) {
        var a = this.activeControl % 3;
        var f = Math.floor(this.activeControl / 3);
        if (a != 0) {
            this.aryActiveNodes = [];
            this.aryActiveNodes[f] = 1;
            o++
        } else if (this.aryActiveNodes[f] == 1) {
        } else if (s) {
            this.aryActiveNodes[f] = 1;
            o++
        } else {
            this.aryActiveNodes = [];
            this.aryActiveNodes[f] = 1;
            o++
        }
    } else {
        var l = this.dataRef.curve.points.length;
        var c;
        var h = this.getParam();
        if (s == 0)
            this.aryActiveNodes = [];
        for (var p = 0; p < l; p++) {
            c = this.dataRef.curve.points[p];
            if (ptInRect(h.left + c.nodeX, h.top + c.nodeY, e, t, n, r)) {
                this.aryActiveNodes[p] = this.aryActiveNodes[p] == 1 ? 0 : 1;
                if (this.aryActiveNodes[p] == 1)
                    o++
            }
        }
    }
    return o
};
Hanimation.Curve.prototype.setStartPoint = function(e, t, n) {
    var r = this.dataRef.curve.points.length;
    if (r == 0) {
        var i = createTriPoint(e, t, e, t, e, t);
        this.dataRef.curve.points.push(i)
    } else {
        if (this.dataRef.curve.closed) {
        } else
            TriPoint.set(this.dataRef.curve.points[r - 1], e, t, e, t, e, t);
        this.pending = false
    }
};
Hanimation.Curve.prototype.setEndPoint = function(e, t, n) {
    this.storeRegion(e, t, n);
    var r = 16;
    var i = this.dataRef.curve.points.length;
    if (i > 0) {
        if (i > 2 && Math.abs(this.dataRef.curve.points[0].nodeX - e) < r && Math.abs(this.dataRef.curve.points[0].nodeY - t) < r) {
            this.dataRef.curve.closed = true
        } else
            this.dataRef.curve.closed = false;
        if (i == 1 || !this.dataRef.curve.closed && !this.pending) {
            var s = this.dataRef.curve.points[i - 1];
            s.forwardX = e;
            s.forwardY = t;
            TriPoint.setCounterPoint(s, true, true)
        } else if (this.pending) {
            if (this.dataRef.curve.closed) {
                TriPoint.set(this.dataRef.curve.points[i - 1], this.dataRef.curve.points[0].nodeX, this.dataRef.curve.points[0].nodeY, this.dataRef.curve.points[0].forwardX, this.dataRef.curve.points[0].forwardY, this.dataRef.curve.points[0].backwardX, this.dataRef.curve.points[0].backwardY)
            } else {
                TriPoint.set(this.dataRef.curve.points[i - 1], e, t, e, t, e, t)
            }
        }
    }
};
Hanimation.Curve.prototype.isFinished = function(e, t) {
    var n = this.dataRef.curve.points.length;
    var r = false;
    if (n > 1) {
        var i = this.dataRef.curve.points[0];
        var s = this.dataRef.curve.points[n - 1];
        r = TriPoint.isEqual(i, s, 0)
    }
    var o;
    if (!r) {
        o = createTriPoint(e, t, e, t, e, t);
        this.dataRef.curve.points.push(o);
        this.pending = true
    } else if (n > 0) {
        var u = this.dataRef.curve.points[0];
        var a = this.dataRef.curve.points[n - 1];
        u.backwardX = a.backwardX;
        u.backwardY = a.backwardY;
        this.dataRef.curve.points.splice(n - 1, 1);
        this.dataRef.curve.closed = true
    }
    return r
};
Hanimation.Curve.prototype.setFinished = function(e, t) {
    var n = this.dataRef.curve.points.length;
    if (!this.dataRef.curve.closed && n > 1) {
        this.dataRef.curve.points.splice(n - 1, 1)
    }
    if (n > 1)
        this.updateBoundRect();
    this.isCreating = false
};
Hanimation.Curve.prototype.isValid = function() {
    return this.dataRef.curve.points.length > 1
};
Hanimation.Curve.prototype.setEditFinished = function(e, t, n) {
    this.isEditing = false;
    {
        this.hitPos = n;
        this.updateBoundRect()
    }
};
Hanimation.Curve.prototype.backupPoints = function() {
    var e;
    this.aryBackupPoints = [];
    this.aryBackupAnchors = [];
    var t = this.dataRef.curve.points.length;
    for (var n = 0; n < t; n++) {
        e = createTriPoint();
        TriPoint.copy(e, this.dataRef.curve.points[n]);
        this.aryBackupPoints.push(e)
    }
    var r = this.dataRef.aryAnchors.length;
    for (var n = 0; n < r; n++) {
        e = new Object;
        e.x = this.dataRef.aryAnchors[n].x;
        e.y = this.dataRef.aryAnchors[n].y;
        this.aryBackupAnchors.push(e)
    }
};
Hanimation.Curve.prototype.setEditStartPoint = function(e, t, n, r) {
    Hanimation.AniObject.prototype.setEditStartPoint.call(this, e, t, n, r);
    var i = this.dataRef.curve.points.length;
    var s;
    var o = this.activeControl % 3;
    var u = Math.floor(this.activeControl / 3);
    this.aryEditTriPoint = [];
    if (n == Hanimation.HITTEST_CONTROL) {
        this.backupPoints();
        for (var a = 0; a < i; a++) {
            s = this.dataRef.curve.points[a];
            var f = createTriPoint();
            TriPoint.set(f, s.nodeX, s.nodeY, s.forwardX, s.forwardY, s.backwardX, s.backwardY);
            this.aryEditTriPoint.push(f)
        }
    } else if (n != Hanimation.HITTEST_NONE) {
        this.backupPoints();
        this.activeControl = -1
    } else {
        Hanimation.AniObject.prototype.setEditStartPoint.call(this, e, t, n, r)
    }
};
Hanimation.Curve.prototype.scale = function(e, t, n, r, i) {
    var s = this.getParam();
    var o = e.direct;
    s.startX = t + (o.startX - t) * r;
    s.endX = t + (o.endX - t) * r;
    s.startY = n + (o.startY - n) * i;
    s.endY = n + (o.endY - n) * i;
    s.rotateCenterX = this.editRotateBaseX * r;
    s.rotateCenterY = this.editRotateBaseY * i;
    var u = this.dataRef.curve.points.length;
    var a;
    var f;
    for (var l = 0; l < u; l++) {
        a = this.dataRef.curve.points[l];
        backPoint = this.aryBackupPoints[l];
        a.nodeX = backPoint.nodeX * r;
        a.nodeY = backPoint.nodeY * i;
        a.forwardX = backPoint.forwardX * r;
        a.forwardY = backPoint.forwardY * i;
        a.backwardX = backPoint.backwardX * r;
        a.backwardY = backPoint.backwardY * i
    }
    u = this.dataRef.aryAnchors.length;
    for (l = 0; l < u; l++) {
        a = this.dataRef.aryAnchors[l];
        backPoint = this.aryBackupAnchors[l];
        a.x = backPoint.x * r;
        a.y = backPoint.y * i
    }
};
Hanimation.Curve.prototype.needRotateUpdate = function() {
    return true
};
Hanimation.Curve.prototype.setRotate = function(e, t, n) {
    var r = this.getLiveParams();
    var i = this.getParam();
    if (i.fillInfo) {
        this.editFillStartX = i.fillInfo.fillStartPos.x;
        this.editFillStartY = i.fillInfo.fillStartPos.y;
        this.editFillEndX = i.fillInfo.fillEndPos.x;
        this.editFillEndY = i.fillInfo.fillEndPos.y
    }
    this.backupPoints();
    this.setRotateBase(e, t);
    this.hitPos = Hanimation.HITTEST_CONTROL;
    this.rotate(r, n, null);
    this.updateBoundRect()
};
Hanimation.Curve.prototype.rotate = function(e, t, n) {
    var r = this.getParam();
    var i = e.direct;
    var s = e.aux;
    r.rotate = i.rotate + t;
    if (n & Hanimation.SHIFT_KEY) {
        var o = Math.floor(r.rotate * 12 / Math.PI);
        r.rotate = o * Math.PI / 12
    }
    var u;
    var a = r.rotateCenterX;
    var f = r.rotateCenterY;
    var l = this.dataRef.curve.points.length;
    var c;
    var h;
    for (var p = 0; p < l; p++) {
        c = this.dataRef.curve.points[p];
        backPoint = this.aryBackupPoints[p];
        u = rotatePoint(a, f, backPoint.nodeX, backPoint.nodeY, r.rotate);
        c.nodeX = u.x;
        c.nodeY = u.y;
        u = rotatePoint(a, f, backPoint.forwardX, backPoint.forwardY, r.rotate);
        c.forwardX = u.x;
        c.forwardY = u.y;
        u = rotatePoint(a, f, backPoint.backwardX, backPoint.backwardY, r.rotate);
        c.backwardX = u.x;
        c.backwardY = u.y
    }
    l = this.dataRef.aryAnchors.length;
    for (p = 0; p < l; p++) {
        c = this.dataRef.aryAnchors[p];
        backPoint = this.aryBackupAnchors[p];
        u = rotatePoint(a, f, backPoint.x, backPoint.y, r.rotate);
        c.x = u.x;
        c.y = u.y
    }
    u = rotatePoint(a, f, this.editFillStartX, this.editFillStartY, r.rotate);
    r.fillInfo.fillStartPos.x = u.x;
    r.fillInfo.fillStartPos.y = u.y;
    u = rotatePoint(a, f, this.editFillEndX, this.editFillEndY, r.rotate);
    r.fillInfo.fillEndPos.x = u.x;
    r.fillInfo.fillEndPos.y = u.y
};
Hanimation.Curve.prototype.editControl = function(e, t, n, r, i, s) {
    var o = !(s & Hanimation.ALT_KEY);
    var u = e % 3;
    var a = Math.floor(e / 3);
    var f;
    var l = s & Hanimation.CTRL_KEY;
    var c = r - t;
    var h = i - n;
    if (s & Hanimation.SHIFT_KEY) {
        var p = c / h;
        if (Math.abs(p) > 2)
            h = 0;
        else if (Math.abs(p) < .5)
            c = 0;
        else
            c = p > 0 ? h : -h
    }
    var d = this.dataRef.curve.points.length;
    var v;
    var m;
    var g = this.getParam();
    var y = 0;
    var b = d;
    if (u != 0) {
        y = a;
        b = y + 1
    }
    for (var w = y; w < b; w++) {
        a = w;
        if (this.aryActiveNodes[a] == 1) {
            v = this.dataRef.curve.points[a];
            m = this.aryEditTriPoint[a];
            if (u == 0) {
                v.nodeX = m.nodeX + c;
                v.nodeY = m.nodeY + h;
                v.forwardX = m.forwardX + c;
                v.forwardY = m.forwardY + h;
                v.backwardX = m.backwardX + c;
                v.backwardY = m.backwardY + h
            } else if (u == 1) {
                v.forwardX = m.forwardX + c;
                v.forwardY = m.forwardY + h;
                if (o)
                    TriPoint.setCounterPoint(v, true, l)
            } else if (u == 2) {
                v.backwardX = m.backwardX + c;
                v.backwardY = m.backwardY + h;
                if (o)
                    TriPoint.setCounterPoint(v, false, l)
            }
        }
    }
};
Hanimation.BShape.prototype.setStartPoint = function(e, t, n) {
    Hanimation.AniObject.prototype.setStartPoint.call(this, e, t, n)
};
Hanimation.BShape.prototype.setEndPoint = function(e, t, n) {
    Hanimation.AniObject.prototype.setEndPoint.call(this, e, t, n);
    this.updatePoints(this.editStartX, this.editStartY, this.editEndX, this.editEndY, n)
};
Hanimation.BShape.prototype.setEditEndPoint = function(e, t, n, r) {
    Hanimation.AniObject.prototype.setEditEndPoint.call(this, e, t, n, r)
};
Hanimation.BShape.prototype.updatePoints = function(e, t, n, r, i) {
};
Hanimation.BShape.prototype.updateControls = function(e, t, n, r, i) {
};
Hanimation.BShape.prototype.drawControls = function(e) {
    var t = this.aryControls.length;
    if (t == 0)
        Hanimation.Curve.prototype.drawControls.call(this, e);
    else {
        e.save();
        var n = this.getParam();
        e.translate(n.startX, n.startY);
        e.lineWidth = n.lineWidth;
        var r;
        for (var i = 0; i < t; i++) {
            r = this.aryControls[i];
            this.drawControl(e, r.x, r.y, 1)
        }
        e.restore()
    }
};
Hanimation.BShape.prototype.isFinished = function(e, t) {
    return true
};
Hanimation.BShape.prototype.setClosed = function(e) {
    this.dataRef.curve.closed = e
};
Hanimation.BShape.prototype.clearControlPoints = function(e, t) {
    this.aryControls = []
};
Hanimation.BShape.prototype.addControlPoint = function(e, t) {
    var n = new Hanimation.Point(e, t);
    this.aryControls.push(n)
};
Hanimation.BShape.prototype.addPoint = function(e, t) {
    var n = createTriPoint(e, t, e, t, e, t);
    this.dataRef.curve.points.push(n)
};
Hanimation.BShape.prototype.addTriPoint = function(e, t, n, r, i, s) {
    var o = createTriPoint(e, t, n, r, i, s);
    this.dataRef.curve.points.push(o)
};
Hanimation.BShape.prototype.isValid = function() {
    return Hanimation.AniObject.prototype.isValid.call(this)
};
Hanimation.BShape.prototype.setFinished = function(e, t) {
    Hanimation.Curve.prototype.setFinished.call(this, e, t)
};
Hanimation.BRectangle.prototype.updatePoints = function(e, t, n, r, i) {
    this.clearPoints();
    if (e < n && t < r) {
        var s = n;
        n = e;
        e = s
    }
    if (e > n && t > r) {
        var s = n;
        n = e;
        e = s
    }
    this.addPoint(e, t);
    this.addPoint(n, t);
    this.addPoint(n, r);
    this.addPoint(e, r);
    this.setClosed(true)
};
Hanimation.Pencil.prototype.addPoint = function(e, t) {
    if (!this.lastPoint)
        return;
    var n = this.dataRef.curve.points;
    var r = .2;
    var i = r * (e - this.lastPoint.x);
    var s = r * (t - this.lastPoint.y);
    var o = createTriPoint((e + this.lastPoint.x) / 2, (t + this.lastPoint.y) / 2, e - i, t - s, this.lastPoint.x + i, this.lastPoint.y + s);
    n.push(o)
};
Hanimation.Pencil.prototype.updatePoints = function(e, t, n, r, i) {
    function s(e, t, n, r) {
        return Math.sqrt(Math.pow(e - n, 2) + Math.pow(t - r, 2))
    }
    var o = Math.pow(2, this.dataRef.param.smooth);
    if (this.lastPoint) {
        if (s(this.lastPoint.x, this.lastPoint.y, n, r) > o) {
            this.addPoint(n, r);
            this.lastPoint.x = n;
            this.lastPoint.y = r
        }
    } else {
        this.lastPoint = {};
        this.lastPoint.x = e;
        this.lastPoint.y = t
    }
};
Hanimation.Pencil.prototype.setFinished = function(e, t) {
    var n = this.dataRef.curve.points.length;
    if (n > 1)
        this.updateBoundRect();
    this.isCreating = false
};
Hanimation.BEllipse.prototype.updatePoints = function(e, t, n, r, i) {
    var s = Math.min(e, n);
    var o = Math.min(t, r);
    var u = Math.max(e, n);
    var a = Math.max(t, r);
    var f = (s + u) / 2;
    var l = (o + a) / 2;
    var c = .54858377;
    var h = (u - s) / 2;
    var p = (a - o) / 2;
    var d = 0;
    var v = 0;
    var m = Math.PI / 2;
    var g = h * c;
    var y = p * c;
    this.clearPoints();
    this.addTriPoint(u, l, u, l + y, u, l - y);
    this.addTriPoint(f, a, f - g, a, f + g, a);
    this.addTriPoint(s, l, s, l - y, s, l + y);
    this.addTriPoint(f, o, f + g, o, f - g, o);
    this.setClosed(true)
};
Hanimation.BLine.prototype.updatePoints = function(e, t, n, r, i) {
    this.clearPoints();
    this.addTriPoint(e, t, e, t, e, t);
    this.addTriPoint(n, r, n, r, n, r);
    this.addTriPoint(n, r, n, r, n, r);
    this.setClosed(false)
};
Hanimation.BRounded.prototype.updatePoints = function(e, t, n, r, i) {
    var s = Math.min(e, n);
    var o = Math.min(t, r);
    var u = Math.max(e, n);
    var a = Math.max(t, r);
    var f = .54858377;
    var l = Math.min(u - s, a - o) / 2;
    this.clearPoints();
    var c = Math.min(this.dataRef.cornerRadius[0], l);
    var h = c * f;
    this.addTriPoint(s + c, o, s + c - h, o, s + c, o);
    this.addTriPoint(s, o + c, s, o + c, s, o + c - h);
    c = Math.min(this.dataRef.cornerRadius[3], l);
    h = c * f;
    this.addTriPoint(s, a - c, s, a - c + h, s, a - c);
    this.addTriPoint(s + c, a, s + c, a, s + c - h, a);
    c = Math.min(this.dataRef.cornerRadius[2], l);
    h = c * f;
    this.addTriPoint(u - c, a, u - c + h, a, u - c, a);
    this.addTriPoint(u, a - c, u, a - c, u, a - c + h);
    c = Math.min(this.dataRef.cornerRadius[1], l);
    h = c * f;
    this.addTriPoint(u, o + c, u, o + c - h, u, o + c);
    this.addTriPoint(u - c, o, u - c, o, u - c + h, o);
    this.setClosed(true);
    this.clearAnchorPoints();
    this.addAnchorPoint(e, t);
    this.addAnchorPoint(n, t);
    this.addAnchorPoint(n, r);
    this.addAnchorPoint(e, r)
};
Hanimation.BRounded.prototype.updateBoundRect = function() {
    Hanimation.BShape.prototype.updateBoundRect.call(this);
    this.updateControls()
};
Hanimation.BRounded.prototype.updateControls = function(e, t, n, r) {
    this.clearControlPoints();
    this.addControlPoint(this.dataRef.curve.points[1].nodeX, this.dataRef.curve.points[1].nodeY);
    this.addControlPoint(this.dataRef.curve.points[2].nodeX, this.dataRef.curve.points[2].nodeY);
    this.addControlPoint(this.dataRef.curve.points[5].nodeX, this.dataRef.curve.points[5].nodeY);
    this.addControlPoint(this.dataRef.curve.points[6].nodeX, this.dataRef.curve.points[6].nodeY)
};
Hanimation.BRounded.prototype.setRoundScale = function(e, t, n) {
    var r = this.dataRef.curve.points[e];
    var i = this.aryBackupPoints[e];
    var s = this.dataRef.aryAnchors;
    r.nodeX = s[t].x + (i.nodeX - s[t].x) * n;
    r.nodeY = s[t].y + (i.nodeY - s[t].y) * n;
    r.backwardX = s[t].x + (i.backwardX - s[t].x) * n;
    r.backwardY = s[t].y + (i.backwardY - s[t].y) * n;
    r.forwardX = s[t].x + (i.forwardX - s[t].x) * n;
    r.forwardY = s[t].y + (i.forwardY - s[t].y) * n
};
Hanimation.BRounded.prototype.editControl = function(e, t, n, r, i, s) {
    var o = !(s & Hanimation.ALT_KEY);
    var u = e % 3;
    var a = Math.floor(e / 3);
    var f;
    var l = r - t;
    var c = i - n;
    var h = this.getParam();
    var p = 0;
    var d = 1;
    switch (a) {
        case 1:
            p = 0;
            break;
        case 5:
            p = 2;
            break;
        case 2:
            p = 1;
            break;
        case 6:
            p = 3;
            break;
        default:
            break
    }
    var v = t - this.aryControls[p].x;
    var m = this.aryControls[p].x - this.dataRef.aryAnchors[p].x;
    if (m == 0)
        m = 1;
    d = (r - v - this.dataRef.aryAnchors[p].x) / m;
    d = Math.max(.1, d);
    if (p >= 0) {
        if (o) {
            this.setRoundScale(0, 0, d);
            this.setRoundScale(1, 0, d);
            this.setRoundScale(2, 1, d);
            this.setRoundScale(3, 1, d);
            this.setRoundScale(4, 2, d);
            this.setRoundScale(5, 2, d);
            this.setRoundScale(6, 3, d);
            this.setRoundScale(7, 3, d)
        } else {
            this.setRoundScale(p * 2, p, d);
            this.setRoundScale(p * 2 + 1, p, d)
        }
    }
};
Hanimation.Polygon.prototype.supportFreeTransform = function() {
    return false
};
Hanimation.Polygon.prototype.drawControls = function(e) {
    var t = this.getParam();
    this.drawControl(e, t.outerX, t.outerY, 1);
    this.drawControl(e, this.leftBound / 2 + this.rightBound / 2, this.topBound, 1);
    this.drawControl(e, this.leftBound / 2 + this.rightBound / 2, this.bottomBound, 1);
    this.drawControl(e, t.innerX, t.innerY, 1)
};
Hanimation.Polygon.prototype.setStartPoint = function(e, t) {
    Hanimation.BShape.prototype.setStartPoint.call(this, e, t);
    this.dataRef.param.centerX = e;
    this.dataRef.param.centerY = t
};
Hanimation.Polygon.prototype.setEndPoint = function(e, t) {
    Hanimation.Curve.prototype.setEndPoint.call(this, e, t);
    this.dataRef.param.outerX = e;
    this.dataRef.param.outerY = t;
    this.createPoints()
};
Hanimation.Polygon.prototype.createPoints = function() {
    this.clearPoints();
    var e = this.dataRef.param;
    var t = e.centerX;
    var n = e.centerY;
    var r = e.outerX;
    var i = e.outerY;
    var s = r - t;
    var o = i - n;
    var u = Math.sqrt(s * s + o * o);
    var a;
    var f = Math.atan2(o, s);
    var l = Math.PI / this.dataRef.param.edges;
    this.addTriPoint(r, i, r, i, r, i);
    this.leftBound = r;
    this.rightBound = r;
    this.topBound = i;
    this.bottomBound = i;
    var c = e.innerPercent * u * Math.cos(Math.PI / this.dataRef.param.edges);
    a = f;
    var h = Math.min(e.section, e.edges - 1);
    var e = this.getParam();
    for (var p = 0; p < h; p++) {
        a = a + l;
        x = t + c * Math.cos(a);
        y = n + c * Math.sin(a);
        if (p == 0) {
            e.innerX = x;
            e.innerY = y
        }
        this.addTriPoint(x, y, x, y, x, y);
        a = a + l;
        x = t + u * Math.cos(a);
        y = n + u * Math.sin(a);
        this.addTriPoint(x, y, x, y, x, y);
        if (x < this.leftBound)
            this.leftBound = x;
        if (x > this.rightBound)
            this.rightBound = x;
        if (y < this.topBound)
            this.topBound = y;
        if (y > this.bottomBound)
            this.bottomBound = y
    }
    if (e.section < e.edges) {
        this.addTriPoint(t, n, t, n, t, n);
        if (t < this.leftBound)
            this.leftBound = t;
        if (t > this.rightBound)
            this.rightBound = t;
        if (n < this.topBound)
            this.topBound = n;
        if (n > this.bottomBound)
            this.bottomBound = n
    } else {
        a = a + l;
        x = t + c * Math.cos(a);
        y = n + c * Math.sin(a);
        this.addTriPoint(x, y, x, y, x, y)
    }
    this.setClosed(true);
    var d = this.dataRef.curve.points.length;
    for (var p = 0; p < d; p++) {
        point = this.dataRef.curve.points[p]
    }
};
Hanimation.Polygon.prototype.setEditStartPoint = function(e, t, n, r) {
    Hanimation.AniObject.prototype.setEditStartPoint.call(this, e, t, n, r);
    var i = this.dataRef.param;
    this.previousEdges = i.edges;
    this.previousSection = i.section;
    this.previousInnerPercent = i.innerPercent;
    this.prevCenterX = i.centerX;
    this.prevCenterY = i.centerY;
    this.prevOuterX = i.outerX;
    this.prevOuterY = i.outerY;
    this.prevInnerX = i.innerX;
    this.prevInnerY = i.innerY
};
Hanimation.Polygon.prototype.setEditEndPoint = function(e, t, n, r) {
    var i = this.getParam();
    switch (n) {
        case Hanimation.HITTEST_CONTROL:
            this.isCreating = true;
            switch (this.activeControl) {
                case 1:
                    i.outerX = e;
                    i.outerY = t;
                    break;
                case 2:
                    i.edges = this.previousEdges + (e > this.editStartX ? 1 : -1) * Math.floor(Math.abs(e - this.editStartX) / 30);
                    if (i.edges < 3)
                        i.edges = 3;
                    if (i.edges > 23)
                        i.edges = 23;
                    i.section = this.previousSection + (i.edges - this.previousEdges);
                    break;
                case 3:
                    i.section = this.previousSection + (e > this.editStartX ? 1 : -1) * Math.floor(Math.abs(e - this.editStartX) / 30);
                    if (i.section > i.edges)
                        i.section = i.edges;
                    if (i.section < 1)
                        i.section = 1;
                    break;
                case 4:
                    i.innerPercent = this.previousInnerPercent + (e > this.editStartX ? 1 : -1) * .02 * Math.abs(e - this.editStartX);
                    if (i.innerPercent > 10)
                        i.innerPercent = 10;
                    if (i.innerPercent < .1)
                        i.innerPercent = .1;
                    break
            }
            break;
        default:
            Hanimation.AniObject.prototype.setEditEndPoint.call(this, e, t, n, r);
            if (n == Hanimation.HITTEST_WITHIN) {
                var s = e - this.editStartX;
                var o = t - this.editStartY;
                var u = this.dataRef.param;
                u.centerX = this.prevCenterX + s;
                u.centerY = this.prevCenterY + o;
                u.outerX = this.prevOuterX + s;
                u.outerY = this.prevOuterY + o;
                this.isCreating = true
            } else
                ;
            break
    }
    if (this.isCreating)
        this.createPoints()
};
Hanimation.Polygon.prototype.setEditFinished = function(e, t, n) {
    this.hitPos = n;
    this.isEditing = false;
    if (this.hitPos == Hanimation.HITTEST_CONTROL) {
        var r = this.getParam();
        r.fillInfo.fillStartPos.x += r.left;
        r.fillInfo.fillStartPos.y += r.top;
        r.fillInfo.fillEndPos.x += r.left;
        r.fillInfo.fillEndPos.y += r.top
    }
    this.updateBoundRect();
    this.isCreating = false
};
Hanimation.Spline.prototype.needInvalidate = function(e) {
    if (e == 0)
        return false;
    else
        return true
};
Hanimation.Spline.prototype.setRotate = function(e, t, n) {
    var r = this.getLiveParams();
    var i = this.getParam();
    if (i.fillInfo) {
        this.editFillStartX = i.fillInfo.fillStartPos.x;
        this.editFillStartY = i.fillInfo.fillStartPos.y;
        this.editFillEndX = i.fillInfo.fillEndPos.x;
        this.editFillEndY = i.fillInfo.fillEndPos.y
    }
    this.backupPoints();
    this.setRotateBase(e, t);
    this.hitPos = Hanimation.HITTEST_CONTROL;
    this.rotate(r, n, null);
    this.updateBoundRect()
};
Hanimation.Spline.prototype.needRotateUpdate = function() {
    return true
};
Hanimation.Spline.prototype.drawPoint = function(e, t, n) {
    var r = this.anchorRadius * 2;
    var i = n & 8;
    e.save();
    if (i)
        e.globalAlpha = .4;
    e.strokeStyle = this.getRGB(i ? this.previewStrokeColor : this.aidStrokeColor);
    var s, o, u, a;
    e.beginPath();
    var f = this.controlFillColor;
    if (n & 16)
        f = this.controlActiveFillColor;
    e.fillStyle = this.getRGB(f);
    e.beginPath();
    e.arc(t.x, t.y, this.anchorRadius, 0, Math.PI * 2, false);
    e.fill();
    e.strokeStyle = this.getRGB(this.controlStrokeColor);
    e.beginPath();
    e.arc(t.x, t.y, this.anchorRadius, 0, Math.PI * 2, false);
    e.stroke();
    e.restore()
};
Hanimation.Spline.prototype.drawControls = function(e) {
    e.save();
    var t = this.dataRef.curve.points;
    var n = t.length;
    e.lineWidth = 1;
    var r = this.auxParam;
    var i = r.scaleX;
    var s = r.scaleY;
    var o = this.getParam();
    var u = createPoint();
    var a = this.activeControl;
    if (!this.isCreating) {
        e.translate(o.startX * i, o.startY * s)
    }
    {
        for (var f = 0; f < n; f++) {
            u.x = t[f].x * i;
            u.y = t[f].y * s;
            if (this.aryActiveNodes.length > 0 && this.isEditing) {
                option = 0;
                if (a == f)
                    option = 8 + 4;
                else {
                    if (a > 0 && f == a - 1)
                        option = option | 8 | 4 | 1;
                    if (a >= 0 && a < n - 1 && f == a + 1)
                        option = option | 8 | 4 | 2
                }
            } else {
                option = f == 0 ? 1 : 0;
                if (n > 1 && f == n - 1)
                    option = option | 2;
                if (n < 2 || f >= n - 2)
                    option = option | 4
            }
            if (this.aryActiveNodes[f] == 1)
                option = option | 16;
            this.drawPoint(e, u, option)
        }
    }
    e.restore()
};
Hanimation.Spline.prototype.updateActiveNodes = function(e, t, n, r, i) {
    var s = i & 2;
    var o = 0;
    var u = i & 8;
    var a = this.dataRef.curve.points;
    if (u) {
        var f = 0;
        var l = this.activeControl;
        if (f != 0) {
            this.aryActiveNodes = [];
            this.aryActiveNodes[l] = 1;
            o++
        } else if (this.aryActiveNodes[l] == 1) {
        } else if (s) {
            this.aryActiveNodes[l] = 1;
            o++
        } else {
            this.aryActiveNodes = [];
            this.aryActiveNodes[l] = 1;
            o++
        }
    } else {
        var c = a.length;
        var h;
        var p = this.getParam();
        if (s == 0)
            this.aryActiveNodes = [];
        for (var d = 0; d < c; d++) {
            h = a[d];
            if (ptInRect(p.left + h.x, p.top + h.y, e, t, n, r)) {
                this.aryActiveNodes[d] = this.aryActiveNodes[d] == 1 ? 0 : 1;
                if (this.aryActiveNodes[d] == 1)
                    o++
            }
        }
    }
    return o
};
Hanimation.Spline.prototype.subdivision = function(e, t) {
    if (!this.model)
        return;
    var n = this.dataRef.curve.points;
    var r = n.length;
    var i = e;
    var s = t;
    var o = interpolate(this.model.x, i, s);
    var u = interpolate(this.model.y, i, s);
    if (i < r - 1)
        n.splice(i + 1, 0, {x: o,y: u})
};
Hanimation.Spline.prototype.hitTest = function(e, t, n) {
    var r = this.getParam();
    e = e - r.startX;
    t = t - r.startY;
    var i = n & 2;
    var s = false;
    var o = Hanimation.HITTEST_NONE;
    var u = this.dataRef.curve.points;
    var a = u.length;
    var f;
    for (var l = 0; l < a; l++) {
        f = u[l];
        if (e >= f.x - this.anchorRadius && e < f.x + this.anchorRadius && t >= f.y - this.anchorRadius && t < f.y + this.anchorRadius) {
            this.activeControl = l;
            o = Hanimation.HITTEST_CONTROL;
            if (s) {
                if (i == 0)
                    this.aryActiveNodes = [];
                this.aryActiveNodes[l] = this.aryActiveNodes[l] == 1 ? 0 : 1
            }
            break
        }
    }
    if (o != Hanimation.HITTEST_CONTROL) {
        this.activeControl = -1;
        if (i == 0 && s)
            this.aryActiveNodes = [];
        var r = this.getParam();
        var c = e + r.startX;
        var h = t + r.startY;
        o = Hanimation.AniObject.prototype.hitTest.call(this, c, h, n);
        if (o != Hanimation.HITTEST_ROTATE && o != Hanimation.HITTEST_FILLSTART && o != Hanimation.HITTEST_FILLEND) {
        }
    } else if (this.focusMode == Hanimation.FM_EDIT)
        o = Hanimation.HITTEST_WITHIN;
    this.hitPos = o;
    return o
};
Hanimation.Spline.prototype.setStartPoint = function(e, t, n) {
    var r = this.dataRef.curve.points;
    r = [];
    var i = 0;
    var s = createPoint(e, t);
    r.push(s);
    this.isCreating = true
};
Hanimation.Spline.prototype.setEndPoint = function(e, t, n) {
    this.storeRegion(e, t, n);
    var r = this.dataRef.curve.points;
    var i = r.length;
    point = createPoint(e, t);
    r.push(point)
};
Hanimation.Spline.prototype.setFinished = function(e, t) {
    this.updateBoundRect();
    this.isCreating = false
};
Hanimation.Spline.prototype.isValid = function() {
    return this.dataRef.curve.points.length > 1
};
Hanimation.Spline.prototype.updateBoundRect = function() {
    if (this.isEditing)
        return;
    this.createModel();
    var e = this.isCreating ? false : true;
    var t = this.dataRef.curve.points;
    var n = t.length;
    var r = this.getParam();
    r.left = Hanimation.MAX_VALUE;
    r.top = Hanimation.MAX_VALUE;
    r.right = Hanimation.MIN_VALUE;
    r.bottom = Hanimation.MIN_VALUE;
    var i = r.left;
    var s = r.top;
    for (var o = 0; o < n - 1; o++) {
        var u = t[o];
        var a = t[o + 1];
        this.updateBound(u.x, u.y);
        var f = 0;
        var l = 20;
        var c = 1 / l;
        var h;
        var p;
        for (var d = 0; d < l; d++) {
            h = interpolate(this.model.x, o, f);
            p = interpolate(this.model.y, o, f);
            f = f + c;
            this.updateBound(h, p)
        }
        this.updateBound(a.x, a.y)
    }
    var v = r.left;
    var m = r.top;
    if (e) {
        r.startX = r.startX + v;
        r.startY = r.startY + m
    } else {
        r.startX = r.left;
        r.startY = r.top
    }
    r.width = r.right - r.left;
    r.height = r.bottom - r.top;
    r.left = r.startX;
    r.top = r.startY;
    r.right = r.left + r.width;
    r.bottom = r.top + r.height;
    r.startX = r.left;
    r.startY = r.top;
    r.endX = r.right;
    r.endY = r.bottom;
    if (this.isEditing)
        return;
    for (var o = 0; o < n; o++) {
        point = t[o];
        point.x = point.x - v;
        point.y = point.y - m
    }
    if (Math.abs(v) > .001 && Math.abs(m) > .001)
        this.model = null;
    r.rotate = 0;
    switch (this.hitPos) {
        case Hanimation.HITTEST_CONTROL:
            r.fillInfo.fillStartPos.x -= v;
            r.fillInfo.fillStartPos.y -= m;
            r.fillInfo.fillEndPos.x -= v;
            r.fillInfo.fillEndPos.y -= m;
            break;
        case Hanimation.HITTEST_LEFTTOP:
        case Hanimation.HITTEST_RIGHTBOTTOM:
        case Hanimation.HITTEST_RIGHTTOP:
        case Hanimation.HITTEST_LEFTBOTTOM:
        case Hanimation.HITTEST_TOP:
        case Hanimation.HITTEST_BOTTOM:
        case Hanimation.HITTEST_LEFT:
        case Hanimation.HITTEST_RIGHT:
            var g = this.editFillStartX / (this.editRight - this.editLeft);
            var y = this.editFillStartY / (this.editBottom - this.editTop);
            r.fillInfo.fillStartPos.x = (r.right - r.left) * g;
            r.fillInfo.fillStartPos.y = (r.bottom - r.top) * g;
            g = this.editFillEndX / (this.editRight - this.editLeft);
            y = this.editFillEndY / (this.editBottom - this.editTop);
            r.fillInfo.fillEndPos.x = (r.right - r.left) * g;
            r.fillInfo.fillEndPos.y = (r.bottom - r.top) * y;
            break
    }
};
Hanimation.Spline.prototype.backupPoints = function() {
    var e;
    this.aryBackupPoints = [];
    var t = this.dataRef.curve.points;
    var n = t.length;
    for (var r = 0; r < n; r++) {
        e = createPoint(t[r].x, t[r].y);
        this.aryBackupPoints.push(e)
    }
};
Hanimation.Spline.prototype.setEditStartPoint = function(e, t, n, r) {
    Hanimation.AniObject.prototype.setEditStartPoint.call(this, e, t, n, r);
    var i = this.dataRef.curve.points;
    var s = i.length;
    var o;
    var u = 0;
    var a = this.activeControl;
    this.aryEditPoint = [];
    if (n == Hanimation.HITTEST_CONTROL) {
        this.backupPoints();
        for (var f = 0; f < s; f++) {
            o = createPoint(i[f].x, i[f].y);
            this.aryEditPoint.push(o)
        }
    } else if (n != Hanimation.HITTEST_NONE) {
        this.backupPoints();
        this.activeControl = -1
    } else {
        Hanimation.AniObject.prototype.setEditStartPoint.call(this, e, t, n, r)
    }
};
Hanimation.Spline.prototype.setEditEndPoint = function(e, t, n, r) {
    Hanimation.AniObject.prototype.setEditEndPoint.call(this, e, t, n, r);
    this.model = null
};
Hanimation.Spline.prototype.setEditFinished = function(e, t, n) {
    this.isEditing = false;
    {
        this.hitPos = n;
        this.updateBoundRect()
    }
};
Hanimation.Spline.prototype.scale = function(e, t, n, r, i) {
    var s = this.getParam();
    var o = e.direct;
    s.startX = t + (o.startX - t) * r;
    s.endX = t + (o.endX - t) * r;
    s.startY = n + (o.startY - n) * i;
    s.endY = n + (o.endY - n) * i;
    s.rotateCenterX = this.editRotateBaseX * r;
    s.rotateCenterY = this.editRotateBaseY * i;
    var u = this.dataRef.curve.points;
    var a = u.length;
    var f;
    var l;
    for (var c = 0; c < a; c++) {
        f = u[c];
        backPoint = this.aryBackupPoints[c];
        f.x = backPoint.x * r;
        f.y = backPoint.y * i
    }
};
Hanimation.Spline.prototype.rotate = function(e, t, n) {
    var r = this.getParam();
    var i = e.direct;
    var s = e.aux;
    r.rotate = i.rotate + t;
    if (n & Hanimation.SHIFT_KEY) {
        var o = Math.floor(r.rotate * 12 / Math.PI);
        r.rotate = o * Math.PI / 12
    }
    var r = this.getParam();
    var i = e.direct;
    var s = e.aux;
    var u;
    var a = r.rotateCenterX;
    var f = r.rotateCenterY;
    var l = this.dataRef.curve.points;
    var c = l.length;
    var h;
    var p;
    for (var d = 0; d < c; d++) {
        h = l[d];
        backPoint = this.aryBackupPoints[d];
        u = rotatePoint(a, f, backPoint.x, backPoint.y, r.rotate);
        h.x = u.x;
        h.y = u.y
    }
};
Hanimation.Spline.prototype.editControl = function(e, t, n, r, i, s) {
    var o = !(s & Hanimation.ALT_KEY);
    var u = 0;
    var a = e;
    var f;
    var l = s & Hanimation.CTRL_KEY;
    var c = r - t;
    var h = i - n;
    var p = this.dataRef.curve.points;
    var d = p.length;
    var v;
    var m;
    var g = this.getParam();
    var y = 0;
    var b = d;
    if (u != 0) {
        y = a;
        b = y + 1
    }
    for (var w = y; w < b; w++) {
        a = w;
        if (this.aryActiveNodes[a] == 1) {
            v = p[a];
            m = this.aryBackupPoints[a];
            if (u == 0) {
                v.x = m.x + c;
                v.y = m.y + h
            }
        }
    }
};
Hanimation.Camera.prototype.draw = function(e, t) {
    var n = this.getParam();
    var r = Math.round(n.left + (n.width - this.iconW) / 2);
    var i = Math.round(n.top + (n.height - this.iconH) / 2);
    e.save();
    this.prepareRotate(e);
    var s = new RGBColor(t == 2 ? "#008800" : t == 1 ? "#FF0000" : "#808080");
    e.strokeStyle = s.toRGB();
    e.lineWidth = 1;
    var o = this.iconW;
    var u = this.iconH;
    var a = (n.width - o) / 2;
    var f = (n.height - u) / 2;
    e.globalAlpha = .6;
    e.beginPath();
    e.strokeRect(r, i, o, u);
    e.strokeRect(r + 4, i - 4, 8, 4);
    e.strokeRect(n.left, n.top, n.width, n.height);
    e.arc(r + this.iconW / 2 + 4, i + this.iconH / 2, 8, 0, Math.PI * 2, false);
    e.moveTo(r + this.iconW / 2 + 8, i + this.iconH / 2);
    e.arc(r + this.iconW / 2 + 4, i + this.iconH / 2, 4, 0, Math.PI * 2, false);
    e.stroke();
    e.lineWidth = 1;
    e.beginPath();
    e.moveTo(n.left, n.top);
    e.lineTo(n.left + a, n.top + f);
    e.moveTo(n.left + n.width, n.top + n.height);
    e.lineTo(n.left + n.width - a, n.top + n.height - f);
    e.moveTo(n.left + n.width, n.top);
    e.lineTo(n.left + n.width - a, n.top + f);
    e.moveTo(n.left, n.top + n.height);
    e.lineTo(n.left + a, n.top + n.height - f);
    e.stroke();
    e.restore()
};
Hanimation.Camera.prototype.move = function(e, t, n, r) {
    var i = this.getParam();
    var s = e.direct;
    var o = e.aux;
    if (r & Hanimation.SHIFT_KEY) {
        var u = Math.abs(t / n);
        if (u > 2)
            n = 0;
        else if (u < .5)
            t = 0;
        else
            n = t * n > 0 ? t : -t
    }
    i.startX = Math.min(this.canvasWidth - i.width, Math.max(0, s.startX + t));
    i.startY = Math.min(this.canvasHeight - i.height, Math.max(0, s.startY + n));
    if (r & Hanimation.CTRL_KEY) {
        var u = Math.floor(i.startX / 10);
        i.startX = u * 10;
        u = Math.floor(i.startY / 10);
        i.startY = u * 10
    }
    i.endY = i.startY + i.height;
    i.endX = i.startX + i.width
};
Hanimation.Camera.prototype.updateCanvas = function(e, t) {
    this.canvasWidth = e;
    this.canvasHeight = t
};
Hanimation.Camera.prototype.updateCamera = function(e, t, n) {
    var r = this.getParam();
    r.startX = n.offsetLeft;
    r.startY = n.offsetTop;
    r.width = e / n.zoomLevel;
    r.height = t / n.zoomLevel;
    r.endX = r.startX + r.width;
    r.endY = r.startY + r.height;
    r.rotate = n.rotation;
    this.updateCanvas(e, t);
    this.setSizeLimit(64, 64 * t / e, e, t);
    this.updateBoundRect()
};
