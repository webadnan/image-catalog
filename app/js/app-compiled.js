/**
 * Created by webadnan on 8/29/15.
 */
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

$(function () {
    var app = angular.module('harjanto', ['ngTouch']);

    app.controller('Main', function ($scope) {
        $scope.images = IMAGES.map(function (e) {
            e.thumbnail = 'app/display-images/' + e.thumbnail;
            e.image = 'app/display-images/' + e.image;
            return e;
        });

        var currentIndex = -1;

        function isMobile() {
            return $(window).width() < 700;
        }

        function wh(image) {
            var wh = image.substr(image.indexOf('---') + 3).split('.')[0];

            var _wh$split = wh.split('x');

            var _wh$split2 = _slicedToArray(_wh$split, 2);

            var w = _wh$split2[0];
            var h = _wh$split2[1];

            return [+w, +h];
        }

        function getWH(image) {
            var _wh = wh(image);

            var _wh2 = _slicedToArray(_wh, 2);

            var w = _wh2[0];
            var h = _wh2[1];

            if (h == 0) return {};
            var r = w / h;

            if (r > 1) return [parseInt(r * 230), 230];else return [230, parseInt(r * 230)];
        }

        function fitWH(image, cw, ch) {
            var _wh3 = wh(image);

            var _wh32 = _slicedToArray(_wh3, 2);

            var w = _wh32[0];
            var h = _wh32[1];

            if (h == 0) return [cw, ch];
            var cr = cw / ch;
            var r = w / h;

            if (r > cr) {
                return [cw, cw / r];
            } else {
                return [r * ch, ch];
            }
        }

        $scope.getThumbnailStyle = function (image) {
            //return {width: '230px', height: '230px'}

            var _getWH = getWH(image);

            var _getWH2 = _slicedToArray(_getWH, 2);

            var w = _getWH2[0];
            var h = _getWH2[1];

            if (w > h) {
                return {
                    height: '230px',
                    marginLeft: '-' + parseInt((w - 230) / 2) + 'px'
                };
            } else {
                return {
                    width: '230px',
                    marginTop: '-' + parseInt((h - 230) / 2) + 'px'
                };
            }
        };

        function getDeviceSpecificContentWH() {
            var $w = $(window);

            // for mobile use maximum width, height
            if (isMobile()) {
                return [$w.width(), $w.height()];
            } else {
                return [$w.width() - 125, $w.height() - 100];
            }
        }

        $scope.onClick = function (image, index) {
            currentIndex = index;
            var $floating = $('.floating-thumbnail');
            var $floatingImg = $floating.find('img');
            var $target = $('.thumbnail:eq(' + index + ')');
            var $targetImg = $target.find('img');
            var $w = $(window),
                scrollTop = $w.scrollTop();

            $floatingImg.attr('src', image).css({
                width: $targetImg.width() + 'px',
                height: $targetImg.height() + 'px',
                marginLeft: $targetImg.css('margin-left'),
                marginTop: $targetImg.css('margin-top')
            });

            $floating.css({
                display: 'block',
                top: $target.offset().top - scrollTop + 'px',
                left: $target.offset().left + 'px',
                width: '230px',
                height: '230px'
            });

            //var [cw, ch] = [$w.width()-125, $w.height()-100]

            var _getDeviceSpecificContentWH = getDeviceSpecificContentWH();

            var _getDeviceSpecificContentWH2 = _slicedToArray(_getDeviceSpecificContentWH, 2);

            var cw = _getDeviceSpecificContentWH2[0];
            var ch = _getDeviceSpecificContentWH2[1];

            var _fitWH = fitWH(image, cw, ch);

            var _fitWH2 = _slicedToArray(_fitWH, 2);

            var fw = _fitWH2[0];
            var fh = _fitWH2[1];

            var top = parseInt(($w.height() - fh) / 2),
                left = parseInt(($w.width() - fw) / 2);
            $floating.animate({
                width: fw + 'px',
                height: fh + 'px',
                top: top + 'px',
                left: left + 'px'
            });

            $floatingImg.animate({
                marginLeft: 0,
                marginTop: 0,
                width: fw + 'px',
                height: fh + 'px'
            });

            if (isMobile()) {
                $('.nav-left, .nav-right').css('top', 'calc(100% - 40px)');
            } else {
                $('.nav-left, .nav-right').css('top', 'calc(50% - 15px)');
            }

            $('.dark-layer, .nav-left, .nav-right, .cross-button').show();
        };

        $scope.onClose = function () {
            currentIndex = -1;
            $('.floating-thumbnail, .dark-layer, .nav-left, .nav-right, .cross-button').hide();
        };

        function goto(index) {
            currentIndex = index;
            var $floating = $('.floating-thumbnail');
            var $floatingImg = $floating.find('img');
            var $w = $(window),
                image = $scope.images[index].image;
            //var [cw, ch] = [$w.width()-125, $w.height()-100]

            var _getDeviceSpecificContentWH3 = getDeviceSpecificContentWH();

            var _getDeviceSpecificContentWH32 = _slicedToArray(_getDeviceSpecificContentWH3, 2);

            var cw = _getDeviceSpecificContentWH32[0];
            var ch = _getDeviceSpecificContentWH32[1];

            var _fitWH3 = fitWH(image, cw, ch);

            var _fitWH32 = _slicedToArray(_fitWH3, 2);

            var fw = _fitWH32[0];
            var fh = _fitWH32[1];

            var top = parseInt(($w.height() - fh) / 2),
                left = parseInt(($w.width() - fw) / 2);
            $floating.animate({
                width: fw + 'px',
                height: fh + 'px',
                top: top + 'px',
                left: left + 'px'
            }, 100);

            $floatingImg.attr('src', image).animate({
                width: fw + 'px',
                height: fh + 'px'
            }, 100);
        }

        $scope.onPrevious = function () {
            if (currentIndex == 0) return;
            goto(currentIndex - 1);
        };

        $scope.onNext = function () {
            if (currentIndex == $scope.images.length - 1) return;
            goto(currentIndex + 1);
        };

        $(window).keydown(function (e) {
            if (currentIndex == -1) return;
            if (e.keyCode == 37) $scope.onPrevious();else if (e.keyCode == 39) $scope.onNext();else if (e.keyCode == 27) $scope.onClose();
        });
    });
});

//# sourceMappingURL=app-compiled.js.map