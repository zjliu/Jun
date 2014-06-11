'use strict'

var util = require('util'),
    events = require('events'),
    Texture2D = require('./Texture2D').Texture2D


/* QUAD STRUCTURE
 quad = {
     drawRect: <rect>, // Where the quad is drawn to
     textureRect: <rect>  // The slice of the texture to draw in drawRect
 }
*/

/**
 * @class
 * A single texture that can represent lots of smaller images
 *
 * @memberOf cocos
 *
 * @opt {String} [url] Remote URL of the image to use as a texture
 * @opt {String} [file] Local file path of the image to use as a texture
 * @opt {Texture2D|HTMLImageElement} [data] Image data to read from
 * @opt {CanvasElement} [canvas] A canvas to use as a texture
 */
function TextureAtlas (opts) {
    var file    = opts.file
      , url     = opts.url
      , data    = opts.data
      , texture = opts.texture
      , canvas  = opts.canvas

    if (canvas) {
        // If we've been given a canvas element then we'll use that for our image
        this.imgElement = canvas
    } else {
        texture = new Texture2D({ url: url, texture: texture, file: file, data: data })
        events.addListenerOnce(texture, 'load', function () {
            events.trigger(this, 'load')
        }.bind(this))
        this.texture = texture
        this.imgElement = texture.imgElement
    }

    this.quads = []
}

TextureAtlas.inherit(Object, /** @lends cocos.TextureAtlas# */ {
    quads: null,
    imgElement: null,
    texture: null,

    insertQuad: function (opts) {
        var quad = opts.quad,
            index = opts.index || 0

        this.quads.splice(index, 0, quad)
    },
    removeQuad: function (opts) {
        var index = opts.index

        this.quads.splice(index, 1)
    },


    drawQuads: function (ctx) {
        this.quads.forEach(function (quad) {
            if (!quad) return
            this.drawQuad(ctx, quad)
        }.bind(this))
    },

    drawQuad: function (ctx, quad) {
        var sx = quad.textureRect.origin.x,
            sy = quad.textureRect.origin.y,
            sw = quad.textureRect.size.width,
            sh = quad.textureRect.size.height

        var dx = quad.drawRect.origin.x,
            dy = quad.drawRect.origin.y,
            dw = quad.drawRect.size.width,
            dh = quad.drawRect.size.height


        var scaleX = 1
        var scaleY = 1

        if (cc.FLIP_Y_AXIS) {
            dy -= dh
            dh *= -1
        }


        if (dw < 0) {
            dw *= -1
            scaleX = -1
        }

        if (dh < 0) {
            dh *= -1
            scaleY = -1
        }

        ctx.scale(scaleX, scaleY)


        var img = this.imgElement
        ctx.drawImage(img,
            sx, sy, // Draw slice from x,y
            sw, sh, // Draw slice size
            dx, dy, // Draw at 0, 0
            dw, dh  // Draw size
        )

        if (cc.FLIP_Y_AXIS) {
            ctx.scale(1, -1)
        } else {
            ctx.scale(1, 1)
        }
    }
})

exports.TextureAtlas = TextureAtlas

// vim:et:st=4:fdm=marker:fdl=0:fdc=1
