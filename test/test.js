var test = require('tape');
var calculateCropArea = require('../index');

function commonTests(assert, options) {
  var area = calculateCropArea(options);

  assert.ok(area.x1 < area.x2, 'x1 should be less than x2');
  assert.ok(area.y1 < area.y2, 'y1 should be less than y2');
  assert.ok(area.x1 >= 0, 'x1 should not be lower than 0');
  assert.ok(area.y1 >= 0, 'y1 should not be lower than 0');
  assert.ok(area.x2 <= options.sourceWidth, 'x2 should not be bigger than the source images width');
  assert.ok(area.y2 <= options.sourceHeight, 'y2 should not be bigger than the source images height');

  assert.ok((
    options.focalPointX >= area.x1 &&
    options.focalPointX <= area.x2 &&
    options.focalPointY >= area.y1 &&
    options.focalPointY <= area.y2
  ), 'the focal point should be present in the crop area');
  assert.equal(
    ((area.x2 - area.x1) / (area.y2 - area.y1)).toFixed(2),
    options.targetAspectRatio.toFixed(2),
    'the aspect ratio of the crop area should be equal to the requested aspect ratio'
  );
}

test('input validation', function(assert) {
  assert.throws(calculateCropArea, 'should throw an error if not all required arguments are provided');
  assert.end();
});

test('aspect ratios wider than the source image', function(assert) {
  var options = {
    sourceWidth: 500,
    sourceHeight: 500,
    targetAspectRatio: 1.5,
    focalPointX: 200,
    focalPointY: 200
  };
  var area = calculateCropArea(options);

  commonTests(assert, options);
  assert.equal(area.x2 - area.x1, options.sourceWidth, 'the width of the crop area should be equal to the source width');
  assert.ok(area.y2 - area.y1 < options.sourceHeight, 'the height of the crop area should be lower than the source height');

  assert.end();
});

test('aspect ratios wider than the source image with a focal point near the top', function(assert) {
  var options = {
    sourceWidth: 500,
    sourceHeight: 500,
    targetAspectRatio: 16/9,
    focalPointX: 100,
    focalPointY: 10
  };

  commonTests(assert, options);
  assert.end();
});

test('aspect ratios wider than the source image with a focal point near the bottom', function(assert) {
  var options = {
    sourceWidth: 500,
    sourceHeight: 500,
    targetAspectRatio: 16/9,
    focalPointX: 100,
    focalPointY: 480
  };

  commonTests(assert, options);
  assert.end();
});

test('aspect ratios narrower than the source image', function(assert) {
  var options = {
    sourceWidth: 800,
    sourceHeight: 600,
    targetAspectRatio: 0.5,
    focalPointX: 200,
    focalPointY: 200
  };
  var area = calculateCropArea(options);

  commonTests(assert, options);
  assert.equal(area.y2 - area.y1, options.sourceHeight, 'the height of the crop area should be equal to the source height');
  assert.ok(area.x2 - area.x1 < options.sourceWidth, 'the width of the crop area should be lower than the source width');

  assert.end();
});

test('aspect ratios narrower than the source image with a focal point near the left side', function(assert) {
  var options = {
    sourceWidth: 800,
    sourceHeight: 600,
    targetAspectRatio: 0.5,
    focalPointX: 5,
    focalPointY: 50
  };

  commonTests(assert, options);
  assert.end();
});

test('aspect ratios narrower than the source image with a focal point near the right side', function(assert) {
  var options = {
    sourceWidth: 800,
    sourceHeight: 600,
    targetAspectRatio: 0.5,
    focalPointX: 599,
    focalPointY: 20
  };

  commonTests(assert, options);
  assert.end();
});
