/*
 * @Author: donglei
 * @Date: 2021-10-30 18:01:20
 * @LastEditors: donglei
 * @LastEditTime: 2021-11-23 18:23:24
 * @Description: file content
 * @FilePath: \projects\音悦台移动端页面\js\scrollTouch.js
 */

;
(function (w) {
    function TouchScroll(container, wrapper, options) {
        let oContainer = (typeof container === 'object') ? container : document.querySelector(container)
        let oWrapper = (typeof wrapper === 'object') ? wrapper : document.querySelector(wrapper)
        let bg = options && options.bg ? options.bg : 'indianred'
        let width = options && options.width ? options.width : '4px'
        let moveCallback = options && options.move ? options.move : null
        let oScrollBar = null

        oContainer.init = function () {
            oScrollBar = document.createElement('div')
            oScrollBar.style.height = (oContainer.offsetHeight ** 2) / oWrapper.offsetHeight + 'px'
            oContainer.style.position = 'relative'
            // oScrollBar.classList.add('scroll-bar')
            oScrollBar.style.position = 'absolute'
            oScrollBar.style.top = 0
            oScrollBar.style.right = 0
            oScrollBar.style.width = width
            oScrollBar.style.backgroundColor = bg
            oContainer.appendChild(oScrollBar)
        }
        oContainer.init()

        oContainer.addEventListener('touchstart', function (e) {
            // oWrapper.style.transition = 'none'
            this.startY = e.targetTouches[0].clientY
            this.top = transformCSS(oWrapper, 'translateY')
            this.startTime = Date.now()
            // scrollBar
            this.startScrollTop = transformCSS(oWrapper, 'translateY')
            if (oWrapper.translateY && oWrapper.translateY.timer) {
                clearInterval(oWrapper.translateY.timer)
                oWrapper.translateY.timer = null
            }
            if (oScrollBar.translateY && oScrollBar.translateY.timer) {
                clearInterval(oScrollBar.translateY.timer)
                oScrollBar.translateY.timer = null
            }
        }, false)

        oContainer.addEventListener('touchmove', function (e) {
            let curY = e.targetTouches[0].clientY
            let disY = curY - this.startY + this.top
            // 存在如下等式
            // 滚动条的上边距/(视口的高度-滚动条的高度)=owrapper的translatey/(视口的高度-owrapper的高度)
            // owrapper的上边距(负值) * ((视口高度-滚动条高度)/(视口高度-wrapper高度)) = 滚动条的上边距
            let scrollBarY = disY / (oContainer.offsetHeight - oWrapper.offsetHeight) * (oContainer.offsetHeight - oScrollBar.offsetHeight)
            transformCSS(oWrapper, 'translateY', disY)
            transformCSS(oScrollBar, 'translateY', scrollBarY)

        }, false)
        oContainer.addEventListener('touchend', function (e) {
            // oWrapper.style.transition = 'all .5s'
            let endY = e.changedTouches[0].clientY
            let endTime = Date.now()

            // 惯性移动
            let top = (endY - this.startY) / (endTime - this.startTime) * 80
            let disY = endY - this.startY + this.top

            let per = (oContainer.offsetHeight - oScrollBar.offsetHeight) / (oContainer.offsetHeight - oWrapper.offsetHeight)

            let scrollBarY = disY * per
            let type = 'Quad.easeOut'

            if (disY > 0 || disY + top > 0) {
                top = 0 - disY
            } else if (disY < oContainer.offsetHeight - oWrapper.offsetHeight || disY + top < oContainer.offsetHeight - oWrapper.offsetHeight) {
                top = oContainer.offsetHeight - oWrapper.offsetHeight - disY
            }
            let scrollBarTop = top * per





            tweenAnimation(oWrapper, 'translateY', disY, top, 500, type, moveCallback)
            tweenAnimation(oScrollBar, 'translateY', scrollBarY, scrollBarTop, 500, type)
        }, false)

    }
    w.TouchScroll = TouchScroll
})(window)