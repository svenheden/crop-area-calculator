/**
 * Crop area calculator
 *
 * Given a focal point, an aspect ratio and source image dimensions this module will calculate a
 * crop starting point (`x1`, `y1`) and end point (`x2`, `y2`). These values can be used for
 * fixed coordinates cropping with tools like e.g. ImageMagick, GraphicsMagick or a service like
 * Cloudinary.
 */
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
