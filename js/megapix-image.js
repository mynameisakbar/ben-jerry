/**
 * Mega pixel image rendering library for iOS6 Safari
 *
 * Fixes iOS6 Safari's image file rendering issue for large size image (over mega-pixel),
 * which causes unexpected subsampling when drawing it in canvas.
 * By using this library, you can safely render the image with proper stretching.
 *
 * Copyright (c) 2012 Shinichi Tomita <shinichi.tomita@gmail.com>
 * Released under the MIT license
 */
(function() {

  /**
   * Detect subsampling in loaded image.
   * In iOS, larger images than 2M pixels may be subsampled in rendering.
   */
  function detectSubsampling(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    if (iw * ih > 1024 * 1024) { // subsampling may happen over megapixel image
      var canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, -iw + 1, 0);
      // subsampled image becomes half smaller in rendering size.
      // check alpha channel value to confirm image is covering edge pixel or not.
      // if alpha value is 0 image is not covering, hence subsampled.
      return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
    } else {
      return false;
    }
  }

  /**
   * Detecting vertical squash in loaded image.
   * Fixes a bug which squash image vertically while drawing into canvas for some images.
   */
  function detectVerticalSquash(img, iw, ih) {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
      var alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio===0)?1:ratio;
  }

  /**
   * Rendering image element (with resizing) and get its data URL
   */
  function renderImageToDataURL(img, options) {
    var canvas = document.createElement('canvas');
    renderImageToCanvas(img, canvas, options);
    return canvas.toDataURL("image/jpeg", options.quality || 0.8);
  }

  /**
   * Rendering image element (with resizing) into the canvas element
   */
  function renderImageToCanvas(img, canvas, options) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var width = options.width, height = options.height;
    var ctx = canvas.getContext('2d');
    ctx.save();
    transformCoordinate(canvas, width, height, options.orientation);
    var subsampled = detectSubsampling(img);
    if (subsampled) {
      iw /= 2;
      ih /= 2;
    }
    var d = 1024; // size of tiling canvas
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = tmpCanvas.height = d;
    var tmpCtx = tmpCanvas.getContext('2d');
    var vertSquashRatio = detectVerticalSquash(img, iw, ih);
    var sy = 0;
    while (sy < ih) {
      var sh = sy + d > ih ? ih - sy : d;
      var sx = 0;
      while (sx < iw) {
        var sw = sx + d > iw ? iw - sx : d;
        tmpCtx.clearRect(0, 0, d, d);
        tmpCtx.drawImage(img, -sx, -sy);
        var dx = (sx * width / iw) << 0;
        var dw = Math.ceil(sw * width / iw);
        var dy = (sy * height / ih / vertSquashRatio) << 0;
        var dh = Math.ceil(sh * height / ih / vertSquashRatio);
        ctx.drawImage(tmpCanvas, 0, 0, sw, sh, dx, dy, dw, dh);
        sx += d;
      }
      sy += d;
    }

    ctx.restore();
    tmpCanvas = tmpCtx = null;
  }

  /**
   * Transform canvas coordination according to specified frame size and orientation
   * Orientation value is from EXIF tag
   */
  function transformCoordinate(canvas, width, height, orientation) {
    switch (orientation) {
      case 5:
      case 6:
      case 7:
      case 8:
        canvas.width = height;
        canvas.height = width;
        break;
      default:
        canvas.width = width;
        canvas.height = height;
    }
    var ctx = canvas.getContext('2d');
    switch (orientation) {
      case 2:
        // horizontal flip
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        break;
      case 3:
        // 180 rotate left
        ctx.translate(width, height);
        ctx.rotate(Math.PI);
        break;
      case 4:
        // vertical flip
        ctx.translate(0, height);
        ctx.scale(1, -1);
        break;
      case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
      case 6:
        // 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0, -height);
        break;
      case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(width, -height);
        ctx.scale(-1, 1);
        break;
      case 8:
        // 90 rotate left
        ctx.rotate(-0.5 * Math.PI);
        ctx.translate(-width, 0);
        break;
      default:
        break;
    }
  }


  /**
   * MegaPixImage class
   */
  function MegaPixImage(srcImage) {
    if (srcImage instanceof Blob) {
      var img = new Image();
      var URL = window.URL && window.URL.createObjectURL ? window.URL :
                window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL :
                null;
      if (!URL) { throw Error("No createObjectURL function found to create blob url"); }
      img.src = URL.createObjectURL(srcImage);
      srcImage = img;
    }
    if (!srcImage.naturalWidth && !srcImage.naturalHeight) {
      var _this = this;
      srcImage.onload = function() {
        var listeners = _this.imageLoadListeners;
        if (listeners) {
          _this.imageLoadListeners = null;
          for (var i=0, len=listeners.length; i<len; i++) {
            listeners[i]();
          }
        }
      };
      this.imageLoadListeners = [];
    }
    this.srcImage = srcImage;
  }

  /**
   * Rendering megapix image into specified target element
   */
  MegaPixImage.prototype.render = function(target, options) {
    if (this.imageLoadListeners) {
      var _this = this;
      this.imageLoadListeners.push(function() { _this.render(target, options) });
      return;
    }
    options = options || {};
    var imgWidth = this.srcImage.naturalWidth, imgHeight = this.srcImage.naturalHeight,
        width = options.width, height = options.height,
        maxWidth = options.maxWidth, maxHeight = options.maxHeight;
    if (width && !height) {
      height = (imgHeight * width / imgWidth) << 0;
    } else if (height && !width) {
      width = (imgWidth * height / imgHeight) << 0;
    } else {
      width = imgWidth;
      height = imgHeight;
    }
    if (maxWidth && width > maxWidth) {
      width = maxWidth;
      height = (imgHeight * width / imgWidth) << 0;
    }
    if (maxHeight && height > maxHeight) {
      height = maxHeight;
      width = (imgWidth * height / imgHeight) << 0;
    }
    var opt = { width : width, height : height };
    for (var k in options) opt[k] = options[k];

    var tagName = target.tagName.toLowerCase();
    if (tagName === 'img') {
      target.src = renderImageToDataURL(this.srcImage, opt);
    } else if (tagName === 'canvas') {
      renderImageToCanvas(this.srcImage, target, opt);
    }
    if (typeof this.onrender === 'function') {
      this.onrender(target);
    }

    //alert($('#canvasImage').height());
    //alert($('#canvasImage').width());

    if($('#canvasImage').width()/$('#canvasImage').height() == 0.75){
            $('#canvasImage').css("opacity", "1");
            $('#canvasImage').css("padding-left", "85px");
            $('#canvasImage').css("position", "relative");
            $('#canvasImage').css("top", "30px");
            $('#canvasImage').css("margin-bottom", "20px");

        }else if ($('#canvasImage').width()/$('#canvasImage').height() == 1){
            $('#canvasImage').css("opacity", "1");
            $('#canvasImage').css("padding-left", "85px");
            $('#canvasImage').css("position", "relative");
            $('#canvasImage').css("top", "20px");
            $('#canvasImage').css("margin-bottom", "20px");

        }else if ($('#canvasImage').width()/$('#canvasImage').height() > 1){
            $('#canvasImage').css("opacity", "0");
            alert("Please upload portrait image, instead of landscape.");

        }else {
            $('#canvasImage').css("opacity", "1");
            $('#canvasImage').css("padding-left", "105px");
            $('#canvasImage').css("position", "relative");
            $('#canvasImage').css("top", "20px");
            $('#canvasImage').css("margin-bottom", "20px");
            
        }

  };

  /**
   * Export class to global
   */
  if (typeof define === 'function' && define.amd) {
    define([], function() { return MegaPixImage; }); // for AMD loader
  } else {
    this.MegaPixImage = MegaPixImage;
  }

})();
