# Crop area calculator

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

Given a focal point, an aspect ratio and source image dimensions this module will calculate a crop starting point (`x1`, `y1`) and end point (`x2`, `y2`).

These values can be used for fixed coordinates cropping with tools like e.g. [ImageMagick/GraphicsMagick](https://github.com/aheckmann/gm) or a service like [Cloudinary](http://cloudinary.com/documentation/image_transformations#crop_modes).

This algorithm has been implemented in the [EPiFocalPoint plugin for EpiServer](https://github.com/defsteph/EPiFocalPoint).

## Demo

Check out [this link](http://crop-area-calculator.surge.sh/demo.html) or `demo.html` for an example use case.

## How to use

Either `npm install --save crop-area-calculator` and import it in your own code or go the old school route and download the script file from the `dist` folder and include it in your page with a `<script>` tag.

## License

MIT © [Jonathan Persson](https://github.com/jonathanp)

[npm-url]: https://npmjs.org/package/crop-area-calculator
[npm-image]: https://badge.fury.io/js/crop-area-calculator.svg
[travis-image]: https://travis-ci.org/jonathanp/crop-area-calculator.svg
[travis-url]: https://travis-ci.org/jonathanp/crop-area-calculator
