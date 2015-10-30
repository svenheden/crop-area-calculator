(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.calculateCropArea = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function calculateCropArea(params) {
  if (!(
      params.sourceWidth &&
      params.sourceHeight &&
      params.targetAspectRatio &&
      params.focalPointX != null &&
      params.focalPointY != null
    )) {
    throw new Error('Missing needed arguments for calculateCropArea()');
  }

  var sourceAspectRatio = params.sourceWidth / params.sourceHeight;
  var x1, x2, y1, y2, newWidth, newHeight;

  x1 = x2 = y1 = y2 = 0;

  if (params.targetAspectRatio === sourceAspectRatio) {
    x2 = params.sourceWidth;
    y2 = params.sourceHeight;
  } else if (params.targetAspectRatio > sourceAspectRatio) {
    // the requested aspect ratio is wider than the source image

    newHeight = Math.round(params.sourceWidth / params.targetAspectRatio);

    x2 = params.sourceWidth;
    y1 = Math.max(params.focalPointY - Math.round(newHeight / 2), 0);
    y2 = Math.min(y1 + newHeight, params.sourceHeight);

    if (y2 === params.sourceHeight) {
      y1 = y2 - newHeight;
    }
  } else {
    // the requested aspect ratio is narrower than the source image

    newWidth = Math.round(params.sourceHeight * params.targetAspectRatio);

    x1 = Math.max(params.focalPointX - Math.round(newWidth / 2), 0);
    x2 = Math.min(x1 + newWidth, params.sourceWidth);
    y2 = params.sourceHeight;

    if (x2 === params.sourceWidth) {
      x1 = x2 - newWidth;
    }
  }

  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  };
};

},{}]},{},[1])(1)
});