/**
 * Created by webadnan on 8/29/15.
 */
$(function () {
    var app = angular.module('harjanto', ['ngTouch'])

    app.controller('Main', function ($scope) {
        $scope.images = IMAGES.map(e => {
            e.thumbnail = `app/display-images/${e.thumbnail}`
            e.image = `app/display-images/${e.image}`
            return e
        })

        var currentIndex = -1;

        function isMobile(){
            return $(window).width() < 700
        }

        function wh(image){
            var wh = image.substr(image.indexOf('---')+3).split('.')[0]
            var [w, h] = wh.split('x')
            return [+w, +h]
        }

        function getWH(image) {
            var [w, h] = wh(image)
            if (h == 0) return {}
            var r = w/h;

            if (r > 1) return [parseInt(r * 230), 230]
            else return [230, parseInt(r * 230)]
        }

        function fitWH(image, cw, ch) {
            var [w, h] = wh(image)
            if (h == 0) return [cw, ch]
            var [cr, r] = [cw/ch, w/h]
            if (r > cr) {
                return [cw, cw/r]
            } else {
                return [r*ch, ch]
            }
        }

        $scope.getThumbnailStyle = image => {
            //return {width: '230px', height: '230px'}

            var [w, h] = getWH(image)
            if (w > h) {
                return {
                    height: '230px',
                    marginLeft: `-${parseInt((w - 230)/2)}px`
                }
            } else {
                return {
                    width: '230px',
                    marginTop: `-${parseInt((h - 230)/2)}px`
                }
            }
        }

        function getDeviceSpecificContentWH(){
            var $w = $(window)

            // for mobile use maximum width, height
            if (isMobile()) {
                return [$w.width(), $w.height()]
            } else {
                return [$w.width()-125, $w.height()-100]
            }
        }

        $scope.onClick = (image, index) => {
            currentIndex = index;
            var $floating = $('.floating-thumbnail')
            var $floatingImg = $floating.find('img')
            var $target = $(`.thumbnail:eq(${index})`)
            var $targetImg = $target.find('img')
            var $w = $(window), scrollTop = $w.scrollTop()

            $floatingImg.attr('src', image).css({
                width: `${$targetImg.width()}px`,
                height: `${$targetImg.height()}px`,
                marginLeft: $targetImg.css('margin-left'),
                marginTop: $targetImg.css('margin-top')
            })

            $floating.css({
                display: 'block',
                top: `${$target.offset().top - scrollTop}px`,
                left: `${$target.offset().left}px`,
                width: '230px',
                height: '230px'
            })

            //var [cw, ch] = [$w.width()-125, $w.height()-100]
            var [cw, ch] = getDeviceSpecificContentWH()
            var [fw, fh] = fitWH(image, cw, ch)

            var top = parseInt(($w.height() - fh)/2), left = parseInt(($w.width() - fw)/2)
            $floating.animate({
                width: fw+'px',
                height: fh+'px',
                top: `${top}px`,
                left: `${left}px`
            })

            $floatingImg.animate({
                marginLeft: 0,
                marginTop: 0,
                width: `${fw}px`,
                height: `${fh}px`
            })

            if (isMobile()){
                $('.nav-left, .nav-right').css('top', 'calc(100% - 40px)')
            } else {
                $('.nav-left, .nav-right').css('top', 'calc(50% - 15px)')
            }

            $('.dark-layer, .nav-left, .nav-right, .cross-button').show();
        }

        $scope.onClose = () => {
            currentIndex = -1
            $('.floating-thumbnail, .dark-layer, .nav-left, .nav-right, .cross-button').hide();
        }

        function goto(index){
            currentIndex = index
            var $floating = $('.floating-thumbnail')
            var $floatingImg = $floating.find('img')
            var $w = $(window), image = $scope.images[index].image
            //var [cw, ch] = [$w.width()-125, $w.height()-100]
            var [cw, ch] = getDeviceSpecificContentWH()
            var [fw, fh] = fitWH(image, cw, ch)

            var top = parseInt(($w.height() - fh)/2), left = parseInt(($w.width() - fw)/2)
            $floating.animate({
                width: fw+'px',
                height: fh+'px',
                top: `${top}px`,
                left: `${left}px`
            }, 100)

            $floatingImg.attr('src', image).animate({
                width: `${fw}px`,
                height: `${fh}px`
            }, 100)
        }

        $scope.onPrevious = () => {
            if (currentIndex == 0) return;
            goto(currentIndex-1);

        }

        $scope.onNext = () => {
            if (currentIndex == $scope.images.length-1) return;
            goto(currentIndex + 1)
        }

        $(window).keydown(e => {
            if (currentIndex == -1) return;
            if (e.keyCode == 37) $scope.onPrevious()
            else if (e.keyCode == 39) $scope.onNext()
            else if (e.keyCode == 27) $scope.onClose();
        })
    })
})
