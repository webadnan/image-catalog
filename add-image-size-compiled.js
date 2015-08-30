'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

require('shelljs/global');
var sizeOf = require('image-size');

var folder = process.argv[2];

ls(folder).forEach(function (image) {
    var file = folder + image;
    var name, ext;

    var _image$split = image.split('.');

    var _image$split2 = _slicedToArray(_image$split, 2);

    name = _image$split2[0];
    ext = _image$split2[1];

    var dimensions = sizeOf(file);
    //console.log(dimensions.width, dimensions.height);

    console.log('cp ' + file + ' ' + folder.substr(0, folder.length - 1) + '-withsize/' + name + '---' + dimensions.width + 'x' + dimensions.height + '.' + ext);
});

//# sourceMappingURL=add-image-size-compiled.js.map